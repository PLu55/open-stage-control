var {PythonShell} = require('python-shell'),
    settings = require('./settings'),
    midiVersion = '1.1.0'

var pythonOptions = {
    scriptPath:__dirname,
    mode:'text',
}

class MidiConverter {

    constructor() {

        var pythonPath = settings.read('midi').filter(x=>x.includes('path=')).map(x=>x.split('=')[1])[0]

        this.py = new PythonShell('python/midi.py', Object.assign({
            args: [
                settings.read('debug') ? 'debug' : '',
                ...settings.read('midi')
            ],
            pythonPath
        }, pythonOptions))

        this.py.childProcess.on('error', (e)=>{
            if (e.code === 'ENOENT') {
                console.error(`(ERROR, MIDI) Could not find python binary: ${e.message.replace(/spawn (.*) ENOENT/, '$1')}`)
            } else {
                console.error(`(ERROR, MIDI) ${e.message}`)
            }
        })

    }

    send(data) {

        var args = []
        for (let i in data.args) {
            args.push(data.args[i].value)
        }

        this.py.send(JSON.stringify([data.port, data.address, ...args]))

    }

    stop() {

        this.py.childProcess.kill()

    }

    init(receiveOsc) {

        this.receiveOsc = receiveOsc
        this.py.on('message', (message)=>{
            MidiConverter.parseIpc(message, this)
        })

    }

    static parseIpc(message, instance) {

        // console.log(message)
        var name, data
        try {
            [name, data] = JSON.parse(message)
        } catch (err) {
            if (settings.read('debug')) console.error(`(DEBUG, MIDI) Unparsed python log:\n    ${message}`)
        }
        if (name == 'log') {
            if (data.indexOf('ERROR') > -1) {
                console.error(data)
            } else {
                console.log(data)
            }
        } else if (name ==  'osc') {
            instance.receiveOsc(data)
        } else if (name == 'error') {
            console.error('(ERROR, MIDI) ' + data)
            if (instance) instance.stop()
        } else if (name == 'version' && data != midiVersion) {
            console.error(`(WARNING, MIDI) binary version mismatch (${data} installed, ${midiVersion} expected)`)
        }

    }

    static list() {

        var pythonPath = settings.read('midi') ? settings.read('midi').filter(x=>x.includes('path=')).map(x=>x.split('=')[1])[0] : undefined

        PythonShell.run('python/midi.py', Object.assign({pythonPath: pythonPath, args: ['list-only']}, pythonOptions), function(e, results) {
            if (e) {
                if (e.code === 'ENOENT') {
                    console.error(`(ERROR, MIDI) Could not find python binary: ${e.message.replace(/spawn (.*) ENOENT/, '$1')}`)
                } else {
                    console.error(`(ERROR, MIDI) ${e.message}`)
                }
            }

            for (let r of results) {
                MidiConverter.parseIpc(r)
            }
        })

    }

}

module.exports = MidiConverter
