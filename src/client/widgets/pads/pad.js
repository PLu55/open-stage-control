var Canvas = require('../common/canvas'),
    html = require('nanohtml')

class Pad extends Canvas {

    constructor(options) {

        super({...options, html: html`
            <inner>
                <canvas></canvas>
            </inner>
        `})

        this.canvas.style.setProperty('--pointSize', parseInt(this.getProp('pointSize')) + 'rem')

    }

    cacheCanvasStyle(style) {

        style = style || window.getComputedStyle(this.canvas)

        super.cacheCanvasStyle(style)

        this.pointSize = parseFloat(style.getPropertyValue('--pointSize')) * PXSCALE
        this.padPadding = (this.cssVars.padding + this.cssVars.lineWidth) + 2 * PXSCALE

    }

}

Pad.dynamicProps = Pad.prototype.constructor.dynamicProps.filter(n => n !== 'decimals')

module.exports = Pad
