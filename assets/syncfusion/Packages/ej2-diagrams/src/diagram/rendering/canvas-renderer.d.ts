import { PointModel } from './../primitives/point-model';
import { ImageAttributes, StyleAttributes, BaseAttributes } from './canvas-interface';
import { RectAttributes, PathAttributes, TextAttributes, SubTextElement, TextBounds } from './canvas-interface';
import { IRenderer } from './../rendering/IRenderer';
import { PathElement } from '../core/elements/path-element';
import { TextElement } from '../core/elements/text-element';
import { ImageElement } from '../core/elements/image-element';
/**
 * Canvas Renderer
 */
/** @private */
export declare class CanvasRenderer implements IRenderer {
    /**
     * Provide the context value for the canvas \
     *
     *  @returns {CanvasRenderingContext2D} Provide the context value for the canvas .\
     *  @param { HTMLCanvasElement} canvas - Return the dashed array values .
     *  @private
     */
    static getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D;
    private static setCanvasSize;
    /**
     * Draw the gradient for the diagram shapes .\
     *
     *  @returns {SVGElement} Draw the gradient for the diagram shapes.
     *  @param {StyleAttributes} options - Provide the options  for the gradient  element .
     *  @param {SVGElement} ctx - Provide canvas values .
     *  @param {string} x - Provide the x value for the gradient .
     *  @param {string} y - Provide the x value for the gradient .
     *  @private
     */
    renderGradient(options: StyleAttributes, ctx: CanvasRenderingContext2D, x?: number, y?: number): CanvasRenderingContext2D;
    /**
     * Draw the shawdow  for the rectangle shape in diagram \
     *
     *  @returns {void}  Draw the shawdow  for the rectangle shape in diagram .\
     *
     *  @param { SVGElement} options - Provide the base attributes .
     *  @param { RectAttributes} canvas - Provide the canvas values .
     *  @param { string} collection - Provide the collection value.
     *  @private
     */
    renderShadow(options: BaseAttributes, canvas: HTMLCanvasElement, collection?: Object[]): void;
    /**
     * Create canvas element for the diagram \
     *
     *  @returns {HTMLCanvasElement}    Create canvas element for the diagram .\
     *
     *  @param { SVGElement} id - Provide the id for the canvas.
     *  @param { Object} width - Provide the width for the canvas.
     *  @param { Object} height - Provide the height for the canvas.
     *  @private
     */
    static createCanvas(id: string, width: number, height: number): HTMLCanvasElement;
    private setStyle;
    private rotateContext;
    private setFontStyle;
    /**
     * Return the dashed array values \
     *
     *  @returns {number[]}  Return the dashed array values .\
     *  @param { SVGElement} dashArray - Return the dashed array values .
     *  @private
     */
    parseDashArray(dashArray: string): number[];
    private drawRoundedRect;
    /**
     * Draw the Rectangle for the diagram \
     *
     *  @returns {void}  Draw the Rectangle for the diagram .\
     *
     *  @param { SVGElement} canvas - Provide the SVG .
     *  @param { RectAttributes} options - Provide the Rect attributes .
     *  @param { string} diagramId - Provide the diagram id .
     *  @param { boolean} isExport - Provide the isExport .
     *  @param { boolean} isSelector - Provide the selector possobilities .
     *  @param { SVGSVGElement} parentSvg - Provide the parent svg element .
     *  @param { Object} ariaLabel - Provide the Arial label attributes .
     *  @param { boolean} isCircularHandle - Provide the boolean attribute for the circular handle .
     *  @param { number} enableSelector - Provide the selector possobilities .
     *  @param { any } renderer - Provide the renderer value .
     *  @param { any } element - Provide the element value .
     *  @private
     */
    drawRectangle(canvas: HTMLCanvasElement, options: RectAttributes, diagramId: string, isExport: boolean, isSelector?: boolean, parentSvg?: SVGSVGElement, ariaLabel?: Object, isCircularHandle?: boolean, enableSelector?: number, renderer?: any, element?: any): void;
    /**
     * Draw the path element for the diagram\
     *
     *  @returns {void}  Draw the path element for the diagram .\
     *
     *  @param { SVGElement} canvas - Provide the SVG element .
     *  @param { PathAttributes} options - Provide the path element attributes .
     *  @param {string} diagramId - Provide the diagram id .
     *  @param {boolean} isSelector - Provide selector boolean value .
     *  @param {SVGSVGElement} parentSvg - Provide the parent SVG element .
     *  @param {Object} ariaLabel - Provide arial label value .
     *  @param {number} scale - Provide the scale value .
     *  @param {any} renderer - Provide the renderer value .
     *  @param {PathElement} element - Provide the path element value .
     *  @private
     */
    drawPath(canvas: HTMLCanvasElement, options: PathAttributes, diagramId?: string, isSelector?: boolean, parentSvg?: SVGSVGElement, ariaLabel?: Object, scale?: number, renderer?: any, element?: PathElement): void;
    /**
     * Draw the path element for the diagram\
     *
     *  @returns {void}  Draw the path element for the diagram .\
     *
     *  @param { SVGElement} canvas - Provide the SVG element .
     *  @param {PathAttributes} options - Provide the path element attributes .
     *  @param {Object[]} collection - Provide the parent SVG element .
     *  @private
     */
    renderPath(canvas: HTMLCanvasElement, options: PathAttributes, collection: Object[]): void;
    /**
     * Draw the text element for the diagram\
     *
     *  @returns {void}  Draw the text element for the diagram .\
     *
     *  @param { SVGElement} canvas - Provide the SVG element .
     *  @param {TextAttributes} options - Provide the text element attributes .
     *  @param {SVGSVGElement} parentSvg - Provide the parent SVG element .
     *  @param {Object} ariaLabel - Provide the label properties .
     *  @param {string} diagramId - Provide the diagram id .
     *  @param {number} scaleValue - Provide the scale value .
     *  @param {any} renderer - Provide the renderer value .
     *  @param {element} element - Provide the text element value.
     *  @private
     */
    drawText(canvas: HTMLCanvasElement, options: TextAttributes, parentSvg?: SVGSVGElement, ariaLabel?: Object, diagramId?: string, scaleValue?: number, renderer?: any, element?: TextElement): void;
    private applyFlipAndRotate;
    private setElementTransform;
    private loadImage;
    /**
     * Draw the image element for the diagram\
     *
     *  @returns {void} Draw the image element for the diagram .
     *  @param { SVGElement | HTMLCanvasElement} canvas - Provide the SVG element .
     *  @param {ImageAttributes} obj - Provide the image attributes .
     *  @param {SVGSVGElement} parentSvg - Provide the parent SVG element .
     *  @param {boolean} fromPalette - Provide the pointer event value .
     *  @param {any} renderer - provide renderer value
     *  @param {ImageElement} element - provide image element
     *  @private
     */
    drawImage(canvas: HTMLCanvasElement, obj: ImageAttributes, parentSvg?: SVGSVGElement, fromPalette?: boolean, renderer?: any, element?: ImageElement): void;
    private image;
    private getSliceOffset;
    private getMeetOffset;
    private m;
    private r;
    private a;
    /**
     * Draw the SVG label.\
     *
     * @returns {PointModel} Draw the SVG label .
     *  @param {TextAttributes} text - Provide the canvas element .
     *  @param {Object} wrapBounds - Provide the canvas element .
     *  @param {SubTextElement []} childNodes - Provide the canvas element .
     * @private
     */
    labelAlign(text: TextAttributes, wrapBounds: TextBounds, childNodes: SubTextElement[]): PointModel;
}
