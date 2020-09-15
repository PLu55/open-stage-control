var UiWidget = require('./ui-widget'),
    Rgb = require('../widgets/pads/rgb'),
    UiModal = require('./ui-modal'),
    html = require('nanohtml'),
    chroma = require('chroma-js'),
    resize = require('../events/resize'),
    locales = require('../locales')


class ColorPicker extends UiWidget {

    constructor() {

        super({})

        this.name = ''
        this.value = ''

        this.rgb = new Rgb({props: {
            ...Rgb.defaults()._props(),
            type: 'rgb',
            width: 'auto',
            height: 'auto',
            alphaStroke: 0,
            snap: true,
            alpha: true
        }, parent: this})
        this.rgb.container.classList.add('not-editable')

        this.modal = new UiModal({
            width: 280,
            height: 320,
            closable: true,
            title: '',
            hide: true,
            html: true,
            content: html`
                <div class="color-picker-modal">
                    ${this.rgb.container}
                    <div class="actions">
                        <div class="btn color-apply">${locales('inspector_color_apply')}</div>
                        <div class="btn color-confirm">${locales('inspector_color_confirm')}</div>
                    </div>
                 </div>
            `,
            enterKey: this.confirm.bind(this)
        })

        DOM.get(this.modal.container, '.color-confirm')[0].addEventListener('click', this.confirm.bind(this))
        DOM.get(this.modal.container, '.color-apply')[0].addEventListener('click', this.apply.bind(this))

        this.rgb.on('change', (e)=>{
            e.stopPropagation = true
        })
        // this.rgb.on('dragend', (e)=>{
        //     this.value = chroma(this.rgb.value).hex()
        //     this.trigger('change')
        // })

        this.opened = 0
        this.label = DOM.get(this.modal.container, '.title')[0]

    }

    open() {

        this.label.innerHTML = this.name
        this.modal.open()
        resize.check(this.rgb.container)
        this.opened = 1

    }

    close() {

        this.modal.close()
        this.setName()
        this.opened = 0

    }

    apply() {

        this.value = chroma(this.rgb.value).hex()
        this.trigger('change')

    }

    confirm() {

        this.value = chroma(this.rgb.value).hex()
        this.trigger('change')
        this.close()

    }

    isVisible() {

        return true

    }

    setName(n = '') {

        this.name = n

    }

    setValue(v) {

        if (v === 'transparent') v = '#00000000'

        this.rgb.setValue(chroma(v).rgba())

    }

}

module.exports = ColorPicker
