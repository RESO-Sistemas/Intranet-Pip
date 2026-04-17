var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Node } from '../objects/node';
import { Connector, BezierSegment, StraightSegment } from '../objects/connector';
import { Point } from '../primitives/point';
import { BpmnSubEvent } from '../objects/node';
import { PathPort, PointPort } from '../objects/port';
import { rotatePoint, cloneObject, randomId, getBounds } from '../utility/base-util';
import { Rect } from '../primitives/rect';
import { getFreeHandPath, getPolygonPath } from '../utility/path-util';
import { canOutConnect, canInConnect, canAllowDrop, canPortInConnect, canPortOutConnect } from '../utility/constraints-util';
import { transformPointByMatrix, rotateMatrix, identityMatrix } from '../primitives/matrix';
import { NodeConstraints, DiagramEvent, PortConstraints, DiagramConstraints, DiagramAction, FlipDirection } from './../enum/enum';
import { TextElement } from '../core/elements/text-element';
import { PathElement } from '../core/elements/path-element';
import { contains } from './actions';
import { Selector } from '../objects/node';
import { getInOutConnectPorts, cloneBlazorObject, checkPort } from '../utility/diagram-util';
import { initializeCSPTemplate, isBlazor } from '@syncfusion/ej2-base';
import { findAngle } from '../utility/connector';
import { updateLaneBoundsWithSelector } from './container-interaction';
/**
 * Defines the interactive tools
 */
var ToolBase = /** @class */ (function () {
    /**
     * Initializes the tool
     *
     * @param {CommandHandler} command Command that is corresponding to the current action
     * @param protectChange
     */
    function ToolBase(command, protectChange) {
        if (protectChange === void 0) { protectChange = false; }
        /**
         * Command that is corresponding to the current action
         */
        this.commandHandler = null;
        // protected deepDiffer: DeepDiffMapper = new DeepDiffMapper();
        /**
         * Sets/Gets whether the interaction is being done
         */
        this.inAction = false;
        /**
         * Sets/Gets the protect change
         */
        this.isProtectChange = false;
        /**
         * Sets/Gets the current element that is under mouse
         */
        this.currentElement = null;
        /**   @private  */
        this.blocked = false;
        this.isTooltipVisible = false;
        /** @private */
        this.childTable = {};
        /**
         * Sets/Gets the previous object when mouse down
         */
        this.undoElement = { nodes: [], connectors: [] };
        this.checkProperty = true;
        this.undoParentElement = { nodes: [], connectors: [] };
        this.undoContainerElement = { nodes: [], connectors: [] };
        this.undoTextAnnotationElement = { nodes: [] };
        this.toolName = 'ToolBase';
        this.commandHandler = command;
        this.isProtectChange = protectChange;
    }
    ToolBase.prototype.startAction = function (currentElement) {
        this.currentElement = currentElement;
        this.inAction = true;
    };
    /**
     * @param args
     * @private
     */
    ToolBase.prototype.mouseDown = function (args) {
        this.currentElement = args.source;
        this.startPosition = this.currentPosition = this.prevPosition = args.position;
        this.isTooltipVisible = true;
        this.startAction(args.source);
        this.checkProperty = true;
        // Bug fix - EJ2-44495 -Node does not gets selected on slight movement of mouse when drag constraints disabled for node
        this.mouseDownElement = args.source;
    };
    ToolBase.prototype.checkPropertyValue = function () {
        if (this.checkProperty) {
            this.commandHandler.startTransaction(this.isProtectChange);
        }
    };
    /**
     * @param args
     * @private
     */
    ToolBase.prototype.mouseMove = function (args) {
        this.currentPosition = args.position;
        if (this.inAction) {
            this.commandHandler.startTransaction(this.isProtectChange);
            this.checkProperty = false;
        }
        //this.currentElement = currentElement;
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    ToolBase.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        this.currentPosition = args.position;
        // this.currentElement = currentElement;
        this.isTooltipVisible = false;
        this.commandHandler.endTransaction(this.isProtectChange);
        this.endAction();
        // Bug fix - EJ2-44495 -Node does not gets selected on slight movement of mouse when drag constraints disabled for node
        this.mouseDownElement = null;
    };
    ToolBase.prototype.endAction = function () {
        if (!this.isTooltipVisible) {
            this.commandHandler.closeTooltip();
        }
        this.commandHandler = null;
        this.currentElement = null;
        this.currentPosition = null;
        this.inAction = false;
        this.blocked = false;
    };
    /**
     * @param args
     * @private
     */
    ToolBase.prototype.mouseWheel = function (args) {
        this.currentPosition = args.position;
    };
    /**
     * @param args
     * @private
     */
    ToolBase.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    ToolBase.prototype.updateSize = function (shape, startPoint, endPoint, corner, initialBounds, angle) {
        shape = this.commandHandler.renderContainerHelper(shape) || shape;
        var horizontalsnap = { snapped: false, offset: 0, left: false, right: false };
        var verticalsnap = { snapped: false, offset: 0, top: false, bottom: false };
        var difx = this.currentPosition.x - this.startPosition.x;
        var dify = this.currentPosition.y - this.startPosition.y;
        var snapEnabled = (!(shape instanceof TextElement)) && this.commandHandler.snappingModule
            && this.commandHandler.snappingModule.canSnap();
        var snapLine = snapEnabled ? this.commandHandler.snappingModule.getLayer() : null;
        var rotateAngle = (shape instanceof TextElement) ? angle : shape.rotateAngle;
        var matrix;
        matrix = identityMatrix();
        rotateMatrix(matrix, -rotateAngle, 0, 0);
        var x = shape.offsetX;
        var y = shape.offsetY;
        var w = shape.width;
        var h = shape.height;
        x = x - w * shape.pivot.x;
        y = y - h * shape.pivot.y;
        var deltaWidth = 0;
        var deltaHeight = 0;
        var diff;
        var width = (shape instanceof TextElement) ? shape.actualSize.width : shape.width;
        var height = (shape instanceof TextElement) ? shape.actualSize.height : shape.height;
        switch (corner) {
            case 'ResizeWest':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                deltaHeight = 1;
                difx = snapEnabled ? this.commandHandler.snappingModule.snapLeft(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) :
                    difx;
                dify = 0;
                deltaWidth = (initialBounds.width - difx) / width;
                break;
            case 'ResizeEast':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                difx = snapEnabled ? this.commandHandler.snappingModule.snapRight(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) :
                    difx;
                dify = 0;
                deltaWidth = (initialBounds.width + difx) / width;
                deltaHeight = 1;
                break;
            case 'ResizeNorth':
                deltaWidth = 1;
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                dify = snapEnabled ? this.commandHandler.snappingModule.snapTop(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) :
                    dify;
                deltaHeight = (initialBounds.height - dify) / height;
                break;
            case 'ResizeSouth':
                deltaWidth = 1;
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                dify = snapEnabled ? this.commandHandler.snappingModule.snapBottom(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) :
                    dify;
                deltaHeight = (initialBounds.height + dify) / height;
                break;
            case 'ResizeNorthEast':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                difx = snapEnabled ? this.commandHandler.snappingModule.snapRight(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) :
                    difx;
                dify = snapEnabled ? this.commandHandler.snappingModule.snapTop(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) :
                    dify;
                deltaWidth = (initialBounds.width + difx) / width;
                deltaHeight = (initialBounds.height - dify) / height;
                break;
            case 'ResizeNorthWest':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                dify = !snapEnabled ? dify : this.commandHandler.snappingModule.snapTop(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds);
                difx = !snapEnabled ? difx : this.commandHandler.snappingModule.snapLeft(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds);
                deltaWidth = (initialBounds.width - difx) / width;
                deltaHeight = (initialBounds.height - dify) / height;
                break;
            case 'ResizeSouthEast':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                dify = !snapEnabled ? dify : this.commandHandler.snappingModule.snapBottom(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds);
                difx = !snapEnabled ? difx : this.commandHandler.snappingModule.snapRight(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds);
                deltaHeight = (initialBounds.height + dify) / height;
                deltaWidth = (initialBounds.width + difx) / width;
                break;
            case 'ResizeSouthWest':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                dify = snapEnabled ? this.commandHandler.snappingModule.snapBottom(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) : dify;
                difx = snapEnabled ? this.commandHandler.snappingModule.snapLeft(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) : difx;
                deltaWidth = (initialBounds.width - difx) / width;
                deltaHeight = (initialBounds.height + dify) / height;
                break;
        }
        return { width: deltaWidth, height: deltaHeight };
    };
    ToolBase.prototype.getPivot = function (corner) {
        switch (corner) {
            case 'ResizeWest':
                return { x: 1, y: 0.5 };
            case 'ResizeEast':
                return { x: 0, y: 0.5 };
            case 'ResizeNorth':
                return { x: 0.5, y: 1 };
            case 'ResizeSouth':
                return { x: 0.5, y: 0 };
            case 'ResizeNorthEast':
                return { x: 0, y: 1 };
            case 'ResizeNorthWest':
                return { x: 1, y: 1 };
            case 'ResizeSouthEast':
                return { x: 0, y: 0 };
            case 'ResizeSouthWest':
                return { x: 1, y: 0 };
        }
        return { x: 0.5, y: 0.5 };
    };
    //method to get node shape name
    ToolBase.prototype.getShapeType = function () {
        var shape;
        // eslint-disable-next-line no-constant-condition
        if (this.commandHandler.diagram.drawingObject.shape.type === 'Image' ||
            this.commandHandler.diagram.drawingObject.shape.type === 'HTML' ||
            this.commandHandler.diagram.drawingObject.shape.type === 'Native' ||
            this.commandHandler.diagram.drawingObject.shape.type === 'Path') {
            shape = this.commandHandler.diagram.drawingObject.shape.type;
        }
        else {
            shape = this.commandHandler.diagram.drawingObject.shape.shape;
        }
        return shape;
    };
    //EJ2-52203-Method to trigger ElementDraw Event when we draw node or connector with the drawing Tool
    ToolBase.prototype.triggerElementDrawEvent = function (source, state, objectType, elementType, isMouseDownAction) {
        var arg = {
            source: source, state: state, objectType: objectType, cancel: false, elementType: elementType
        };
        this.commandHandler.triggerEvent(DiagramEvent.elementDraw, arg);
        if (isMouseDownAction && arg.cancel) {
            {
                this.commandHandler.diagram.resetTool();
                this.inAction = false;
            }
        }
    };
    return ToolBase;
}());
export { ToolBase };
/**
 * Helps to select the objects
 */
var SelectTool = /** @class */ (function (_super) {
    __extends(SelectTool, _super);
    function SelectTool(commandHandler, protectChange, action) {
        var _this = _super.call(this, commandHandler, true) || this;
        _this.action = action;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    SelectTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        _super.prototype.mouseDown.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    SelectTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        //draw selected region
        if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
            var rect = Rect.toBounds([this.prevPosition, this.currentPosition]);
            this.commandHandler.clearSelectedItems();
            this.commandHandler.drawSelectionRectangle(rect.x, rect.y, rect.width, rect.height);
        }
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    SelectTool.prototype.mouseUp = function (args, button) {
        this.checkPropertyValue();
        //rubber band selection
        if (!this.commandHandler.isUserHandle(this.currentPosition)) {
            if (Point.equals(this.currentPosition, this.prevPosition) === false && this.inAction) {
                var region = Rect.toBounds([this.prevPosition, this.currentPosition]);
                this.commandHandler.doRubberBandSelection(region);
            }
            else {
                //single selection
                var arrayNodes = this.commandHandler.getSelectedObject();
                if (!this.commandHandler.hasSelection() || !args.info || !args.info.ctrlKey) {
                    // 948882: Improper Selection Behavior When Node Drag Constraint is Disabled
                    if (button !== 2 || !arrayNodes.some(function (obj) { return obj === args.source; })) {
                        this.commandHandler.clearSelection(args.source === null ? true : false);
                        if (this.action === 'LabelSelect') {
                            this.commandHandler.labelSelect(args.source, args.sourceWrapper, arrayNodes);
                        }
                        else if (args.source) {
                            this.commandHandler.selectObjects([args.source], false, arrayNodes);
                        }
                    }
                }
                else {
                    //handling multiple selection
                    if (args && args.source) {
                        if (!this.commandHandler.isSelected(args.source)) {
                            this.commandHandler.selectObjects([args.source], true);
                        }
                        else {
                            if (args.clickCount === 1) {
                                this.commandHandler.unSelect(args.source);
                                // this.commandHandler.updateBlazorSelector();
                            }
                        }
                    }
                }
            }
        }
        this.inAction = false;
        _super.prototype.mouseUp.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    SelectTool.prototype.mouseLeave = function (args) {
        if (this.inAction) {
            this.mouseUp(args);
        }
    };
    return SelectTool;
}(ToolBase));
export { SelectTool };
var FixedUserHandleTool = /** @class */ (function (_super) {
    __extends(FixedUserHandleTool, _super);
    function FixedUserHandleTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param args
     * @private
     */
    FixedUserHandleTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        this.inAction = false;
        var val = args.source;
        var fixedUserHandle;
        var iconId = args.sourceWrapper.id;
        for (var i = 0; i < val.fixedUserHandles.length; i++) {
            if (iconId.indexOf(val.fixedUserHandles[parseInt(i.toString(), 10)].id) > -1) {
                fixedUserHandle = val.fixedUserHandles[parseInt(i.toString(), 10)];
            }
        }
        var arg = {
            fixedUserHandle: fixedUserHandle,
            element: args.source
        };
        var trigger = DiagramEvent.fixedUserHandleClick;
        this.commandHandler.triggerEvent(trigger, arg);
        _super.prototype.mouseUp.call(this, args);
    };
    return FixedUserHandleTool;
}(ToolBase));
export { FixedUserHandleTool };
/**
 * Helps to edit the selected connectors
 */
var ConnectTool = /** @class */ (function (_super) {
    __extends(ConnectTool, _super);
    function ConnectTool(commandHandler, endPoint) {
        var _this = _super.call(this, commandHandler, true) || this;
        _this.isConnected = false;
        /**   @private  */
        _this.isConnectionChangeStarted = false;
        /** @private - tracks whether the connector endpoint actually moved during the change */
        _this.connectionChangeMoved = false;
        _this.endPoint = endPoint;
        _this.toolName = 'ConnectTool';
        return _this;
    }
    /**
     * @param args
     * @private
     */
    ConnectTool.prototype.mouseDown = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var oldValue, connectors, i, segment, segmentpoint1, segmentpoint2;
            return __generator(this, function (_a) {
                this.inAction = true;
                this.undoElement = undefined;
                if (!(this instanceof ConnectorDrawingTool)) {
                    this.undoElement = cloneObject(args.source);
                }
                _super.prototype.mouseDown.call(this, args);
                if (args.source && args.source.connectors) {
                    oldValue = { x: this.prevPosition.x, y: this.prevPosition.y };
                    connectors = args.source.connectors[0];
                    this.oldConnector = cloneObject(connectors);
                }
                // Sets the selected segment
                if (this.endPoint === 'BezierSourceThumb' || this.endPoint === 'BezierTargetThumb') {
                    for (i = 0; i < connectors.segments.length; i++) {
                        segment = connectors.segments[parseInt(i.toString(), 10)];
                        segmentpoint1 = !Point.isEmptyPoint(segment.point1) ? segment.point1 : segment.bezierPoint1;
                        segmentpoint2 = !Point.isEmptyPoint(segment.point2) ? segment.point2 : segment.bezierPoint2;
                        //(EJ2-70650)-Unable to drag bezier control thumb, when we increase handleSize value
                        //Added below code for drag the bezier control thumb while increasing handle size(For hitPadding)
                        if (this.currentElement.handleSize !== connectors.hitPadding) {
                            connectors.hitPadding = this.currentElement.handleSize;
                        }
                        if (contains(this.currentPosition, segmentpoint1, connectors.hitPadding) ||
                            contains(this.currentPosition, segmentpoint2, connectors.hitPadding)) {
                            this.selectedSegment = segment;
                        }
                    }
                }
                this.currentPosition = args.position;
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param args
     * @private
     */
    ConnectTool.prototype.mouseUp = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var isConnectorDrawingTool, noConnector, connector, nodeEndId, portEndId, arg, oldValues, newValues, connector, targetPortName, targetNodeNode, target, arg, obj, entry, trigger, obj, entry, connector;
            return __generator(this, function (_a) {
                isConnectorDrawingTool = this.toolName === 'ConnectorDrawingTool';
                noConnector = !args || !args.source || !args.source.connectors || !args.source.connectors.length;
                if ((isConnectorDrawingTool || noConnector) && this.inAction) {
                    this.checkPropertyValue();
                    this.commandHandler.updateSelector();
                    this.commandHandler.removeSnap();
                    ToolBase.prototype.mouseUp(args); // call grandparent
                    return [2 /*return*/];
                }
                if (!isBlazor() && this.isConnected && args.source && args.source.connectors) {
                    connector = args.source.connectors[0];
                    nodeEndId = this.endPoint === 'ConnectorSourceEnd' ? 'sourceID' : 'targetID';
                    portEndId = this.endPoint === 'ConnectorSourceEnd' ? 'sourcePortID' : 'targetPortID';
                    arg = {
                        connector: cloneBlazorObject(connector),
                        oldValue: { nodeId: this.oldConnector["" + nodeEndId], portId: this.oldConnector["" + portEndId] },
                        newValue: { nodeId: connector["" + nodeEndId], portId: connector["" + portEndId] }, cancel: false,
                        state: 'Changed', connectorEnd: this.endPoint
                    };
                    //875655- ConnectionChange Event not triggered in Changed state for port change in same node
                    if (connector["" + nodeEndId] !== this.oldConnector["" + nodeEndId] || connector["" + portEndId] !== this.oldConnector["" + portEndId]) {
                        this.commandHandler.triggerEvent(DiagramEvent.connectionChange, arg);
                        this.isConnected = false;
                    }
                }
                this.checkPropertyValue();
                this.commandHandler.updateSelector();
                this.commandHandler.removeSnap();
                //1010806: Incorrect state Values in sourcePointChange and targetPointChange Events
                if ((args.source && args.source.connectors && (!(this instanceof ConnectorDrawingTool)) && ((this.endPoint === 'ConnectorSourceEnd' &&
                    args.source.connectors.length &&
                    ((!Point.equals(args.source.connectors[0].sourcePoint, this.undoElement.connectors[0].sourcePoint) ||
                        (args.source.connectors[0].sourceID !== this.undoElement.connectors[0].sourceID)))) ||
                    (this.endPoint === 'ConnectorTargetEnd' &&
                        ((!Point.equals(args.source.connectors[0].targetPoint, this.undoElement.connectors[0].targetPoint))
                            || (args.source.connectors[0].targetID !== this.undoElement.connectors[0].targetID))))) ||
                    (this.isConnectionChangeStarted && this.connectionChangeMoved && args.source && args.source.connectors)) {
                    oldValues = void 0;
                    newValues = void 0;
                    connector = void 0;
                    if (args.source && args.source.connectors && this.endPoint === 'ConnectorSourceEnd') {
                        //941055: The sourcePointChange event's old and new values are the same
                        oldValues = { x: this.oldConnector.sourcePoint.x, y: this.oldConnector.sourcePoint.y };
                        connector = args.source.connectors[0];
                        newValues = { x: connector.sourcePoint.x, y: connector.sourcePoint.y };
                    }
                    else if (args.source && args.source.connectors && this.endPoint === 'ConnectorTargetEnd') {
                        oldValues = { x: this.oldConnector.targetPoint.x, y: this.oldConnector.targetPoint.y };
                        connector = args.source.connectors[0];
                        newValues = { x: connector.targetPoint.x, y: connector.targetPoint.y };
                    }
                    targetPortName = void 0;
                    targetNodeNode = void 0;
                    if (args.target) {
                        target = this.commandHandler.findTarget(args.targetWrapper, args.target, this.endPoint === 'ConnectorSourceEnd', true);
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        targetNodeNode = target.id;
                        if (target instanceof PointPort) {
                            //941055: The target node is undefined while connected to the port
                            targetPortName = target.id;
                            targetNodeNode = args.target.id;
                        }
                    }
                    // 947614: Property Change does not log into history within connection change event completed state
                    if (this.commandHandler.diagram.diagramActions & DiagramAction.ToolAction) {
                        this.commandHandler.diagram.diagramActions &= ~DiagramAction.ToolAction;
                    }
                    arg = {
                        connector: connector, state: 'Completed', targetNode: targetNodeNode,
                        oldValue: oldValues, newValue: newValues, cancel: false, targetPort: targetPortName
                    };
                    if (this.undoElement && args.source) {
                        obj = void 0;
                        obj = cloneObject(args.source);
                        entry = {
                            type: 'ConnectionChanged', redoObject: cloneObject(obj), undoObject: cloneObject(this.undoElement),
                            category: 'Internal'
                        };
                        this.commandHandler.addHistoryEntry(entry);
                    }
                    trigger = this.endPoint === 'ConnectorSourceEnd' ? DiagramEvent.sourcePointChange : DiagramEvent.targetPointChange;
                    this.isConnectionChangeStarted = false;
                    this.commandHandler.triggerEvent(trigger, arg);
                    //this.commandHandler.removeTerminalSegment(connector as Connector, true);
                }
                else if (!(this instanceof ConnectorDrawingTool) &&
                    (this.endPoint === 'BezierTargetThumb' || this.endPoint === 'BezierSourceThumb')) {
                    if (this.undoElement && args.source) {
                        obj = cloneObject(args.source);
                        entry = {
                            type: 'SegmentChanged', redoObject: obj, undoObject: this.undoElement, category: 'Internal'
                        };
                        this.commandHandler.addHistoryEntry(entry);
                    }
                }
                // this.commandHandler.updateBlazorSelector();
                this.canCancel = undefined;
                this.tempArgs = undefined;
                //(EJ2-66201) - Exception occurs when mouse-hover on ports in node
                if (args.source && args.source.connectors) {
                    connector = args.source.connectors[0];
                    if (connector.isBezierEditing) {
                        connector.isBezierEditing = false;
                    }
                }
                _super.prototype.mouseUp.call(this, args);
                return [2 /*return*/];
            });
        });
    };
    /* tslint:disable */
    /**
     * @param args
     * @private
     */
    ConnectTool.prototype.mouseMove = function (args) {
        var _this = this;
        _super.prototype.mouseMove.call(this, args);
        var tempArgs;
        if (!this.isConnectionChangeStarted && !this.connectionChangeMoved && (!(this instanceof ConnectorDrawingTool)) &&
            ((this.endPoint === 'ConnectorSourceEnd' &&
                Point.equals(args.source.connectors[0].sourcePoint, this.undoElement.connectors[0].sourcePoint)) ||
                (this.endPoint === 'ConnectorTargetEnd' &&
                    Point.equals(args.source.connectors[0].targetPoint, this.undoElement.connectors[0].targetPoint)))) {
            var oldValue = void 0;
            var connectors = void 0;
            if (args.source && args.source.connectors) {
                oldValue = { x: this.prevPosition.x, y: this.prevPosition.y };
                connectors = args.source.connectors[0];
            }
            var targetPort = void 0;
            var targetNode = void 0;
            if (args.target) {
                targetNode = args.target.id;
                var target = this.commandHandler.findTarget(args.targetWrapper, args.target, this.endPoint === 'ConnectorSourceEnd', true);
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                (target instanceof PointPort || target instanceof BpmnSubEvent) ? targetPort = target.id : targetNode = target.id;
            }
            this.isConnectionChangeStarted = true;
            var arg = {
                connector: connectors, state: 'Start', targetNode: targetNode,
                oldValue: oldValue, newValue: oldValue, cancel: false, targetPort: targetPort
            };
            var trigger = this.endPoint === 'ConnectorSourceEnd' ?
                DiagramEvent.sourcePointChange : DiagramEvent.targetPointChange;
            this.commandHandler.triggerEvent(trigger, arg);
        }
        this.currentPosition = args.position;
        if (this.currentPosition && this.prevPosition) {
            var diffX = this.currentPosition.x - this.prevPosition.x;
            var diffY = this.currentPosition.y - this.prevPosition.y;
            var newValue = void 0;
            var oldValue = void 0;
            var inPort = void 0;
            var outPort = void 0;
            this.currentPosition = this.commandHandler.snapConnectorEnd(this.currentPosition);
            var connector = void 0;
            if (args.source && args.source.connectors) {
                newValue = { x: this.currentPosition.x, y: this.currentPosition.y };
                oldValue = { x: this.prevPosition.x, y: this.prevPosition.y };
                connector = args.source.connectors[0];
            }
            var targetPortId = void 0;
            var targetNodeId = void 0;
            var target = void 0;
            if (args.target) {
                target = this.commandHandler.findTarget(args.targetWrapper, args.target, this.endPoint === 'ConnectorSourceEnd', true);
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                (target instanceof PointPort || target instanceof PathPort) ? targetPortId = target.id : targetNodeId = target.id;
            }
            var arg = {
                connector: connector, state: 'Progress', targetNode: targetNodeId,
                oldValue: oldValue, newValue: newValue, cancel: false, targetPort: targetPortId
            };
            if (!(this instanceof ConnectorDrawingTool)) {
                var trigger = this.endPoint === 'ConnectorSourceEnd' ?
                    DiagramEvent.sourcePointChange : DiagramEvent.targetPointChange;
                this.commandHandler.triggerEvent(trigger, arg);
                this.connectionChangeMoved = true;
            }
            if (args.target) {
                inPort = getInOutConnectPorts(args.target, true);
                outPort = getInOutConnectPorts(args.target, false);
            }
            if (!arg.cancel && this.inAction && this.endPoint !== undefined && (diffX !== 0 || diffY !== 0)) {
                if (this.endPoint === 'ConnectorSourceEnd' && connector && connector.type === 'Orthogonal' && connector.segments && connector.segments.length > 0) {
                    var connectorSegment = connector.segments[0];
                    var direction_1 = connectorSegment.direction;
                    var tryDragConnector = function (targetPortId, targetNodeId, newPosition) {
                        _this.blocked = !_this.commandHandler.dragConnectorEnds(_this.endPoint, args.source, newPosition ? newPosition : _this.currentPosition, _this.selectedSegment, targetNodeId ? args.target : undefined, targetPortId);
                    };
                    var sourceChanged = connector.sourcePortID !== targetPortId || connector.sourceID !== targetNodeId;
                    // Case 1: Disconnect if dragging to empty space
                    if (sourceChanged && !targetNodeId && !targetPortId) {
                        if (this.commandHandler.canDisconnect(this.endPoint, args, targetPortId, targetNodeId)) {
                            tempArgs = this.commandHandler.disConnect(args.source, this.endPoint, this.canCancel);
                            this.isConnected = true;
                            tryDragConnector(targetPortId, targetNodeId);
                        }
                    }
                    // Case 2: Connect to a port
                    else if (targetPortId && connector.sourcePortID !== targetPortId) {
                        if (this.checkConnect(target, args)) {
                            tryDragConnector(targetPortId, args.target.id);
                            tempArgs = this.commandHandler.connect(this.endPoint, args, this.canCancel);
                            this.isConnected = true;
                        }
                    }
                    // Case 3: Connect to a node
                    else if (target instanceof Node) {
                        if (sourceChanged) {
                            if (this.commandHandler.canDisconnect(this.endPoint, args, targetPortId, targetNodeId)) {
                                tempArgs = this.commandHandler.disConnect(args.source, this.endPoint, this.canCancel);
                            }
                        }
                        if (canOutConnect(target)) {
                            var corners_1 = targetNodeId
                                ? this.commandHandler.diagram.nameTable["" + targetNodeId].wrapper.corners
                                : undefined;
                            var getNewPosition = function () {
                                if (!direction_1 || !corners_1) {
                                    return _this.currentPosition;
                                }
                                switch (direction_1) {
                                    case 'Bottom':
                                        return corners_1.bottomCenter;
                                    case 'Top':
                                        return corners_1.topCenter;
                                    case 'Left':
                                        return corners_1.middleLeft;
                                    case 'Right':
                                        return corners_1.middleRight;
                                    default:
                                        return _this.currentPosition;
                                }
                            };
                            tryDragConnector(undefined, args.target.id, getNewPosition());
                            tempArgs = this.commandHandler.connect(this.endPoint, args, this.canCancel);
                            this.isConnected = true;
                        }
                        else {
                            tryDragConnector(undefined, undefined);
                        }
                    }
                    // Case 4: Connect to connector port
                    else if (target instanceof PathPort) {
                        this.blocked = !this.commandHandler.dragConnectorEnds(this.endPoint, args.source, this.currentPosition, this.selectedSegment, args.target, targetPortId);
                        tempArgs = this.commandHandler.connect(this.endPoint, args, this.canCancel);
                    }
                }
                else {
                    // EJ2-65331 - The condition checks whether the cancel argument is true or false
                    if (!arg.cancel) {
                        this.blocked = !this.commandHandler.dragConnectorEnds(this.endPoint, args.source, this.currentPosition, this.selectedSegment, args.target, targetPortId);
                        this.commandHandler.updateSelector();
                    }
                    if (args.target && ((this.endPoint === 'ConnectorSourceEnd' && (canOutConnect(args.target) || canPortOutConnect(outPort)))
                        || (this.endPoint === 'ConnectorTargetEnd' && (canInConnect(args.target) || canPortInConnect(inPort))))) {
                        if (this.commandHandler.canDisconnect(this.endPoint, args, targetPortId, targetNodeId)) {
                            tempArgs = this.commandHandler.disConnect(args.source, this.endPoint, this.canCancel);
                            this.isConnected = true;
                        }
                        var target_1 = this.commandHandler.findTarget(args.targetWrapper, args.target, this.endPoint === 'ConnectorSourceEnd', true);
                        if (target_1 instanceof Node) {
                            if ((canInConnect(target_1) && this.endPoint === 'ConnectorTargetEnd')
                                || (canOutConnect(target_1) && this.endPoint === 'ConnectorSourceEnd')) {
                                tempArgs = this.commandHandler.connect(this.endPoint, args, this.canCancel);
                                this.isConnected = true;
                            }
                        }
                        else {
                            var isConnect = this.checkConnect(target_1, args);
                            if (isConnect) {
                                this.isConnected = true;
                                tempArgs = this.commandHandler.connect(this.endPoint, args, this.canCancel);
                            }
                        }
                    }
                    else if (this.endPoint.indexOf('Bezier') === -1) {
                        this.isConnected = true;
                        tempArgs = this.commandHandler.disConnect(args.source, this.endPoint, this.canCancel);
                        this.commandHandler.updateSelector();
                    }
                }
            }
            if (this.commandHandler.canEnableDefaultTooltip()) {
                var content_1 = this.getTooltipContent(args.position);
                var contentTemp = function () {
                    return content_1;
                };
                this.commandHandler.showTooltip(args.source, args.position, initializeCSPTemplate(contentTemp), 'ConnectTool', this.isTooltipVisible);
                this.isTooltipVisible = false;
            }
            else if (this.isTooltipVisible) {
                this.commandHandler.closeTooltip();
                this.isTooltipVisible = false;
            }
            if (tempArgs) {
                this.tempArgs = tempArgs;
            }
        }
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    ConnectTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    ConnectTool.prototype.getTooltipContent = function (position) {
        return 'X:' + Math.round(position.x) + ' ' + 'Y:' + Math.round(position.y);
    };
    ConnectTool.prototype.checkConnect = function (target, args) {
        if (canPortInConnect(target) && this.endPoint === 'ConnectorTargetEnd' && !this.isConnectionCyclic(args)) {
            return true;
        }
        else if (canPortOutConnect(target) && this.endPoint === 'ConnectorSourceEnd' && !this.isConnectionCyclic(args)) {
            return true;
        }
        else if (!(target.constraints & PortConstraints.None) && !canPortInConnect(target) && !canPortOutConnect(target)
            && (target.constraints === undefined || (target.constraints & (PortConstraints.Default & ~(PortConstraints.InConnect | PortConstraints.OutConnect))) > 0)) {
            return true;
        }
        return false;
    };
    //1005814: Exception occurs when dragging a port-hosted connector endpoint after connecting ports
    ConnectTool.prototype.isConnectionCyclic = function (args) {
        var selector = args.source;
        var diagram = this.commandHandler.diagram;
        if (!selector.connectors) {
            return false;
        }
        var sourceConnector = selector.connectors[0];
        var sourceConnectorId = sourceConnector.id;
        var targetConnectorId = args.target.id;
        // Combine source edges into single array
        var sourceConnectorEdges = this.getConnectorEdgeIds(sourceConnector);
        if (!sourceConnectorEdges.length) {
            return false;
        }
        // checks if source connects to any connector that eventually reaches target (complex cycle)
        if (this.checkDeepCycle(diagram, sourceConnectorEdges, targetConnectorId, sourceConnectorId)) {
            return true;
        }
        return false;
    };
    ConnectTool.prototype.checkDeepCycle = function (diagram, edgeIds, targetId, sourceId) {
        var visitedConnectorIds = new Set();
        var connectorQueue = [];
        // Initialize connectorQueue with direct edges
        for (var _i = 0, edgeIds_1 = edgeIds; _i < edgeIds_1.length; _i++) {
            var edgeId = edgeIds_1[_i];
            if (edgeId && !visitedConnectorIds.has(edgeId)) {
                connectorQueue.push(edgeId);
            }
        }
        // BFS-based cycle detection: checks if traveling from `edgeIds` can reach `targetId`.
        while (connectorQueue.length > 0) {
            var currentConnectorId = connectorQueue.shift();
            if (!currentConnectorId || visitedConnectorIds.has(currentConnectorId) || currentConnectorId === sourceId) {
                continue;
            }
            if (currentConnectorId === targetId) {
                return true;
            }
            visitedConnectorIds.add(currentConnectorId);
            var connector = diagram.nameTable["" + currentConnectorId];
            // Collect next level edges
            var connectorEdges = this.getConnectorEdgeIds(connector);
            for (var _a = 0, connectorEdges_1 = connectorEdges; _a < connectorEdges_1.length; _a++) {
                var edgeId = connectorEdges_1[_a];
                if (edgeId && !visitedConnectorIds.has(edgeId)) {
                    connectorQueue.push(edgeId);
                }
            }
        }
        return false;
    };
    ConnectTool.prototype.getConnectorEdgeIds = function (connector) {
        var inIds = Array.isArray(connector.inEdges) ? connector.inEdges : [];
        var outIds = Array.isArray(connector.outEdges) ? connector.outEdges : [];
        return inIds.concat(outIds);
    };
    /**   @private  */
    ConnectTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
        this.prevPosition = null;
        this.endPoint = null;
        this.connectionChangeMoved = false;
    };
    return ConnectTool;
}(ToolBase));
export { ConnectTool };
/**
 * Drags the selected objects
 */
var MoveTool = /** @class */ (function (_super) {
    __extends(MoveTool, _super);
    function MoveTool(commandHandler, objType) {
        var _this = _super.call(this, commandHandler, true) || this;
        /**   @private  */
        _this.currentTarget = null;
        _this.isStartAction = false;
        _this.canCancel = false;
        _this.canTrigger = false;
        _this.objectType = objType;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    MoveTool.prototype.mouseDown = function (args) {
        //1011408: AllowMovingOutsideLane causes node enlargement on Shift+Click multi-select then Shift+Drag in SwimLane - undo/redo
        var isSwimLaneChildMultiDrag = this.checkSwimLaneChildMultiDrag(args);
        if ((args.source instanceof Node || args.source instanceof Connector) && !isSwimLaneChildMultiDrag) {
            var arrayNodes = this.commandHandler.getSelectedObject();
            this.commandHandler.selectObjects([args.source], args.info && args.info.ctrlKey, arrayNodes);
            var selectedObject = { nodes: [], connectors: [] };
            if (args.source instanceof Node) {
                selectedObject.nodes.push(cloneObject(args.source));
            }
            else {
                selectedObject.connectors.push(cloneObject(args.source));
            }
            this.undoElement = cloneObject(selectedObject);
            //909582-History change event args old value is undefined upon node drag
            var wrapper = args.source.wrapper;
            this.undoElement.offsetX = wrapper.offsetX;
            this.undoElement.offsetY = wrapper.offsetY;
        }
        else if (isSwimLaneChildMultiDrag) {
            this.undoElement = cloneObject(this.commandHandler.diagram.selectedItems);
        }
        else {
            this.undoElement = cloneObject(args.source);
        }
        //951087-Undo function doesn't retain connector segments after node move actions.
        this.commandHandler.trackConnectorChange(this.undoElement);
        this.undoParentElement = this.commandHandler.getSubProcess(args.source);
        this.undoContainerElement = this.commandHandler.getContainer(args.source);
        if (this.objectType === 'Port') {
            this.portId = args.sourceWrapper.id;
        }
        this.commandHandler.insertBlazorConnector(args.source);
        _super.prototype.mouseDown.call(this, args);
        this.initialOffset = { x: 0, y: 0 };
    };
    /**
     * @param args
     */
    MoveTool.prototype.checkSwimLaneChildMultiDrag = function (args) {
        var isSwimLaneChildMultiDrag = false;
        if (args.source instanceof Node && args.info && args.info.ctrlKey === true && args.source.parentId) {
            var parentElement = this.commandHandler.diagram.nameTable["" + args.source.parentId];
            if (parentElement && parentElement.isLane && this.commandHandler.diagram.selectedItems.nodes.length > 1) {
                isSwimLaneChildMultiDrag = true;
            }
        }
        return isSwimLaneChildMultiDrag;
    };
    MoveTool.prototype.getPort = function (args) {
        var port;
        var sourceId = args.source.id;
        var sourcePorts = args.source.ports;
        for (var i = 0; i < sourcePorts.length; i++) {
            if (args.sourceWrapper.id === sourceId + '_' + sourcePorts[parseInt(i.toString(), 10)].id) {
                port = sourcePorts[parseInt(i.toString(), 10)];
                break;
            }
        }
        return port;
    };
    /* tslint:disable */
    /**
     * @param args
     * @param isPreventHistory
     * @param args
     * @param isPreventHistory
     * @private
     */
    MoveTool.prototype.mouseUp = function (args, isPreventHistory) {
        return __awaiter(this, void 0, void 0, function () {
            var oldValues, newValues, isEndGroupActionCalled, obj, historyAdded, object, redoObject, isSwimLaneChildMultiDrag, wrapper, isSubGroupSelection, currentSelection, i, isSelector, isSingleSelectedObject, isSameSize, isDifferentPosition, isDifferentSourcePoint, isDifferentTargetPoint, arg, canAddHistory, nameTable, i, _loop_1, this_1, _i, _a, connector, _b, _c, node, isNodePresent, currentNode, entry, entry_1, entry_2, snappedPoint, canSplit, i, i, arg, nodes, isEndGroup, temp, i, i, helper, entry, port, nodePorts, connPorts, i, i, arg;
            return __generator(this, function (_d) {
                isEndGroupActionCalled = false;
                this.checkPropertyValue();
                historyAdded = false;
                redoObject = { nodes: [], connectors: [] };
                if (this.objectType !== 'Port') {
                    isSwimLaneChildMultiDrag = this.checkSwimLaneChildMultiDrag(args);
                    if ((args.source instanceof Node || args.source instanceof Connector) && !isSwimLaneChildMultiDrag) {
                        if (args.source instanceof Node) {
                            redoObject.nodes.push(cloneObject(args.source));
                        }
                        else {
                            redoObject.connectors.push(cloneObject(args.source));
                        }
                        obj = cloneObject(redoObject);
                        wrapper = args.source.wrapper;
                        obj.offsetX = wrapper.offsetX;
                        obj.offsetY = wrapper.offsetY;
                    }
                    else if (isSwimLaneChildMultiDrag) {
                        obj = cloneObject(this.commandHandler.diagram.selectedItems);
                    }
                    else {
                        obj = cloneObject(args.source);
                    }
                    //951087-Undo funciton doesn't retain connector segments after node move actions.
                    this.commandHandler.trackConnectorChange(obj);
                    object = this.commandHandler.renderContainerHelper(args.source) || args.source || this.commandHandler.renderContainerHelper(args.source);
                    if ((object.id === 'helper') || (object.id !== 'helper')) {
                        isSubGroupSelection = false;
                        if (object instanceof Selector) {
                            currentSelection = cloneObject(object);
                            // check currentSelection.selectedObjects array contains same object of this.undoElement.selectedObjects array
                            if (currentSelection.selectedObjects.length === this.undoElement.selectedObjects.length) {
                                for (i = 0; i < currentSelection.selectedObjects.length; i++) {
                                    if (currentSelection.selectedObjects[parseInt(i.toString(), 10)].id !==
                                        this.undoElement.selectedObjects[parseInt(i.toString(), 10)].id) {
                                        isSubGroupSelection = true;
                                        break;
                                    }
                                }
                            }
                        }
                        isSelector = object instanceof Selector;
                        isSingleSelectedObject = object instanceof Selector && object.selectedObjects && object.selectedObjects.length === 1;
                        isSameSize = object instanceof Selector && Math.round(object.width) === Math.round(this.undoElement.width) && Math.round(object.height) === Math.round(this.undoElement.height);
                        isDifferentPosition = object.offsetX !== this.undoElement.offsetX || object.offsetY !== this.undoElement.offsetY;
                        isDifferentSourcePoint = object.sourcePoint !== this.undoElement.sourcePoint;
                        isDifferentTargetPoint = object.targetPoint !== this.undoElement.targetPoint;
                        if (!isSubGroupSelection &&
                            (((isSelector && (isSameSize || isSingleSelectedObject)) || !isSelector) && (isDifferentPosition || isDifferentSourcePoint || isDifferentTargetPoint))
                            || this.isSelectionHasConnector(object)) {
                            if (args.source) {
                                newValues = { offsetX: args.source.wrapper.offsetX, offsetY: args.source.wrapper.offsetY };
                                oldValues = { offsetX: args.source.wrapper.offsetX, offsetY: args.source.wrapper.offsetY };
                            }
                            arg = {
                                source: args.source, state: 'Completed', oldValue: this.intialValue, newValue: newValues,
                                target: this.currentTarget, targetPosition: this.currentPosition, allowDrop: true, cancel: false
                            };
                            arg = {
                                source: cloneBlazorObject(args.source), state: 'Completed',
                                oldValue: cloneBlazorObject(this.intialValue), newValue: cloneBlazorObject(newValues),
                                target: cloneBlazorObject(this.currentTarget), targetPosition: cloneBlazorObject(this.currentPosition),
                                allowDrop: arg.allowDrop, cancel: arg.cancel
                            };
                            canAddHistory = true;
                            //EJ2-69852): Position Change event trigger for clicking second time in swimlane header issue
                            if (object.id === 'helper') {
                                if (this.canTrigger) {
                                    //EJ2-925499 - Undo/Redo not working after moveing multiselected nodes inside swimlane while line routing enabled
                                    if ((obj.nodes.length > 1 || obj.connectors.length > 1) && (this.commandHandler.diagram.lineRoutingModule &&
                                        (this.commandHandler.diagram.constraints & DiagramConstraints.LineRouting))) {
                                        nameTable = this.commandHandler.diagram.nameTable;
                                        for (i = 0; i < obj.nodes.length; i++) {
                                            if (!(nameTable[obj.nodes[parseInt(i.toString(), 10)].parentId] &&
                                                nameTable[obj.nodes[parseInt(i.toString(), 10)].parentId].isLane)) {
                                                canAddHistory = false;
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        canAddHistory = true;
                                    }
                                    this.commandHandler.triggerEvent(DiagramEvent.positionChange, arg);
                                    this.connectorEndPointChangeEvent(arg);
                                }
                                else {
                                    canAddHistory = false;
                                }
                            }
                            else {
                                this.commandHandler.triggerEvent(DiagramEvent.positionChange, arg);
                                this.connectorEndPointChangeEvent(arg);
                            }
                            //Bug(1013865) - Connector Segment Issue in undo/redo
                            if (obj && this.undoElement) {
                                if (this.undoElement.connectors && this.undoElement.connectors.length > 0) {
                                    _loop_1 = function (connector) {
                                        var isConnectorPresent = obj.connectors.find(function (conn) { return conn.id === connector.id; });
                                        if (!isConnectorPresent) {
                                            var currentConnector = this_1.commandHandler.diagram.nameTable["" + connector.id];
                                            if (currentConnector) {
                                                obj.connectors.push(cloneObject(currentConnector));
                                            }
                                        }
                                    };
                                    this_1 = this;
                                    for (_i = 0, _a = this.undoElement.connectors; _i < _a.length; _i++) {
                                        connector = _a[_i];
                                        _loop_1(connector);
                                    }
                                }
                                if (this.undoElement.nodes && this.undoElement.nodes.length > 0) {
                                    for (_b = 0, _c = this.undoElement.nodes; _b < _c.length; _b++) {
                                        node = _c[_b];
                                        isNodePresent = obj.nodes.find(function (node) { return node.id === node.id; });
                                        if (!isNodePresent) {
                                            currentNode = this.commandHandler.diagram.nameTable["" + node.id];
                                            if (currentNode) {
                                                obj.nodes.push(cloneObject(currentNode));
                                            }
                                        }
                                    }
                                }
                            }
                            if (!isPreventHistory && canAddHistory) {
                                this.commandHandler.startGroupAction();
                                historyAdded = true;
                                entry = {
                                    type: 'PositionChanged',
                                    redoObject: cloneObject(obj), undoObject: cloneObject(this.undoElement), category: 'Internal'
                                };
                                if (obj.nodes[0] && obj.nodes[0].processId) {
                                    entry_1 = {
                                        type: 'SizeChanged', category: 'Internal',
                                        undoObject: this.undoParentElement, redoObject: this.commandHandler.getSubProcess(args.source)
                                    };
                                    this.commandHandler.addHistoryEntry(entry_1);
                                }
                                if (obj.nodes[0] && obj.nodes[0].parentId
                                    && this.commandHandler.diagram.nameTable[obj.nodes[0].parentId].shape.type === 'Container') {
                                    entry_2 = {
                                        type: 'SizeChanged', category: 'Internal',
                                        undoObject: this.undoContainerElement, redoObject: this.commandHandler.getContainer(args.source)
                                    };
                                    this.commandHandler.addHistoryEntry(entry_2);
                                }
                                this.commandHandler.addHistoryEntry(entry);
                            }
                        }
                    }
                    snappedPoint = this.commandHandler.snapPoint(this.prevPosition, this.currentPosition, 0, 0);
                    this.commandHandler.removeSnap();
                    this.commandHandler.removeHighlighter();
                    if (args.source && this.currentTarget && canAllowDrop(this.currentTarget) &&
                        this.commandHandler.isDroppable(args.source, this.currentTarget)) {
                        canSplit = true;
                        this.commandHandler.drop(this.currentElement, this.currentTarget, this.currentPosition);
                        if (this.currentTarget && this.currentTarget instanceof Connector) {
                            if (this.commandHandler.diagram.enableConnectorSplit === true) {
                                //EJ2-894577- Restricting the connector splitting if any one edge is already connected to the node
                                if (this.currentElement && this.currentElement instanceof Node) {
                                    if (this.currentElement.children !== undefined) {
                                        for (i = 0; i < this.currentElement.children.length; i++) {
                                            if (this.currentElement.children[parseInt(i.toString(), 10)] === this.currentTarget.sourceID ||
                                                this.currentElement.children[parseInt(i.toString(), 10)] === this.currentTarget.targetID) {
                                                canSplit = false;
                                            }
                                        }
                                    }
                                    else {
                                        if (this.currentElement.id === this.currentTarget.sourceID || this.currentElement.id === this.currentTarget.targetID) {
                                            canSplit = false;
                                        }
                                    }
                                    if (canSplit) {
                                        this.commandHandler.connectorSplit(this.currentElement, this.currentTarget);
                                    }
                                }
                                else if (this.currentElement instanceof Selector && !(this.commandHandler.PreventConnectorSplit)) {
                                    if (this.currentElement.nodes[0].children) {
                                        for (i = 0; i < this.currentElement.nodes[0].children.length; i++) {
                                            if (this.currentElement.nodes[0].children[parseInt(i.toString(), 10)] === this.currentTarget.sourceID ||
                                                this.currentElement.nodes[0].children[parseInt(i.toString(), 10)] === this.currentTarget.targetID) {
                                                canSplit = false;
                                            }
                                        }
                                    }
                                    else {
                                        if ((this.currentElement.nodes[0]).id === this.currentTarget.sourceID ||
                                            (this.currentElement.nodes[0]).id === this.currentTarget.targetID) {
                                            canSplit = false;
                                        }
                                    }
                                    if (canSplit) {
                                        this.commandHandler.connectorSplit(this.currentElement.nodes[0], this.currentTarget);
                                        this.commandHandler.PreventConnectorSplit = false;
                                    }
                                }
                            }
                        }
                        arg = {
                            element: args.source, target: this.currentTarget, position: this.currentPosition, cancel: false
                        };
                        this.commandHandler.triggerEvent(DiagramEvent.drop, arg);
                        if (!arg.cancel && args.source && this.commandHandler.isParentAsContainer(this.currentTarget) && !this.commandHandler.isTargetSubProcess(this.currentTarget)) {
                            nodes = (args.source instanceof Selector) ? args.source.nodes : [args.source];
                            isEndGroup = false;
                            temp = void 0;
                            for (i = 0; i < nodes.length; i++) {
                                if (nodes[0].parentId === nodes[parseInt(i.toString(), 10)].parentId) {
                                    temp = true;
                                }
                                else {
                                    temp = false;
                                    break;
                                }
                            }
                            // 902192: Diagram node resized wrongly while dragging and drop on multiple selected nodes in another lane Issue Fix
                            if (this.commandHandler.diagram.selectedItems.nodes.length !== nodes.length) {
                                nodes = this.commandHandler.diagram.selectedItems.nodes;
                            }
                            if (this.commandHandler.diagram.selectedItems.nodes.length > 1) {
                                //929543: To calculate the difference between the target lane bounds and selector bounds.
                                // We use this difference values to set the margin left and margin top for the child nodes of lane.
                                nodes = this.calculateDiff(this.commandHandler.diagram.selectedItems, this.currentTarget, this.commandHandler.diagram);
                                this.commandHandler.diagram.multiselect = true;
                            }
                            else {
                                this.commandHandler.diagram.multiselect = false;
                            }
                            for (i = 0; i < nodes.length; i++) {
                                if (!nodes[parseInt(i.toString(), 10)].container && !(this.commandHandler.diagram.cancelPositionChange)) {
                                    isEndGroup = true;
                                    this.commandHandler.updateLaneChildrenZindex(nodes[parseInt(i.toString(), 10)], this.currentTarget);
                                    this.commandHandler.dropChildToContainer(this.currentTarget, nodes[parseInt(i.toString(), 10)]);
                                    this.commandHandler.renderContainerHelper(nodes[parseInt(i.toString(), 10)]);
                                }
                            }
                            //929543: To update the lane size based on the dropped child nodes entire bounds.
                            if (nodes.length > 1) {
                                helper = this.commandHandler.diagram.nameTable['helper'];
                                if (helper) {
                                    updateLaneBoundsWithSelector(this.currentTarget, helper, this.commandHandler.diagram);
                                }
                            }
                            if (historyAdded && this.commandHandler.isContainer && isEndGroup) {
                                this.commandHandler.endGroupAction();
                                isEndGroupActionCalled = true;
                            }
                        }
                    }
                    if (args.source && this.currentTarget) {
                        this.commandHandler.dropAnnotation(args.source, this.currentTarget);
                    }
                    this.commandHandler.updateSelector();
                    if (historyAdded && (!this.commandHandler.isContainer || (isSwimLaneChildMultiDrag && !isEndGroupActionCalled))) {
                        this.commandHandler.endGroupAction();
                    }
                }
                else {
                    redoObject.nodes.push(cloneObject(args.source));
                    args.portId = this.portId;
                    obj = cloneObject(redoObject);
                    entry = {
                        type: 'PortPositionChanged', objectId: this.portId,
                        redoObject: cloneObject(obj), undoObject: cloneObject(this.undoElement), category: 'Internal'
                    };
                    this.commandHandler.addHistoryEntry(entry);
                    port = this.getPort(args);
                    if (port) {
                        nodePorts = this.undoElement.nodes.length > 0 ? this.undoElement.nodes[0].ports : [];
                        connPorts = this.undoElement.connectors.length > 0 ? this.undoElement.connectors[0].ports : [];
                        for (i = 0; i < nodePorts.length; i++) {
                            if (port.id === nodePorts[parseInt(i.toString(), 10)].id) {
                                oldValues = {
                                    offsetX: nodePorts[parseInt(i.toString(), 10)].offset.x,
                                    offsetY: nodePorts[parseInt(i.toString(), 10)].offset.y
                                };
                                newValues = { offsetX: port.offset.x, offsetY: port.offset.y };
                                break;
                            }
                        }
                        for (i = 0; i < connPorts.length; i++) {
                            if (port.id === connPorts[parseInt(i.toString(), 10)].id) {
                                oldValues = {
                                    offset: connPorts[parseInt(i.toString(), 10)].offset
                                };
                                newValues = { offset: port.offset };
                                break;
                            }
                        }
                    }
                    arg = {
                        source: port, state: 'Completed', oldValue: oldValues, newValue: newValues,
                        target: this.currentTarget, targetPosition: this.currentPosition, allowDrop: true, cancel: false
                    };
                    this.commandHandler.triggerEvent(DiagramEvent.positionChange, arg);
                }
                // this.commandHandler.updateBlazorSelector();
                _super.prototype.mouseUp.call(this, args);
                return [2 /*return*/];
            });
        });
    };
    MoveTool.prototype.clearDiff = function (nodes) {
        nodes.forEach(function (node, index) {
            delete node.diffX;
            delete node.diffY;
        });
    };
    MoveTool.prototype.calculateDiff = function (selector, target, diagram) {
        this.clearDiff(selector.nodes);
        var selectorLeft = selector.wrapper.bounds.left;
        var selectorTop = selector.wrapper.bounds.top;
        var targetLeft = target.wrapper.bounds.left;
        var targetTop = target.wrapper.bounds.top;
        var diffLeft;
        var diffTop;
        var swimlane = diagram.nameTable[target.parentId];
        if (target.columnIndex === 0 && swimlane && swimlane.shape.orientation === 'Horizontal') {
            targetLeft += 50;
        }
        if (target.rowIndex === 1 && swimlane && swimlane.shape.orientation === 'Vertical') {
            targetTop += 50;
        }
        if (selectorLeft < targetLeft) {
            diffLeft = targetLeft - selectorLeft;
        }
        else {
            diffLeft = 0;
        }
        if (selectorTop < targetTop) {
            diffTop = targetTop - selectorTop;
        }
        else {
            diffTop = 0;
        }
        var nodes = selector.nodes;
        nodes.forEach(function (node, index) {
            node.diffX = diffLeft;
            node.diffY = diffTop;
        });
        return nodes;
    };
    //EJ2-59309-While drag the connected node the connector endPointChange event does not get trigger
    MoveTool.prototype.connectorEndPointChangeEvent = function (arg, snappedPoint) {
        var selectedElement = arg.source;
        if (selectedElement instanceof Selector && selectedElement.nodes.length > 0) {
            for (var i = 0; i < selectedElement.nodes.length; i++) {
                var node = selectedElement.nodes[parseInt(i.toString(), 10)];
                if (node && node.inEdges.length > 0) {
                    for (var j = 0; j < node.inEdges.length; j++) {
                        var connector = this.commandHandler.diagram.getObject(node.inEdges[parseInt(j.toString(), 10)]);
                        if (connector) {
                            this.triggerEndPointEvent(connector, arg, snappedPoint, 'targetPointChange');
                        }
                    }
                }
                if (node && node.outEdges.length > 0) {
                    for (var j = 0; j < node.outEdges.length; j++) {
                        var connector = this.commandHandler.diagram.getObject(node.outEdges[parseInt(j.toString(), 10)]);
                        if (connector) {
                            this.triggerEndPointEvent(connector, arg, snappedPoint, 'sourcePointChange');
                        }
                    }
                }
            }
        }
    };
    MoveTool.prototype.triggerEndPointEvent = function (connector, arg, snappedPoint, eventName) {
        var args = {
            connector: connector, state: arg.state, targetNode: connector.targetID, targetPort: connector.targetPortID,
            sourceNode: connector.sourceID, sourcePort: connector.sourcePortID, oldValue: { x: connector.targetPoint.x, y: connector.targetPoint.y },
            newValue: { x: connector.targetPoint.x + (snappedPoint ? snappedPoint.x : 0), y: connector.targetPoint.y + (snappedPoint ? snappedPoint.y : 0) }, cancel: arg.cancel
        };
        this.commandHandler.triggerEvent((eventName === 'targetPointChange') ? DiagramEvent.targetPointChange : DiagramEvent.sourcePointChange, args);
    };
    MoveTool.prototype.isSelectionHasConnector = function (args) {
        if (args.nodes && args.connectors && args.nodes.length > 0 && args.connectors.length > 0 &&
            (args.width !== this.undoElement.width || args.height !== this.undoElement.height)) {
            return true;
        }
        return false;
    };
    // private getBlazorPositionChangeEventArgs(args: IDraggingEventArgs | IBlazorDraggingEventArgs, target: IElement): any {
    // args = {
    //     source: cloneBlazorObject(args.source), state: args.state, oldValue: args.oldValue, newValue: args.newValue,
    //     target: getObjectType(target) === Connector ? { connector: cloneBlazorObject(target) }
    //         : { node: cloneBlazorObject(target) },
    //     targetPosition: this.currentPosition, allowDrop: true, cancel: false
    // };
    // return args as IBlazorDraggingEventArgs;
    // }
    /* tslint:disable */
    /**
     * @param args
     * @private
     */
    MoveTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var isSame = false;
        var object;
        object = this.commandHandler.renderContainerHelper(args.source) ||
            args.source;
        if (!object) {
            return false;
        }
        if (object instanceof Node || object instanceof Connector) {
            if (object instanceof Node && this.undoElement && this.undoElement.nodes[0]) {
                if (object.offsetX === this.undoElement.nodes[0].offsetX &&
                    object.offsetY === this.undoElement.nodes[0].offsetY) {
                    isSame = true;
                }
            }
            else if (this.undoElement && this.undoElement.connectors[0]
                && Point.equals(object.sourcePoint, this.undoElement.connectors[0].sourcePoint)
                && Point.equals(object.targetPoint, this.undoElement.connectors[0].targetPoint)) {
                isSame = true;
            }
        }
        else {
            if (object && object.wrapper && object.wrapper.offsetX === this.undoElement.wrapper.offsetX &&
                object.wrapper.offsetY === this.undoElement.wrapper.offsetY) {
                isSame = true;
            }
        }
        var oldValues;
        if (object) {
            oldValues = { offsetX: object.wrapper.offsetX, offsetY: object.wrapper.offsetY };
        }
        var arg = {
            source: object, state: 'Start', oldValue: oldValues, newValue: oldValues,
            target: args.target, targetPosition: args.position, allowDrop: true, cancel: false
        };
        arg = {
            source: cloneBlazorObject(object), state: 'Start', oldValue: cloneBlazorObject(oldValues),
            newValue: cloneBlazorObject(oldValues),
            target: args.target, targetPosition: args.position, allowDrop: arg.allowDrop, cancel: arg.cancel
        };
        //EJ2-909578: - Position change incorrect event args value for port dragging
        if (this.objectType === 'Port') {
            var port = this.getPort(args);
            if (port) {
                var nodePorts = this.undoElement.nodes.length > 0 ? this.undoElement.nodes[0].ports : [];
                var connPorts = this.undoElement.connectors.length > 0 ? this.undoElement.connectors[0].ports : [];
                for (var i = 0; i < nodePorts.length; i++) {
                    oldValues = { offsetX: port.offset.x, offsetY: port.offset.y };
                    if (port.offset.x !== nodePorts[parseInt(i.toString(), 10)].offset.x || port.offset.y !== nodePorts[parseInt(i.toString(), 10)].offset.y) {
                        isSame = false;
                        break;
                    }
                }
                for (var i = 0; i < connPorts.length; i++) {
                    oldValues = { offset: port.offset };
                    if (port.offset !== connPorts[parseInt(i.toString(), 10)].offset) {
                        isSame = false;
                        break;
                    }
                }
            }
            arg = {
                source: port, state: 'Start', oldValue: oldValues, newValue: oldValues,
                target: args.target, targetPosition: args.position, allowDrop: true, cancel: false
            };
        }
        //(EJ2-277624)-In the positionChange event, during the completed state, old and new values remain identical.
        if (!this.isStartAction) {
            this.intialValue = { offsetX: object.wrapper.offsetX, offsetY: object.wrapper.offsetY };
            if ((this.commandHandler.diagram.lineRoutingModule &&
                (this.commandHandler.diagram.constraints & DiagramConstraints.LineRouting)
                && (this.commandHandler.diagram.layout.type !== 'ComplexHierarchicalTree'))) {
                var INFLATE_MARGIN = 40;
                var nodeBounds = getBounds(object.wrapper);
                nodeBounds.Inflate(INFLATE_MARGIN);
                var nearbyObjects = this.commandHandler.diagram.spatialSearch.findObjects(nodeBounds);
                for (var _i = 0, nearbyObjects_1 = nearbyObjects; _i < nearbyObjects_1.length; _i++) {
                    var item = nearbyObjects_1[_i];
                    if (item instanceof Connector && this.commandHandler.diagram.routedConnectors.indexOf(item.id) === -1) {
                        // this.commandHandler.diagram.lineConnector.push(item.id);
                    }
                }
            }
        }
        if (isSame && !isBlazor()) {
            this.commandHandler.triggerEvent(DiagramEvent.positionChange, arg);
            if (!this.isStartAction) {
                this.connectorEndPointChangeEvent(arg);
            }
            this.isStartAction = true;
        }
        this.commandHandler.diagram.cancelPositionChange = arg.cancel;
        this.currentPosition = args.position;
        if (this.objectType !== 'Port') {
            var x = this.currentPosition.x - this.prevPosition.x;
            var y = this.currentPosition.y - this.prevPosition.y;
            var diffX = this.initialOffset.x + (this.currentPosition.x - this.prevPosition.x);
            var diffY = this.initialOffset.y + (this.currentPosition.y - this.prevPosition.y);
            this.commandHandler.dragOverElement(args, this.currentPosition);
            this.commandHandler.disConnect(args.source);
            this.commandHandler.removeSnap();
            var oldValues_1;
            var newValues = void 0;
            var snappedPoint = this.commandHandler.snapPoint(this.prevPosition, this.currentPosition, diffX, diffY);
            this.initialOffset.x = diffX - snappedPoint.x;
            this.initialOffset.y = diffY - snappedPoint.y;
            if (object) {
                oldValues_1 = { offsetX: object.wrapper.offsetX, offsetY: object.wrapper.offsetY };
                newValues = {
                    offsetX: object.wrapper.offsetX + snappedPoint.x,
                    offsetY: object.wrapper.offsetY + snappedPoint.y
                };
            }
            if (this.currentTarget && args.target !== this.currentTarget) {
                this.commandHandler.removeChildFromBPmn(args.source, args.target, this.currentTarget);
            }
            this.currentTarget = args.target;
            var arg_1 = {
                source: object, state: 'Progress', oldValue: oldValues_1, newValue: newValues,
                target: args.target, targetPosition: args.position, allowDrop: true, cancel: false
            };
            this.commandHandler.triggerEvent(DiagramEvent.positionChange, arg_1);
            this.commandHandler.diagram.cancelPositionChange = arg_1.cancel;
            this.canTrigger = true;
            if (this.isStartAction && arg_1.state !== 'Start') {
                this.connectorEndPointChangeEvent(arg_1, snappedPoint);
            }
            if (!arg_1.cancel && !this.canCancel) {
                this.blocked = !this.commandHandler.dragSelectedObjects(snappedPoint.x, snappedPoint.y);
                var blocked = !(this.commandHandler.mouseOver(this.currentElement, this.currentTarget, this.currentPosition));
                this.blocked = this.blocked || blocked;
            }
            this.commandHandler.removeStackHighlighter();
            this.commandHandler.renderStackHighlighter(args);
            if (this.currentTarget && (args.source !== this.currentTarget) &&
                this.commandHandler.isDroppable(args.source, this.currentTarget) && args.source.id !== 'helper') {
                var object_1 = (args.source instanceof Selector) ? args.source.nodes[0] || args.source.connectors[0] : args.source;
                if ((!this.commandHandler.isParentAsContainer(object_1, true))
                    && (object_1.shape.type !== 'SwimLane' && !object_1.shape.isPhase)) {
                    if (this.currentTarget.isLane) {
                        this.commandHandler.renderStackHighlighter(args, this.currentTarget);
                    }
                    else {
                        this.commandHandler.drawHighlighter(this.currentTarget);
                    }
                }
            }
            else {
                this.commandHandler.removeHighlighter();
            }
            if (this.commandHandler.canEnableDefaultTooltip()) {
                var content_2 = this.getTooltipContent(args.source);
                var contentTemp = function () {
                    return content_2;
                };
                this.commandHandler.showTooltip(args.source, args.position, initializeCSPTemplate(contentTemp), 'MoveTool', this.isTooltipVisible);
                this.isTooltipVisible = false;
            }
            else if (this.isTooltipVisible) {
                this.commandHandler.closeTooltip();
                this.isTooltipVisible = false;
            }
        }
        else {
            var matrix = identityMatrix();
            var node = args.source;
            var oldValues_2;
            var newValues = void 0;
            var nodePorts = this.undoElement.nodes.length > 0 ? this.undoElement.nodes[0].ports : [];
            var connPorts = this.undoElement.connectors.length > 0 ? this.undoElement.connectors[0].ports : [];
            var port = this.getPort(args);
            if (port) {
                for (var i = 0; i < nodePorts.length; i++) {
                    oldValues_2 = { offsetX: port.offset.x, offsetY: port.offset.y };
                    break;
                }
                for (var i = 0; i < connPorts.length; i++) {
                    oldValues_2 = { offset: port.offset };
                    break;
                }
            }
            rotateMatrix(matrix, -node.rotateAngle || -node.wrapper.rotateAngle, node.offsetX || node.wrapper.offsetX, node.offsetY || node.wrapper.offsetY);
            var prevPosition = transformPointByMatrix(matrix, { x: this.prevPosition.x, y: this.prevPosition.y });
            var position = transformPointByMatrix(matrix, { x: args.position.x, y: args.position.y });
            this.commandHandler.portDrag(args.source, args.sourceWrapper, position.x - prevPosition.x, position.y - prevPosition.y);
            //EJ2-909578: - Position change incorrect event args value for port dragging
            //Required correction on data type
            if (port) {
                for (var i = 0; i < nodePorts.length; i++) {
                    newValues = { offsetX: port.offset.x, offsetY: port.offset.y };
                    break;
                }
                for (var i = 0; i < connPorts.length; i++) {
                    newValues = { offset: port.offset };
                    break;
                }
            }
            var arg_2 = {
                source: port, state: 'Progress', oldValue: oldValues_2, newValue: newValues,
                target: args.target, targetPosition: args.position, allowDrop: true, cancel: false
            };
            this.commandHandler.triggerEvent(DiagramEvent.positionChange, arg_2);
        }
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    MoveTool.prototype.getTooltipContent = function (node) {
        return 'X:' + Math.round(node.wrapper.bounds.x) + ' ' + 'Y:' + Math.round(node.wrapper.bounds.y);
    };
    /**
     * @param args
     * @private
     */
    MoveTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    /**   @private  */
    MoveTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
        this.currentTarget = null;
        this.prevPosition = null;
    };
    return MoveTool;
}(ToolBase));
export { MoveTool };
/**
 * Rotates the selected objects
 */
var RotateTool = /** @class */ (function (_super) {
    __extends(RotateTool, _super);
    function RotateTool(commandHandler) {
        var _this = _super.call(this, commandHandler, true) || this;
        /** @private */
        _this.rotateStart = false;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    RotateTool.prototype.mouseDown = function (args) {
        this.undoElement = cloneObject(args.source);
        if (this.undoElement.nodes[0] && this.undoElement.nodes[0].children) {
            var objects = [];
            var nodes = this.commandHandler.getAllDescendants(this.undoElement.nodes[0], objects);
            for (var i = 0; i < nodes.length; i++) {
                var node = this.commandHandler.cloneChild(nodes[parseInt(i.toString(), 10)].id);
                this.childTable[nodes[parseInt(i.toString(), 10)].id] = cloneObject(node);
            }
        }
        this.commandHandler.trackConnectorChange(this.undoElement);
        _super.prototype.mouseDown.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    RotateTool.prototype.mouseUp = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var object, oldValue, newValue, arg, obj, entry;
            return __generator(this, function (_a) {
                this.checkPropertyValue();
                object = this.commandHandler.renderContainerHelper(args.source) || args.source;
                if (this.undoElement.rotateAngle !== object.wrapper.rotateAngle) {
                    oldValue = { rotateAngle: this.undoElement.rotateAngle };
                    newValue = { rotateAngle: object.wrapper.rotateAngle };
                    arg = {
                        source: args.source, state: 'Completed', oldValue: oldValue,
                        newValue: newValue, cancel: false
                    };
                    this.commandHandler.triggerEvent(DiagramEvent.rotateChange, arg);
                    obj = void 0;
                    obj = cloneObject(args.source);
                    this.commandHandler.trackConnectorChange(obj);
                    entry = {
                        type: 'RotationChanged', redoObject: cloneObject(obj), undoObject: cloneObject(this.undoElement), category: 'Internal',
                        childTable: this.childTable
                    };
                    this.commandHandler.addHistoryEntry(entry);
                    this.rotateStart = false;
                }
                // Bug 983771: Rotate thumb Missing After Rotation of Selected Nodes.
                // Moved updateSelector() outside the rotateAngle-change condition because on mouseup, rotating back to the same angle (e.g., 0°→ 0°) left the selector unrendered.
                // This ensures the selector is always updated on rotation completion, even when the angle remains unchanged.
                this.commandHandler.updateSelector();
                // this.commandHandler.updateBlazorSelector();
                this.canCancel = undefined;
                this.tempArgs = undefined;
                _super.prototype.mouseUp.call(this, args);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param args
     * @private
     */
    RotateTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var object;
        object = this.commandHandler.renderContainerHelper(args.source) || args.source;
        if (this.undoElement.rotateAngle === object.wrapper.rotateAngle && !this.rotateStart) {
            var oldValue_1 = { rotateAngle: object.wrapper.rotateAngle };
            var arg_3 = {
                source: args.source, state: 'Start', oldValue: oldValue_1, newValue: oldValue_1, cancel: false
            };
            this.commandHandler.triggerEvent(DiagramEvent.rotateChange, arg_3);
            this.rotateStart = true;
        }
        this.currentPosition = args.position;
        var refPoint = { x: object.wrapper.offsetX, y: object.wrapper.offsetY };
        var angle = Point.findAngle(refPoint, this.currentPosition) + 90;
        var snapAngle = this.commandHandler.snapAngle(angle);
        angle = snapAngle !== 0 ? snapAngle : angle;
        angle = (angle + 360) % 360;
        var oldValue = { rotateAngle: object.wrapper.rotateAngle };
        var newValue = { rotateAngle: angle };
        var arg = {
            source: args.source, state: 'Progress', oldValue: oldValue,
            newValue: newValue, cancel: false
        };
        var arg1 = {
            source: cloneBlazorObject(args.source), state: 'Progress', oldValue: cloneBlazorObject(oldValue),
            newValue: cloneBlazorObject(newValue), cancel: arg.cancel
        };
        this.commandHandler.triggerEvent(DiagramEvent.rotateChange, arg1);
        if (!arg1.cancel) {
            this.blocked = !(this.commandHandler.rotateSelectedItems(angle - object.wrapper.rotateAngle));
        }
        if (this.commandHandler.canEnableDefaultTooltip()) {
            var content_3 = this.getTooltipContent(args.source);
            var contentTemp = function () {
                return content_3;
            };
            this.commandHandler.showTooltip(args.source, args.position, initializeCSPTemplate(contentTemp), 'RotateTool', this.isTooltipVisible);
            this.isTooltipVisible = false;
        }
        return !this.blocked;
    };
    RotateTool.prototype.getTooltipContent = function (node) {
        return Math.round((node.rotateAngle % 360)).toString() + '\xB0';
    };
    /**
     * @param args
     * @private
     */
    RotateTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    /**   @private  */
    RotateTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    return RotateTool;
}(ToolBase));
export { RotateTool };
/**
 * Scales the selected objects
 */
var ResizeTool = /** @class */ (function (_super) {
    __extends(ResizeTool, _super);
    function ResizeTool(commandHandler, corner) {
        var _this = _super.call(this, commandHandler, true) || this;
        /** @private */
        _this.resizeStart = false;
        /**   @private  */
        _this.initialBounds = new Rect();
        _this.canCancel = false;
        _this.corner = corner;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    ResizeTool.prototype.mouseDown = function (args) {
        var oldValues;
        this.undoElement = cloneObject(args.source);
        this.undoParentElement = this.commandHandler.getSubProcess(args.source);
        this.undoContainerElement = this.commandHandler.getContainer(args.source);
        //Bug 1000867: Undo-redo after resizing text-annotation parent is not working properly
        this.undoTextAnnotationElement = this.commandHandler.getTextAnnotation(args.source);
        _super.prototype.mouseDown.call(this, args);
        if (this.undoElement.nodes[0] && this.undoElement.nodes[0].children) {
            var elements = [];
            var nodes = this.commandHandler.getAllDescendants(this.undoElement.nodes[0], elements);
            for (var i = 0; i < nodes.length; i++) {
                var node = this.commandHandler.cloneChild(nodes[parseInt(i.toString(), 10)].id);
                this.childTable[nodes[parseInt(i.toString(), 10)].id] = cloneObject(node);
            }
        }
        this.commandHandler.trackConnectorChange(this.undoElement);
        this.commandHandler.checkSelection(args.source, this.corner);
        _super.prototype.mouseDown.call(this, args);
        this.initialBounds.x = args.source.wrapper.offsetX;
        this.initialBounds.y = args.source.wrapper.offsetY;
        this.initialBounds.height = args.source.wrapper.actualSize.height;
        this.initialBounds.width = args.source.wrapper.actualSize.width;
    };
    /**
     * @param args
     * @param isPreventHistory
     * @param args
     * @param isPreventHistory
     * @private
     */
    ResizeTool.prototype.mouseUp = function (args, isPreventHistory) {
        return __awaiter(this, void 0, void 0, function () {
            var object, deltaValues, oldValue, arg, obj, entry, entry_3, entry_4, textEntry, nodeObj, isTextAnnotationParent;
            return __generator(this, function (_a) {
                this.checkPropertyValue();
                this.commandHandler.removeSnap();
                this.commandHandler.updateSelector();
                object = this.commandHandler.renderContainerHelper(args.source) || args.source;
                if ((this.undoElement.offsetX !== object.wrapper.offsetX || this.undoElement.offsetY !== object.wrapper.offsetY ||
                    this.undoElement.width !== object.wrapper.bounds.width || this.undoElement.height !== object.wrapper.bounds.height)) {
                    deltaValues = this.updateSize(args.source, this.currentPosition, this.prevPosition, this.corner, this.initialBounds);
                    this.blocked = this.scaleObjects(deltaValues.width, deltaValues.height, this.corner, this.currentPosition, this.prevPosition, object);
                    oldValue = {
                        width: args.source.wrapper.actualSize.width, height: args.source.wrapper.actualSize.height
                    };
                    arg = {
                        source: cloneBlazorObject(args.source), state: 'Completed',
                        oldValue: this.startValues, newValue: oldValue, cancel: false
                    };
                    this.commandHandler.triggerEvent(DiagramEvent.sizeChange, arg);
                    obj = cloneObject(args.source);
                    this.commandHandler.trackConnectorChange(obj);
                    entry = {
                        type: 'SizeChanged', redoObject: cloneObject(obj), undoObject: cloneObject(this.undoElement), category: 'Internal',
                        childTable: this.childTable
                    };
                    this.resizeStart = false;
                    if (!isPreventHistory) {
                        this.commandHandler.startGroupAction();
                        if (obj.nodes.length > 0 && obj.nodes[0].processId) {
                            entry_3 = {
                                type: 'SizeChanged', redoObject: this.commandHandler.getSubProcess(args.source),
                                undoObject: this.undoParentElement, category: 'Internal'
                            };
                            this.commandHandler.addHistoryEntry(entry_3);
                        }
                        if (obj.nodes.length > 0 && obj.nodes[0].parentId
                            && this.commandHandler.diagram.nameTable[obj.nodes[0].parentId].shape.type === 'Container') {
                            entry_4 = {
                                type: 'SizeChanged', redoObject: this.commandHandler.getContainer(args.source),
                                undoObject: this.undoContainerElement, category: 'Internal'
                            };
                            this.commandHandler.addHistoryEntry(entry_4);
                        }
                        if (obj.nodes.length > 0) {
                            textEntry = void 0;
                            nodeObj = this.commandHandler.diagram.nameTable[obj.nodes[0].id];
                            isTextAnnotationParent = nodeObj && nodeObj.hasTextAnnotation;
                            if (isTextAnnotationParent) {
                                textEntry = {
                                    type: 'SizeChanged', redoObject: this.commandHandler.getTextAnnotation(args.source),
                                    undoObject: this.undoTextAnnotationElement, category: 'Internal'
                                };
                                this.commandHandler.addHistoryEntry(textEntry);
                            }
                        }
                        //EJ2-934129 : Position of the subprocess changed during undo and redo operations
                        this.commandHandler.addHistoryEntry(entry);
                        this.commandHandler.endGroupAction();
                    }
                }
                // this.commandHandler.updateBlazorSelector();
                _super.prototype.mouseUp.call(this, args);
                return [2 /*return*/, !this.blocked];
            });
        });
    };
    /**
     * @param args
     * @private
     */
    ResizeTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var object;
        object = this.commandHandler.renderContainerHelper(args.source) || args.source;
        if (this.undoElement.offsetX === object.wrapper.offsetX && this.undoElement.offsetY === object.wrapper.offsetY && !this.resizeStart) {
            var oldValue = {
                width: args.source.wrapper.actualSize.width, height: args.source.wrapper.actualSize.height
            };
            //EJ2-866122 - Need to enhance the sizeChange Event
            this.startValues = oldValue;
            var arg = {
                source: args.source, state: 'Start', oldValue: oldValue, newValue: this.currentElement, cancel: false
            };
            this.commandHandler.triggerEvent(DiagramEvent.sizeChange, arg);
            this.resizeStart = true;
        }
        this.currentPosition = args.position;
        var x = this.currentPosition.x - this.startPosition.x;
        var y = this.currentPosition.y - this.startPosition.y;
        var changes = { x: x, y: y };
        changes = rotatePoint(-this.currentElement.wrapper.rotateAngle, undefined, undefined, changes);
        var sx = (this.currentElement.wrapper.actualSize.width + changes.x) / this.currentElement.wrapper.actualSize.width;
        var sy = (this.currentElement.wrapper.actualSize.height + changes.y) / this.currentElement.wrapper.actualSize.height;
        changes = this.getChanges(changes);
        this.commandHandler.removeSnap();
        var deltaValues = this.updateSize(args.source, this.startPosition, this.currentPosition, this.corner, this.initialBounds);
        this.blocked = !(this.scaleObjects(deltaValues.width, deltaValues.height, this.corner, this.startPosition, this.currentPosition, object));
        if (this.commandHandler.canEnableDefaultTooltip()) {
            var content_4 = this.getTooltipContent(args.source);
            //Task 834121: Content-Security-Policy support for diagram
            var contentTemp = function () {
                return content_4;
            };
            this.commandHandler.showTooltip(args.source, args.position, initializeCSPTemplate(contentTemp), 'ResizeTool', this.isTooltipVisible);
            this.isTooltipVisible = false;
        }
        else if (this.isTooltipVisible) {
            this.commandHandler.closeTooltip();
            this.isTooltipVisible = false;
        }
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    ResizeTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    ResizeTool.prototype.getTooltipContent = function (node) {
        return 'W:' + Math.round(node.wrapper.bounds.width) + ' ' + 'H:' + Math.round(node.wrapper.bounds.height);
    };
    ResizeTool.prototype.getChanges = function (change) {
        switch (this.corner) {
            case 'ResizeEast':
                return { x: change.x, y: 0 };
            case 'ResizeSouthEast':
                return change;
            case 'ResizeSouth':
                return { x: 0, y: change.y };
            case 'ResizeNorth':
                return { x: 0, y: -change.y };
            case 'ResizeNorthEast':
                return { x: change.x, y: -change.y };
            case 'ResizeNorthWest':
                return { x: -change.x, y: -change.y };
            case 'ResizeWest':
                return { x: -change.x, y: 0 };
            case 'ResizeSouthWest':
                return { x: -change.x, y: change.y };
        }
        return change;
    };
    /**
     * Updates the size with delta width and delta height using scaling.
     */
    /**
     * Aspect ratio used to resize the width or height based on resizing the height or width
     *
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     */
    ResizeTool.prototype.scaleObjects = function (deltaWidth, deltaHeight, corner, startPoint, endPoint, source) {
        var selectedItem = this.commandHandler.diagram.selectedItems;
        if ((source instanceof Selector && source.nodes.length === 1 && source.nodes[0].constraints & NodeConstraints.AspectRatio) || (source instanceof Node && source.id === 'helper' && selectedItem.nodes.length === 1 && selectedItem.nodes[0].constraints & NodeConstraints.AspectRatio)) {
            if (corner === 'ResizeWest' || corner === 'ResizeEast' || corner === 'ResizeNorth' || corner === 'ResizeSouth') {
                if (!(deltaHeight === 1 && deltaWidth === 1)) {
                    deltaHeight = deltaWidth = Math.max(deltaHeight === 1 ? 0 : deltaHeight, deltaWidth === 1 ? 0 : deltaWidth);
                }
            }
            else {
                deltaHeight = deltaWidth = Math.max(deltaHeight, deltaWidth);
            }
        }
        var oldValue = {
            width: source.width, height: source.height
        };
        this.blocked = this.commandHandler.scaleSelectedItems(deltaWidth, deltaHeight, this.getPivot(this.corner));
        var newValue = {
            width: source.width, height: source.height
        };
        var arg;
        arg = { source: source, state: 'Progress', oldValue: oldValue, newValue: newValue, cancel: false };
        var arg1;
        arg1 = {
            source: cloneBlazorObject(source), state: 'Progress',
            oldValue: cloneBlazorObject(oldValue), newValue: cloneBlazorObject(newValue), cancel: arg.cancel
        };
        this.commandHandler.triggerEvent(DiagramEvent.sizeChange, arg1);
        if (arg1.cancel || this.canCancel) {
            this.commandHandler.scaleSelectedItems(1 / deltaWidth, 1 / deltaHeight, this.getPivot(this.corner));
        }
        return this.blocked;
    };
    return ResizeTool;
}(ToolBase));
export { ResizeTool };
/**
 * Draws a node that is defined by the user
 */
var NodeDrawingTool = /** @class */ (function (_super) {
    __extends(NodeDrawingTool, _super);
    function NodeDrawingTool(commandHandler, sourceObject) {
        var _this = _super.call(this, commandHandler, true) || this;
        _this.sourceObject = sourceObject;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    NodeDrawingTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        this.commandHandler.setFocus();
        this.triggerElementDrawEvent(args.source, 'Start', 'Node', this.getShapeType(), true);
    };
    /**
     * @param args
     * @private
     */
    NodeDrawingTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var checkBoundaryConstraints;
        var node = {
            offsetX: this.currentPosition.x, width: 3, height: 3,
            offsetY: this.currentPosition.y
        };
        if (!this.drawingObject) {
            this.drawingObject = this.commandHandler.drawObject(node);
        }
        if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
            var rect = Rect.toBounds([this.prevPosition, this.currentPosition]);
            checkBoundaryConstraints = this.commandHandler.checkBoundaryConstraints(undefined, undefined, rect);
            if (checkBoundaryConstraints) {
                this.commandHandler.updateNodeDimension(this.drawingObject, rect);
            }
        } //1005606-Mismatch in element draw event coordinates between in‑progress and completed states
        this.triggerElementDrawEvent(this.drawingObject, 'Progress', 'Node', this.getShapeType(), false);
        return checkBoundaryConstraints;
    };
    /**
     * @param args
     * @private
     */
    NodeDrawingTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        var checkBoundaryConstraints;
        var rect = Rect.toBounds([this.prevPosition, this.currentPosition]);
        checkBoundaryConstraints = this.commandHandler.checkBoundaryConstraints(undefined, undefined, rect);
        if (this.drawingObject && this.drawingObject instanceof Node) {
            this.commandHandler.addObjectToDiagram(this.drawingObject);
            this.triggerElementDrawEvent(this.drawingObject, 'Completed', 'Node', this.getShapeType(), false);
            this.drawingObject = null;
        }
        // this.commandHandler.updateBlazorSelector();
        _super.prototype.mouseUp.call(this, args);
        this.inAction = false;
    };
    /**   @private  */
    NodeDrawingTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    /**
     * @param args
     * @private
     */
    NodeDrawingTool.prototype.mouseLeave = function (args) {
        if (this.inAction) {
            this.mouseUp(args);
        }
    };
    return NodeDrawingTool;
}(ToolBase));
export { NodeDrawingTool };
/**
 * Draws a connector that is defined by the user
 */
var ConnectorDrawingTool = /** @class */ (function (_super) {
    __extends(ConnectorDrawingTool, _super);
    function ConnectorDrawingTool(commandHandler, endPoint, sourceObject) {
        var _this = _super.call(this, commandHandler, endPoint) || this;
        _this.sourceObject = sourceObject;
        _this.toolName = 'ConnectorDrawingTool';
        return _this;
    }
    /**
     * @param args
     * @private
     */
    ConnectorDrawingTool.prototype.mouseDown = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.mouseDown.call(this, args);
                this.inAction = true;
                this.commandHandler.setFocus();
                this.triggerElementDrawEvent(args.source, 'Start', 'Connector', this.commandHandler.diagram.drawingObject.type, true);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param args
     * @private
     */
    ConnectorDrawingTool.prototype.mouseMove = function (args) {
        this.commandHandler.enableServerDataBinding(false);
        if (this.inAction) {
            var connector = {
                sourcePoint: this.currentPosition, targetPoint: this.currentPosition
            };
            if (!this.drawingObject) {
                this.drawingObject = this.commandHandler.drawObject(connector);
            }
            args.source = this.drawingObject;
            //Bug 874781: Port Draw Connection is not proper with group node.
            if (args.actualObject && (args.actualObject.parentId || args.actualObject.children) && this.drawingObject.sourceID === ''
                && this.drawingObject.targetID === '') {
                this.setTarget(args);
            }
            if (((args.target && args.target instanceof Node) || (args.actualObject && args.sourceWrapper && checkPort(args.actualObject, args.sourceWrapper)))
                && (this.endPoint !== 'ConnectorTargetEnd' || (canInConnect(args.target)))) {
                //970513- Draw connector's target end from InConnect-Only ports
                if (args.sourceWrapper && args.actualObject && !args.actualObject.isPhase && !args.actualObject.isLane) {
                    var targetObjID = (args.sourceWrapper.id).split('_')[0];
                    var portId_1 = (args.sourceWrapper.id).split('_')[1];
                    var targetPort = args.actualObject.ports.find(function (port) { return port.id === portId_1; });
                    var isInConnectOnly = targetPort && canPortInConnect(targetPort) && !(canPortOutConnect(targetPort));
                    if (this.commandHandler && isInConnectOnly && args.sourceWrapper instanceof PathElement) {
                        // Reverse: connect target end, move source end with mouse
                        this.endPoint = 'ConnectorTargetEnd';
                        args.targetWrapper = args.sourceWrapper;
                        args.sourceWrapper = null;
                        if (!args.target || (args.target && args.target.id !== targetObjID)) {
                            var targetObject = this.commandHandler.diagram.nameTable["" + targetObjID];
                            args.target = targetObject ? targetObject : args.target;
                        }
                        this.commandHandler.connect(this.endPoint, args);
                        this.endPoint = 'ConnectorSourceEnd';
                    }
                    else if (this.commandHandler) {
                        // Default: connect source end, move target end with mouse
                        this.commandHandler.connect(this.endPoint, args);
                        this.endPoint = 'ConnectorTargetEnd';
                    }
                }
            }
            else if (this.drawingObject.targetID === '') {
                this.endPoint = 'ConnectorTargetEnd';
            }
        }
        if (!this.inAction) {
            this.commandHandler.updateSelector();
            //EJ2-899368 : Highlighters for Connector Element Draw with userhandle updated wrongly
            if (args.source && !args.source.isLane && args.sourceWrapper) {
                this.commandHandler.renderHighlighter(args, true);
            }
        }
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) { //1005606-Mismatch in element draw event coordinates between in‑progress and completed states
            this.triggerElementDrawEvent(args.source, 'Progress', 'Connector', this.drawingObject.type, false);
        }
        this.commandHandler.enableServerDataBinding(true);
        return !this.blocked;
    };
    // Sets the target while drawing connector from the group node port or its children port.
    ConnectorDrawingTool.prototype.setTarget = function (args) {
        if (args.target) {
            if (!args.sourceWrapper.id.includes(args.target.id)) {
                if (args.target.parentId && args.sourceWrapper.id.includes(args.target.parentId)) {
                    args.target = this.commandHandler.diagram.nameTable[args.target.parentId];
                }
            }
        }
        else {
            if (!args.sourceWrapper.id.includes(args.actualObject.id)) {
                if (args.actualObject.parentId && args.sourceWrapper.id.includes(args.actualObject.parentId)) {
                    args.target = this.commandHandler.diagram.nameTable[args.actualObject.parentId];
                }
            }
            else {
                args.target = args.actualObject;
            }
        }
    };
    /**
     * @param args
     * @private
     */
    ConnectorDrawingTool.prototype.mouseUp = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.commandHandler.enableServerDataBinding(false);
                this.checkPropertyValue();
                if (this.drawingObject && this.drawingObject instanceof Connector) {
                    this.commandHandler.addObjectToDiagram(this.drawingObject);
                    this.triggerElementDrawEvent(this.drawingObject, 'Completed', 'Connector', this.drawingObject.type, false);
                    this.drawingObject = null;
                }
                this.inAction = false;
                if (this.commandHandler) {
                    this.commandHandler.enableServerDataBinding(true);
                    _super.prototype.mouseUp.call(this, args);
                }
                return [2 /*return*/];
            });
        });
    };
    /**   @private  */
    ConnectorDrawingTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    /**
     * @param args
     * @private
     */
    ConnectorDrawingTool.prototype.mouseLeave = function (args) {
        if (this.inAction) {
            this.mouseUp(args);
        }
    };
    return ConnectorDrawingTool;
}(ConnectTool));
export { ConnectorDrawingTool };
var TextDrawingTool = /** @class */ (function (_super) {
    __extends(TextDrawingTool, _super);
    function TextDrawingTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * @param args
     * @private
     */
    TextDrawingTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.commandHandler.clearSelection();
        var node = {
            shape: { type: 'Text' },
            offsetX: this.currentPosition.x,
            offsetY: this.currentPosition.y
        };
        if (!args.source) {
            this.drawingNode = this.commandHandler.drawObject(node);
        }
    };
    /**
     * @param args
     * @private
     */
    TextDrawingTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (!this.drawingNode) {
            var node = {
                shape: { type: 'Text' }, offsetX: this.currentPosition.x, width: 30, height: 30,
                // EJ2-42640-Text size is different if Text Node is created over another diagram commited by sivakumar sekar
                // commanded style property and added it after the object is drawn
                // style: { strokeDashArray: '2 2', fill: 'transparent' },
                offsetY: this.currentPosition.y
            };
            this.drawingNode = this.commandHandler.drawObject(node);
            this.drawingNode.style.strokeDashArray = '2 2';
            this.drawingNode.style.fill = 'transparent';
        }
        else {
            this.drawingNode.style.strokeColor = 'black';
            this.drawingNode.style.strokeDashArray = '2 2';
            this.drawingNode.style.fill = 'transparent';
        }
        if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
            var rect = Rect.toBounds([this.prevPosition, this.currentPosition]);
            this.commandHandler.updateNodeDimension(this.drawingNode, rect);
        }
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    TextDrawingTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        if (this.drawingNode) {
            this.drawingNode.style.strokeColor = 'none';
            this.drawingNode.style.fill = 'none';
        }
        else {
            this.drawingNode = args.source;
        }
        if (this.drawingNode && (this.drawingNode instanceof Node)) {
            this.commandHandler.addText(this.drawingNode, this.currentPosition);
        }
        _super.prototype.mouseUp.call(this, args);
        this.inAction = false;
    };
    /**   @private  */
    TextDrawingTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    return TextDrawingTool;
}(ToolBase));
export { TextDrawingTool };
/**
 * Pans the diagram control on drag
 */
var ZoomPanTool = /** @class */ (function (_super) {
    __extends(ZoomPanTool, _super);
    function ZoomPanTool(commandHandler, zoom) {
        var _this = _super.call(this, commandHandler) || this;
        _this.zooming = zoom;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    ZoomPanTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        this.commandHandler.setBlazorDiagramProps(true);
    };
    /**
     * @param args
     * @private
     */
    ZoomPanTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            if (!this.zooming && Point.equals(this.currentPosition, this.prevPosition) === false) {
                var difX = this.currentPosition.x - this.prevPosition.x;
                var difY = this.currentPosition.y - this.prevPosition.y;
                this.commandHandler.scroll(difX, difY, this.currentPosition);
            }
            else if (args.moveTouches && args.moveTouches.length && args.moveTouches.length >= 2) {
                var startTouch0 = args.startTouches[0];
                var startTouch1 = args.startTouches[1];
                var moveTouch0 = args.moveTouches[0];
                var moveTouch1 = args.moveTouches[1];
                var scale = this.getDistance(moveTouch0, moveTouch1) / this.getDistance(startTouch0, startTouch1);
                var focusPoint = args.position;
                // 927527: Diagram flickers while performing pinch zoom
                if (scale !== 1) {
                    this.commandHandler.zoom(scale, 0, 0, focusPoint);
                }
                this.updateTouch(startTouch0, moveTouch0);
                this.updateTouch(startTouch1, moveTouch1);
            }
        }
        this.commandHandler.dataBinding();
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    ZoomPanTool.prototype.mouseUp = function (args) {
        this.commandHandler.setBlazorDiagramProps(false);
        this.checkPropertyValue();
        this.commandHandler.updatePanState(false);
        _super.prototype.mouseUp.call(this, args);
        this.inAction = false;
    };
    /**   @private  */
    ZoomPanTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    ZoomPanTool.prototype.getDistance = function (touch1, touch2) {
        var x = touch2.pageX - touch1.pageX;
        var y = touch2.pageY - touch1.pageY;
        return Math.sqrt((x * x) + (y * y));
    };
    ZoomPanTool.prototype.updateTouch = function (startTouch, moveTouch) {
        startTouch.pageX = moveTouch.pageX;
        startTouch.pageY = moveTouch.pageY;
    };
    return ZoomPanTool;
}(ToolBase));
export { ZoomPanTool };
/**
 * Animate the layout during expand and collapse
 */
var ExpandTool = /** @class */ (function (_super) {
    __extends(ExpandTool, _super);
    function ExpandTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * @param args
     * @private
     */
    ExpandTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        this.commandHandler.initExpand(args);
        _super.prototype.mouseUp.call(this, args);
    };
    return ExpandTool;
}(ToolBase));
export { ExpandTool };
/**
 * Opens the annotation hypeLink at mouse up
 */
var LabelTool = /** @class */ (function (_super) {
    __extends(LabelTool, _super);
    function LabelTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * @param args
     * @private
     */
    LabelTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        var tab = '_blank';
        var windowOption = '';
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var screenTop = window.screenTop;
        var screenLeft = window.screenLeft;
        if (args.sourceWrapper.hyperlink.hyperlinkOpenState === 'CurrentTab') {
            tab = '_self';
        }
        else if (args.sourceWrapper.hyperlink.hyperlinkOpenState === 'NewWindow') {
            windowOption = 'height=' + windowHeight + ',width=' + windowWidth + ',top=' + screenTop + ',left=' + screenLeft;
        }
        var win = window.open(args.sourceWrapper.hyperlink.link, tab, windowOption);
        win.focus();
        _super.prototype.mouseUp.call(this, args);
    };
    return LabelTool;
}(ToolBase));
export { LabelTool };
/**
 * Draws a Polygon shape node dynamically using polygon Tool
 */
var PolygonDrawingTool = /** @class */ (function (_super) {
    __extends(PolygonDrawingTool, _super);
    function PolygonDrawingTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * @param args
     * @private
     */
    PolygonDrawingTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        if (!this.drawingObject) {
            this.startPoint = { x: this.startPosition.x, y: this.startPosition.y };
            var node = {
                offsetX: this.currentPosition.x,
                offsetY: this.currentPosition.y,
                width: 5, height: 5,
                // 916722: Apply custom style to polygon shape by removing the default style during polygon drawing.
                shape: {
                    type: 'Basic',
                    shape: 'Polygon',
                    points: [{ x: this.startPoint.x, y: this.startPoint.y }, { x: this.currentPosition.x, y: this.currentPosition.y }]
                }
            };
            // 920152: elementDraw event not triggered for Polygon Drawing tool
            this.triggerElementDrawEvent(args.source, 'Start', 'Node', this.getShapeType(), true);
            this.drawingObject = this.commandHandler.drawObject(node);
        }
        else {
            var pt = void 0;
            var obj = this.drawingObject.shape;
            pt = obj.points[obj.points.length - 1];
            pt = { x: pt.x, y: pt.y };
            this.drawingObject.shape.points.push(pt);
        }
    };
    /**
     * @param args
     * @private
     */
    PolygonDrawingTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            var obj = this.drawingObject.shape;
            obj.points[obj.points.length - 1].x = this.currentPosition.x;
            obj.points[obj.points.length - 1].y = this.currentPosition.y;
            this.drawingObject.wrapper.children[0].data = getPolygonPath(this.drawingObject.shape.points);
            // 920152: elementDraw event not triggered for Polygon Drawing tool
            this.triggerElementDrawEvent(this.drawingObject, 'Progress', 'Node', this.getShapeType(), false);
            if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
                var region = Rect.toBounds(this.drawingObject.shape.points);
                this.commandHandler.updateNodeDimension(this.drawingObject, region);
            }
        }
        return true;
    };
    /**
     * @param args
     * @param dblClickArgs
     * @param args
     * @param dblClickArgs
     * @private
     */
    PolygonDrawingTool.prototype.mouseUp = function (args, dblClickArgs) {
        this.checkPropertyValue();
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            this.inAction = false;
            this.commandHandler.addObjectToDiagram(this.drawingObject);
            // 920152: elementDraw event not triggered for Polygon Drawing tool
            this.triggerElementDrawEvent(this.drawingObject, 'Completed', 'Node', this.getShapeType(), false);
        }
        this.endAction();
    };
    /**
     * @param args
     * @private
     */
    PolygonDrawingTool.prototype.mouseWheel = function (args) {
        _super.prototype.mouseWheel.call(this, args);
        this.mouseMove(args);
    };
    /**   @private  */
    PolygonDrawingTool.prototype.endAction = function () {
        this.inAction = false;
        this.drawingObject = null;
    };
    return PolygonDrawingTool;
}(ToolBase));
export { PolygonDrawingTool };
/**
 * Draws a PolyLine Connector dynamically using PolyLine Drawing Tool
 */
var PolyLineDrawingTool = /** @class */ (function (_super) {
    __extends(PolyLineDrawingTool, _super);
    function PolyLineDrawingTool(commandHandler) {
        var _this = _super.call(this, commandHandler, true) || this;
        _this.connectorEndPoint = 'ConnectorSourceEnd';
        return _this;
    }
    /**
     * @param args
     * @private
     */
    PolyLineDrawingTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var canConnect = false;
        if (this.inAction) {
            var obj = this.drawingObject;
            // 988501 : PolyLine connector snapping support in Diagram
            this.currentPosition = this.commandHandler.snapConnectorEnd(this.currentPosition);
            obj.targetPoint = this.currentPosition;
            // 920152: elementDraw event not triggered for Polyline Drawing tool
            // 927554: ElementDraw Arguments updated wrongly for Polyline drawing
            this.triggerElementDrawEvent(this.drawingObject, 'Progress', 'Connector', this.commandHandler.diagram.drawingObject.type, false);
            this.commandHandler.updateConnectorPoints(obj);
            // 962382: Drawing polyLine from port and node
            args.source = this.drawingObject;
            if (args.target && !args.target.isLane && args.targetWrapper) {
                canConnect = this.canConnect(args.targetWrapper, args.target, this.connectorEndPoint, 'In');
                if (canConnect) {
                    this.commandHandler.renderHighlighter(args, this.connectorEndPoint === 'ConnectorSourceEnd');
                }
            }
            if (this.connectorEndPoint === 'ConnectorSourceEnd' && (args.actualObject && args.actualObject instanceof Node && args.sourceWrapper)) {
                if (args.source.sourceID === '' || args.source.sourceID !== args.source.targetID) {
                    this.commandHandler.connect(this.connectorEndPoint, args);
                }
            }
            this.connectorEndPoint = 'ConnectorTargetEnd';
        }
        if (!this.inAction) {
            this.commandHandler.updateSelector();
            if (args.source && !args.source.isLane && args.sourceWrapper) {
                canConnect = this.canConnect(args.sourceWrapper, args.source, this.connectorEndPoint, 'Out');
                if (canConnect) {
                    this.commandHandler.renderHighlighter(args, true);
                }
            }
        }
        return true;
    };
    /**
     * @param args
     * @private
     */
    PolyLineDrawingTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        if (!this.drawingObject) {
            var connector = {
                id: 'Connector',
                type: 'Straight',
                sourcePoint: this.currentPosition,
                targetPoint: this.currentPosition
            };
            // 920152: elementDraw event not triggered for Polyline Drawing tool
            this.triggerElementDrawEvent(args.source, 'Start', 'Connector', this.commandHandler.diagram.drawingObject.type, true);
            if (this.inAction) {
                this.drawingObject = this.commandHandler.drawObject(connector);
            }
        }
        else {
            var drawObject = this.drawingObject;
            var segment = void 0;
            segment = new StraightSegment(drawObject, 'segments', { type: 'Straight' }, true);
            segment.point = this.currentPosition;
            drawObject.segments[drawObject.segments.length - 1] = segment;
        }
    };
    /**
     * @param args
     * @private
     */
    PolyLineDrawingTool.prototype.mouseWheel = function (args) {
        _super.prototype.mouseWheel.call(this, args);
        this.mouseMove(args);
    };
    /**
     * @param args
     * @private
     */
    PolyLineDrawingTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            if (this.drawingObject) {
                // 962382: Drawing polyLine from port and node
                if (this.connectorEndPoint === 'ConnectorTargetEnd') {
                    var eventhandler = this.commandHandler.diagram.eventHandler;
                    var hoverObject = eventhandler.hoverElement;
                    if (hoverObject) {
                        hoverObject = hoverObject instanceof Node ? hoverObject : hoverObject.parentObj;
                        var padding = eventhandler.getConnectorPadding(args);
                        /* eslint-disable max-len */
                        var wrapper = this.commandHandler.diagram.findElementUnderMouse(hoverObject, this.currentPosition, this.commandHandler.diagram, padding);
                        var isMouseAboveObject = wrapper && wrapper.bounds.containsPoint(this.currentPosition, padding);
                        if (isMouseAboveObject) {
                            args.actualObject = hoverObject;
                            args.target = hoverObject;
                            args.targetWrapper = wrapper;
                            if (this.drawingObject.sourceID !== args.target.id) {
                                this.commandHandler.connect(this.connectorEndPoint, args);
                            }
                        }
                    }
                }
                var drawObject = this.drawingObject;
                drawObject.segments[drawObject.segments.length - 1].point = { x: 0, y: 0 };
                this.commandHandler.addObjectToDiagram(this.drawingObject);
                // 920152: elementDraw event not triggered for Polyline Drawing tool
                // 927554: ElementDraw Arguments updated wrongly for Polyline drawing
                this.triggerElementDrawEvent(this.drawingObject, 'Completed', 'Connector', this.commandHandler.diagram.drawingObject.type, false);
            }
        }
        this.endAction();
    };
    /**   @private  */
    PolyLineDrawingTool.prototype.endAction = function () {
        this.drawingObject = null;
        this.inAction = false;
    };
    /**   @private  */
    PolyLineDrawingTool.prototype.canConnect = function (wrapper, object, endpoint, connectionType) {
        var canConnect = false;
        var targetObject = this.commandHandler.findTarget(wrapper, object, endpoint === 'ConnectorSourceEnd', true);
        if (targetObject instanceof PointPort) {
            canConnect = Boolean(connectionType === 'In' ?
                (this.connectorEndPoint === 'ConnectorTargetEnd' && canPortInConnect(targetObject)) :
                (this.connectorEndPoint === 'ConnectorSourceEnd' && canPortOutConnect(targetObject)));
        }
        else if (targetObject instanceof Node) {
            canConnect = Boolean(connectionType === 'In' ?
                (this.connectorEndPoint === 'ConnectorTargetEnd' && canInConnect(targetObject)) :
                (this.connectorEndPoint === 'ConnectorSourceEnd' && canOutConnect(targetObject)));
        }
        return canConnect;
    };
    return PolyLineDrawingTool;
}(ToolBase));
export { PolyLineDrawingTool };
var LabelDragTool = /** @class */ (function (_super) {
    __extends(LabelDragTool, _super);
    function LabelDragTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * @param args
     * @private
     */
    LabelDragTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        this.undoElement = cloneObject(args.source);
        this.annotationId = args.sourceWrapper.id;
        _super.prototype.mouseDown.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    LabelDragTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var difx = this.currentPosition.x - this.prevPosition.x;
        var dify = this.currentPosition.y - this.prevPosition.y;
        var node = args.source;
        if (node instanceof Node) {
            var matrix = identityMatrix();
            rotateMatrix(matrix, -node.rotateAngle, 0, 0);
            var diff = transformPointByMatrix(matrix, { x: difx, y: dify });
            difx = diff.x;
            dify = diff.y;
        }
        if (this.inAction) {
            this.commandHandler.labelDrag(args.source, args.sourceWrapper, difx, dify);
            this.commandHandler.updateSelector();
        }
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    LabelDragTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        var redoValue = args.source;
        this.inAction = false;
        var entryValue = {
            type: 'AnnotationPropertyChanged',
            objectId: this.annotationId, undoObject: cloneObject(this.undoElement),
            category: 'Internal', redoObject: cloneObject(redoValue)
        };
        this.commandHandler.addHistoryEntry(entryValue);
        _super.prototype.mouseUp.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    LabelDragTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    return LabelDragTool;
}(ToolBase));
export { LabelDragTool };
var LabelResizeTool = /** @class */ (function (_super) {
    __extends(LabelResizeTool, _super);
    function LabelResizeTool(commandHandler, corner) {
        var _this = _super.call(this, commandHandler, true) || this;
        _this.corner = corner;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    LabelResizeTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        var object = (args.source.nodes.length) ?
            args.source.nodes[0] : args.source.connectors[0];
        this.annotationId = args.source.wrapper.children[0].id;
        this.undoElement = cloneObject(object);
        var annotation = args.source.wrapper.children[0];
        this.initialBounds = {
            x: annotation.offsetX,
            y: annotation.offsetY,
            width: annotation.actualSize.width,
            height: annotation.actualSize.height
        };
        _super.prototype.mouseDown.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    LabelResizeTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            this.resizeObject(args);
        }
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    LabelResizeTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        var redoObject = (args.source.nodes.length) ?
            args.source.nodes[0] : args.source.connectors[0];
        this.inAction = false;
        var entry = {
            type: 'AnnotationPropertyChanged', objectId: this.annotationId,
            redoObject: cloneObject(redoObject), undoObject: cloneObject(this.undoElement), category: 'Internal'
        };
        this.commandHandler.addHistoryEntry(entry);
        _super.prototype.mouseUp.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    LabelResizeTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    /**
     * @param args
     * @private
     */
    LabelResizeTool.prototype.resizeObject = function (args) {
        var object;
        object = (args.source.nodes.length) ? args.source.nodes[0] : args.source.connectors[0];
        var textElement = args.source.wrapper.children[0];
        var deltaWidth;
        var deltaHeight;
        var center = { x: textElement.offsetX, y: textElement.offsetY };
        var rotateAngle = textElement.rotateAngle;
        rotateAngle += (object instanceof Node) ? object.rotateAngle : 0;
        rotateAngle = (rotateAngle + 360) % 360;
        var trans = identityMatrix();
        var corner = this.corner.slice(5);
        var pivot = this.updateSize(textElement, this.startPosition, this.currentPosition, corner, this.initialBounds, rotateAngle);
        var x = textElement.offsetX - textElement.actualSize.width * textElement.pivot.x;
        var y = textElement.offsetY - textElement.actualSize.height * textElement.pivot.y;
        var pivotPoint = this.getPivot(corner);
        if (textElement.flippedPoint) {
            if (textElement.flip === FlipDirection.Horizontal && textElement.horizontalAlignment !== 'Center') {
                pivotPoint.x = 1 - pivotPoint.x;
                if (rotateAngle !== 0) {
                    var normalized = ((rotateAngle % 360) + 360) % 360;
                    rotateAngle = normalized === 0 ? 0 : (360 - normalized);
                }
            }
            else if (textElement.flip === FlipDirection.Vertical && textElement.verticalAlignment !== 'Center') {
                pivotPoint.y = 1 - pivotPoint.y;
                if (rotateAngle !== 0) {
                    var normalized = ((rotateAngle % 360) + 360) % 360;
                    rotateAngle = normalized === 0 ? 0 : (360 - normalized);
                }
            }
            if (textElement.flip === FlipDirection.Both) {
                if (textElement.horizontalAlignment !== 'Center') {
                    pivotPoint.x = 1 - pivotPoint.x;
                }
                if (textElement.verticalAlignment !== 'Center') {
                    pivotPoint.y = 1 - pivotPoint.y;
                }
            }
        }
        rotateMatrix(trans, rotateAngle, center.x, center.y);
        pivotPoint = { x: x + textElement.actualSize.width * pivotPoint.x, y: y + textElement.actualSize.height * pivotPoint.y };
        var point = transformPointByMatrix(trans, pivotPoint);
        pivot.x = point.x;
        pivot.y = point.y;
        deltaWidth = pivot.width;
        deltaHeight = pivot.height;
        deltaWidth = (deltaWidth < 0) ? 1 : deltaWidth;
        deltaHeight = (deltaHeight < 0) ? 1 : deltaHeight;
        this.commandHandler.labelResize(object, args.source.annotation, deltaWidth, deltaHeight, pivot, args.source);
        this.commandHandler.updateSelector();
    };
    return LabelResizeTool;
}(ToolBase));
export { LabelResizeTool };
var LabelRotateTool = /** @class */ (function (_super) {
    __extends(LabelRotateTool, _super);
    function LabelRotateTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * @param args
     * @private
     */
    LabelRotateTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        this.annotationId = args.source.wrapper.children[0].id;
        var object = (args.source.nodes.length) ?
            args.source.nodes[0] : args.source.connectors[0];
        this.undoElement = cloneObject(object);
        _super.prototype.mouseDown.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    LabelRotateTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (args.source) {
            if (this.inAction) {
                var object = args.source.nodes[0] ? args.source.nodes[0] :
                    args.source.connectors[0];
                var annotation = void 0;
                annotation = (args.source.annotation);
                this.commandHandler.labelRotate(object, annotation, this.currentPosition, args.source);
                this.commandHandler.updateSelector();
            }
        }
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    LabelRotateTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        this.inAction = false;
        var redoEntry = (args.source.nodes.length) ?
            args.source.nodes[0] : args.source.connectors[0];
        var entryObject = {
            type: 'AnnotationPropertyChanged', objectId: this.annotationId,
            redoObject: cloneObject(redoEntry),
            undoObject: cloneObject(this.undoElement), category: 'Internal'
        };
        this.commandHandler.addHistoryEntry(entryObject);
        _super.prototype.mouseUp.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    LabelRotateTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    return LabelRotateTool;
}(ToolBase));
export { LabelRotateTool };
/**
 * EJ2-33302 - Freehand drawing support in diagram control.
 */
var FreeHandTool = /** @class */ (function (_super) {
    __extends(FreeHandTool, _super);
    function FreeHandTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * mouseMove - Collect the points using current mouse position and convert it into pathData.
     * @param args
     * @private
     */
    FreeHandTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            var obj = this.drawingObject.shape;
            var pt = this.currentPosition;
            obj.points.push(pt);
            this.drawingObject.wrapper.children[0].data = getFreeHandPath(this.drawingObject.shape.points);
            obj.data = getFreeHandPath(obj.points);
            // 920152: elementDraw event not triggered for Freehand Drawing tool
            this.triggerElementDrawEvent(args.source, 'Progress', 'Connector', this.drawingObject.type, false);
            if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
                var region = Rect.toBounds(this.drawingObject.shape.points);
                this.commandHandler.updateNodeDimension(this.drawingObject, region);
            }
        }
        return true;
    };
    /**
     * @param args
     * @private
     */
    FreeHandTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        this.startPoint = { x: this.startPosition.x, y: this.startPosition.y };
        var node = {
            offsetX: this.currentPosition.x,
            offsetY: this.currentPosition.y,
            width: 5, height: 5,
            style: { strokeColor: 'black', strokeWidth: 1, fill: 'transparent' },
            shape: {
                type: 'Path',
                points: [{ x: this.startPoint.x, y: this.startPoint.y }, { x: this.currentPosition.x, y: this.currentPosition.y }]
            }
        };
        // 920152: elementDraw event not triggered for Freehand Drawing tool
        this.triggerElementDrawEvent(args.source, 'Start', 'Connector', this.commandHandler.diagram.drawingObject.type, true);
        this.drawingObject = this.commandHandler.drawObject(node);
    };
    /**
     * mouseUp - Remove the drawn object. Reduce and smoothen the collected points and create
     * a bezier connector using the smoothened points.
     * @param args
     * @private
     */
    FreeHandTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        var tolerance = 10;
        var smoothValue = 0.5;
        if (this.inAction) {
            this.inAction = false;
            var obj = this.drawingObject.shape;
            var points = obj.points;
            this.commandHandler.addObjectToDiagram(this.drawingObject);
            var prevId = this.drawingObject.id;
            var prevObj = this.commandHandler.diagram.nameTable["" + prevId];
            this.commandHandler.diagram.remove(prevObj);
            points = this.pointReduction(points, tolerance);
            // Bug 1009831: Freehand connector end points are snapped to the nearest snap positions.
            this.commandHandler.snapConnectorEnd(points[0]);
            this.commandHandler.snapConnectorEnd(points[points.length - 1]);
            // 927557: controlPointsVisibility Property values not considered in Freehand drawing
            var bezierSettings = {};
            if (this.commandHandler.diagram.drawingObject.bezierSettings) {
                bezierSettings = this.commandHandler.diagram.drawingObject.bezierSettings;
            }
            if (bezierSettings.allowSegmentsReset === undefined) {
                bezierSettings.allowSegmentsReset = false;
            }
            //EJ2-69816 - Added below code to set the allow segment reset as false to avoid the unwanted segment reset.
            var newObj = {
                id: 'newConnector' + randomId(), type: 'Bezier',
                sourcePoint: { x: points[0].x, y: points[0].y }, targetPoint: { x: points[points.length - 1].x, y: points[points.length - 1].y },
                //EJ2-873504[BUG]- Source and target decorator for free hand connector is not rendered.
                segments: [], bezierSettings: bezierSettings
            };
            this.drawingObject = this.commandHandler.drawObject(newObj);
            this.drawingObject = this.bezierCurveSmoothness(points, smoothValue, this.drawingObject, obj);
            this.commandHandler.updateConnectorPoints(this.drawingObject);
            this.commandHandler.addObjectToDiagram(this.drawingObject);
            // 920152: elementDraw event not triggered for Freehand Drawing tool
            // 927554: ElementDraw Arguments updated wrongly for Freehand drawing
            this.triggerElementDrawEvent(this.drawingObject, 'Completed', 'Connector', this.commandHandler.diagram.drawingObject.type, false);
            //(EJ2-70838)- Added code to resolve style property not added dynamically for freehand connector
            // Added code to resolve style property not added dynamically for freehand connector
            _super.prototype.mouseUp.call(this, args);
        }
    };
    /**
     * Reduce the collected points based on tolerance value.
     * @param points
     * @param tolerance
     * @returns points
     */
    FreeHandTool.prototype.pointReduction = function (points, tolerance) {
        if (points === null || points.length < 3) {
            return points;
        }
        var firstPoint = 0;
        var lastPoint = points.length - 1;
        var pointIndex = [];
        pointIndex.push(firstPoint);
        pointIndex.push(lastPoint);
        while (points[parseInt(firstPoint.toString(), 10)] === (points[parseInt(lastPoint.toString(), 10)])) {
            lastPoint--;
        }
        this.reduction(points, firstPoint, lastPoint, tolerance, pointIndex);
        var returnedPoints = [];
        pointIndex.sort(function (a, b) { return a - b; });
        pointIndex.forEach(function (element) {
            returnedPoints.push(points[parseInt(element.toString(), 10)]);
        });
        return returnedPoints;
    };
    FreeHandTool.prototype.reduction = function (points, firstPoint, lastPoint, tolerance, pointIndex) {
        var maxDistance = 0;
        var largestPointIndex = 0;
        for (var i = firstPoint; i < lastPoint; i++) {
            var distance = this.perpendicularDistance(points[parseInt(firstPoint.toString(), 10)], points[parseInt(lastPoint.toString(), 10)], points[parseInt(i.toString(), 10)]);
            if (distance > maxDistance) {
                maxDistance = distance;
                largestPointIndex = i;
            }
        }
        if (maxDistance > tolerance && largestPointIndex !== 0) {
            pointIndex.push(largestPointIndex);
            this.reduction(points, firstPoint, largestPointIndex, tolerance, pointIndex);
            this.reduction(points, largestPointIndex, lastPoint, tolerance, pointIndex);
        }
    };
    /**
     * Calculate the perpendicular distance of each point with first and last points
     * @param point1
     * @param point2
     * @param point3
     * @returns
     */
    FreeHandTool.prototype.perpendicularDistance = function (point1, point2, point3) {
        var area = Math.abs(.5 * ((point1.x * point2.y - point2.x * point1.y) +
            (point2.x * point3.y - point3.x * point2.y) + (point3.x * point1.y - point1.x * point3.y)));
        var base = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
        var height = area / base * 2;
        return height;
    };
    /**
     * Smoothen the bezier curve based on the points and smoothValue.
     * @param points
     * @param smoothValue
     * @param drawingObject
     * @param obj
     * @returns drawingObject
     */
    FreeHandTool.prototype.bezierCurveSmoothness = function (points, smoothValue, drawingObject, obj) {
        if (points.length < 3) {
            return drawingObject;
        }
        for (var i = 0; i < points.length - 1; i++) {
            var pointx1 = points[parseInt(i.toString(), 10)].x;
            var pointy1 = points[parseInt(i.toString(), 10)].y;
            var pointx2 = points[i + 1].x;
            var pointy2 = points[i + 1].y;
            var pointx0 = void 0;
            var pointy0 = void 0;
            if (i === 0) {
                var previousPoint = points[parseInt(i.toString(), 10)];
                pointx0 = previousPoint.x;
                pointy0 = previousPoint.y;
            }
            else {
                pointx0 = points[i - 1].x;
                pointy0 = points[i - 1].y;
            }
            var pointx3 = void 0;
            var pointy3 = void 0;
            if (i === points.length - 2) {
                var nextPoint = points[i + 1];
                pointx3 = nextPoint.x;
                pointy3 = nextPoint.y;
            }
            else {
                pointx3 = points[i + 2].x;
                pointy3 = points[i + 2].y;
            }
            var xc1 = (pointx0 + pointx1) / 2.0;
            var yc1 = (pointy0 + pointy1) / 2.0;
            var xc2 = (pointx1 + pointx2) / 2.0;
            var yc2 = (pointy1 + pointy2) / 2.0;
            var xc3 = (pointx2 + pointx3) / 2.0;
            var yc3 = (pointy2 + pointy3) / 2.0;
            var point0 = {};
            var point1 = {};
            var point2 = {};
            var point3 = {};
            point0.x = pointx0;
            point0.y = pointy0;
            point1.x = pointx1;
            point1.y = pointy1;
            point2.x = pointx2;
            point2.y = pointy2;
            point3.x = pointx3;
            point3.y = pointy3;
            var len1 = Point.findLength(point0, point1);
            var len2 = Point.findLength(point1, point2);
            var len3 = Point.findLength(point2, point3);
            var k1 = len1 / (len1 + len2);
            var k2 = len2 / (len2 + len3);
            var xm1 = xc1 + (xc2 - xc1) * k1;
            var ym1 = yc1 + (yc2 - yc1) * k1;
            var xm2 = xc2 + (xc3 - xc2) * k2;
            var ym2 = yc2 + (yc3 - yc2) * k2;
            var Controlpointx1 = xm1 + (xc2 - xm1) * smoothValue + pointx1 - xm1;
            var Controlpointy1 = ym1 + (yc2 - ym1) * smoothValue + pointy1 - ym1;
            var Controlpointx2 = xm2 + (xc2 - xm2) * smoothValue + pointx2 - xm2;
            var Controlpointy2 = ym2 + (yc2 - ym2) * smoothValue + pointy2 - ym2;
            var segment = new BezierSegment(obj, 'segments', { type: 'Bezier' }, true);
            var cnPt1 = { x: Controlpointx1, y: Controlpointy1 };
            var cnPt2 = { x: Controlpointx2, y: Controlpointy2 };
            var segSourcePoint = { x: pointx1, y: pointy1 };
            var segTargetPoint = { x: pointx2, y: pointy2 };
            segment.type = 'Bezier';
            drawingObject.segments[parseInt(i.toString(), 10)] = segment;
            if (i === 0) {
                cnPt1 = { x: pointx1, y: pointy1 };
            }
            if (i === points.length - 2) {
                cnPt2 = { x: pointx2, y: pointy2 };
            }
            drawingObject.segments[parseInt(i.toString(), 10)].vector1 = { angle: findAngle(segSourcePoint, cnPt1), distance: Point.findLength(segSourcePoint, cnPt1) };
            drawingObject.segments[parseInt(i.toString(), 10)].vector2 = { angle: findAngle(segTargetPoint, cnPt2), distance: Point.findLength(segTargetPoint, cnPt2) };
            drawingObject.segments[parseInt(i.toString(), 10)].point = segTargetPoint;
        }
        return drawingObject;
    };
    return FreeHandTool;
}(ToolBase));
export { FreeHandTool };
