var Widget = require('../common/widget'),
    keyboardJS = require('keyboardjs/dist/keyboard.min.js'),
    ScriptVm = require('./script-vm'),
    scriptVm = new ScriptVm()


class Script extends Widget {

    static description() {

        return 'Evaluates a script each time it receives a value.'

    }

    static defaults() {

        return super.defaults({

            _class_specific: 'script',

            event: {type: 'string', value: 'value', choices: ['value', 'keyboard'], help: 'Define which events trigger the script\'s execution.'},
            script: {},

            _separator: 'event: keyboard',

            keyBinding: {type: 'string|array', value: '', help: 'Key combo `string` or `array` of strings (see <a href="https://github.com/RobertWHurst/KeyboardJS">KeyboardJS</a> documentation)'},
            keyRepeat: {type: 'boolean', value: true, help: 'Set to `false` to prevent keydown repeats when holding the key combo pressed'},
            keyType: {type: 'string', value: 'keydown', choices: ['keydown', 'keyup', 'both'], help: 'Determines which key event trigger the script\'s execution'},



        }, [

            'visible', 'interaction',
            '_geometry', 'left', 'top', 'width', 'height', 'expand',
            '_style',  'colorBg', 'colorText', 'colorWidget', 'colorFill', 'colorStroke', 'alphaStroke', 'alphaFillOn', 'alphaFillOff', 'padding', 'css'

        ], {
            script: {type: 'script', value: '', help: 'Script executed whenever the widget\'s receives the defined event. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.'},
        })

    }

    constructor(options) {

        super({...options, html: null})

        this.builtIn = options.builtIn

        this.scriptLock = false

        this.timeouts = {}
        this.intervals = {}

        if (this.getProp('event') === 'value') {

            try {
                this.script = scriptVm.compile(this.getProp('script'), {
                    id: '',
                    value: 0
                })
            } catch(err) {
                let stackline = err.stack ? (err.stack.match(/>:([0-9]+):[0-9]+/) || '') : '',
                    line = stackline.length > 1 ? ' at line ' + (parseInt(stackline[1]) - 2) : ''
                console.log((this.getProp('id') || this.props.id) + '.script error:\n' + err + line)
                this.script = ()=>{}
            }

        } else if (this.getProp('event') === 'keyboard' && this.getProp('keyBinding')) {

            this.keyCb = this.keyboardCallback.bind(this)

            keyboardJS.withContext('global', ()=>{

                keyboardJS.bind(this.getProp('keyBinding'), this.keyCb, this.keyCb)

            })

            try {
                this.script = scriptVm.compile(this.getProp('script'), {
                    type: '',
                    key: '',
                    code: 0,
                    ctrl: false,
                    shift: false,
                    alt: false,
                    meta: false,
                })
            } catch(err) {
                let stackline = err.stack ? (err.stack.match(/>:([0-9]+):[0-9]+/) || '') : '',
                    line = stackline.length > 1 ? ' at line ' + (parseInt(stackline[1]) - 2) : ''
                console.log((this.getProp('id') || this.props.id) + '.script error:\n' + err + line)
                this.script = ()=>{}
            }

        }

    }

    run(context) {

        if (this.scriptLock) return

        scriptVm.setWidget(this)

        this.scriptLock = true
        try {
            this.script(context, this.builtIn ? this.parent.parsersLocalScope : this.parsersLocalScope)
        } catch(e) {
            console.log(e)
        }
        this.scriptLock = false

        scriptVm.setWidget()


    }

    setValue(v, options={}) {

        if (this.getProp('event') === 'value') {

            scriptVm.setValueOptions(options)

            this.run({
                value: v,
                id: options.id,
            })

            scriptVm.setValueOptions(options)

        }

    }

    keyboardCallback(e) {

        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT')) return

        if (this.getProp('keyType') !== 'both' && e.type !== this.getProp('keyType')) return

        if (e.type === 'keydown' && !this.getProp('keyRepeat')) e.preventRepeat()

        e.preventDefault()

        this.run({
            type: e.type,
            key: e.key,
            code: e.code,
            ctrl: e.ctrlKey,
            shift: e.shiftKey,
            alt: e.altKey,
            meta: e.metaKey
        })


    }

    onRemove() {


        if (this.getProp('event') === 'keyboard' && this.getProp('keyBinding')) {

            keyboardJS.withContext('global', ()=>{

                keyboardJS.unbind(this.getProp('keyBinding'), this.keyCb, this.keyCb)

            })

        }

        for (let k in this.timeouts) {
            clearTimeout(this.timeouts[k])
        }

        for (let k in this.intervals) {
            clearInterval(this.intervals[k])
        }

        super.onRemove()

    }

}

module.exports = Script
