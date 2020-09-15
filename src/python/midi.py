from head import *
from list import *
from utils import *

ipc_send('version', '1.1.0')

if 'list' in argv:
    list()

if 'list-only' in argv:
    list()
    exit()

# option: act as if displayed program is between 1-128 instead of 0-127
PROGRAM_CHANGE_OFFSET = 'pc_offset' in argv

inputs = {}
outputs = {}

for arg in argv:

    if 'python/midi.py' in arg:

        pass # in case we're using pre-compiled binaries

    elif type(arg) == str and ':' in arg:

        name, *ports = arg.split(':')
        ports = ':'.join(ports) # port names may contain colons

        inputs[name] = rtmidi.MidiIn(API, name if not JACK else name + '_in')
        outputs[name] = rtmidi.MidiOut(API, name if not JACK else name + '_out')

        if debug:
            ipc_send('log','(DEBUG, MIDI) device "%s" created' % name)


        if ports == 'virtual':

            try:
                inputs[name].open_virtual_port('midi_in')
                outputs[name].open_virtual_port('midi_out')
                if debug:
                    ipc_send('log','(DEBUG, MIDI) virtual ports opened for device "%s"' % name)
            except:
                ipc_send('error', 'can\'t open virtual port "%s"' % name)

        elif ',' in ports:

            in_port, out_port = ports.split(',')

            if in_port.isdigit() or in_port == '-1':
                in_port = int(in_port)
            else:
                for i in range(in_dev.get_port_count()):
                    if in_port.lower() in in_dev.get_port_name(i).lower():
                        in_port = i
                        break

            if out_port.isdigit() or out_port == '-1':
                out_port = int(out_port)
            else:
                for i in range(out_dev.get_port_count()):
                    if out_port.lower() in out_dev.get_port_name(i).lower():
                        out_port = i
                        break

            if type(in_port) != int or in_port >= in_dev.get_port_count():
                ipc_send('error', 'can\'t connect to input port "%s"' % in_port)
                break

            if type(out_port) != int or out_port >= out_dev.get_port_count():
                ipc_send('error', 'can\'t connect to output port "%s"' % out_port)
                break

            if in_port != -1:

                try:
                    inputs[name].open_port(in_port, 'midi_in')
                    if debug:
                        ipc_send('log','(DEBUG, MIDI) device "%s" connected to input port %s (%s)' % (name, in_port, in_dev.get_port_name(in_port)))
                except:
                    ipc_send('error', 'can\'t connect input to port %i: %s' % (in_port, in_dev.get_port_name(in_port)))

            if out_port != -1:

                try:
                    outputs[name].open_port(out_port, 'midi_out')
                    if debug:
                        ipc_send('log','(DEBUG, MIDI) device "%s" connected to output port %s (%s)' % (name, out_port, out_dev.get_port_name(out_port)))
                except:
                    ipc_send('error', 'can\'t connect to output port %i: %s' % (out_port, out_dev.get_port_name(out_port)))


def create_callback(name):

    def receive_midi(event, data):

        osc = {}
        osc['args'] = []
        osc['host'] = 'midi'
        osc['port'] = name

        message, deltatime = event
        mtype = message[0] & 0xF0

        if mtype in MIDI_TO_OSC:

            osc['address'] = MIDI_TO_OSC[mtype]

            if mtype == SYSTEM_EXCLUSIVE:
                # Parse the provided data into a hex MIDI data string of the form  'f0 7e 7f 06 01 f7'.
                v = ' '.join([hex(x).replace('0x', '').zfill(2) for x in message])
                osc['args'].append({'type': 'string', 'value': v})

            else:

                status = message[0]
                channel = (status & 0xF) + 1

                osc['args'].append({'type': 'i', 'value': channel})

                if mtype == NOTE_OFF:
                    message[2] = 0

                elif mtype == PITCH_BEND:
                    message = message[:1] + [message[1] + message[2] * 128] # convert  0-127 pair -> 0-16384 ->

                elif mtype == PROGRAM_CHANGE and PROGRAM_CHANGE_OFFSET:
                    message[-1] = message[-1] + 1

                for data in message[1:]:
                    osc['args'].append({'type': 'i', 'value': data})


            if debug:
                ipc_send('log','(DEBUG, MIDI) in: %s From: midi:%s' % (midi_str(message), name))

            ipc_send('osc', osc)



    def callback_error_wrapper(event, data):

        try:
            receive_midi(event, data)
        except:
            ipc_send('log', '(ERROR, MIDI) %s' % traceback.format_exc())

    return callback_error_wrapper

for name in inputs:

    inputs[name].set_callback(create_callback(name))

    # Activate sysex support
    if 'sysex' in argv:
        inputs[name].ignore_types(False, True, True)


def midi_message(status, channel, data1=None, data2=None):

    msg = [(status & 0xF0) | (channel - 1 & 0xF)]

    if data1 != None:
        msg.append(data1 & 0x7F)

        if data2 != None:
            msg.append(data2 & 0x7F)

    return msg


sysexRegex = re.compile(r'([^0-9A-Fa-f])\1(\1\1)*')

def send_midi(name, event, *args):

    if name not in outputs:
        ipc_send('log','(ERROR, MIDI) unknown output (%s)' % name)
        return

    if event not in OSC_TO_MIDI:
        ipc_send('log','(ERROR, MIDI) invalid address (%s)' % event)
        return

    m = None

    mtype = OSC_TO_MIDI[event]

    if mtype == SYSTEM_EXCLUSIVE:

        # unhexlify('f0 7e 7f 06 01 f7') creates a sysex message
        # from hex MIDI data string 'f0 7e 7f 06 01 f7'.
        # We expect all args to be hex strings! args[0] may contain placeholders of
        # the form 'nn' that are replaced using args[1..N] to create the final message.
        try:
            midiBytes = args[0].replace(' ', '')
            i = 1
            for m in sysexRegex.finditer(midiBytes):
                midiBytes = midiBytes[:m.start()] + args[i].replace(' ', '') + midiBytes[m.end():]
                i += 1

            msg = unhexlify(midiBytes)

            if (msg and msg.startswith(b'\xF0') and msg.endswith(b'\xF7') and
                    all((val <= 0x7F for val in msg[1:-1]))):
                m = msg

        except:
            pass

    else:

        args = [int(round(x)) for x in args]
        m = [mtype, args[0]]

        if mtype == NOTE_ON:
            if args[2] == 0:
                mtype = NOTE_OFF

        elif mtype == PITCH_BEND:
            args = args[:1] + [args[1] & 0x7f, (args[1] >> 7) & 0x7f] # convert 0-16384 -> 0-127 pair

        elif mtype == PROGRAM_CHANGE and PROGRAM_CHANGE_OFFSET:
            args[-1] = args[-1] - 1

        m = midi_message(mtype, *args)

    if m == None:

        ipc_send('log','(ERROR, MIDI) could not convert osc to midi (%s %s)' % (event, " ".join([str(x) for x in args])))

    else:

        outputs[name].send_message(m)

        if debug:
            ipc_send('log','(DEBUG, MIDI) out: %s To: midi:%s' % (midi_str(m), name))


while True:

    try:
        msg = raw_input()
    except:
        break

    try:
        msg = JSON.loads(msg)
        msg[1] = msg[1].lower()
        send_midi(*msg)
    except:
        ipc_send('log', '(ERROR, MIDI) %s' % traceback.format_exc())
