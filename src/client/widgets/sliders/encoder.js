var Knob = require('./knob'),
    Widget = require('../common/widget'),
    StaticProperties = require('../mixins/static_properties')


module.exports = class Encoder extends StaticProperties(Knob, {angle: 360, range: {min: 0, max: 1}, sensitivity: 1, steps: ''}) {

    static description() {

        return 'A knob that sends a relative direction infomation instead of an absolute value.'

    }

    static defaults() {

        return Widget.defaults({

            _class_specific: 'encoder',

            ticks: {type: 'number', value: 360, help: 'defines the granularity / verbosity of the encoder (number of step for a 360° arc)'},
            back: {type: '*', value: -1, help: 'Defines which value is sent when rotating the encoder anticlockwise'},
            forth: {type: '*', value: 1, help: 'Defines which value is sent when rotating the encoder clockwise'},
            release: {type: 'number', value: '', help: [
                'Defines which value is sent when releasing the encoder:',
                '- Set to `null` to send send no argument in the osc message',
                '- Can be an `object` if the type needs to be specified'
            ]},
            mode: {type: 'string', value: 'circular', choices: ['circular', 'snap', 'vertical'], help: [
                '- `circular`: relative move in circular motion',
                '- `snap`: snap to touch position and move in vertical motion',
                '- `vertical`: relative move in vertical motion',
            ]},
            doubleTap: {type: 'boolean', value: false, help: [
                'Set to `true` to make the fader reset to its `default` value when receiving a double tap.',
                'Can also be an osc address, in which case the widget will just send an osc message (`/<doubleTap> <preArgs>`)'
            ]},

        }, [], {

            touchAddress: {type: 'string', value:'', help: 'OSC address for touched state messages: `/touchAddress [preArgs] 0/1`'},

        })

    }

    constructor(options) {

        super(options)

        this.previousPercent = 50
        this.percent = 50
        this.setValue(this.getProp('release'), {dragged: true})

    }

    angleToPercent(angle, snap) {

        // knob.js without clipping
        if (snap) return super.angleToPercent(angle)

        var percent = angle - (360 - this.maxAngle) / 2 / this.maxAngle * 100
        if (percent < 0) percent += 100
        else if (percent > 100) percent -= 100

        return percent

    }

    percentToAngle(percent, snap) {

        // knob.js without clipping
        if (snap) return super.percentToAngle(percent)

        return  2 * Math.PI * percent / 100 * (this.maxAngle / 360) // angle relative to maxAngle
                + Math.PI / 2                                       // quarter circle offset
                + Math.PI * (1 - this.maxAngle / 360)               // centering offset depending on maxAngle

    }


    draginitHandle(e) {

        // knob.js without clipping + extra case for snap

        this.lastOffsetX = e.offsetX
        this.lastOffsetY = e.offsetY

        if (this.getProp('mode') === 'snap') {

            this.setPercent(this.angleToPercent(this.coordsToAngle(e.offsetX, e.offsetY), true))

        }



    }

    dragHandle(e) {

        // knob.js without clipping + extra case for snap

        if ((this.getProp('mode') === 'vertical' && !e.traversing) || e.ctrlKey) {
            // vertical
            this.setPercent(-100 * (e.movementY / e.inertia * this.getProp('sensitivity')) / this.height + this.percent)

        } else {
            // snap or circular
            var offsetX = this.lastOffsetX + e.movementX,
                offsetY = this.lastOffsetY + e.movementY

            if (e.traversing || this.getProp('mode') === 'circular') {
                // circular
                var diff = this.angleToPercent(this.coordsToAngle(offsetX, offsetY), true) - this.angleToPercent(this.coordsToAngle(this.lastOffsetX, this.lastOffsetY), true)
                if (Math.abs(diff) < 50 && diff !== 0) this.setPercent(this.percent + diff)

            } else {

                // snap
                this.setPercent(this.angleToPercent(this.coordsToAngle(offsetX, offsetY), true))

            }

            this.lastOffsetX = offsetX
            this.lastOffsetY = offsetY

        }

    }

    dragendHandle(e, data, traversing) {

        if (this.getProp('release') === '') return

        this.previousPercent = 50
        this.percent = 50
        this.setValue(this.getProp('release'), {sync: true, send: true, dragged: true})

    }

    mousewheelHandle(e) {

        if (e.wheelDeltaX) return

        e.preventDefault()
        e.stopPropagation()

        var direction = e.wheelDelta / Math.abs(e.wheelDelta),
            increment = e.ctrlKey?0.25:1

        this.setPercent(this.percent +  Math.max(increment, 10 / Math.pow(10, this.decimals + 1)) * direction)

    }

    setPercent(percent) {

        var div = 100 / this.getProp('ticks')
        percent = Math.round(percent / div) * div

        this.previousPercent = this.percent
        this.percent = percent

        if (this.percent === this.previousPercent) return

        var dir = this.percent > this.previousPercent

        if (
            (this.percent >= 0 && this.percent < 25 && this.previousPercent > 75 && this.previousPercent <= 100) ||
            (this.previousPercent >= 0 && this.previousPercent < 25 && this.percent > 75 && this.percent <= 100)

        ) dir = !dir

        var val = dir ? this.getProp('forth') : this.getProp('back')

        this.setValue(val, {
            sync: true,
            send: true,
            dragged: true,
        })

    }

    getSpringValue() {

        return this.getProp('release')

    }

    setValue(v,options={}) {

        if (options.fromLocal && v === this.getProp('release')) {
            this.percent = 50
            this.previousPercent = 50
        } else if (
            !options.dragged ||
            (v !== this.getProp('forth') && v !== this.getProp('back') && (this.getProp('release') === '' && v !== this.getProp('release')))

        ) return

        this.value = v

        this.batchDraw()

        if (options.send) this.sendValue()
        if (options.sync) this.changed(options)

    }

    draw() {

        var percent = this.percent,
            d = this.percentToAngle(percent),
            angle = 2 * Math.PI / 16,
            min = this.percentToAngle(0),
            max = this.percentToAngle(100),
            minRadius = this.minDimension / 6,
            maxRadius = this.minDimension / 2 - this.cssVars.lineWidth,
            gaugeWidth = maxRadius - minRadius,
            gaugeRadius = maxRadius - gaugeWidth / 2

        this.clear()

        if (this.minDimension < 40) {
            minRadius /= 2
            gaugeWidth = maxRadius - minRadius
            gaugeRadius = maxRadius - gaugeWidth / 2
        }

        // fill
        this.ctx.globalAlpha = this.cssVars.alphaFill
        this.ctx.strokeStyle = this.cssVars.colorFill
        this.ctx.lineWidth = gaugeWidth - this.gaugePadding * 2

        if (this.cssVars.alphaFillOff) {
            this.ctx.globalAlpha = this.cssVars.alphaFillOff
            this.ctx.beginPath()
            this.ctx.arc(this.width / 2, this.height / 2, gaugeRadius, min, max)
            this.ctx.stroke()
        }

        if (this.cssVars.alphaFillOn) {
            this.ctx.globalAlpha = this.cssVars.alphaFillOn
            this.ctx.beginPath()
            this.ctx.arc(this.width / 2, this.height / 2, gaugeRadius, d - angle, d + angle)
            this.ctx.stroke()
        }

        // stroke
        if (this.cssVars.lineWidth) {

            this.ctx.globalAlpha = this.cssVars.alphaStroke
            this.ctx.strokeStyle = this.cssVars.colorStroke
            this.ctx.lineWidth = this.cssVars.lineWidth

            if (this.minDimension > 40) {
                this.ctx.beginPath()
                this.ctx.arc(this.width / 2, this.height / 2, minRadius, 0, 2 * Math.PI)
                this.ctx.stroke()
            }

            this.ctx.beginPath()
            this.ctx.arc(this.width / 2, this.height / 2, maxRadius, 0, 2 * Math.PI)
            this.ctx.stroke()

        }

    }

}
