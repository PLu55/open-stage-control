var widgetManager = require('../../managers/widgets'),
    stateManager = require('../../managers/state'),
    cache = require('../../managers/cache'),
    {deepCopy} = require('../../utils'),
    {urlParser} = require('../utils'),
    Vm = require('../vm'),
    toolbar


class ScriptVm extends Vm {

    constructor() {

        super()

        this.valueOptions = []
        this.widget = []

    }

    getValueOptions() {

        return this.valueOptions[this.valueOptions.length - 1] || {send: true, sync: true}

    }

    setValueOptions(options) {

        if (!options) this.valueOptions.pop()
        else this.valueOptions.push(options)

    }

    setWidget(widget) {

        if (!widget) this.widget.pop()
        else this.widget.push(widget)

    }

    getWidget() {

        return this.widget[this.widget.length - 1]

    }

    resolveId(id) {

        var widget = this.getWidget()
        if (widget.builtIn) widget = widget.parent

        if (id === 'this') return [widget]
        else if (id === 'parent' && widget.parent !== widgetManager) return [widget.parent]
        else return widgetManager.getWidgetById(id)

    }

    registerGlobals() {

        super.registerGlobals()

        this.sandbox.contentWindow.set = (id, value)=>{

            var options = this.getValueOptions()
            options.fromScript = true

            // if (id === options.id) options.sync = false // loop stop
            // if (this.getWidget() === options.widget) options.sync = false // loop stop

            var widgets = this.resolveId(id)

            for (var i = widgets.length - 1; i >= 0; i--) {

                return widgets[i].setValue(value, options)

            }

        }

        this.sandbox.contentWindow.send = (target, address, ...args)=>{

            var options = this.getValueOptions()

            if (!options.send) return

            if (target && target[0] === '/') {
                args.unshift(address)
                address = target
                target = null
            }

            var overrides = {
                address,
                v: args,
                preArgs: []
            }

            if (target) overrides.target = Array.isArray(target) ? target : [target]

            var widget = this.getWidget()
            if (widget.builtIn) widget = widget.parent

            widget.sendValue(overrides)

        }

        this.sandbox.contentWindow.get = (id)=>{

            var widgets = this.resolveId(id)

            for (var i = widgets.length - 1; i >= 0; i--) {

                if (widgets[i].getValue) {

                    var v = widgets[i].getValue()
                    if (v !== undefined) return v

                }

            }

        }

        this.sandbox.contentWindow.getProp = (id, prop)=>{

            var widgets = this.resolveId(id)

            for (var i = widgets.length - 1; i >= 0; i--) {

                var v = widgets[i].getProp(prop)
                if (v !== undefined) return v

            }

        }

        this.sandbox.contentWindow.updateProp = (id, prop)=>{

            var widgets = this.resolveId(id),
                widget = this.getWidget()

            if (widget.builtIn) widget = widget.parent

            for (var i = widgets.length - 1; i >= 0; i--) {

                widgets[i].updateProps(Array.isArray(prop) ? prop : [prop], widget)

            }

        }

        this.sandbox.contentWindow.getScroll = (id)=>{

            var widgets = this.resolveId(id)

            for (var i = widgets.length - 1; i >= 0; i--) {

                if (widgets[i].scroll) return widgets[i].scroll()

            }

            return []

        }

        this.sandbox.contentWindow.setScroll = (id, x, y)=>{

            var widgets = this.resolveId(id)

            for (var i = widgets.length - 1; i >= 0; i--) {

                if (widgets[i].scroll) widgets[i].scroll([x, y])

            }

        }

        this.sandbox.contentWindow.httpGet = (url, callback)=>{

            var parser = urlParser(url),
                err = (e)=>{console.error(e)}

            if (!parser.isLocal()) return err('httpGet error (' + url + '): non-local url')

            var xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.onload = (e)=>{
                if (xhr.readyState === 4 && xhr.status === 200 && callback) {
                    callback(xhr.responseText)
                }
            }
            xhr.onerror = (e)=>err('httpGet error (' + url + '): ' + xhr.statusText)
            xhr.send(null)

        }

        this.sandbox.contentWindow.stateGet = (filter)=>{

            if (filter) {

                filter = Array.isArray(filter) ? filter : [filter]

                var containers = filter.map(x=>this.resolveId(x)).reduce((a,b)=>a.concat(b), [])

                if (!containers.length) return
                filter = (widget)=>{
                    return containers.some(x=>x.contains(widget) || x === widget)
                }
            }

            return deepCopy(stateManager.get(filter))

        }

        this.sandbox.contentWindow.stateSet = (state)=>{

            var options = this.getValueOptions()
            stateManager.set(state, options.send)

        }


        this.sandbox.contentWindow.storage = {

            setItem: (k, v)=>cache.set('script.' + k, v),
            getItem: (k)=>cache.get('script.' + k),
            removeItem: (k)=>cache.remove('script.' + k),
            clear: ()=>cache.clear('script.')

        }

        this.sandbox.contentWindow.setTimeout = (id, callback, timeout)=>{

            if (typeof id === 'function') {
                timeout = callback
                callback = id
                id = undefined
            }

            var widget = this.getWidget(),
                options = this.getValueOptions()


            if (widget.timeouts[id] !== undefined) {
                clearTimeout(widget.timeouts[id])
                delete widget.timeouts[id]
            }
            widget.timeouts[id] = setTimeout(()=>{
                this.setWidget(widget)
                this.setValueOptions(options)
                try {
                    callback()
                } catch(e) {
                    console.log(e)
                }
                this.setWidget()
                this.setValueOptions()
            }, timeout)

        }

        this.sandbox.contentWindow.clearTimeout = (id)=>{

            var widget = this.getWidget()

            clearTimeout(widget.timeouts[id])
            delete widget.timeouts[id]

        }

        this.sandbox.contentWindow.setInterval = (id, callback, timeout)=>{

            if (typeof id === 'function') {
                timeout = callback
                callback = id
                id = undefined
            }

            var widget = this.getWidget(),
                options = this.getValueOptions()


            if (widget.intervals[id] !== undefined) clearTimeout(widget.intervals[id])
            delete widget.intervals[id]

            widget.intervals[id] = setInterval(()=>{
                this.setWidget(widget)
                this.setValueOptions(options)
                try {
                    callback()
                } catch(e) {
                    console.log(e)
                }
                this.setWidget()
                this.setValueOptions()
            }, timeout)

        }

        this.sandbox.contentWindow.clearInterval = (id)=>{

            var widget = this.getWidget()

            clearInterval(widget.intervals[id])
            delete widget.intervals[id]

        }

        this.sandbox.contentWindow.unfocus = ()=>{

            // built-in client only: electron will call window.blur()
            console.debug('ELECTRON.BLUR()')

        }

        this.sandbox.contentWindow.toolbar = (...args)=>{

            var options = this.getValueOptions()

            if (!options.send) return

            toolbar = toolbar || require('../../ui/ui-toolbar')

            var action = toolbar.entries.filter(x=>!x.separator)

            for (var i of args) {
                if (action[i]) action = action[i].action
                if (!Array.isArray(action)) break
                action = action.filter(x=>!x.separator)
            }

            if (typeof action === 'function') action()

        }

        for (var imports of ['set', 'get', 'getProp', 'updateProp', 'send', 'httpGet', 'stateGet', 'stateSet', 'storage',
            'setInterval', 'clearInterval', 'setTimeout', 'clearTimeout', 'unfocus', 'setScroll', 'getScroll', 'toolbar']) {
            this.sanitize(this.sandbox.contentWindow[imports])
        }

    }

}

module.exports = ScriptVm
