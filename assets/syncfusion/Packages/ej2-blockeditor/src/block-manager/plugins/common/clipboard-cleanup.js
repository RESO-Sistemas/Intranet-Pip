import { isNullOrUndefined as isNOU, detach, createElement } from '@syncfusion/ej2-base';
import { WordListConverter } from './ms-list-converter';
/**
 * Handles cleanup of pasted content for the Block Editor.
 */
var ClipboardCleanupModule = /** @class */ (function () {
    function ClipboardCleanupModule(manager) {
        this.parent = manager;
        this.listConverter = new WordListConverter(this);
    }
    /**
     * Handles the paste cleanup process.
     * It checks if the paste content is plain text or from MS Word and processes accordingly.
     *
     * @param {IPasteCleanupOptions} args - The arguments for paste cleanup.
     * @returns {string} - The cleaned HTML content.
     * @hidden
     */
    ClipboardCleanupModule.prototype.cleanupPaste = function (args) {
        var html = args.html, plainText = args.plainText;
        if (this.parent.pasteCleanupSettings.plainText) {
            return this.plainFormatting(plainText);
        }
        var isFromMsWord = this.isFromMsWord(html);
        if (isFromMsWord) {
            return this.cleanMsWordContent(html);
        }
        return this.cleanupHtml(html, this.parent.pasteCleanupSettings.keepFormat);
    };
    ClipboardCleanupModule.prototype.isFromMsWord = function (html) {
        return ClipboardCleanupModule.msWordPatterns.some(function (pattern) { return pattern.test(html); });
    };
    ClipboardCleanupModule.prototype.cleanMsWordContent = function (html) {
        var tempDiv = createElement('div');
        tempDiv.innerHTML = html;
        var listNodes = [];
        this.addListClass(tempDiv);
        listNodes = this.listCleanUp(tempDiv, listNodes);
        if (!isNOU(listNodes[0]) && listNodes[0].parentElement.tagName !== 'UL' &&
            listNodes[0].parentElement.tagName !== 'OL') {
            this.listConverter.convertListNodes(listNodes);
        }
        // Remove Word-specific elements
        this.removeUnwantedElements(tempDiv);
        // Clean up lists
        this.cleanupLists(tempDiv);
        // Process tables
        this.processTables(tempDiv);
        // Remove Word-specific classes
        this.removeWordClasses(tempDiv);
        // Clean up styles
        this.cleanupStyles(tempDiv, this.parent.pasteCleanupSettings.allowedStyles);
        // Remove empty elements
        this.removeEmptyElements(tempDiv);
        // Remove comments
        this.removeComments(tempDiv);
        // Process images
        this.processImages(tempDiv);
        return tempDiv.innerHTML;
    };
    ClipboardCleanupModule.prototype.addListClass = function (elm) {
        var allNodes = elm.querySelectorAll('*');
        for (var index = 0; index < allNodes.length; index++) {
            if (!isNOU(allNodes[index].getAttribute('style')) && allNodes[index].getAttribute('style').replace(/ /g, '').replace('\n', '').indexOf('mso-list:l') >= 0 &&
                allNodes[index].className.toLowerCase().indexOf('msolistparagraph') === -1 &&
                allNodes[index].tagName.charAt(0) !== 'H' && allNodes[index].tagName !== 'LI' &&
                allNodes[index].tagName !== 'OL' && allNodes[index].tagName !== 'UL') {
                allNodes[index].classList.add('msolistparagraph');
            }
        }
    };
    /* Cleans up HTML content and identifies list nodes for conversion */
    ClipboardCleanupModule.prototype.listCleanUp = function (containerElement, listNodes) {
        var nodesToRemove = [];
        var previousWasMsoList = false;
        var allElements = containerElement.querySelectorAll('*');
        for (var i = 0; i < allElements.length; i++) {
            var currentElement = allElements[i];
            // Check if element should be ignored
            if (this.shouldIgnoreElement(currentElement)) {
                nodesToRemove.push(currentElement);
                continue;
            }
            // Check if element is an MS Word list paragraph
            if (this.isMsoListParagraph(currentElement)) {
                // Add a null separator for new list if needed
                if (this.isFirstListItem(currentElement) && listNodes.length > 0 &&
                    listNodes[listNodes.length - 1] !== null) {
                    listNodes.push(null);
                }
                // Add the list node
                listNodes.push(currentElement);
            }
            // Add a null separator when transitioning from list to non-list block
            if (this.shouldAddListSeparator(previousWasMsoList, currentElement)) {
                listNodes.push(null);
            }
            // Update previous state flag for next iteration
            if (this.isBlockElement(currentElement)) {
                previousWasMsoList = this.isMsoListParagraph(currentElement);
            }
        }
        // Add a final null separator if needed
        if (listNodes.length > 0 && listNodes[listNodes.length - 1] !== null) {
            listNodes.push(null);
        }
        return listNodes;
    };
    /* Determines if an element should be ignored during cleanup */
    ClipboardCleanupModule.prototype.shouldIgnoreElement = function (element) {
        var isNotInIgnorableList = ClipboardCleanupModule.ignorableNodes.indexOf(element.nodeName) === -1;
        var isEmptyTextNode = element.nodeType === 3 && element.textContent.trim() === '';
        return isNotInIgnorableList || isEmptyTextNode;
    };
    /* Determines if an element is an MS Word list paragraph */
    ClipboardCleanupModule.prototype.isMsoListParagraph = function (element) {
        var elementClass = element.className;
        var hasClassName = elementClass && elementClass.toLowerCase().indexOf('msolistparagraph') !== -1;
        var elementStyles = element.getAttribute('style');
        var hasMsoListStyle = !isNOU(elementStyles) && elementStyles.indexOf('mso-list:') >= 0;
        return hasClassName && hasMsoListStyle;
    };
    /* Determines if an element is the first item in a list */
    ClipboardCleanupModule.prototype.isFirstListItem = function (element) {
        return element.className.indexOf('MsoListParagraphCxSpFirst') >= 0;
    };
    /* Determines if a list separator should be added */
    ClipboardCleanupModule.prototype.shouldAddListSeparator = function (previousWasMsoList, currentElement) {
        return previousWasMsoList &&
            this.isBlockElement(currentElement) && !this.isMsoListParagraph(currentElement);
    };
    /* Determines if an element is a block element */
    ClipboardCleanupModule.prototype.isBlockElement = function (element) {
        return ClipboardCleanupModule.blockNode.indexOf(element.nodeName.toLowerCase()) !== -1;
    };
    ClipboardCleanupModule.prototype.cleanupHtml = function (html, keepFormat) {
        var tempDiv = createElement('div');
        tempDiv.innerHTML = html;
        this.removeUnwantedElements(tempDiv);
        // Normalize and sanitize any tables in generic HTML (non-Word)
        this.processTables(tempDiv);
        if (!keepFormat) {
            this.deniedAttributes(tempDiv, true);
        }
        else if (this.parent.pasteCleanupSettings.deniedTags && this.parent.pasteCleanupSettings.deniedTags.length > 0) {
            this.deniedAttributes(tempDiv, false);
        }
        if (this.parent.pasteCleanupSettings.allowedStyles && this.parent.pasteCleanupSettings.allowedStyles.length > 0) {
            this.allowedStyle(tempDiv);
        }
        if (this.parent.pasteCleanupSettings.deniedTags && this.parent.pasteCleanupSettings.deniedTags.length > 0) {
            this.deniedTags(tempDiv);
        }
        this.removeEmptyElements(tempDiv);
        this.removeComments(tempDiv);
        this.processImages(tempDiv);
        this.cleanupCssPatterns(tempDiv);
        return tempDiv.innerHTML;
    };
    ClipboardCleanupModule.prototype.plainFormatting = function (html) {
        var tempDiv = createElement('div');
        tempDiv.innerHTML = html;
        this.detachInlineElements(tempDiv);
        this.getTextContent(tempDiv);
        this.removeEmptyElements(tempDiv);
        this.removeComments(tempDiv);
        return tempDiv.innerHTML;
    };
    ClipboardCleanupModule.prototype.removeUnwantedElements = function (element) {
        this.removeStyleElements(element);
        var innerElement = element.innerHTML;
        for (var i = 0; i < ClipboardCleanupModule.removableElements.length; i++) {
            // eslint-disable-next-line security/detect-non-literal-regexp
            var regExpStartElem = new RegExp('<' + ClipboardCleanupModule.removableElements[i] + '\\s*[^>]*>', 'g');
            // eslint-disable-next-line security/detect-non-literal-regexp
            var regExpEndElem = new RegExp('</' + ClipboardCleanupModule.removableElements[i] + '>', 'g');
            innerElement = innerElement.replace(regExpStartElem, '');
            innerElement = innerElement.replace(regExpEndElem, '');
        }
        element.innerHTML = innerElement;
    };
    ClipboardCleanupModule.prototype.removeStyleElements = function (element) {
        var styleElement = element.querySelector('style');
        if (!isNOU(styleElement)) {
            detach(styleElement);
        }
    };
    ClipboardCleanupModule.prototype.removeComments = function (element) {
        var innerElement = element.innerHTML;
        innerElement = innerElement.replace(/<!--[\s\S]*?-->/g, '');
        element.innerHTML = innerElement;
    };
    ClipboardCleanupModule.prototype.removeEmptyElements = function (element) {
        var emptyElements = element.querySelectorAll(':empty');
        for (var i = 0; i < emptyElements.length; i++) {
            if (emptyElements[i].tagName !== 'IMG' &&
                emptyElements[i].tagName !== 'BR' &&
                emptyElements[i].tagName !== 'IFRAME' &&
                emptyElements[i].tagName !== 'TD' &&
                emptyElements[i].tagName !== 'HR') {
                var detachableElement = this.findDetachEmptyElem(emptyElements[i]);
                if (!isNOU(detachableElement)) {
                    detach(detachableElement);
                }
            }
        }
    };
    ClipboardCleanupModule.prototype.findDetachEmptyElem = function (element) {
        var removableElement;
        if (!isNOU(element.parentElement)) {
            var hasNbsp = element.parentElement.textContent.length > 0 &&
                element.parentElement.textContent.match(/\u00a0/g) &&
                element.parentElement.textContent.match(/\u00a0/g).length > 0;
            if (!hasNbsp && element.parentElement.textContent.trim() === '' &&
                isNOU(element.parentElement.querySelector('img'))) {
                removableElement = this.findDetachEmptyElem(element.parentElement);
            }
            else {
                removableElement = element;
            }
        }
        else {
            removableElement = null;
        }
        return removableElement;
    };
    ClipboardCleanupModule.prototype.removeWordClasses = function (element) {
        var elementsWithClass = element.querySelectorAll('*[class]');
        var _loop_1 = function (i) {
            var classList = elementsWithClass[i].classList;
            var classesToRemove = [];
            for (var j = 0; j < classList.length; j++) {
                if (classList[j].indexOf('Mso') === 0) {
                    classesToRemove.push(classList[j]);
                }
            }
            classesToRemove.forEach(function (className) {
                elementsWithClass[i].classList.remove(className);
            });
            if (elementsWithClass[i].classList.length === 0) {
                elementsWithClass[i].removeAttribute('class');
            }
        };
        for (var i = 0; i < elementsWithClass.length; i++) {
            _loop_1(i);
        }
    };
    ClipboardCleanupModule.prototype.cleanupStyles = function (element, allowedStyles) {
        var elementsWithStyle = element.querySelectorAll('*[style]');
        for (var i = 0; i < elementsWithStyle.length; i++) {
            var styleAttr = elementsWithStyle[i].getAttribute('style');
            if (!styleAttr) {
                continue;
            }
            var styles = styleAttr.split(';');
            var newStyles = '';
            for (var j = 0; j < styles.length; j++) {
                var style = styles[j].trim();
                if (!style) {
                    continue;
                }
                var _a = style.split(':').map(function (s) { return s.trim(); }), property = _a[0], value = _a[1];
                if (property.indexOf('mso-') === 0) {
                    continue;
                }
                if (allowedStyles.indexOf(property) !== -1) {
                    newStyles += property + ": " + value + "; ";
                }
            }
            if (newStyles) {
                elementsWithStyle[i].setAttribute('style', newStyles.trim());
            }
            else {
                elementsWithStyle[i].removeAttribute('style');
            }
        }
    };
    ClipboardCleanupModule.prototype.processTables = function (element) {
        var tables = element.querySelectorAll('table');
        for (var i = 0; i < tables.length; i++) {
            this.sanitizeTableElement(tables[i]);
        }
    };
    ClipboardCleanupModule.prototype.sanitizeTableElement = function (table) {
        table.classList.add('e-blockeditor-table');
        // Remove unwanted attributes
        var attrs = ['border', 'cellpadding', 'cellspacing', 'width', 'height', 'style'];
        attrs.forEach(function (attr) { if (table.hasAttribute(attr)) {
            table.removeAttribute(attr);
        } });
        // Remove colgroup/col sizing; our TableService will manage widths
        var colgroups = table.querySelectorAll('colgroup, col');
        for (var i = 0; i < colgroups.length; i++) {
            colgroups[i].parentElement.removeChild(colgroups[i]);
        }
        var cells = table.querySelectorAll('td, th');
        var _loop_2 = function (j) {
            var cell = cells[j];
            // Remove spans unsupported by editor
            cell.removeAttribute('rowspan');
            cell.removeAttribute('colspan');
            // Remove unwanted attributes/styles
            ['width', 'height', 'style'].forEach(function (attr) { if (cell.hasAttribute(attr)) {
                cell.removeAttribute(attr);
            } });
            // Ensure minimal content wrapper
            if (cell.textContent.trim() === '' && !cell.querySelector('img') && !cell.querySelector('.e-table-cell-host')) {
                cell.innerHTML = '<p><br/></p>';
            }
        };
        for (var j = 0; j < cells.length; j++) {
            _loop_2(j);
        }
    };
    ClipboardCleanupModule.prototype.cleanupLists = function (element) {
        this.cleanList(element, 'UL');
        this.cleanList(element, 'OL');
        this.convertWordListParagraphs(element);
    };
    ClipboardCleanupModule.prototype.cleanList = function (element, listTag) {
        var replacableElem = element.querySelectorAll(listTag + " div");
        for (var j = replacableElem.length - 1; j >= 0; j--) {
            var parentElem = replacableElem[j].parentNode;
            while (replacableElem[j].firstChild) {
                parentElem.insertBefore(replacableElem[j].firstChild, replacableElem[j]);
            }
            var closestListElem = this.findClosestListElem(replacableElem[j]);
            if (closestListElem) {
                this.insertAfter(replacableElem[j], closestListElem);
            }
        }
    };
    ClipboardCleanupModule.prototype.findClosestListElem = function (listElem) {
        var closestListElem;
        while (!isNOU(listElem)) {
            listElem = !isNOU(listElem.closest('ul')) && listElem.tagName !== 'UL'
                ? listElem.closest('ul')
                : (listElem.tagName !== 'OL' ? listElem.closest('ol') : null);
            closestListElem = !isNOU(listElem) ? listElem : closestListElem;
        }
        return closestListElem;
    };
    ClipboardCleanupModule.prototype.insertAfter = function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    };
    ClipboardCleanupModule.prototype.convertWordListParagraphs = function (element) {
        var listParagraphs = element.querySelectorAll('p[style*="mso-list"]');
        if (listParagraphs.length === 0) {
            return;
        }
        var currentList = null;
        var currentListType = null;
        var currentLevel = 0;
        for (var i = 0; i < listParagraphs.length; i++) {
            var paragraph = listParagraphs[i];
            var listType = 'ul';
            var textContent = paragraph.textContent.trim();
            if (/^\d+\./.test(textContent) || /^[a-zA-Z]\./.test(textContent) || /^[ivxIVX]+\./.test(textContent)) {
                listType = 'ol';
            }
            var level = 1;
            var styleAttr = paragraph.getAttribute('style');
            if (styleAttr) {
                var levelMatch = styleAttr.match(/level(\d+)/);
                if (levelMatch) {
                    level = parseInt(levelMatch[1], 10);
                }
            }
            var content = paragraph.innerHTML;
            content = content.replace(/^[\s\u00A0]*(?:\d+\.|\w\.|\u2022|\u25CF|\u25CB|\u25A0|\u25A1)[\s\u00A0]+/, '');
            if (!currentList || currentListType !== listType || level < currentLevel) {
                currentList = document.createElement(listType);
                currentListType = listType;
                paragraph.parentNode.insertBefore(currentList, paragraph);
            }
            var listItem = document.createElement('li');
            listItem.innerHTML = content;
            currentList.appendChild(listItem);
            currentLevel = level;
            paragraph.parentNode.removeChild(paragraph);
        }
    };
    ClipboardCleanupModule.prototype.processImages = function (element) {
        var images = element.querySelectorAll('img');
        for (var i = 0; i < images.length; i++) {
            var img = images[i];
            img.classList.add('e-blockeditor-pasted-img');
            if (!img.hasAttribute('alt')) {
                img.setAttribute('alt', 'Pasted image');
            }
        }
    };
    ClipboardCleanupModule.prototype.cleanupCssPatterns = function (root) {
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                var text = node.textContent.trim();
                var isInlineStyle = text.match(/^\s*(ol|ul|li)[\s\S]*?\{[\s\S]*?\}/i);
                return isInlineStyle ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        });
        var nodesToRemove = [];
        while (walker.nextNode()) {
            var node = walker.currentNode;
            nodesToRemove.push(node);
        }
        for (var _i = 0, nodesToRemove_1 = nodesToRemove; _i < nodesToRemove_1.length; _i++) {
            var node = nodesToRemove_1[_i];
            node.remove();
        }
    };
    ClipboardCleanupModule.prototype.deniedTags = function (element) {
        var deniedTags = this.parent.pasteCleanupSettings.deniedTags;
        for (var i = 0; i < deniedTags.length; i++) {
            var removableElements = element.querySelectorAll(deniedTags[i]);
            for (var j = removableElements.length - 1; j >= 0; j--) {
                var parentElem = removableElements[j].parentNode;
                while (removableElements[j].firstChild) {
                    parentElem.insertBefore(removableElements[j].firstChild, removableElements[j]);
                }
                parentElem.removeChild(removableElements[j]);
            }
        }
        return element;
    };
    ClipboardCleanupModule.prototype.deniedAttributes = function (element, clean) {
        var deniedAttrs = clean ? ['style', 'class'] : this.parent.pasteCleanupSettings.deniedTags;
        for (var i = 0; i < deniedAttrs.length; i++) {
            var elementsWithAttr = element
                .querySelectorAll("[" + deniedAttrs[i] + "]");
            for (var j = 0; j < elementsWithAttr.length; j++) {
                elementsWithAttr[j].removeAttribute(deniedAttrs[i]);
            }
        }
        return element;
    };
    ClipboardCleanupModule.prototype.allowedStyle = function (element) {
        var allowedStyles = this.parent.pasteCleanupSettings.allowedStyles;
        var styleElements = element.querySelectorAll('[style]');
        for (var i = 0; i < styleElements.length; i++) {
            var allowedStyleValue = '';
            var styleValue = styleElements[i].getAttribute('style').split(';');
            for (var j = 0; j < styleValue.length; j++) {
                var stylePair = styleValue[j].trim();
                if (!stylePair) {
                    continue;
                }
                var property = stylePair.split(':').map(function (s) { return s.trim(); })[0];
                if (allowedStyles.indexOf(property) !== -1) {
                    allowedStyleValue += stylePair + ';';
                }
            }
            styleElements[i].removeAttribute('style');
            if (allowedStyleValue) {
                styleElements[i].setAttribute('style', allowedStyleValue);
            }
        }
        return element;
    };
    ClipboardCleanupModule.prototype.detachInlineElements = function (element) {
        for (var i = 0; i < ClipboardCleanupModule.inlineNode.length; i++) {
            var inlineElements = element.querySelectorAll(ClipboardCleanupModule.inlineNode[i]);
            for (var j = 0; j < inlineElements.length; j++) {
                var parentElem = inlineElements[j].parentElement;
                if (!parentElem) {
                    continue;
                }
                while (inlineElements[j].firstChild) {
                    parentElem.insertBefore(inlineElements[j].firstChild, inlineElements[j]);
                }
                parentElem.removeChild(inlineElements[j]);
            }
        }
    };
    ClipboardCleanupModule.prototype.getTextContent = function (element) {
        for (var i = 0; i < ClipboardCleanupModule.blockNode.length; i++) {
            var blockElements = element.querySelectorAll(ClipboardCleanupModule.blockNode[i]);
            for (var j = 0; j < blockElements.length; j++) {
                var paragraph = document.createElement('p');
                paragraph.textContent = blockElements[j].textContent;
                blockElements[j].parentNode.replaceChild(paragraph, blockElements[j]);
            }
        }
        var allElements = element.querySelectorAll('*');
        for (var i = 0; i < allElements.length; i++) {
            var attributes = allElements[i].attributes;
            for (var j = attributes.length - 1; j >= 0; j--) {
                allElements[i].removeAttribute(attributes[j].name);
            }
        }
    };
    ClipboardCleanupModule.inlineNode = ['a', 'abbr', 'acronym', 'audio', 'b', 'bdi', 'bdo', 'big', 'br', 'button',
        'canvas', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'font', 'i', 'iframe', 'img', 'input',
        'ins', 'kbd', 'label', 'map', 'mark', 'meter', 'noscript', 'object', 'output', 'picture', 'progress',
        'q', 'ruby', 's', 'samp', 'script', 'select', 'slot', 'small', 'span', 'strong', 'sub', 'sup', 'svg',
        'template', 'textarea', 'time', 'u', 'tt', 'var', 'video', 'wbr'];
    ClipboardCleanupModule.ignorableNodes = ['A', 'APPLET', 'B', 'BLOCKQUOTE', 'BR',
        'BUTTON', 'CENTER', 'CODE', 'COL', 'COLGROUP', 'DD', 'DEL', 'DFN', 'DIR', 'DIV',
        'DL', 'DT', 'EM', 'FIELDSET', 'FONT', 'FORM', 'FRAME', 'FRAMESET', 'H1', 'H2',
        'H3', 'H4', 'H5', 'H6', 'HR', 'I', 'IMG', 'IFRAME', 'INPUT', 'INS', 'LABEL',
        'LI', 'OL', 'OPTION', 'P', 'PARAM', 'PRE', 'Q', 'S', 'SELECT', 'SPAN', 'STRIKE',
        'STRONG', 'SUB', 'SUP', 'TABLE', 'TBODY', 'TD', 'TEXTAREA', 'TFOOT', 'TH',
        'THEAD', 'TITLE', 'TR', 'TT', 'U', 'UL'];
    /** List of HTML block node names */
    ClipboardCleanupModule.blockNode = ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'address', 'blockquote', 'button', 'center', 'dd', 'dir', 'dl', 'dt', 'fieldset',
        'frameset', 'hr', 'iframe', 'isindex', 'li', 'map', 'menu', 'noframes', 'noscript',
        'object', 'ol', 'pre', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul',
        'header', 'article', 'nav', 'footer', 'section', 'aside', 'main', 'figure', 'figcaption'];
    ClipboardCleanupModule.removableElements = ['o:p', 'style', 'w:sdt', 'xml', 'script', 'meta', 'link'];
    ClipboardCleanupModule.msWordPatterns = [
        /class='?Mso|style='[^ ]*\bmso-/i,
        /class="?Mso|style="[^ ]*\bmso-/i,
        /(class="?Mso|class='?Mso|class="?Xl|class='?Xl|class=Xl|style="[^"]*\bmso-|style='[^']*\bmso-|w:WordDocument)/gi,
        /style='mso-width-source:/i,
        // New Office 365 patterns
        /\bOutlineElement\b/i,
        /\bSCXW\d+\b/i,
        /\bBCX\d+\b/i,
        /\bTextRun\b/i,
        /\bEOP\b/i,
        /\bpara(id|eid)=/i,
        /data-ccp-/i,
        /\bWACImageContainer\b/i // Word's image container
    ];
    return ClipboardCleanupModule;
}());
export { ClipboardCleanupModule };
