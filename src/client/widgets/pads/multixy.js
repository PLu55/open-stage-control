var Pad = require('./pad'),
    Xy = require('./xy'),
    {clip} = require('../utils'),
    touchstate = require('../mixins/touch_state')


var xyDefaults = Xy.defaults()._props()


module.exports = class MultiXy extends Pad {

    static description() {

        return 'Multi-point XY pad.'

    }

    static defaults() {

        return super.defaults({

            _class_specific: 'multi xy',

            points: {type: 'integer|array', value: 2, help: [
                'Defines the number of points on the pad',
                'Can be an array of strings that will be used as labels for the points (ex: `[\'A\', \'B\']`)'
            ]},


            _separator: 'xy',

            pointSize: {type: 'integer', value: 20, help: 'Defines the points\' size'},
            snap: {type: 'boolean', value: false, help: [
                'By default, the points are dragged from their initial position.',
                'If set to `true`, touching anywhere on the widget\'s surface will make them snap to the touching coordinates',
            ]},
            spring: {type: 'boolean', value: false, help: 'When set to `true`, the widget will go back to its default value when released'},
            pips: {type: 'boolean', value: true, help: 'Set to `false` to hide the scale'},
            rangeX: {type: 'object', value: {min:0,max:1}, help: 'Defines the min and max values for the x axis'},
            rangeY: {type: 'object', value: {min:0,max:1}, help: 'Defines the min and max values for the y axis'},
            logScaleX: {type: 'boolean|number', value: false, help: 'Set to `true` to use logarithmic scale for the x axis. Set to `-1` for exponential scale.'},
            logScaleY: {type: 'boolean|number', value: false, help: 'Set to `true` to use logarithmic scale for the y axis. Set to `-1` for exponential scale.'},
            sensitivity: {type: 'number', value: 1, help: 'Defines the pad\'s sensitivity when `snap` is `false` '},

        }, [], {

            touchAddress: {type: 'string', value:'', help: 'OSC address for touched state messages: `/touchAddress [preArgs] 0/1`'},

        })

    }

    constructor(options) {

        super(options)

        this.npoints = typeof this.getProp('points') == 'object' ? this.getProp('points').length : this.getProp('points')
        this.labels = typeof this.getProp('points') == 'object'
        this.pointSize = parseInt(this.getProp('pointSize'))

        this.pads = []

        for (let i = 0; i < this.npoints; i++) {
            this.pads[i] = new Xy({props:{
                ...xyDefaults,
                snap:this.getProp('snap'),
                spring:this.getProp('spring'),
                default:this.getProp('default').length === this.getProp('points') * 2 ? [this.getProp('default')[i*2], this.getProp('default')[i*2 + 1]] : '',
                rangeX:this.getProp('rangeX'),
                rangeY:this.getProp('rangeY'),
                decimals:this.getProp('decimals'),
                logScaleX:this.getProp('logScaleX'),
                logScaleY:this.getProp('logScaleY'),
                pointSize: this.getProp('pointSize'),
                pips: this.getProp('pips') && i == this.npoints-1,
                sensitivity: this.getProp('sensitivity'),
                input:false
            }, parent: this})
            this.pads[i].canvas.classList.add('pad-' + i)
            this.widget.append(this.pads[i].canvas)

        }

        this.value = []

        this.padsCoords = []
        this.touchMap = {}

        touchstate(this, {element: this.widget, multitouch: true})

        this.on('draginit',(e)=>{

            var id

            if (!this.touchMap[e.pointerId]) {

                var ndiff, diff = -1

                for (var i in this.pads) {

                    if (Object.values(this.touchMap).indexOf(i) != -1) continue

                    ndiff = Math.abs(e.offsetX -  this.padsCoords[i][0]) + Math.abs(e.offsetY - (this.padsCoords[i][1] + this.height))

                    if (diff == -1 || ndiff < diff) {
                        id = i
                        diff = ndiff
                    }

                }

                this.touchMap[e.pointerId] = id


            }

            if (!id) return

            e.stopPropagation = true

            if (this.getProp('touchAddress')) {
                this.sendValue({
                    address: this.getProp('touchAddress'),
                    v: [parseInt(id), 1],
                })
            }

            this.pads[id].trigger('draginit', e)

        }, {element: this.widget, multitouch: true})

        this.on('drag',(e)=>{

            var i = this.touchMap[e.pointerId]

            if (!i) return

            this.pads[i].trigger('drag', e)

        }, {element: this.widget, multitouch: true})

        this.on('dragend',(e)=>{

            var i = this.touchMap[e.pointerId]

            if (!i) return

            e.stopPropagation = true

            this.pads[i].trigger('dragend', e)

            if (this.getProp('touchAddress')) {
                this.sendValue({
                    address: this.getProp('touchAddress'),
                    v: [parseInt(this.touchMap[e.pointerId]), 0],
                })
            }

            delete this.touchMap[e.pointerId]

        }, {element: this.widget, multitouch: true})

        this.on('change',(e)=>{
            if (e.widget == this) return
            e.stopPropagation = true
            this.setValue(this.getValue(), e.options)
        })

        var v = []
        for (let i = 0; i < this.npoints * 2; i = i + 2) {
            [v[i],v[i+1]]  = this.pads[i/2].getValue()
        }

        this.setValue(v)

    }

    resizeHandle(event){

        super.resizeHandle(event)

        for (var k in this.pads) {
            this.pads[k].width = this.width
            this.pads[k].height = this.height
            this.pads[k].padPadding = this.padPadding
        }

        this.updateHandlesPosition()

    }

    cacheCanvasStyle(style) {

        super.cacheCanvasStyle(style)
        for (var k in this.pads) {
            this.pads[k].cacheCanvasStyle()
            this.pads[k].batchDraw()
        }

    }

    setVisibility() {

        super.setVisibility()
        for (var k in this.pads) {
            this.pads[k].setVisibility()
        }

    }

    updateHandlesPosition() {

        for (var i=0;i<this.npoints;i++) {

            this.padsCoords[i] = [clip(this.pads[i].faders.x.percent,[0,100]) / 100 * (this.width - (this.pointSize * 2 + 2) * PXSCALE) + (this.pointSize + 1) * PXSCALE
                ,- clip(this.pads[i].faders.y.percent,[0,100]) / 100 * (this.height - (this.pointSize * 2 + 2) * PXSCALE) - (this.pointSize + 1) * PXSCALE]

        }

    }

    draw() {

        this.clear()

        for (var i=0;i<this.npoints;i++) {
            var margin = this.padPadding,
                x = clip(this.pads[i].faders.x.percent,[0,100]) / 100 * (this.width - 2 * margin) + margin,
                y = (100 - clip(this.pads[i].faders.y.percent,[0,100])) / 100 * (this.height - 2 * margin) + margin,
                t = (this.labels ? this.getProp('points')[i] : i) + '',
                length = this.fontSize * t.length

            this.ctx.fillStyle = this.pads[i].cssVars.colorText
            this.ctx.globalAlpha = this.cssVars.alphaPips
            this.ctx.fillText(t, x + 0.5 * PXSCALE, y + PXSCALE)

            this.clearRect[i] = [x - length / 2, y - this.fontSize / 2, length, this.fontSize + 2 * PXSCALE]

        }

    }

    getValue() {

        var v = []
        for (var i=0;i<this.pads.length * 2;i=i+2) {
            [v[i],v[i+1]] = this.pads[i/2].getValue()
        }
        return v

    }

    setValue(v, options={}) {

        if (!v || !v.length || v.length!=this.npoints * 2) return
        if (this.touched && !options.dragged) return this.setValueTouchedQueue = [v, options]

        for (let i=0;i<this.npoints;i++) {
            if (!options.dragged) {
                this.pads[i].setValue([v[i*2],v[i*2+1]])
            }
        }

        this.updateHandlesPosition()
        this.batchDraw()

        for (let i=0;i<this.npoints * 2;i=i+2) {
            [this.value[i],this.value[i+1]]  = this.pads[i/2].getValue()
        }

        if (options.send) this.sendValue()
        if (options.sync) this.changed(options)

    }

    onPropChanged(propName, options, oldPropValue) {

        if (super.onPropChanged(...arguments)) return true

        switch (propName) {

            case 'colorText':
            case 'colorWidget':
            case 'colorFill':
            case 'colorStroke':
            case 'alphaStroke':
            case 'alphaFillOff':
            case 'alphaFillOn':
            case 'padding':
            case 'lineWidth':
                for (var w of this.pads) {
                    w.onPropChanged(propName)
                }
                return

        }

    }

    onRemove() {
        for (var i in this.pads) {
            this.pads[i].onRemove()
        }
        super.onRemove()
    }

}
