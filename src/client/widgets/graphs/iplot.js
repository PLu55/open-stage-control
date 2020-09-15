var {clip, mapToScale} = require('../utils'),
    Canvas = require('../common/canvas'),
    html = require('nanohtml')
    //StaticProperties = require('../mixins/static_properties')

const clamp = function (x, min, max) { return (x < min) ? min : (x > max) ? max : x; }

module.exports = class IPlot extends Canvas {

    static description() {

        return 'XY coordinates plot.'

    }

    static defaults() {


        return super.defaults({

            _class_specific: 'plot',

            rangeX: {type: 'object', value: {min:0,max:1}, help: 'Defines the min and max values for the x axis'},
            rangeY: {type: 'object', value: {min:0,max:1}, help: 'Defines the min and max values for the y axis'},
            logScaleX: {type: 'boolean|number', value: false, help: 'Set to `true` to use logarithmic scale for the x axis (base 10). Set to a `number` to define the logarithm\'s base.'},
            logScaleY: {type: 'boolean|number', value: false, help: 'Set to `true` to use logarithmic scale for the y axis (base 10). Set to a `number` to define the logarithm\'s base.'},
            origin: {type: 'number', value: 'auto', help: 'Defines the y axis origin. Set to `false` to disable it.'},
            pips:{type: 'boolean', value: true, help: 'Set to `false` to hide the scale'},

          }, [], {

            value: {type: 'array|string', value: '', help: [
                '- `Array` of `y` values',
                '- `Array` of `[x, y]` `array` values',
                '- `String` `array`',
                '- `String` `object` to update specific coordinates only: `{0:1, 4:0}` will change the 1st and 5th points\' coordinates',
            ]}

        })

    }

    constructor(options) {

        super({...options, html: html`
            <inner>
                <canvas></canvas>
            </inner>
        `})

        this.value = []
        this.rangeX = this.getProp('rangeX') || {min:0,max:1}
        this.rangeY = this.getProp('rangeY') || {min:0,max:1}
        this.logScaleX = this.getProp('logScaleX')
        this.logScaleY = this.getProp('logScaleY')
        this.pips = {
            x : {
                min: Math.abs(this.rangeX.min)>=1000 ? this.rangeX.min/1000+'k' : this.rangeX.min,
                max: Math.abs(this.rangeX.max)>=1000 ? this.rangeX.max/1000+'k' : this.rangeX.max
            },
            y : {
                min: Math.abs(this.rangeY.min)>=1000 ? this.rangeY.min/1000+'k' : this.rangeY.min,
                max: Math.abs(this.rangeY.max)>=1000 ? this.rangeY.max/1000+'k' : this.rangeY.max
            }
        }
        this.hit = -1;
        this.x0 = -1;
        this.y0 = -1;

        this.on('draginit',(e)=>{
            this.draginitHandle(e)
        }, {element: this.canvas})

        this.on('drag',(e)=>{
            this.dragHandle(e)
        }, {element: this.canvas})

        this.on('dragend',(e)=>{
            this.dragendHandle(e)
        }, {element: this.canvas})

    }

    // transform x' = ax + m
    //           x'' = bx' + m
    //           x'' = b(ax + m) + n = abx +bm + n
    //           c = ab; d = bm + n
    //           x'' = cx + d
    //           x = x''/c - d

    transCoeff( c0, c1, d0, d1 ) {
       var a, b, m, n;

       a = c1 - c0;
       m = c0;
       b = d1 - d0;
       n = d0;
       return [ a * b, b * m + n];
    }

// [[ 0, 0 ], [ 0.3, 0.8 ],[ 1, 0.2 ]]

    transformCoefficients() {
       var xa, xm, ya, ym, padding;
       padding = (this.cssVars.padding + PXSCALE);

       [xa, xm] = this.transCoeff(this.rangeX.min, this.rangeX.max, padding, this.width - padding);
       [ya, ym] = this.transCoeff(this.rangeY.min, this.rangeY.max, this.height - 2 * PXSCALE - padding, 2 * PXSCALE + padding);
       return  [xa, xm, ya, ym];
    }

    fromLocalX(x) {
        const [xa, xm, ya, ym] = this.transformCoefficients();
        return xa * x + xm;
    }

    fromLocalY(y) {
        const [xa, xm, ya, ym] = this.transformCoefficients();
        return ya * y + ym;
    }

    toLocalX(x) {
        const [xa, xm, ya, ym] = this.transformCoefficients();
        return (x - xm) / xa;
    }

    toLocalY(y) {
        const [xa, xm, ya, ym] = this.transformCoefficients();
        return ( y - ym ) / ya;
    }

    fromLocalSpace(pointsIn) {
        // Assume the pointsIn is in a homogenious format either [[x0, y0],[x1, y1],...,[xn-1,yn-1]]
        //  or [x0, y0, x1, y1,...,xn-1,yn-1], the result is always in the second format.

        var pointsOut = [],
            length = pointsIn.length ? pointsIn.length : 0
        const [xa, xm, ya, ym] =  this.transformCoefficients()

        if ( pointsIn[0] instanceof Array ) {
            for ( var i = 0; i < length; ++i ) {
                pointsOut.push(xa * pointsIn[i][0] + xm)
                pointsOut.push(ya * pointsIn[i][1] + ym)           
            }
        } else {
            for ( var i = 0; i < length; i+=2 ) {
                pointsOut.push(xa * pointsIn[i] + xm)
                pointsOut.push(ya * pointsIn[i+1] + ym)           
            }
        }
        return pointsOut
    }

    toLocalSpace(pointsIn) {
        // Assume the pointsIn is in a homogenious format either [[x0, y0],[x1, y1],...,[xn-1,yn-1]]
        //  or [x0, y0, x1, y1,...,xn-1,yn-1], the result is always in the second format.

        var pointsOut = [],
            length = pointsIn.length ? pointsIn.length : 0;
        const [xa, xm, ya, ym] =  this.transformCoefficients();

        if ( pointsIn[0] instanceof Array ) {
            for ( var i = 0; i < length; ++i ) {
                pointsOut.push((pointsIn[i][0] - xm) / xa);
                pointsOut.push((pointsIn[i][1] - ym) / ya);          
            }
        } else {
            for ( var i = 0; i < length; i+=2 ) {
                pointsOut.push((pointsIn[i] - xm) / xa);
                pointsOut.push((pointsIn[i+1] - ym) / ya);           
            }
        }
        return pointsOut;
    }

    draginitHandle(e) {

        if ( !this.value || this.value.length == 0 ) return;

        var points = this.fromLocalSpace(this.value);
        var length = points.length;

        for ( var i = 0; i < length; i += 2 ) {
            var x, y, d2, dmem = 16;
            x = points[i] - e.offsetX;
            y = points[i+1] - e.offsetY;
            d2 = x*x + y*y;
            if ( d2 < dmem ) {
                this.hit = i/2;
                dmem = d2;
            }
        }

        if ( e.shiftKey && ! e.ctrlKey ) {

            for ( var i = 0; i < length; i += 2 ) {
                if ( points[i] >= e.offsetX ) {
                    var valueLength = this.value.length; 
                    this.hit = i/2;

                    for ( var j = valueLength; j > this.hit; --j) {
                        this.value[j] =  this.value[j-1];
                    }

                    [x, y] = this.toLocalSpace( [ e.offsetX,  e.offsetY]);
                    this.value[this.hit] = [clamp(x, this.rangeX.min, this.rangeX.max),
                                            clamp(y, this.rangeY.min, this.rangeY.max)];
                    this.x0 = e.offsetX;
                    this.y0 = e.offsetY;
                    this.batchDraw();
                    break;
                } 
            }

        } else if ( ! e.shiftKey &&  e.ctrlKey ) {

            if ( this.hit >= 0 ) {
                this.value.splice(this.hit, 1);
                this.hit = -1;
                this.batchDraw();
            }

        } else {
            this.x0 = e.offsetX;
            this.y0 = e.offsetY;
        }   
    }

    dragHandle(e) {

        var x, y, dx, dy, xmin, xmax;

        if ( this.hit < 0 ) return;

        dx = (e.offsetX - this.x0);
        dy = (e.offsetY - this.y0);
        [x, y] = this.fromLocalSpace(this.value[this.hit]);
        [x, y] = this.toLocalSpace( [x + dx, y + dy]);
        xmin = (this.hit > 0) ?  this.value[this.hit-1][0] : this.rangeX.min;
        xmax = (this.hit <  this.value.length - 1) ?  this.value[this.hit+1][0] : this.rangeX.max;
        console.log('x: ', x, xmin, xmax);
        if ( x >= xmin && x <= xmax ) {
          
           this.value[this.hit][0] = clamp(x, this.rangeX.min, this.rangeX.max);
           this.value[this.hit][1] = clamp(y, this.rangeY.min, this.rangeY.max);
           this.x0 = e.offsetX;
           this.y0 = e.offsetY;
           this.batchDraw();
        }
    }

    dragendHandle(e) {

        this.hit = -1;
        this.setValue(this.value,  {sync: true, send: true});
        //this.setValue(this.value,  {sync: true, send: true, dragged: true});
        //this.changed();
    }

    draw() {

        this.ctx.clearRect(0,0,this.width,this.height)

        var points = this.draw_line()
        this.draw_dots(points)

        if (this.getProp('pips')) this.draw_pips()

    }

    draw_pips() {

        this.ctx.fillStyle = this.cssVars.colorText
        this.ctx.globalAlpha = this.cssVars.alphaPips

        var margin = this.cssVars.padding

        if (margin < this.fontSize * 1.5) return


        if (this.pips.x) {

            this.ctx.textAlign = 'center'
            this.ctx.fillText(this.pips.x.min, margin, this.height - margin / 2)
            this.ctx.fillText(this.pips.x.max, this.width - margin, this.height - margin / 2)

        }

        if (this.pips.y) {

            this.ctx.textAlign = 'right'
            this.ctx.fillText(this.pips.y.min, margin / 2 + this.fontSize / 2, this.height - margin)
            this.ctx.fillText(this.pips.y.max, margin / 2 + this.fontSize / 2, margin)

        }

    }

    draw_line() {

        var points = [],
            padding = this.cssVars.padding + PXSCALE,
            decimals = this.getProp('smooth') ? 1 : 0,
            length = this.value.length,
            x, y, i, previousValue, nx, ny

        for (i = 0; i < length; i++) {

            if (this.value[i].length) {
                points.push(mapToScale(this.value[i][0], [this.rangeX.min, this.rangeX.max], [padding, this.width - padding], decimals, this.logScaleX, true))
                points.push(mapToScale(this.value[i][1], [this.rangeY.min, this.rangeY.max], [this.height - 2 * PXSCALE - padding, 2 * PXSCALE + padding], decimals, this.logScaleY, true))
            } else {

                if (i < length - 2 && this.value[i] === previousValue && this.value[i+1] === previousValue) {
                    continue
                }

                nx = mapToScale(i, [0, this.value.length - 1], [padding, this.width - padding], decimals, this.logScaleX, true)
                ny = mapToScale(this.value[i], [this.rangeY.min, this.rangeY.max], [this.height - 2 * PXSCALE - padding, 2 * PXSCALE + padding], decimals, this.logScaleY, true)

                if (x !== nx || y !== ny) {
                    points.push(nx)
                    points.push(ny)
                    x = nx
                    y = ny
                }

                previousValue = this.value[i]

            }

        }

        if (points.length < 4) return points

        this.ctx.beginPath()

        this.ctx.moveTo(points[0], points[1])
        for (i = 2; i < points.length - 2; i += 2) {
            this.ctx.lineTo(points[i], points[i + 1])
        }
        this.ctx.lineTo(points[i], points[i + 1])

        this.ctx.globalAlpha = 1
        this.ctx.lineWidth = 2 * PXSCALE
        this.ctx.strokeStyle = this.cssVars.colorWidget
        this.ctx.stroke()

        if (this.getProp('origin') !== false) {

            var origin = mapToScale(this.getProp('origin'), [this.rangeY.min, this.rangeY.max], [this.height - padding, padding], 0, this.getProp('logScaleY'), true)

            this.ctx.globalAlpha = this.cssVars.alphaFillOn
            this.ctx.fillStyle = this.cssVars.colorFill
            this.ctx.lineTo(this.width - padding, origin)
            this.ctx.lineTo(padding, origin)
            this.ctx.closePath()
            this.ctx.fill()

        }

        return points

    }

    draw_dots(points) {

        this.ctx.globalAlpha = 1
        this.ctx.fillStyle = this.cssVars.colorWidget
        this.ctx.strokeStyle = this.cssVars.colorBackground
        this.ctx.lineWidth = 2 * PXSCALE
        for (var i = 0; i < points.length; i += 2) {
            this.ctx.beginPath()
            this.ctx.arc(points[i], points[i + 1], 2 * PXSCALE, 0, 2*Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
        }

    }

    setValue(v, options={}) {

        if (typeof v == 'string') {
            try {
                v = JSON.parseFlex(v)
            } catch(err) {}
        }

        if (typeof v == 'object' && v !== null) {

            if (Array.isArray(v)) {

                this.value = v

            } else {

                for (var i in v) {
                    if (!isNaN(i)) this.value[i] = v[i]
                }

            }

            this.batchDraw()
            if (options.send) this.sendValue()
            if (options.sync) this.changed(options)

        }


    }

}
