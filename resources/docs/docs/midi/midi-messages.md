!!! info ""
    Define static argument values using the [`preArgs`](/docs/widgets-reference/#preArgs) option in order to complete the respective MIDI message.

----

#### `/note channel note velocity`

NoteOn event or noteOff if velocity equals `0`.

- `channel`: integer between 1 and 16
- `note`: integer between 0 and 127
- `velocity`: integer between 0 and 127

Example:

A push button might be configured as follows in order to send a MIDI note whose velocity is defined by the button's on/off value:

- `address`: /note
- `preArgs`: [1, 60] (for MIDI channel 1, and note 60 / C4)
- `on`: 100 (for noteOn velocity of 100 on button push)
- `off`: 0 (to send a noteOff on button release)
- `target`: ["midi:device_name"] (where device_name is one of the declared midi devices defined during [setup](#setup))

----

#### `/control channel cc value`

Control change event.

- `channel`: integer between 1 and 16
- `cc`: integer between 0 and 127
- `value`: integer between 0 and 127

Example:

A fader might be configured as follows in order to send a MIDI control message (a volume control in this example):

- `address`: /control
- `pre-args`: [1, 7] (MIDI channel 1, control number 7 generally used as volume control)
- `range`: {"min": 0, "max": 127} (MIDI values are encoded in this range)
- `target`: ["midi:device_name"]

----

#### `/program channel program`

Program change event.

- `channel`: integer between 1 and 16
- `program`: integer between 0 and 127*

!!! info
    \* Some devices / softwares display the `program` value between 1 and 128, thus interpreting `program change 0` as `program change 1` and so on. Enable the `pc_offset` option to make Open Stage Control behave this way.

----

#### `/pitch channel pitch`

PitchWheel event.

- `channel`: integer between 1 and 16
- `pitch`: integer between 0 and 16383

----

#### `/sysex msg v1 .. vN`

System exclusive message.

- `msg`: hexadecimal sysex data string of the form `f0 ... f7`. You may include placeholders of the form `nn` which will be replaced by `v1, .., vN` respectively.
- `v1, .., vN`: values encoded as hexadecimal data strings to include in `msg`. Most probably, you will need to sepcify a [custom module](/docs/custom-module/) in order to convert numeric widget values into the required hexadecimal format. In general, this conversion will be different for each manufacturer / device.

----

#### `/channel_pressure channel pressure`

Channel pressure event.

- `channel`: integer between 1 and 16
- `pressure`: integer between 0 and 127

----


#### `/key_pressure channel note pressure`

Polyphonic key pressure event.

- `channel`: integer between 1 and 16
- `note`: integer between 0 and 127
- `pressure`: integer between 0 and 127

----
