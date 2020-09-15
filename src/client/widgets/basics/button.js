var Widget = require('../common/widget'),
    doubletab = require('../mixins/double_tap'),
    html = require('nanohtml'),
    {deepEqual, isJSON} = require('../../utils'),
    {iconify} = require('../../ui/utils')

class Button extends Widget {

    static description() {

        return 'On / off button.'

    }

    static defaults() {

        return super.defaults({


            _class_specific: 'button',

            label: {type: 'string|boolean', value: 'auto', help: [
                'Set to `false` to hide completely',
                '- Insert icons using the prefix ^ followed by the icon\'s name : `^play`, `^pause`, etc (see https://fontawesome.com/icons?d=gallery&s=solid&m=free)',
                '- Icons can be transformed with the following suffixes: `.flip-[horizontal|vertical|both]`, `.rotate-[90|180|270]`, `.spin`, `.pulse`. Example: `^play.flip-horizontal`',
            ]},
            vertical: {type: 'boolean', value: false, help: 'Set to `true` to display the text vertically'},
            wrap: {type: 'boolean', value: false, help: [
                'Set to `true` to wrap long lines automatically.',
            ]},
            on: {type: '*', value: 1, help: [
                'Set to `null` to send send no argument in the osc message',
            ]},
            off: {type: '*', value: 0, help: [
                'Set to `null` to send send no argument in the osc message. Must be different from `on`.',
            ]},
            mode: {type: 'string', value: 'toggle', choices: ['toggle', 'push', 'tap'], help: [
                'Interraction mode:',
                '- `toggle` (classic on/off switch)',
                '- `push` (press & release)',
                '- `tap` (no release)'
            ]},
            doubleTap: {type: 'boolean', value: false, help: 'Set to `true` to make the button require a double tap to be pushed instead of a single tap'},
            colorTextOn: {type: 'string', value: 'auto', help: 'Defines the widget\'s text color when active.'},

        }, [], {}, Button)

    }

    constructor(options) {

        super({...options, html: html`<inner></inner>`})

        this.state = 0
        this.active = false
        this.pulse = null

        var tap = this.getProp('mode') === 'tap',
            push = this.getProp('mode') === 'push' || tap

        if (push) {

            if (this.getProp('doubleTap')) {

                doubletab(this.widget, ()=>{

                    this.active = true
                    this.setValue(this.getProp('on'), {sync: true, send: true})

                    if (tap) this.container.classList.add('active')

                })

            } else {

                this.on('draginit',()=>{

                    if (this.active) return

                    this.active = true
                    this.setValue(this.getProp('on'), {sync: true, send: true})

                    if (tap) this.container.classList.add('active')


                }, {element: this.widget})

            }

            this.on('dragend',()=>{

                if (!this.active) return

                this.active = false

                if (!tap) this.setValue(this.getProp('off'), {sync: true, send: true})
                if (tap) this.container.classList.remove('active')

            }, {element: this.widget})

        } else {

            if (this.getProp('doubleTap')) {

                doubletab(this.widget, ()=>{


                    this.active = true
                    this.setValue(this.state ? this.getProp('off') : this.getProp('on'), {sync: true, send: true})

                })

            } else {

                this.on('draginit',()=>{

                    if (this.active) return

                    this.active = true
                    this.setValue(this.state ? this.getProp('off') : this.getProp('on'), {sync: true, send: true})

                }, {element: this.widget})

                this.on('dragend',()=>{

                    this.active = false

                }, {element: this.widget})

            }

        }



        this.value = this.getProp('off')

        this.label = html`<label></label>`

        if (this.getProp('wrap')) this.label.classList.add('wrap')
        if (this.getProp('vertical')) this.label.classList.add('vertical')

        this.updateLabel()

    }



    setValue(v, options={}) {

        if (typeof v === 'string' && isJSON(v)) {
            try {
                v = JSON.parse(v    )
            } catch (err) {}
        }

        var newstate

        if (deepEqual(v, this.getProp('on'))) {

            newstate = 1

        } else if (deepEqual(v, this.getProp('off'))) {

            newstate = 0

        }

        if (newstate !== undefined) {

            this.state = newstate
            this.container.classList.toggle('on', this.state)
            this.value = this.getProp(this.state ? 'on' : 'off')

            if (options.send) this.sendValue()
            if (options.sync) this.changed(options)

            // tap mode
            if (newstate && this.getProp('mode') === 'tap' && !options.tapRelease) {

                // reset value
                this.setValue(this.getProp('off'), {sync: false, send: false, tapRelease: true})

                // pulse
                clearTimeout(this.pulse)
                this.container.classList.remove('pulse')
                setTimeout(()=>{
                    this.container.classList.add('pulse')
                    this.pulse = setTimeout(()=>{
                        this.container.classList.remove('pulse')
                    }, 150)
                }, 16)

            }

        }



    }

    updateLabel() {

        if (this.getProp('label') === false) {

            if (this.widget.contains(this.label)) this.widget.removeChild(this.label)

        } else {
            this.label.innerHTML = this.getProp('label') == 'auto'?
                    this.getProp('id'):
                    iconify(String(this.getProp('label')).replace(/</g, '&lt;'))

            if (!this.widget.contains(this.label)) this.widget.appendChild(this.label)
        }

    }

    onPropChanged(propName, options, oldPropValue) {

        if (super.onPropChanged(...arguments)) return

        switch (propName) {

            case 'label':
                this.updateLabel()
                return

        }

    }

    onRemove() {

        if (this.active && this.getProp('mode') === 'push') this.setValue(this.getProp('off'), {sync: true, send: true})
        super.onRemove()

    }

}

Button.cssVariables = Button.prototype.constructor.cssVariables.concat(
    {js: 'colorTextOn', css: '--color-text-on'}
)

Button.dynamicProps = Button.prototype.constructor.dynamicProps.concat(
    'on',
    'off',
    'norelease',
    'label'
)

module.exports = Button
