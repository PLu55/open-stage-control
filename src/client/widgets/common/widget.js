var EventEmitter = require('../../events/event-emitter'),
    osc = require('../../osc'),
    nanoid = require('nanoid/generate'),
    widgetManager = require('../../managers/widgets'),
    {urlParser} = require('../utils'),
    Vm = require('../vm'),
    vm = new Vm(),
    scopeCss = require('scope-css'),
    resize = require('../../events/resize'),
    OscReceiver = require('./osc-receiver'),
    {deepCopy, deepEqual, isJSON} = require('../../utils'),
    html = require('nanohtml'),
    updateWidget = ()=>{},
    Script


var oscReceiverState = {}

var OSCProps = [
    'decimals',
    'address',
    'preArgs',
    'typeTags',
    'target',
    'bypass'
]

var dummyDOM

DOM.ready(()=>{
    dummyDOM = html`<div></div>`
})

setTimeout(()=>{
    updateWidget = require('../../editor/data-workers').updateWidget
})

class Widget extends EventEmitter {

    static description() {

        return ''

    }

    static defaults(insert={}, except=[], push={}, Class=Widget) {

        var defaults = {

            _widget: 'widget',

            type: {type: 'string', value: 'auto', help: 'Widget type'},
            id: {type: 'string', value: 'auto', help: 'Widgets sharing the same `id` will act as clones and update each other\'s value(s) without sending extra osc messages.' },
            visible: {type: 'boolean', value: true, help: 'Set to `false` to hide the widget.'},
            interaction: {type: 'boolean', value: true, help: 'Set to `false` to disable pointer interactions.'},

            _geometry: 'geometry',

            left: {type: 'number|string', value: 'auto', help: [
                'When both top and left are set to auto, the widget is positioned according to the normal flow of the page (from left to right, by order of creation).',
                'Otherwise, the widget will be absolutely positioned'
            ]},
            top: {type: 'number|percentage', value: 'auto', help: [
                'When both top and left are set to auto, the widget is positioned according to the normal flow of the page (from left to right, by order of creation).',
                'Otherwise, the widget will be absolutely positioned'
            ]},
            width: {type: 'number|percentage', value: 'auto', help: 'Widget width'},
            height: {type: 'number|percentage', value: 'auto', help: 'Widget height'},
            expand: {type: 'boolean|number', value: 'false', help: 'If parent\'s layout is `vertical` or `horizontal`, set this to `true` to stretch the widget to use available space automatically.'},

            _style: 'style',


            colorBg: {type: 'string', value: 'auto', help: 'Panel background color. Set to "auto" to inherit from parent widget.'},
            colorText: {type: 'string', value: 'auto', help: 'Text color. Set to "auto" to inherit from parent widget.'},
            colorWidget: {type: 'string', value: 'auto', help: 'Widget\'s default accent color. Set to "auto" to inherit from parent widget.'},
            colorStroke: {type: 'string', value: 'auto', help: 'Stroke color. Set to "auto" to use `colorWidget`.'},
            colorFill: {type: 'string', value: 'auto', help: 'Fill color. Set to "auto" to use `colorWidget`.'},
            alphaStroke: {type: 'number', value: 'auto', help: 'Stroke color opacity.'},
            alphaFillOff: {type: 'number', value: 'auto', help: 'Fill color opacity (off).'},
            alphaFillOn: {type: 'number', value: 'auto', help: 'Fill color opacity (on).'},

            lineWidth: {type: 'number', value: 'auto', help: 'Stroke width.'},
            padding: {type: 'number', value: 'auto', help: 'Inner spacing.'},



            css: {type: 'string', value: '', help: [
                'CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.',
                'Available css variables:',
                ...Class.cssVariables.map(x=>'- `' + x.css + '`: `' + x.js + '`')
            ]},

            _value: 'value',

            value: {type: '*', value: '', help: 'Define the widget\'s value depending on other widget\'s values / properties using the advanced property syntax'},
            default: {type: '*', value: '', help: 'If set, the widget will be initialized with this value when the session is loaded.'},
            linkId: {type: 'string|array', value: '', help: [
                'Widgets sharing the same `linkId` update each other\'s value(s) AND send their respective osc messages.',
                'When prefixed with >>, the `linkId` will make the widget act as a master (sending but not receiving)',
                'When prefixed with <<, the `linkId` will make the widget act as a slave (receiving but not sending)'
            ]},
            script: {type: 'script', value: '', help: 'Script executed whenever the widget\'s value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.'},

            _osc: 'osc',

            address: {type: 'string', value: 'auto', help: [
                'OSC address for sending / receiving messages, it must start with a slash (`/`)',
                'By default ("auto"), the widget\'s id is used: `/widget_id`',
            ]},
            preArgs: {type: '*|array', value: '', help: [
                'A value or array of values that will be prepended to the OSC messages.',
            ]},
            typeTags: {type: 'string', value: '', help: [
                'Defines the osc argument types, one letter per argument (including preArgs)',
                '- If empty, the types are infered automatically from the values (with numbers casted to floats by default)',
                '- If there are more arguments than type letters, the last type is used for the extra arguments',
                'See http://opensoundcontrol.org/spec-1_0 for existing typetags'
            ]},
            decimals: {type: 'integer', value: 2, help: [
                'Defines the number of decimals to send.',
            ]},
            target: {type: 'string|array|null', value: '', help: [
                'This defines the targets of the widget\'s OSC messages',
                '- A `string` or `array` of strings formatted as follow: `ip:port` or `["ip:port"]`',
                '- If midi is enabled, targets can be `midi:device_name`',
                '- If no target is set, messages can still be sent if the server has default targets',
            ]},
            ignoreDefaults: {type: 'boolean', value: false, help: 'Set to `true` to ignore the server\'s default targets'},
            bypass: {type: 'boolean', value: false, help: 'Set to `true` to prevent the widget from sending any osc message'}

        }

        // okay that's bad, but keys happen to be ordered anyway...

        var alterDefaults = {}

        for (var k in defaults) {
            if (k === '_value') {
                for (var l in insert) {
                    alterDefaults[l] = insert[l]
                }
            }
            if (except.indexOf(k) < 0) alterDefaults[k] = defaults[k]
        }

        for (var m in push) {
            if (!alterDefaults[m]) alterDefaults[m] = []
            if (typeof push[m] === 'string') alterDefaults[m] = push[m]
            else Object.assign(alterDefaults[m], push[m])
        }

        alterDefaults._props = function() {
            var props = {}
            for (var k in this) {
                if (k[0] !== '_') {
                    props[k] = this[k].value
                }
            }
            return props
        }


        return alterDefaults

    }

    constructor(options={}) {

        super()

        this.widget = options.html
        this.props = options.props
        this.errors = {}
        this.parent = options.parent
        this.parentNode = options.parentNode
        this.hash = options.hash || nanoid('abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)
        this.children = []
        this.reCreateOptions = options.reCreateOptions
        this.removed = false
        this.mounted = false
        this.visible = true

        this.parsers = {}
        this.parsersLocalScope = options.locals || {}

        this.createPropsCache()

        if (this.getProp('id') == 'root' && this.parent !== widgetManager) {
            this.props.id = '_root'
            this.cachedProps.id = '_root'
        }

        if (this.getProp('type') == 'root' && this.parent !== widgetManager) {
            this.props.type = 'panel'
            this.cachedProps.type = 'panel'
        }



        // cache decimals
        if (this.props.decimals !== undefined) {
            this.decimals = Math.min(20, Math.max(this.getProp('decimals'), 0))
        }

        Script = Script || require('../scripts/script')
        if (this.getProp('script') && !(this instanceof Script)) {
            this.script = new Script({props:{
                id: this.getProp('id') + '/script',
                script: this.getProp('script'),
                event: 'value'
            }, builtIn: true, parent: this})
            this.on('change', (e)=>{
                if (e.widget === this && this.mounted && !e.options.fromEdit) this.script.setValue(this.value, {...e.options, id: e.options.id || e.id})
            })

        }

        this.container = html`
            <div class="widget ${options.props.type}-container" id="${this.hash}" data-widget="${this.hash}"></div>
        `

        if (this.widget) this.container.appendChild(this.widget)
        this.container._widget_instance = this


        this.container.classList.toggle('no-interaction', !this.getProp('interaction'))

        this.setContainerStyles()
        this.setCssVariables()
        this.setVisibility()

    }

    contains(widget) {

        if (this.children.indexOf(widget) > 0) return true

        var parent = widget.parent
        while (parent && parent !== widgetManager) {
            if (parent === this) return true
            parent = parent.parent
        }
        return false

    }

    getAllChildren() {

        var children = []
        for (var i = 0; i < this.children.length; i++) {
            if (!this.children[i]) continue
            children.push(this.children[i])
            children = children.concat(this.children[i].getAllChildren())
        }
        return children


    }

    created(index) {

        this.trigger('widget-created', {
            id: this.getProp('id'),
            widget: this,
            options: this.reCreateOptions,
            index: index
        })

    }

    changed(options) {

        this.trigger('change', {
            widget: this,
            options: options,
            id: this.getProp('id'),
            linkId: this.getProp('linkId')
        })

    }

    sendValue(overrides, options={}) {

        if (this.selfLinkedOSCProps) {
            this.updateProps(this.selfLinkedOSCProps, this)
        }

        if (this.getProp('bypass') && !options.force) return

        var data = {
            h: this.hash,
            v: this.getValue(true),
        }

        if (this.getProp('ignoreDefaults')) data.i = 1

        if (overrides) {
            for (var k in overrides) {
                data[k] = overrides[k]
            }
        }

        if (options.syncOnly) {

            osc.sync(data)

        } else {

            osc.send(data)

        }

    }

    setValue() {}

    getValue(withdecimals) {

        return deepCopy(this.value, withdecimals ? this.decimals : undefined)

    }

    checkLinkedProps(propNames) {

        // Dynamic props cache check
        var linkedProps = []

        Object.values(this.nestedLinkedProps).forEach(l => linkedProps = linkedProps.concat(l))
        Object.values(this.linkedProps).forEach(l => linkedProps = linkedProps.concat(l))
        Object.values(this.linkedPropsValue).forEach(l => linkedProps = linkedProps.concat(l))
        Object.values(this.oscReceivers).forEach(r => linkedProps = linkedProps.concat(r.propNames))

        if (
            // if prop/osc listeners have changed (@{} / OSC{})
            // refresh the widget's props cache and update linked props bindings
            propNames.map(x => this.props[x]).some(x => typeof x === 'string' && x.match(/OSC\{|@\{/))
        ||  propNames.some(n => linkedProps.includes(n))
        ) {
            this.createPropsCache()
        }

    }

    createPropsCache() {

        // @{props} links lists
        this.linkedProps = {}
        this.nestedLinkedProps = {}
        this.linkedPropsValue = {}

        // OSC{/path} receivers
        if (this.oscReceivers) {
            this.removeOscReceivers()
        }
        this.oscReceivers = {}

        // Cache resolved props
        this.cachedProps = {}

        for (var k in this.props) {
            if (k != 'widgets' && k != 'tabs') {
                this.cachedProps[k] = this.resolveProp(k, undefined, true)
            } else {
                this.cachedProps[k] = this.props[k]
            }
        }

        this.createLinkedPropsBindings()

    }

    createLinkedPropsBindings() {

        if (!this.linkedCreatedCallback && Object.keys(this.linkedProps).length) {

            this.linkedCreatedCallback = (e)=>{
                this.onLinkedPropsChanged(e, 'widget-created')
            }

            this.linkedPropChangedCallback = (e)=>{
                this.onLinkedPropsChanged(e, 'prop-changed')
            }

            widgetManager.on('widget-created', this.linkedCreatedCallback, {context: this})
            widgetManager.on('prop-changed', this.linkedPropChangedCallback, {context: this})

        } else if (this.linkedCreatedCallback && !Object.keys(this.linkedProps).length) {

            widgetManager.off('widget-created', this.linkedCreatedCallback)
            widgetManager.off('prop-changed', this.linkedPropChangedCallback)
            delete this.linkedCreatedCallback
            delete this.linkedPropChangedCallback

        }

        if (!this.linkedValueChangedCallback && Object.keys(this.linkedPropsValue).length) {

            this.linkedValueChangedCallback = (e)=>{
                this.onLinkedPropsChanged(e, 'change')
            }

            widgetManager.on('change', this.linkedValueChangedCallback, {context: this})

        } else if (this.linkedPropsValueCallback && !Object.keys(this.linkedPropsValue).length) {

            widgetManager.off('change', this.linkedValueChangedCallback)
            delete this.linkedValueChangedCallback

        }

        var selfLinkedOSCProps = (this.linkedPropsValue['this'] || []).filter(i=>OSCProps.indexOf(i) > -1)
        this.selfLinkedOSCProps = selfLinkedOSCProps.length ? selfLinkedOSCProps : false

    }

    onLinkedPropsChanged(e, type) {

        var {id, widget, options} = e,
            changedProps = type === 'prop-changed' ? e.props : type === 'change' ? ['value'] : undefined,
            linkedProps = type === 'change' ? this.linkedPropsValue : this.linkedProps

        if (widget === this.parent) {
            if (type === 'widget-created') return
            id = 'parent'
        }

        if (widget === this) id = 'this'

        if (this.nestedLinkedProps[id]) {
            this.updateLinkedPropsWithNesting(id)
        }

        if (linkedProps[id]) {
            this.updateProps(linkedProps[id], widget, options, changedProps)
        }

    }

    removeOscReceivers() {

        osc.off(undefined, undefined, this)
        for (var i in this.oscReceivers) {
            oscReceiverState[i] = this.oscReceivers[i].value
        }
        this.oscReceivers = {}

    }

    updateLinkedPropsWithNesting(i) {

        for (var prop of this.nestedLinkedProps[i]) {

            // 1. remove all linked props found in properties bound to the nested link
            for (var linksStores of [this.linkedPropsValue, this.linkedProps]) {
                for (let id in linksStores) {
                    if (linksStores[id].includes(prop)) {
                        linksStores[id].splice(linksStores[id].indexOf(prop), 1)
                        if (!linksStores[id].length) delete linksStores[id]
                    }
                }
            }


            // 2. resolve these props again and recreate links (3rd arg to true)
            this.resolveProp(prop, undefined, true, this)

        }


    }

    resolveProp(propName, propValue, storeLinks=true, originalWidget, originalPropName, context) {

        propValue = propValue !== undefined ? propValue : deepCopy(this.props[propName])
        originalWidget = originalWidget || this
        originalPropName = originalPropName || propName

        var variables = {},
            defaultScope = this.constructor.parsersContexts[propName] || {},
            jsScope = context || {},
            varnumber = 999

        if (typeof propValue == 'string') {

            propValue = propValue.replace(/@\{[^{}]*((@\{[^{}]*\}|[^{}]*)*)\}/g, (m, nested)=>{
                // pretty regexp:
                // @\{
                //     [^{}]*
                //     ((
                //         @\{
                //             [^{}]*
                //         \}
                //         |
                //         [^{}]*
                //     )*)
                //
                // \}

                if (nested) {
                    m = m.replace(nested, this.resolveProp(propName, nested, storeLinks ? 'nested' : false, this))
                }

                let id = m.substr(2, m.length - 3).split('.'),
                    k, subk

                if (id.length > 1) {

                    k = id.pop()
                    subk = undefined

                    if (id.length > 1) {
                        subk = k
                        k = id.pop()
                    }

                    id = id.join('.')

                } else {

                    id = id[0]
                    k = 'value'

                }

                var widgets = id == 'parent' && this.parent ?
                    [this.parent] : id == 'this' ? [this] :
                        widgetManager.getWidgetById(id)

                if (!widgets.length) {
                    var parent = this.parent
                    while (parent && parent != widgetManager) {
                        if (parent.getProp('id') == id) {
                            widgets.push(parent)
                            break
                        }
                        parent = parent.parent
                    }
                }


                // ignore clone wrapper in @parent stack (https://github.com/jean-emmanuel/open-stage-control/issues/379)
                if (widgets[0] === this.parent && this.parent !== widgetManager && this.parent.getProp('type') === 'clone') widgets = [this.parent.parent]

                if (storeLinks) {

                    if (k == 'value') {

                        if (!this.linkedPropsValue[id]) this.linkedPropsValue[id] = []
                        if (this.linkedPropsValue[id].indexOf(propName) == -1) this.linkedPropsValue[id].push(propName)

                    } else {

                        if (!this.linkedProps[id]) this.linkedProps[id] = []
                        if (this.linkedProps[id].indexOf(propName) == -1) this.linkedProps[id].push(propName)

                    }

                    if (storeLinks === 'nested') {
                        if (!this.nestedLinkedProps[id]) this.nestedLinkedProps[id] = []
                        if (this.nestedLinkedProps[id].indexOf(propName) == -1) this.nestedLinkedProps[id].push(propName)
                    }

                }

                for (var i in widgets) {

                    if (widgets[i] === widgetManager) continue

                    if (widgets[i].props[k] !== undefined || k === 'value') {

                        if (k !== 'value' && originalPropName === k && widgets[i] === originalWidget) {
                            return 'ERR_CIRCULAR_REF'
                        }

                        var r = k == 'value' ?
                            widgets[i].getValue(true) :
                            widgets[i].resolveProp(k, undefined, storeLinks, originalWidget, originalPropName)

                        if (subk !== undefined && r !== undefined) r = r[subk]

                        var varname = 'VAR_' + varnumber
                        varnumber--

                        variables[varname] = r
                        jsScope[varname] = r

                        return varname

                    }

                }

            })

            propValue = propValue.replace(/OSC\{([^}]+)\}/g, (m, args)=>{

                let [address, value, usePreArgs] = args.split(',')
                        .map(x=>x.trim())
                        .map(x=>x.replace(/VAR_[0-9]+/g, (m)=>{
                            return typeof variables[m] === 'string' ? variables[m] : JSON.stringify(variables[m])
                        }))

                if (!this.oscReceivers[args]) {
                    this.oscReceivers[args] = new OscReceiver({
                        address: address,
                        value: value,
                        parent: this,
                        propName: propName,
                        usePreArgs: usePreArgs === 'false' ? false : true
                    })
                    if (oscReceiverState[args]) {
                        this.oscReceivers[args].value = oscReceiverState[args]
                        delete oscReceiverState[args]
                    }
                } else {
                    this.oscReceivers[args].setAddress(address)
                    this.oscReceivers[args].addProp(propName)
                    this.oscReceivers[args].usePreArgs = usePreArgs === 'false' ? false : true
                }

                var r = this.oscReceivers[args].value

                var varname = 'VAR_' + varnumber
                varnumber--

                variables[varname] = r
                jsScope[varname] = r

                return varname
            })

            try {
                propValue = propValue.replace(/JS\{\{([\s\S]*)\}\}/g, (m, code)=>{

                    if (!this.parsers[code]) this.parsers[code] = vm.compile(code, defaultScope)

                    let r = this.parsers[code](jsScope, this.parsersLocalScope)

                    if (r === undefined) r = ''

                    return typeof r !== 'string' ? JSON.stringify(r) : r

                })
            } catch (err) {
                let stackline = err.stack ? (err.stack.match(/>:([0-9]+):[0-9]+/) || '') : '',
                    line = stackline.length > 1 ? ' at line ' + (parseInt(stackline[1]) - 2) : ''
                console.log((this.getProp('id') || this.props.id) + '.' + propName + ': JS{{}} error:\n' + err + line)
            }

            try {
                propValue = propValue.replace(/#\{(?:[^{}]|\{[^{}]*\})*\}/g, (m)=>{
                    // one bracket nesting allowed, if we need two: #\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}

                    var code = m.substr(2, m.length - 3).trim()

                    if (!this.parsers[code]) this.parsers[code] = vm.compile('return ' + code, defaultScope)

                    let r = this.parsers[code](jsScope, this.parsersLocalScope)

                    if (r === undefined) r = ''

                    return typeof r !== 'string' ? JSON.stringify(r) : r

                })
            } catch (err) {
                let stackline = err.stack ? (err.stack.match(/>:([0-9]+):[0-9]+/) || '') : '',
                    line = stackline.length > 1 ? ' at line ' + (parseInt(stackline[1]) - 2) : ''
                console.log((this.getProp('id') || this.props.id) + '.' + propName + ': #{} error:\n' + err + line)
            }

            for (let k in variables) {
                var v = typeof variables[k] === 'string' ? variables[k] : JSON.stringify(variables[k])
                propValue = propValue.replace(new RegExp(k, 'g'), v)
            }

            if (isJSON(propValue)) {
                try {
                    propValue = JSON.parse(propValue)
                } catch (err) {}
            }

        } else if (propValue != null && typeof propValue == 'object') {
            for (let k in propValue) {
                propValue[k] = this.resolveProp(propName, propValue[k], storeLinks, originalWidget, originalPropName, context)
            }
        }

        return propValue


    }

    getProp(propName) {
        return this.cachedProps[propName]
    }


    isDynamicProp(propName) {

        return this.constructor.dynamicProps.indexOf(propName) !== -1

    }

    updateProps(propNames, widget, options, updatedProps = []) {

        if (propNames.includes('value')) {
            propNames.splice(propNames.indexOf('value'), 1)
            propNames.push('value')
        }

        if (widget && options) options.id = widget.getProp('id')

        var reCreate = false,
            changedProps = []

        for (var propName of propNames) {

            if (widget === this && updatedProps.includes(propName)) continue

            let propValue = this.resolveProp(propName, undefined, false),
                oldPropValue = this.getProp(propName)

            if (!deepEqual(oldPropValue, propValue)) {

                if (!this.isDynamicProp(propName)) {

                    if ((!widget || !this.contains(widget)) && !(widget === this && updatedProps.length === 1 && updatedProps[0] === 'value')) {
                        reCreate = true
                        break
                    }

                } else {

                    this.cachedProps[propName] = propValue
                    changedProps.push({propName, oldPropValue})

                }


            }
        }

        if (reCreate) {

            return this.reCreateWidget({reCreateOptions: options})

        }

        if (options && options.fromEditor) {
            this.checkLinkedProps(propNames)
        }

        if (changedProps.length) {

            for (var i in changedProps) {
                this.onPropChanged(changedProps[i].propName, options, changedProps[i].oldPropValue)
            }

            widgetManager.trigger('prop-changed', {
                id: this.getProp('id'),
                props: changedProps,
                widget: this,
                options: options
            })

        }

    }

    onPropChanged(propName, options={}, oldPropValue) {

        switch(propName) {

            case 'value':
                this.setValue(this.getProp('value'), {sync: true, send: options.send, id: options.id})
                return

            case 'top':
            case 'left':
                this.setContainerStyles(['geometry'])
                return

            case 'height':
            case 'width':
            case 'expand': {
                this.setContainerStyles(['geometry'])
                let container = this.parent !== widgetManager && this.parent.getProp('layout') !== 'default' ? this.parent.container : this.container
                resize.check(container)
                return
            }

            case 'visible': {
                this.setVisibility()
                let container = this.parent !== widgetManager && this.parent.getProp('layout') !== 'default' ? this.parent.container : this.container
                resize.check(container)
                return
            }

            case 'interaction':
                this.container.classList.toggle('no-interaction', !this.getProp('interaction'))
                return

            case 'css': {
                this.setContainerStyles(['css'])
                var re = /width|height|display|margin|padding|flex/
                if (re.test(oldPropValue) || re.test(this.getProp('css'))) {
                    let container = this.parent !== widgetManager && this.parent.getProp('layout') !== 'default' ? this.parent.container : this.container
                    resize.check(container)
                }
                return
            }

            case 'colorText':
            case 'colorWidget':
            case 'colorFill':
            case 'colorStroke':
            case 'alphaStroke':
            case 'alphaFillOff':
            case 'alphaFillOn':
            case 'lineWidth':
            case 'padding':
                this.setCssVariables()
                return

            case 'decimals':
                this.decimals = Math.min(20, Math.max(this.getProp('decimals'), 0))
                return

            case 'address':
            case 'preArgs':
            case 'typeTags':
            case 'target':
                if (propName === 'address') {
                    for (var k in this.oscReceivers) {
                        var receiver = this.oscReceivers[k]
                        if (receiver.prefix !== '') {
                            receiver.setAddress()
                        }
                    }
                }
                var data = {},
                    oldData = {
                        preArgs: propName == 'preArgs' ? oldPropValue : this.getProp('preArgs'),
                        address: propName == 'address' ? oldPropValue : this.getProp('address')
                    }
                data[propName] = this.getProp(propName)

                if (data.address === 'auto')  data.address = '/' + this.getProp('id')
                if (oldData.address === 'auto')  oldData.address = '/' + this.getProp('id')

                widgetManager.registerWidget(this, data, oldData)
                return

        }

    }

    setContainerStyles(styles = ['geometry', 'css', 'visibility']) {

        if (styles.includes('geometry')) {

            // geometry
            var absolutePos = false
            for (let d of ['width', 'height', 'top', 'left']) {
                let val = this.getProp(d),
                    geometry

                if (val !== undefined) {
                    if (parseFloat(val) < 0) val = 0
                    geometry = parseFloat(val) == val ? parseFloat(val)+'rem' : val
                }

                if (geometry) {
                    if (geometry === 'auto') geometry = ''
                    this.container.style[d] = geometry
                    if (d === 'width') this.container.style.minWidth = geometry
                    if (d === 'height') this.container.style.minHeight = geometry
                    absolutePos = absolutePos || geometry && (d === 'top' || d === 'left')

                }
            }
            this.container.classList.toggle('absolute-position', absolutePos)
            this.container.classList.toggle('flex-expand', this.getProp('expand'))


        }

        if (styles.includes('css')) {

            // css
            var css = String(this.getProp('css')),
                extraCssClasses = []

            // extra css "class" property
            css = css.replace(/^[^\S\n]*class[^\S\n]*:[^\S\n]*([^;\n\s]+);?/igm, (m, c)=>{
                if (c === 'widget' || c.includes('-container')) return m
                extraCssClasses.push(c.replace(/"'/g,''))
                return ''
            })


            // escpape windows absolute file paths
            css = css.replace(/url\(([^)]*)\)/g, (m, url)=>{
                var parser = urlParser(url)
                if (!parser.protocol.match(/http|data/)) m = m.replace(':', '_:_')
                m = m.replace(/\\/g, '\\\\')
                return m
            })


            var prefix = '#' + this.hash,
                scopedCss = scopeCss(css, prefix),
                unScopedCss = ''


            try {

                dummyDOM.style = css
                unScopedCss = dummyDOM.getAttribute('style') || ''

            } catch(err) {

                // fallback for browser that don't allow assigning "style" property
                css
                    .replace(/\{[^}]*\}/g, '')
                    .replace(/^[^@#.]*:.*/gm, (m)=>{
                        unScopedCss += m[m.length - 1] === ';' ? m : m + ';'
                    })

            }



            if (scopedCss.indexOf('@keyframes') > -1) scopedCss = scopedCss.replace(new RegExp(prefix + '\\s+([0-9]+%|to|from)', 'g'), ' $1')
            if (scopedCss.indexOf('&') > -1) scopedCss = scopedCss.replace(new RegExp(prefix + '\\s&', 'g'), prefix)

            var style = html`<style>${unScopedCss ? prefix + '{' + unScopedCss + '}\n' : ''}${scopedCss}</style>`,
                oldStyle = DOM.get(this.container, '> style')[0]

            if (oldStyle) {
                this.container.replaceChild(style, oldStyle)
            } else if (scopedCss.length || unScopedCss.length){
                this.container.insertBefore(style, this.container.childNodes[0] || null)
            }


            // apply extra css classes

            if (this.extraCssClasses && this.extraCssClasses.length) {
                this.container.classList.remove(...this.extraCssClasses)
                this.extraCssClasses = []
            }

            if (extraCssClasses.length) {
                this.container.classList.add(...extraCssClasses)
                this.extraCssClasses = extraCssClasses
            }


            // store transform matrix if any
            // if (css.includes('transform')) {
            //     setTimeout(()=>{
            //         var style = window.getComputedStyle(this.container)
            //         this.cssTransform = style.transform || 'none'
            //         this.cssTransformOrigin = style.transformOrigin
            //     })
            // } else {
            //     this.cssTransform = 'none'
            // }


        }

        return style


    }

    setCssVariables() {


        for (var data of this.constructor.cssVariables) {

            var val = this.getProp(data.js)
            this.container.style.setProperty(data.css, val !== undefined && val !== 'auto' ? data.toCss ? data.toCss(val) : val : '')

        }

    }

    isVisible() {

        return this.getProp('visible') && this.parent.isVisible()

    }

    setVisibility() {


        var visible = this.isVisible()
        if (visible !== this.visible) {
            this.visible = visible
            this.container.style.display = this.getProp('visible') ? '' : 'none'

            for (var c of this.children) {
                if (c) c.setVisibility()
            }

        }

    }

    reCreateWidget(options={}){

        if (!this.removed) return updateWidget(this, options)

    }

    onRemove(){

        if (this.getProp('script') && !(this instanceof Script)) {
            this.script.onRemove()
        }

        this.removed = true
        widgetManager.off(undefined, undefined, this)
        this.removeOscReceivers()

    }

}

Widget.parsersContexts = {}

Widget.cssVariables = [
    {js: 'colorBg', css: '--color-background'},
    {js: 'colorWidget', css: '--color-widget'},
    {js: 'colorFill', css: '--color-fill'},
    {js: 'colorStroke', css: '--color-stroke'},
    {js: 'colorText', css: '--color-text'},
    {js: 'padding', css: '--widget-padding', toCss: x=>parseFloat(x) + 'rem', toJs: x=>parseFloat(x) * PXSCALE},
    {js: 'lineWidth', css: '--line-width', toCss: x=>parseFloat(x) + 'rem', toJs: x=>parseFloat(x) * PXSCALE},
    {js: 'alphaFillOn', css: '--alpha-fill-on', toCss: x=>parseFloat(x), toJs: x=>parseFloat(x)},
    {js: 'alphaFillOff', css: '--alpha-fill-off', toCss: x=>parseFloat(x), toJs: x=>parseFloat(x)},
    {js: 'alphaStroke', css: '--alpha-stroke', toCss: x=>parseFloat(x), toJs: x=>parseFloat(x)},
]

Widget.dynamicProps = [
    'visible',
    'interaction',

    'top',
    'left',
    'height',
    'width',
    'expand',


    'colorText',
    'colorWidget',
    'colorFill',
    'colorStroke',
    'alphaStroke',
    'alphaFillOff',
    'alphaFillOn',
    'padding',
    'lineWidth',
    'css',

    'value',

    'decimals',
    'address',
    'preArgs',
    'typeTags',
    'target',
    'bypass'
]

module.exports = Widget
