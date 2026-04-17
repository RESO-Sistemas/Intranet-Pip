import { PointModel } from './../primitives/point-model';
import { ImageAttributes } from './canvas-interface';
import { RectAttributes, PathAttributes, TextAttributes, SubTextElement, TextBounds, ImageEntry } from './canvas-interface';
import { DrawingElement } from '../core/elements/drawing-element';
import { DrawingRenderer } from './renderer';
/**
 * Canvas Renderer
 */
/** @private */
export declare class CanvasRenderer {
    /** @private */
    imageList: Record<string, ImageEntry[]>;
    private rectWidth;
    /**   @private  */
    static getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D;
    private setStyle;
    private setStyleFreetextEJ2;
    private rotateContext;
    private setFontStyle;
    /**   @private  */
    parseDashArray(dashArray: string): number[];
    /**   @private  */
    drawRectangle(canvas: HTMLCanvasElement, options: RectAttributes): void;
    /**   @private  */
    drawRectangleFreetextEJ2(canvas: HTMLCanvasElement, options: RectAttributes): void;
    /**   @private  */
    drawPath(canvas: HTMLCanvasElement, options: PathAttributes): void;
    /**   @private  */
    renderPath(canvas: HTMLCanvasElement, options: PathAttributes, collection: Object[]): void;
    /**   @private  */
    drawTextFreetextEJ2(canvas: HTMLCanvasElement, options: TextAttributes, isFreeTextAnnotation: boolean, rectHeight: number): void;
    /**   @private  */
    drawTextEJ2(canvas: HTMLCanvasElement, options: TextAttributes, isStampAnnotation?: boolean): void;
    /**@private*/
    drawFreeTextBlazor(canvas: HTMLCanvasElement, options: TextAttributes, maxHeight: number, isFreeTextAnnotation: boolean, zoomFactor: number): void;
    /**@private*/
    drawText(canvas: HTMLCanvasElement, options: TextAttributes, maxHeight: number, isFreeTextAnnotation: boolean, zoomFactor: number): void;
    /** @private  */
    drawTextBlazor(canvas: HTMLCanvasElement, options: TextAttributes, maxHeight: number, isFreeTextAnnotation: boolean, zoomFactor: number): void;
    private drawLine;
    private m;
    private r;
    private a;
    private getMeetOffset;
    private getSliceOffset;
    private image;
    private isExistingImage;
    private updateImageList;
    private updateCanvasList;
    private loadImage;
    /**   @private  */
    drawImage(canvas: HTMLCanvasElement, obj: ImageAttributes, parentSvg?: SVGSVGElement, fromPalette?: boolean, annotationCallback?: (annotationID: string) => boolean, annotationType?: string): void;
    /**   @private  */
    labelAlign(text: TextAttributes, wrapBounds: TextBounds, childNodes: SubTextElement[], lineHeight: number): PointModel;
}
export declare function refreshDiagramElements(canvas: HTMLCanvasElement, drawingObjects: DrawingElement[], renderer: DrawingRenderer, annotationCallback?: (annotationID: string) => boolean, annotationType?: string): void;
