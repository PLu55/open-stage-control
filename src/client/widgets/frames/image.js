var Widget = require('../common/widget'),
    html = require('nanohtml'),
    {urlParser} = require('../utils'),
    StaticProperties = require('../mixins/static_properties')

module.exports = class Image extends StaticProperties(Widget, {bypass: true}) {

    static description() {

        return 'Load a image (url or base64-encoded).'

    }

    static defaults() {

        return super.defaults({

            _class_specific: 'image',

            size: {type: 'string', value: 'cover', help: 'CSS background-size'},
            position: {type: 'string', value: 'center', help: 'CSS background-position'},
            repeat: {type: 'string', value: 'no-repeat', help: 'CSS background-repeat'},
            cache: {type: 'boolean', value: true, help: [
                'Set to false to disable image caching (forces file reload when updating or editing the widget).',
                'When true, sending `reload` to the widget reloads its image without changing its value'
            ]}

        }, ['decimals', 'bypass'], {

            value: {type: 'string', value: '', help: [
                '- File `url` or `path` (relative to the session file location by default, falling back to absolute path)',
                '- Base64 encoded image : `data:image/...`'
            ]}

        })

    }

    constructor(options) {

        super({...options, html: html`
            <inner>
                <div class="frame"></div>
            </inner>
        `})

        if (!this.getProp('border')) this.container.classList.add('noborder')
        this.frame = DOM.get(this.widget, '.frame')[0]

        this.frame.style.setProperty('background-size', this.getProp('size'))
        this.frame.style.setProperty('background-position', this.getProp('position'))
        this.frame.style.setProperty('background-repeat', this.getProp('repeat'))

    }

    setValue(v, options={}) {

        if (typeof this.value !== 'string') return

        var s = v==null ? '' : '' + v,
            cache_query = ''

        if (!s.length) {

            this.value = this.getProp('default')

        } else if (s != 'reload') {

            if (s.length > 1) this.value = s

        }

        if (typeof this.value === 'string' && this.value.length) {

            if ((s === 'reload' || !this.getProp('cache')) && this.value.indexOf('base64') === -1) {
                cache_query = (this.value.indexOf('?') != -1 ? '&' : '?') + Date.now()
            }

        }

        var url = this.value,
            parser = urlParser(url)

        // escpape windows absolute file paths
        if (!parser.protocol.match(/http|data/)) url = url.replace(':', '_:_')
        url = url.replace(/\\/g, '\\\\')


        if (url) {
            this.frame.style.setProperty('background-image', `url("${url}${cache_query}")`)
        } else {
            this.frame.style.setProperty('background-image', '')
        }

        if (options.sync) this.changed(options)

    }

    onRemove() {

        super.onRemove()

    }

}
