import { ParsingContext } from './visio-import-export';
import { VisioShape } from './visio-models';
import { VisioShapeNode, OneOrMany } from './visio-types';
/**
 * Parses Visio shape elements into EJ2 diagram shapes.
 * Iterates through shape nodes, delegates parsing to `parserVisioShapeNode`,
 * and collects the resulting VisioShape objects.
 *
 * @param {object} shapeObj - Input object containing shape nodes
 * @param {OneOrMany<VisioShapeNode>} [shapeObj.Shape] - Shape node(s) to parse
 * @param {ParsingContext} context - Parsing context with master index
 * @returns {VisioShape[]} Array of parsed VisioShape objects
 */
export declare function parserVisioShape(shapeObj: {
    Shape?: OneOrMany<VisioShapeNode>;
}, context: ParsingContext): VisioShape[];
