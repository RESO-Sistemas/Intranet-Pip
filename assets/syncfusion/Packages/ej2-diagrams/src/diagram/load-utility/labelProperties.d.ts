import { HorizontalAlignment, TextAlign, TextDecoration, VerticalAlignment } from '../enum/enum';
import { AnnotationModel, ShapeAnnotationModel } from '../objects/annotation-model';
import { ConnectorModel } from '../objects/connector-model';
import { NodeModel } from '../objects/node-model';
import { Ej1Serialization } from './modelProperties';
export declare class LabelProperties {
    private diagram;
    private modelProperties;
    constructor(modelProperties: Ej1Serialization);
    setLabelProperties(oldLabels: AnnotationModel[], item: NodeModel | ConnectorModel): ShapeAnnotationModel[];
    private setLabelAppearance;
    setLabelConstraints(constraints: number): number;
    /**
     * Get module name.
     * @returns {string} returns Module name
     */
    protected getModuleName(): string;
}
export interface labels extends AnnotationModel {
    name: string;
    fillColor: string;
    fontFamily: string;
    fontSize: number;
    italic: boolean;
    bold: boolean;
    borderColor: string;
    borderWidth: number;
    opacity: number;
    visible: boolean;
    horizontalAlignment: HorizontalAlignment;
    verticalAlignment: VerticalAlignment;
    textAlign: TextAlign;
    textDecoration: TextDecoration;
    text: string;
    readOnly: number;
    fontColor: string;
    offset: {
        x: number;
        y: number;
    };
    textOverflow: boolean;
    overflowType: EJ1TextOverflow;
    wrapping: EJ1TextWrap;
}
export declare type EJ1TextWrap = 
/** wrap - Wraps the text and breaks the word, if necessary */
'wrap' | 
/** nowrap - Text will no be wrapped */
'nowrap' | 
/** wrapwithoverflow - Wraps the text so that no word is broken */
'wrapwithoverflow';
export declare type EJ1TextOverflow = 
/** ellipsis - It truncates the overflown text and represents the clipping with an ellipsis */
'ellipsis' | 
/** clip - It clips the overflow text */
'clip';
