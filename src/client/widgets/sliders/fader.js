var {clip} = require('../utils'),
    Slider = require('./slider')

class Fader extends Slider {

    static description() {

        return 'Vertical / horizontal slider.'

    }

    static defaults() {

        return super.defaults({

            _class_specific: 'fader',

            design: {type: 'string', value: 'default', choices: ['default', 'round', 'compact'], help: 'Design style'},
            knobSize: {type: 'number', value: 'auto', help: 'Fader knob size'},
            horizontal: {type: 'boolean', value: false, help: 'Set to `true` to display the fader horizontally'},
            pips: {type: 'boolean', value: false, help: 'Set to `true` to show range breakpoints (ignored if `design` is `compact`)'},
            dashed: {type: 'boolean|array', value: false, help: 'Set to `true` to display a dashed gauge. Can be set as an `array` of two numbers : `[dash_size, gap_size]`'},
            gradient: {type: 'array|object', value: [], help: [
                'When set, the meter\'s gauge will be filled with a linear color gradient',
                '- each item must be a CSS color string.',
                '- as an `object`: each key must be a number between 0 and 1',
                '- each item must be a CSS color string.',
                'Examples: `[\'blue\', \'red\']`, {\'0\': \'blue\', \'0.9\': \'blue\', \'1\': \'red\'} '
            ]},
            snap: {type: 'boolean', value: false, help: 'By default, dragging the widget will modify it\'s value starting from its last value. Setting this to `true` will make it snap directly to the mouse/touch position'},
            spring: {type: 'boolean', value: false, help: 'When set to `true`, the widget will go back to its `default` value when released'},
            doubleTap: {type: 'boolean', value: false, help: [
                'Set to `true` to make the fader reset to its `default` value when receiving a double tap.',
                'Can also be an osc address, in which case the widget will just send an osc message (`/<doubleTap> <preArgs>`)'
            ]},
            range: {type: 'object', value: {min:0,max:1}, help: [
                'Defines the breakpoints of the fader\'s scale:',
                '- keys can be percentages and/or `min` / `max`',
                '- values can be `number` or `object` if a custom label is needed',
                'Example: (`{min:{"-inf": 0}, "50%": 0.25, max: {"+inf": 1}}`)'
            ]},
            logScale: {type: 'boolean|number', value: false, help: 'Set to `true` to use logarithmic scale. Set to `-1` for exponential scale.'},
            sensitivity: {type: 'number', value: 1, help: 'Defines the fader\'s sensitivity when `snap` is `false` '},
            steps: {type: 'string|number|array', value: '', help: [
                'Restricts the widget\'s value:',
                '- `auto`: use values defined in `range`',
                '- `number`: define a number of evenly spaced steps',
                '- `array`: use arbitrary values',
            ]},
            origin: {type: 'number', value: 'auto', help: 'Defines the starting point\'s value of the fader\'s gauge'},

        }, [], {

            touchAddress: {type: 'string', value:'', help: 'OSC address for touched state messages: `/touchAddress [preArgs] 0/1`'},

        }, Fader)

    }

    constructor(options) {

        super(options)

        this.container.classList.toggle('horizontal', this.getProp('horizontal'))

        this.gaugeGradient = null

        var dashed = this.getProp('dashed')
        this.dashed = dashed ? Array.isArray(dashed) ? dashed.map(x=>parseFloat(x)) : [1, 1] : false

    }

    draginitHandle(e) {

        super.draginitHandle(...arguments)

        this.percent = clip(this.percent,[0,100])

        if (!(e.traversing || this.getProp('snap'))  || e.ctrlKey) return

        this.percent = this.getProp('horizontal')?
            (e.offsetX - this.gaugePadding) / (this.width - this.gaugePadding * 2) * 100:
            (this.height - e.offsetY - this.gaugePadding) / (this.height - this.gaugePadding * 2) * 100

        this.setValue(this.percentToValue(this.percent), {send: true, sync: true, dragged: true})

    }

    dragHandle(e, data) {

        super.dragHandle(...arguments)

        var padding = this.gaugePadding
        if (this.getProp('design') === 'compact') padding += this.cssVars.knobSize / 2

        this.percent = this.getProp('horizontal')?
            this.percent + ( e.movementX / (this.width - padding * 2)) * 100 / e.inertia * this.getProp('sensitivity'):
            this.percent + (-e.movementY / (this.height - padding * 2)) * 100  / e.inertia * this.getProp('sensitivity')

        this.setValue(this.percentToValue(this.percent), {send:true,sync:true,dragged:true})

    }

    percentToCoord(percent) {

        if (this.getProp('horizontal')) {
            return clip(percent / 100,[0,1]) * (this.width - this.gaugePadding * 2) + this.gaugePadding
        } else {
            return (this.height - this.gaugePadding) - clip(percent / 100, [0,1]) * (this.height - this.gaugePadding * 2)
        }

    }

    resizeHandle(event) {

        var ratio = CANVAS_SCALING * this.scaling

        super.resizeHandle(event)

        if (this.getProp('horizontal')){
            this.ctx.setTransform(1, 0, 0, 1, 0, 0)
            this.ctx.rotate(-Math.PI/2)
            this.ctx.translate(-this.height * ratio, 0)

            if (ratio != 1) this.ctx.scale(ratio, ratio)
        }

        if (this.getProp('gradient')) {

            var colors = this.getProp('gradient')

            if (
                (Array.isArray(colors) && colors.length > 1) ||
                (typeof colors === 'object' && Object.keys(colors).length > 1)
            ) {

                var grad = this.ctx.createLinearGradient(0,  this.getProp('horizontal') ? 0 : this.height, 0, this.getProp('horizontal') ? this.width : 0)

                try {
                    if (Array.isArray(colors)) {

                        for (var i in colors) {
                            grad.addColorStop(i / (colors.length - 1), colors[i])
                        }
                        this.gaugeGradient = grad

                    } else {

                        for (var k in colors) {
                            if (!isNaN(k)) {
                                grad.addColorStop(clip(k, [0, 1]), colors[k])
                            }
                        }
                        this.gaugeGradient = grad

                    }
                } catch(err) {
                    this.errors.gradient = err
                }

            }

        }


    }

    cacheCanvasStyle(style) {

        super.cacheCanvasStyle(style)

        if (this.getProp('pips') && this.getProp('design') !== 'compact') this.drawPips()

    }


    draw() {

        var width = this.getProp('horizontal') ? this.height : this.width,
            height = !this.getProp('horizontal') ? this.height : this.width

        var percent = this.getProp('steps') ? this.valueToPercent(this.value) : this.percent,
            d = Math.round(this.percentToCoord(percent)),
            o = Math.round(this.percentToCoord(this.valueToPercent(this.originValue))),
            m = this.getProp('horizontal') ? this.height / 2 : this.width / 2,
            dashed = this.dashed,
            compact = this.getProp('design') === 'compact',
            knobHeight = this.cssVars.knobSize, knobWidth = knobHeight * .6

        this.clear()

        if (this.getProp('pips') && !compact) m -= 10 * PXSCALE

        // sharp border trick
        if (compact) {
            if (width % 2 && parseInt(m) === m) m -= 0.5
        } else {
            if (width % 2 && parseInt(m) !== m) m -= 0.5
        }


        this.ctx.strokeStyle = this.gaugeGradient || this.cssVars.colorFill

        if (compact) {
            this.ctx.lineWidth = Math.round(width - this.gaugePadding * 2)
        } else {
            this.ctx.lineWidth = this.cssVars.lineWidth
        }


        if (dashed) this.ctx.setLineDash([PXSCALE * dashed[0], PXSCALE * dashed[1]])


        if (this.cssVars.alphaFillOff) {
            // gaugo off
            this.ctx.globalAlpha = this.cssVars.alphaFillOff
            this.ctx.beginPath()
            this.ctx.moveTo(m, height - this.gaugePadding)
            this.ctx.lineTo(m, this.gaugePadding)
            this.ctx.stroke()
        }


        if (this.cssVars.alphaFillOn) {
            // gaugo on
            this.ctx.globalAlpha = this.cssVars.alphaFillOn
            this.ctx.beginPath()
            this.ctx.moveTo(m, o)
            this.ctx.lineTo(m, d)
            this.ctx.stroke()
        }

        if (dashed) this.ctx.setLineDash([])

        if (compact) {

            // stroke
            if (this.cssVars.lineWidth) {

                this.ctx.globalAlpha = this.cssVars.alphaStroke
                this.ctx.strokeStyle = this.cssVars.colorStroke

                this.ctx.beginPath()
                this.ctx.moveTo(0, 0)
                this.ctx.lineTo(width, 0)
                this.ctx.lineTo(width, height)
                this.ctx.lineTo(0, height)
                this.ctx.closePath()
                this.ctx.lineWidth = 2 * this.cssVars.lineWidth
                this.ctx.stroke()

            }


            // flat knob

            this.ctx.globalAlpha = 1
            this.ctx.fillStyle = this.cssVars.colorFill

            this.ctx.beginPath()
            d = d / (height - this.gaugePadding) * (height-this.gaugePadding - knobHeight)
            this.ctx.rect(this.gaugePadding, d, width - this.gaugePadding * 2, knobHeight)
            this.ctx.fill()

            this.clearRect = [0, 0, width, height]


        } else if (this.getProp('design') === 'default') {


            if (this.cssVars.alphaStroke) {

                this.ctx.globalAlpha = 1
                this.ctx.fillStyle = this.cssVars.colorBg

                this.ctx.beginPath()
                this.ctx.rect(m - knobWidth / 2, d - knobHeight / 2, knobWidth, knobHeight)
                this.ctx.fill()


                this.ctx.globalAlpha = this.cssVars.alphaStroke
                this.ctx.strokeStyle = this.cssVars.colorStroke

                this.ctx.beginPath()
                this.ctx.lineWidth = PXSCALE
                this.ctx.rect(m - knobWidth / 2 + 0.5 * PXSCALE, d - knobHeight / 2  + 0.5 * PXSCALE, knobWidth - PXSCALE, knobHeight - PXSCALE)
                this.ctx.stroke()

            }

            this.ctx.globalAlpha = 1
            this.ctx.fillStyle = this.cssVars.colorStroke

            this.ctx.beginPath()
            this.ctx.rect(m - knobWidth / 6, d, knobWidth / 3, PXSCALE)
            this.ctx.fill()

            this.clearRect = [m - knobWidth / 2 - PXSCALE, this.gaugePadding - knobHeight / 2  - PXSCALE, knobWidth + 2 * PXSCALE, height - 2 * this.gaugePadding + knobHeight + 2 * PXSCALE]

        } else {

            this.ctx.globalAlpha = 1
            this.ctx.fillStyle = this.cssVars.colorFill

            this.ctx.beginPath()
            this.ctx.arc(m, d, knobHeight / 6, 0, 2 * Math.PI)
            this.ctx.fill()


            if (this.cssVars.alphaStroke) {
                this.ctx.globalAlpha = this.cssVars.alphaStroke
                this.ctx.fillStyle = this.cssVars.colorFill

                this.ctx.beginPath()
                this.ctx.arc(m, d, knobHeight / 2, 0, 2 * Math.PI)
                this.ctx.fill()
            }

            this.clearRect = [m - knobHeight / 2 - PXSCALE, this.gaugePadding - knobHeight / 2  - PXSCALE, knobHeight + 2 * PXSCALE, height - 2 * this.gaugePadding + knobHeight + 2 * PXSCALE]

        }

        if (this.getProp('pips') && !compact) {
            this.ctx.globalAlpha = 1
            this.ctx.drawImage(this.pips, 0, 0)
            if (!compact) this.clearRect = [this.clearRect, [m + knobWidth / 2, 0, 12 * PXSCALE + this.pipsTextSize, height]]
        }


    }

    drawPips() {

        this.pips = this.canvas.cloneNode()
        this.pips.width = this.getProp('horizontal') ? this.height : this.width
        this.pips.height = !this.getProp('horizontal') ? this.height : this.width
        this.pipsTextSize = this.fontSize


        var ctx = this.pips.getContext('2d',{
            desynchronized: true,
            lowLatency: true,
            alpha: true,
            preserveDrawingBuffer: true
        })

        ctx.font = this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily
        ctx.textBaseline = this.ctx.textBaseline
        ctx.textAlign = this.ctx.textAlign

        var width = this.getProp('horizontal') ? this.height : this.width,
            height = !this.getProp('horizontal') ? this.height : this.width,
            m = this.getProp('horizontal') ? this.height / 2 : this.width / 2,
            compact = this.getProp('design') === 'compact'

        if (width % 2 && parseInt(m) !== m) m -= 0.5

        if (!compact) m -= 16 * PXSCALE - this.cssVars.knobSize * .3 * PXSCALE


        ctx.lineWidth = this.fontSize / 11
        ctx.fillStyle = this.cssVars.colorText
        ctx.strokeStyle = this.cssVars.colorFill

        var i = 0

        for (var pip of this.rangeKeys) {

            let d = Math.round(this.percentToCoord(pip)),
                y = compact ? Math.min(d, height - this.gaugePadding - PXSCALE) : d,
                pipWidth = 4 * PXSCALE

            y += 0.5


            ctx.globalAlpha = this.cssVars.alphaPips

            ctx.beginPath()

            ctx.moveTo(m + 7 * PXSCALE, y)
            ctx.lineTo(m + 7 * PXSCALE + pipWidth, y)
            ctx.stroke()


            var textX = m + 10 * PXSCALE + pipWidth + 4 * PXSCALE,
                textY = y

            ctx.globalAlpha = this.cssVars.alphaPipsText


            if (this.getProp('horizontal')) {

                ctx.save()
                ctx.translate(textX + 3 *  PXSCALE, textY)
                ctx.rotate(Math.PI/2)
                ctx.textAlign = 'center'
                ctx.fillText(this.rangeLabels[i], 0, 0)
                ctx.restore()

            } else {

                this.pipsTextSize  = Math.max(this.pipsTextSize , ctx.measureText(this.rangeLabels[i]).width)
                ctx.fillText(this.rangeLabels[i], textX, textY)

            }


            i++

        }


    }

}


Fader.cssVariables = Fader.prototype.constructor.cssVariables.concat(
    {js: 'knobSize', css: '--knob-size', toCss: x=>parseFloat(x) + 'rem', toJs: x=>parseFloat(x) * PXSCALE}
)

module.exports = Fader
