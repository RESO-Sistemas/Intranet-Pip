import { Size } from '../../primitives/size';
import { DiagramElement } from './diagram-element';
import { Stretch } from '../../enum/enum';
import { PointModel } from '../../primitives/point-model';
/**
 * NativeElement defines the basic native elements
 */
export declare class DiagramNativeElement extends DiagramElement {
    /**
     *  set the id for each element \
     *
     * @returns { void } set the id for each element.\
     * @param {string} nodeId - provide the id value.
     * @param {string} diagramId - provide the id value.
     * @param {string} nodeTemplate - provide the string value.
     *
     * @private
     */
    constructor(nodeId: string, diagramId: string, nodeTemplate?: string);
    private data;
    /**
     * set the node id
     */
    nodeId: string;
    /**
     * set the diagram id
     */
    diagramId: string;
    /**
     *  get the id for each element \
     *
     * @returns { string | SVGElement } get the id for each element.\
     *
     * @private
     */
    /**
    *  sets the geometry of the native element \
    *
    * @returns { void } sets the geometry of the native element.\
    * @param {string | SVGElement | Function} value - provide the data value.
    *
    * @private
    */
    content: string | SVGElement | Function;
    /**
     * getNodeTemplate method \
     *
     * @returns { Function } getNodeTemplate method .\
     *
     * @private
     */
    getNodeTemplate(): Function;
    private templateFn;
    /**
     * check whether it is native element or not
     *
     * @private
     */
    isTemplate: boolean;
    /**
     * defines geometry of the native element
     *
     * @private
     */
    template: SVGElement;
    /**
     * sets scaling factor of the Native Element
     */
    scale: Stretch;
    /**
     * Saves the actual size of the Native Element
     *
     * @private
     */
    contentSize: Size;
    /**
     * Specifies whether the getcontent has to be executed or not.
     */
    private canReset;
    /**
     * Saves the top left point of the Native Element
     *
     * @private
     */
    templatePosition: PointModel;
    /**
     *Measures minimum space that is required to render the Native Element \
     *
     * @returns { Size }Measures minimum space that is required to render the Native Element.\
     * @param {Size} availableSize - provide the id value.
     *
     * @private
     */
    measure(availableSize: Size): Size;
    /**
     *Arranges the Native Element \
     *
     * @returns { Size }Arranges the Native Element.\
     * @param {Size} desiredSize - provide the id value.
     *
     * @private
     */
    arrange(desiredSize: Size): Size;
}
