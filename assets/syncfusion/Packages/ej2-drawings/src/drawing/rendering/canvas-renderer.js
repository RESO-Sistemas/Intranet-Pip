import { Size } from './../primitives/size';
import { pathSegmentCollection, getRectanglePath, processPathData } from './../utility/path-util';
// import { overFlow } from './../utility/base-util';
import { createHtmlElement } from './../utility/dom-util';
/**
 * Canvas Renderer
 */
/** @private */
var CanvasRenderer = /** @class */ (function () {
    function CanvasRenderer() {
        /** @private */
        this.imageList = {};
        this.rectWidth = 0;
    }
    /**   @private  */
    CanvasRenderer.getContext = function (canvas) {
        return canvas.getContext('2d');
    };
    CanvasRenderer.prototype.setStyle = function (canvas, style) {
        var ctx = CanvasRenderer.getContext(canvas);
        if (style.fill === 'none') {
            style.fill = 'transparent';
        }
        if (style.stroke === 'none') {
            style.stroke = 'transparent';
        }
        ctx.strokeStyle = style.stroke;
        if (style.thickness !== undefined) {
            ctx.lineWidth = style.thickness * (96 / 72);
        }
        else {
            ctx.lineWidth = style.strokeWidth;
        }
        if (style.strokeWidth === 0) {
            ctx.strokeStyle = 'transparent';
        }
        if (style.isSharpEdge) {
            ctx.lineJoin = 'miter';
            ctx.miterLimit = 10;
            ctx.lineCap = 'butt';
        }
        ctx.globalAlpha = style.opacity;
        var dashArray = [];
        if (style.dashArray) {
            dashArray = this.parseDashArray(style.dashArray);
        }
        ctx.setLineDash(dashArray);
        ctx.fillStyle = style.fill;
    };
    CanvasRenderer.prototype.setStyleFreetextEJ2 = function (canvas, style) {
        var ctx = CanvasRenderer.getContext(canvas);
        if (style.fill === 'none') {
            style.fill = 'transparent';
        }
        if (style.stroke === 'none') {
            style.stroke = 'transparent';
        }
        ctx.strokeStyle = style.stroke;
        if (style.thickness !== undefined) {
            ctx.lineWidth = style.thickness * (96 / 72);
        }
        else {
            ctx.lineWidth = style.strokeWidth * (96 / 72);
        }
        if (style.strokeWidth === 0) {
            ctx.strokeStyle = 'transparent';
        }
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 10;
        ctx.lineCap = 'butt';
        ctx.globalAlpha = style.opacity;
        var dashArray = [];
        if (style.dashArray) {
            dashArray = this.parseDashArray(style.dashArray);
        }
        ctx.setLineDash(dashArray);
        ctx.fillStyle = style.fill;
    };
    CanvasRenderer.prototype.rotateContext = function (canvas, angle, x, y) {
        var ctx = CanvasRenderer.getContext(canvas);
        ctx.translate(x, y);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-x, -y);
    };
    CanvasRenderer.prototype.setFontStyle = function (canvas, text) {
        var ctx = CanvasRenderer.getContext(canvas);
        var font = '';
        if (text.italic) {
            font += 'italic ';
        }
        if (text.bold) {
            font += 'bold ';
        }
        font += (text.fontSize) + 'px ';
        font += text.fontFamily;
        ctx.font = font;
    };
    /**   @private  */
    CanvasRenderer.prototype.parseDashArray = function (dashArray) {
        var dashes = [];
        var separator = dashArray.indexOf(' ') !== -1 ? ' ' : ',';
        var splittedDashes = dashArray.split(separator);
        for (var _i = 0, splittedDashes_1 = splittedDashes; _i < splittedDashes_1.length; _i++) {
            var i = splittedDashes_1[_i];
            dashes.push(Number(i));
        }
        return dashes;
    };
    //Rendering Part
    /**   @private  */
    CanvasRenderer.prototype.drawRectangle = function (canvas, options) {
        if (options.childNodes === undefined) {
            this.rectWidth = options.width;
        }
        if (options.visible === true) {
            if (options.cornerRadius) {
                options.data = getRectanglePath(options.cornerRadius, options.height, options.width);
                this.drawPath(canvas, options);
            }
            else {
                var ctx = CanvasRenderer.getContext(canvas);
                ctx.save();
                ctx.beginPath();
                var cornerRadius = options.cornerRadius;
                var pivotX = options.x + options.width * options.pivotX;
                var pivotY = options.y + options.height * options.pivotY;
                this.rotateContext(canvas, options.angle, pivotX, pivotY);
                this.setStyle(canvas, options);
                if (options.thickness !== undefined && !options.isShapeLabel) {
                    var strokeWidth = ctx.lineWidth || 1;
                    var halfStroke = strokeWidth / 2;
                    var strokeX = options.x + halfStroke;
                    var strokeY = options.y + halfStroke;
                    var strokeW = Math.max(0, options.width - strokeWidth);
                    var strokeH = Math.max(0, options.height - strokeWidth);
                    if (ctx.fillStyle !== 'transparent') {
                        var fillX = options.x + (strokeWidth > 0 ? strokeWidth : 0);
                        var fillY = options.y + (strokeWidth > 0 ? strokeWidth : 0);
                        var fillW = Math.max(0, options.width - (strokeWidth > 0 ? 2 * strokeWidth : 0));
                        var fillH = Math.max(0, options.height - (strokeWidth > 0 ? 2 * strokeWidth : 0));
                        if (fillW > 0 && fillH > 0) {
                            ctx.fillRect(fillX, fillY, fillW, fillH);
                        }
                    }
                    if (ctx.strokeStyle !== 'transparent' && strokeW > 0 && strokeH > 0) {
                        ctx.rect(strokeX, strokeY, strokeW, strokeH);
                        ctx.stroke();
                        ctx.closePath();
                        ctx.restore();
                    }
                }
                else {
                    ctx.rect(options.x, options.y, options.width, options.height);
                    ctx.fillRect(options.x, options.y, options.width, options.height);
                    ctx.fill();
                    ctx.stroke();
                    ctx.closePath();
                    ctx.restore();
                }
            }
        }
    };
    /**   @private  */
    CanvasRenderer.prototype.drawRectangleFreetextEJ2 = function (canvas, options) {
        if (options.childNodes === undefined) {
            this.rectWidth = options.width;
        }
        if (options.visible === true) {
            if (options.cornerRadius) {
                options.data = getRectanglePath(options.cornerRadius, options.height, options.width);
                this.drawPath(canvas, options);
            }
            else {
                var ctx = CanvasRenderer.getContext(canvas);
                ctx.save();
                ctx.beginPath();
                var cornerRadius = options.cornerRadius;
                var pivotX = options.x + options.width * options.pivotX;
                var pivotY = options.y + options.height * options.pivotY;
                this.rotateContext(canvas, options.angle, pivotX, pivotY);
                this.setStyleFreetextEJ2(canvas, options);
                ctx.beginPath();
                ctx.rect(options.x, options.y, options.width, options.height);
                ctx.clip();
                var strokeWidth = ctx.lineWidth || 1;
                var halfStroke = strokeWidth / 2;
                var strokeX = options.x + halfStroke;
                var strokeY = options.y + halfStroke;
                var strokeW = Math.max(0, options.width - strokeWidth);
                var strokeH = Math.max(0, options.height - strokeWidth);
                if (strokeH <= 0) {
                    strokeH = 1;
                }
                if (ctx.fillStyle !== 'transparent') {
                    var fillX = options.x + (strokeWidth > 0 ? strokeWidth : 0);
                    var fillY = options.y + (strokeWidth > 0 ? strokeWidth : 0);
                    var fillW = Math.max(0, options.width - (strokeWidth > 0 ? 2 * strokeWidth : 0));
                    var fillH = Math.max(0, options.height - (strokeWidth > 0 ? 2 * strokeWidth : 0));
                    if (fillW > 0 && fillH > 0) {
                        ctx.fillRect(fillX, fillY, fillW, fillH);
                    }
                }
                if (ctx.strokeStyle !== 'transparent' && strokeW > 0 && strokeH > 0) {
                    ctx.beginPath();
                    ctx.rect(strokeX, strokeY, strokeW, strokeH);
                    ctx.stroke();
                    ctx.closePath();
                }
                ctx.restore();
            }
        }
    };
    /**   @private  */
    CanvasRenderer.prototype.drawPath = function (canvas, options) {
        var collection = [];
        collection = processPathData(options.data);
        collection = pathSegmentCollection(collection);
        var ctx = CanvasRenderer.getContext(canvas);
        ctx.save();
        ctx.beginPath();
        var pivotY = options.y + options.height * options.pivotY;
        var pivotX = options.x + options.width * options.pivotX;
        this.rotateContext(canvas, options.angle, pivotX, pivotY);
        this.setStyle(canvas, options);
        ctx.translate(options.x, options.y);
        this.renderPath(canvas, options, collection);
        ctx.fill();
        ctx.translate(-options.x, -options.y);
        ctx.stroke();
        ctx.restore();
    };
    /**   @private  */
    CanvasRenderer.prototype.renderPath = function (canvas, options, collection) {
        if (options.visible === true) {
            var ctx = CanvasRenderer.getContext(canvas);
            var x0 = void 0;
            var y0 = void 0;
            var x1 = void 0;
            var y1 = void 0;
            var x2 = void 0;
            var y2 = void 0;
            var x = void 0;
            var y = void 0;
            var length_1;
            var i = void 0;
            var newSeg = void 0;
            var segs = collection;
            for (x = 0, y = 0, i = 0, length_1 = segs.length; i < length_1; ++i) {
                var obj = segs[parseInt(i.toString(), 10)];
                var seg = obj;
                var char = seg.command;
                if ('x1' in seg) {
                    x1 = seg.x1;
                }
                if ('x2' in seg) {
                    x2 = seg.x2;
                }
                if ('y1' in seg) {
                    y1 = seg.y1;
                }
                if ('y2' in seg) {
                    y2 = seg.y2;
                }
                if ('x' in seg) {
                    x = seg.x;
                }
                if ('y' in seg) {
                    y = seg.y;
                }
                switch (char) {
                    case 'M':
                        ctx.moveTo(x, y);
                        seg.x = x;
                        seg.y = y;
                        break;
                    case 'L':
                        ctx.lineTo(x, y);
                        seg.x = x;
                        seg.y = y;
                        break;
                    case 'C':
                        ctx.bezierCurveTo(x1, y1, x2, y2, x, y);
                        seg.x = x;
                        seg.y = y;
                        seg.x1 = x1;
                        seg.y1 = y1;
                        seg.x2 = x2;
                        seg.y2 = y2;
                        break;
                    case 'Q':
                        ctx.quadraticCurveTo(x1, y1, x, y);
                        seg.x = x;
                        seg.y = y;
                        seg.x1 = x1;
                        seg.y1 = y1;
                        break;
                    case 'A':
                        var curr = { x: x0, y: y0 };
                        var rx = seg.r1;
                        var ry = seg.r2;
                        var xAxisRotation = seg.angle * (Math.PI / 180.0);
                        var largeArc = seg.largeArc;
                        var sweep = seg.sweep;
                        var cp = { x: x, y: y };
                        var currp = {
                            x: Math.cos(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.sin(xAxisRotation) * (curr.y - cp.y) / 2.0,
                            y: -Math.sin(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.cos(xAxisRotation) * (curr.y - cp.y) / 2.0
                        };
                        var l = Math.pow(currp.x, 2) / Math.pow(rx, 2) + Math.pow(currp.y, 2) / Math.pow(ry, 2);
                        if (l > 1) {
                            rx *= Math.sqrt(l);
                            ry *= Math.sqrt(l);
                        }
                        var k = (Math.pow(ry, 2) * Math.pow(currp.x, 2));
                        var s = (largeArc === sweep ? -1 : 1) * Math.sqrt(((Math.pow(rx, 2) * Math.pow(ry, 2)) - (Math.pow(rx, 2) * Math.pow(currp.y, 2)) - k) /
                            (Math.pow(rx, 2) * Math.pow(currp.y, 2) + Math.pow(ry, 2) * Math.pow(currp.x, 2)));
                        if (isNaN(s)) {
                            s = 0;
                        }
                        var cpp = { x: s * rx * currp.y / ry, y: s * -ry * currp.x / rx };
                        var centp = {
                            x: (curr.x + cp.x) / 2.0 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y,
                            y: (curr.y + cp.y) / 2.0 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y
                        };
                        var a1 = this.a([1, 0], [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry]);
                        var u = [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry];
                        var v = [(-currp.x - cpp.x) / rx, (-currp.y - cpp.y) / ry];
                        var ad = this.a(u, v);
                        if (this.r(u, v) <= -1) {
                            ad = Math.PI;
                        }
                        if (this.r(u, v) >= 1) {
                            ad = 0;
                        }
                        var dir = !sweep ? -1.0 : 1.0;
                        var ah = a1 + dir * (ad / 2.0);
                        var halfWay = {
                            x: centp.x + rx * Math.cos(ah),
                            y: centp.y + ry * Math.sin(ah)
                        };
                        seg.centp = centp;
                        seg.xAxisRotation = xAxisRotation;
                        seg.rx = rx;
                        seg.ry = ry;
                        seg.a1 = a1;
                        seg.ad = ad;
                        seg.sweep = sweep;
                        if (ctx != null) {
                            var ra = rx > ry ? rx : ry;
                            var sx = rx > ry ? 1 : rx / ry;
                            var sy = rx > ry ? ry / rx : 1;
                            ctx.save();
                            ctx.translate(centp.x, centp.y);
                            ctx.rotate(xAxisRotation);
                            ctx.scale(sx, sy);
                            ctx.arc(0, 0, ra, a1, a1 + ad, !sweep);
                            ctx.scale(1 / sx, 1 / sy);
                            ctx.rotate(-xAxisRotation);
                            ctx.translate(-centp.x, -centp.y);
                            ctx.restore();
                        }
                        break;
                    case 'Z':
                    case 'z':
                        ctx.closePath();
                        x = x0;
                        y = y0;
                        break;
                }
                x0 = x;
                y0 = y;
            }
        }
    };
    /**   @private  */
    CanvasRenderer.prototype.drawTextFreetextEJ2 = function (canvas, options, isFreeTextAnnotation, rectHeight) {
        if (options.content && options.visible === true) {
            var ctx_1 = CanvasRenderer.getContext(canvas);
            ctx_1.save();
            this.setStyle(canvas, options);
            this.setFontStyle(canvas, options);
            var ascent = 0;
            var lineHeight = 0;
            if (options.thickness !== undefined) {
                // Used this to get the exact text height for Freetext annotation according to the font size and font family.
                var metrics = ctx_1.measureText(options.content);
                ascent = metrics.actualBoundingBoxAscent;
                if (ascent == null)
                    ascent = options.fontSize * 0.8;
                var descent = metrics.actualBoundingBoxDescent;
                if (descent == null)
                    descent = options.fontSize * 0.2;
                lineHeight = (ascent + descent);
                options.height = lineHeight * options.childNodes.length;
            }
            var pivotX = options.x + options.width * options.pivotX;
            var pivotY = options.y + options.height * options.pivotY;
            this.rotateContext(canvas, options.angle, pivotX, pivotY);
            var i = 0;
            var childNodes = [];
            childNodes = options.childNodes;
            var wrapBounds = options.wrapBounds;
            ctx_1.fillStyle = options.color;
            if (wrapBounds) {
                var position = this.labelAlign(options, wrapBounds, childNodes, lineHeight);
                var padding = 0;
                var paddingY = 0;
                var heightDiff = rectHeight - (options.height + options.strokeWidth * 2);
                var stroke = Math.ceil(options.strokeWidth || 0);
                if (isFreeTextAnnotation && heightDiff >= 3.5) {
                    if (options.strokeWidth <= 4 && options.childNodes.length <= 1) {
                        padding = stroke * 1.5 * 1.65;
                        paddingY = stroke * 1.5 * 3;
                    }
                    else {
                        padding = stroke * 1.5 * 1.65;
                        if (options.strokeWidth <= 3) {
                            paddingY = stroke * 1.5 * 2;
                        }
                        else {
                            paddingY = stroke * 1.5 * 1.5;
                        }
                    }
                }
                else if (isFreeTextAnnotation) {
                    if (options.strokeWidth <= 4 && options.childNodes.length <= 1) {
                        padding = stroke * 1.5;
                        paddingY = stroke * 1.5;
                    }
                    else {
                        padding = stroke;
                        paddingY = stroke / 2;
                    }
                }
                else {
                    padding = options.strokeWidth / 2;
                    paddingY = options.strokeWidth / 2;
                }
                for (i = 0; i < childNodes.length; i++) {
                    var child = childNodes[parseInt(i.toString(), 10)];
                    var offsetX = void 0;
                    var offsetY = void 0;
                    var isTextDecorationApplied = false;
                    if (options.textAlign === 'justify') {
                        if (child.text === '\n')
                            continue;
                        var baseSpaceWidth = ctx_1.measureText(' ').width;
                        var targetWidth = this.rectWidth - (Math.ceil(options.strokeWidth) * 3 * 1.5);
                        offsetX = position.x + child.x - wrapBounds.x + padding;
                        offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8) + paddingY;
                        var isLastLine = i === childNodes.length - 1;
                        if (!isLastLine && targetWidth > 0) {
                            var leftEdge = position.x + child.x - wrapBounds.x + padding;
                            var words = child.text.trim().split(/\s+/);
                            if (words.length <= 1) {
                                ctx_1.fillText(child.text, leftEdge, offsetY);
                                continue;
                            }
                            var widths = words.map(function (w) { return ctx_1.measureText(w).width; });
                            var wordsTotal = widths.reduce(function (a, b) { return a + b; }, 0);
                            var gaps = words.length - 1;
                            var naturalWidth = wordsTotal + baseSpaceWidth * gaps;
                            var extra = Math.max(0, targetWidth - naturalWidth);
                            var extraPerGap = extra / gaps;
                            var pen = leftEdge;
                            for (var i_1 = 0; i_1 < words.length; i_1++) {
                                ctx_1.fillText(words[i_1], pen, offsetY);
                                if (i_1 < gaps) {
                                    pen += widths[i_1] + baseSpaceWidth + extraPerGap;
                                }
                            }
                            if (options.textDecoration === 'Underline'
                                || options.textDecoration === 'Overline'
                                || options.textDecoration === 'LineThrough') {
                                var startX = leftEdge;
                                var startY = void 0;
                                var endX = leftEdge + targetWidth;
                                var endY = void 0;
                                switch (options.textDecoration) {
                                    case 'Underline':
                                        startY = offsetY + 2;
                                        endY = offsetY + 2;
                                        break;
                                    case 'Overline':
                                        startY = (position.y + child.dy * i);
                                        endY = (position.y + child.dy * i);
                                        break;
                                    case 'LineThrough':
                                        startY = ((offsetY + position.y + child.dy * i) / 2) + 2;
                                        endY = ((offsetY + position.y + child.dy * i) / 2) + 2;
                                }
                                ctx_1.beginPath();
                                ctx_1.moveTo(startX, startY);
                                ctx_1.lineTo(endX, endY);
                                ctx_1.strokeStyle = options.color;
                                ctx_1.lineWidth = options.fontSize * .08;
                                ctx_1.globalAlpha = options.opacity;
                                ctx_1.stroke();
                                isTextDecorationApplied = true;
                            }
                        }
                        else {
                            ctx_1.fillText(child.text, offsetX, offsetY);
                        }
                    }
                    else if (child.text !== '\n') {
                        if (options.textAlign == "right") {
                            offsetX = position.x + child.x - wrapBounds.x - padding;
                        }
                        else if (options.textAlign == "center") {
                            offsetX = position.x + child.x - wrapBounds.x;
                        }
                        else {
                            offsetX = position.x + child.x - wrapBounds.x + padding;
                        }
                        if (options.relativeMode === 'Point') {
                            if (isFreeTextAnnotation && options.childNodes.length <= 1 && options.strokeWidth >= 5 && heightDiff <= 3.5) {
                                offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8) - paddingY;
                            }
                            else {
                                offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8) + paddingY;
                            }
                            if (options.strokeWidth == 0) {
                                offsetY += 1;
                            }
                        }
                        else {
                            offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8);
                        }
                        ctx_1.fillText(child.text, offsetX, offsetY);
                        // if (wrapBounds.width > options.width && options.textOverflow !== 'Wrap') {
                        //     child.text = overFlow(child.text, options);
                        // }
                        //ctx.fillText(child.text, offsetX, offsetY);
                    }
                    if (child.text !== '\n') {
                        var decorations = [];
                        if (Array.isArray(options.textDecoration)) {
                            decorations = options.textDecoration;
                        }
                        else if (options.textDecoration.includes(' ')) {
                            decorations = options.textDecoration.split(/[,\s]+/).filter(Boolean);
                        }
                        else {
                            decorations = [options.textDecoration];
                        }
                        for (var x = 0; x < decorations.length; x++) {
                            var textDecoration = decorations[x];
                            if (textDecoration === 'Underline'
                                || textDecoration === 'Overline'
                                || textDecoration === 'LineThrough' && !isTextDecorationApplied) {
                                var startPointX = offsetX;
                                var startPointY = void 0;
                                var textlength = ctx_1.measureText(child.text).width;
                                var endPointX = offsetX + textlength;
                                var endPointY = void 0;
                                switch (textDecoration) {
                                    case 'Underline':
                                        startPointY = offsetY + 2;
                                        endPointY = offsetY + 2;
                                        break;
                                    case 'Overline':
                                        startPointY = (position.y + child.dy * i);
                                        endPointY = (position.y + child.dy * i);
                                        break;
                                    case 'LineThrough':
                                        startPointY = ((offsetY + position.y + child.dy * i) / 2) + 2;
                                        endPointY = ((offsetY + position.y + child.dy * i) / 2) + 2;
                                }
                                ctx_1.beginPath();
                                ctx_1.moveTo(startPointX, startPointY);
                                ctx_1.lineTo(endPointX, endPointY);
                                ctx_1.strokeStyle = options.color;
                                ctx_1.lineWidth = options.fontSize * .08;
                                ctx_1.globalAlpha = options.opacity;
                                ctx_1.stroke();
                            }
                        }
                    }
                }
            }
            ctx_1.restore();
        }
    };
    /**   @private  */
    CanvasRenderer.prototype.drawTextEJ2 = function (canvas, options, isStampAnnotation) {
        if (options.content && options.visible === true) {
            var ctx_2 = CanvasRenderer.getContext(canvas);
            ctx_2.save();
            this.setStyle(canvas, options);
            this.setFontStyle(canvas, options);
            var ascent = 0;
            var lineHeight = 0;
            if (options.thickness !== undefined) {
                // Used this to get the exact text height for Freetext annotation according to the font size and font family.
                var metrics = ctx_2.measureText(options.content);
                ascent = metrics.actualBoundingBoxAscent;
                if (ascent == null)
                    ascent = options.fontSize * 0.8;
                var descent = metrics.actualBoundingBoxDescent;
                if (descent == null)
                    descent = options.fontSize * 0.2;
                lineHeight = (ascent + descent);
                options.height = lineHeight * options.childNodes.length;
            }
            var pivotX = options.x + options.width * options.pivotX;
            var pivotY = options.y + options.height * options.pivotY;
            this.rotateContext(canvas, options.angle, pivotX, pivotY);
            var i = 0;
            var childNodes = [];
            childNodes = options.childNodes;
            var wrapBounds = options.wrapBounds;
            ctx_2.fillStyle = options.color;
            if (wrapBounds) {
                var position = this.labelAlign(options, wrapBounds, childNodes, lineHeight);
                var paddingAdjustment = void 0;
                if (isStampAnnotation) {
                    paddingAdjustment = options.thickness !== undefined ? (options.thickness * (96 / 72)) * 2 : 0;
                }
                for (i = 0; i < childNodes.length; i++) {
                    var child = childNodes[parseInt(i.toString(), 10)];
                    var offsetX = void 0;
                    var offsetY = void 0;
                    var isTextDecorationApplied = false;
                    if (options.textAlign === 'justify') {
                        if (child.text === '\n')
                            continue;
                        var baseSpaceWidth = ctx_2.measureText(' ').width;
                        var targetWidth = wrapBounds.width;
                        offsetX = position.x + child.x - wrapBounds.x + options.strokeWidth / 2;
                        offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8) + options.strokeWidth / 2;
                        var isLastLine = i === childNodes.length - 1;
                        if (!isLastLine && targetWidth > 0) {
                            var leftEdge = position.x + child.x + options.strokeWidth / 2;
                            var words = child.text.trim().split(/\s+/);
                            if (words.length <= 1) {
                                ctx_2.fillText(child.text, leftEdge, offsetY);
                                continue;
                            }
                            var widths = words.map(function (w) { return ctx_2.measureText(w).width; });
                            var wordsTotal = widths.reduce(function (a, b) { return a + b; }, 0);
                            var gaps = words.length - 1;
                            var naturalWidth = wordsTotal + baseSpaceWidth * gaps;
                            var extra = Math.max(0, targetWidth - naturalWidth);
                            var extraPerGap = extra / gaps;
                            var pen = leftEdge;
                            for (var i_2 = 0; i_2 < words.length; i_2++) {
                                ctx_2.fillText(words[i_2], pen, offsetY);
                                if (i_2 < gaps) {
                                    pen += widths[i_2] + baseSpaceWidth + extraPerGap;
                                }
                            }
                            if (options.textDecoration === 'Underline'
                                || options.textDecoration === 'Overline'
                                || options.textDecoration === 'LineThrough') {
                                var startX = leftEdge;
                                var startY = void 0;
                                var endX = leftEdge + targetWidth;
                                var endY = void 0;
                                switch (options.textDecoration) {
                                    case 'Underline':
                                        startY = offsetY + 2;
                                        endY = offsetY + 2;
                                        break;
                                    case 'Overline':
                                        startY = (position.y + child.dy * i);
                                        endY = (position.y + child.dy * i);
                                        break;
                                    case 'LineThrough':
                                        startY = ((offsetY + position.y + child.dy * i) / 2) + 2;
                                        endY = ((offsetY + position.y + child.dy * i) / 2) + 2;
                                }
                                ctx_2.beginPath();
                                ctx_2.moveTo(startX, startY);
                                ctx_2.lineTo(endX, endY);
                                ctx_2.strokeStyle = options.color;
                                ctx_2.lineWidth = options.fontSize * .08;
                                ctx_2.globalAlpha = options.opacity;
                                ctx_2.stroke();
                                isTextDecorationApplied = true;
                            }
                        }
                        else {
                            ctx_2.fillText(child.text, offsetX, offsetY);
                        }
                    }
                    else if (child.text !== '\n') {
                        if (options.textAlign == "right") {
                            offsetX = position.x + child.x - wrapBounds.x - options.strokeWidth / 2;
                        }
                        else if (options.textAlign == "center") {
                            offsetX = position.x + child.x - wrapBounds.x;
                        }
                        else {
                            if (isStampAnnotation) {
                                offsetX = position.x + child.x - wrapBounds.x + paddingAdjustment;
                            }
                            else {
                                offsetX = position.x + child.x - wrapBounds.x + options.strokeWidth / 2;
                            }
                        }
                        if (options.relativeMode === 'Point') {
                            if (isStampAnnotation) {
                                offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8) + paddingAdjustment;
                            }
                            else {
                                offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8) + options.strokeWidth / 2;
                            }
                        }
                        else {
                            offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8);
                        }
                        ctx_2.fillText(child.text, offsetX, offsetY);
                        // if (wrapBounds.width > options.width && options.textOverflow !== 'Wrap') {
                        //     child.text = overFlow(child.text, options);
                        // }
                        //ctx.fillText(child.text, offsetX, offsetY);
                    }
                    if (child.text !== '\n') {
                        if (options.textDecoration === 'Underline'
                            || options.textDecoration === 'Overline'
                            || options.textDecoration === 'LineThrough' && !isTextDecorationApplied) {
                            var startPointX = offsetX;
                            var startPointY = void 0;
                            var textlength = ctx_2.measureText(child.text).width;
                            var endPointX = offsetX + textlength;
                            var endPointY = void 0;
                            switch (options.textDecoration) {
                                case 'Underline':
                                    startPointY = offsetY + 2;
                                    endPointY = offsetY + 2;
                                    break;
                                case 'Overline':
                                    startPointY = (position.y + child.dy * i);
                                    endPointY = (position.y + child.dy * i);
                                    break;
                                case 'LineThrough':
                                    startPointY = ((offsetY + position.y + child.dy * i) / 2) + 2;
                                    endPointY = ((offsetY + position.y + child.dy * i) / 2) + 2;
                            }
                            ctx_2.beginPath();
                            ctx_2.moveTo(startPointX, startPointY);
                            ctx_2.lineTo(endPointX, endPointY);
                            ctx_2.strokeStyle = options.color;
                            ctx_2.lineWidth = options.fontSize * .08;
                            ctx_2.globalAlpha = options.opacity;
                            ctx_2.stroke();
                        }
                    }
                }
            }
            ctx_2.restore();
        }
    };
    /**@private*/
    CanvasRenderer.prototype.drawFreeTextBlazor = function (canvas, options, maxHeight, isFreeTextAnnotation, zoomFactor) {
        if (options.content && options.visible === true) {
            var ctx_3 = CanvasRenderer.getContext(canvas);
            ctx_3.save();
            this.setStyle(canvas, options);
            this.setFontStyle(canvas, options);
            var ascent = 0;
            var lineHeight = 0;
            if (options.thickness !== undefined) {
                // Used this to get the exact text height for Freetext annotation according to the font size and font family.
                var metrics = ctx_3.measureText(options.content);
                ascent = metrics.actualBoundingBoxAscent;
                if (ascent == null)
                    ascent = options.fontSize * 0.8;
                var descent = metrics.actualBoundingBoxDescent;
                if (descent == null)
                    descent = options.fontSize * 0.2;
                lineHeight = (ascent + descent);
                options.height = lineHeight * options.childNodes.length;
            }
            var pivotX = options.x + options.width * options.pivotX;
            var pivotY = options.y + options.height * options.pivotY;
            this.rotateContext(canvas, options.angle, pivotX, pivotY);
            var i = 0;
            var childNodes = [];
            childNodes = options.childNodes;
            var wrapBounds = options.wrapBounds;
            ctx_3.fillStyle = options.color;
            if (wrapBounds) {
                var position = this.labelAlign(options, wrapBounds, childNodes, lineHeight);
                var paddingAdjustmentX = options.thickness !== undefined && options.thickness === 0 ? Math.floor(options.thickness * (96 / 72)) + 2 : Math.floor(options.thickness * (96 / 72)) * 1 + 2;
                var paddingAdjustmentY = options.thickness !== undefined && options.thickness === 0 ? Math.floor(options.thickness * (96 / 72)) + 5 : Math.floor(options.thickness * (96 / 72)) * 1 + 4;
                var totalTextHeightCanvas = 0;
                for (var j = 0; j < childNodes.length; j++) {
                    var child = childNodes[j];
                    totalTextHeightCanvas += (child.dy ? child.dy : (lineHeight || options.fontSize * 1.2));
                }
                var isApplyClip = isFreeTextAnnotation && maxHeight > 0 && Math.ceil(totalTextHeightCanvas + paddingAdjustmentY + 4) > maxHeight;
                var clipLeft = void 0, clipTop = void 0, clipWidth = void 0, clipHeight = void 0;
                var clipActive = false;
                if (isApplyClip) {
                    if (options.textAlign == "right") {
                        clipLeft = position.x - paddingAdjustmentX;
                    }
                    else if (options.textAlign == "center") {
                        clipLeft = position.x;
                    }
                    else {
                        clipLeft = position.x + paddingAdjustmentX;
                    }
                    clipTop = position.y - ascent - paddingAdjustmentX;
                    clipWidth = Math.max(0, options.freeTextSelectorWidth + paddingAdjustmentX);
                    clipHeight = maxHeight + ascent;
                }
                if (isApplyClip) {
                    ctx_3.save();
                    ctx_3.beginPath();
                    ctx_3.rect(clipLeft, clipTop, clipWidth, clipHeight);
                    ctx_3.clip();
                    clipActive = true;
                }
                var textHeight = 0;
                for (i = 0; i < childNodes.length; i++) {
                    var child = childNodes[parseInt(i.toString(), 10)];
                    var offsetX = void 0;
                    var offsetY = void 0;
                    var isTextDecorationApplied = false;
                    if (options.textAlign === 'justify') {
                        if (child.text === '\n')
                            continue;
                        var baseSpaceWidth = ctx_3.measureText(' ').width;
                        var targetWidth = wrapBounds.width;
                        offsetX = position.x + child.x - wrapBounds.x + paddingAdjustmentX;
                        offsetY = position.y + child.dy * i + ascent + paddingAdjustmentY;
                        var isLastLine = i === childNodes.length - 1;
                        if (!isLastLine && targetWidth > 0) {
                            var leftEdge = position.x + child.x + paddingAdjustmentX;
                            var words = child.text.trim().split(/\s+/);
                            if (words.length <= 1) {
                                ctx_3.fillText(child.text, leftEdge, offsetY);
                                continue;
                            }
                            var widths = words.map(function (w) { return ctx_3.measureText(w).width; });
                            var wordsTotal = widths.reduce(function (a, b) { return a + b; }, 0);
                            var gaps = words.length - 1;
                            var naturalWidth = wordsTotal + baseSpaceWidth * gaps + paddingAdjustmentX * 2;
                            var extra = Math.max(0, targetWidth - naturalWidth);
                            var extraPerGap = extra / gaps;
                            var pen = leftEdge;
                            for (var i_3 = 0; i_3 < words.length; i_3++) {
                                ctx_3.fillText(words[i_3], pen, offsetY);
                                if (i_3 < gaps) {
                                    pen += widths[i_3] + baseSpaceWidth + extraPerGap;
                                }
                            }
                            if (options.textDecoration === 'Underline'
                                || options.textDecoration === 'Overline'
                                || options.textDecoration === 'LineThrough' || options.textDecoration === 'Underline LineThrough') {
                                var startX = leftEdge;
                                var startY = void 0;
                                var endX = leftEdge + targetWidth - paddingAdjustmentX * 2;
                                var endY = void 0;
                                switch (options.textDecoration) {
                                    case 'Underline':
                                        startY = offsetY + 2;
                                        endY = offsetY + 2;
                                        this.drawLine(ctx_3, startX, startY, endX, endY, options);
                                        break;
                                    case 'Overline':
                                        startY = (position.y + child.dy * i);
                                        endY = (position.y + child.dy * i);
                                        this.drawLine(ctx_3, startX, startY, endX, endY, options);
                                        break;
                                    case 'LineThrough':
                                        startY = ((offsetY + position.y + child.dy * i) / 2) + 2 + (paddingAdjustmentY / 2);
                                        endY = ((offsetY + position.y + child.dy * i) / 2) + 2 + (paddingAdjustmentY / 2);
                                        this.drawLine(ctx_3, startX, startY, endX, endY, options);
                                        break;
                                    case 'Underline LineThrough':
                                        this.drawLine(ctx_3, startX, offsetY + 2, endX, offsetY + 2, options);
                                        var midY = (offsetY + position.y + child.dy * i) / 2 + 2 + paddingAdjustmentY / 2;
                                        this.drawLine(ctx_3, startX, midY, endX, midY, options);
                                        break;
                                }
                                isTextDecorationApplied = true;
                            }
                        }
                        else {
                            ctx_3.fillText(child.text, offsetX, offsetY);
                        }
                    }
                    else if (child.text !== '\n') {
                        if (options.textAlign == "right") {
                            offsetX = position.x + child.x - wrapBounds.x - paddingAdjustmentX;
                        }
                        else if (options.textAlign == "center") {
                            offsetX = position.x + child.x - wrapBounds.x;
                        }
                        else {
                            offsetX = position.x + child.x - wrapBounds.x + paddingAdjustmentX;
                        }
                        if (options.relativeMode === 'Point') {
                            offsetY = position.y + child.dy * i + ascent + paddingAdjustmentY;
                        }
                        else {
                            offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8);
                        }
                        var tabSize = 7;
                        var textWithTabs = child.text.replace(/\t/g, ' '.repeat(tabSize));
                        textHeight += child.dy;
                        if (isFreeTextAnnotation || (maxHeight === 0 || (textHeight * zoomFactor < maxHeight * zoomFactor && isFreeTextAnnotation))) {
                            ctx_3.fillText(textWithTabs, offsetX, offsetY);
                        }
                        // if (wrapBounds.width > options.width && options.textOverflow !== 'Wrap') {
                        //     child.text = overFlow(child.text, options);
                        // }
                        //ctx.fillText(child.text, offsetX, offsetY);
                    }
                    else if (isFreeTextAnnotation) {
                        textHeight += child.dy;
                    }
                    if (child.text !== '\n') {
                        if (options.textDecoration === 'Underline'
                            || options.textDecoration === 'Overline'
                            || options.textDecoration === 'LineThrough'
                            || options.textDecoration === 'Underline LineThrough' && !isTextDecorationApplied) {
                            var startPointX = offsetX;
                            var startPointY = void 0;
                            var textlength = ctx_3.measureText(child.text).width;
                            var endPointX = offsetX + textlength;
                            var endPointY = void 0;
                            switch (options.textDecoration) {
                                case 'Underline':
                                    startPointY = offsetY + 2;
                                    endPointY = offsetY + 2;
                                    this.drawLine(ctx_3, startPointX, startPointY, endPointX, endPointY, options);
                                    break;
                                case 'Overline':
                                    startPointY = (position.y + child.dy * i);
                                    endPointY = (position.y + child.dy * i);
                                    this.drawLine(ctx_3, startPointX, startPointY, endPointX, endPointY, options);
                                    break;
                                case 'LineThrough':
                                    startPointY = ((offsetY + position.y + child.dy * i) / 2) + 2 + (paddingAdjustmentY / 2);
                                    endPointY = ((offsetY + position.y + child.dy * i) / 2) + 2 + (paddingAdjustmentY / 2);
                                    this.drawLine(ctx_3, startPointX, startPointY, endPointX, endPointY, options);
                                    break;
                                case 'Underline LineThrough':
                                    this.drawLine(ctx_3, startPointX, offsetY + 2, endPointX, offsetY + 2, options);
                                    var midY = (offsetY + position.y + child.dy * i) / 2 + 2 + paddingAdjustmentY / 2;
                                    this.drawLine(ctx_3, startPointX, midY, endPointX, midY, options);
                                    break;
                            }
                        }
                    }
                }
                if (clipActive) {
                    ctx_3.restore();
                }
            }
            ctx_3.restore();
        }
    };
    /**@private*/
    CanvasRenderer.prototype.drawText = function (canvas, options, maxHeight, isFreeTextAnnotation, zoomFactor) {
        if (options.content && options.visible === true) {
            var ctx_4 = CanvasRenderer.getContext(canvas);
            ctx_4.save();
            this.setStyle(canvas, options);
            this.setFontStyle(canvas, options);
            var ascent = 0;
            var lineHeight = 0;
            if (options.thickness !== undefined) {
                // Used this to get the exact text height for Freetext annotation according to the font size and font family.
                var metrics = ctx_4.measureText(options.content);
                ascent = metrics.actualBoundingBoxAscent;
                if (ascent == null)
                    ascent = options.fontSize * 0.8;
                var descent = metrics.actualBoundingBoxDescent;
                if (descent == null)
                    descent = options.fontSize * 0.2;
                lineHeight = (ascent + descent);
                options.height = lineHeight * options.childNodes.length;
            }
            var pivotX = options.x + options.width * options.pivotX;
            var pivotY = options.y + options.height * options.pivotY;
            this.rotateContext(canvas, options.angle, pivotX, pivotY);
            var i = 0;
            var childNodes = [];
            childNodes = options.childNodes;
            var wrapBounds = options.wrapBounds;
            ctx_4.fillStyle = options.color;
            if (wrapBounds) {
                var position = this.labelAlign(options, wrapBounds, childNodes, lineHeight);
                var paddingAdjustment = options.thickness !== undefined ? (options.thickness * (96 / 72)) * 2 : 0;
                var textHeight = 0;
                for (i = 0; i < childNodes.length; i++) {
                    var child = childNodes[parseInt(i.toString(), 10)];
                    var offsetX = void 0;
                    var offsetY = void 0;
                    var isTextDecorationApplied = false;
                    if (options.textAlign === 'justify') {
                        if (child.text === '\n')
                            continue;
                        var baseSpaceWidth = ctx_4.measureText(' ').width;
                        var targetWidth = wrapBounds.width;
                        offsetX = position.x + child.x - wrapBounds.x + paddingAdjustment;
                        offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8) + paddingAdjustment;
                        var isLastLine = i === childNodes.length - 1;
                        if (!isLastLine && targetWidth > 0) {
                            var leftEdge = position.x + child.x + paddingAdjustment;
                            var words = child.text.trim().split(/\s+/);
                            if (words.length <= 1) {
                                ctx_4.fillText(child.text, leftEdge, offsetY);
                                continue;
                            }
                            var widths = words.map(function (w) { return ctx_4.measureText(w).width; });
                            var wordsTotal = widths.reduce(function (a, b) { return a + b; }, 0);
                            var gaps = words.length - 1;
                            var naturalWidth = wordsTotal + baseSpaceWidth * gaps + paddingAdjustment * 2;
                            var extra = Math.max(0, targetWidth - naturalWidth);
                            var extraPerGap = extra / gaps;
                            var pen = leftEdge;
                            for (var i_4 = 0; i_4 < words.length; i_4++) {
                                ctx_4.fillText(words[i_4], pen, offsetY);
                                if (i_4 < gaps) {
                                    pen += widths[i_4] + baseSpaceWidth + extraPerGap;
                                }
                            }
                            if (options.textDecoration === 'Underline'
                                || options.textDecoration === 'Overline'
                                || options.textDecoration === 'LineThrough' || options.textDecoration === 'Underline LineThrough') {
                                var startX = leftEdge;
                                var startY = void 0;
                                var endX = leftEdge + targetWidth - paddingAdjustment * 2;
                                var endY = void 0;
                                switch (options.textDecoration) {
                                    case 'Underline':
                                        startY = offsetY + 2;
                                        endY = offsetY + 2;
                                        this.drawLine(ctx_4, startX, startY, endX, endY, options);
                                        break;
                                    case 'Overline':
                                        startY = (position.y + child.dy * i);
                                        endY = (position.y + child.dy * i);
                                        this.drawLine(ctx_4, startX, startY, endX, endY, options);
                                        break;
                                    case 'LineThrough':
                                        startY = ((offsetY + position.y + child.dy * i) / 2) + 2 + (paddingAdjustment / 2);
                                        endY = ((offsetY + position.y + child.dy * i) / 2) + 2 + (paddingAdjustment / 2);
                                        this.drawLine(ctx_4, startX, startY, endX, endY, options);
                                        break;
                                    case 'Underline LineThrough':
                                        this.drawLine(ctx_4, startX, offsetY + 2, endX, offsetY + 2, options);
                                        var midY = (offsetY + position.y + child.dy * i) / 2 + 2 + paddingAdjustment / 2;
                                        this.drawLine(ctx_4, startX, midY, endX, midY, options);
                                        break;
                                }
                                isTextDecorationApplied = true;
                            }
                        }
                        else {
                            ctx_4.fillText(child.text, offsetX, offsetY);
                        }
                    }
                    else if (child.text !== '\n') {
                        if (options.textAlign == "right") {
                            offsetX = position.x + child.x - wrapBounds.x - paddingAdjustment;
                        }
                        else if (options.textAlign == "center") {
                            offsetX = position.x + child.x - wrapBounds.x + (paddingAdjustment / 2);
                        }
                        else {
                            offsetX = position.x + child.x - wrapBounds.x + paddingAdjustment;
                        }
                        if (options.relativeMode === 'Point') {
                            offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8) + paddingAdjustment;
                        }
                        else {
                            offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8);
                        }
                        var tabSize = 7;
                        var textWithTabs = child.text.replace(/\t/g, ' '.repeat(tabSize));
                        textHeight += child.dy;
                        if (!isFreeTextAnnotation || (maxHeight === 0 || (textHeight * zoomFactor < maxHeight && isFreeTextAnnotation))) {
                            ctx_4.fillText(textWithTabs, offsetX, offsetY);
                        }
                        // if (wrapBounds.width > options.width && options.textOverflow !== 'Wrap') {
                        //     child.text = overFlow(child.text, options);
                        // }
                        //ctx.fillText(child.text, offsetX, offsetY);
                    }
                    else if (isFreeTextAnnotation) {
                        textHeight += child.dy;
                    }
                    if (child.text !== '\n') {
                        if (options.textDecoration === 'Underline'
                            || options.textDecoration === 'Overline'
                            || options.textDecoration === 'LineThrough'
                            || options.textDecoration === 'Underline LineThrough' && !isTextDecorationApplied) {
                            var startPointX = offsetX;
                            var startPointY = void 0;
                            var textlength = ctx_4.measureText(child.text).width;
                            var endPointX = offsetX + textlength;
                            var endPointY = void 0;
                            switch (options.textDecoration) {
                                case 'Underline':
                                    startPointY = offsetY + 2;
                                    endPointY = offsetY + 2;
                                    this.drawLine(ctx_4, startPointX, startPointY, endPointX, endPointY, options);
                                    break;
                                case 'Overline':
                                    startPointY = (position.y + child.dy * i);
                                    endPointY = (position.y + child.dy * i);
                                    this.drawLine(ctx_4, startPointX, startPointY, endPointX, endPointY, options);
                                    break;
                                case 'LineThrough':
                                    startPointY = ((offsetY + position.y + child.dy * i) / 2) + 2 + (paddingAdjustment / 2);
                                    endPointY = ((offsetY + position.y + child.dy * i) / 2) + 2 + (paddingAdjustment / 2);
                                    this.drawLine(ctx_4, startPointX, startPointY, endPointX, endPointY, options);
                                    break;
                                case 'Underline LineThrough':
                                    this.drawLine(ctx_4, startPointX, offsetY + 2, endPointX, offsetY + 2, options);
                                    var midY = (offsetY + position.y + child.dy * i) / 2 + 2 + paddingAdjustment / 2;
                                    this.drawLine(ctx_4, startPointX, midY, endPointX, midY, options);
                                    break;
                            }
                        }
                    }
                }
            }
            ctx_4.restore();
        }
    };
    /** @private  */
    CanvasRenderer.prototype.drawTextBlazor = function (canvas, options, maxHeight, isFreeTextAnnotation, zoomFactor) {
        if (options.content && options.visible === true) {
            var ctx_5 = CanvasRenderer.getContext(canvas);
            ctx_5.save();
            this.setStyle(canvas, options);
            this.setFontStyle(canvas, options);
            var ascent = 0;
            var lineHeight = 0;
            if (options.thickness !== undefined) {
                // Used this to get the exact text height for Freetext annotation according to the font size and font family.
                var metrics = ctx_5.measureText(options.content);
                ascent = metrics.actualBoundingBoxAscent;
                if (ascent == null)
                    ascent = options.fontSize * 0.8;
                var descent = metrics.actualBoundingBoxDescent;
                if (descent == null)
                    descent = options.fontSize * 0.2;
                lineHeight = (ascent + descent);
                options.height = lineHeight * options.childNodes.length;
            }
            var pivotX = options.x + options.width * options.pivotX;
            var pivotY = options.y + options.height * options.pivotY;
            this.rotateContext(canvas, options.angle, pivotX, pivotY);
            var i = 0;
            var childNodes = [];
            childNodes = options.childNodes;
            var wrapBounds = options.wrapBounds;
            ctx_5.fillStyle = options.color;
            if (wrapBounds) {
                var position = this.labelAlign(options, wrapBounds, childNodes, lineHeight);
                var paddingAdjustment = options.thickness !== undefined ? (options.thickness * (96 / 72)) * 2 : 0;
                var textHeight = 0;
                for (i = 0; i < childNodes.length; i++) {
                    var child = childNodes[parseInt(i.toString(), 10)];
                    var offsetX = void 0;
                    var offsetY = void 0;
                    var isTextDecorationApplied = false;
                    if (options.textAlign === 'justify') {
                        if (child.text === '\n')
                            continue;
                        var baseSpaceWidth = ctx_5.measureText(' ').width;
                        var targetWidth = wrapBounds.width;
                        offsetX = position.x + child.x - wrapBounds.x + paddingAdjustment;
                        offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8) + paddingAdjustment;
                        var isLastLine = i === childNodes.length - 1;
                        if (!isLastLine && targetWidth > 0) {
                            var leftEdge = position.x + child.x + paddingAdjustment;
                            var words = child.text.trim().split(/\s+/);
                            if (words.length <= 1) {
                                ctx_5.fillText(child.text, leftEdge, offsetY);
                                continue;
                            }
                            var widths = words.map(function (w) { return ctx_5.measureText(w).width; });
                            var wordsTotal = widths.reduce(function (a, b) { return a + b; }, 0);
                            var gaps = words.length - 1;
                            var naturalWidth = wordsTotal + baseSpaceWidth * gaps + paddingAdjustment * 2;
                            var extra = Math.max(0, targetWidth - naturalWidth);
                            var extraPerGap = extra / gaps;
                            var pen = leftEdge;
                            for (var i_5 = 0; i_5 < words.length; i_5++) {
                                ctx_5.fillText(words[i_5], pen, offsetY);
                                if (i_5 < gaps) {
                                    pen += widths[i_5] + baseSpaceWidth + extraPerGap;
                                }
                            }
                            if (options.textDecoration === 'Underline'
                                || options.textDecoration === 'Overline'
                                || options.textDecoration === 'LineThrough' || options.textDecoration === 'Underline LineThrough') {
                                var startX = leftEdge;
                                var startY = void 0;
                                var endX = leftEdge + targetWidth - paddingAdjustment * 2;
                                var endY = void 0;
                                switch (options.textDecoration) {
                                    case 'Underline':
                                        startY = offsetY + 2;
                                        endY = offsetY + 2;
                                        this.drawLine(ctx_5, startX, startY, endX, endY, options);
                                        break;
                                    case 'Overline':
                                        startY = (position.y + child.dy * i);
                                        endY = (position.y + child.dy * i);
                                        this.drawLine(ctx_5, startX, startY, endX, endY, options);
                                        break;
                                    case 'LineThrough':
                                        startY = ((offsetY + position.y + child.dy * i) / 2) + 2 + (paddingAdjustment / 2);
                                        endY = ((offsetY + position.y + child.dy * i) / 2) + 2 + (paddingAdjustment / 2);
                                        this.drawLine(ctx_5, startX, startY, endX, endY, options);
                                        break;
                                    case 'Underline LineThrough':
                                        this.drawLine(ctx_5, startX, offsetY + 2, endX, offsetY + 2, options);
                                        var midY = (offsetY + position.y + child.dy * i) / 2 + 2 + paddingAdjustment / 2;
                                        this.drawLine(ctx_5, startX, midY, endX, midY, options);
                                        break;
                                }
                                isTextDecorationApplied = true;
                            }
                        }
                        else {
                            ctx_5.fillText(child.text, offsetX, offsetY);
                        }
                    }
                    else if (child.text !== '\n') {
                        if (options.textAlign == "right") {
                            offsetX = position.x + child.x - wrapBounds.x - paddingAdjustment;
                        }
                        else if (options.textAlign == "center") {
                            offsetX = position.x + child.x - wrapBounds.x;
                        }
                        else {
                            offsetX = position.x + child.x - wrapBounds.x + paddingAdjustment;
                        }
                        if (options.relativeMode === 'Point') {
                            offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8) + paddingAdjustment;
                        }
                        else {
                            offsetY = position.y + child.dy * i + ((options.fontSize) * 0.8);
                        }
                        var tabSize = 7;
                        var textWithTabs = child.text.replace(/\t/g, ' '.repeat(tabSize));
                        textHeight += child.dy;
                        if (!isFreeTextAnnotation || (maxHeight === 0 || (textHeight * zoomFactor < maxHeight && isFreeTextAnnotation))) {
                            ctx_5.fillText(textWithTabs, offsetX, offsetY);
                        }
                        // if (wrapBounds.width > options.width && options.textOverflow !== 'Wrap') {
                        //     child.text = overFlow(child.text, options);
                        // }
                        //ctx.fillText(child.text, offsetX, offsetY);
                    }
                    else if (isFreeTextAnnotation) {
                        textHeight += child.dy;
                    }
                    if (child.text !== '\n') {
                        if (options.textDecoration === 'Underline'
                            || options.textDecoration === 'Overline'
                            || options.textDecoration === 'LineThrough'
                            || options.textDecoration === 'Underline LineThrough' && !isTextDecorationApplied) {
                            var startPointX = offsetX;
                            var startPointY = void 0;
                            var textlength = ctx_5.measureText(child.text).width;
                            var endPointX = offsetX + textlength;
                            var endPointY = void 0;
                            switch (options.textDecoration) {
                                case 'Underline':
                                    startPointY = offsetY + 2;
                                    endPointY = offsetY + 2;
                                    this.drawLine(ctx_5, startPointX, startPointY, endPointX, endPointY, options);
                                    break;
                                case 'Overline':
                                    startPointY = (position.y + child.dy * i);
                                    endPointY = (position.y + child.dy * i);
                                    this.drawLine(ctx_5, startPointX, startPointY, endPointX, endPointY, options);
                                    break;
                                case 'LineThrough':
                                    startPointY = ((offsetY + position.y + child.dy * i) / 2) + 2 + (paddingAdjustment / 2);
                                    endPointY = ((offsetY + position.y + child.dy * i) / 2) + 2 + (paddingAdjustment / 2);
                                    this.drawLine(ctx_5, startPointX, startPointY, endPointX, endPointY, options);
                                    break;
                                case 'Underline LineThrough':
                                    this.drawLine(ctx_5, startPointX, offsetY + 2, endPointX, offsetY + 2, options);
                                    var midY = (offsetY + position.y + child.dy * i) / 2 + 2 + paddingAdjustment / 2;
                                    this.drawLine(ctx_5, startPointX, midY, endPointX, midY, options);
                                    break;
                            }
                        }
                    }
                }
            }
            ctx_5.restore();
        }
    };
    //end region
    // Draw Line and Line Through
    CanvasRenderer.prototype.drawLine = function (ctx, startPointX, startPointY, endPointX, endPointY, options) {
        ctx.beginPath();
        ctx.moveTo(startPointX, startPointY);
        ctx.lineTo(endPointX, endPointY);
        ctx.strokeStyle = options.color;
        ctx.lineWidth = options.fontSize * .08;
        ctx.globalAlpha = options.opacity;
        ctx.stroke();
    };
    // vector magnitude
    CanvasRenderer.prototype.m = function (v) { return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2)); };
    // ratio between two vectors
    CanvasRenderer.prototype.r = function (u, v) { return (u[0] * v[0] + u[1] * v[1]) / (this.m(u) * this.m(v)); };
    // angle between two vectors
    CanvasRenderer.prototype.a = function (u, v) { return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(this.r(u, v)); };
    CanvasRenderer.prototype.getMeetOffset = function (arg, res, dest) {
        var max = Math.max(res, dest);
        var min = Math.min(res, dest);
        switch (arg) {
            case 'min': return 0;
            case 'mid': return (max - min) / 2;
            case 'max': return max - min;
            default: return 0;
        }
    };
    CanvasRenderer.prototype.getSliceOffset = function (arg, res, dest, src) {
        switch (arg) {
            case 'min': return 0;
            case 'mid': return (res - dest) / 2 * src / res;
            case 'max': return (res - dest) * src / res;
            default: return 0;
        }
    };
    CanvasRenderer.prototype.image = function (ctx, image, x, y, width, height, alignOptions, annotationCallback) {
        ctx.beginPath();
        var srcWidth = image.width;
        var srcHeight = image.height;
        var destinationW = width;
        var destinationH = height;
        var resultWidth = 0;
        var resultHeight = 0;
        ctx.globalAlpha = alignOptions.opacity;
        if (alignOptions && alignOptions.alignment !== 'None') {
            var xalign = alignOptions.alignment.toLowerCase().substr(1, 3);
            var yalign = alignOptions.alignment.toLowerCase().substr(5, 3);
            if (alignOptions.scale === 'Slice') {
                var a = function () {
                    resultWidth = destinationW;
                    resultHeight = srcHeight * destinationW / srcWidth;
                };
                var b = function () {
                    resultWidth = srcWidth * destinationH / srcHeight;
                    resultHeight = destinationH;
                };
                if (destinationW > destinationH) {
                    a();
                    if (destinationH > resultHeight) {
                        b();
                    }
                }
                else if (destinationW === destinationH) {
                    if (srcWidth > srcHeight) {
                        b();
                    }
                    else {
                        a();
                    }
                }
                else {
                    b();
                    if (destinationW > resultWidth) {
                        a();
                    }
                }
                var x1 = this.getSliceOffset(xalign, resultWidth, destinationW, srcWidth);
                var y1 = this.getSliceOffset(yalign, resultHeight, destinationH, srcHeight);
                var sWidth = srcWidth - x1;
                var sHeight = srcHeight - y1;
                var dWidth = resultWidth - (x1 * (resultWidth / srcWidth));
                var dHeight = resultHeight - (y1 * (resultHeight / srcHeight));
                var canvas1 = createHtmlElement('canvas', { 'width': width.toString(), 'height': height.toString() });
                var ctx1 = canvas1.getContext('2d');
                ctx.clearRect(x, y, dWidth, dHeight);
                ctx1.drawImage(image, x1, y1, sWidth, sHeight, 0, 0, dWidth, dHeight);
                ctx.clearRect(x, y, width, height);
                ctx.drawImage(canvas1, x, y, width, height);
            }
            else if (alignOptions.scale === 'Meet') {
                var srcRatio = (srcHeight / srcWidth);
                var destRatio = (destinationH / destinationW);
                resultWidth = destRatio > srcRatio ? destinationW : destinationH / srcRatio;
                resultHeight = destRatio > srcRatio ? destinationW * srcRatio : destinationH;
                x += this.getMeetOffset(xalign, resultWidth, destinationW);
                y += this.getMeetOffset(yalign, resultHeight, destinationH);
                ctx.clearRect(x, y, resultWidth, resultHeight);
                ctx.drawImage(image, 0, 0, srcWidth, srcHeight, x, y, resultWidth, resultHeight);
            }
            else {
                ctx.clearRect(x, y, width, height);
                ctx.drawImage(image, x, y, width, height);
            }
        }
        else {
            if (image.complete) {
                var canvasId = ctx.canvas.id;
                if (this.imageList[canvasId]) {
                    var existingImageIndex = this.isExistingImage(canvasId, this.imageList, alignOptions);
                    if (existingImageIndex !== -1) {
                        this.updateImageList(existingImageIndex, this.imageList, canvasId);
                    }
                    this.updateCanvasList(this.imageList, canvasId);
                }
                //ctx.clearRect(x, y, width, height);
                ctx.drawImage(image, x, y, width, height);
            }
            else {
                var proxy_1 = this;
                var transform_1 = ctx.getTransform();
                image.onload = null;
                var canvasId = ctx.canvas.id;
                if (!this.imageList[canvasId]) {
                    this.imageList[canvasId] = [];
                }
                var existingImageIndex = this.isExistingImage(canvasId, this.imageList, alignOptions);
                var newImageEntry = { id: alignOptions.id, image: image, canvasId: canvasId };
                if (existingImageIndex !== -1) {
                    this.updateImageList(existingImageIndex, this.imageList, canvasId);
                }
                this.imageList[canvasId].push(newImageEntry);
                image.onload = function () {
                    var lastIndex = alignOptions.id.lastIndexOf('_content');
                    var annotationID = lastIndex !== -1 ? alignOptions.id.substring(0, lastIndex) : alignOptions.id;
                    var annotationObject = true;
                    if (annotationCallback !== undefined && !annotationCallback(annotationID)) {
                        annotationObject = false;
                    }
                    if (annotationObject) {
                        ctx.setTransform(transform_1.a, transform_1.b, transform_1.c, transform_1.d, transform_1.e, transform_1.f);
                        //ctx.clearRect(x, y, width, height);
                        //ctx.drawImage(image, x, y, width, height);
                        var canvasIdValue = ctx.canvas.id;
                        if (proxy_1.imageList[canvasIdValue]) {
                            var existingImageIndex_1 = proxy_1.isExistingImage(canvasIdValue, proxy_1.imageList, alignOptions);
                            if (existingImageIndex_1 !== -1) {
                                proxy_1.updateImageList(existingImageIndex_1, proxy_1.imageList, canvasIdValue);
                                ctx.globalAlpha = alignOptions.opacity;
                                ctx.drawImage(image, x, y, width, height);
                            }
                            proxy_1.updateCanvasList(proxy_1.imageList, canvasIdValue);
                        }
                    }
                };
            }
        }
        ctx.closePath();
    };
    CanvasRenderer.prototype.isExistingImage = function (canvasId, imageList, alignOptions) {
        return imageList[canvasId].findIndex(function (imageObject) { return imageObject.id === alignOptions.id; });
    };
    CanvasRenderer.prototype.updateImageList = function (existingImageIndex, imageList, canvasId) {
        imageList[canvasId][existingImageIndex].image.onload = null;
        imageList[canvasId].splice(existingImageIndex, 1);
    };
    CanvasRenderer.prototype.updateCanvasList = function (imageList, canvasId) {
        if (imageList[canvasId] && imageList[canvasId].length === 0) {
            delete imageList[canvasId];
        }
    };
    // text utility
    CanvasRenderer.prototype.loadImage = function (ctx, obj, canvas, pivotX, pivotY, annotationCallback, annotationType) {
        this.rotateContext(canvas, obj.angle, pivotX, pivotY);
        var image;
        if (window.customStampCollection && window.customStampCollection.get(obj.printID)) {
            image = window.customStampCollection.get(obj.printID);
        }
        else if (window.signatureCollection && window.signatureCollection.get(obj.printID)) {
            image = window.signatureCollection.get(obj.printID);
        }
        else {
            // Check if it is a sticky note type annotation
            if (window && window.stickyNote && window.stickyNote.src && annotationType && annotationType == 'StickyNotes') {
                image = window.stickyNote;
            }
            else {
                // Create a new Image and set the source
                image = new Image();
                image.src = obj.source;
            }
        }
        this.image(ctx, image, obj.x, obj.y, obj.width, obj.height, obj, annotationCallback);
    };
    /**   @private  */
    CanvasRenderer.prototype.drawImage = function (canvas, obj, parentSvg, fromPalette, annotationCallback, annotationType) {
        var _this = this;
        if (obj.visible) {
            var ctx_6 = CanvasRenderer.getContext(canvas);
            ctx_6.save();
            var pivotX_1 = obj.x + obj.width * obj.pivotX;
            var pivotY_1 = obj.y + obj.height * obj.pivotY;
            var imageObj = new Image();
            imageObj.src = obj.source;
            var id = ctx_6.canvas.id.split('_');
            var value = id[id.length - 1] === ('diagram' || 'diagramLayer') ? true : false;
            /**
             *  Since Clipping portion for node with slice option is not calculated properly
             * if (obj.sourceX !== undefined && obj.sourceY !== undefined && obj.sourceWidth !== undefined
             *  && obj.sourceHeight !== undefined) {
             *  ctx.drawImage(imageObj, obj.sourceX, obj.sourceY, obj.sourceWidth, obj.sourceHeight, obj.x, obj.y, obj.width, obj.height);
             *  } else {
             *             ctx.drawImage(imageObj, obj.x, obj.y, obj.width, obj.height);
             * }
             */
            if (!fromPalette) {
                this.loadImage(ctx_6, obj, canvas, pivotX_1, pivotY_1, annotationCallback, annotationType);
            }
            else {
                imageObj.onload = function () {
                    _this.loadImage(ctx_6, obj, canvas, pivotX_1, pivotY_1);
                };
            }
            ctx_6.restore();
        }
    };
    /**   @private  */
    CanvasRenderer.prototype.labelAlign = function (text, wrapBounds, childNodes, lineHeight) {
        var bounds = new Size(wrapBounds.width, childNodes.length * (text.fontSize * 1.2));
        var totalHeight = text.thickness !== undefined ? childNodes.length * lineHeight : 0;
        var position = { x: 0, y: 0 };
        var labelX = text.x;
        var labelY = text.y;
        var pointx = text.width * 0.5;
        var pointy = text.height * 0.5;
        if (text.isEJ2 === true) {
            if (text.textAlign === 'left' || text.textAlign === 'justify') {
                pointx = 0;
            }
            else if (text.textAlign === 'center') {
                if (wrapBounds.width > text.width && (text.textOverflow === 'Ellipsis' || text.textOverflow === 'Clip')) {
                    pointx = 0;
                }
                else {
                    pointx = text.width * 0.5;
                }
            }
            else if (text.textAlign === 'right') {
                pointx = (text.width * 1);
            }
        }
        else {
            if (text.textAlign === 'left') {
                pointx = 0;
            }
            else if (text.textAlign === 'center') {
                if (wrapBounds.width > text.width && (text.textOverflow === 'Ellipsis' || text.textOverflow === 'Clip')) {
                    pointx = 0;
                }
                else {
                    pointx = text.width * 0.5;
                }
            }
            else if (text.textAlign === 'right') {
                pointx = (text.width * 1);
            }
        }
        position.x = labelX + pointx + (wrapBounds ? wrapBounds.x : 0);
        if (text.thickness !== undefined) {
            position.y = labelY + (text.height * 0.5) - (totalHeight / 2);
        }
        else {
            position.y = labelY + pointy - bounds.height / 2;
        }
        return position;
    };
    return CanvasRenderer;
}());
export { CanvasRenderer };
export function refreshDiagramElements(canvas, drawingObjects, renderer, annotationCallback, annotationType) {
    if (annotationType == "FreeText") {
        renderer.isFreeTextAnnotation = true;
    }
    if (annotationType == "Stamp") {
        renderer.isStampAnnotation = true;
    }
    for (var i = 0; i < drawingObjects.length; i++) {
        renderer.renderElement(drawingObjects[parseInt(i.toString(), 10)], canvas, undefined, undefined, undefined, undefined, undefined, undefined, annotationCallback, annotationType);
    }
    renderer.isFreeTextAnnotation = false;
    renderer.isStampAnnotation = false;
}
