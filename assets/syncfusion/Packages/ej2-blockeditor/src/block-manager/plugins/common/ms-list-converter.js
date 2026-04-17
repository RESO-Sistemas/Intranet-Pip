import { createElement, isNullOrUndefined as isNOU, detach, addClass } from '@syncfusion/ej2-base';
var WordListConverter = /** @class */ (function () {
    function WordListConverter(cleanupModule) {
        this.upperRomanNumber = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX',
            'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
        this.lowerRomanNumber = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix',
            'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii', 'xviii', 'xix', 'xx'];
        this.lowerGreekNumber = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ',
            'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω'];
        this.listContents = [];
        this.parent = cleanupModule;
    }
    /**
     * Converts MS Word list nodes to standard HTML lists
     *
     * @param {Element[]} listNodes - Array of list nodes to convert
     * @returns {void} - No return value
     * @hidden
     */
    WordListConverter.prototype.convertListNodes = function (listNodes) {
        var convertedLists = [];
        var listCollection = [];
        var currentListStyle = '';
        // Process list nodes and build collection
        this.processListNodes(listNodes, convertedLists, listCollection, currentListStyle);
        // Replace original nodes with converted lists
        this.replaceNodesWithLists(listNodes, convertedLists);
    };
    /* Processes list nodes and builds collection of list data */
    WordListConverter.prototype.processListNodes = function (listNodes, convertedLists, listCollection, currentListStyle) {
        var listFormatOverride;
        for (var i = 0; i < listNodes.length; i++) {
            var currentNode = listNodes[i];
            // Handle null separator - convert collected items to list
            if (currentNode === null) {
                convertedLists.push({
                    content: this.makeConversion(listCollection),
                    node: listNodes[i - 1]
                });
                listCollection = [];
                continue;
            }
            // Fix outline level in style
            this.fixOutlineLevel(currentNode);
            // Extract list properties
            var nodeStyle = currentNode.getAttribute('style') || '';
            var nestingLevel = this.extractNestingLevel(nodeStyle);
            listFormatOverride = this.extractListFormatOverride(nodeStyle, listFormatOverride);
            // Process list content
            this.listContents = [];
            this.getListContent(currentNode);
            // Skip if no list content
            if (isNOU(this.listContents[0])) {
                continue;
            }
            // Determine list properties
            var listProperties = this.determineListProperties(this.listContents[0], i, listNodes, currentNode);
            // Collect content items
            var contentItems = [];
            for (var j = 1; j < this.listContents.length; j++) {
                contentItems.push(this.listContents[j]);
            }
            // Get class name and update style
            var className = !isNOU(currentNode.className) ? currentNode.className : '';
            currentListStyle = this.updateNodeStyle(currentNode, nodeStyle);
            // Add to collection
            listCollection.push({
                listType: listProperties.type,
                content: contentItems,
                nestedLevel: nestingLevel,
                listFormatOverride: listFormatOverride,
                class: className,
                listStyle: currentListStyle,
                listStyleTypeName: listProperties.styleType,
                start: listProperties.startAttr,
                styleMarginLeft: listProperties.marginLeft
            });
        }
    };
    /* Fixes outline level in style attribute */
    WordListConverter.prototype.fixOutlineLevel = function (node) {
        var style = node.getAttribute('style');
        if (style && style.indexOf('mso-outline-level') !== -1) {
            node.style.cssText = style.replace('mso-outline-level', 'mso-outline');
        }
    };
    /* Extracts nesting level from style */
    WordListConverter.prototype.extractNestingLevel = function (style) {
        if (style && style.indexOf('level') !== -1) {
            // eslint-disable-next-line
            return parseInt(style.charAt(style.indexOf('level') + 5), null);
        }
        return 1;
    };
    /* Extracts list format override from style */
    WordListConverter.prototype.extractListFormatOverride = function (style, listFormatOverride) {
        if (style && style.indexOf('mso-list:') !== -1) {
            if (style.match(/mso-list:[^;]+;?/)) {
                var normalizedStyle = style.replace(new RegExp('\\n', 'g'), '').split(' ').join('');
                var msoListValue = normalizedStyle.match(/mso-list:[^;]+;?/)[0].split(':l');
                return isNOU(msoListValue) ? null : parseInt(msoListValue[1].split('level')[0], 10);
            }
            else {
                return null;
            }
        }
        return listFormatOverride;
    };
    /* Determines list properties based on content */
    WordListConverter.prototype.determineListProperties = function (listContent, index, listNodes, currentNode) {
        var result = {
            type: listContent.trim().length > 1 ? 'ol' : 'ul',
            styleType: ''
        };
        // Determine list style type
        result.styleType = this.getlistStyleType(listContent, result.type);
        // Determine start attribute for ordered lists
        if (result.type === 'ol' && (index === 0 || listNodes[index - 1] === null)) {
            result.startAttr = this.determineStartAttribute(listContent, result.styleType);
        }
        // Get margin-left if present
        if (currentNode.style.marginLeft !== '') {
            result.marginLeft = currentNode.style.marginLeft;
        }
        return result;
    };
    /* Determines start attribute for ordered lists */
    WordListConverter.prototype.determineStartAttribute = function (listContent, listStyleType) {
        var startString = listContent.split('.')[0];
        var standardListTypes = ['A', 'a', 'I', 'i', 'α', '1', '01', '1-']; // Add '1-' for rare list type
        if (standardListTypes.indexOf(startString) !== -1) {
            return undefined;
        }
        switch (listStyleType) {
            case 'decimal':
            case 'decimal-leading-zero':
                if (!isNaN(parseInt(startString, 10))) {
                    return parseInt(startString, 10);
                }
                break;
            case 'upper-alpha':
                return startString.split('.')[0].charCodeAt(0) - 64;
            case 'lower-alpha':
                return startString.split('.')[0].charCodeAt(0) - 96;
            case 'upper-roman':
                return this.upperRomanNumber.indexOf(startString.split('.')[0]) + 1;
            case 'lower-roman':
                return this.lowerRomanNumber.indexOf(startString.split('.')[0]) + 1;
            case 'lower-greek':
                return this.lowerGreekNumber.indexOf(startString.split('.')[0]) + 1;
        }
        return undefined;
    };
    /* Updates node style */
    WordListConverter.prototype.updateNodeStyle = function (node, style) {
        if (!isNOU(node.getAttribute('style'))) {
            node.style.cssText = style.replace('text-align:start;', '');
            node.style.textIndent = '';
            return node.getAttribute('style');
        }
        return '';
    };
    /* Replaces original nodes with converted lists */
    WordListConverter.prototype.replaceNodesWithLists = function (listNodes, convertedLists) {
        var currentNode = listNodes.shift();
        while (currentNode) {
            var elementsToInsert = [];
            // Find matching converted list
            for (var i = 0; i < convertedLists.length; i++) {
                if (convertedLists[i].node === currentNode) {
                    var convertedContent = convertedLists[i].content;
                    // Collect all child nodes
                    for (var j = 0; j < convertedContent.childNodes.length; j++) {
                        elementsToInsert.push(convertedContent.childNodes[j]);
                    }
                    // Insert before the original node
                    for (var j = 0; j < elementsToInsert.length; j++) {
                        currentNode.parentElement.insertBefore(elementsToInsert[j], currentNode);
                    }
                    break;
                }
            }
            // Remove the original node
            currentNode.remove();
            // Get next node
            currentNode = listNodes.shift();
            if (!currentNode) {
                currentNode = listNodes.shift();
            }
        }
    };
    /* Determines the CSS list-style-type based on list content and type */
    WordListConverter.prototype.getlistStyleType = function (listContent, listType) {
        // Extract the marker text before any period
        var markerText = listContent.split('.')[0];
        if (listType === 'ol') {
            return this.getOrderedListStyleType(markerText);
        }
        else {
            return this.getUnorderedListStyleType(markerText);
        }
    };
    /* Determines the CSS list-style-type for ordered lists */
    WordListConverter.prototype.getOrderedListStyleType = function (markerText) {
        var charCode = markerText.charCodeAt(0);
        // Check for Roman numerals
        if (this.upperRomanNumber.indexOf(markerText) > -1) {
            return 'upper-roman';
        }
        if (this.lowerRomanNumber.indexOf(markerText) > -1) {
            return 'lower-roman';
        }
        // Check for Greek letters
        if (this.lowerGreekNumber.indexOf(markerText) > -1) {
            return 'lower-greek';
        }
        // Check for uppercase letters (A-Z)
        if (charCode > 64 && charCode < 91) {
            return 'upper-alpha';
        }
        // Check for lowercase letters (a-z)
        if (charCode > 96 && charCode < 123) {
            return 'lower-alpha';
        }
        // Check for leading zero numbers (01, 02, etc.)
        var isLeadingZeroNumber = markerText.length > 1 &&
            markerText[0] === '0' && !isNaN(Number(markerText));
        if (isLeadingZeroNumber) {
            return 'decimal-leading-zero';
        }
        // Default to decimal
        return 'decimal';
    };
    /* Determines the CSS list-style-type for unordered lists */
    WordListConverter.prototype.getUnorderedListStyleType = function (markerText) {
        switch (markerText) {
            case 'o':
                return 'circle';
            case '§':
                return 'square';
            default:
                return 'disc';
        }
    };
    /* Converts a collection of MSWord list items into HTML list elements */
    WordListConverter.prototype.makeConversion = function (collection) {
        var rootElement = createElement('div');
        var CURRENT_ITEM_CLASS = 'e-current-list-item';
        if (collection.length === 0) {
            return rootElement;
        }
        var currentListElement;
        var currentNestingLevel = 1;
        var currentListItem;
        var listItemCount = 0;
        var currentFormatOverride = collection[0].listFormatOverride;
        for (var i = 0; i < collection.length; i++) {
            var currentItem = collection[i];
            var isStandardList = this.isStandardListType(currentItem.class);
            // Remove tracking class from previous item
            if (currentListItem) {
                currentListItem.classList.remove(CURRENT_ITEM_CLASS);
            }
            // Reset previous list item if list type changes
            if (this.shouldResetListItem(currentListItem, i, collection, isStandardList)) {
                currentListItem = null;
            }
            // Create paragraph element with content
            var paragraphElement = this.createParagraphWithContent(currentItem);
            // Handle different nesting scenarios
            if (this.isNewRootList(currentItem, listItemCount, currentFormatOverride)) {
                // Create new root list
                currentListElement = this.createRootList(rootElement, currentItem, paragraphElement);
                currentListItem = currentListElement.querySelector('.' + CURRENT_ITEM_CLASS);
            }
            else if (this.isSameLevelList(currentItem, currentNestingLevel, currentFormatOverride)) {
                // Add item to same level list
                currentListElement = this.addToSameLevelList(currentItem, currentListElement, paragraphElement, currentListItem, rootElement);
                currentListItem = currentListElement.querySelector('.' + CURRENT_ITEM_CLASS);
            }
            else if (this.isDeeperNestedList(currentItem, currentNestingLevel)) {
                // Create deeper nested list
                currentListElement = this.createNestedList(currentItem, currentListItem, paragraphElement, isStandardList, rootElement, currentNestingLevel);
                currentListItem = currentListElement.querySelector('.' + CURRENT_ITEM_CLASS);
            }
            else if (this.isTopLevelList(currentItem)) {
                // Create or use existing top-level list
                currentListElement = this.handleTopLevelList(currentItem, rootElement, paragraphElement);
                currentListItem = currentListElement.querySelector('.' + CURRENT_ITEM_CLASS);
            }
            else {
                // Handle other nesting scenarios
                this.handleOtherNestingScenarios(currentItem, currentListItem, paragraphElement, currentFormatOverride);
                currentListItem = rootElement.querySelector('.' + CURRENT_ITEM_CLASS);
            }
            // Apply styles and attributes to list item
            this.applyListItemStyles(currentListItem, currentItem);
            // Update state for next iteration
            currentNestingLevel = currentItem.nestedLevel;
            currentFormatOverride = currentItem.listFormatOverride;
            listItemCount++;
            // Set start attribute if needed
            this.setStartAttributeIfNeeded(currentListElement, currentItem);
        }
        // Clean up - remove tracking class from any remaining elements
        var trackedItems = rootElement.querySelectorAll('.' + CURRENT_ITEM_CLASS);
        for (var i = 0; i < trackedItems.length; i++) {
            trackedItems[i].classList.remove(CURRENT_ITEM_CLASS);
            if (trackedItems[i].className === '') {
                trackedItems[i].removeAttribute('class');
            }
        }
        return rootElement;
    };
    /* Checks if the list item is a standard list type */
    WordListConverter.prototype.isStandardListType = function (className) {
        var standardListClasses = [
            'MsoListParagraphCxSpFirst',
            'MsoListParagraphCxSpMiddle',
            'MsoListParagraphCxSpLast'
        ];
        for (var i = 0; i < standardListClasses.length; i++) {
            if (!isNOU(className) && standardListClasses[i].indexOf(className) >= 0) {
                return true;
            }
        }
        return false;
    };
    /* Determines if the list item should be reset */
    WordListConverter.prototype.shouldResetListItem = function (listItem, index, collection, isStandardList) {
        return !isNOU(listItem) &&
            index !== 0 &&
            collection[index - 1].listType !== collection[index].listType &&
            !isStandardList;
    };
    /* Creates a paragraph element with content */
    WordListConverter.prototype.createParagraphWithContent = function (item) {
        var paragraphElement = createElement('p', { className: 'MsoNoSpacing' });
        paragraphElement.innerHTML = item.content.join(' ');
        return paragraphElement;
    };
    /* Checks if this is a new root list */
    WordListConverter.prototype.isNewRootList = function (item, listCount, formatOverride) {
        return item.nestedLevel === 1 &&
            (listCount === 0 || formatOverride !== item.listFormatOverride) &&
            item.content.length > 0;
    };
    /* Creates a root list element */
    WordListConverter.prototype.createRootList = function (rootElement, item, paragraphElement) {
        var listElement = createElement(item.listType, { className: item.class });
        var listItem = createElement('li');
        listItem.appendChild(paragraphElement);
        listElement.appendChild(listItem);
        rootElement.appendChild(listElement);
        listElement.setAttribute('level', item.nestedLevel.toString());
        if (item.class !== 'msolistparagraph') {
            listElement.style.marginLeft = item.styleMarginLeft;
        }
        else {
            addClass([listElement], 'marginLeftIgnore');
        }
        listElement.style.listStyleType = item.listStyleTypeName;
        listItem.classList.add('e-current-list-item');
        return listElement;
    };
    /* Checks if this is a same level list item */
    WordListConverter.prototype.isSameLevelList = function (item, currentLevel, formatOverride) {
        return item.nestedLevel === currentLevel && formatOverride === item.listFormatOverride;
    };
    /* Adds an item to a same level list */
    WordListConverter.prototype.addToSameLevelList = function (item, listElement, paragraphElement, listItem, rootElement) {
        if (!isNOU(listItem) && !isNOU(listItem.parentElement) &&
            listItem.parentElement.tagName.toLowerCase() === item.listType) {
            // Add to existing list
            var newListItem = createElement('li');
            newListItem.classList.add('e-current-list-item');
            newListItem.appendChild(paragraphElement);
            listItem.parentElement.appendChild(newListItem);
            return listItem.parentElement;
        }
        else if (isNOU(listItem)) {
            // Create new list
            var newListElement = createElement(item.listType);
            newListElement.style.listStyleType = item.listStyleTypeName;
            var newListItem = createElement('li');
            newListItem.classList.add('e-current-list-item');
            newListItem.appendChild(paragraphElement);
            newListElement.appendChild(newListItem);
            newListElement.setAttribute('level', item.nestedLevel.toString());
            rootElement.appendChild(newListElement);
            return newListElement;
        }
        else {
            // Create new list at parent level
            var newListElement = createElement(item.listType);
            newListElement.style.listStyleType = item.listStyleTypeName;
            var newListItem = createElement('li');
            newListItem.classList.add('e-current-list-item');
            newListItem.appendChild(paragraphElement);
            newListElement.appendChild(newListItem);
            newListElement.setAttribute('level', item.nestedLevel.toString());
            listItem.parentElement.parentElement.appendChild(newListElement);
            return newListElement;
        }
    };
    /* Checks if this is a deeper nested list */
    WordListConverter.prototype.isDeeperNestedList = function (item, currentLevel) {
        return item.nestedLevel > currentLevel;
    };
    /* Creates a nested list */
    WordListConverter.prototype.createNestedList = function (item, listItem, paragraphElement, isStandardList, rootElement, currentNestingLevel) {
        var listElement;
        if (!isNOU(listItem)) {
            // Create nested list inside existing list item
            var levelDifference = item.nestedLevel - currentNestingLevel;
            for (var j = 0; j < levelDifference; j++) {
                listElement = createElement(item.listType);
                listItem.appendChild(listElement);
                listItem = createElement('li');
                // Set list-style-type: none for intermediate levels
                if (j !== levelDifference - 1 && levelDifference > 1) {
                    listItem.style.listStyleType = 'none';
                }
                listElement.appendChild(listItem);
            }
            listItem.classList.add('e-current-list-item');
            listItem.appendChild(paragraphElement);
            listElement.setAttribute('level', item.nestedLevel.toString());
            listElement.style.listStyleType = item.listStyleTypeName;
            return listElement;
        }
        else if (isStandardList) {
            // Create nested list for standard list type
            return this.createStandardNestedList(item, paragraphElement, rootElement);
        }
        else {
            // Create new root list with nesting level
            return this.createRootList(rootElement, item, paragraphElement);
        }
    };
    /* Creates a standard nested list */
    WordListConverter.prototype.createStandardNestedList = function (item, paragraphElement, rootElement) {
        var initialNode = createElement(item.listType);
        var listItem = createElement('li');
        var listElement;
        initialNode.appendChild(listItem);
        initialNode.style.listStyleType = 'none';
        for (var j = 0; j < item.nestedLevel - 1; j++) {
            listElement = createElement(item.listType);
            listItem.appendChild(listElement);
            listItem = createElement('li');
            listElement.appendChild(listItem);
            listElement.style.listStyleType = 'none';
        }
        listItem.classList.add('e-current-list-item');
        listItem.appendChild(paragraphElement);
        rootElement.appendChild(initialNode);
        listElement.setAttribute('level', item.nestedLevel.toString());
        listElement.style.listStyleType = item.listStyleTypeName;
        return listElement;
    };
    /* Gets the last list item from a list element */
    WordListConverter.prototype.getLastListItem = function (listElement) {
        return listElement.querySelector('li:last-child');
    };
    /* Checks if this is a top-level list */
    WordListConverter.prototype.isTopLevelList = function (item) {
        return item.nestedLevel === 1;
    };
    /* Handles top-level list creation or reuse */
    WordListConverter.prototype.handleTopLevelList = function (item, rootElement, paragraphElement) {
        var listElement;
        var lastChild = rootElement.lastChild;
        if (lastChild && lastChild.tagName.toLowerCase() === item.listType) {
            // Reuse existing list
            listElement = lastChild;
        }
        else {
            // Create new list
            listElement = createElement(item.listType);
            listElement.style.listStyleType = item.listStyleTypeName;
            rootElement.appendChild(listElement);
        }
        var listItem = createElement('li');
        listItem.appendChild(paragraphElement);
        listElement.appendChild(listItem);
        listElement.setAttribute('level', item.nestedLevel.toString());
        listItem.classList.add('e-current-list-item');
        return listElement;
    };
    /* Handles other nesting scenarios */
    WordListConverter.prototype.handleOtherNestingScenarios = function (item, listItem, paragraphElement, currentFormatOverride) {
        var currentElement = listItem;
        var listElement;
        while (currentElement.parentElement) {
            currentElement = currentElement.parentElement;
            var levelAttribute = currentElement.attributes.getNamedItem('level');
            if (levelAttribute) {
                var elementLevel = parseInt(levelAttribute.textContent, 10);
                if (elementLevel === item.nestedLevel && currentFormatOverride === item.listFormatOverride) {
                    // Same level and format - add to existing list
                    var newListItem = createElement('li');
                    newListItem.appendChild(paragraphElement);
                    currentElement.appendChild(newListItem);
                    newListItem.classList.add('e-current-list-item');
                    break;
                }
                else if (elementLevel === item.nestedLevel && currentFormatOverride !== item.listFormatOverride) {
                    // Same level but different format - create new list
                    this.createDifferentFormatList(item, currentElement, paragraphElement);
                    break;
                }
                else if (item.nestedLevel > elementLevel) {
                    // Deeper level - create nested list
                    listElement = createElement(item.listType);
                    var newListItem = createElement('li');
                    newListItem.appendChild(paragraphElement);
                    listElement.appendChild(newListItem);
                    currentElement.appendChild(listElement);
                    listElement.setAttribute('level', item.nestedLevel.toString());
                    listElement.style.listStyleType = item.listStyleTypeName;
                    newListItem.classList.add('e-current-list-item');
                    break;
                }
            }
        }
    };
    /* Creates a list with different format override */
    WordListConverter.prototype.createDifferentFormatList = function (item, parentElement, paragraphElement) {
        var listElement = createElement(item.listType);
        var listItem = createElement('li');
        listElement.appendChild(listItem);
        if (item.nestedLevel > 1) {
            for (var k = 0; k < item.nestedLevel - 1; k++) {
                listItem.appendChild(listElement = createElement(item.listType));
                listItem = createElement('li');
                listElement.appendChild(listItem);
                listElement.style.listStyleType = 'none';
            }
        }
        listItem.appendChild(paragraphElement);
        listItem.classList.add('e-current-list-item');
        parentElement.appendChild(listElement);
        listElement.setAttribute('level', item.nestedLevel.toString());
        listElement.style.listStyleType = item.listStyleTypeName;
    };
    /* Applies styles and attributes to a list item */
    WordListConverter.prototype.applyListItemStyles = function (listItem, item) {
        if (isNOU(listItem)) {
            return;
        }
        listItem.setAttribute('class', item.class);
        listItem.style.cssText = !isNOU(item.listStyle) ? item.listStyle : '';
    };
    /* Sets start attribute if needed */
    WordListConverter.prototype.setStartAttributeIfNeeded = function (listElement, item) {
        var needsStartAttribute = !isNOU(item.start) &&
            item.start !== 1 && item.listType === 'ol';
        if (needsStartAttribute) {
            listElement.setAttribute('start', item.start.toString());
        }
    };
    /* Extracts list content from an element */
    WordListConverter.prototype.getListContent = function (element) {
        var firstChild = element.firstElementChild;
        if (firstChild.childNodes.length > 0) {
            //Add to support separate list which looks like same list and also to add all tags as it is inside list
            this.handleTextList(element, firstChild);
        }
        this.listContents.push(element.innerHTML);
    };
    /* Handles text list content */
    WordListConverter.prototype.handleTextList = function (element, firstChild) {
        // Clean up list ignore tags
        this.cleanupListIgnoreTags(firstChild);
        // Clean up list order
        var listOrderElement = this.cleanupListOrder(firstChild);
        this.processListOrderElement(element, firstChild, listOrderElement);
    };
    /* Cleans up list ignore tags */
    WordListConverter.prototype.cleanupListIgnoreTags = function (firstChild) {
        var listIgnoreTags = firstChild.querySelectorAll('[style*="mso-list"]');
        for (var i = 0; i < listIgnoreTags.length; i++) {
            var tag = listIgnoreTags[i];
            var style = tag.getAttribute('style').replace(/\n/g, '');
            tag.setAttribute('style', style);
        }
    };
    /* Cleans up list order element */
    WordListConverter.prototype.cleanupListOrder = function (firstChild) {
        var listOrderCleanup = firstChild.querySelector('span[style*="mso-list"]');
        if (listOrderCleanup) {
            var style = listOrderCleanup.getAttribute('style');
            if (style) {
                style = style.replace(/\s*:\s*/g, ':');
                listOrderCleanup.setAttribute('style', style);
            }
        }
        return firstChild.querySelector('span[style="mso-list:Ignore"]');
    };
    /* Processes list order element */
    WordListConverter.prototype.processListOrderElement = function (element, firstChild, listOrderElement) {
        var isEmptyMarkerSpan = isNOU(listOrderElement);
        listOrderElement = isEmptyMarkerSpan ? firstChild : listOrderElement;
        if (!isNOU(listOrderElement)) {
            var textContent = listOrderElement.textContent.trim();
            if (isEmptyMarkerSpan) {
                textContent = this.extractBulletMarker(listOrderElement, textContent);
            }
            this.listContents.push(textContent);
            if (!isEmptyMarkerSpan) {
                detach(listOrderElement);
            }
            this.parent.removeComments(element);
            this.parent.removeUnwantedElements(element);
        }
    };
    /* Extracts bullet marker from text content */
    WordListConverter.prototype.extractBulletMarker = function (listOrderElement, textContent) {
        var bulletPattern = /^(\d{1,2}|[a-zA-Z]|[*#~•○■])(\.|\)|-)\s*/;
        var textContentMatch = textContent.match(bulletPattern);
        if (!isNOU(textContentMatch)) {
            var markerText = textContentMatch[0].trim();
            listOrderElement.textContent = listOrderElement.textContent.trim().substring(markerText.length).trim();
            return markerText;
        }
        return textContent;
    };
    return WordListConverter;
}());
export { WordListConverter };
