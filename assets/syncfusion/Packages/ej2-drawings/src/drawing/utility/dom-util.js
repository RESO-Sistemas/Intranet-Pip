import { Rect } from '../primitives/rect';
import { Size } from '../primitives/size';
import { whiteSpaceToString, wordBreakToString, textAlignToString, bBoxText, bBoxTextHeight } from './base-util';
import { identityMatrix, transformPointByMatrix, rotateMatrix } from '../primitives/matrix';
import { createElement, Browser } from '@syncfusion/ej2-base'; /*externalscript*/
/**
 * Defines the functionalities that need to access DOM
 */
export function getChildNode(node) {
    var child;
    var collection = [];
    if (Browser.info.name === 'msie' || Browser.info.name === 'edge') {
        for (var i = 0; i < node.childNodes.length; i++) {
            child = node.childNodes[parseInt(i.toString(), 10)];
            if (child.nodeType === 1) {
                collection.push(child);
            }
        }
    }
    else {
        collection = node.children;
    }
    return collection;
}
export function translatePoints(element, points) {
    var translatedPts = [];
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var point = points_1[_i];
        var pt1 = {
            x: element.offsetX - element.actualSize.width * element.pivot.x + point.x,
            y: element.offsetY - element.actualSize.height * element.pivot.y + point.y
        };
        var matrix = void 0;
        var angle = element.rotateAngle + element.parentTransform;
        if (angle) {
            matrix = identityMatrix();
            rotateMatrix(matrix, angle, element.offsetX, element.offsetY);
        }
        if (matrix) {
            pt1 = transformPointByMatrix(matrix, pt1);
        }
        translatedPts.push(pt1);
    }
    return translatedPts;
}
/** @private */
export function measurePath(data) {
    var path = 'pathTable';
    // eslint-disable-next-line
    if (!window[path]) {
        // eslint-disable-next-line
        window[path] = {};
    }
    if (data) {
        var measureElement = 'measureElement';
        // eslint-disable-next-line
        window[measureElement].style.visibility = 'visible';
        // eslint-disable-next-line
        var svg = window[measureElement].children[2];
        var element = getChildNode(svg)[0];
        element.setAttribute('d', data);
        //let bounds: SVGRect = element.getBBox();
        var bounds = void 0;
        // eslint-disable-next-line
        if (window[path][data]) {
            // eslint-disable-next-line
            bounds = window[path][data];
        }
        else {
            // eslint-disable-next-line
            window[path][data] = bounds = element.getBBox();
            if ((bounds.x === 0 || bounds.y === 0) && (bounds.width === 0 || bounds.height === 0)) {
                // eslint-disable-next-line
                window[path][data] = bounds = getBBox(data);
            }
        }
        var svgBounds = new Rect(bounds.x, bounds.y, bounds.width, bounds.height);
        // eslint-disable-next-line
        window[measureElement].style.visibility = 'hidden';
        return svgBounds;
    }
    return new Rect(0, 0, 0, 0);
}
// tslint:disable-next-line
function getBBox(path) {
    var xmin = 0;
    var xmax = 0;
    var ymin = 0;
    var ymax = 0;
    // tslint:disable-next-line
    var currentValue;
    // tslint:disable-next-line
    var currentpath = path;
    currentpath = currentpath.replace(/[a-z].*/g, ' ').replace(/[\sA-Z]+/gi, ' ').trim().split(' ');
    for (var i = 0; i < currentpath.length; i++) {
        if (currentpath[parseInt(i.toString(), 10)].length > 1) {
            currentValue = currentpath[parseInt(i.toString(), 10)].split(',');
            xmin = xmax = currentValue[0];
            ymin = ymax = currentValue[1];
        }
    }
    for (var i = 0; i < currentpath.length; i++) {
        currentValue = currentpath[parseInt(i.toString(), 10)].split(',');
        if (!currentValue[1]) {
            currentValue[0] = xmin;
            currentValue[1] = ymin;
        }
        xmin = Math.min(xmin, currentValue[0]);
        xmax = Math.max(xmax, currentValue[0]);
        ymin = Math.min(ymin, currentValue[1]);
        ymax = Math.max(ymax, currentValue[1]);
    }
    return { x: xmin, y: ymin, width: xmax - xmin, height: ymax - ymin };
}
function getTextOptions(element, maxWidth) {
    var options = {
        fill: element.style.fill, stroke: element.style.strokeColor, angle: element.rotateAngle + element.parentTransform,
        pivotX: element.pivot.x, pivotY: element.pivot.y, strokeWidth: element.style.strokeWidth,
        dashArray: element.style.strokeDashArray, opacity: element.style.opacity,
        visible: element.visible, id: element.id,
        width: maxWidth || element.actualSize.width, height: element.actualSize.height,
        x: element.offsetX - element.actualSize.width * element.pivot.x + 0.5,
        y: element.offsetY - element.actualSize.height * element.pivot.y + 0.5,
        relativeMode: element.relativeMode
    };
    options.fontSize = element.style.fontSize;
    options.fontFamily = element.style.fontFamily;
    options.textOverflow = element.style.textOverflow;
    options.textDecoration = element.style.textDecoration;
    options.doWrap = element.doWrap;
    options.whiteSpace = whiteSpaceToString(element.style.whiteSpace, element.style.textWrapping);
    options.content = element.content;
    options.textWrapping = element.style.textWrapping;
    options.breakWord = wordBreakToString(element.style.textWrapping);
    options.textAlign = textAlignToString(element.style.textAlign);
    options.color = element.style.color;
    options.italic = element.style.italic;
    options.bold = element.style.bold;
    if (element.thickness !== undefined) {
        options.thickness = element.thickness;
    }
    options.dashArray = '';
    options.strokeWidth = element.style.strokeWidth;
    options.fill = '';
    return options;
}
/** @private */
function wrapSvgTextEJ2(text, textValue, maxHeight) {
    var childNodes = [];
    var k = 0;
    var txtValue;
    var bounds1;
    var content = textValue || text.content;
    if (text.whiteSpace !== 'nowrap' && text.whiteSpace !== 'pre') {
        if (text.breakWord === 'breakall') {
            txtValue = '';
            txtValue += content[0];
            for (k = 0; k < content.length; k++) {
                bounds1 = bBoxText(txtValue, text);
                if (bounds1 >= text.width && txtValue.length > 0) {
                    childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: bounds1 };
                    txtValue = '';
                }
                else {
                    txtValue = txtValue + (content[k + 1] || '');
                    // if (txtValue.indexOf('\n') > -1) {
                    //     txtValue = txtValue.replace('\n', '');
                    // }
                    var width = bBoxText(txtValue, text);
                    if ((Math.ceil(width) + 2 >= text.width && txtValue.length > 0) || (txtValue.indexOf('\n') > -1)) {
                        childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                        txtValue = '';
                    }
                    if (k === content.length - 1 && txtValue.length > 0) {
                        childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                        txtValue = '';
                    }
                }
            }
        }
        else {
            childNodes = wordWrappingEJ2(text, textValue, maxHeight);
        }
    }
    else {
        childNodes[childNodes.length] = { text: content, x: 0, dy: 0, width: bBoxText(content, text) };
    }
    return childNodes;
}
/** @private */
function wordWrappingEJ2(text, textValue, maxHeight) {
    var childNodes = [];
    var txtValue = '';
    var j = 0;
    var i = 0;
    var wrap = text.whiteSpace !== 'nowrap' ? true : false;
    var content = textValue || text.content;
    var bounds1;
    var eachLine = content.split('\n');
    var txt;
    var words;
    var newText;
    var height = 0;
    var existingWidth;
    var existingText;
    for (j = 0; j < eachLine.length; j++) {
        txt = '';
        words = text.textWrapping !== 'NoWrap' ? eachLine[parseInt(j.toString(), 10)].split(' ') : eachLine;
        for (i = 0; i < words.length; i++) {
            bounds1 = bBoxText(words[parseInt(i.toString(), 10)], text);
            if (bounds1 > text.width && words[parseInt(i.toString(), 10)].length > 0 && text.textWrapping !== 'NoWrap') {
                if (eachLine.length > 1) {
                    words[parseInt(i.toString(), 10)] = words[parseInt(i.toString(), 10)] + '\n';
                }
                var previousTextContent = text.content;
                text.content = words[parseInt(i.toString(), 10)];
                //childNodes = wrapText(text, txtValue, childNodes, maxHeight, height);
                var res = wrapTextEJ2(text, txtValue, childNodes, maxHeight, height);
                childNodes = res.childNode;
                height = res.height;
                text.content = previousTextContent;
            }
            else {
                txtValue += (((i !== 0 || words.length === 1) && wrap && txtValue.length > 0) ? ' ' : '') + words[parseInt(i.toString(), 10)];
                newText = txtValue + (words[i + 1] || '');
                var width = bBoxText(newText, text);
                if (text.content[text.content.indexOf(txtValue) + txtValue.length] === ' ') {
                    width += bBoxText(' ', text);
                }
                if (eachLine.length > 1 && i === words.length - 1) {
                    txtValue = txtValue + '\n';
                }
                if (Math.floor(width) > text.width - 2 && txtValue.length > 0) {
                    textValue = txtValue;
                    var differenceValue = (text.fontSize * 1.2) - bBoxTextHeight(txtValue, text);
                    height = height + bBoxTextHeight(txtValue, text) + differenceValue;
                    if (maxHeight === undefined || maxHeight === null || height <= maxHeight || (height > maxHeight && childNodes.length === 0)) {
                        childNodes[childNodes.length] = {
                            text: (txtValue.indexOf('\n') === -1 && i !== words.length - 1) ? txtValue + ' ' : textValue, x: 0, dy: 0,
                            width: newText === txtValue ? width : (txtValue === existingText) ? existingWidth : bBoxText(txtValue, text)
                        };
                    }
                    txtValue = '';
                }
                else {
                    if (i === words.length - 1) {
                        var differenceValue = (text.fontSize * 1.2) - bBoxTextHeight(txtValue, text);
                        height = height + bBoxTextHeight(txtValue, text) + differenceValue;
                        if (maxHeight === undefined || height <= maxHeight || (height > maxHeight && childNodes.length === 0)) {
                            childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                            txtValue = '';
                        }
                    }
                }
                existingText = newText;
                existingWidth = width;
            }
        }
    }
    return childNodes;
}
/** @private */
function wrapTextEJ2(txt, textValue, childNode, maxHeight, height) {
    var k = 0;
    var txtValue;
    var bounds1;
    var content = textValue || txt.content;
    txtValue = '';
    txtValue += content[0];
    var isFreeTextHeightAllowed;
    for (k = 0; k < content.length; k++) {
        bounds1 = bBoxText(txtValue, txt);
        if (bounds1 >= txt.width && txtValue.length > 0) {
            var differenceValue = (txt.fontSize * 1.2) - bBoxTextHeight(txtValue, txt);
            height = height + bBoxTextHeight(txtValue, txt) + differenceValue;
            if (maxHeight === undefined || maxHeight === null || height <= maxHeight || (height > maxHeight && childNode.length === 0)) {
                childNode[childNode.length] = { text: txtValue, x: 0, dy: 0, width: bounds1 };
            }
            txtValue = '';
        }
        else {
            txtValue = txtValue + (content[k + 1] || '');
            var width = bBoxText(txtValue, txt);
            if ((Math.ceil(width) + 2 >= txt.width && txtValue.length > 0)) {
                txtValue = txtValue.slice(0, -1);
                var differenceValue = (txt.fontSize * 1.2) - bBoxTextHeight(txtValue, txt);
                height = height + bBoxTextHeight(txtValue, txt) + differenceValue;
                width = bBoxText(txtValue, txt);
                isFreeTextHeightAllowed = (maxHeight === undefined || maxHeight === null || height <= maxHeight || (height > maxHeight && childNode.length === 0));
                if (isFreeTextHeightAllowed) {
                    childNode[childNode.length] = { text: txtValue, x: 0, dy: 0, width: width };
                }
                txtValue = content[k + 1] || '';
            }
            if (k === content.length - 1 && txtValue.length > 0) {
                var differenceValue = (txt.fontSize * 1.2) - bBoxTextHeight(txtValue, txt);
                height = height + bBoxTextHeight(txtValue, txt) + differenceValue;
                isFreeTextHeightAllowed = (maxHeight === undefined || maxHeight === null || height <= maxHeight || (height > maxHeight && childNode.length === 0));
                if (isFreeTextHeightAllowed) {
                    childNode[childNode.length] = { text: txtValue, x: 0, dy: 0, width: width };
                }
                txtValue = '';
            }
        }
    }
    return { childNode: childNode, height: height };
}
/** @private */
function wrapSvgText(text, textValue, maxHeight) {
    var childNodes = [];
    var k = 0;
    var txtValue;
    var bounds1;
    var content = textValue || text.content;
    if (text.whiteSpace !== 'nowrap' && text.whiteSpace !== 'pre') {
        if (text.breakWord === 'breakall') {
            txtValue = '';
            txtValue += content[0];
            for (k = 0; k < content.length; k++) {
                bounds1 = bBoxText(txtValue, text);
                if (txtValue == '\n') {
                    txtValue = content[k + 1];
                    k++;
                }
                if (bounds1 >= text.width && txtValue.length > 0) {
                    txtValue = content[k + 1] == '\n' ? txtValue + content[k + 1] : txtValue;
                    childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: bounds1 };
                    txtValue = '';
                }
                else {
                    txtValue = txtValue + (content[k + 1] || '');
                    // if (txtValue.indexOf('\n') > -1) {
                    //     txtValue = txtValue.replace('\n', '');
                    // }
                    var width = bBoxText(txtValue, text);
                    if ((Math.ceil(width) + 2 >= text.width && txtValue.length > 0) || (txtValue.indexOf('\n') > -1)) {
                        txtValue = txtValue.slice(0, -1);
                        width = bBoxText(txtValue, text);
                        txtValue = content[k + 1] == '\n' ? txtValue + content[k + 1] : txtValue;
                        childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                        txtValue = content[k + 1] || '';
                    }
                    if (k === content.length - 1 && txtValue.length > 0) {
                        txtValue = content[k + 1] == '\n' ? txtValue + content[k + 1] : txtValue;
                        childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                        txtValue = '';
                    }
                }
            }
        }
        else {
            childNodes = wordWrapping(text, textValue, maxHeight);
        }
    }
    else {
        childNodes[childNodes.length] = { text: content, x: 0, dy: 0, width: bBoxText(content, text) };
    }
    return childNodes;
}
/** @private */
function wrapSvgTextBlazor(text, textValue, maxHeight) {
    var childNodes = [];
    var k = 0;
    var txtValue;
    var bounds1;
    var content = textValue || text.content;
    if (text.whiteSpace !== 'nowrap' && text.whiteSpace !== 'pre') {
        if (text.breakWord === 'breakall') {
            txtValue = '';
            txtValue += content[0];
            for (k = 0; k < content.length; k++) {
                bounds1 = bBoxText(txtValue, text);
                if (txtValue == '\n') {
                    txtValue = content[k + 1];
                    k++;
                }
                if (bounds1 >= text.width && txtValue.length > 0) {
                    txtValue = content[k + 1] == '\n' ? txtValue + content[k + 1] : txtValue;
                    childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: bounds1 };
                    txtValue = '';
                }
                else {
                    txtValue = txtValue + (content[k + 1] || '');
                    // if (txtValue.indexOf('\n') > -1) {
                    //     txtValue = txtValue.replace('\n', '');
                    // }
                    var width = bBoxText(txtValue, text);
                    if ((Math.ceil(width) + 2 >= text.width && txtValue.length > 0) || (txtValue.indexOf('\n') > -1)) {
                        txtValue = txtValue.slice(0, -1);
                        width = bBoxText(txtValue, text);
                        txtValue = content[k + 1] == '\n' ? txtValue + content[k + 1] : txtValue;
                        childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                        txtValue = content[k + 1] || '';
                    }
                    if (k === content.length - 1 && txtValue.length > 0) {
                        txtValue = content[k + 1] == '\n' ? txtValue + content[k + 1] : txtValue;
                        childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                        txtValue = '';
                    }
                }
            }
        }
        else {
            childNodes = wordWrappingBlazor(text, textValue, maxHeight);
        }
    }
    else {
        childNodes[childNodes.length] = { text: content, x: 0, dy: 0, width: bBoxText(content, text) };
    }
    return childNodes;
}
/** @private */
function wordWrappingBlazor(text, textValue, maxHeight) {
    var childNodes = [];
    var txtValue = '';
    var j = 0;
    var i = 0;
    var wrap = text.whiteSpace !== 'nowrap' ? true : false;
    var content = textValue || text.content;
    var bounds1;
    var eachLine = content.split('\n');
    var txt;
    var words;
    var newText;
    var existingWidth;
    var existingText;
    var height = 0;
    var thicknessInPixel = text.thickness * (96 / 72);
    // The padding has been added to remove the overflow text such that text would be contained within the bounds.
    var topPadding = text.thickness !== undefined ? thicknessInPixel === 1 || thicknessInPixel === 0 ? thicknessInPixel * 4 : thicknessInPixel + 4 : 5;
    for (j = 0; j < eachLine.length; j++) {
        txt = '';
        if (childNodes.length > 0 && ((childNodes.length * text.fontSize * 1.2) + topPadding) > maxHeight) {
            break;
        }
        words = text.textWrapping !== 'NoWrap' ? eachLine[parseInt(j.toString(), 10)].split(' ') : eachLine;
        var exactMaxHeight = text.thickness !== undefined ? Math.floor(maxHeight) : maxHeight;
        for (i = 0; i < words.length; i++) {
            var exactTextHeight = text.thickness !== undefined ? Math.ceil(height) : height;
            bounds1 = bBoxText(words[parseInt(i.toString(), 10)], text);
            //Used to get the word width including thickness.
            var wordWidth = text.thickness !== undefined ? thicknessInPixel === 1 || thicknessInPixel === 0 ? (thicknessInPixel * 2) + bounds1 : (thicknessInPixel * 2) + 4 + bounds1 : bounds1;
            if (wordWidth > text.width && words[parseInt(i.toString(), 10)].length > 0 && text.textWrapping !== 'NoWrap' && exactTextHeight < exactMaxHeight) {
                if (eachLine.length > 1) {
                    words[parseInt(i.toString(), 10)] = words[parseInt(i.toString(), 10)] + '\n';
                }
                var previousTextContent = text.content;
                text.content = words[parseInt(i.toString(), 10)];
                var res = wrapTextBlazor(text, txtValue, childNodes, maxHeight, height);
                childNodes = res.childNode;
                height = res.height;
                text.content = previousTextContent;
            }
            else {
                txtValue += (((i !== 0 || words.length === 1) && wrap && txtValue.length > 0) ? ' ' : '') + words[parseInt(i.toString(), 10)];
                var spaceWithText = text.thickness !== undefined && i + 1 != words.length ? ' ' : '';
                newText = txtValue + spaceWithText + (words[i + 1] || '');
                var width = bBoxText(newText, text);
                if (eachLine.length > 1 && i === words.length - 1) {
                    txtValue = txtValue + '\n';
                }
                var isNewlineOnly = txtValue === '\n';
                var isLastWordAndNextLineEmpty = (i + 1 >= words.length && eachLine[parseInt((j + 1).toString(), 10)] === '');
                var calculatedWidth = text.thickness !== undefined ? thicknessInPixel === 1 ? Math.floor(thicknessInPixel) + Math.ceil(width) : Math.floor(thicknessInPixel) * 2 + 4 + Math.ceil(width) + 2 : Math.ceil(width) + 2;
                if (childNodes.length == 0 && text.thickness !== undefined && topPadding !== 0 && topPadding > exactMaxHeight) {
                    height = height + getHeightMultiplier(txtValue) * bBoxTextHeight(txtValue, text) + topPadding;
                    break;
                }
                var exactTextWidth = text.thickness !== undefined ? Math.floor(text.width) : text.width;
                if ((calculatedWidth + 1) >= exactTextWidth && txtValue.length > 0) {
                    textValue = txtValue;
                    if ((maxHeight === undefined || maxHeight === null || exactTextHeight < exactMaxHeight || childNodes.length === 0 && text.fontSize * 1.2 > maxHeight)) {
                        childNodes[childNodes.length] = {
                            text: (txtValue.indexOf('\n') === -1 && i !== words.length - 1) ? txtValue + ' ' : textValue, x: 0, dy: 0,
                            width: newText === txtValue ? width : (txtValue === existingText) ? existingWidth : bBoxText(txtValue, text)
                        };
                        if (text.textAlign === 'justify' && text.thickness !== undefined) {
                            childNodes[childNodes.length - 1].width = Math.floor(text.width);
                        }
                    }
                    else if (text.thickness !== undefined && exactTextHeight >= exactMaxHeight) {
                        childNodes[childNodes.length] = {
                            text: txtValue.indexOf('\n') === -1 && i !== words.length ? txtValue + ' ' : textValue, x: 0, dy: 0,
                            width: newText === txtValue ? width : txtValue === existingText ? existingWidth : bBoxText(txtValue, text)
                        };
                        if (text.textAlign === 'justify' && text.thickness !== undefined) {
                            childNodes[childNodes.length - 1].width = Math.floor(text.width);
                        }
                        break;
                    }
                    var sanitizedForHeight = (isNewlineOnly || isLastWordAndNextLineEmpty) ? txtValue : txtValue.replace(/\n/g, '');
                    height = height + getHeightMultiplier(sanitizedForHeight) * bBoxTextHeight(sanitizedForHeight, text);
                    txtValue = '';
                }
                else {
                    if (i === words.length - 1) {
                        if ((maxHeight === undefined) || (exactTextHeight < exactMaxHeight) || childNodes.length === 0 && text.fontSize * 1.2 > maxHeight) {
                            childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                            if (text.textAlign === 'justify' && text.thickness !== undefined) {
                                childNodes[childNodes.length - 1].width = Math.floor(text.width);
                            }
                        }
                        else if (text.thickness !== undefined && exactTextHeight >= exactMaxHeight) {
                            childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                            if (text.textAlign === 'justify' && text.thickness !== undefined) {
                                childNodes[childNodes.length - 1].width = Math.floor(text.width);
                            }
                            break;
                        }
                        var sanitizedForHeightEnd = (isNewlineOnly || isLastWordAndNextLineEmpty) ? txtValue : txtValue.replace(/\n/g, '');
                        height = height + getHeightMultiplier(sanitizedForHeightEnd) * bBoxTextHeight(sanitizedForHeightEnd, text);
                        txtValue = '';
                    }
                }
                existingText = newText;
                existingWidth = width;
            }
        }
    }
    return childNodes;
}
/** @private */
function wordWrapping(text, textValue, maxHeight) {
    var childNodes = [];
    var txtValue = '';
    var j = 0;
    var i = 0;
    var wrap = text.whiteSpace !== 'nowrap' ? true : false;
    var content = textValue || text.content;
    var bounds1;
    var eachLine = content.split('\n');
    var txt;
    var words;
    var newText;
    var existingWidth;
    var existingText;
    var height = 0;
    var thicknessInPixel = text.thickness * (96 / 72);
    // The padding has been added to remove the overflow text such that text would be contained within the bounds.
    var topPadding = text.thickness !== undefined ? (thicknessInPixel) * 4 : 5;
    for (j = 0; j < eachLine.length; j++) {
        txt = '';
        if (childNodes.length > 0 && ((childNodes.length * text.fontSize * 1.2) + topPadding) > maxHeight) {
            break;
        }
        words = text.textWrapping !== 'NoWrap' ? eachLine[parseInt(j.toString(), 10)].split(' ') : eachLine;
        var exactMaxHeight = text.thickness !== undefined ? Math.floor(maxHeight) : maxHeight;
        for (i = 0; i < words.length; i++) {
            var exactTextHeight = text.thickness !== undefined ? Math.ceil(height) : height;
            bounds1 = bBoxText(words[parseInt(i.toString(), 10)], text);
            //Used to get the word width including thickness.
            var wordWidth = text.thickness !== undefined ? thicknessInPixel * 4 + bounds1 : bounds1;
            if (wordWidth > text.width && words[parseInt(i.toString(), 10)].length > 0 && text.textWrapping !== 'NoWrap' && exactTextHeight < exactMaxHeight) {
                if (eachLine.length > 1) {
                    words[parseInt(i.toString(), 10)] = words[parseInt(i.toString(), 10)] + '\n';
                }
                text.content = words[parseInt(i.toString(), 10)];
                childNodes = wrapText(text, txtValue, childNodes, maxHeight);
            }
            else {
                txtValue += (((i !== 0 || words.length === 1) && wrap && txtValue.length > 0) ? ' ' : '') + words[parseInt(i.toString(), 10)];
                var spaceWithText = text.thickness !== undefined && i + 1 != words.length ? ' ' : '';
                newText = txtValue + spaceWithText + (words[i + 1] || '');
                var width = bBoxText(newText, text);
                if (eachLine.length > 1 && i === words.length - 1) {
                    txtValue = txtValue + '\n';
                }
                var isNewlineOnly = txtValue === '\n';
                var isLastWordAndNextLineEmpty = (i + 1 >= words.length && eachLine[parseInt((j + 1).toString(), 10)] === '');
                var calculatedWidth = text.thickness !== undefined ? Math.ceil(thicknessInPixel) * 4 + Math.ceil(width) + 2 : Math.ceil(width) + 2;
                var paddingBetweenWords = text.thickness !== undefined ? (thicknessInPixel) * 2 : 0;
                if (childNodes.length == 0 && text.thickness !== undefined && topPadding !== 0 && topPadding > exactMaxHeight) {
                    height = height + getHeightMultiplier(txtValue) * bBoxTextHeight(txtValue, text) + topPadding;
                    break;
                }
                var exactTextWidth = text.thickness !== undefined ? Math.floor(text.width) : text.width;
                if (calculatedWidth >= exactTextWidth && txtValue.length > 0) {
                    textValue = txtValue;
                    if ((maxHeight === undefined || maxHeight === null || exactTextHeight < exactMaxHeight || childNodes.length === 0 && text.fontSize * 1.2 > maxHeight)) {
                        childNodes[childNodes.length] = {
                            text: (txtValue.indexOf('\n') === -1 && i !== words.length - 1) ? txtValue + ' ' : textValue, x: 0, dy: 0,
                            width: newText === txtValue ? width : (txtValue === existingText) ? existingWidth : bBoxText(txtValue, text)
                        };
                        if (text.textAlign === 'justify' && text.thickness !== undefined) {
                            childNodes[childNodes.length - 1].width = Math.floor(text.width);
                        }
                    }
                    else if (text.thickness !== undefined && exactTextHeight >= exactMaxHeight && bBoxTextHeight(txtValue, text) > paddingBetweenWords) {
                        childNodes[childNodes.length] = {
                            text: txtValue.indexOf('\n') === -1 && i !== words.length ? txtValue + ' ' : textValue, x: 0, dy: 0,
                            width: newText === txtValue ? width : txtValue === existingText ? existingWidth : bBoxText(txtValue, text)
                        };
                        if (text.textAlign === 'justify' && text.thickness !== undefined) {
                            childNodes[childNodes.length - 1].width = Math.floor(text.width);
                        }
                        break;
                    }
                    var sanitizedForHeight = (isNewlineOnly || isLastWordAndNextLineEmpty) ? txtValue : txtValue.replace(/\n/g, '');
                    height = height + getHeightMultiplier(sanitizedForHeight) * bBoxTextHeight(sanitizedForHeight, text) + paddingBetweenWords;
                    txtValue = '';
                }
                else {
                    if (i === words.length - 1) {
                        if ((maxHeight === undefined) || (exactTextHeight < exactMaxHeight) || childNodes.length === 0 && text.fontSize * 1.2 > maxHeight) {
                            childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                            if (text.textAlign === 'justify' && text.thickness !== undefined) {
                                childNodes[childNodes.length - 1].width = Math.floor(text.width);
                            }
                        }
                        else if (text.thickness !== undefined && exactTextHeight >= exactMaxHeight && bBoxTextHeight(txtValue, text) > paddingBetweenWords) {
                            childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                            if (text.textAlign === 'justify' && text.thickness !== undefined) {
                                childNodes[childNodes.length - 1].width = Math.floor(text.width);
                            }
                            break;
                        }
                        var sanitizedForHeightEnd = (isNewlineOnly || isLastWordAndNextLineEmpty) ? txtValue : txtValue.replace(/\n/g, '');
                        height = height + getHeightMultiplier(sanitizedForHeightEnd) * bBoxTextHeight(sanitizedForHeightEnd, text) + paddingBetweenWords;
                        txtValue = '';
                    }
                }
                existingText = newText;
                existingWidth = width;
            }
        }
    }
    return childNodes;
}
/** @private */
function getHeightMultiplier(text) {
    var lines = text.split(/\r?\n/);
    var hasContent = lines.some(function (line) { return line.trim().length > 0; });
    return hasContent ? lines.length : 1;
}
/** @private */
function wrapTextBlazor(txt, textValue, childNode, maxHeight, height) {
    var k = 0;
    var txtValue;
    var bounds1;
    var content = textValue || txt.content;
    txtValue = '';
    txtValue += content[0];
    var isFreeTextHeightAllowed;
    var additionalPadding = txt.thickness !== undefined && (txt.thickness === 0 || txt.thickness === 1) ? Math.ceil(txt.thickness * (96 / 72)) : Math.ceil(txt.thickness * (96 / 72)) + 4;
    for (k = 0; k < content.length; k++) {
        bounds1 = bBoxText(txtValue, txt);
        if (bounds1 + additionalPadding >= txt.width && txtValue.length > 0) {
            if (maxHeight === undefined || maxHeight === null || height + additionalPadding < maxHeight || childNode.length === 0) {
                childNode[childNode.length] = { text: txtValue, x: 0, dy: 0, width: bounds1 };
            }
            height = height + bBoxTextHeight(txtValue, txt);
            txtValue = content[k + 1] || '';
        }
        else {
            txtValue = txtValue + (content[k + 1] || '');
            var width = bBoxText(txtValue, txt) + additionalPadding;
            if ((Math.ceil(width) + 2 >= txt.width && txtValue.length > 0)) {
                height = height + bBoxTextHeight(txtValue, txt);
                txtValue = txtValue.slice(0, -1);
                width = bBoxText(txtValue, txt);
                isFreeTextHeightAllowed = ((maxHeight === undefined || maxHeight === null || height + additionalPadding <= maxHeight));
                if (isFreeTextHeightAllowed || childNode.length === 0) {
                    childNode[childNode.length] = { text: txtValue, x: 0, dy: 0, width: width };
                }
                txtValue = content[k + 1] || '';
            }
            if (k === content.length - 1 && txtValue.length > 0) {
                height = height + bBoxTextHeight(txtValue, txt);
                isFreeTextHeightAllowed = ((maxHeight === undefined || maxHeight === null || height + additionalPadding <= maxHeight));
                if (isFreeTextHeightAllowed || childNode.length === 0) {
                    childNode[childNode.length] = { text: txtValue, x: 0, dy: 0, width: width };
                }
                txtValue = '';
            }
        }
    }
    return {
        childNode: childNode,
        height: height
    };
}
/** @private */
function wrapText(txt, textValue, childNode, maxHeight) {
    var k = 0;
    var txtValue;
    var bounds1;
    var content = textValue || txt.content;
    txtValue = '';
    var height = 0;
    txtValue += content[0];
    var isFreeTextHeightAllowed;
    var additionalPadding = txt.thickness !== undefined ? Math.ceil(txt.thickness * (96 / 72)) * 4 : 0;
    for (k = 0; k < content.length; k++) {
        bounds1 = bBoxText(txtValue, txt);
        if (bounds1 + additionalPadding >= txt.width && txtValue.length > 0) {
            if (maxHeight === undefined || maxHeight === null || height < maxHeight) {
                childNode[childNode.length] = { text: txtValue, x: 0, dy: 0, width: bounds1 };
            }
            height = height + bBoxTextHeight(txtValue, txt) + additionalPadding;
            additionalPadding = 0;
            txtValue = '';
        }
        else {
            txtValue = txtValue + (content[k + 1] || '');
            var width = bBoxText(txtValue, txt) + additionalPadding;
            if ((Math.ceil(width) + 2 >= txt.width && txtValue.length > 0)) {
                height = height + bBoxTextHeight(txtValue, txt) + additionalPadding;
                additionalPadding = 0;
                txtValue = txtValue.slice(0, -1);
                width = bBoxText(txtValue, txt);
                isFreeTextHeightAllowed = ((maxHeight === undefined || maxHeight === null || height <= maxHeight));
                if (isFreeTextHeightAllowed) {
                    childNode[childNode.length] = { text: txtValue, x: 0, dy: 0, width: width };
                }
                txtValue = content[k + 1] || '';
            }
            if (k === content.length - 1 && txtValue.length > 0) {
                if (txt.strokeWidth > 1 && txt.relativeMode === 'Point') {
                    height = height + bBoxTextHeight(txtValue, txt) + additionalPadding;
                    additionalPadding = 0;
                }
                isFreeTextHeightAllowed = ((maxHeight === undefined || maxHeight === null || height <= maxHeight));
                if (isFreeTextHeightAllowed) {
                    childNode[childNode.length] = { text: txtValue, x: 0, dy: 0, width: width };
                }
                txtValue = '';
            }
        }
    }
    return childNode;
}
function wrapSvgTextAlign(text, childNodes, isEJ2) {
    var wrapBounds = { x: 0, width: 0 };
    var k = 0;
    var txtWidth;
    var width;
    for (k = 0; k < childNodes.length; k++) {
        txtWidth = childNodes[parseInt(k.toString(), 10)].width;
        width = txtWidth;
        if (isEJ2 === true) {
            if (text.textAlign === 'left' || text.textAlign === 'justify') {
                txtWidth = 0;
            }
            else if (text.textAlign === 'center') {
                if (txtWidth > text.width && (text.textOverflow === 'Ellipsis' || text.textOverflow === 'Clip')) {
                    txtWidth = 0;
                }
                else {
                    txtWidth = -txtWidth / 2;
                }
            }
            else if (text.textAlign === 'right') {
                txtWidth = -txtWidth;
            }
            else {
                txtWidth = childNodes.length > 1 ? 0 : -txtWidth / 2;
            }
        }
        else {
            if (text.textAlign === 'left') {
                txtWidth = 0;
            }
            else if (text.textAlign === 'center') {
                if (txtWidth > text.width && (text.textOverflow === 'Ellipsis' || text.textOverflow === 'Clip')) {
                    txtWidth = 0;
                }
                else {
                    txtWidth = -txtWidth / 2;
                }
            }
            else if (text.textAlign === 'right') {
                txtWidth = -txtWidth;
            }
            else {
                txtWidth = childNodes.length > 1 ? 0 : -txtWidth / 2;
            }
        }
        childNodes[parseInt(k.toString(), 10)].dy = text.fontSize * 1.2;
        childNodes[parseInt(k.toString(), 10)].x = txtWidth;
        if (!wrapBounds) {
            wrapBounds = {
                x: txtWidth,
                width: width
            };
        }
        else {
            wrapBounds.x = Math.min(wrapBounds.x, txtWidth);
            wrapBounds.width = Math.max(wrapBounds.width, width);
        }
    }
    return wrapBounds;
}
/** @private */
export function measureText(text, style, content, maxWidth, maxHeight, textValue) {
    var bounds = new Size(0, 0);
    var childNodes;
    var wrapBounds;
    var options = getTextOptions(text, maxWidth);
    if (text.isEJ2 === true && text.isFreeText === true) { // EJ2 Free Text: use strokeWidth only, double the standard 1.5x per-side padding
        var stroke = Math.ceil(options.strokeWidth || 0);
        var totalPad = stroke * 3 * 1.8;
        options.width = Math.max(0, options.width - totalPad + stroke);
        options.height = Math.max(0, options.height - totalPad);
        if (maxHeight != null) {
            maxHeight = Math.max(0, maxHeight - totalPad + (stroke / 1.5));
        }
        text.childNodes = childNodes = wrapSvgTextEJ2(options, textValue, maxHeight);
    }
    else {
        if (text.isFreeText === true) {
            text.freeTextSelectorWidth = options.width ? options.width : 0;
            text.childNodes = childNodes = wrapSvgTextBlazor(options, textValue, maxHeight);
        }
        else {
            text.childNodes = childNodes = wrapSvgText(options, textValue, maxHeight);
        }
    }
    text.wrapBounds = wrapBounds = wrapSvgTextAlign(options, childNodes, text.isEJ2);
    bounds.width = wrapBounds.width;
    if (text.wrapBounds.width >= maxWidth && options.textOverflow !== 'Wrap') {
        bounds.width = maxWidth;
    }
    bounds.height = childNodes.length * text.style.fontSize * 1.2;
    return bounds;
}
/** @private */
export function getDiagramElement(elementId, contentId) {
    var diagramElement;
    var element;
    if (contentId && (typeof document !== 'undefined')) {
        element = document.getElementById(contentId);
    }
    diagramElement = (element) ? element.querySelector('#' + elementId) : (typeof document !== 'undefined') ? document.getElementById(elementId) : null;
    return diagramElement;
}
/** @private */
export function createHtmlElement(elementType, attribute) {
    var element = createElement(elementType);
    setAttributeHtml(element, attribute);
    return element;
}
/** @private */
export function setAttributeHtml(element, attributes) {
    var keys = Object.keys(attributes);
    for (var i = 0; i < keys.length; i++) {
        if (keys[parseInt(i.toString(), 10)] === 'style') {
            element.style.cssText = attributes[keys[parseInt(i.toString(), 10)]];
        }
        else {
            element.setAttribute(keys[parseInt(i.toString(), 10)], attributes[keys[parseInt(i.toString(), 10)]]);
        }
    }
}
/**
 * @private
 */
export function getAdornerLayerSvg(diagramId, index) {
    var adornerLayerSvg = null;
    var diagramElement = getDiagramElement(diagramId + index + '_diagramAdornerLayer');
    var elementcoll;
    if (diagramElement) {
        elementcoll = diagramElement.getElementsByClassName('e-adorner-layer' + index);
        adornerLayerSvg = elementcoll[0];
    }
    return adornerLayerSvg;
}
/** @private */
export function getSelectorElement(diagramId, index) {
    var adornerLayer = null;
    var adornerSvg = getAdornerLayerSvg(diagramId, index);
    if (adornerSvg) {
        adornerLayer = adornerSvg.getElementById(diagramId + '_SelectorElement');
    }
    return adornerLayer;
}
/** @private */
export function createMeasureElements() {
    var measureElement = 'measureElement';
    // eslint-disable-next-line
    if (!window[measureElement]) {
        var divElement = createHtmlElement('div', {
            id: 'measureElement',
            style: 'visibility:hidden ; height: 0px ; width: 0px; overflow: hidden;'
        });
        var text = createHtmlElement('span', { 'style': 'display:inline-block ; line-height: normal' });
        divElement.appendChild(text);
        var imageElement = void 0;
        imageElement = createHtmlElement('img', {});
        divElement.appendChild(imageElement);
        if (typeof document !== 'undefined') {
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
            divElement.appendChild(svg);
            var element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            svg.appendChild(element);
            var data = document.createTextNode('');
            var tSpan = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            tSpan.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
            svg.appendChild(tSpan);
            // eslint-disable-next-line
            window[measureElement] = divElement;
            // eslint-disable-next-line
            window[measureElement].usageCount = 1;
            document.body.appendChild(divElement);
        }
    }
    else {
        // eslint-disable-next-line
        window[measureElement].usageCount += 1;
    }
}
/** @private */
export function measureImage(source, contentSize) {
    var measureElement = 'measureElement';
    // eslint-disable-next-line
    window[measureElement].style.visibility = 'visible';
    // eslint-disable-next-line
    var imageElement = window[measureElement].children[1];
    imageElement.setAttribute('src', source);
    var bounds = imageElement.getBoundingClientRect();
    var width = bounds.width;
    var height = bounds.height;
    contentSize = new Size(width, height);
    // eslint-disable-next-line
    window[measureElement].style.visibility = 'hidden';
    return contentSize;
}
