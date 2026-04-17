import { PathElement } from '../core/elements/path-element';
import { TextElement } from '../core/elements/text-element';
import { Container } from '../core/containers/container';
import { wordBreakToString, whiteSpaceToString, textAlignToString } from '../utility/base-util';
import { getDiagramElement } from '../utility/dom-util';
import { CanvasRenderer } from './canvas-renderer';
import { ImageElement } from '../core/elements/image-element';
/**
 * Renderer module is used to render basic diagram elements
 */
/** @private */
var DrawingRenderer = /** @class */ (function () {
    function DrawingRenderer(name, isSvgMode) {
        /**   @private  */
        this.renderer = null;
        // private svgRenderer: SvgRenderer;
        /** @private */
        this.isSvgMode = true;
        this.freeTextMaxHeight = 0;
        this.rectHeight = 0;
        this.isFreeTextAnnotation = false;
        this.isStampAnnotation = false;
        this.zoomFactor = 1;
        this.diagramId = name;
        this.element = getDiagramElement(this.diagramId);
        this.isSvgMode = isSvgMode;
        this.renderer = new CanvasRenderer();
        //  this.svgRenderer = new SvgRenderer();
    }
    // /** @private */
    // public setLayers(): void {
    //     this.adornerSvgLayer = this.element.getElementsByClassName('e-adorner-layer')[0] as SVGSVGElement;
    // }
    /**   @private  */
    DrawingRenderer.prototype.renderElement = function (element, canvas, htmlLayer, transform, parentSvg, createParent, fromPalette, indexValue, annotationCallback, annotationType) {
        var isElement = true;
        if (element instanceof Container) {
            isElement = false;
            this.renderContainer(element, canvas, htmlLayer, transform, parentSvg, createParent, fromPalette, indexValue, annotationCallback, annotationType);
        }
        else if (element instanceof ImageElement) {
            this.renderImageElement(element, canvas, transform, parentSvg, fromPalette, annotationCallback, annotationType);
        }
        else if (element instanceof PathElement) {
            this.renderPathElement(element, canvas, transform, parentSvg, fromPalette);
        }
        else if (element instanceof TextElement) {
            this.renderTextElement(element, canvas, transform, parentSvg, fromPalette);
        }
        else {
            this.rectHeight = element.bounds.height;
            this.renderRect(element, canvas, transform, parentSvg);
        }
    };
    /**   @private  */
    DrawingRenderer.prototype.renderImageElement = function (element, canvas, transform, parentSvg, fromPalette, annotationCallback, annotationType) {
        var options = this.getBaseAttributes(element, transform);
        options.cornerRadius = 0;
        this.renderer.drawRectangle(canvas, options);
        // let sx: number; let sy: number;
        var imageWidth;
        var imageHeight;
        var sourceWidth;
        var sourceHeight;
        if (element.stretch === 'Stretch') {
            imageWidth = element.actualSize.width;
            imageHeight = element.actualSize.height;
        }
        else {
            var contentWidth = element.contentSize.width;
            var contentHeight = element.contentSize.height;
            var widthRatio = options.width / contentWidth;
            var heightRatio = options.height / contentHeight;
            var ratio = void 0;
            switch (element.stretch) {
                case 'Meet':
                    ratio = Math.min(widthRatio, heightRatio);
                    imageWidth = contentWidth * ratio;
                    imageHeight = contentHeight * ratio;
                    options.x += Math.abs(options.width - imageWidth) / 2;
                    options.y += Math.abs(options.height - imageHeight) / 2;
                    break;
                case 'Slice':
                    widthRatio = options.width / contentWidth;
                    heightRatio = options.height / contentHeight;
                    ratio = Math.max(widthRatio, heightRatio);
                    imageWidth = contentWidth * ratio;
                    imageHeight = contentHeight * ratio;
                    sourceWidth = options.width / imageWidth * contentWidth;
                    sourceHeight = options.height / imageHeight * contentHeight;
                    break;
                case 'None':
                    imageWidth = contentWidth;
                    imageHeight = contentHeight;
                    break;
            }
        }
        options.width = imageWidth;
        options.height = imageHeight;
        //Commented for code coverage
        //(options as ImageAttributes).sourceX = sx;
        //(options as ImageAttrib                                                                           utes).sourceY = sy;
        options.sourceWidth = sourceWidth;
        options.sourceHeight = sourceHeight;
        options.source = element.source;
        options.alignment = element.imageAlign;
        options.scale = element.imageScale;
        options.printID = element.printID;
        this.renderer.drawImage(canvas, options, parentSvg, fromPalette, annotationCallback, annotationType);
    };
    /**   @private  */
    DrawingRenderer.prototype.renderPathElement = function (element, canvas, transform, parentSvg, fromPalette) {
        var options = this.getBaseAttributes(element, transform);
        options.data = element.absolutePath;
        options.data = element.absolutePath;
        if (element.isSharpEdge) {
            options.isSharpEdge = element.isSharpEdge;
        }
        var ariaLabel = element.id;
        if (!this.isSvgMode) {
            options.x = options.x;
            options.y = options.y;
        }
        this.renderer.drawPath(canvas, options);
    };
    /**   @private  */
    DrawingRenderer.prototype.renderTextElement = function (element, canvas, transform, parentSvg, fromPalette) {
        var options = this.getBaseAttributes(element, transform);
        options.cornerRadius = 0;
        options.whiteSpace = whiteSpaceToString(element.style.whiteSpace, element.style.textWrapping);
        options.content = element.content;
        options.breakWord = wordBreakToString(element.style.textWrapping);
        options.textAlign = textAlignToString(element.style.textAlign);
        options.color = element.style.color;
        options.italic = element.style.italic;
        options.bold = element.style.bold;
        options.fontSize = element.style.fontSize;
        options.fontFamily = element.style.fontFamily;
        options.textOverflow = element.style.textOverflow;
        options.textDecoration = element.style.textDecoration;
        options.doWrap = element.doWrap;
        options.wrapBounds = element.wrapBounds;
        options.childNodes = element.childNodes;
        options.isShapeLabel = element.isShapeLabel;
        options.relativeMode = element.relativeMode;
        options.dashArray = '';
        options.strokeWidth = 0;
        options.fill = element.style.fill;
        options.freeTextSelectorWidth = element.freeTextSelectorWidth;
        if (element.thickness !== undefined) {
            options.thickness = element.thickness;
        }
        var ariaLabel = element.content ? element.content : element.id;
        if (this.isFreeTextAnnotation && options.isEJ2) {
            this.renderer.drawRectangleFreetextEJ2(canvas, options);
        }
        else {
            this.renderer.drawRectangle(canvas, options);
        }
        if (element.isEJ2 === true) {
            options.strokeWidth = element.style.strokeWidth;
            options.isEJ2 = element.isEJ2;
            if (this.isFreeTextAnnotation && options.isEJ2) {
                this.renderer.drawTextFreetextEJ2(canvas, options, this.isFreeTextAnnotation, this.rectHeight);
            }
            else {
                this.renderer.drawTextEJ2(canvas, options, this.isStampAnnotation);
            }
        }
        else {
            if (this.isFreeTextAnnotation) {
                this.renderer.drawFreeTextBlazor(canvas, options, this.freeTextMaxHeight, this.isFreeTextAnnotation, this.zoomFactor);
            }
            else if (options.isShapeLabel) {
                this.renderer.drawTextBlazor(canvas, options, this.freeTextMaxHeight, this.isFreeTextAnnotation, this.zoomFactor);
            }
            else {
                this.renderer.drawText(canvas, options, this.freeTextMaxHeight, this.isFreeTextAnnotation, this.zoomFactor);
            }
        }
    };
    /**   @private  */
    DrawingRenderer.prototype.renderContainer = function (group, canvas, htmlLayer, transform, parentSvg, createParent, fromPalette, indexValue, annotationCallback, annotationType) {
        transform = { tx: 0, ty: 0, scale: 1 };
        var svgParent = { svg: parentSvg, g: canvas };
        if (this.diagramId) {
            parentSvg = parentSvg;
        }
        this.renderRect(group, canvas, transform, parentSvg);
        if (group.hasChildren()) {
            var parentG = void 0;
            var svgParent_1;
            for (var _i = 0, _a = group.children; _i < _a.length; _i++) {
                var child = _a[_i];
                this.renderElement(child, parentG || canvas, htmlLayer, transform, parentSvg, true, fromPalette, indexValue, annotationCallback, annotationType);
            }
        }
    };
    /**   @private  */
    DrawingRenderer.prototype.renderRect = function (element, canvas, transform, parentSvg) {
        var options = this.getBaseAttributes(element, transform);
        options.cornerRadius = element.cornerRadius || 0;
        if (element.isSharpEdge) {
            options.isSharpEdge = element.isSharpEdge;
        }
        var ariaLabel = element.id;
        if (this.isFreeTextAnnotation && (options.isEJ2 || element.isEJ2)) {
            this.renderer.drawRectangleFreetextEJ2(canvas, options);
        }
        else {
            this.renderer.drawRectangle(canvas, options);
        }
    };
    /**   @private  */
    DrawingRenderer.prototype.getBaseAttributes = function (element, transform) {
        var options = {
            width: element.actualSize.width, height: element.actualSize.height,
            x: element.offsetX - element.actualSize.width * element.pivot.x + 0.5,
            y: element.offsetY - element.actualSize.height * element.pivot.y + 0.5,
            fill: element.style.fill, stroke: element.style.strokeColor, angle: element.rotateAngle + element.parentTransform,
            pivotX: element.pivot.x, pivotY: element.pivot.y, strokeWidth: element.style.strokeWidth,
            dashArray: element.style.strokeDashArray || '', opacity: element.style.opacity,
            visible: element.visible, id: element.id, gradient: element.style.gradient,
        };
        if (element.thickness !== undefined) {
            options.thickness = element.thickness;
        }
        if (element.children && element.children[0] && element.children[0].isEJ2 === true) {
            options.isEJ2 = true;
        }
        if (transform) {
            options.x += transform.tx;
            options.y += transform.ty;
        }
        return options;
    };
    return DrawingRenderer;
}());
export { DrawingRenderer };
