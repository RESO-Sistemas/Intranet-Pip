import { ChildProperty, Property, Collection, Event, select, compile, createElement, updateCSSText, detach, isNullOrUndefined, SanitizeHtmlHelper, EventHandler, getComponent, getUniqueID, addClass, removeClass, Browser, print, formatUnit, Observer, extend, remove, Component, L10n, append, Complex, NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { Mention, DropDownList } from '@syncfusion/ej2-dropdowns';
import { Toolbar, Menu, ContextMenu, Tab } from '@syncfusion/ej2-navigations';
import { Tooltip, Dialog, Popup, getScrollableParent } from '@syncfusion/ej2-popups';
import { ColorPicker, Uploader } from '@syncfusion/ej2-inputs';
import { ProgressBar } from '@syncfusion/ej2-progressbar';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents a user model for a block in the block editor component.
 */
class User extends ChildProperty {
}
__decorate([
    Property('')
], User.prototype, "id", void 0);
__decorate([
    Property('')
], User.prototype, "user", void 0);
__decorate([
    Property('')
], User.prototype, "avatarUrl", void 0);
__decorate([
    Property('')
], User.prototype, "avatarBgColor", void 0);
__decorate([
    Property('')
], User.prototype, "cssClass", void 0);

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents a command item model used in the command menu of the block editor component.
 *
 * Each command item defines an action that can be performed in the editor, such as inserting a block type.
 *
 */
class CommandItem extends ChildProperty {
}
__decorate$1([
    Property('')
], CommandItem.prototype, "id", void 0);
__decorate$1([
    Property('')
], CommandItem.prototype, "type", void 0);
__decorate$1([
    Property(false)
], CommandItem.prototype, "disabled", void 0);
__decorate$1([
    Property('')
], CommandItem.prototype, "iconCss", void 0);
__decorate$1([
    Property('')
], CommandItem.prototype, "label", void 0);
__decorate$1([
    Property('')
], CommandItem.prototype, "groupBy", void 0);
__decorate$1([
    Property('')
], CommandItem.prototype, "tooltip", void 0);
__decorate$1([
    Property('')
], CommandItem.prototype, "shortcut", void 0);

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents the settings for the command menu in the block editor component
 */
class CommandMenuSettings extends ChildProperty {
}
__decorate$2([
    Property('280px')
], CommandMenuSettings.prototype, "popupWidth", void 0);
__decorate$2([
    Property('300px')
], CommandMenuSettings.prototype, "popupHeight", void 0);
__decorate$2([
    Collection([], CommandItem)
], CommandMenuSettings.prototype, "commands", void 0);
__decorate$2([
    Event()
], CommandMenuSettings.prototype, "filtering", void 0);
__decorate$2([
    Event()
], CommandMenuSettings.prototype, "itemSelect", void 0);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Inline toolbar settings that will be opened when selecting a range of texts.
 */
class InlineToolbarSettings extends ChildProperty {
}
__decorate$3([
    Property('100%')
], InlineToolbarSettings.prototype, "popupWidth", void 0);
__decorate$3([
    Property(true)
], InlineToolbarSettings.prototype, "enable", void 0);
__decorate$3([
    Property(['Bold', 'Italic', 'Underline', 'Strikethrough', 'Color', 'BackgroundColor'])
], InlineToolbarSettings.prototype, "items", void 0);
__decorate$3([
    Event()
], InlineToolbarSettings.prototype, "itemClick", void 0);

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents a context menu item model in the block editor component.
 */
class ContextMenuItem extends ChildProperty {
}
__decorate$4([
    Property('')
], ContextMenuItem.prototype, "id", void 0);
__decorate$4([
    Property('')
], ContextMenuItem.prototype, "text", void 0);
__decorate$4([
    Property('')
], ContextMenuItem.prototype, "iconCss", void 0);
__decorate$4([
    Property(false)
], ContextMenuItem.prototype, "separator", void 0);
__decorate$4([
    Property('')
], ContextMenuItem.prototype, "shortcut", void 0);
__decorate$4([
    Collection([], ContextMenuItem)
], ContextMenuItem.prototype, "items", void 0);

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents ContextMenuSettings in the block editor component.
 */
class ContextMenuSettings extends ChildProperty {
}
__decorate$5([
    Property(true)
], ContextMenuSettings.prototype, "enable", void 0);
__decorate$5([
    Property(false)
], ContextMenuSettings.prototype, "showItemOnClick", void 0);
__decorate$5([
    Collection([], ContextMenuItem)
], ContextMenuSettings.prototype, "items", void 0);
__decorate$5([
    Property(null)
], ContextMenuSettings.prototype, "itemTemplate", void 0);
__decorate$5([
    Event()
], ContextMenuSettings.prototype, "beforeOpen", void 0);
__decorate$5([
    Event()
], ContextMenuSettings.prototype, "beforeClose", void 0);
__decorate$5([
    Event()
], ContextMenuSettings.prototype, "itemSelect", void 0);

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents BlockActionItem in the block editor component.
 */
class BlockActionItem extends ChildProperty {
}
__decorate$6([
    Property('')
], BlockActionItem.prototype, "id", void 0);
__decorate$6([
    Property('')
], BlockActionItem.prototype, "label", void 0);
__decorate$6([
    Property('')
], BlockActionItem.prototype, "iconCss", void 0);
__decorate$6([
    Property(false)
], BlockActionItem.prototype, "disabled", void 0);
__decorate$6([
    Property('')
], BlockActionItem.prototype, "tooltip", void 0);
__decorate$6([
    Property('')
], BlockActionItem.prototype, "shortcut", void 0);

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents BlockActionMenuSettings in the block editor component.
 */
class BlockActionMenuSettings extends ChildProperty {
}
__decorate$7([
    Property(true)
], BlockActionMenuSettings.prototype, "enable", void 0);
__decorate$7([
    Collection([], BlockActionItem)
], BlockActionMenuSettings.prototype, "items", void 0);
__decorate$7([
    Event()
], BlockActionMenuSettings.prototype, "beforeOpen", void 0);
__decorate$7([
    Event()
], BlockActionMenuSettings.prototype, "beforeClose", void 0);
__decorate$7([
    Event()
], BlockActionMenuSettings.prototype, "itemSelect", void 0);
__decorate$7([
    Property('230px')
], BlockActionMenuSettings.prototype, "popupWidth", void 0);
__decorate$7([
    Property('auto')
], BlockActionMenuSettings.prototype, "popupHeight", void 0);
__decorate$7([
    Property(true)
], BlockActionMenuSettings.prototype, "enableTooltip", void 0);

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures settings related to pasting content in the editor.
 * This property utilizes the PasteCleanupSettingsModel to specify various options and behaviors for paste operations.
 */
class PasteCleanupSettings extends ChildProperty {
}
__decorate$8([
    Property(['font-weight', 'font-style', 'text-decoration', 'text-transform'])
], PasteCleanupSettings.prototype, "allowedStyles", void 0);
__decorate$8([
    Property([])
], PasteCleanupSettings.prototype, "deniedTags", void 0);
__decorate$8([
    Property(true)
], PasteCleanupSettings.prototype, "keepFormat", void 0);
__decorate$8([
    Property(false)
], PasteCleanupSettings.prototype, "plainText", void 0);

var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents LabelItem in the block editor component.
 */
class LabelItem extends ChildProperty {
}
__decorate$9([
    Property('')
], LabelItem.prototype, "id", void 0);
__decorate$9([
    Property('')
], LabelItem.prototype, "text", void 0);
__decorate$9([
    Property('')
], LabelItem.prototype, "groupBy", void 0);
__decorate$9([
    Property('')
], LabelItem.prototype, "labelColor", void 0);
__decorate$9([
    Property('')
], LabelItem.prototype, "iconCss", void 0);

var __decorate$a = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures settings related to Label popup in the editor.
 * This property utilizes the LabelSettingsModel to specify various options and behaviors for paste operations.
 */
class LabelSettings extends ChildProperty {
}
__decorate$a([
    Collection([], LabelItem)
], LabelSettings.prototype, "items", void 0);
__decorate$a([
    Property('$')
], LabelSettings.prototype, "triggerChar", void 0);

/**
 * Enum representing the different block types available in the block editor component.
 * Each block type corresponds to a specific content format that can be used to create structured documents.
 */
var BlockType;
(function (BlockType) {
    /**
     * Represents a text block.
     * This block type is used for plain text content.
     */
    BlockType["Paragraph"] = "Paragraph";
    /**
     * Represents a heading block.
     * This block type is used for headings such as level 1, 2, 3 or 4.
     */
    BlockType["Heading"] = "Heading";
    /**
     * Represents a checklist block.
     * This block type is used for creating interactive to-do lists.
     */
    BlockType["Checklist"] = "Checklist";
    /**
     * Represents a bullet list block.
     * This block type is used for unordered lists.
     */
    BlockType["BulletList"] = "BulletList";
    /**
     * Represents a numbered list block.
     * This block type is used for ordered lists.
     */
    BlockType["NumberedList"] = "NumberedList";
    /**
     * Represents a code block.
     * This block type is used to display formatted code with syntax highlighting.
     */
    BlockType["Code"] = "Code";
    /**
     * Represents a quote block.
     * This block type is used to display quotations or excerpts from a text.
     */
    BlockType["Quote"] = "Quote";
    /**
     * Represents a callout block.
     * This block type is used to highlight important information or warnings.
     */
    BlockType["Callout"] = "Callout";
    /**
     * Represents a divider block.
     * This block type is used to insert horizontal dividers to separate sections of content.
     */
    BlockType["Divider"] = "Divider";
    /**
     * Represents a collapsible paragraph block.
     * This block type is used to display paragraphs that can be expanded or collapsed.
     */
    BlockType["CollapsibleParagraph"] = "CollapsibleParagraph";
    /**
     * Represents a collapsible heading 1 block.
     * This block type is used to display top-level headings that can be expanded or collapsed.
     */
    BlockType["CollapsibleHeading"] = "CollapsibleHeading";
    /**
     * Represents an image block.
     * This block type is used to display images.
     */
    BlockType["Image"] = "Image";
    /**
     * Represents a table block.
     * This block type is used to display data in a tabular format.
     */
    BlockType["Table"] = "Table";
    /**
     * Represents a template block.
     * This block type is used for predefined templates.
     */
    BlockType["Template"] = "Template";
})(BlockType || (BlockType = {}));
/**
 * Defines the type of content a block can hold.
 * This enum represents various content formats supported in the editor.
 */
var ContentType;
(function (ContentType) {
    /**
     * Represents plain text content.
     */
    ContentType["Text"] = "Text";
    /**
     * Represents a hyperlink.
     */
    ContentType["Link"] = "Link";
    /**
     * Represents a user mention.
     */
    ContentType["Mention"] = "Mention";
    /**
     * Represents a label or tag.
     */
    ContentType["Label"] = "Label";
})(ContentType || (ContentType = {}));
/**
 * Enum representing the built in items for inline toolbar.
 */
var CommandName;
(function (CommandName) {
    CommandName["Bold"] = "Bold";
    CommandName["Italic"] = "Italic";
    CommandName["Underline"] = "Underline";
    CommandName["Strikethrough"] = "Strikethrough";
    CommandName["Color"] = "Color";
    CommandName["BackgroundColor"] = "BackgroundColor";
    CommandName["Superscript"] = "Superscript";
    CommandName["Subscript"] = "Subscript";
    CommandName["Uppercase"] = "Uppercase";
    CommandName["Lowercase"] = "Lowercase";
    CommandName["Link"] = "Link";
    CommandName["InlineCode"] = "InlineCode";
    CommandName["Transform"] = "Transform";
})(CommandName || (CommandName = {}));

/**
 * Returns the current text selection range.
 *
 * @returns {Range | null} The start and end indices of the selection range, or null if no selection is active.
 */
function getSelectedRange() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
        return selection.getRangeAt(0);
    }
    return null;
}
/**
 * Sets the selection range in the editor.
 *
 * @param {Node} element - The HTML element to apply the selection range to.
 * @param {number} start - The start index of the selection.
 * @param {number} end - The end index of the selection.
 * @returns {void}
 */
function setSelectionRange(element, start, end) {
    const range = document.createRange();
    const selection = window.getSelection();
    if (selection) {
        range.setStart(element, start);
        range.setEnd(element, end);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
/**
 * Moves the cursor to a specific position considering formatted content
 *
 * @param {HTMLElement} element The container element
 * @param {number} position Character position within entire content (not just text nodes)
 * @returns {void}
 */
function setCursorPosition(element, position) {
    const selection = window.getSelection();
    if (!selection || !element) {
        return;
    }
    // Create a walker to traverse all text nodes
    const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node) => {
            return node.nodeType === Node.TEXT_NODE ||
                (node.nodeType === Node.ELEMENT_NODE && node.childNodes.length === 0)
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_SKIP;
        }
    });
    let currentPosition = 0;
    let targetNode;
    let targetOffset = 0;
    while (treeWalker.nextNode()) {
        const node = treeWalker.currentNode;
        const contentLength = node.textContent.length || 0;
        if (currentPosition + contentLength >= position) {
            targetNode = node;
            targetOffset = position - currentPosition;
            break;
        }
        currentPosition += contentLength;
    }
    // Fallback to end if position exceeds content length
    if (!targetNode) {
        targetNode = element;
        targetOffset = element.childNodes.length;
    }
    if (document.contains(targetNode)) {
        const range = document.createRange();
        if (targetNode.nodeType === Node.ELEMENT_NODE && targetNode.childNodes.length === 0) {
            range.setStart(targetNode, 0);
        }
        else {
            range.setStart(targetNode, Math.min(targetOffset, targetNode.textContent.length || 0));
        }
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
function getTextOffset(node, within) {
    let offset = 0;
    const walker = document.createTreeWalker(within, NodeFilter.SHOW_TEXT, null);
    let current = walker.nextNode();
    while (current && current !== node) {
        offset += current.textContent.length || 0;
        current = walker.nextNode();
    }
    return offset;
}
/**
 * Captures the current selection state, including the start and end blocks and offsets.
 *
 * @returns {IBlockSelectionState | null} The selection state or null if no selection is active.
 */
function captureSelectionState() {
    const range = getSelectedRange();
    if (!range) {
        return null;
    }
    const startBlock = getParentBlock(range.startContainer);
    const endBlock = getParentBlock(range.endContainer);
    if (!startBlock || !endBlock) {
        return null;
    }
    return {
        startBlockId: startBlock.id,
        endBlockId: endBlock.id,
        startContainerPath: getPathFromBlock(startBlock, range.startContainer),
        endContainerPath: getPathFromBlock(endBlock, range.endContainer),
        startOffset: range.startOffset,
        endOffset: range.endOffset,
        isCollapsed: range.collapsed
    };
}
/**
 * Retrieves the path from a block element to a target node.
 *
 * @param {HTMLElement} blockElement - The block element to start from.
 * @param {Node} targetNode - The target node to find the path to.
 * @returns {number[]} - The path as an array of indices.
 */
function getPathFromBlock(blockElement, targetNode) {
    const path = [];
    let currentNode = targetNode;
    while (currentNode && currentNode !== blockElement) {
        const parent = currentNode.parentNode;
        if (parent) {
            const index = Array.prototype.indexOf.call(parent.childNodes, currentNode);
            path.unshift(index);
            currentNode = parent;
        }
        else {
            break;
        }
    }
    return path;
}
/**
 * Retrieves a node from a block element using a path.
 *
 * @param {HTMLElement} blockElement - The block element to start from.
 * @param {number[]} path - The path as an array of indices.
 * @returns {Node | null} - The node at the specified path, or null if not found.
 */
function getNodeFromPath(blockElement, path) {
    let currentNode = blockElement;
    for (const index of path) {
        if (!currentNode.childNodes || index >= currentNode.childNodes.length) {
            return null; // Path is invalid
        }
        currentNode = currentNode.childNodes[parseInt(index.toString(), 10)];
    }
    return currentNode;
}

/**
 * Generates a unique ID with an optional prefix.
 *
 * @param {string} [prefix] - An optional prefix to differentiate models (e.g., "block", "user").
 * @returns {string} A unique ID consisting of a timestamp and random characters.
 */
function generateUniqueId(prefix) {
    const timestamp = Date.now().toString(36); // Base36 timestamp (millisecond precision)
    const randomPart = getRandomNumber().toString(36).substring(2, 10); // 8 random characters
    return `${prefix ? prefix + '-' : ''}${timestamp}${randomPart}`.toLowerCase();
}
/**
 * Calculates the absolute offset of a given node within its parent element.
 *
 * @param {HTMLElement} element - The parent element.
 * @param {Node} node - The node to calculate the offset for.
 * @param {number} relativeOffset - The offset relative to the node.
 * @returns {number} The absolute offset of the node within the parent element.
 */
function getAbsoluteOffset(element, node, relativeOffset) {
    let absoluteOffset = 0;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    while (walker.nextNode()) {
        const textNode = walker.currentNode;
        if (textNode === node) {
            return absoluteOffset + relativeOffset;
        }
        absoluteOffset += textNode.textContent.length || 0;
    }
    return absoluteOffset;
}
/**
 * Cleans up an HTML element by removing it from the DOM and setting its reference to null.
 *
 * @param {HTMLElement} element - The HTML element to clean up.
 * @returns {void}
 */
function cleanupElement(element) {
    if (element) {
        element.remove();
    }
    element = null;
}
/**
 * Returns the parent element if node is given or returns the element itself
 *
 * @param {Node} node - Node to get parent element.
 * @returns {HTMLElement} - The parent element
 */
function getParentElement(node) {
    return (node.nodeType === Node.TEXT_NODE) ? node.parentElement : node;
}
/**
 * Gets template content based on the template property value.
 *
 * @param {string | Function} template - Template property value.
 * @returns {Function} - Return template function.
 * @hidden
 */
function getTemplateFunction(template) {
    if (typeof template === 'string') {
        let content = '';
        try {
            const tempEle = select(template);
            if (tempEle) {
                //Return innerHTML incase of jsrenderer script else outerHTML
                content = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
            }
            else {
                content = template;
            }
        }
        catch (e) {
            content = template;
        }
        return compile(content);
    }
    else {
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        return compile(template);
    }
}
/**
 * Normalizes a selection range to ensure accurate text-node-based start/end.
 * Handles deep nesting, partial selections, and boundary cases without over-expansion.
 *
 * @param {Range} range - The raw selection range
 * @returns {void} Normalized range with text-node containers
 */
function normalizeRange(range) {
    if (range.collapsed) {
        return range.cloneRange();
    }
    const normalized = range.cloneRange();
    // Normalize start
    const start = getDeepestNodeAndOffset(range.startContainer, range.startOffset);
    normalized.setStart(start.node, start.offset);
    // Normalize end
    const end = getDeepestNodeAndOffset(range.endContainer, range.endOffset);
    normalized.setEnd(end.node, end.offset);
    // Preserve direction (forward/backward selection)
    if (normalized.collapsed && !range.collapsed) {
        normalized.collapse(range.startOffset <= range.endOffset);
    }
    return normalized;
}
/**
 * Creates an isolated copy of a model with independent references for all nested objects.
 *
 * This function creates a new instance of a model where all nested objects (including props,
 * styles, and other references) are also copied, preventing unintended modifications to the
 * original model or shared references. Use this function when you need to manipulate a model
 * without affecting other parts of the application that may reference the same object.
 *
 * @template T The type of the model to isolate
 * @param {T} item The original model to create an isolated copy from
 * @returns {T} A new instance of the model with independent references
 */
function decoupleReference(item) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const seen = new WeakMap();
    const cloneInternal = (obj) => {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (seen.has(obj)) {
            return seen.get(obj);
        }
        const copy = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
        seen.set(obj, copy);
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                copy[`${key}`] = cloneInternal(obj[`${key}`]);
            }
        }
        return copy;
    };
    return cloneInternal(item);
    /* eslint-enable @typescript-eslint/no-explicit-any */
}
function getInverseStyle(style) {
    const oppositeStyleMap = {
        superscript: 'subscript',
        subscript: 'superscript',
        uppercase: 'lowercase',
        lowercase: 'uppercase'
    };
    return oppositeStyleMap[`${style}`];
}
/**
 * Normalize URL by adding protocol if missing
 *
 * @param {string} url - URL to normalize.
 * @returns {string} - Normalized URL.
 */
function normalizeUrl(url) {
    if (!url.match(/^https?:\/\//i) && !url.startsWith('/')) {
        return 'https://' + url;
    }
    return url;
}
/**
 * Checks whether the given node is around special elements.
 * Some special elements are 'a', etc.
 *
 * @param {Node | null} node - The node to check.
 * @returns {boolean} - True if the node is around special elements, false otherwise.
 */
function isNodeAroundSpecialElements(node) {
    const specialElements = ['A'];
    const prevSibling = node.previousSibling;
    const nextSibling = node.nextSibling;
    return ((prevSibling && specialElements.indexOf(prevSibling.nodeName) > -1) ||
        (nextSibling && specialElements.indexOf(nextSibling.nodeName) > -1) ||
        (prevSibling && prevSibling.classList &&
            prevSibling.classList.contains('e-mention-chip')) ||
        (nextSibling && nextSibling.classList &&
            nextSibling.classList.contains('e-mention-chip')) ||
        (prevSibling && prevSibling.classList &&
            prevSibling.classList.contains('e-label-chip')) ||
        (nextSibling && nextSibling.classList &&
            nextSibling.classList.contains('e-label-chip')));
}
/**
 * Gets the deepest text node within an element
 *
 * @param {HTMLElement} element - The container element
 * @returns {Node} - The deepest text node or null if no text node is found
 */
function getDeepestTextNode(element) {
    const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    let deepestNode = null;
    while (treeWalker.nextNode()) {
        deepestNode = treeWalker.currentNode;
    }
    return deepestNode;
}
/**
 * Returns the auto generated avatar color based on the seed.
 *
 * @param {string} seed - The seed string to generate the color.
 * @returns {string} - The generated color.
 */
function getAutoAvatarColor(seed) {
    const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#845EC2'];
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}
/**
 * Returns the user initials based on the name.
 *
 * @param {string} name - The name to generate initials from.
 * @returns {string} - The generated initials.
 */
function getUserInitials(name) {
    const parts = name.trim().split(' ');
    const initials = parts.length > 1
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`
        : parts[0][0];
    return initials.toUpperCase();
}
/**
 * Returns the best accessible foreground color (black or white)
 * for a given background color to ensure good contrast.
 *
 * @param {string} backgroundColor - The background color in any CSS-supported format (hex, rgb, etc.)
 * @returns {string} - '#000000' or '#ffffff'
 */
function getAccessibleTextColor(backgroundColor) {
    const rgb = parseColor(backgroundColor);
    if (!rgb) {
        return '#000000';
    }
    const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
    return luminance > 0.5 ? '#000000' : '#ffffff';
}
function parseColor(color) {
    if (color.startsWith('#')) {
        let hex = color.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map((c) => c + c).join('');
        }
        if (hex.length !== 6) {
            return null;
        }
        const bigint = parseInt(hex, 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
        return {
            r: parseInt(rgbMatch[1], 10),
            g: parseInt(rgbMatch[2], 10),
            b: parseInt(rgbMatch[3], 10)
        };
    }
    return null;
}
function getRelativeLuminance(r, g, b) {
    const [R, G, B] = [r, g, b].map((channel) => {
        const c = channel / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
function getNormalizedKey(e) {
    const keys = [];
    if (e.ctrlKey || e.metaKey) {
        keys.push('ctrl');
    }
    if (e.altKey) {
        keys.push('alt');
    }
    if (e.shiftKey) {
        keys.push('shift');
    }
    const key = normalizeCode(e.code);
    keys.push(key);
    return keys.join('+');
}
function normalizeCode(code) {
    if (code.startsWith('Digit')) {
        return code.slice(5); // Digit1 -> 1
    }
    if (code.startsWith('Key')) {
        return code.slice(3).toLowerCase(); // KeyA -> a
    }
    const specialMap = {
        'Minus': '-',
        'Equal': '=',
        'Backquote': '`',
        'BracketLeft': '[',
        'BracketRight': ']',
        'Backslash': '\\',
        'Semicolon': ';',
        'Quote': '\'',
        'Comma': ',',
        'Period': '.',
        'Slash': '/',
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'Enter': 'enter',
        'Space': 'space',
        'Tab': 'tab'
    };
    return specialMap[`${code}`] || code.toLowerCase();
}
function createSvgElement(tagName, attributes) {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const element = document.createElementNS(SVG_NS, tagName);
    for (const key in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, key)) {
            const value = attributes[`${key}`];
            element.setAttribute(key, value);
        }
    }
    return element;
}
function createBaseSvg(viewBox = '0 0 24 24') {
    return createSvgElement('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox,
        fill: 'none',
        width: '18',
        height: '18'
    });
}
/**
 * @returns {number} A cryptographically secure random number.
 * @hidden
 */
function getRandomNumber() {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] / (0xFFFFFFFF + 1);
}

/* Events */
const events = {
    keydown: 'keydown',
    input: 'input',
    moduleChanged: 'moduleChanged',
    inlineToolbarCreated: 'inlineToolbarCreated',
    inlineToolbarItemClick: 'inlineToolbarItemClick',
    inlineToolbarBeforeOpen: 'inlineToolbarBeforeOpen',
    formattingPerformed: 'formatting-performed',
    cut: 'cut',
    copy: 'copy',
    paste: 'paste',
    destroy: 'destroy',
    rtlChanged: 'rtl-changed',
    contentChanged: 'contentChanged',
    blockAdded: 'blockAdded',
    blockRemoved: 'blockRemoved',
    blockMoved: 'blockMoved',
    blockTransformed: 'blockTransformed',
    undoRedoPerformed: 'undoRedoPerformed',
    undoStackChanged: 'undoStackChanged',
    localeChanged: 'localeChanged',
    editorClick: 'editorClick',
    documentClick: 'documentClick'
};
/* Action Types */
var actionType;
(function (actionType) {
    actionType["contentChanged"] = "contentChanged";
    actionType["formattingAction"] = "formattingAction";
    actionType["indent"] = "indent";
    actionType["checked"] = "checked";
    actionType["lineBreakAdded"] = "lineBreakAdded";
    actionType["isExpanded"] = "isExpanded";
    actionType["blockAdded"] = "blockAdded";
    actionType["blockRemoved"] = "blockRemoved";
    actionType["blockMoved"] = "blockMoved";
    actionType["multipleBlocksDeleted"] = "multipleBlocksDeleted";
    actionType["blockTransformed"] = "blockTransformed";
    actionType["multipleBlocksTransformed"] = "multipleBlocksTransformed";
    actionType["imageInsertion"] = "imageInsertion";
    actionType["clipboardPaste"] = "clipboardPaste";
    actionType["tableRowInserted"] = "tableRowInserted";
    actionType["tableRowDeleted"] = "tableRowDeleted";
    actionType["tableColumnInserted"] = "tableColumnInserted";
    actionType["tableColumnDeleted"] = "tableColumnDeleted";
    actionType["tableCellsCleared"] = "tableCellsCleared";
    actionType["tableCellsPasted"] = "tableCellsPasted";
    actionType["tableRowsDeleted"] = "tableRowsDeleted";
    actionType["tableColumnsDeleted"] = "tableColumnsDeleted";
    actionType["tableHeaderInput"] = "tableHeaderInput";
    actionType["tableColumnResized"] = "tableColumnResized";
})(actionType || (actionType = {}));
/* Commands */
const ADDBLOCK = 'ADDBLOCK';
const SPLITBLOCK = 'SPLITBLOCK';
const DELETEBLOCK = 'DELETEBLOCK';
const INDENTBLOCK = 'INDENTBLOCK';
const DELETEATCURSOR = 'DELETEATCURSOR';
const MOVEBLOCK = 'MOVEBLOCK';
const DUPLICATEBLOCK = 'DUPLICATEBLOCK';
const FORMATTINGACTION = 'FORMATTINGACTION';
const CLEAREVENTCHANGES = 'CLEAREVENTCHANGES';
const DELETE_NON_MERGABLEBLOCK = 'DELETE_NON_MERGABLEBLOCK';
/* Constant string values */
const RTL_CLS = 'e-rtl';
const DISABLED_CLS = 'e-disabled';
const HIDDEN_CLS = 'e-hidden';
const BLOCK_CONTAINER_ID = '_blockcontainer';
const BLOCK_CONTAINER_CLS = 'e-block-container';
const BLOCK_ID_PREFIX = 'block';
const INDENT_KEY = '--block-indent';
const BLOCK_CLS = 'e-block';
const CONTENT_CLS = 'e-block-content';
const CALLOUT_BLOCK_CLS = 'e-callout-block';
const QUOTE_BLOCK_CLS = 'e-quote-block';
const TOGGLE_BLOCK_CLS = 'e-toggle-block';
const CALLOUT_CONTENT_CLS = 'e-callout-content';
const QUOTE_CONTENT_CLS = 'e-quote-content';
const TOGGLE_CONTENT_CLS = 'e-toggle-content';
const TABLE_BLOCK_CLS = 'e-table-block';
const TABLE_CELL_BLK_CONTAINER = 'e-cell-blocks-container';
const TABLE_CELL_FOCUS = 'e-cell-focus';
const TABLE_COL_MIN_WIDTH = 60;
const TABLE_NEW_COL_WIDTH = 120;
const BLOCKACTION_MENUBAR_ID = '_blockaction-menubar';
const BLOCKACTION_POPUP_ID = '_blockaction-popup';
const BLOCKEDITOR_CONTEXTMENU_ID = '_contextmenu';
const BLOCKEDITOR_INLINETBAR_ID = '_inline-toolbar';
const INLINE_TBAR_POPUP_ID = '_inline-toolbar-popup';
const LINKDIALOG_ID = '_linkDialog';
const BLOCKACTION_MENUBAR_CLS = 'e-blockeditor-blockaction-menubar';
const BLOCKACTION_POPUP_CLS = 'e-blockeditor-blockaction-popup';
const BLOCKACTION_TOOLTIP_CLS = 'e-blockeditor-blockaction-tooltip';
const BLOCKEDITOR_CONTEXTMENU_CLS = 'e-blockeditor-contextmenu';
const BLOCKEDITOR_INLINETBAR_CLS = 'e-blockeditor-inline-toolbar';
const INLINE_TBAR_POPUP_CLS = 'e-blockeditor-inline-toolbar-popup';
const INLINE_TBAR_TOOLTIP_CLS = 'e-blockeditor-inline-toolbar-tooltip';
const LINKDIALOG_CLS = 'e-blockeditor-link-dialog';
const TBAR_ITEM_CLS = 'e-toolbar-item';

/**
 * Finds the closest parent element that matches the specified selector.
 *
 * @param {Node | HTMLElement} element - The starting element
 * @param {string} selector - The CSS selector to match
 * @returns {HTMLElement | null} The closest matching parent element or null if not found
 */
function findClosestParent(element, selector) {
    if (element.nodeType === Node.TEXT_NODE) {
        return element.parentElement.closest(selector) || null;
    }
    return element.closest(selector);
}
/**
 * Gets the computed absolute position of an element relative to the document.
 *
 * @param {HTMLElement} element - The element to get the position for
 * @returns {DOMRect} The element's position and dimensions
 */
function getElementRect(element) {
    return element.getBoundingClientRect();
}
/**
 * Checks if a node is contained within a container element.
 *
 * @param {Node} node - The node to check
 * @param {HTMLElement} container - The container element
 * @returns {boolean} True if the node is inside the container, false otherwise
 */
function isNodeInsideElement(node, container) {
    while (node) {
        if (node === container) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
/**
 * Renders the given string in a temp element and returns the Dom text node.
 *
 * @param {string} content - The content to render
 * @returns {Node} - Rendered dom text node
 */
function getDomTextNode(content) {
    const temp = document.createElement('div');
    temp.innerHTML = content;
    return temp.childNodes[0];
}
/**
 * Get all text nodes within a range
 *
 * @param {Range} range - Range to get nodes from
 * @returns {Node[]} - Collection of nodes
 */
function getNodesInRange(range) {
    const textNodes = [];
    const normalizedRange = normalizeRange(range);
    const blockEle = findClosestParent(normalizedRange.startContainer, `.${BLOCK_CLS}`);
    const contentEle = getBlockContentElement(blockEle);
    const walker = document.createTreeWalker(contentEle, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
            if (normalizedRange.intersectsNode(node)) {
                return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
        }
    });
    let node = walker.nextNode();
    while (node) {
        textNodes.push(node);
        node = walker.nextNode();
    }
    return textNodes;
}
/**
 * Creates formatting element based on the content model.
 *
 * @param {ContentModel} content - Content model.
 * @param {string | LinkData} value - Value to be set for the content.
 * @returns {Node} - Returns the formatted node.
 *
 */
function createFormattingElement(content, value) {
    const isInlineCode = content.properties.styles.inlineCode;
    const textNode = document.createTextNode(content.content);
    const isLinkType = content.contentType === ContentType.Link;
    const styles = content.properties.styles;
    const keys = Object.keys(styles);
    // For code: preserve raw entities (&lt;, &gt;, &nbsp;, etc.)
    // For normal text: decode entities (allow &nbsp; → space)
    let formattedElement = isInlineCode ? (textNode) : (getDomTextNode(content.content) || textNode);
    // If no formatting at all (and not a link), return raw text node
    if (keys.length === 0 && !isLinkType) {
        return textNode;
    }
    if (keys.length > 0) {
        for (const styleType of keys) {
            switch (styleType.toLowerCase()) {
                case 'bold':
                    formattedElement = wrapNodeWithTag(formattedElement, 'strong');
                    break;
                case 'italic':
                    formattedElement = wrapNodeWithTag(formattedElement, 'em');
                    break;
                case 'underline':
                    formattedElement = wrapNodeWithTag(formattedElement, 'u');
                    break;
                case 'strikethrough':
                    formattedElement = wrapNodeWithTag(formattedElement, 's');
                    break;
                case 'subscript':
                    formattedElement = wrapNodeWithTag(formattedElement, 'sub');
                    break;
                case 'superscript':
                    formattedElement = wrapNodeWithTag(formattedElement, 'sup');
                    break;
                case 'inlinecode':
                    formattedElement = wrapNodeWithTag(formattedElement, 'code');
                    formattedElement.className = 'e-be-inline-code';
                    break;
                case 'color':
                case 'backgroundcolor':
                case 'uppercase':
                case 'lowercase':
                    {
                        const val = styles[styleType];
                        formattedElement = wrapNodeWithSpan(formattedElement, styleType, val);
                    }
                    break;
            }
        }
    }
    if (isLinkType) {
        const linkData = value;
        const props = content.properties;
        formattedElement = wrapNodeWithTag(formattedElement, 'a');
        if (linkData && !linkData.shouldRemoveLink) {
            formattedElement.href = props.url;
            formattedElement.target = '_blank';
            formattedElement.title = props.url;
        }
    }
    return formattedElement;
}
/**
 * Wraps a node with a specified HTML tag.
 *
 * @param {Node} node - The node to wrap
 * @param {string} tagName - The HTML tag to wrap with
 * @returns {HTMLElement} The created wrapper element
 */
function wrapNodeWithTag(node, tagName) {
    const el = createElement(tagName);
    el.appendChild(node);
    return el;
}
/**
 * Wraps a node with a span and applies the specified style.
 *
 * @param {Node} node - The node to wrap
 * @param {string} styleType - The type of style to apply
 * @param {string | boolean} value - The style value
 * @returns {HTMLElement} The created span element
 */
function wrapNodeWithSpan(node, styleType, value) {
    const span = createElement('span');
    switch (styleType.toLowerCase()) {
        case 'color':
            updateCSSText(span, `color: ${value};`);
            break;
        case 'backgroundcolor':
            updateCSSText(span, `background-color: ${value};`);
            break;
        case 'uppercase':
            updateCSSText(span, `text-transform: ${value ? 'uppercase' : 'none'};`);
            break;
        case 'lowercase':
            updateCSSText(span, `text-transform: ${value ? 'lowercase' : 'none'};`);
            break;
    }
    span.appendChild(node);
    return span;
}
/**
 * Removes all break tags from an HTML element.
 *
 * @param {HTMLElement} element - The element to clean
 * @returns {void}
 */
function clearBreakTags(element) {
    element.innerHTML = element.innerHTML.replace(/<br>/g, '').trim();
}
/**
 * Checks if an element is empty (contains only whitespace or a single <br> tag).
 *
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} True if the element is empty, false otherwise
 */
function isElementEmpty(element) {
    return element.innerText.trim() === '' || element.innerHTML === '<br>';
}
/**
 * Removes all content after the split point from the current block.
 * Handles nested structures by walking up the tree and removing siblings after each level.
 *
 * @param {Node} splitPoint - The node where split occurred (startContainer after split)
 * @param {HTMLElement} contentElement - The top-level .e-block-content element (stop boundary)
 * @returns {void}
 */
function removeNodesAfterSplit(splitPoint, contentElement) {
    let currentNode = splitPoint;
    while (currentNode && currentNode !== contentElement) {
        const parent = currentNode.parentNode;
        // Remove currentNode and all its next siblings in this level
        let sibling = currentNode.nextSibling;
        while (sibling) {
            const nextSibling = sibling.nextSibling;
            parent.removeChild(sibling);
            sibling = nextSibling;
        }
        // Move up one level — now remove everything after this parent
        currentNode = parent;
    }
    contentElement.normalize();
}
function getDeepestNodeAndOffset(container, offset) {
    if (container.nodeType === Node.TEXT_NODE) {
        const textNode = container;
        const len = textNode.length;
        if (offset === len) {
            // At end → try to move to next text node
            const next = textNode.nextSibling;
            if (next) {
                return { node: next, offset: 0 };
            }
            // No next → stay at end
            return { node: textNode, offset: len };
        }
        return { node: textNode, offset: Math.min(offset, len) };
    }
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    let currentOffset = 0;
    let textNode = walker.nextNode();
    while (textNode) {
        const len = textNode.length;
        if (currentOffset + len > offset) {
            return { node: textNode, offset: offset - currentOffset };
        }
        currentOffset += len;
        textNode = walker.nextNode();
    }
    return null;
}

function toDomCol(dataCol, rowNumberEnabled) {
    return rowNumberEnabled ? dataCol + 1 : dataCol;
}
function toDomRow(dataRow, headerEnabled) {
    return headerEnabled ? dataRow + 1 : dataRow;
}
function toModelRow(domRow, headerEnabled) {
    return headerEnabled ? domRow - 1 : domRow;
}
function getDataCell(tableElement, row, col) {
    return tableElement.querySelector(`td[data-row="${row}"][data-col="${col}"]`)
        || tableElement.querySelector(`th[data-row="${row}"][data-col="${col}"]`);
}
function doesHtmlHasTable(html, text) {
    const htmlHasTable = !!(html && /<table[\s\S]*?>[\s\S]*?<\/table>/i.test(html));
    const textLooksTabular = !!(text && (text.indexOf('\t') !== -1 || /\r?\n.*\t/.test(text)));
    return htmlHasTable || textLooksTabular;
}
function getTableElements(blockId, rootEditorElement, blocks) {
    const blockEl = rootEditorElement.querySelector(`#${blockId}`);
    if (!blockEl) {
        return null;
    }
    const table = blockEl.querySelector('table.e-table-element');
    if (!table) {
        return null;
    }
    const block = getBlockModelById(blockId, blocks);
    const props = (block && block.properties) || {};
    return { table, props };
}
/**
 * Focuses all editable cells in the table.
 * Useful for "Select All" (Ctrl+A) inside a table.
 *
 * @param {HTMLElement} tableEl - The <table> element inside the table block
 * @returns {void}
 *
 * @hidden
 */
function focusAllCellsInTable(tableEl) {
    const cells = tableEl.querySelectorAll('td[role="gridcell"]');
    cells.forEach((cell) => {
        if (cell.classList.contains('e-row-number')) {
            return;
        }
        cell.classList.add(TABLE_CELL_FOCUS);
    });
}
/**
 * Removes the focus highlight from all cells in the given table.
 *
 * @param {Element} table - The table element
 * @returns {void}
 *
 * @hidden
 */
function removeFocusFromAllCells(table) {
    const focusedCells = table.querySelectorAll('.' + TABLE_CELL_FOCUS);
    if (focusedCells) {
        focusedCells.forEach((cell) => {
            cell.classList.remove(TABLE_CELL_FOCUS);
            cell.scrollLeft = 0;
        });
    }
}
/**
 * Returns the current width mode ('px' | 'percent')
 *
 * @param {HTMLTableElement} table - The table element
 * @returns {string} - width mode ('px' | 'percent')
 *
 * @hidden
 */
function getWidthMode(table) {
    return table.getAttribute('data-col-width-mode') === 'px' ? 'px' : 'percent';
}
/**
 * Sets the table width mode ('px' | 'percent')
 *
 * @param {HTMLTableElement} table - The table element
 * @param {string} mode - mode ('px' | 'percent')
 * @returns {void}
 *
 * @hidden
 */
function setTableWidthMode(table, mode) {
    table.setAttribute('data-col-width-mode', mode);
}
/**
 * Performs equal percentage distribution for all cols
 *
 * @param {HTMLTableElement} table - The table element
 * @param {ITableBlockSettings} props - The table settings
 * @returns {void}
 *
 * @hidden
 */
function applyEqualPercent(table, props) {
    const colgroup = table.querySelector('colgroup');
    const n = props.columns.length;
    const pct = 100 / Math.max(1, n);
    for (let i = 0; i < n; i++) {
        const domIdx = props.enableRowNumbers ? i + 1 : i;
        const colEl = colgroup.children[domIdx];
        colEl.style.width = `${pct.toFixed(2)}%`;
        props.columns[i].width = `${pct.toFixed(2)}%`;
    }
    setTableWidthMode(table, 'percent');
}
/**
 * Checks whether equal percent fits within the container
 *
 * @param {number} containerWidthPx - The table container width
 * @param {number} nCols - Total number of cols
 * @param {number} minColPx - The minimum value of a column
 * @returns {boolean} - The boolean value
 *
 * @hidden
 */
function projectEqualPercentFits(containerWidthPx, nCols, minColPx) {
    const pct = 100 / Math.max(1, nCols);
    const projectedPx = containerWidthPx * (pct / 100);
    return projectedPx >= minColPx;
}
/**
 * Changes width of all columns from percent to pixel units
 *
 * @param {HTMLTableElement} table - The table element
 * @param {ITableBlockSettings} props - The table settings
 * @param {object} defaultPxForNew - Default values of new col
 * @returns {void}
 *
 * @hidden
 */
function changeColWidthToPxUnits(table, props, defaultPxForNew) {
    const dataCols = getColgroupChildren(table);
    for (let i = 0; i < dataCols.length; i++) {
        let w = dataCols[i].getBoundingClientRect().width;
        if (defaultPxForNew && defaultPxForNew.index === i) {
            w = defaultPxForNew.width;
        }
        dataCols[i].style.width = `${w.toFixed(0)}px`;
        props.columns[i].width = `${w.toFixed(0)}px`;
    }
    setTableWidthMode(table, 'px');
}
function getColgroupChildren(table) {
    const colgroup = table.querySelector('colgroup');
    const dataCols = Array.from(colgroup.children)
        .filter((c) => !c.classList.contains('e-col-row-number'));
    return dataCols;
}
function getSelectedCells(tableBlock) {
    const table = tableBlock.querySelector('table');
    // 1. Whole row selection
    if (table.querySelector('tr.e-row-selected')) {
        return table.querySelectorAll('tr.e-row-selected td:not(.e-row-number)');
    }
    // 2. Whole column selection
    if (table.querySelector('td.e-col-selected')) {
        return table.querySelectorAll('td.e-col-selected, th.e-col-selected');
    }
    // 3. Default: individually focused cells
    return table.querySelectorAll(`td.${TABLE_CELL_FOCUS}, th.${TABLE_CELL_FOCUS}`);
}
// Returns true if there is any visual selection in the table block
function hasActiveTableSelection(tableBlockElement) {
    if (!tableBlockElement) {
        return false;
    }
    const selectedCells = getSelectedCells(tableBlockElement);
    // Rectangle selection
    if (selectedCells && selectedCells.length > 1) {
        return true;
    }
    // Row selection
    if (tableBlockElement.querySelector('tbody tr.e-row-selected')) {
        return true;
    }
    // Column selection
    if (tableBlockElement.querySelector('td.e-col-selected, th.e-col-selected')) {
        return true;
    }
    return false;
}

/**
 * Gets a block type from the element
 *
 * @param {HTMLElement} blockElement - The block element.
 * @returns {string} The block type
 */
function extractBlockTypeFromElement(blockElement) {
    return blockElement ? blockElement.getAttribute('data-block-type') : '';
}
/**
 * Finds a block by its ID.
 *
 * Searches recursively through the list of blocks to find a block with the specified ID.
 *
 * @param {string} blockId - The ID of the block.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {BlockModel | null} The matching block or null if not found.
 */
function getBlockModelById(blockId, blocks) {
    for (const block of blocks) {
        if (block.id === blockId) {
            return block;
        }
        // Recurse into container blocks (children)
        const props = block.properties;
        if (props && props.children && props.children.length > 0) {
            const childBlock = getBlockModelById(blockId, props.children);
            if (childBlock) {
                return childBlock;
            }
        }
        // Recurse into table cell blocks
        if (block.blockType === BlockType.Table && block.properties) {
            const tprops = block.properties;
            if (tprops.rows && Array.isArray(tprops.rows)) {
                for (const row of tprops.rows) {
                    for (const cell of row.cells) {
                        if (cell.blocks && cell.blocks.length) {
                            const inner = getBlockModelById(blockId, cell.blocks);
                            if (inner) {
                                return inner;
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
}
/**
 * Gets the index of a specific block element within the blocks array.
 *
 * @param {string} id - The id of the block element.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {number} The index of the block element in the blocks array, or -1 if not found.
 */
function getBlockIndexById(id, blocks) {
    if (blocks.length === 0 || !id) {
        return -1;
    }
    const blockModel = getBlockModelById(id, blocks);
    if (!blockModel) {
        return -1;
    }
    // Determine the array that directly contains this block
    const containerInfo = getContainerInfo(id, blocks);
    if (containerInfo && containerInfo.array) {
        return containerInfo.array.indexOf(blockModel);
    }
    return -1;
}
/**
 * Retrieves the content model associated with a specific DOM node within the block structure.
 *
 * @param {Node | null} node - The DOM node for which to find the corresponding content model.
 * @param {BlockModel[]} blocks - The list of blocks to search within.
 * @returns {ContentModel | null} - The content model corresponding to the node, or null if not found.
 */
function getContentModelByNode(node, blocks) {
    const blockElement = findClosestParent(node, '.' + BLOCK_CLS);
    const contentElement = getBlockContentElement(blockElement);
    const block = getBlockModelById(blockElement.id, blocks);
    const nodeOffset = getAbsoluteOffsetOfNode(node, contentElement);
    return findModelByTextOffset(block, nodeOffset);
}
/**
 * Calculates the absolute offset of a target node within a content element.
 *
 * @param {Node} targetNode - The DOM node whose offset is to be calculated.
 * @param {HTMLElement} contentElement - The root content element containing the target node.
 * @returns {number} - The absolute offset position of the target node, or -1 if not found.
 */
function getAbsoluteOffsetOfNode(targetNode, contentElement) {
    let offset = 0;
    let found = false;
    function traverse(node) {
        if (found) {
            return;
        }
        if (node === targetNode) {
            found = true;
            return;
        }
        if (node.nodeType === Node.TEXT_NODE) {
            offset += node.length;
        }
        else if (node.nodeType === Node.ELEMENT_NODE) {
            for (let i = 0; i < node.childNodes.length; i++) {
                traverse(node.childNodes[i]);
                if (found) {
                    return;
                }
            }
        }
    }
    traverse(contentElement);
    return found ? offset : -1;
}
/**
 * Finds the model within a block that corresponds to a specific text offset.
 * Traverses the content array of the block to locate the model containing the offset.
 *
 * @param {BlockModel} block - The block containing content models.
 * @param {number} offset - The absolute text offset to locate.
 * @returns {ContentModel | null} - The content model at the specified offset or null if not found.
 */
function findModelByTextOffset(block, offset) {
    let cumulativeOffset = 0;
    for (const model of block.content) {
        const modelLength = model.content.length;
        const modelEndOffset = cumulativeOffset + modelLength;
        if (offset >= cumulativeOffset && offset < modelEndOffset) {
            return model;
        }
        else if (modelLength === 0) {
            if (offset === cumulativeOffset) {
                return model;
            }
        }
        cumulativeOffset = modelEndOffset;
    }
    return null;
}
/**
 * Returns the blocks array that directly contains the given block id.
 * This may be the root blocks, a container block's children, or a table cell's blocks.
 *
 * @param {string} blockId - The ID of the block.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {BlockModel[]} The corresponding container array or null if not found.
 */
function getParentBlocksArray(blockId, blocks) {
    const info = getContainerInfo(blockId, blocks);
    return info ? info.array : null;
}
/**
 * Returns container info for the array that contains the given block id.
 *
 * @param {string} blockId - The ID of the block.
 * @param {BlockModel[]} blocks - The list of blocks.
 * @returns {IBlocksContainerInfo} The block container info or null if not found.
 */
function getContainerInfo(blockId, blocks) {
    const target = getBlockModelById(blockId, blocks);
    if (!target) {
        return null;
    }
    // If parentId empty, it is in root
    if (!target.parentId) {
        return { array: blocks, containerType: 'root', containerId: '' };
    }
    // Try as child of a container block
    const parentBlock = getBlockModelById(target.parentId, blocks);
    if (parentBlock && parentBlock.properties.children) {
        return {
            array: parentBlock.properties.children,
            containerType: 'children',
            containerId: parentBlock.id
        };
    }
    // Try as child of a table cell
    const cell = findCellById(target.parentId, blocks);
    if (cell) {
        return { array: cell.blocks, containerType: 'cell', containerId: cell.id };
    }
    // Fallback root
    return { array: blocks, containerType: 'root', containerId: '' };
}
/**
 * Locate a table cell by its id and return the Cell model.
 *
 * @param {string} cellId - Id of the cell
 * @param {BlockModel[]} blocks - Collection of blocks
 * @returns {TableCellModel} - An object of cell model
 */
function findCellById(cellId, blocks) {
    if (!cellId) {
        return null;
    }
    for (const block of blocks) {
        if (block.blockType === BlockType.Table) {
            const tprops = block.properties;
            if (tprops && tprops.rows) {
                for (const row of tprops.rows) {
                    for (const cell of row.cells) {
                        if (cell.id === cellId) {
                            return cell;
                        }
                    }
                }
            }
        }
    }
    return null;
}
/**
 * Gets the parent block.
 *
 * @param {HTMLElement | Node} element - The element for which you need to find the parent.
 * @returns {HTMLElement | null} The parent element if found, otherwise null.
 */
function getParentBlock(element) {
    // If the node is a text node, move to its parent element first
    if (element && element.nodeType === Node.TEXT_NODE) {
        element = element.parentElement;
    }
    while (element && element.nodeType === Node.ELEMENT_NODE) {
        if (element.classList.contains('e-block')) {
            return element;
        }
        element = element.parentNode;
    }
    return null;
}
/**
 * Gets the adjacent block of the current block based on the direction.
 *
 * @param {HTMLElement} currentBlock - The current block element.
 * @param {string} direction - The direction to find the adjacent block ('previous' or 'next').
 * @returns {HTMLElement | null} The adjacent block element if found, otherwise null.
 */
function getAdjacentBlock(currentBlock, direction) {
    if (!currentBlock) {
        return null;
    }
    const adjacentBlock = direction === 'previous'
        ? currentBlock.previousElementSibling
        : currentBlock.nextElementSibling;
    if (adjacentBlock instanceof HTMLElement && adjacentBlock.classList.contains('e-block')) {
        return adjacentBlock;
    }
    const calloutBlock = findClosestParent(currentBlock, '.' + CALLOUT_BLOCK_CLS);
    if (calloutBlock) {
        const calloutContent = calloutBlock.querySelector('.' + CALLOUT_CONTENT_CLS);
        if (direction === 'previous' && currentBlock === calloutContent.firstElementChild) {
            return calloutBlock.previousElementSibling;
        }
        else if (direction === 'next' && currentBlock === calloutContent.lastElementChild) {
            return calloutBlock.nextElementSibling;
        }
    }
    const quoteBlock = findClosestParent(currentBlock, '.' + QUOTE_BLOCK_CLS);
    if (quoteBlock) {
        const quoteContent = quoteBlock.querySelector('.' + QUOTE_CONTENT_CLS);
        if (quoteContent) {
            if (direction === 'previous' && currentBlock === quoteContent.firstElementChild) {
                // At the first line of quote → go to block before the quote
                return quoteBlock.previousElementSibling;
            }
            else if (direction === 'next' && currentBlock === quoteContent.lastElementChild) {
                // At the last line of quote → go to block after the quote
                return quoteBlock.nextElementSibling;
            }
        }
    }
    return null;
}
/**
 * Gets the actual content element inside the block.
 *
 * @param {HTMLElement} blockElement - The block element.
 * @returns {HTMLElement | null} The content element inside the block if found, otherwise null.
 */
function getBlockContentElement(blockElement) {
    if (!blockElement) {
        return null;
    }
    const blockType = blockElement.getAttribute('data-block-type');
    if (blockType && blockType.startsWith('Collapsible')) {
        return blockElement.querySelector('.e-toggle-header').querySelector('.' + CONTENT_CLS);
    }
    return blockElement.querySelector('.' + CONTENT_CLS);
}
/**
 * Gets the adjacent cell of the current cell based on the direction.
 *
 * @param {HTMLElement} table - The table element.
 * @param {string} direction - The direction to find the adjacent cell ('up', 'down', 'left', 'right').
 * @param {HTMLTableCellElement} currentCell - The current cell element.
 * @returns {HTMLElement | null} The adjacent cell element if found, otherwise null.
 */
function getAdjacentCell(table, direction, currentCell) {
    if (!currentCell) {
        return null;
    }
    const rowIndex = parseInt(currentCell.dataset.row, 10);
    const colIndex = parseInt(currentCell.dataset.col, 10);
    let targetRowIndex = rowIndex;
    let targetColIndex = colIndex;
    switch (direction) {
        case 'up':
            targetRowIndex = rowIndex - 1;
            break;
        case 'down':
            targetRowIndex = rowIndex + 1;
            break;
        case 'left':
            targetColIndex = colIndex - 1;
            break;
        case 'right':
            targetColIndex = colIndex + 1;
            break;
    }
    const targetCellSelector = `[data-row="${targetRowIndex}"][data-col="${targetColIndex}"]`;
    const targetCell = table.querySelector(targetCellSelector);
    return targetCell;
}
/**
 * Specifies whether the given block is a list type block.
 *
 * @param {string | BlockType} blockType - The type of the block.
 * @returns {boolean} - Returns true if the block is a list type block, otherwise false.
 */
function isListTypeBlock(blockType) {
    return blockType === BlockType.BulletList || blockType === BlockType.NumberedList || blockType === BlockType.Checklist;
}
/**
 * Specifies whether the given block is a children type block.
 *
 * @param {string | BlockType} blockType - The type of the block.
 * @returns {boolean} - Returns true if the block is a children type block, otherwise false.
 */
function isChildrenTypeBlock(blockType) {
    return blockType === BlockType.Callout || blockType === BlockType.Quote || (blockType && blockType.toString().startsWith('Collapsible'));
}
/**
 * Specifies whether the given block is a non content editable block.
 *
 * @param {string | BlockType} blockType - The type of the block.
 * @returns {boolean} - Returns true if the block is a non content editable block, otherwise false.
 */
function isNonContentEditableBlock(blockType) {
    return blockType === BlockType.Divider || blockType === BlockType.Image;
}
/**
 * Specifies whether the cursor is at edge of the block.(start or end)
 *
 * @param {HTMLElement} contentElement - The content element to check.
 * @param {boolean} isStart - Specifies whether to check for start or end of the block.
 * @returns {boolean} - Returns true if the cursor is at edge of the block, otherwise false.
 */
function isCursorAtEdge(contentElement, isStart) {
    const isCursorAtStart = isAtStartOfBlock(contentElement);
    const isCursorAtEnd = isAtEndOfBlock(contentElement);
    return isStart ? isCursorAtStart : isCursorAtEnd;
}
/**
 * Returns true if the current selection is at the start of the block.
 *
 * @param {HTMLElement} element - The block element to check.
 * @returns {boolean} True if the selection is at the start of the block, false otherwise.
 */
function isAtStartOfBlock(element) {
    if (!element) {
        return false;
    }
    const range = getSelectedRange();
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    const firstTextNode = walker.nextNode();
    const startContainer = normalizeIntoContentElement(range.startContainer);
    return (range.collapsed &&
        (startContainer === firstTextNode || startContainer === element) &&
        range.startOffset === 0);
}
/**
 * Returns true if the current selection is at the end of the block.
 *
 * @param {HTMLElement} element - The block element to check.
 * @returns {boolean} True if the selection is at the end of the block, false otherwise.
 */
function isAtEndOfBlock(element) {
    if (!element) {
        return false;
    }
    const range = getSelectedRange();
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    let lastTextNode = null;
    let totalLength = 0;
    while (walker.nextNode()) {
        lastTextNode = walker.currentNode;
        totalLength = lastTextNode.textContent.length;
    }
    return (range.collapsed &&
        (range.startContainer === lastTextNode || range.startContainer === element) &&
        range.startOffset === totalLength);
}
/**
 * Normalizes an element into a content element.
 *
 * @param {HTMLElement | Node} element - The element to normalize.
 * @returns {HTMLElement | Node} The normalized content element.
 *
 */
function normalizeIntoContentElement(element) {
    if (element instanceof HTMLElement && element.classList.contains('e-block')) {
        return element.querySelector('.' + CONTENT_CLS);
    }
    // else if (element instanceof HTMLElement && element.nodeName === 'BR') {
    //     return findTopLevelChildInContent(element, findClosestParent(element, '.' + constants.CONTENT_CLS));
    // }
    return element;
}
function cleanCheckmarkElement(blockElement) {
    const checkmarkElement = blockElement.querySelector('.e-checkmark-container');
    if (checkmarkElement) {
        detach(checkmarkElement);
    }
}
function isEmptyString(id) {
    return !id || id.trim() === '';
}
function isChildrenProp(block) {
    return block.properties && 'children' in block.properties;
}
function isAlwaysOnPlaceHolderBlk(blockType) {
    const showPlaceholdersAlwaysFor = [BlockType.BulletList, BlockType.Checklist, BlockType.NumberedList];
    return blockType && (showPlaceholdersAlwaysFor.indexOf(blockType) >= 0);
}
const nonMergableBlockTypes = new Set([BlockType.Image, BlockType.Divider]);
function isNonMergableBlock(blockElement) {
    return nonMergableBlockTypes.has(extractBlockTypeFromElement(blockElement));
}
/**
 * Gets the adjacent block of the current block based on the direction.
 *
 * @param {HTMLElement} currentBlock - The current block element.
 * @param {string} direction - The direction to find the adjacent block ('previous' or 'next').
 * @returns {HTMLElement | null} The adjacent block element if found, otherwise null.
 */
function getTargetBlock(currentBlock, direction) {
    if (!currentBlock) {
        return null;
    }
    const adjacentBlock = direction === 'previous'
        ? currentBlock.previousElementSibling
        : currentBlock.nextElementSibling;
    if (adjacentBlock instanceof HTMLElement && adjacentBlock.classList.contains('e-block')) {
        return adjacentBlock;
    }
    return null;
}
function getBlockSpecificRange(globalRange, blockElement) {
    const contentElement = getBlockContentElement(blockElement);
    const blockRange = document.createRange();
    const startTextNode = contentElement.firstChild.nodeType === Node.ELEMENT_NODE
        ? (getDeepestTextNode(contentElement.firstChild) || contentElement.firstChild) : contentElement.firstChild;
    const endTextNode = contentElement.lastChild.nodeType === Node.ELEMENT_NODE ?
        (getDeepestTextNode(contentElement.lastChild) || contentElement.lastChild) : contentElement.lastChild;
    const tableEle = blockElement.closest('.' + TABLE_BLOCK_CLS);
    const hasActiveSel = hasActiveTableSelection(tableEle);
    blockRange.selectNodeContents(contentElement);
    blockRange.setStart(startTextNode, 0);
    blockRange.setEnd(endTextNode, endTextNode.textContent.length);
    if (!globalRange || hasActiveSel) {
        return blockRange;
    }
    if (isNodeInsideElement(globalRange.startContainer, blockElement)) {
        blockRange.setStart(globalRange.startContainer, globalRange.startOffset);
    }
    if (isNodeInsideElement(globalRange.endContainer, blockElement)) {
        blockRange.setEnd(globalRange.endContainer, globalRange.endOffset);
    }
    return blockRange;
}

/**
 * Checks if the current operating system is macOS.
 *
 * @returns {boolean} - Returns `true` if the operating system is macOS, otherwise `false`.
 */
function isMacOS() {
    const userAgent = navigator.userAgent;
    return userAgent.indexOf('Mac OS') !== -1;
}
/**
 * Returns the modifier key based on the platform (Ctrl for non-macOS, Cmd for macOS).
 *
 * @returns {string} - Returns platform specific shortcut key.
 */
function getModifierKey() {
    return isMacOS() ? 'Cmd' : 'Ctrl';
}
/**
 * Returns the command menu items.
 *
 * @returns {CommandItemModel[]} - Returns the command menu items.
 */
function getCommandMenuItems() {
    const modifier = getModifierKey();
    const blockCommandOptions = [
        {
            id: 'checklist-command',
            type: BlockType.Checklist,
            groupBy: 'General',
            label: 'Checklist',
            tooltip: 'Create a checklist',
            iconCss: 'e-icons e-check-box',
            shortcut: `${modifier}+Shift+7`
        },
        {
            id: 'bullet-list-command',
            type: BlockType.BulletList,
            groupBy: 'General',
            label: 'Bullet List',
            tooltip: 'Create a bullet list',
            iconCss: 'e-icons e-list-unordered',
            shortcut: `${modifier}+Shift+8`
        },
        {
            id: 'numbered-list-command',
            type: BlockType.NumberedList,
            groupBy: 'General',
            label: 'Numbered List',
            tooltip: 'Create a numbered list',
            iconCss: 'e-icons e-list-ordered',
            shortcut: `${modifier}+Shift+9`
        },
        {
            id: 'divider-command',
            type: BlockType.Divider,
            groupBy: 'General',
            label: 'Divider',
            tooltip: 'Add a horizontal line',
            iconCss: 'e-icons e-be-divider',
            shortcut: `${modifier}+Shift+-`
        },
        {
            id: 'callout-command',
            type: BlockType.Callout,
            groupBy: 'General',
            label: 'Callout',
            tooltip: 'Add a callout block',
            iconCss: 'e-icons e-be-callout',
            shortcut: `${modifier}+Alt+C`
        },
        {
            id: 'code-command',
            type: BlockType.Code,
            groupBy: 'Insert',
            label: 'Code',
            tooltip: 'Insert a code block',
            iconCss: 'e-icons e-insert-code',
            shortcut: `${modifier}+Alt+K`
        },
        {
            id: 'table-command',
            type: BlockType.Table,
            groupBy: 'Insert',
            label: 'Table',
            tooltip: 'Insert a table block',
            iconCss: 'e-icons e-be-table',
            shortcut: `${modifier}+Alt+T`
        },
        {
            id: 'image-command',
            type: BlockType.Image,
            groupBy: 'Media',
            label: 'Image',
            tooltip: 'Insert a image block',
            iconCss: 'e-icons e-image',
            shortcut: `${modifier}+Alt+/`
        },
        {
            id: 'paragraph-command',
            type: BlockType.Paragraph,
            groupBy: 'Text Styles',
            label: 'Paragraph',
            tooltip: 'Add a paragraph',
            iconCss: 'e-icons e-be-paragraph',
            shortcut: `${modifier}+Alt+P`
        },
        {
            id: 'heading1-command',
            type: BlockType.Heading,
            groupBy: 'Text Styles',
            label: 'Heading 1',
            tooltip: 'Page title or main heading',
            iconCss: 'e-icons e-be-h1',
            shortcut: `${modifier}+Alt+1`
        },
        {
            id: 'heading2-command',
            type: BlockType.Heading,
            groupBy: 'Text Styles',
            label: 'Heading 2',
            tooltip: 'Section heading',
            iconCss: 'e-icons e-be-h2',
            shortcut: `${modifier}+Alt+2`
        },
        {
            id: 'heading3-command',
            type: BlockType.Heading,
            groupBy: 'Text Styles',
            label: 'Heading 3',
            tooltip: 'Subsection heading',
            iconCss: 'e-icons e-be-h3',
            shortcut: `${modifier}+Alt+3`
        },
        {
            id: 'heading4-command',
            type: BlockType.Heading,
            groupBy: 'Text Styles',
            label: 'Heading 4',
            tooltip: 'Smaller heading for nested content',
            iconCss: 'e-icons e-be-h4',
            shortcut: `${modifier}+Alt+4`
        },
        {
            id: 'collapsible-paragraph-command',
            type: BlockType.CollapsibleParagraph,
            groupBy: 'Text Styles',
            label: 'Collapsible Paragraph',
            tooltip: 'Add a collapsible paragraph block',
            iconCss: 'e-icons e-be-toggle-paragraph',
            shortcut: `${modifier}+Alt+5`
        },
        {
            id: 'collapsible-heading1-command',
            type: BlockType.CollapsibleHeading,
            groupBy: 'Text Styles',
            label: 'Collapsible Heading 1',
            tooltip: 'Add a collapsible heading1 block',
            iconCss: 'e-icons e-be-toggle-h1',
            shortcut: `${modifier}+Alt+6`
        },
        {
            id: 'collapsible-heading2-command',
            type: BlockType.CollapsibleHeading,
            groupBy: 'Text Styles',
            label: 'Collapsible Heading 2',
            tooltip: 'Add a collapsible heading2 block',
            iconCss: 'e-icons e-be-toggle-h2',
            shortcut: `${modifier}+Alt+7`
        },
        {
            id: 'collapsible-heading3-command',
            type: BlockType.CollapsibleHeading,
            groupBy: 'Text Styles',
            label: 'Collapsible Heading 3',
            tooltip: 'Add a collapsible heading3 block',
            iconCss: 'e-icons e-be-toggle-h3',
            shortcut: `${modifier}+Alt+8`
        },
        {
            id: 'collapsible-heading4-command',
            type: BlockType.CollapsibleHeading,
            groupBy: 'Text Styles',
            label: 'Collapsible Heading 4',
            tooltip: 'Add a collapsible heading4 block',
            iconCss: 'e-icons e-be-toggle-h4',
            shortcut: `${modifier}+Alt+9`
        },
        {
            id: 'quote-command',
            type: BlockType.Quote,
            groupBy: 'Text Styles',
            label: 'Quote',
            tooltip: 'Insert a quote block',
            iconCss: 'e-icons e-blockquote',
            shortcut: `${modifier}+Alt+Q`
        }
    ];
    return blockCommandOptions;
}
/**
 * Returns the label menu items.
 *
 * @returns {LabelItemModel[]} - Returns the label menu items.
 */
function getLabelMenuItems() {
    return [
        { id: 'progress', labelColor: '#678fff', text: 'In-progress', groupBy: 'Progress', iconCss: 'e-icons e-settings' },
        { id: 'hold', labelColor: '#ffdd5e', text: 'On-hold', groupBy: 'Progress', iconCss: 'e-icons e-pause' },
        { id: 'done', labelColor: '#5ac8fa', text: 'Done', groupBy: 'Progress', iconCss: 'e-icons e-check-box' },
        { id: 'high', labelColor: '#ff8a80', text: 'High', groupBy: 'Priority' },
        { id: 'medium', labelColor: '#ffb74d', text: 'Medium', groupBy: 'Priority' },
        { id: 'low', labelColor: '#81c784', text: 'Low', groupBy: 'Priority' }
    ];
}
/**
 * Returns the context menu items.
 *
 * @returns {ContextMenuItemModel[]} - Returns the context menu items.
 */
function getContextMenuItems() {
    const modifier = getModifierKey();
    return [
        { id: 'undo', text: 'Undo', iconCss: 'e-icons e-undo', shortcut: `${modifier}+Z` },
        { id: 'redo', text: 'Redo', iconCss: 'e-icons e-redo', shortcut: `${modifier}${isMacOS() ? '+Shift+Z' : '+Y'}` },
        { separator: true },
        { id: 'cut', text: 'Cut', iconCss: 'e-icons e-cut', shortcut: `${modifier}+X` },
        { id: 'copy', text: 'Copy', iconCss: 'e-icons e-copy', shortcut: `${modifier}+C` },
        { id: 'paste', text: 'Paste', iconCss: 'e-icons e-paste', shortcut: `${modifier}+V` },
        { separator: true },
        { id: 'increaseindent', text: 'Increase Indent', iconCss: 'e-icons e-increase-indent', shortcut: `${modifier}+]` },
        { id: 'decreaseindent', text: 'Decrease Indent', iconCss: 'e-icons e-decrease-indent', shortcut: `${modifier}+[` },
        { separator: true },
        { id: 'link', text: 'Link', iconCss: 'e-icons e-comment-show', shortcut: `${modifier}+K` }
    ];
}
/**
 * Returns the block action menu items.
 *
 * @returns {BlockActionItemModel[]} - Returns the block action menu items.
 */
function getBlockActionsMenuItems() {
    const modifier = getModifierKey();
    return [
        { id: 'duplicate', label: 'Duplicate', iconCss: 'e-icons e-duplicate', tooltip: 'Duplicates a block', shortcut: `${modifier}+D` },
        { id: 'delete', label: 'Delete', iconCss: 'e-icons e-trash', tooltip: 'Deletes a block', shortcut: `${modifier}+Shift+D` },
        { id: 'moveup', label: 'Move Up', iconCss: 'e-icons e-arrow-up', tooltip: 'Moves a block up', shortcut: `${modifier}+Shift+Up` },
        { id: 'movedown', label: 'Move Down', iconCss: 'e-icons e-arrow-down', tooltip: 'Moves a block down', shortcut: `${modifier}+Shift+Down` }
    ];
}
/**
 * Returns the inline toolbar items.
 *
 * @returns {IToolbarItemModel[]} - Returns the inline toolbar items.
 */
function getInlineToolbarItems() {
    const modifier = getModifierKey();
    const inlineToolbarItems = [
        {
            id: 'transform',
            tooltipText: 'Transform to',
            command: CommandName.Transform,
            template: '<span class="e-toolbar-transform-dropdown e-tbar-btn" id="toolbar-transform-dropdown"><span class="e-be-transform-block"></span></span>'
        },
        { id: 'bold', iconCss: 'e-icons e-bold', tooltipText: `Bold (${modifier}+B)`, command: CommandName.Bold, htmlAttributes: { 'data-command': CommandName.Bold } },
        { id: 'italic', iconCss: 'e-icons e-italic', tooltipText: `Italic (${modifier}+I)`, command: CommandName.Italic, htmlAttributes: { 'data-command': CommandName.Italic } },
        { id: 'underline', iconCss: 'e-icons e-underline', tooltipText: `Underline (${modifier}+U)`, command: CommandName.Underline, htmlAttributes: { 'data-command': CommandName.Underline } },
        { id: 'strikethrough', iconCss: 'e-icons e-strikethrough', tooltipText: `Strikethrough (${modifier}+Shift+X)`, command: CommandName.Strikethrough, htmlAttributes: { 'data-command': CommandName.Strikethrough } },
        { id: 'uppercase', iconCss: 'e-icons e-upper-case', tooltipText: 'Uppercase', command: CommandName.Uppercase, htmlAttributes: { 'data-command': CommandName.Uppercase } },
        { id: 'lowercase', iconCss: 'e-icons e-lower-case', tooltipText: 'Lowercase', command: CommandName.Lowercase, htmlAttributes: { 'data-command': CommandName.Lowercase } },
        { id: 'superscript', iconCss: 'e-icons e-superscript', tooltipText: 'Superscript', command: CommandName.Superscript, htmlAttributes: { 'data-command': CommandName.Superscript } },
        { id: 'subscript', iconCss: 'e-icons e-subscript', tooltipText: 'Subscript', command: CommandName.Subscript, htmlAttributes: { 'data-command': CommandName.Subscript } },
        { id: 'inlineCode', iconCss: 'e-icons e-insert-code', tooltipText: `InlineCode (${modifier}+\`)`, command: CommandName.InlineCode, htmlAttributes: { 'data-command': CommandName.InlineCode } },
        {
            id: 'color',
            tooltipText: 'Color',
            command: CommandName.Color,
            htmlAttributes: { 'data-command': CommandName.Color },
            template: '<span id="toolbar-color-dropdown"></span>'
        },
        {
            id: 'bgColor',
            tooltipText: 'Background Color',
            command: CommandName.BackgroundColor,
            htmlAttributes: { 'data-command': CommandName.BackgroundColor },
            template: '<span id="toolbar-bgcolor-dropdown"></span>'
        },
        {
            id: 'link',
            iconCss: 'e-icons e-link',
            tooltipText: `Link (${modifier}+K)`,
            command: CommandName.Link,
            htmlAttributes: { 'data-command': CommandName.Link }
        }
    ];
    return inlineToolbarItems;
}
/**
 * Returns the display template content for user mention
 *
 * @returns {string} - Returns the display template content
 */
function getUserMentionDisplayTemplate() {
    return '<div class="em-avatar" style="background-color: ${avatarBgColor};">${if(avatarUrl)} <img src="${avatarUrl}" alt="${user}" class="em-img" /> ${else} <div class="em-initial">${initials}</div> ${/if} </div><div class="em-content">${user}</div>';
}
/**
 * Returns the display template content for label mention
 *
 * @returns {string} - Returns the display template content
 */
function getLabelMentionDisplayTemplate() {
    return '${groupBy}: ${text}';
}
/**
 * Returns the language items of the code block.
 *
 * @returns {CodeLanguageModel[]} - Returns the code block language items.
 */
function getLanguageItems() {
    const codeLanguageItems = [
        { language: 'plaintext', label: 'Plain Text' },
        { language: 'c', label: 'C' },
        { language: 'csharp', label: 'C#' },
        { language: 'cpp', label: 'C++' },
        { language: 'css', label: 'CSS' },
        { language: 'diff', label: 'Diff' },
        { language: 'html', label: 'HTML' },
        { language: 'java', label: 'Java' },
        { language: 'javascript', label: 'JavaScript' },
        { language: 'php', label: 'PHP' },
        { language: 'python', label: 'Python' },
        { language: 'ruby', label: 'Ruby' },
        { language: 'sql', label: 'SQL' },
        { language: 'typescript', label: 'TypeScript' },
        { language: 'xml', label: 'XML' }
    ];
    return codeLanguageItems;
}
function getLocaleItems() {
    return {
        paragraph: 'Write something or ‘/’ for commands.',
        heading1: 'Heading 1',
        heading2: 'Heading 2',
        heading3: 'Heading 3',
        heading4: 'Heading 4',
        collapsibleParagraph: 'Collapsible Paragraph',
        collapsibleHeading1: 'Collapsible Heading 1',
        collapsibleHeading2: 'Collapsible Heading 2',
        collapsibleHeading3: 'Collapsible Heading 3',
        collapsibleHeading4: 'Collapsible Heading 4',
        bulletList: 'Add item',
        numberedList: 'Add item',
        checklist: 'Todo',
        quote: 'Write a quote',
        callout: 'Write a callout',
        addIconTooltip: 'Click to insert below',
        dragIconTooltipActionMenu: 'Click to open',
        dragIconTooltip: '(Hold to drag)',
        insertLink: 'Insert Link',
        linkText: 'Text',
        linkTextPlaceholder: 'Link text',
        linkUrl: 'URL',
        linkUrlPlaceholder: 'https://example.com',
        linkTitle: 'Title',
        linkTitlePlaceholder: 'Link title',
        linkOpenInNewWindow: 'Open in new window',
        linkInsert: 'Insert',
        linkRemove: 'Remove',
        linkCancel: 'Cancel',
        codeCopyTooltip: 'Copy code',
        imagePlaceholder: 'Add an image',
        embedImage: 'Embed image',
        tabHeaderUpload: 'Upload',
        tabHeaderEmbed: 'Embed link',
        embedPlaceholder: 'Paste the image link...',
        imgPlaceholderAriaLabel: 'Insert image - press Enter or Space to open upload dialog',
        badgeSuccess: 'Success',
        badgeError: 'Error',
        imageUrl: 'Image URL input'
    };
}
function getCurrentLocaleJson(localeInstance) {
    return {
        paragraph: localeInstance.getConstant('paragraph'),
        heading1: localeInstance.getConstant('heading1'),
        heading2: localeInstance.getConstant('heading2'),
        heading3: localeInstance.getConstant('heading3'),
        heading4: localeInstance.getConstant('heading4'),
        collapsibleParagraph: localeInstance.getConstant('collapsibleParagraph'),
        collapsibleHeading1: localeInstance.getConstant('collapsibleHeading1'),
        collapsibleHeading2: localeInstance.getConstant('collapsibleHeading2'),
        collapsibleHeading3: localeInstance.getConstant('collapsibleHeading3'),
        collapsibleHeading4: localeInstance.getConstant('collapsibleHeading4'),
        bulletList: localeInstance.getConstant('bulletList'),
        numberedList: localeInstance.getConstant('numberedList'),
        checklist: localeInstance.getConstant('checklist'),
        quote: localeInstance.getConstant('quote'),
        callout: localeInstance.getConstant('callout'),
        addIconTooltip: localeInstance.getConstant('addIconTooltip'),
        dragIconTooltipActionMenu: localeInstance.getConstant('dragIconTooltipActionMenu'),
        dragIconTooltip: localeInstance.getConstant('dragIconTooltip'),
        insertLink: localeInstance.getConstant('insertLink'),
        linkText: localeInstance.getConstant('linkText'),
        linkTextPlaceholder: localeInstance.getConstant('linkTextPlaceholder'),
        linkUrl: localeInstance.getConstant('linkUrl'),
        linkUrlPlaceholder: localeInstance.getConstant('linkUrlPlaceholder'),
        linkTitle: localeInstance.getConstant('linkTitle'),
        linkTitlePlaceholder: localeInstance.getConstant('linkTitlePlaceholder'),
        linkOpenInNewWindow: localeInstance.getConstant('linkOpenInNewWindow'),
        linkInsert: localeInstance.getConstant('linkInsert'),
        linkRemove: localeInstance.getConstant('linkRemove'),
        linkCancel: localeInstance.getConstant('linkCancel'),
        codeCopyTooltip: localeInstance.getConstant('codeCopyTooltip'),
        imagePlaceholder: localeInstance.getConstant('imagePlaceholder'),
        embedImage: localeInstance.getConstant('embedImage'),
        tabHeaderUpload: localeInstance.getConstant('tabHeaderUpload'),
        tabHeaderEmbed: localeInstance.getConstant('tabHeaderEmbed'),
        embedPlaceholder: localeInstance.getConstant('embedPlaceholder'),
        imgPlaceholderAriaLabel: localeInstance.getConstant('imgPlaceholderAriaLabel'),
        badgeSuccess: localeInstance.getConstant('badgeSuccess'),
        badgeError: localeInstance.getConstant('badgeError'),
        imageUrl: localeInstance.getConstant('imageUrl')
    };
}
const defaultTransformModel = [
    {
        id: 'paragraph-command',
        label: 'Paragraph',
        type: BlockType.Paragraph,
        iconCss: 'e-icons e-be-paragraph',
        shortcut: `${getModifierKey()}+Alt+P`,
        tooltip: 'Paragraph'
    },
    {
        id: 'heading1-command',
        label: 'Heading 1',
        type: BlockType.Heading,
        iconCss: 'e-icons e-be-h1',
        shortcut: `${getModifierKey()}+Alt+1`,
        tooltip: 'Heading 1'
    },
    {
        id: 'heading2-command',
        label: 'Heading 2',
        type: BlockType.Heading,
        iconCss: 'e-icons e-be-h2',
        shortcut: `${getModifierKey()}+Alt+2`,
        tooltip: 'Heading 2'
    },
    {
        id: 'heading3-command',
        label: 'Heading 3',
        type: BlockType.Heading,
        iconCss: 'e-icons e-be-h3',
        shortcut: `${getModifierKey()}+Alt+3`,
        tooltip: 'Heading 3'
    },
    {
        id: 'heading4-command',
        label: 'Heading 4',
        type: BlockType.Heading,
        iconCss: 'e-icons e-be-h4',
        shortcut: `${getModifierKey()}+Alt+4`,
        tooltip: 'Heading 4'
    },
    {
        id: 'checklist-command',
        label: 'Checklist',
        type: BlockType.Checklist,
        iconCss: 'e-icons e-check-box',
        shortcut: `${getModifierKey()}+Shift+7`,
        tooltip: 'Checklist'
    },
    {
        id: 'bullet-list-command',
        label: 'Bullet List',
        type: BlockType.BulletList,
        iconCss: 'e-icons e-list-unordered',
        shortcut: `${getModifierKey()}+Shift+8`,
        tooltip: 'Bullet List'
    },
    {
        id: 'numbered-list-command',
        label: 'Numbered List',
        type: BlockType.NumberedList,
        iconCss: 'e-icons e-list-ordered',
        shortcut: `${getModifierKey()}+Shift+9`,
        tooltip: 'Numbered List'
    }
];

/**
 * `Mention renderer` module is used to render Mention control in BlockEditor.
 *
 * @hidden
 */
class MentionRenderer {
    constructor(editor) {
        this.editor = editor;
    }
    /**
     * Renders the mention control in BlockEditor.
     *
     * @param {IMentionRenderOptions} args - specifies  the arguments.
     * @returns {Mention} - returns the mention object.
     * @hidden
     */
    renderMention(args) {
        return new Mention({
            mentionChar: args.mentionChar,
            dataSource: args.dataSource,
            highlight: args.highlight,
            allowSpaces: true,
            suffixText: '',
            fields: args.fields,
            itemTemplate: args.itemTemplate,
            displayTemplate: args.displayTemplate,
            popupWidth: args.popupWidth,
            popupHeight: args.popupHeight,
            change: args.change,
            filtering: args.filtering,
            beforeOpen: args.beforeOpen,
            select: args.select,
            locale: this.editor.locale,
            cssClass: (args.cssClass + (this.editor.cssClass ? (' ' + this.editor.cssClass) : '')),
            opened: (e) => {
                this.editor.blockManager.observer.notify('mentionOpened');
                if (args.opened) {
                    args.opened.call(this, e);
                }
            },
            closed: (e) => {
                if (args.beforeClose) {
                    args.beforeClose.call(this, e);
                }
            }
        }, args.element);
    }
}

class ToolbarRenderer {
    constructor(editor) {
        this.editor = editor;
    }
    /**
     * Renders the toolbar with the specified options.
     *
     * @param {IToolbarRenderOptions} args - The options for rendering the toolbar.
     * @returns {Toolbar} - The rendered toolbar instance.
     * @hidden
     */
    renderToolbar(args) {
        this.element = typeof args.element === 'string'
            ? this.editor.element.querySelector(args.element)
            : args.element;
        return new Toolbar({
            items: args.items,
            width: args.width,
            overflowMode: args.overflowMode,
            locale: this.editor.locale,
            cssClass: this.editor.cssClass,
            enableRtl: this.editor.enableRtl,
            enablePersistence: this.editor.enablePersistence,
            clicked: this.handleInlineToolbarItemClick.bind(this),
            created: this.handleInlineToolbarCreated.bind(this)
        }, this.element);
    }
    handleInlineToolbarCreated(args) {
        this.editor.notify(events.inlineToolbarCreated, args);
    }
    handleInlineToolbarItemClick(args) {
        this.editor.notify(events.inlineToolbarItemClick, args);
    }
}

/**
 * `Menu renderer` module is used to render menus in BlockEditor.
 *
 * @hidden
 */
class MenuBarRenderer {
    constructor(editor) {
        this.editor = editor;
    }
    /**
     * Renders Menu in BlockEditor.
     *
     * @param {IMenubarRenderOptions} args - specifies  the arguments.
     * @returns {Menu} - returns the Menu object.
     * @hidden
     */
    renderMenubar(args) {
        return new Menu({
            items: args.items,
            template: args.template,
            orientation: args.orientation,
            fields: args.fields,
            select: args.select,
            locale: this.editor.locale,
            cssClass: (args.cssClass + (this.editor.cssClass ? (' ' + this.editor.cssClass) : '')),
            enableRtl: this.editor.enableRtl,
            enablePersistence: this.editor.enablePersistence
        }, args.element);
    }
    /**
     * Renders ContextMenu in BlockEditor.
     *
     * @param {IMenubarRenderOptions} args - specifies  the arguments.
     * @returns {Menu} - returns the Menu object.
     * @hidden
     */
    renderContextMenu(args) {
        return new ContextMenu({
            target: args.target,
            items: args.items,
            showItemOnClick: args.showItemOnClick,
            itemTemplate: args.itemTemplate,
            locale: this.editor.locale,
            cssClass: (args.cssClass + (this.editor.cssClass ? (' ' + this.editor.cssClass) : '')),
            enableRtl: this.editor.enableRtl,
            enablePersistence: this.editor.enablePersistence,
            fields: args.fields,
            select: args.select,
            beforeOpen: args.beforeOpen,
            beforeClose: args.beforeClose,
            onOpen: args.open,
            onClose: args.close
        }, args.element);
    }
}

/**
 * `Tooltip renderer` module is used to render Tooltip in BlockEditor.
 *
 * @hidden
 */
class TooltipRenderer {
    constructor(editor) {
        this.editor = editor;
    }
    /**
     * Renders tooltip in BlockEditor.
     *
     * @param {ITooltipRenderOptions} args - specifies  the arguments.
     * @returns {Tooltip} - returns the Tooltip object.
     * @hidden
     */
    renderTooltip(args) {
        let element = args.element;
        if (typeof element == 'string') {
            element = document.querySelector(element);
        }
        const tooltipOptions = {
            target: args.target,
            position: args.position === 'RightCenter' ? (this.editor.enableRtl ? 'LeftCenter' : 'RightCenter') : args.position,
            showTipPointer: args.showTipPointer,
            windowCollision: args.windowCollision,
            beforeRender: args.beforeRender,
            locale: this.editor.locale,
            cssClass: (args.cssClass + (this.editor.cssClass ? (' ' + this.editor.cssClass) : '')),
            enableRtl: this.editor.enableRtl,
            enablePersistence: this.editor.enablePersistence,
            opensOn: 'Hover'
        };
        if (args.content) {
            tooltipOptions.content = args.content;
        }
        const tooltipObj = new Tooltip(tooltipOptions, element);
        return tooltipObj;
    }
    destroyTooltip(tooltip) {
        if (tooltip) {
            tooltip.destroy();
        }
    }
}

/**
 * `Dialog renderer` module is used to render dialog popups in BlockEditor.
 *
 * @hidden
 */
class DialogRenderer {
    constructor(editor) {
        this.editor = editor;
    }
    /**
     * Renders Dialog in BlockEditor.
     *
     * @param {IDialogRenderOptions} args - specifies  the arguments.
     * @returns {Dialog} - returns the Dialog object.
     * @hidden
     */
    renderDialog(args) {
        return new Dialog({
            header: args.headerTemplate,
            target: this.editor.element,
            footerTemplate: args.footerTemplate,
            content: args.contentTemplate,
            showCloseIcon: args.showCloseIcon,
            closeOnEscape: args.closeOnEscape,
            width: args.width,
            height: args.height,
            visible: args.visible,
            locale: this.editor.locale,
            cssClass: this.editor.cssClass,
            enableRtl: this.editor.enableRtl,
            enablePersistence: this.editor.enablePersistence
        }, args.element);
    }
}

/**
 * `DropDownList renderer` module is used to render DropDownList in BlockEditor.
 *
 * @hidden
 */
class DropDownListRenderer {
    constructor(editor) {
        this.editor = editor;
    }
    /**
     * Renders DropDownList in BlockEditor.
     *
     * @param {IDropDownListRenderOptions} args - specifies  the arguments.
     * @returns {DropDownList} - returns the DropDownList object.
     * @hidden
     */
    renderDropDownList(args) {
        const languageSelector = createElement('input', {
            id: (this.editor.element.id + '_' + 'code-ddl'),
            className: 'e-code-block-languages'
        });
        args.targetElement.appendChild(languageSelector);
        return new DropDownList({
            dataSource: args.dataSource,
            fields: args.fields,
            value: args.value,
            change: args.change,
            locale: this.editor.locale,
            cssClass: this.editor.cssClass,
            enableRtl: this.editor.enableRtl,
            enablePersistence: this.editor.enablePersistence
        }, languageSelector);
    }
}

class ColorPickerRenderer {
    constructor(editor) {
        this.editor = editor;
    }
    /**
     * Renders the colorpicker with the specified options.
     *
     * @param {IColorPickerRenderOptions} args - The options for rendering the colorpicker.
     * @returns {ColorPicker} - The rendered colorpicker instance.
     * @hidden
     */
    renderColorPicker(args) {
        const isBackground = args.type === 'bgColor';
        const fontColor = this.editor.fontColorSettings;
        const bgColor = this.editor.backgroundColorSettings;
        const mode = isBackground ? (bgColor.mode) : (fontColor.mode);
        const colorCode = isBackground ? (bgColor.colorCode) : (fontColor.colorCode);
        const modeSwitcher = isBackground ? !!bgColor.modeSwitcher : !!fontColor.modeSwitcher;
        const columns = isBackground ? (bgColor.columns) : (fontColor.columns);
        const value = isBackground ? (bgColor.default) : (fontColor.default);
        const colorPicker = new ColorPicker({
            enableRtl: this.editor.enableRtl,
            inline: false,
            mode: mode,
            modeSwitcher: modeSwitcher,
            noColor: true,
            showButtons: false,
            cssClass: this.editor.cssClass + 'e-be-color-picker',
            columns: columns,
            presetColors: colorCode,
            created: () => {
                const host = args.element.parentElement;
                host.tabIndex = -1;
                const cssClasses = colorPicker.cssClass.split(' ').filter(Boolean);
                const splitDiv = host.childNodes[1];
                splitDiv.classList.add(...cssClasses);
                const dropdownCls = args.type === 'bgColor' ? 'e-be-bgcolor-dropdown' : 'e-be-fontcolor-dropdown';
                const splitPickerElem = host.querySelector('.e-split-colorpicker');
                splitPickerElem.classList.add(...cssClasses);
                splitPickerElem.classList.add('e-dropdown', dropdownCls, 'e-icons');
                const dropdownBtn = host.querySelector('.e-dropdown-btn');
                dropdownBtn.classList.add(...cssClasses);
                dropdownBtn.classList.add('e-dropdown', dropdownCls);
                colorPicker.setProperties({ value: value });
            },
            beforeTileRender: (args) => {
                args.element.classList.add('e-color-palette');
                args.element.classList.add('e-custom-tile');
                if (args.value === '') {
                    args.element.classList.add('e-no-color');
                }
            },
            change: (pickerArgs) => {
                const colorpickerValue = pickerArgs.currentValue.rgba;
                args.onChange(colorpickerValue);
            },
            beforeModeSwitch: (args) => {
                const currentValue = colorPicker.value;
                if (currentValue === '') {
                    colorPicker.setProperties({ value: (args.mode === 'Picker') ? '#008000ff' : '' }, true);
                }
            }
        });
        colorPicker.appendTo(args.element);
        return colorPicker;
    }
    updatePickerProperties(picker, model) {
        const props = {};
        if (!isNullOrUndefined(model.default)) {
            props.value = model.default;
        }
        if (!isNullOrUndefined(model.columns)) {
            props.columns = model.columns;
        }
        if (!isNullOrUndefined(model.modeSwitcher)) {
            props.modeSwitcher = model.modeSwitcher;
        }
        if (!isNullOrUndefined(model.colorCode)) {
            props.presetColors = model.colorCode;
        }
        if (!isNullOrUndefined(model.mode)) {
            props.mode = model.mode;
        }
        if (Object.keys(props).length) {
            picker.setProperties(props);
        }
    }
}

/**
 * `Progressbar renderer` module is used to render Progressbar control in BlockEditor.
 *
 * @hidden
 */
class ProgressBarRenderer {
    constructor(editor) {
        this.editor = editor;
    }
    /**
     * Renders the progressbar control in BlockEditor.
     *
     * @param {IProgressBarRendererOptions} args - specifies the arguments.
     * @returns {ProgressBar} - returns the progressbar object.
     * @hidden
     */
    renderProgressBar(args) {
        const progressBarObj = new ProgressBar({
            type: args.type,
            value: args.value,
            height: args.height,
            width: args.width,
            trackThickness: args.trackThickness,
            progressThickness: args.progressThickness,
            showProgressValue: args.showProgressValue,
            animation: args.animation,
            margin: args.margin,
            minimum: args.minimum,
            maximum: args.maximum,
            enableRtl: this.editor.enableRtl
        });
        progressBarObj.appendTo(args.element);
        return progressBarObj;
    }
}

/**
 * `Tab renderer` module is used to render Tab control in BlockEditor.
 *
 * @hidden
 */
class TabRenderer {
    constructor(editor) {
        this.editor = editor;
    }
    /**
     * Renders the tab control in BlockEditor.
     *
     * @param {ITabRendererOptions} args - specifies the arguments.
     * @returns {Tab} - returns the tab object.
     * @hidden
     */
    renderTab(args) {
        return new Tab({
            items: args.items,
            selectedItem: args.selectedItem,
            enableRtl: this.editor.enableRtl,
            cssClass: args.cssClass,
            selected: args.selected
        }, args.element);
    }
}

/**
 * `Uploader renderer` module is used to render Uploader control in BlockEditor.
 *
 * @hidden
 */
class UploaderRenderer {
    constructor(editor) {
        this.editor = editor;
    }
    /**
     * Renders the uploader control in BlockEditor.
     *
     * @param {IUploaderRendererOptions} args - specifies the arguments.
     * @returns {Uploader} - returns the uploader object.
     * @hidden
     */
    renderUploader(args) {
        return new Uploader({
            asyncSettings: args.asyncSettings,
            multiple: args.multiple,
            allowedExtensions: args.allowedExtensions,
            maxFileSize: args.maxFileSize,
            dropArea: args.dropArea,
            enableRtl: this.editor.enableRtl,
            cssClass: args.cssClass,
            selected: args.selected,
            uploading: args.uploading,
            progress: args.progress,
            success: args.success,
            failure: args.failure,
            beforeUpload: args.beforeUpload,
            removing: args.removing
        }, args.element);
    }
}

/**
 * Creates a shallow copy of the given object, excluding specified properties.
 *
 * @param {any} obj - The object to copy.
 * @param {string[]} excludeKeys - Optional array of property keys to exclude from the copy.
 * @returns {any} A new object with copied properties.
 */
function cloneObject(obj, excludeKeys = []) {
    const result = Object.create(Object.getPrototypeOf(obj));
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && excludeKeys.indexOf(key) === -1) {
            result[key] = obj[key];
        }
    }
    return result;
}
/**
 * Transforms an array of ToolbarItemModel objects into an array of ItemModel objects.
 *
 * @param {IToolbarItemModel[]} items - The toolbar items to transform.
 * @returns {ItemModel[]} The transformed toolbar items.
 */
function transformIntoToolbarItem(items) {
    return items.map((item) => ({
        id: item.id,
        prefixIcon: item.iconCss,
        tooltipText: item.tooltipText,
        text: item.text,
        cssClass: item.cssClass,
        disabled: item.disabled,
        visible: item.visible,
        tabIndex: item.tabIndex,
        template: item.template,
        type: item.type,
        htmlAttributes: item.htmlAttributes,
        command: item.command
    }));
}
function sanitizeBlockActionItems(items) {
    return items.map((item) => ({
        id: item.id,
        label: item.label,
        iconCss: item.iconCss,
        disabled: item.disabled,
        tooltip: item.tooltip,
        shortcut: item.shortcut
    }));
}
function sanitizeCommandMenuItems(items) {
    return items.map((item) => ({
        id: item.id,
        type: item.type,
        disabled: item.disabled,
        iconCss: item.iconCss,
        label: item.label,
        groupBy: item.groupBy,
        tooltip: item.tooltip,
        shortcut: item.shortcut
    }));
}
function sanitizeLabelItems(items) {
    return items.map((item) => ({
        id: item.id,
        text: item.text,
        groupBy: item.groupBy,
        labelColor: item.labelColor,
        iconCss: item.iconCss
    }));
}
function sanitizeContextMenuItems(items) {
    return items.map((item) => ({
        id: item.id,
        text: item.text,
        iconCss: item.iconCss,
        separator: item.separator,
        shortcut: item.shortcut,
        items: sanitizeContextMenuItems(item.items)
    }));
}
function sanitizeHeadingProps(props) {
    const sanitizedInnerProps = props ? Object.assign({}, props) : {};
    const level = sanitizedInnerProps.level;
    if (!Number.isInteger(level) || level < 1 || level > 4) {
        sanitizedInnerProps.level = 1;
    }
    return sanitizedInnerProps;
}

/**
 * Sanitizes HTML content if enabled
 *
 * @param {string} html - The HTML content to sanitize.
 * @param {boolean} enableSanitizer - Whether to enable HTML sanitization.
 * @returns {string} - The sanitized HTML content.
 */
function sanitizeHelper(html, enableSanitizer) {
    if (!enableSanitizer) {
        return html;
    }
    return SanitizeHtmlHelper.sanitize(html);
}
/**
 * Decodes HTML entities in a string
 *
 * @param {string} value - specifies the string value
 * @returns {string} - returns the string
 */
function decode(value) {
    const entityMap = {
        '&lt;': '<',
        '&gt;': '>',
        '&nbsp;': ' ',
        '&quot;': '"',
        '&#039;': '\'',
        '&apos;': '\'',
        '&amp;': '&'
    };
    return value.replace(/&(?:amp|lt|gt|nbsp|quot|#039|apos);/g, (match) => entityMap[match]);
}
/**
 * Encodes HTML entities in a string
 *
 * @param {string} value - specifies the string value
 * @returns {string} - returns the string
 */
function encode(value) {
    return value.trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/\n/g, '<br>');
}
function escapeHTML(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

class FormattingHelper {
    /**
     * isBold method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isBold(node) {
        const nodeName = node.nodeName.toLowerCase();
        if (this.validBoldTags.has(nodeName)) {
            return true;
        }
        else if (this.inlineTagsSet.has(nodeName) && node.style) {
            const fontWeight = node.style.fontWeight;
            return fontWeight && (fontWeight === 'bold' || parseInt(fontWeight, 10) >= 600);
        }
        return false;
    }
    /**
     * isItalic method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isItalic(node) {
        const nodeName = node.nodeName.toLowerCase();
        if (this.validItalicTags.has(nodeName)) {
            return true;
        }
        if (this.inlineTagsSet.has(nodeName) && node.style) {
            return node.style.fontStyle === 'italic';
        }
        return false;
    }
    /**
     * isUnderline method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isUnderline(node) {
        const nodeName = node.nodeName.toLowerCase();
        if (this.validUnderlineTags.has(nodeName)) {
            return true;
        }
        if (this.inlineTagsSet.has(nodeName) && node.style) {
            const style = node.style;
            return style.textDecoration === 'underline' || style.textDecorationLine === 'underline';
        }
        return false;
    }
    /**
     * isStrikethrough method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isStrikethrough(node) {
        const nodeName = node.nodeName.toLowerCase();
        if (this.validStrikethroughTags.has(nodeName)) {
            return true;
        }
        if (this.inlineTagsSet.has(nodeName) && node.style) {
            const style = node.style;
            return style.textDecoration === 'line-through' || style.textDecorationLine === 'line-through';
        }
        return false;
    }
    /**
     * isSuperscript method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isSuperscript(node) {
        return this.validSuperscriptTags.has(node.nodeName.toLowerCase());
    }
    /**
     * isSubscript method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isSubscript(node) {
        return this.validSubscriptTags.has(node.nodeName.toLowerCase());
    }
    /**
     * isInlineCode method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isInlineCode(node) {
        const nodeName = node.nodeName.toLowerCase();
        if (this.validInlineCodeTags.has(nodeName)) {
            return true;
        }
        return false;
    }
    /**
     * isLink method
     *
     * @param {Node} node - specifies the node value
     * @returns {boolean} - returns the boolean value
     * @hidden
     */
    static isLink(node) {
        return node.tagName === 'A' && node.hasAttribute('href');
    }
    static getLinkUrl(node) {
        const url = node.getAttribute('href');
        return url;
    }
    static getFontColor(node) {
        const color = this.getStyleProperty(node, 'color');
        return this.normalizeColor(color);
    }
    static getBackgroundColor(node) {
        const color = this.getStyleProperty(node, 'backgroundColor');
        return this.normalizeColor(color);
    }
    static getStyleProperty(node, property) {
        const nodeName = node.nodeName.toLowerCase();
        if (this.inlineTagsSet.has(nodeName) && node.style) {
            return node.style[property] || '';
        }
        return '';
    }
    /**
     * Converts RGB/RGBA color to hex format. If already hex or other format, returns as-is.
     *
     * @param {string} color - The color string (e.g., 'rgb(255, 0, 0)' or '#FF0000')
     * @returns {string} - The normalized color in hex format
     */
    static normalizeColor(color) {
        if (!color) {
            return '';
        }
        // If already hex format, return as-is
        if (color.startsWith('#')) {
            return color.toUpperCase();
        }
        // Handle rgb(...) or rgba(...) by simple parsing (avoid complex regex to prevent unsafe-regex lint)
        if (color.startsWith('rgb')) {
            const start = color.indexOf('(');
            const end = color.lastIndexOf(')');
            if (start > -1 && end > start) {
                const parts = color.substring(start + 1, end).split(',').map((p) => p.trim());
                const r = parseInt(parts[0] || '0', 10);
                const g = parseInt(parts[1] || '0', 10);
                const b = parseInt(parts[2] || '0', 10);
                const toHex = (n) => {
                    const hex = n.toString(16).toUpperCase();
                    return hex.length === 1 ? '0' + hex : hex;
                };
                if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
                }
            }
        }
        // No match or not rgb/rgba, return as-is
        // Return as-is if not recognized format
        return color;
    }
    /**
     * Check if a node has a specific format by traversing UP the DOM tree.
     *
     * @param {Node} node - The node to check
     * @param {string} format - The format to search for
     * @param {Node} endNode - Stop traversing at this node (usually block boundary)
     * @returns {HTMLElement | null} - The format element if found, null otherwise
     */
    static getFormattedNode(node, format, endNode) {
        let element = node.nodeType === Node.TEXT_NODE
            ? node.parentElement
            : node;
        while (element && (endNode === undefined || element !== endNode)) {
            if (this.isFormattedNode(element, format)) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    }
    /**
     * Count how many nodes in an array have a specific format.
     *
     * Used for deciding: apply or remove?
     * - If count === nodes.length: all have format → remove
     * - If count < nodes.length: some lack format → apply
     *
     * @param {Node[]} nodes - Array of nodes to check
     * @param {string} format - Format to count
     * @param {Node} endNode - Stop traversing at this node
     * @returns {number} - Count of nodes with the format
     */
    static countFormatted(nodes, format, endNode) {
        let count = 0;
        for (const node of nodes) {
            const isMentionNode = findClosestParent(node, '.e-mention-chip');
            if (this.getFormattedNode(node, format, endNode) || isMentionNode) {
                count++;
            }
        }
        return count;
    }
    /**
     * Checks if a given HTMLElement has the specified format applied.
     *
     * @param {HTMLElement} element - The element to check
     * @param {string} format - The format to verify
     * @returns {boolean} - True if the element has the format, false otherwise
     */
    static isFormattedNode(element, format) {
        if (!element || !element.tagName) {
            return false;
        }
        switch (format) {
            case 'bold':
                return FormattingHelper.isBold(element);
            case 'italic':
                return FormattingHelper.isItalic(element);
            case 'underline':
                return FormattingHelper.isUnderline(element);
            case 'strikethrough':
                return FormattingHelper.isStrikethrough(element);
            case 'subscript':
                return FormattingHelper.isSubscript(element);
            case 'superscript':
                return FormattingHelper.isSuperscript(element);
            case 'inlineCode':
                return FormattingHelper.isInlineCode(element);
            case 'color':
                return !!FormattingHelper.getFontColor(element);
            case 'backgroundColor':
                return !!FormattingHelper.getBackgroundColor(element);
            case 'uppercase':
                return element.style.textTransform === 'uppercase';
            case 'lowercase':
                return element.style.textTransform === 'lowercase';
            case 'link':
                return FormattingHelper.isLink(element);
            default:
                return false;
        }
    }
    /**
     * Determine if should apply or remove format
     * Based on whether all selected nodes have the format
     *
     * @param {Node[]} nodes - Nodes to perform check
     * @param {string} format - format to toggle
     * @param {Node} endNode - Optional node to limit traversal
     * @returns {boolean} - Whether to remove format or not
     */
    static shouldRemoveFormat(nodes, format, endNode) {
        // Value-based styles should never be "removed" in the toggle sense
        // They should be replaced with a new value instead
        const valueBasedFormats = ['color', 'backgroundColor', 'link'];
        if (valueBasedFormats.indexOf(format) !== -1) {
            return false; // Never auto-remove; let applyFormat handle the replacement
        }
        // For boolean styles (bold, italic, underline, etc.): remove if all nodes have it
        const formattedCount = this.countFormatted(nodes, format, endNode);
        return formattedCount === nodes.length;
    }
}
FormattingHelper.validBoldTags = new Set(['strong', 'b']);
FormattingHelper.validItalicTags = new Set(['em', 'i']);
FormattingHelper.validUnderlineTags = new Set(['u']);
FormattingHelper.validStrikethroughTags = new Set(['del', 'strike', 's']);
FormattingHelper.validSuperscriptTags = new Set(['sup']);
FormattingHelper.validSubscriptTags = new Set(['sub']);
FormattingHelper.validInlineCodeTags = new Set(['code']);
FormattingHelper.inlineTagsSet = new Set(['a', 'abbr', 'acronym', 'b', 'bdo', 'big', 'cite', 'code', 'dfn', 'em',
    'font', 'i', 'kbd', 'label', 'q', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'tt', 'u', 'var', 'del']);

/**
 * Factory class for creating block models and content
 */
class BlockFactory {
    static createBlockFromPartial(block) {
        switch (block.blockType) {
            case BlockType.Paragraph:
                return this.createParagraphBlock(block, block.properties);
            case BlockType.Heading:
                return this.createHeadingBlock(block, block.properties);
            case BlockType.Checklist:
                return this.createChecklistBlock(block, block.properties);
            case BlockType.BulletList:
                return this.createBulletListBlock(block, block.properties);
            case BlockType.NumberedList:
                return this.createNumberedListBlock(block, block.properties);
            case BlockType.Code:
                return this.createCodeBlock(block, block.properties);
            case BlockType.Quote:
                return this.createQuoteBlock(block, block.properties);
            case BlockType.Callout:
                return this.createCalloutBlock(block, block.properties);
            case BlockType.Divider:
                return this.createDividerBlock(block, block.properties);
            case BlockType.CollapsibleParagraph:
                return this.createCollapsibleParagraphBlock(block, block.properties);
            case BlockType.CollapsibleHeading:
                return this.createCollapsibleHeadingBlock(block, block.properties);
            case BlockType.Image:
                return this.createImageBlock(block, block.properties);
            case BlockType.Table:
                return this.createTableBlock(block, block.properties);
            case BlockType.Template:
                return this.createTemplateBlock(block, block.properties);
            default:
                return null;
        }
    }
    static createContentFromPartial(content) {
        switch (content.contentType) {
            case ContentType.Text:
                return this.createTextContent(content, content.properties);
            case ContentType.Link:
                return this.createLinkContent(content, content.properties);
            case ContentType.Mention:
                return this.createMentionContent(content, content.properties);
            case ContentType.Label:
                return this.createLabelContent(content, content.properties);
            default:
                return null;
        }
    }
    /**
     * Creates a checklist block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block model
     * @param {Partial<IChecklistBlockSettings>} innerProps Optional props for the checklist
     * @returns {BlockModel} A new checklist block
     */
    static createChecklistBlock(rootProps = {}, innerProps = {}) {
        return Object.assign({ blockType: BlockType.Checklist }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(BLOCK_ID_PREFIX) } : {}), { properties: Object.assign({ isChecked: false }, this.defaultInnerBlockProps, innerProps) });
    }
    /**
     * Creates a paragraph block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block model
     * @param {Partial<IParagraphBlockSettings>} innerProps Optional props for the paragraph
     * @returns {BlockModel} A new paragraph block
     */
    static createParagraphBlock(rootProps = {}, innerProps = {}) {
        return Object.assign({ blockType: BlockType.Paragraph }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(BLOCK_ID_PREFIX) } : {}), { properties: Object.assign({}, this.defaultInnerBlockProps, innerProps) });
    }
    /**
     * Creates a heading block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IHeadingBlockSettings>} innerProps Optional content for the heading
     * @returns {BlockModel} new heading block
     */
    static createHeadingBlock(rootProps = {}, innerProps = {}) {
        const sanitizedInnerProps = sanitizeHeadingProps(innerProps);
        return Object.assign({ blockType: BlockType.Heading }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(BLOCK_ID_PREFIX) } : {}), { properties: Object.assign({ level: 1 }, this.defaultInnerBlockProps, sanitizedInnerProps) });
    }
    /**
     * Creates an image block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IImageBlockSettings>} innerProps Optional props for the image
     * @returns {BlockModel} A new image block
     */
    static createImageBlock(rootProps = {}, innerProps = {}) {
        return Object.assign({ blockType: BlockType.Image }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(BLOCK_ID_PREFIX) } : {}), { content: [], properties: Object.assign({ src: '', altText: '', width: '', height: '' }, innerProps) });
    }
    /**
     * Creates a code block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ICodeBlockSettings>} innerProps Optional props for the code
     * @returns {BlockModel} A new code block
     */
    static createCodeBlock(rootProps = {}, innerProps = {}) {
        return Object.assign({ blockType: BlockType.Code }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(BLOCK_ID_PREFIX) } : {}), { properties: Object.assign({ language: 'plaintext' }, innerProps) });
    }
    /**
     * Creates a bullet list block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IBulletListBlockSettings>} innerProps Optional props for the bullet list
     * @returns {BlockModel} A new bullet list block
     */
    static createBulletListBlock(rootProps = {}, innerProps = {}) {
        return Object.assign({ blockType: BlockType.BulletList }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(BLOCK_ID_PREFIX) } : {}), { properties: Object.assign({}, this.defaultInnerBlockProps, innerProps) });
    }
    /**
     * Creates a numbered list block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<INumberedListBlockSettings>} innerProps Optional props for the numbered list
     * @returns {BlockModel} A new bullet list block
     */
    static createNumberedListBlock(rootProps = {}, innerProps = {}) {
        return Object.assign({ blockType: BlockType.NumberedList }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(BLOCK_ID_PREFIX) } : {}), { properties: Object.assign({}, this.defaultInnerBlockProps, innerProps) });
    }
    /**
     * Creates a quote block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IQuoteBlockSettings>} innerProps Optional props for the quote
     * @returns {BlockModel} A new quote block
     */
    static createQuoteBlock(rootProps = {}, innerProps = {}) {
        const blockId = isEmptyString(rootProps.id) ? generateUniqueId(BLOCK_ID_PREFIX) : rootProps.id;
        return Object.assign({ blockType: BlockType.Quote }, this.defaultRootBlockProps, rootProps, { id: blockId, content: [], properties: Object.assign({ children: [
                    BlockFactory.createParagraphBlock({
                        parentId: blockId,
                        content: [BlockFactory.createTextContent()]
                    })
                ] }, innerProps) });
    }
    /**
     * Creates a Collapsible paragraph block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ICollapsibleBlockSettings>} innerProps Optional props for the Collapsible paragraph
     * @returns {BlockModel} A new Collapsible paragraph block
     */
    static createCollapsibleParagraphBlock(rootProps = {}, innerProps = {}) {
        const blockId = isEmptyString(rootProps.id) ? generateUniqueId(BLOCK_ID_PREFIX) : rootProps.id;
        return Object.assign({ blockType: BlockType.CollapsibleParagraph }, this.defaultRootBlockProps, rootProps, { id: blockId, properties: Object.assign({ isExpanded: false, children: [
                    BlockFactory.createParagraphBlock({
                        parentId: blockId,
                        content: [BlockFactory.createTextContent()]
                    })
                ] }, this.defaultInnerBlockProps, innerProps) });
    }
    /**
     * Creates a collapsible heading block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ICollapsibleHeadingBlockSettings>} innerProps Optional props for the collapsible heading
     * @returns {BlockModel} A new collapsible heading block
     */
    static createCollapsibleHeadingBlock(rootProps = {}, innerProps = {}) {
        const sanitizedInnerProps = sanitizeHeadingProps(innerProps);
        const blockId = isEmptyString(rootProps.id) ? generateUniqueId(BLOCK_ID_PREFIX) : rootProps.id;
        return Object.assign({ blockType: BlockType.CollapsibleHeading }, this.defaultRootBlockProps, rootProps, { id: blockId, properties: Object.assign({ isExpanded: false, level: 1, children: [
                    BlockFactory.createParagraphBlock({
                        parentId: blockId,
                        content: [BlockFactory.createTextContent()]
                    })
                ] }, this.defaultInnerBlockProps, sanitizedInnerProps) });
    }
    /**
     * Creates a callout block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ICalloutBlockSettings>} innerProps Optional props for the callout
     * @returns {BlockModel} A new callout block
     */
    static createCalloutBlock(rootProps = {}, innerProps = {}) {
        const blockId = isEmptyString(rootProps.id) ? generateUniqueId(BLOCK_ID_PREFIX) : rootProps.id;
        return Object.assign({ blockType: BlockType.Callout }, this.defaultRootBlockProps, rootProps, { id: blockId, content: [], properties: Object.assign({ children: [
                    BlockFactory.createParagraphBlock({
                        parentId: blockId,
                        content: [BlockFactory.createTextContent()]
                    })
                ] }, innerProps) });
    }
    /**
     * Creates a divider block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<IDividerBlockSettings>} innerProps Optional props for the divider
     * @returns {BlockModel} A new divider block
     */
    static createDividerBlock(rootProps = {}, innerProps = {}) {
        return Object.assign({ blockType: BlockType.Divider }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(BLOCK_ID_PREFIX) } : {}), { content: [], properties: Object.assign({}, innerProps) });
    }
    /**
     * Creates a template block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block model
     * @param {any} innerProps Optional props for the template
     * @returns {BlockModel} A new template block
     */
    static createTemplateBlock(rootProps = {}, innerProps = {}) {
        return Object.assign({ blockType: 'Template' }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(BLOCK_ID_PREFIX) } : {}), { content: [], properties: Object.assign({}, innerProps) });
    }
    /**
     * Creates an table block
     *
     * @param {Partial<BlockModel>} rootProps Optional props for the block
     * @param {Partial<ITableBlockSettings>} innerProps Optional props for the image
     * @returns {BlockModel} A new image block
     */
    static createTableBlock(rootProps = {}, innerProps = {}) {
        // ParentIds for inner blocks will be assigned by the caller/state manager as needed
        const tableBlock = Object.assign({ blockType: BlockType.Table }, this.defaultRootBlockProps, rootProps, (isEmptyString(rootProps.id) ? { id: generateUniqueId(BLOCK_ID_PREFIX) } : {}), { properties: Object.assign({ width: '100%', cssClass: '', enableHeader: true, enableRowNumbers: true, readOnly: false }, this.getDefaultRowsAndColumns(), innerProps) });
        tableBlock.properties.columns.forEach((column, idx) => {
            if (!column.id) {
                column.id = generateUniqueId('col_');
            }
            if (!column.type) {
                column.type = 'Text';
            }
            if (!column.headerText) {
                column.headerText = `Column ${idx + 1}`;
            }
            if (column.width) {
                let value = parseInt(column.width.toString(), 10);
                value = value < TABLE_COL_MIN_WIDTH ? TABLE_COL_MIN_WIDTH : value;
            }
        });
        tableBlock.properties.rows.forEach((r) => {
            if (!r.id) {
                r.id = generateUniqueId('row_');
            }
            r.cells.forEach((cell, idx) => {
                if (!cell.id) {
                    cell.id = generateUniqueId('cell_');
                }
                if (!cell.columnId) {
                    cell.columnId = tableBlock.properties.columns[idx].id;
                }
                cell.blocks = this.populateBlockProperties(cell.blocks, cell.id);
            });
        });
        return tableBlock;
    }
    static getDefaultRowsAndColumns() {
        // Defaults for new table structure: 2 columns, 2 rows (data), header enabled
        const col1Id = generateUniqueId('col_');
        const col2Id = generateUniqueId('col_');
        const row1Id = generateUniqueId('row_');
        const row2Id = generateUniqueId('row_');
        const cell11Id = generateUniqueId('cell_');
        const cell12Id = generateUniqueId('cell_');
        const cell21Id = generateUniqueId('cell_');
        const cell22Id = generateUniqueId('cell_');
        return {
            columns: [
                { id: col1Id, type: 'Text', headerText: 'Column 1' },
                { id: col2Id, type: 'Text', headerText: 'Column 2' }
            ],
            rows: [
                {
                    id: row1Id,
                    cells: [
                        { id: cell11Id, columnId: col1Id, blocks: [this.createParagraphBlock({ content: [this.createTextContent()] })] },
                        { id: cell12Id, columnId: col2Id, blocks: [this.createParagraphBlock({ content: [this.createTextContent()] })] }
                    ]
                },
                {
                    id: row2Id,
                    cells: [
                        { id: cell21Id, columnId: col1Id, blocks: [this.createParagraphBlock({ content: [this.createTextContent()] })] },
                        { id: cell22Id, columnId: col2Id, blocks: [this.createParagraphBlock({ content: [this.createTextContent()] })] }
                    ]
                }
            ]
        };
    }
    /**
     * Populates blocks with missing properties if they don't have them
     *
     * @param {BlockModel[]} blocks Array of block models
     * @param {string} parentId The id of the parent block
     * @returns {BlockModel[]} Updated array of block models
     */
    static populateBlockProperties(blocks, parentId) {
        const populatedBlocks = blocks.map((block) => {
            if (parentId) {
                block.parentId = parentId;
            }
            const updatedBlock = BlockFactory.createBlockFromPartial(block);
            if (updatedBlock.content && updatedBlock.content.length > 0) {
                updatedBlock.content = updatedBlock.content.map((originalContent) => {
                    return BlockFactory.createContentFromPartial(originalContent);
                });
            }
            const props = updatedBlock.properties;
            if ((isChildrenProp(updatedBlock)) && props.children.length > 0) {
                props.children = this.populateBlockProperties(props.children, block.id);
            }
            return updatedBlock;
        });
        return populatedBlocks;
    }
    /**
     * Creates a text content
     *
     * @param {Partial<ContentModel>} rootProps Optional props for the content
     * @param {Partial<ITextContentSettings>} innerProps Optional props for the text content
     * @returns {ContentModel} A new text content
     */
    static createTextContent(rootProps = {}, innerProps = {}) {
        return Object.assign({ contentType: ContentType.Text }, this.defaultRootContentProps, rootProps, { properties: Object.assign({ styles: {} }, innerProps) });
    }
    /**
     * Creates a link content
     *
     * @param {Partial<ContentModel>} rootProps Optional props for the content
     * @param {Partial<ILinkContentSettings>} innerProps Optional props for the link content
     * @returns {ContentModel} A new link content
     */
    static createLinkContent(rootProps = {}, innerProps = {}) {
        return Object.assign({ contentType: ContentType.Link }, this.defaultRootContentProps, rootProps, { properties: Object.assign({ styles: {}, url: '' }, innerProps) });
    }
    /**
     * Creates a mention content
     *
     * @param {Partial<ContentModel>} rootProps Optional props for the content
     * @param {Partial<IMentionContentSettings>} innerProps Optional props for the mention content
     * @returns {ContentModel} A new mention content
     */
    static createMentionContent(rootProps = {}, innerProps = {}) {
        return Object.assign({ contentType: ContentType.Mention }, this.defaultRootContentProps, rootProps, { properties: Object.assign({ userId: '' }, innerProps) });
    }
    /**
     * Creates a label content
     *
     * @param {Partial<ContentModel>} rootProps Optional props for the content
     * @param {Partial<ILabelContentSettings>} innerProps Optional props for the label content
     * @returns {ContentModel} A new label content
     */
    static createLabelContent(rootProps = {}, innerProps = {}) {
        return Object.assign({ contentType: ContentType.Label }, this.defaultRootContentProps, rootProps, { properties: Object.assign({ labelId: '' }, innerProps) });
    }
}
BlockFactory.defaultInnerBlockProps = {
    placeholder: ''
};
BlockFactory.defaultRootContentProps = {
    content: ''
};
BlockFactory.defaultRootBlockProps = {
    parentId: '',
    indent: 0,
    content: [BlockFactory.createTextContent()],
    cssClass: '',
    template: ''
};

/**
 * Generates plain text representation of blocks for external clipboard
 *
 * @param {BlockModel[]} blocks - Block models to convert to plain text
 * @returns {string} Plain text representation of blocks
 */
function generatePlainTextForExternalClipboard(blocks) {
    const textParts = [];
    blocks.forEach((block) => {
        if (block.blockType === BlockType.BulletList) {
            textParts.push(`• ${getBlockText(block)}\n`);
        }
        else if (block.blockType === BlockType.NumberedList) {
            const blockElement = document.getElementById(block.id);
            const listItem = blockElement.querySelector('li');
            const computedStyle = window.getComputedStyle(listItem);
            const marker = computedStyle.getPropertyValue('list-style-type');
            textParts.push(`${marker}${getBlockText(block)}\n`);
        }
        else if (block.blockType === BlockType.Divider) {
            textParts.push('---\n');
        }
        else {
            textParts.push(`${getBlockText(block)}\n`);
        }
    });
    return textParts.join('');
}
/**
 * Creates block model from plain clipboard text
 *
 * @param {string} text - Text from clipboard
 * @returns {BlockModel[]} Array of block models
 */
function createBlocksFromPlainText(text) {
    const lines = text.split(/\r?\n/);
    const blocks = [];
    lines.forEach((line) => {
        if (line.trim() === '') {
            return;
        }
        const bulletMatch = line.match(/^[\s]*[•\-*]\s+(.*)/);
        if (bulletMatch) {
            blocks.push(BlockFactory.createBulletListBlock({
                content: [BlockFactory.createTextContent({ content: bulletMatch[1] })]
            }));
            return;
        }
        const numberedMatch = line.match(/^[\s]*(\d+)[.)]\s+(.*)/);
        if (numberedMatch) {
            blocks.push(BlockFactory.createNumberedListBlock({
                content: [BlockFactory.createTextContent({ content: numberedMatch[2] })]
            }));
            return;
        }
        blocks.push(BlockFactory.createParagraphBlock({
            content: [BlockFactory.createTextContent({ content: line })]
        }));
    });
    return blocks;
}
/**
 * Gets text content from a block model
 *
 * @param {BlockModel} block - Block model to extract text from
 * @returns {string} Plain text content from block
 */
function getBlockText(block) {
    if (!block.content || block.content.length === 0) {
        return '';
    }
    return block.content.map((content) => content.content).join('');
}
/**
 * Checks if HTML content contains block-level elements
 *
 * @param {HTMLElement} container - Container with HTML content
 * @returns {boolean} True if contains block-level elements
 */
function isBlockLevelContent(container) {
    const blockTags = ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'BLOCKQUOTE', 'HR', 'TABLE', 'IMG'];
    return Array.from(container.querySelectorAll('*')).some((el) => blockTags.indexOf(el.tagName) !== -1);
}
/**
 * Unwraps container element if needed
 *
 * @param {HTMLElement} container - Container to potentially unwrap
 * @returns {HTMLElement} Unwrapped container or original
 */
function unWrapContainer(container) {
    const firstChild = container.firstElementChild;
    if (container.childElementCount === 1
        && isBlockLevelContent(firstChild)
        && (firstChild.tagName === 'SPAN' || firstChild.tagName === 'DIV')) {
        const newContainer = document.createElement('div');
        Array.from(firstChild.childNodes).forEach((child) => newContainer.appendChild(child.cloneNode(true)));
        return newContainer;
    }
    return container;
}
function writeTableClipboardPayload(dt, payload, html, text) {
    dt.setData('text/blockeditor-table', JSON.stringify(payload));
    dt.setData('text/html', html);
    dt.setData('text/plain', text);
}
function buildTableClipboardPayload(tableBlockEl, blockModel) {
    if (!tableBlockEl || !blockModel) {
        return null;
    }
    const tableEl = tableBlockEl.querySelector('table');
    const props = blockModel.properties;
    let focusedCells = [];
    const selectedRows = tableEl.querySelectorAll('tr.e-row-selected');
    const selectedCols = tableBlockEl.querySelectorAll('td.e-col-selected, th.e-col-selected');
    let targetEle;
    let selector;
    if (selectedRows.length > 0) {
        // Multi-row: collect cells from ALL selected rows
        const allFocusedCells = [];
        selectedRows.forEach((row) => {
            allFocusedCells.push(...Array.from(row.querySelectorAll('td:not(.e-row-number)')));
        });
        targetEle = tableEl; // Use whole table as base
        selector = 'td:not(.e-row-number)';
        focusedCells = allFocusedCells;
    }
    else if (selectedCols.length > 0) {
        // skips header row for column copy
        focusedCells = [];
        // Loop only over body rows (tBodies[0])
        const bodyRows = tableEl.tBodies[0].rows;
        for (let i = 0; i < bodyRows.length; i++) {
            const row = bodyRows[parseInt(i.toString(), 10)];
            const colIndex = parseInt(selectedCols[0].dataset.col || '0', 10);
            const domCol = toDomCol(colIndex, props.enableRowNumbers);
            const cell = row.cells[parseInt(domCol.toString(), 10)];
            if (cell && !cell.classList.contains('e-row-number')) {
                focusedCells.push(cell);
            }
        }
    }
    else {
        // Individual cell focus
        targetEle = tableEl;
        selector = `td.${TABLE_CELL_FOCUS}, th.${TABLE_CELL_FOCUS}`;
        focusedCells = Array.from(targetEle.querySelectorAll(selector));
    }
    const dataPositions = focusedCells.map((td) => ({
        r: toModelRow(parseInt(td.dataset.row, 10), props.enableHeader),
        c: parseInt(td.dataset.col, 10)
    }));
    const minR = Math.min(...dataPositions.map((p) => p.r));
    const maxR = Math.max(...dataPositions.map((p) => p.r));
    const minC = Math.min(...dataPositions.map((p) => p.c));
    const maxC = Math.max(...dataPositions.map((p) => p.c));
    const height = maxR - minR + 1;
    const width = maxC - minC + 1;
    const cells = [];
    for (let r = 0; r < height; r++) {
        const rowCells = [];
        for (let c = 0; c < width; c++) {
            rowCells.push(props.rows[minR + r].cells[minC + c].blocks);
        }
        cells.push(rowCells);
    }
    return {
        type: 'table',
        mode: 'cells',
        cells,
        meta: { rows: height, cols: width, enableHeader: !!props.enableHeader, enableRowNumbers: !!props.enableRowNumbers }
    };
}
function extractPlainTextMatrixFromPayload(payload, blockModel) {
    const matrix = [];
    const p = (payload.mode === 'table' ? payload.table.props : blockModel.properties);
    if (p.enableHeader) {
        const headerRow = [];
        for (let i = 0; i < payload.meta.cols; i++) {
            const column = p.columns[i];
            const headerText = column.headerText;
            headerRow.push(headerText);
        }
        matrix.push(headerRow);
    }
    if (payload.mode === 'table' && payload.table && payload.table.props) {
        const colCount = (p.columns).length;
        p.rows.forEach((row) => {
            const cells = new Array(colCount).fill('');
            (row.cells).forEach((cell, idx) => {
                const blocks = cell.blocks;
                const cellText = blocks.map((b) => getBlockText(b)).join(' ');
                cells[idx] = cellText;
            });
            matrix.push(cells);
        });
        return matrix;
    }
    // For non-table modes, approximate to rectangular text for fallback
    if (payload.cells && payload.cells.length) {
        payload.cells.forEach((rowCells) => {
            const rowTexts = rowCells.map((cellBlocks) => cellBlocks.map((b) => getBlockText(b)).join(' '));
            matrix.push(rowTexts);
        });
    }
    return matrix;
}
function createCellsPayloadFromExternal(html, text) {
    let matrix = [];
    if (html && /<table[\s\S]*?>[\s\S]*?<\/table>/i.test(html)) {
        const div = document.createElement('div');
        div.innerHTML = html;
        // For cell paste, always ignore headers
        const tbody = div.querySelector('table tbody');
        if (tbody) {
            const rows = Array.from(tbody.querySelectorAll('tr'));
            const tmp = [];
            for (const trow of rows) {
                const cells = Array.from(trow.querySelectorAll('th,td'));
                const filtered = cells.filter((c) => !c.classList.contains('e-row-number'));
                if (filtered.length) {
                    tmp.push(filtered.map((c) => (c.textContent).trim()));
                }
            }
            const maxCols = Math.max(0, ...tmp.map((r) => r.length));
            tmp.forEach((r) => { while (r.length < maxCols) {
                r.push('');
            } });
            matrix = tmp;
        }
    }
    else if (text && (text.indexOf('\t') !== -1 || /\r?\n.*\t/.test(text))) {
        matrix = text.split(/\r?\n/).filter((l) => l.length > 0).map((l) => l.split('\t'));
    }
    if (!matrix.length) {
        return null;
    }
    const cells = matrix.map((row) => row.map((cell) => [BlockFactory.createParagraphBlock({ content: [BlockFactory.createTextContent({ content: cell })] })]));
    return {
        type: 'table',
        mode: 'cells',
        meta: { rows: matrix.length, cols: matrix[0].length, enableHeader: false, enableRowNumbers: false },
        cells
    };
}
function tsvFromMatrix(matrix) {
    return matrix.map((row) => row.map((c) => c.replace(/\t/g, ' ').replace(/\r?\n/g, ' ')).join('\t')).join('\n');
}
function htmlTableFromMatrix(matrix, options = {}) {
    const hasHeader = !!options.hasHeader;
    // const rn: boolean = !!options.hasRowNumbers;
    const rows = [];
    const bodyStart = hasHeader ? 1 : 0;
    if (hasHeader) {
        const hdrCells = matrix[0].map((text) => `<th>${escapeHtml(text)}</th>`);
        rows.push(`<thead><tr>${hdrCells.join('')}</tr></thead>`);
    }
    const bodyRows = [];
    for (let r = bodyStart; r < matrix.length; r++) {
        const tds = matrix[r].map((text) => `<td>${escapeHtml(text)}</td>`);
        bodyRows.push(`<tr>${tds.join('')}</tr>`);
    }
    rows.push(`<tbody>${bodyRows.join('')}</tbody>`);
    return `<table>${rows.join('')}</table>`;
}
function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const hasBlockElements = (element) => {
    const blockTags = ['H1', 'H2', 'H3', 'H4', 'BLOCKQUOTE', 'UL', 'OL', 'PRE', 'HR', 'IMG', 'TABLE'];
    return blockTags.some((tag) => element.querySelector(tag) !== null);
};
function convertHtmlElementToBlocks(container, keepFormat) {
    const blocks = [];
    const processNode = (node, indentLevel = 0) => {
        let isBlockProcessed = false;
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') {
            return isBlockProcessed;
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node;
            const tag = element.tagName;
            if (tag === 'UL' || tag === 'OL') {
                const isOrdered = tag === 'OL';
                const children = Array.from(element.children);
                for (const child of children) {
                    if (child.tagName === 'LI') {
                        // Create list item block from <li> content
                        blocks.push(BlockFactory.createBlockFromPartial({
                            blockType: isOrdered ? BlockType.NumberedList : BlockType.BulletList,
                            content: convertInlineElementsToContentModels(child, keepFormat),
                            indent: indentLevel
                        }));
                        // Recurse into **nested lists** inside this <li>
                        Array.from(child.children).forEach((nested) => {
                            if (nested.tagName === 'UL' || nested.tagName === 'OL') {
                                processNode(nested, indentLevel + 1);
                            }
                        });
                    }
                    if (child.tagName === 'UL' || child.tagName === 'OL') {
                        // Recurse into **nested lists** if any, inside this <ul>
                        processNode(child, indentLevel + 1);
                    }
                    isBlockProcessed = true;
                }
            }
            else if (tag.match(/^H[1-4]$/)) {
                const level = parseInt(tag.substring(1), 10);
                blocks.push(BlockFactory.createHeadingBlock({ content: convertInlineElementsToContentModels(element, keepFormat) }, { level: level }));
                isBlockProcessed = true;
            }
            else if (tag === 'BLOCKQUOTE') {
                blocks.push(BlockFactory.createQuoteBlock({ content: convertInlineElementsToContentModels(element, keepFormat) }));
                isBlockProcessed = true;
            }
            else if (tag === 'HR') {
                blocks.push(BlockFactory.createDividerBlock());
                isBlockProcessed = true;
            }
            else if (tag === 'IMG') {
                const sanitizedHtml = sanitizeHelper(element.outerHTML, true);
                const temp = document.createElement('div');
                temp.innerHTML = sanitizedHtml;
                const img = temp.firstChild;
                if (img) {
                    blocks.push(BlockFactory.createImageBlock({}, {
                        src: img.src,
                        altText: img.alt
                    }));
                }
                isBlockProcessed = true;
            }
            else if (tag === 'PRE' && element.querySelector('code')) {
                blocks.push(BlockFactory.createCodeBlock({ content: [BlockFactory.createTextContent({ content: element.textContent })] }));
                isBlockProcessed = true;
            }
            else if ((tag === 'P') && !hasBlockElements(element)) {
                blocks.push(BlockFactory.createParagraphBlock({ content: convertInlineElementsToContentModels(element, keepFormat) }));
                isBlockProcessed = true;
            }
            else if (tag === 'TABLE') {
                const model = parseHtmlTableToBlock(element);
                if (model) {
                    blocks.push(model);
                }
                isBlockProcessed = true;
            }
            if ((tag === 'DIV') && !hasBlockElements(element)) {
                blocks.push(BlockFactory.createParagraphBlock({ content: convertInlineElementsToContentModels(element, keepFormat) }));
                isBlockProcessed = true;
            }
        }
        else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
            blocks.push(BlockFactory.createParagraphBlock({
                content: [BlockFactory.createTextContent({ content: node.textContent.trim() })]
            }));
            isBlockProcessed = true;
        }
        return isBlockProcessed;
    };
    const traverseDOM = (element) => {
        const isBlockProcessed = processNode(element);
        if (!isBlockProcessed && element.nodeType === Node.ELEMENT_NODE) {
            const tagName = element.tagName;
            // Skip traversing children for elements that are processed as whole units
            const ignorableNestedChildren = ['PRE', 'HR', 'IMG', 'TABLE'].indexOf(tagName) !== -1;
            if (!ignorableNestedChildren) {
                Array.from(element.childNodes).forEach(traverseDOM);
            }
        }
    };
    Array.from(container.childNodes).forEach((node) => {
        traverseDOM(node);
    });
    return blocks;
}
function convertInlineElementsToContentModels(element, keepFormat) {
    const content = [];
    if (!keepFormat) {
        if (element.textContent !== '') {
            return [BlockFactory.createTextContent({ content: element.textContent })];
        }
    }
    const styleStack = [{}];
    let linkProps;
    const processNode = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.textContent;
            text = text.replace(/\n/g, '');
            if (text !== '') {
                content.push(createContentModel(text, styleStack[styleStack.length - 1], linkProps));
            }
            return;
        }
        const el = node;
        if (el.classList.contains('e-mention-chip')) {
            let chipModel;
            if (el.classList.contains('e-user-chip')) {
                const userId = el.getAttribute('data-user-id');
                chipModel = BlockFactory.createMentionContent({ content: el.textContent }, { userId });
            }
            else {
                const labelId = el.getAttribute('data-label-id');
                chipModel = BlockFactory.createLabelContent({ content: el.textContent }, { labelId });
            }
            content.push(chipModel);
            return;
        }
        if (el.tagName === 'UL' || el.tagName === 'OL') {
            return;
        }
        if (el.tagName === 'A') {
            const prevLink = linkProps;
            linkProps = {
                url: el.getAttribute('href') || ''
            };
            processChildren(el);
            linkProps = prevLink;
            return;
        }
        // <br> → insert linebreak
        if (el.tagName === 'BR') {
            content.push(createContentModel('\n', styleStack[styleStack.length - 1], linkProps));
            return;
        }
        const newStyles = extractStylesFromElement(el, styleStack[styleStack.length - 1]);
        if (newStyles && Object.keys(newStyles).length > 0) {
            styleStack.push(newStyles);
            processChildren(el);
            styleStack.pop();
        }
        else {
            processChildren(el);
        }
    };
    const processChildren = (parent) => {
        Array.from(parent.childNodes).forEach(processNode);
    };
    const createContentModel = (text, styles, link) => {
        if (link) {
            return BlockFactory.createLinkContent({
                content: text
            }, {
                styles: Object.assign({}, styles),
                url: link.url
            });
        }
        return BlockFactory.createTextContent({ content: text }, { styles: Object.assign({}, styles) });
    };
    processChildren(element);
    return content;
}
function extractStylesFromElement(element, styles = {}) {
    const newStyles = Object.assign({}, styles);
    const isBold = FormattingHelper.isBold(element);
    if (isBold) {
        newStyles.bold = isBold;
    }
    const isItalic = FormattingHelper.isItalic(element);
    if (isItalic) {
        newStyles.italic = isItalic;
    }
    const isUnderline = FormattingHelper.isUnderline(element);
    if (isUnderline) {
        newStyles.underline = isUnderline;
    }
    const isStrikethrough = FormattingHelper.isStrikethrough(element);
    if (isStrikethrough) {
        newStyles.strikethrough = isStrikethrough;
    }
    const isSuperscript = FormattingHelper.isSuperscript(element);
    if (isSuperscript) {
        newStyles.superscript = isSuperscript;
    }
    const isSubscript = FormattingHelper.isSubscript(element);
    if (isSubscript) {
        newStyles.subscript = isSubscript;
    }
    if (element.style.color) {
        newStyles.color = FormattingHelper.getFontColor(element);
    }
    if (element.style.backgroundColor) {
        newStyles.backgroundColor = FormattingHelper.getBackgroundColor(element);
    }
    const isInlineCode = FormattingHelper.isInlineCode(element);
    if (isInlineCode) {
        newStyles.inlineCode = isInlineCode;
    }
    const isUppercase = element.style.textTransform === 'uppercase';
    if (isUppercase) {
        newStyles.uppercase = isUppercase;
    }
    const isLowercase = element.style.textTransform === 'lowercase';
    if (isLowercase) {
        newStyles.lowercase = isLowercase;
    }
    const isLink = FormattingHelper.isLink(element);
    if (isLink) {
        newStyles.url = FormattingHelper.getLinkUrl(element);
    }
    return newStyles;
}
/**
 * Detects all active formats for a specific text node.
 * Traverses upward through DOM to find format-containing ancestors.
 *
 * @param {Text} node - The text node to analyze
 * @returns {Styles} - All detected formats on this node
 * @hidden
 */
function detectFormatsForTextNode(node) {
    const merged = {};
    let currentElement = node.parentElement;
    while (currentElement) {
        // Stop at block boundary (element with id)
        if (currentElement.id) {
            break;
        }
        const newStyles = extractStylesFromElement(currentElement, merged);
        Object.assign(merged, newStyles);
        currentElement = currentElement.parentElement;
    }
    return merged;
}
function parseHtmlTableToMatrix(root) {
    const table = (root.tagName === 'TABLE' ? root : root.querySelector('table'));
    if (!table) {
        return { matrix: [], hasHeader: false };
    }
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    const hasHeader = !!thead && !!thead.rows && thead.rows.length > 0;
    const rows = [];
    const matrix = [];
    if (thead && thead.rows && thead.rows.length) {
        rows.push(thead.rows[0]);
    }
    if (tbody) {
        Array.from(tbody.querySelectorAll('tr')).forEach((tr) => rows.push(tr));
    }
    for (const tr of rows) {
        const cells = Array.from(tr.querySelectorAll('th,td'));
        // Ignore row-number column if present by class
        const filtered = cells.filter((c) => !c.classList.contains('e-row-number'));
        matrix.push(filtered);
    }
    // Normalize to rectangular grid by padding shorter rows
    const maxCols = Math.max(0, ...matrix.map((r) => r.length));
    matrix.forEach((row) => {
        while (row.length < maxCols) {
            row.push(document.createElement('td'));
        }
    });
    return { matrix, hasHeader };
}
function parseHtmlTableToBlock(element) {
    const { matrix, hasHeader } = parseHtmlTableToMatrix(element);
    if (!matrix.length) {
        return null;
    }
    const bodyStart = hasHeader ? 1 : 0;
    const colsCount = matrix[0].length;
    // Build columns with header text (plain for header)
    const columns = new Array(colsCount).fill(0).map((_, idx) => ({
        id: `col_${idx}`, width: '', headerText: hasHeader ? (matrix[0][idx].textContent).trim() : ''
    }));
    // Build row models with blocks per cell using existing conversion
    const rows = [];
    for (let r = bodyStart; r < matrix.length; r++) {
        const cells = [];
        for (let c = 0; c < colsCount; c++) {
            const cellEl = matrix[r][c];
            const blocks = hasBlockElements(cellEl) ? convertHtmlElementToBlocks(cellEl, true) : [];
            // Fallback to plain text paragraph if no blocks detected
            const cellBlocks = blocks.length
                ? blocks
                : [BlockFactory.createParagraphBlock({ content: convertInlineElementsToContentModels(cellEl, true) })];
            cells.push({ columnId: columns[c].id, blocks: cellBlocks });
        }
        rows.push({ cells });
    }
    const properties = {
        enableHeader: hasHeader,
        enableRowNumbers: true,
        columns,
        rows
    };
    return BlockFactory.createBlockFromPartial({ blockType: 'Table', properties });
}
function getBlockDataAsHTML(blocks, editorId) {
    if (!blocks || blocks.length === 0) {
        return '';
    }
    const htmlParts = [];
    const listStack = [];
    let currentIndent = -1;
    const closeListsToLevel = (targetIndent) => {
        while (listStack.length > 0 && listStack[parseInt((listStack.length - 1).toString(), 10)].indent >= targetIndent) {
            const finishedList = listStack.pop();
            const listHtml = `<${finishedList.type}>${finishedList.items.map((item) => item + '</li>').join('')}</${finishedList.type}>`;
            if (listStack.length > 0) {
                const parentList = listStack[parseInt((listStack.length - 1).toString(), 10)];
                const lastIdx = parentList.items.length - 1;
                parentList.items[parseInt(lastIdx.toString(), 10)] += listHtml;
            }
            else {
                htmlParts.push(listHtml);
            }
        }
    };
    for (const block of blocks) {
        if (!block) {
            continue;
        }
        const isList = ['bulletlist', 'numberedlist', 'checklist'].indexOf(block.blockType.toLowerCase()) !== -1;
        const listType = block.blockType.toLowerCase() === 'numberedlist' ? 'ol' : 'ul';
        const indent = block.indent || 0;
        if (isList) {
            // Close deeper lists when moving to a higher level (less indentation)
            if (listStack.length === 0 ||
                listStack[listStack.length - 1].type !== listType ||
                indent < currentIndent) {
                closeListsToLevel(indent);
            }
            // Start new list if:
            // 1. First list item
            // 2. Different list type
            // 3. Increased indentation
            if (listStack.length === 0 ||
                listStack[parseInt((listStack.length - 1).toString(), 10)].type !== listType ||
                indent > currentIndent) {
                listStack.push({
                    type: listType,
                    items: [],
                    indent
                });
                currentIndent = indent;
            }
            const contentHtml = renderContentAsHTML(block.content);
            listStack[parseInt((listStack.length - 1).toString(), 10)].items.push(`<li>${contentHtml}`);
        }
        else {
            closeListsToLevel(0);
            currentIndent = -1;
            htmlParts.push(renderBlockAsHTML(block, editorId));
        }
    }
    closeListsToLevel(0);
    return htmlParts.join('');
}
function renderContentAsHTML(content = []) {
    return content
        .map((item) => {
        if (!item || !item.content) {
            return '';
        }
        let text = escapeHTML(item.content);
        const props = item.properties;
        const styles = (props && props.styles) ? props.styles : {};
        const keys = Object.keys(styles);
        if (keys.length > 0) {
            for (const style of keys) {
                if (styles[style]) {
                    switch (style.toLowerCase()) {
                        case 'bold':
                            text = `<strong>${text}</strong>`;
                            break;
                        case 'italic':
                            text = `<em>${text}</em>`;
                            break;
                        case 'underline':
                            text = `<u>${text}</u>`;
                            break;
                        case 'strikethrough':
                            text = `<s>${text}</s>`;
                            break;
                        case 'superscript':
                            text = `<sup>${text}</sup>`;
                            break;
                        case 'subscript':
                            text = `<sub>${text}</sub>`;
                            break;
                        case 'uppercase':
                            text = `<span style="text-transform: uppercase;">${text}</span>`;
                            break;
                        case 'lowercase':
                            text = `<span style="text-transform: lowercase;">${text}</span>`;
                            break;
                        case 'color':
                            text = `<span style="color: ${styles.color};">${text}</span>`;
                            break;
                        case 'backgroundcolor':
                            text = `<span style="background-color: ${styles.backgroundColor};">${text}</span>`;
                            break;
                        case 'inlinecode':
                            text = `<code>${text}</code>`;
                            break;
                    }
                }
            }
        }
        if (item.contentType === ContentType.Link && item.properties) {
            const props = item.properties;
            const target = 'target="_blank"';
            text = `<a href="${escapeHTML(props.url)}" ${target}>${text}</a>`;
        }
        return text;
    }).join('');
}
function renderBlockAsHTML(block, editorId) {
    const contentHTML = renderContentAsHTML(block.content);
    switch (block.blockType.toLowerCase()) {
        case 'heading': {
            const level = block.properties.level;
            return renderElementWithWrapper(`h${level}`, contentHTML);
        }
        case 'paragraph':
            return renderElementWithWrapper('p', contentHTML);
        case 'quote': {
            const children = block.properties.children;
            const childrenHTML = children && children.map((child) => renderBlockAsHTML(child)).join('') || '';
            return renderElementWithWrapper('blockquote', childrenHTML);
        }
        case 'callout': {
            const children = block.properties.children;
            const childrenHTML = children && children.map((child) => renderBlockAsHTML(child)).join('') || '';
            return renderElementWithWrapper('div', childrenHTML, 'callout');
        }
        case 'divider':
            return '<hr />';
        case 'code':
            return `<pre><code>${block.content[0].content}</code></pre>`;
        case 'image': {
            const props = block.properties;
            if (props && props.src === '') {
                return '';
            }
            return `<img src='${props.src}' alt='${props.altText}' />`;
        }
        case 'collapsibleparagraph':
        case 'collapsibleheading': {
            const children = block.properties.children;
            const childrenHTML = children && children.map((child) => renderBlockAsHTML(child)).join('') || '';
            return renderElementWithWrapper('div', (contentHTML + ' ' + childrenHTML), 'collapsible');
        }
        case 'table': {
            const editorRoot = document.querySelector(`#${editorId}`);
            const tableBlockEl = editorRoot.querySelector(`#${block.id}`);
            focusAllCellsInTable(tableBlockEl);
            const payload = buildTableClipboardPayload(tableBlockEl, block);
            const matrixText = extractPlainTextMatrixFromPayload(payload, block);
            const html = htmlTableFromMatrix(matrixText, { hasHeader: payload.meta.enableHeader, hasRowNumbers: payload.meta.enableRowNumbers });
            removeFocusFromAllCells(tableBlockEl);
            return html;
        }
        default:
            return renderElementWithWrapper('div', contentHTML);
    }
}
function renderElementWithWrapper(tagName, content, className) {
    const classAttr = className ? ` class="${className}"` : '';
    return `<${tagName}${classAttr}>${content}</${tagName}>`;
}

class NodeCutter {
    /**
     * Split node at both selection boundaries (start and end).
     *
     * After this method:
     * - Start boundary: content before selection is isolated from selected content
     * - End boundary: selected content is isolated from content after
     * Result: Selected content can be cleanly operated on
     *
     * @param {Range} range - The selection range
     * @param {Node} node - The node to split
     * @returns {Node} - The node containing the selected content
     */
    getSpliceNode(range, node) {
        // First pass: split at START boundary
        node = this.splitNode(range, node, true);
        // Second pass: split at END boundary
        node = this.splitNode(range, node, false);
        return node;
    }
    /**
     * Split a single node at one boundary of the range.
     *
     * If isStart is true: Splits at the START boundary
     *   - Moves content before selection out of the node
     *   - Leaves selected content and content after in the node
     *
     * If isStart is false: Splits at the END boundary
     *   - Moves content after selection out of the node
     *   - Leaves content before and selected content in the node
     *
     * @param {Range} range - The selection range
     * @param {Node} node - The node to split
     * @param {boolean} isStart - If true, split at start boundary; if false, split at end boundary
     * @returns {Node} - The node after splitting
     */
    splitNode(range, node, isStart) {
        const clone = range.cloneRange();
        const parent = node.parentNode;
        const index = this.getNodeIndex(node);
        // Set up cloned range to extract content
        clone.collapse(isStart);
        if (isStart) {
            // For start split: we want everything from node start to selection start
            clone.setStartBefore(node);
        }
        else {
            // For end split: we want everything from selection end to node end
            clone.setEndAfter(node);
        }
        // Extract the content
        const fragment = clone.extractContents();
        // After extraction, get reference to current node in parent
        if (isStart) {
            // After start split, selected content is at original index
            node = parent.childNodes[index];
        }
        else {
            // After end split, find the node (it might have moved)
            node = parent.childNodes.length > 1
                ? parent.childNodes[index]
                : parent.childNodes[0];
        }
        // Insert the extracted fragment back (this is the part that's NOT selected)
        if (fragment && fragment.childNodes.length > 0) {
            const isEmpty = this.isEmptyFragment(fragment);
            const refNode = (isStart ? node : node.nextSibling);
            if (!isEmpty) {
                parent.insertBefore(fragment, refNode);
            }
        }
        return node;
    }
    /**
     * Check if a fragment is effectively empty (only contains whitespace, no meaningful content)
     *
     * @param {DocumentFragment} fragment - Fragment to check
     * @returns {boolean} - Whether the fragment is empty
     */
    isEmptyFragment(fragment) {
        if (!fragment || !fragment.textContent) {
            return true;
        }
        return fragment.textContent.trim() === '';
    }
    /**
     * Get the index of a node among its siblings
     *
     * @param {Node} node - The node to get index for.
     * @returns {number} - The index of the node
     */
    getNodeIndex(node) {
        let index = 0;
        let sibling = node.previousSibling;
        while (sibling) {
            index++;
            sibling = sibling.previousSibling;
        }
        return index;
    }
    /**
     * Splits the content of a block at a specified node and offset.
     * Used for block operations like Enter key (splitting paragraphs) and paste operations.
     *
     * @param {HTMLElement} contentElement - The content element of the block
     * @param {Node} splitNode - The node at which to split the content
     * @param {number} splitOffset - The offset within the split node at which to split
     * @returns {ISplitContentData} - Contains beforeFragment and afterFragment
     * @hidden
     */
    splitContent(contentElement, splitNode, splitOffset) {
        const beforeFragment = document.createDocumentFragment();
        const afterFragment = document.createDocumentFragment();
        let isSplitting = false;
        const processNode = (node, container, parentChain = [], isAfter = false) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const textNode = node;
                const fullText = textNode.textContent;
                if (!isAfter && node === splitNode) {
                    const beforeText = fullText.slice(0, splitOffset);
                    const afterText = fullText.slice(splitOffset);
                    if (beforeText) {
                        container.appendChild(document.createTextNode(beforeText));
                    }
                    if (afterText) {
                        // Build after tree from deepest to root
                        let afterNode = document.createTextNode(afterText);
                        for (let i = parentChain.length - 1; i >= 0; i--) {
                            const cloned = parentChain[i]
                                .cloneNode(false);
                            cloned.appendChild(afterNode);
                            afterNode = cloned;
                        }
                        afterFragment.appendChild(afterNode);
                    }
                    isSplitting = true;
                }
                else {
                    container.appendChild(document.createTextNode(fullText));
                }
            }
            else if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                const clone = element.cloneNode(false);
                const newParentChain = [...parentChain, element];
                if (!isAfter && (element.contains(splitNode) || element === splitNode)) {
                    for (const child of Array.from(element.childNodes)) {
                        if (!isSplitting && (child.contains(splitNode) || child === splitNode)) {
                            processNode(child, clone, newParentChain);
                        }
                        else {
                            processNode(child, clone, newParentChain, isSplitting);
                        }
                    }
                    container.appendChild(clone);
                }
                else {
                    if (isAfter) {
                        container.appendChild(element.cloneNode(true));
                    }
                    else {
                        container.appendChild(clone);
                        for (const child of Array.from(element.childNodes)) {
                            processNode(child, clone, newParentChain, isAfter);
                        }
                    }
                }
            }
        };
        for (const node of Array.from(contentElement.childNodes)) {
            if (!isSplitting) {
                processNode(node, beforeFragment, []);
            }
            else {
                afterFragment.appendChild(node.cloneNode(true));
            }
        }
        return { beforeFragment, afterFragment, splitOffset };
    }
}

/**
 * InlineToolbarModule class is used to render the inline toolbar for the block editor.
 *
 * @hidden
 */
class InlineToolbarModule {
    constructor(editor) {
        this.currentTransformItems = [];
        this.editor = editor;
        this.toolbarRenderer = new ToolbarRenderer(this.editor);
        this.pickerHandler = new ColorPickerRenderer(this.editor);
        this.addEventListeners();
        this.init();
        this.bindTooltip();
    }
    addEventListeners() {
        this.editor.blockManager.observer.on('enableDisableTbarItems', this.enableDisableTbarItems, this);
        this.editor.on(events.inlineToolbarCreated, this.handleInlineToolbarCreated, this);
        this.editor.on(events.inlineToolbarItemClick, this.handleInlineToolbarItemClick, this);
        this.editor.on(events.moduleChanged, this.onPropertyChanged, this);
        this.editor.on(events.rtlChanged, this.applyRtlSettings, this);
        this.editor.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.editor.blockManager.observer.off('enableDisableTbarItems', this.enableDisableTbarItems);
        this.editor.off(events.inlineToolbarCreated, this.handleInlineToolbarCreated);
        this.editor.off(events.inlineToolbarItemClick, this.handleInlineToolbarItemClick);
        this.editor.off(events.moduleChanged, this.onPropertyChanged);
        this.editor.off(events.rtlChanged, this.applyRtlSettings);
        this.editor.off(events.destroy, this.destroy);
    }
    init() {
        this.toolbarEle = this.editor.createElement('div', {
            id: (this.editor.element.id + BLOCKEDITOR_INLINETBAR_ID),
            className: BLOCKEDITOR_INLINETBAR_CLS
        });
        this.editor.element.appendChild(this.toolbarEle);
        this.toolbarObj = this.renderToolbar({
            element: this.toolbarEle,
            items: this.getToolbarItems(this.editor.inlineToolbarSettings.items),
            width: this.editor.inlineToolbarSettings.popupWidth,
            overflowMode: 'MultiRow'
        });
        const popupElement = this.editor.createElement('div', {
            id: (this.editor.element.id + INLINE_TBAR_POPUP_ID),
            className: INLINE_TBAR_POPUP_CLS
        });
        this.toolbarObj.isStringTemplate = true;
        this.editor.element.appendChild(popupElement);
        this.editor.blockManager.observer.notify('toolbarCreated');
    }
    bindTooltip() {
        this.inlineToolbarTooltip = this.editor.tooltipRenderer.renderTooltip({
            cssClass: INLINE_TBAR_TOOLTIP_CLS,
            position: 'TopCenter',
            target: '.' + TBAR_ITEM_CLS,
            windowCollision: true,
            element: document.querySelector('#' + this.editor.element.id + INLINE_TBAR_POPUP_ID)
        });
    }
    /**
     * Render the inline toolbar for the block editor.
     *
     * @param {IToolbarRenderOptions} args - The options for rendering the toolbar.
     * @returns {Toolbar} The rendered toolbar instance.
     * @hidden
     */
    renderToolbar(args) {
        return this.toolbarRenderer.renderToolbar(args);
    }
    handleInlineToolbarCreated() {
        if (this.hasToolbarItemId('color')) {
            this.initializeColorPicker('color');
        }
        if (this.hasToolbarItemId('bgColor')) {
            this.initializeColorPicker('bgColor');
        }
        if (this.hasToolbarItemId('transform')) {
            this.initializeTransformDropdown();
        }
    }
    handleInlineToolbarItemClick(args) {
        const itemClickArgs = {
            item: getInlineToolbarItems().find((item) => item.id === args.item.id),
            event: args.originalEvent,
            isInteracted: Object.keys(args.originalEvent).length > 0,
            cancel: false
        };
        if (this.editor.inlineToolbarSettings.itemClick) {
            this.editor.inlineToolbarSettings.itemClick.call(this.editor, itemClickArgs);
        }
        if (itemClickArgs.cancel) {
            args.cancel = true;
            return;
        }
        this.editor.blockManager.observer.notify('inlineToolbarItemClick', args);
    }
    enableDisableTbarItems(args) {
        this.toolbarObj.enableItems(args.items, args.isEnable);
    }
    initializeColorPicker(type) {
        const toolbarElement = document.querySelector('#' + this.editor.element.id + BLOCKEDITOR_INLINETBAR_ID);
        if (!toolbarElement) {
            return;
        }
        const colorBtn = toolbarElement.querySelector(`#toolbar-${type.toLowerCase()}-dropdown`);
        // create and attach the ColorPicker popup directly to the toolbar button via handler
        const colorPicker = this.pickerHandler.renderColorPicker({
            element: colorBtn,
            type: type,
            iconCss: `e-inline-${type}-icon`,
            onChange: (value) => {
                this.editor.blockManager.observer.notify('handleColorpickerChange', { type, value });
            }
        });
        if (type === 'color') {
            this.textColorPicker = colorPicker;
        }
        else {
            this.bgColorPicker = colorPicker;
        }
    }
    createDropDown(args) {
        const dropDown = new DropDownButton({
            target: args.instance.target,
            items: args.instance.items,
            cssClass: args.instance.cssClass,
            popupWidth: args.instance.popupWidth,
            createPopupOnClick: args.instance.createPopupOnClick,
            select: args.instance.select,
            beforeOpen: args.instance.beforeOpen,
            itemTemplate: args.instance.itemTemplate
        });
        dropDown.appendTo(args.element);
        if (args.inlineClass) {
            const iconWrapper = this.editor.createElement('span', { className: 'e-be-color-icon-wrapper' });
            const iconElement = this.editor.createElement('span', { className: args.inlineClass });
            const cssText = 'border-bottom: 3px solid #000000;';
            updateCSSText(iconElement, cssText);
            iconWrapper.appendChild(iconElement);
            dropDown.element.insertBefore(iconWrapper, dropDown.element.querySelector('.e-caret'));
        }
        return dropDown;
    }
    applyRtlSettings() {
        if (this.toolbarObj) {
            this.toolbarObj.enableRtl = this.editor.enableRtl;
        }
        if (this.textColorPicker && this.pickerHandler) {
            this.textColorPicker.enableRtl = this.editor.enableRtl;
        }
        if (this.bgColorPicker && this.pickerHandler) {
            this.bgColorPicker.enableRtl = this.editor.enableRtl;
        }
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    getModuleName() {
        return 'inlineToolbarSettings';
    }
    /**
     * Handles property changes to update the toolbar configuration
     *
     * @param {BlockEditorModel} e - specifies the element.
     * @returns {void}
     * @hidden
     */
    onPropertyChanged(e) {
        if (e.module === this.getModuleName()) {
            const newProp = e.newProp.inlineToolbarSettings;
            const oldProp = e.oldProp.inlineToolbarSettings;
            if (!isNullOrUndefined(newProp)) {
                for (const prop of Object.keys(newProp)) {
                    switch (prop) {
                        case 'popupWidth':
                            this.editor.blockManager.observer.notify('popupWidthChanged', { value: newProp.popupWidth });
                            break;
                        case 'items': {
                            const flattenedToolbarItems = this.getToolbarItems(newProp.items);
                            this.toolbarObj.items = flattenedToolbarItems;
                            setTimeout(() => {
                                this.handleInlineToolbarCreated();
                            }, 10);
                            break;
                        }
                    }
                }
            }
        }
        else {
            const moduleName = e.module;
            if (moduleName === 'fontColorSettings') {
                const fontModel = e.newProp.fontColorSettings;
                if (fontModel && this.textColorPicker && this.pickerHandler) {
                    this.pickerHandler.updatePickerProperties(this.textColorPicker, fontModel);
                }
                return;
            }
            if (moduleName === 'backgroundColorSettings') {
                const bgModel = e.newProp.backgroundColorSettings;
                if (bgModel && this.bgColorPicker && this.pickerHandler) {
                    this.pickerHandler.updatePickerProperties(this.bgColorPicker, bgModel);
                }
                return;
            }
        }
    }
    //Initializes the Transform dropdown (Paragraph, Headings, Lists)
    initializeTransformDropdown() {
        const toolbarElement = document.querySelector('#' + this.editor.element.id + BLOCKEDITOR_INLINETBAR_ID);
        const transformBtn = toolbarElement.querySelector('#toolbar-transform-dropdown');
        const cssClass = 'e-flat e-be-blocktype-ddb e-blockeditor-command-menu';
        // Determine dropdown items: use custom transformSettings if provided, otherwise fall back to defaultTransformModel
        this.currentTransformItems = defaultTransformModel;
        if (this.editor.transformSettings &&
            this.editor.transformSettings.items &&
            this.editor.transformSettings.items.length > 0) {
            // Use custom transform items from transformSettings
            this.currentTransformItems = this.resolveTransformItems(this.editor.transformSettings.items);
        }
        const items = this.currentTransformItems.map((m) => ({
            type: m.type,
            id: m.id,
            label: m.label,
            iconCss: m.iconCss,
            shortcut: m.shortcut,
            disabled: m.disabled,
            tooltip: m.tooltip
        }));
        const selectHandler = (args) => {
            const itemId = args.item && args.item.id;
            if (!itemId) {
                return;
            }
            const model = this.currentTransformItems.find((m) => m.id === itemId);
            if (!model) {
                return;
            }
            // Respect disabled flag on transform items
            if (model.disabled) {
                return;
            }
            // Check if the selected item is the same as the current block type
            const currentItemId = this.getMatchingTransformItemId();
            if (currentItemId === itemId) {
                // Same block type selected, no need to transform
                return;
            }
            // Trigger itemSelect event if defined in transformSettings
            if (this.editor.transformSettings && this.editor.transformSettings.itemSelect) {
                const eventArgs = {
                    command: model,
                    element: args.item || null,
                    event: null,
                    cancel: false
                };
                this.editor.transformSettings.itemSelect.call(this.editor, eventArgs);
                if (eventArgs.cancel) {
                    return;
                }
            }
            let props;
            if (model.type === BlockType.Heading) {
                const match = itemId.match(/heading(\d)/i);
                const level = match ? Math.max(1, Math.min(4, parseInt(match[1], 10))) : 1;
                props = { level };
            }
            this.editor.blockManager.blockCommand.transformBlocksForSelection(model.type, props);
        };
        const beforeOpenHandler = () => {
            // Apply selected menu item styling when dropdown opens
            setTimeout(() => {
                this.applyTransformMenuSelection();
            }, 0);
        };
        // Create dropdown button with items and select handler
        const dropDown = this.createDropDown({
            instance: {
                items,
                cssClass: cssClass,
                createPopupOnClick: true,
                popupWidth: '250px',
                select: selectHandler,
                beforeOpen: beforeOpenHandler,
                itemTemplate: '<div class=\'e-transform-item-template\'><div class=\'e-transform-icon-info\'>' +
                    '<span class="${iconCss}"></span></div><div class=\'e-transform-item-info\'>' +
                    '<span title="${tooltip}">${label}' +
                    '</span><span class=\'e-be-transform-shortcut\'>${shortcut}</span></div></div>'
            },
            element: transformBtn,
            inlineClass: null,
            type: null
        });
        this.transformDDB = dropDown;
        // Initialize icon for the existing e-be-transform-block element
        const iconCss = this.getCurrentTransformIcon();
        const transformBlockElement = toolbarElement.querySelector('.e-be-transform-block');
        if (transformBlockElement) {
            // Keep base classes and add the icon class
            transformBlockElement.className = `e-be-transform-block ${iconCss}`;
        }
        // Update label live when selection/focus changes
        this.updateTransformLabelHandler = () => {
            const newIconCss = this.getCurrentTransformIcon();
            const hasIgnoredBlocks = this.hasIgnoredBlockTypes();
            if (this.transformDDB) {
                // Query select the e-be-transform-block element and update its icon
                const transformIcon = document.querySelector('.e-be-transform-block');
                if (transformIcon) {
                    // Update icon classes while keeping base classes
                    transformIcon.className = `e-be-transform-block ${newIconCss}`;
                }
                // Disable/enable the dropdown based on ignored block types
                this.transformDDB.disabled = hasIgnoredBlocks;
                // Add/remove e-disabled class to the transform button
                if (hasIgnoredBlocks) {
                    toolbarElement.firstElementChild.firstElementChild.classList.add('e-disabled');
                }
                else {
                    toolbarElement.firstElementChild.firstElementChild.classList.remove('e-disabled');
                }
            }
        };
        EventHandler.add(document, 'selectionchange', this.updateTransformLabelHandler);
        // Initialize disabled state based on current selection
        const hasIgnoredBlocks = this.hasIgnoredBlockTypes();
        if (this.transformDDB) {
            this.transformDDB.disabled = hasIgnoredBlocks;
            if (hasIgnoredBlocks) {
                toolbarElement.firstElementChild.firstElementChild.classList.add('e-disabled');
            }
        }
    }
    applyTransformMenuSelection() {
        // Get the current block's corresponding menu item
        const currentItemId = this.getMatchingTransformItemId();
        // Query all menu items in the dropdown popup - look for li elements with data-text attribute
        const menuPopup = document.querySelector('#toolbar-transform-dropdown-popup');
        if (!menuPopup) {
            return;
        }
        // Add e-selected class to the matching item only if it is not disabled
        if (currentItemId) {
            const matchingModel = this.currentTransformItems.find((m) => m.id === currentItemId);
            // Only add e-selected if the item is not disabled
            if (matchingModel && !matchingModel.disabled) {
                const selectedItem = menuPopup.querySelector(`#${currentItemId}`);
                if (selectedItem) {
                    selectedItem.classList.add('e-selected');
                }
            }
        }
    }
    getMatchingTransformItemId() {
        // If multiple blocks are selected, return null (no single item to highlight)
        const selectedBlocks = this.editor.getSelectedBlocks ? this.editor.getSelectedBlocks() : null;
        if (selectedBlocks && selectedBlocks.length > 1) {
            return null;
        }
        // Prefer selected block model when single block is selected
        let blockModel = null;
        if (selectedBlocks && selectedBlocks.length === 1) {
            blockModel = selectedBlocks[0];
        }
        else {
            const focusedBlk = this.editor.blockManager.currentFocusedBlock;
            if (!focusedBlk) {
                return null;
            }
            blockModel = getBlockModelById(focusedBlk.id, this.editor.blockManager.getEditorBlocks());
        }
        if (!blockModel) {
            return null;
        }
        const selType = blockModel.blockType;
        let model = null;
        if (selType === BlockType.Heading) {
            const level = blockModel.properties ?
                blockModel.properties.level || 1 : 1;
            model = this.currentTransformItems.find((m) => m.id === `heading${level}-command`);
        }
        if (!model) {
            model = this.currentTransformItems.find((m) => m.type === selType);
        }
        return model ? model.id : null;
    }
    getCurrentTransformIcon() {
        // Get default icon from first item (Paragraph)
        const defaultIcon = this.currentTransformItems.length > 0 ? this.currentTransformItems[0].iconCss : '';
        // If multiple blocks are selected, return paragraph icon
        const selectedBlocks = this.editor.getSelectedBlocks ? this.editor.getSelectedBlocks() : null;
        if (selectedBlocks && selectedBlocks.length > 1) {
            return defaultIcon;
        }
        // Prefer selected block model when single block is selected
        let blockModel = null;
        if (selectedBlocks && selectedBlocks.length === 1) {
            blockModel = selectedBlocks[0];
        }
        else {
            const focusedBlk = this.editor.blockManager.currentFocusedBlock;
            if (!focusedBlk) {
                return defaultIcon;
            }
            blockModel = getBlockModelById(focusedBlk.id, this.editor.blockManager.getEditorBlocks());
        }
        if (!blockModel) {
            return defaultIcon;
        }
        const selType = blockModel.blockType;
        let model = null;
        if (selType === BlockType.Heading) {
            const level = blockModel.properties ?
                blockModel.properties.level || 1 : 1;
            model = this.currentTransformItems.find((m) => m.id === `heading${level}-command`);
        }
        if (!model) {
            model = this.currentTransformItems.find((m) => m.type === selType);
        }
        return model ? model.iconCss : defaultIcon;
    }
    getToolbarItems(items) {
        const defaults = getInlineToolbarItems();
        const resolved = items.map((item) => {
            if (typeof item === 'string') {
                const match = defaults.find((d) => d.command && d.command.toLowerCase() === item.toLowerCase());
                return match ? match : item;
            }
            return item;
        });
        return transformIntoToolbarItem(resolved);
    }
    hasToolbarItemId(targetId) {
        const items = this.getToolbarItems(this.editor.inlineToolbarSettings.items);
        return items.some((item) => {
            const id = item.id;
            return id && id.toLowerCase() === targetId.toLowerCase();
        });
    }
    hasIgnoredBlockTypes() {
        // Check if any selected blocks have ignored types
        const selectedBlocks = this.editor.getSelectedBlocks ? this.editor.getSelectedBlocks() : null;
        const ignoredTypes = [BlockType.Callout, BlockType.Quote, BlockType.Image, BlockType.Divider, BlockType.Code];
        // If blocks are selected, check if any are of ignored type
        if (selectedBlocks && selectedBlocks.length > 0) {
            return selectedBlocks.some((block) => ignoredTypes.indexOf(block.blockType) !== -1);
        }
        // If no selected blocks, check the currently focused block
        const focusedBlk = this.editor.blockManager.currentFocusedBlock;
        if (!focusedBlk) {
            return false;
        }
        const blockModel = getBlockModelById(focusedBlk.id, this.editor.blockManager.getEditorBlocks());
        if (!blockModel) {
            return false;
        }
        return ignoredTypes.indexOf(blockModel.blockType) !== -1;
    }
    /**
     * Resolves custom transform items from transformSettings into a normalized TransformItemModel array.
     * Handles string identifiers and model objects.
     *
     * @param {(string | TransformCommandName | TransformItemModel)[]} items - The raw transform items.
     * @returns {TransformItemModel[]} - The resolved transform items.
     * @private
     */
    resolveTransformItems(items) {
        return items
            .map((item) => {
            // Handle object models
            if (typeof item === 'object' && item !== null) {
                return item;
            }
            // Handle string identifiers - find matching item from defaultTransformModel
            const itemStr = String(item).trim().toLowerCase();
            return defaultTransformModel.find((m) => m.label.toLowerCase() === itemStr);
        })
            .filter((item) => item);
    }
    /**
     * Destroys the inline toolbar module and cleans up resources
     *
     * @returns {void}
     */
    destroy() {
        this.removeEventListeners();
        if (this.textColorPicker) {
            this.textColorPicker.destroy();
            this.textColorPicker = null;
        }
        if (this.bgColorPicker) {
            this.bgColorPicker.destroy();
            this.bgColorPicker = null;
        }
        if (this.inlineToolbarTooltip) {
            this.inlineToolbarTooltip.destroy();
        }
        if (this.toolbarObj) {
            this.toolbarObj.destroy();
            detach(this.toolbarEle);
            this.toolbarObj = null;
        }
        if (this.updateTransformLabelHandler) {
            EventHandler.remove(document, 'selectionchange', this.updateTransformLabelHandler);
            this.updateTransformLabelHandler = null;
        }
        this.toolbarRenderer = null;
        this.inlineToolbarTooltip = null;
        this.pickerHandler = null;
    }
}

var __decorate$b = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures settings related to image block in the editor.
 */
class ImageBlockSettings extends ChildProperty {
}
__decorate$b([
    Property('')
], ImageBlockSettings.prototype, "saveUrl", void 0);
__decorate$b([
    Property(30000000)
], ImageBlockSettings.prototype, "maxFileSize", void 0);
__decorate$b([
    Property('')
], ImageBlockSettings.prototype, "path", void 0);
__decorate$b([
    Property('Base64')
], ImageBlockSettings.prototype, "saveFormat", void 0);
__decorate$b([
    Property(['.jpg', '.jpeg', '.png'])
], ImageBlockSettings.prototype, "allowedTypes", void 0);
__decorate$b([
    Property('auto')
], ImageBlockSettings.prototype, "height", void 0);
__decorate$b([
    Property('auto')
], ImageBlockSettings.prototype, "width", void 0);
__decorate$b([
    Property(true)
], ImageBlockSettings.prototype, "enableResize", void 0);
__decorate$b([
    Property('')
], ImageBlockSettings.prototype, "minHeight", void 0);
__decorate$b([
    Property('')
], ImageBlockSettings.prototype, "maxHeight", void 0);
__decorate$b([
    Property('')
], ImageBlockSettings.prototype, "minWidth", void 0);
__decorate$b([
    Property('')
], ImageBlockSettings.prototype, "maxWidth", void 0);

var __decorate$c = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures settings related to code block in the editor.
 */
class CodeBlockSettings extends ChildProperty {
}
__decorate$c([
    Property([])
], CodeBlockSettings.prototype, "languages", void 0);
__decorate$c([
    Property('plaintext')
], CodeBlockSettings.prototype, "defaultLanguage", void 0);

var __decorate$d = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the background color settings of the Block Editor component.
 * Use this class to customize background color options including default color, display mode (palette or picker), grid layout, and custom color palettes for text highlighting and emphasis.
 */
class BackgroundColorSettings extends ChildProperty {
}
__decorate$d([
    Property('#ffff00')
], BackgroundColorSettings.prototype, "default", void 0);
__decorate$d([
    Property('Palette')
], BackgroundColorSettings.prototype, "mode", void 0);
__decorate$d([
    Property(10)
], BackgroundColorSettings.prototype, "columns", void 0);
__decorate$d([
    Property(null)
], BackgroundColorSettings.prototype, "colorCode", void 0);
__decorate$d([
    Property(false)
], BackgroundColorSettings.prototype, "modeSwitcher", void 0);

var __decorate$e = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the font color settings of the Block Editor component.
 * Use this class to customize text color options including default color, display mode (palette or picker), grid layout, and custom color palettes.
 */
class FontColorSettings extends ChildProperty {
}
__decorate$e([
    Property('#ff0000')
], FontColorSettings.prototype, "default", void 0);
__decorate$e([
    Property('Palette')
], FontColorSettings.prototype, "mode", void 0);
__decorate$e([
    Property(10)
], FontColorSettings.prototype, "columns", void 0);
__decorate$e([
    Property(null)
], FontColorSettings.prototype, "colorCode", void 0);
__decorate$e([
    Property(false)
], FontColorSettings.prototype, "modeSwitcher", void 0);

class InlineContentInsertionModule {
    constructor(editor) {
        this.editor = editor;
        this.addEventListeners();
    }
    addEventListeners() {
        this.editor.on(events.moduleChanged, this.onPropertyChanged, this);
        this.editor.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.editor.off(events.moduleChanged, this.onPropertyChanged);
        this.editor.off(events.destroy, this.destroy);
    }
    /**
     * Initializes the user mention module.
     *
     * @returns {void}
     * @hidden
     */
    initializeUserMention() {
        const mentionDataSource = this.editor.users.map((user) => ({
            id: user.id,
            user: user.user.trim(),
            avatarUrl: user.avatarUrl,
            avatarBgColor: user.avatarBgColor || getAutoAvatarColor(user.id),
            initials: getUserInitials(user.user)
        }));
        const mentionArgs = {
            element: this.editor.blockContainer,
            itemTemplate: '<div class="e-user-mention-item-template"><div class="em-avatar" style="background-color: ${avatarBgColor};">${if(avatarUrl)} <img src="${avatarUrl}" alt="${user}" class="em-img" /> ${else} <div class="em-initial">${initials}</div> ${/if} </div><div class="em-content"><div class="em-text">${user}</div></div></div>',
            displayTemplate: getUserMentionDisplayTemplate(),
            dataSource: mentionDataSource,
            popupWidth: '200px',
            cssClass: 'e-blockeditor-user-menu e-blockeditor-mention-menu',
            fields: { text: 'user', value: 'id' },
            change: this.handleInlineContentInsertion.bind(this),
            beforeOpen: (args) => {
                const focusedBlk = this.editor.blockManager.currentFocusedBlock;
                args.cancel = (this.editor.users.length === 0)
                    || (focusedBlk && extractBlockTypeFromElement(focusedBlk) === BlockType.Code);
            }
        };
        this.userMenuObj = this.editor.mentionRenderer.renderMention(mentionArgs);
    }
    /**
     * Initializes the label mention module.
     *
     * @returns {void}
     * @hidden
     */
    initializeLabelContent() {
        let items;
        if (this.editor.labelSettings.items.length > 0) {
            items = sanitizeLabelItems(this.editor.labelSettings.items);
        }
        else {
            items = getLabelMenuItems();
            const prevOnChange = this.editor.isProtectedOnChange;
            this.editor.isProtectedOnChange = true;
            this.editor.labelSettings.items = items;
            this.editor.isProtectedOnChange = prevOnChange;
        }
        const mentionArgs = {
            element: this.editor.blockContainer,
            mentionChar: this.editor.labelSettings.triggerChar,
            itemTemplate: '<div class="e-label-mention-item-template"><div class="em-avatar" style="background-color: ${labelColor};"> </div><div class="em-content"><span class="em-icon ${iconCss}"></span><div class="em-text">${text}</div></div></div>',
            displayTemplate: getLabelMentionDisplayTemplate(),
            dataSource: items,
            popupWidth: '200px',
            cssClass: 'e-blockeditor-label-menu e-blockeditor-mention-menu',
            fields: { text: 'text', value: 'id', groupBy: 'groupBy', iconCss: 'iconCss' },
            change: this.handleInlineContentInsertion.bind(this),
            beforeOpen: (args) => {
                const focusedBlk = this.editor.blockManager.currentFocusedBlock;
                args.cancel = (focusedBlk && extractBlockTypeFromElement(focusedBlk) === BlockType.Code);
            }
        };
        this.labelMenuObj = this.editor.mentionRenderer.renderMention(mentionArgs);
    }
    handleInlineContentInsertion(args) {
        // args.e.preventDefault();
        // args.e.stopPropagation();
        this.editor.blockManager.observer.notify('inlineContentInsertion', args);
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    getModuleName() {
        return 'inlineContent';
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param {BlockEditorModel} e - specifies the element.
     * @returns {void}
     * @hidden
     */
    onPropertyChanged(e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        const newLabelProp = e.newProp.labelSettings;
        if (!isNullOrUndefined(newLabelProp)) {
            for (const prop of Object.keys(newLabelProp)) {
                switch (prop) {
                    case 'items':
                        this.labelMenuObj.dataSource = newLabelProp.items;
                        break;
                    case 'triggerChar':
                        this.labelMenuObj.mentionChar = newLabelProp.triggerChar;
                        break;
                }
            }
        }
        if (!isNullOrUndefined(e.newProp.users)) {
            this.userMenuObj.dataSource = e.newProp.users;
        }
    }
    /**
     * Destroys the inline content module.
     *
     * @returns {void}
     */
    destroy() {
        if (this.userMenuObj) {
            this.userMenuObj.destroy();
        }
        if (this.labelMenuObj) {
            this.labelMenuObj.destroy();
        }
        this.removeEventListeners();
        this.userMenuObj = null;
        this.labelMenuObj = null;
    }
}

/**
 * `SlashCommandModule` module is used to handle the slash command actions in the BlockEditor.
 *
 * @hidden
 */
class SlashCommandModule {
    constructor(editor) {
        this.editor = editor;
        this.init();
        this.addEventListeners();
    }
    addEventListeners() {
        this.editor.blockManager.observer.on('showSlashMenuPopup', this.showPopup, this);
        this.editor.blockManager.observer.on('hideSlashMenuPopup', this.hidePopup, this);
        this.editor.blockManager.observer.on('filterSlashCommands', this.filterCommands, this);
        this.editor.on(events.moduleChanged, this.onPropertyChanged, this);
        this.editor.on(events.rtlChanged, this.applyRtlSettings, this);
        this.editor.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.editor.blockManager.observer.off('showSlashMenuPopup', this.showPopup);
        this.editor.blockManager.observer.off('hideSlashMenuPopup', this.hidePopup);
        this.editor.blockManager.observer.off('filterSlashCommands', this.filterCommands);
        this.editor.off(events.moduleChanged, this.onPropertyChanged);
        this.editor.off(events.rtlChanged, this.applyRtlSettings);
        this.editor.off(events.destroy, this.destroy);
    }
    init() {
        const mentionArgs = {
            element: this.editor.blockContainer,
            mentionChar: '/',
            dataSource: this.getCommandItems(),
            cssClass: 'e-blockeditor-command-menu e-blockeditor-mention-menu',
            highlight: true,
            fields: { text: 'label', value: 'label', iconCss: 'iconCss', groupBy: 'groupBy', disabled: 'disabled' },
            itemTemplate: '<div class="e-command-mention-item-template" title="${tooltip}"><div class="e-command-icon-info"><span class="e-command-icon ${iconCss}"></span></div><div class="e-command-item-info"><div class="e-command-title">${label}</div>${if(shortcut)}<div class="e-command-shortcut">${shortcut}</div>${/if}</div></div>',
            displayTemplate: '',
            popupWidth: this.editor.commandMenuSettings.popupWidth,
            popupHeight: this.editor.commandMenuSettings.popupHeight,
            change: this.handleSlashCommandChange.bind(this),
            beforeOpen: this.handleSlashCommandBeforeOpen.bind(this),
            opened: this.handleSlashCommandOpened.bind(this),
            beforeClose: this.handleSlashCommandBeforeClose.bind(this),
            select: this.handleSlashCommandSelect.bind(this),
            filtering: this.handleSlashCommandFiltering.bind(this)
        };
        this.mentionObj = this.editor.mentionRenderer.renderMention(mentionArgs);
        this.applyRtlSettings();
        this.editor.blockManager.observer.notify('slashMenuCreated');
    }
    getCommandItems() {
        const slashMenuOptions = this.editor.commandMenuSettings.commands.length > 0
            ? sanitizeCommandMenuItems(this.editor.commandMenuSettings.commands)
            : getCommandMenuItems();
        if (this.editor.commandMenuSettings.commands.length <= 0) {
            const prevOnChange = this.editor.isProtectedOnChange;
            this.editor.isProtectedOnChange = true;
            this.editor.commandMenuSettings.commands = slashMenuOptions;
            this.editor.isProtectedOnChange = prevOnChange;
        }
        return slashMenuOptions;
    }
    bindTooltipForSlashPopup(popupEle) {
        this.slashMenuTooltip = this.editor.tooltipRenderer.renderTooltip({
            cssClass: 'e-blockeditor-command-menu-tooltip',
            position: 'RightCenter',
            target: '.e-list-item',
            windowCollision: true,
            element: popupEle,
            beforeRender: (args) => {
                const target = args.target;
                const templateRoot = target.querySelector('.e-command-mention-item-template');
                if (target.classList.contains(DISABLED_CLS) || !templateRoot) {
                    args.cancel = true;
                    return;
                }
                const tooltipVal = templateRoot.getAttribute('title');
                if (tooltipVal) {
                    this.slashMenuTooltip.content = tooltipVal;
                }
                else {
                    args.cancel = true;
                }
            }
        });
    }
    setActiveItem(popupEle) {
        const firstItem = popupEle.querySelector('.e-list-item');
        if (firstItem) {
            firstItem.classList.add('e-active');
        }
    }
    clearTooltipState() {
        if (this.slashMenuTooltip) {
            this.slashMenuTooltip.destroy();
        }
    }
    handleSlashCommandChange(args) {
        args.e.preventDefault();
        args.e.stopPropagation();
        this.editor.blockManager.observer.notify('slashCommandChange', args);
    }
    handleSlashCommandFiltering(args) {
        const filterArgs = {
            commands: this.editor.commandMenuSettings.commands,
            text: args.text,
            event: args.baseEventArgs,
            cancel: false
        };
        if (this.editor.commandMenuSettings.filtering) {
            this.editor.commandMenuSettings.filtering.call(this, filterArgs);
            args.cancel = filterArgs.cancel;
            if (!args.cancel) {
                args.updateData(filterArgs.commands);
            }
        }
    }
    handleSlashCommandSelect(args) {
        const itemClickArgs = {
            command: this.editor.commandMenuSettings.commands.find((c) => c.id === args.itemData.id),
            element: args.item,
            event: args.e,
            isInteracted: true,
            cancel: false
        };
        if (this.editor.commandMenuSettings.itemSelect) {
            this.editor.commandMenuSettings.itemSelect.call(this, itemClickArgs);
        }
        args.cancel = itemClickArgs.cancel;
    }
    handleSlashCommandOpened(args) {
        const mentionPopupId = `${this.editor.blockContainer.id}_popup`;
        const popupEle = document.querySelector(`#${mentionPopupId}.e-blockeditor-command-menu`);
        this.clearTooltipState();
        this.bindTooltipForSlashPopup(popupEle);
        this.setActiveItem(popupEle);
        const tableBlock = this.editor.blockManager.currentFocusedBlock
            ? findClosestParent(this.editor.blockManager.currentFocusedBlock, `.${TABLE_BLOCK_CLS}`)
            : null;
        if (tableBlock) {
            this.restrictItemsOnSpecificBlock([BlockType.Table], popupEle);
        }
        this.editor.blockManager.observer.notify('updateSlashMenuPopupState', { isOpen: true });
    }
    restrictItemsOnSpecificBlock(blockTypes, popupEle) {
        blockTypes.forEach((blockType) => {
            const listItem = popupEle.querySelector(`[data-value=${blockType}]`);
            if (listItem) {
                listItem.classList.add(HIDDEN_CLS);
            }
        });
    }
    handleSlashCommandBeforeOpen(args) {
        if (this.editor.blockManager.currentFocusedBlock) {
            args.cancel = this.restrictPopupForBlockTypes(this.editor.blockManager.currentFocusedBlock.getAttribute('data-block-type'));
        }
    }
    handleSlashCommandBeforeClose(args) {
        this.editor.blockManager.observer.notify('updateSlashMenuPopupState', { isOpen: false });
        this.clearTooltipState();
    }
    restrictPopupForBlockTypes(blockType) {
        return blockType === BlockType.Code || blockType === BlockType.Image;
    }
    applyRtlSettings() {
        this.mentionObj.enableRtl = this.editor.enableRtl;
        this.mentionObj.enablePersistence = this.editor.enablePersistence;
        this.mentionObj.locale = this.editor.locale;
        if (this.slashMenuTooltip) {
            this.slashMenuTooltip.position = this.editor.enableRtl ? 'LeftCenter' : 'RightCenter';
        }
    }
    /**
     * Hides the slash command popup.
     *
     * @returns {void}
     * @hidden
     */
    hidePopup() {
        if (this.mentionObj) {
            this.mentionObj.hidePopup();
        }
    }
    /**
     * Shows the slash command popup.
     *
     * @returns {void}
     * @hidden
     */
    showPopup() {
        const mentionPopupId = `${this.editor.blockContainer.id}_popup`;
        const popupElement = document.querySelector(`#${mentionPopupId}.e-blockeditor-command-menu`);
        if (popupElement && popupElement.classList.contains('e-popup-open')) {
            return;
        }
        if (this.mentionObj) {
            this.mentionObj.showPopup();
        }
    }
    /**
     * Filters the slash commands based on the given text.
     *
     * @param {{ text: string, offsetX: number, offsetY: number }} options - options to filter the slash commands.
     * @returns {void}
     * @hidden
     */
    filterCommands(options) {
        if (this.mentionObj) {
            if (options.text.length > SlashCommandModule.MAX_FILTER_TEXT_LENGTH) {
                this.hidePopup();
                return;
            }
            const rect = this.editor.floatingIconRenderer.floatingIconContainer.getBoundingClientRect();
            options.offsetX += rect.width;
            this.mentionObj.search(options.text, options.offsetX, options.offsetY);
        }
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    getModuleName() {
        return 'slashCommand';
    }
    /**
     * Destroys the slash command module.
     *
     * @returns {void}
     */
    destroy() {
        this.removeEventListeners();
        if (this.mentionObj) {
            this.mentionObj.destroy();
            this.mentionObj = null;
        }
        if (this.slashMenuTooltip) {
            this.slashMenuTooltip.destroy();
            this.slashMenuTooltip = null;
        }
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param {BlockEditorModel} e - specifies the element.
     * @returns {void}
     * @hidden
     */
    onPropertyChanged(e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        const newProp = e.newProp.commandMenuSettings;
        if (!isNullOrUndefined(newProp)) {
            for (const prop of Object.keys(newProp)) {
                switch (prop) {
                    case 'popupWidth':
                        this.mentionObj.popupWidth = this.editor.blockManager.commandMenuSettings.popupWidth;
                        break;
                    case 'popupHeight':
                        this.mentionObj.popupHeight = this.editor.blockManager.commandMenuSettings.popupHeight;
                        break;
                    case 'commands':
                        this.mentionObj.dataSource = this.editor.blockManager.commandMenuSettings.commands =
                            sanitizeCommandMenuItems(newProp.commands);
                        break;
                }
            }
        }
    }
}
SlashCommandModule.MAX_FILTER_TEXT_LENGTH = 6;

/**
 * `ContextMenuModule` is used to handle the context menu actions in the BlockEditor.
 *
 * @hidden
 */
class ContextMenuModule {
    constructor(editor) {
        this.editor = editor;
        this.init();
        this.addEventListeners();
    }
    addEventListeners() {
        this.editor.on(events.moduleChanged, this.onPropertyChanged, this);
        this.editor.blockManager.observer.on('enableDisableContextMenuItems', this.enableMenuItems, this);
        this.editor.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.editor.off(events.moduleChanged, this.onPropertyChanged);
        this.editor.blockManager.observer.off('enableDisableContextMenuItems', this.enableMenuItems);
        this.editor.off(events.destroy, this.destroy);
    }
    init() {
        this.menuElement = this.editor.createElement('ul', {
            id: (this.editor.element.id + BLOCKEDITOR_CONTEXTMENU_ID)
        });
        document.body.appendChild(this.menuElement);
        const itemTemplate = '${if(!separator)}' +
            '<div class="e-ctmenu-item-template">' +
            '<div class="e-ctmenu-content">' +
            '<span class="e-ctmenu-icon ${iconCss}"></span>' +
            '<span class="e-ctmenu-text">${text}</span>' +
            '</div>' +
            '${if(shortcut)}' +
            '<div class="e-ctmenu-shortcut">${shortcut}</div>' +
            '${/if}' +
            '</div>' +
            '${/if}';
        this.contextMenuObj = this.editor.menubarRenderer.renderContextMenu({
            target: '#' + this.editor.element.id,
            cssClass: BLOCKEDITOR_CONTEXTMENU_CLS,
            element: this.menuElement,
            items: this.getMenuItems(),
            showItemOnClick: this.editor.contextMenuSettings.showItemOnClick,
            itemTemplate: itemTemplate,
            fields: { text: 'text', iconCss: 'iconCss', itemId: 'id' },
            select: this.handleContextMenuSelection.bind(this),
            beforeOpen: this.handleContextMenuBeforeOpen.bind(this),
            beforeClose: this.handleContextMenuBeforeClose.bind(this),
            open: this.handleContextMenuOpen.bind(this),
            close: this.handleContextMenuClose.bind(this)
        });
        this.editor.blockManager.observer.notify('contextMenuCreated');
    }
    getMenuItems() {
        const menuItems = this.editor.contextMenuSettings.items.length > 0
            ? sanitizeContextMenuItems(this.editor.contextMenuSettings.items)
            : getContextMenuItems();
        if (this.editor.contextMenuSettings.items.length <= 0) {
            const prevOnChange = this.editor.isProtectedOnChange;
            this.editor.isProtectedOnChange = true;
            this.editor.contextMenuSettings.items = menuItems;
            this.editor.isProtectedOnChange = prevOnChange;
        }
        return menuItems;
    }
    handleContextMenuBeforeOpen(args) {
        const eventArgs = {
            event: args.event,
            items: this.editor.contextMenuSettings.items,
            parentItem: args.parentItem,
            cancel: !this.editor.contextMenuSettings.enable
        };
        if (this.editor.contextMenuSettings.beforeOpen) {
            this.editor.contextMenuSettings.beforeOpen.call(this, eventArgs);
        }
        args.cancel = eventArgs.cancel;
        if (this.editor.readOnly) {
            args.cancel = true;
        }
        if (!args.cancel) {
            this.editor.blockManager.observer.notify('contextMenuBeforeOpen', args);
        }
    }
    handleContextMenuBeforeClose(args) {
        const eventArgs = {
            event: args.event,
            items: this.editor.contextMenuSettings.items,
            parentItem: args.parentItem,
            cancel: false
        };
        if (this.editor.contextMenuSettings.beforeClose) {
            this.editor.contextMenuSettings.beforeClose.call(this, eventArgs);
        }
        args.cancel = eventArgs.cancel;
    }
    handleContextMenuOpen(args) {
        this.editor.blockManager.observer.notify('updateContextMenuState', { value: { isOpen: true } });
    }
    handleContextMenuClose(args) {
        this.editor.blockManager.observer.notify('updateContextMenuState', { value: { isOpen: false } });
    }
    handleContextMenuSelection(args) {
        const clickEventArgs = {
            item: args.item,
            event: args.event,
            cancel: false
        };
        if (this.editor.contextMenuSettings.itemSelect) {
            this.editor.contextMenuSettings.itemSelect.call(this, clickEventArgs);
        }
        if (!clickEventArgs.cancel) {
            this.editor.blockManager.observer.notify('contextMenuSelection', args);
        }
    }
    enableMenuItems(menuState) {
        if (this.contextMenuObj) {
            const itemIds = Object.keys(menuState);
            itemIds.forEach((item) => {
                this.contextMenuObj.enableItems([item], menuState[item], true);
            });
        }
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    getModuleName() {
        return 'contextMenuSettings';
    }
    /**
     * Destroys the ContextMenu module.
     *
     * @returns {void}
     */
    destroy() {
        if (this.contextMenuObj) {
            this.contextMenuObj.destroy();
            this.contextMenuObj = null;
            detach(this.menuElement);
            this.menuElement = null;
        }
        this.removeEventListeners();
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param {BlockEditorModel} e - specifies the element.
     * @returns {void}
     * @hidden
     */
    onPropertyChanged(e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        const newProp = e.newProp.contextMenuSettings;
        if (!isNullOrUndefined(newProp)) {
            for (const prop of Object.keys(newProp)) {
                switch (prop) {
                    case 'showItemOnClick':
                        this.contextMenuObj.showItemOnClick = this.editor.blockManager.contextMenuSettings.showItemOnClick =
                            newProp.showItemOnClick;
                        break;
                    case 'items':
                        this.contextMenuObj.items = this.editor.blockManager.contextMenuSettings.items =
                            sanitizeContextMenuItems(newProp.items);
                        break;
                    case 'itemTemplate':
                        this.contextMenuObj.itemTemplate = newProp.itemTemplate;
                        break;
                }
            }
        }
    }
}

/**
 * `BlockActionMenuModule` is used to handle the block action menu in the BlockEditor.
 *
 * @hidden
 */
class BlockActionMenuModule {
    constructor(editor) {
        this.editor = editor;
        this.init();
        this.addEventListeners();
        this.bindTooltip();
    }
    addEventListeners() {
        this.editor.on(events.moduleChanged, this.onPropertyChanged, this);
        this.editor.on(events.rtlChanged, this.applyRtlSettings, this);
        this.editor.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.editor.off(events.moduleChanged, this.onPropertyChanged);
        this.editor.off(events.rtlChanged, this.applyRtlSettings);
        this.editor.off(events.destroy, this.destroy);
    }
    init() {
        this.menuElement = this.editor.createElement('ul', {
            id: (this.editor.element.id + BLOCKACTION_MENUBAR_ID),
            styles: 'width: 100%'
        });
        this.editor.element.appendChild(this.menuElement);
        const itemTemplate = '<div class="e-blockaction-item-template">' +
            '<div class="e-action-icon-info">' +
            '<span class="e-action-icon ${iconCss}"></span>' +
            '</div>' +
            '<div class="e-action-item-info">' +
            '<div class="e-action-item-label">${label}</div>' +
            '${if(shortcut)}' +
            '<div class="e-action-item-shortcut">${shortcut}</div>' +
            '${/if}' +
            '</div>' +
            '</div>';
        this.menuObj = this.editor.menubarRenderer.renderMenubar({
            element: this.menuElement,
            cssClass: BLOCKACTION_MENUBAR_CLS,
            items: this.getActionItems(),
            template: itemTemplate,
            orientation: 'Vertical',
            fields: { text: 'label', iconCss: 'iconCss' },
            select: this.handleBlockActionMenuSelect.bind(this)
        });
        const popupElement = this.editor.createElement('div', {
            id: (this.editor.element.id + BLOCKACTION_POPUP_ID),
            className: BLOCKACTION_POPUP_CLS
        });
        this.editor.element.appendChild(popupElement);
        this.editor.blockManager.observer.notify('actionMenuCreated');
    }
    getActionItems() {
        const actionItems = this.editor.blockActionMenuSettings.items.length > 0
            ? sanitizeBlockActionItems(this.editor.blockActionMenuSettings.items)
            : getBlockActionsMenuItems();
        if (this.editor.blockActionMenuSettings.items.length <= 0) {
            const prevOnChange = this.editor.isProtectedOnChange;
            this.editor.isProtectedOnChange = true;
            this.editor.blockActionMenuSettings.items = actionItems;
            this.editor.isProtectedOnChange = prevOnChange;
        }
        return actionItems;
    }
    bindTooltip() {
        if (!this.editor.blockActionMenuSettings.enableTooltip) {
            return;
        }
        this.blockActionTooltip = this.editor.tooltipRenderer.renderTooltip({
            cssClass: BLOCKACTION_TOOLTIP_CLS,
            position: 'RightCenter',
            target: '.e-menu-item',
            windowCollision: true,
            element: document.querySelector('#' + this.editor.element.id + BLOCKACTION_POPUP_ID)
        });
    }
    applyRtlSettings() {
        if (this.menuObj) {
            this.menuObj.enableRtl = this.editor.enableRtl;
        }
        if (this.blockActionTooltip) {
            this.blockActionTooltip.position = this.editor.enableRtl ? 'LeftCenter' : 'RightCenter';
        }
    }
    handleBlockActionMenuSelect(args) {
        const clickEventArgs = {
            item: args.item,
            element: args.element,
            isInteracted: (args.event && Object.keys(args.event).length > 0) ? true : false,
            cancel: false
        };
        if (this.editor.blockActionMenuSettings.itemSelect) {
            this.editor.blockActionMenuSettings.itemSelect.call(this, clickEventArgs);
        }
        if (!clickEventArgs.cancel) {
            this.editor.blockManager.observer.notify('blockActionsMenuSelect', args);
        }
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    getModuleName() {
        return 'blockActionMenuSettings';
    }
    destroy() {
        this.removeEventListeners();
        if (this.menuObj) {
            this.menuObj.destroy();
            detach(this.menuElement);
            this.menuObj = null;
            this.menuElement = null;
        }
        if (this.blockActionTooltip) {
            this.blockActionTooltip.destroy();
            this.blockActionTooltip = null;
        }
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param {BlockEditorModel} e - specifies the element.
     * @returns {void}
     * @hidden
     */
    onPropertyChanged(e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        const newProp = e.newProp.blockActionMenuSettings;
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'popupWidth':
                    this.editor.blockManager.observer.notify('popupWidthChanged', { value: newProp.popupWidth });
                    break;
                case 'popupHeight':
                    this.editor.blockManager.observer.notify('popupHeightChanged', { value: newProp.popupHeight });
                    break;
                case 'items':
                    this.menuObj.items = sanitizeBlockActionItems(newProp.items);
            }
        }
    }
}

/**
 * `LinkModule` module is used to handle hyperlinks in the block editor
 *
 * @hidden
 */
class LinkModule {
    constructor(editor) {
        this.editor = editor;
        this.initializeModule();
    }
    initializeModule() {
        this.addEventListeners();
        this.createLinkPopup();
    }
    addEventListeners() {
        this.editor.blockManager.observer.on('showLinkPopup', this.showLinkPopup, this);
        this.editor.blockManager.observer.on('hideLinkPopup', this.hideLinkPopup, this);
        this.editor.on(events.localeChanged, this.updateLinkPopupLocale, this);
        this.editor.on(events.rtlChanged, this.applyRtlSettings, this);
        this.editor.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.editor.blockManager.observer.off('showLinkPopup', this.showLinkPopup);
        this.editor.blockManager.observer.off('hideLinkPopup', this.hideLinkPopup);
        this.editor.off(events.localeChanged, this.updateLinkPopupLocale);
        this.editor.off(events.rtlChanged, this.applyRtlSettings);
        this.editor.off(events.destroy, this.destroy);
    }
    createLinkPopup() {
        this.popupElement = this.createPopupElement();
        this.linkDialog = this.initializeDialog();
        this.updateTargetAndActionForPopup();
        this.editor.blockManager.observer.notify('linkPopupCreated');
    }
    createPopupElement() {
        const element = this.editor.createElement('div', {
            id: (this.editor.element.id + LINKDIALOG_ID),
            className: LINKDIALOG_CLS
        });
        this.editor.element.appendChild(element);
        return element;
    }
    initializeDialog() {
        const footerTemplate = `<div class='e-be-link-footer'>
            <button type='button' tabindex='0' class='e-btn e-flat e-primary e-insert-link-btn'>${this.editor.l10n.getConstant('linkInsert')}</button>
            <button type='button' tabindex='0' class='e-btn e-flat e-remove-link-btn'>${this.editor.l10n.getConstant('linkRemove')}</button>
            <button type='button' tabindex='0' class='e-btn e-flat e-cancel-link-btn'>${this.editor.l10n.getConstant('linkCancel')}</button>
        </div>`;
        const contentTemplate = `<div class='e-be-link-content'>
            <div class='e-link-form-row'>
                <label for='linkUrl'>${this.editor.l10n.getConstant('linkUrl')}</label>
                <input type='text' spellcheck=false id='linkUrl' class='e-input' placeholder='${this.editor.l10n.getConstant('linkUrlPlaceholder')}' required>
            </div>
            <div class='e-link-form-row'>
                <label for='linkText'>${this.editor.l10n.getConstant('linkText')}</label>
                <input type='text' spellcheck=false id='linkText' class='e-input' placeholder='${this.editor.l10n.getConstant('linkTextPlaceholder')}' required>
            </div>
            <div class='e-link-form-row'>
                <label for='linkTitle'>${this.editor.l10n.getConstant('linkTitle')}</label>
                <input type='text' spellcheck=false id='linkTitle' class='e-input' placeholder='${this.editor.l10n.getConstant('linkTitlePlaceholder')}'>
            </div>
        </div>`;
        const headerTemplate = `<div class="e-be-link-header">${this.editor.l10n.getConstant('insertLink')}</div>`;
        const dialogOptions = {
            element: this.popupElement,
            headerTemplate: headerTemplate,
            footerTemplate: footerTemplate,
            contentTemplate: contentTemplate,
            showCloseIcon: true,
            closeOnEscape: true,
            width: '300px',
            height: 'auto',
            visible: false
        };
        return this.editor.dialogRenderer.renderDialog(dialogOptions);
    }
    updateTargetAndActionForPopup() {
        const popup = getComponent(this.linkDialog.element, 'popup');
        popup.relateTo = this.editor.element;
        popup.actionOnScroll = 'hide';
        popup.dataBind();
    }
    updateLinkPopupLocale() {
        if (!this.linkDialog || !this.popupElement) {
            return;
        }
        this.linkDialog.locale = this.editor.locale;
        this.linkDialog.dataBind();
        this.updatePopupElementLocale('.e-be-link-header', 'insertLink');
        this.updatePopupElementLocale('.e-insert-link-btn', 'linkInsert');
        this.updatePopupElementLocale('.e-remove-link-btn', 'linkRemove');
        this.updatePopupElementLocale('.e-cancel-link-btn', 'linkCancel');
        this.updatePopupElementLocale('label[for="linkText"]', 'linkText');
        this.updatePopupElementLocale('#linkText', 'linkText', 'linkTextPlaceholder');
        this.updatePopupElementLocale('label[for="linkUrl"]', 'linkUrl');
        this.updatePopupElementLocale('#linkUrl', 'linkUrl', 'linkUrlPlaceholder');
        this.updatePopupElementLocale('label[for="linkTitle"]', 'linkTitle');
        this.updatePopupElementLocale('#linkTitle', 'linkTitle', 'linkTitlePlaceholder');
    }
    updatePopupElementLocale(selector, textKey, placeholderKey) {
        const element = this.popupElement.querySelector(selector);
        if (element) {
            element.textContent = this.editor.l10n.getConstant(textKey);
            if (placeholderKey && element instanceof HTMLInputElement) {
                element.placeholder = this.editor.l10n.getConstant(placeholderKey);
            }
        }
    }
    applyRtlSettings() {
        this.linkDialog.enableRtl = this.editor.enableRtl;
    }
    /**
     * Shows the link popup dialog at cursor position
     *
     * @param {{ x: string, y: string }} position - position(x and y) for displaying popup
     * @returns {void}
     * @hidden
     */
    showLinkPopup(position) {
        this.linkDialog.position = { X: position.x, Y: position.y };
        this.linkDialog.dataBind();
        this.linkDialog.show();
        this.editor.blockManager.observer.notify('linkPopupAfterOpen', this.linkDialog);
    }
    /**
     * Hides the link popup dialog and restores selection
     *
     * @returns {void}
     * @hidden
     */
    hideLinkPopup() {
        this.linkDialog.hide();
    }
    /**
     * Destroys the link module and cleans up resources
     *
     * @returns {void}
     */
    destroy() {
        if (this.linkDialog) {
            this.linkDialog.destroy();
            detach(this.popupElement);
        }
        this.removeEventListeners();
        this.linkDialog = null;
    }
}

class FloatingIconRenderer {
    /**
     * Creates a new FloatingIconManager instance
     *
     * @param {BlockEditor} editor The parent BlockEditor instance
     */
    constructor(editor) {
        this.editor = editor;
        this.addEventListeners();
    }
    addEventListeners() {
        this.editor.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.editor.off(events.destroy, this.destroy);
    }
    /**
     * Creates the floating icons for the editor
     *
     * @returns {void}
     * @hidden
     */
    createFloatingIcons() {
        this.floatingIconContainer = this.editor.createElement('div', { className: 'e-floating-icons', id: `${this.editor.element.id}_floatingicons` });
        const addIcon = this.editor.createElement('span', { className: 'e-floating-icon e-icons e-block-add-icon' });
        const dragIcon = this.editor.createElement('span', { className: 'e-floating-icon e-icons e-block-drag-icon', attrs: { draggable: 'true' } });
        this.floatingIconContainer.appendChild(addIcon);
        this.floatingIconContainer.appendChild(dragIcon);
        const cssText = 'position: absolute; display: none; pointer-events: none;';
        updateCSSText(this.floatingIconContainer, cssText);
        this.editor.element.appendChild(this.floatingIconContainer);
        this.renderFloatingIconTooltips();
        this.editor.blockManager.observer.notify('floatingIconsCreated');
    }
    renderFloatingIconTooltips() {
        this.addIconTooltip = this.editor.tooltipRenderer.renderTooltip({
            element: this.floatingIconContainer,
            target: '.e-block-add-icon',
            position: 'TopCenter',
            showTipPointer: true,
            windowCollision: true,
            cssClass: 'e-be-floating-icon-tooltip',
            content: this.getTooltipContent('add')
        });
        this.dragIconTooltip = this.editor.tooltipRenderer.renderTooltip({
            element: this.floatingIconContainer,
            target: '.e-block-drag-icon',
            position: 'TopCenter',
            showTipPointer: true,
            windowCollision: true,
            cssClass: 'e-be-floating-icon-tooltip',
            content: this.getTooltipContent('drag')
        });
    }
    getTooltipContent(iconType) {
        if (iconType === 'add') {
            const spenEle = document.createElement('span');
            spenEle.textContent = this.editor.l10n.getConstant('addIconTooltip');
            return spenEle;
        }
        const container = document.createElement('div');
        container.innerHTML = `
            <span>${this.editor.l10n.getConstant('dragIconTooltipActionMenu')}</span><br>
            <span>${this.editor.l10n.getConstant('dragIconTooltip')}</span>
        `;
        return container;
    }
    /**
     * Updates the tooltip content for the floating icons.
     *
     * @returns {void}
     * @hidden
     */
    updateFloatingIconTooltipContent() {
        this.addIconTooltip.content = this.getTooltipContent('add');
        this.addIconTooltip.dataBind();
        this.dragIconTooltip.content = this.getTooltipContent('drag');
        this.dragIconTooltip.dataBind();
    }
    destroy() {
        this.removeEventListeners();
        this.editor.tooltipRenderer.destroyTooltip(this.addIconTooltip);
        this.addIconTooltip = null;
        this.editor.tooltipRenderer.destroyTooltip(this.dragIconTooltip);
        this.dragIconTooltip = null;
        detach(this.floatingIconContainer);
        this.floatingIconContainer = null;
    }
}

/**
 * UploadSession entity for tracking active upload operations.
 * This is a transient entity that exists only during the upload lifecycle.
 */
/**
 * UploadSession class for managing upload state.
 */
class UploadSession {
    constructor(sessionId, blockId, file, previewUrl) {
        this.sessionId = sessionId;
        this.blockId = blockId;
        this.fileName = file.name;
        this.fileSize = file.size;
        this.progressPercent = 0;
        this.status = 'pending';
        this.previewUrl = previewUrl;
        this.errorMessage = null;
        this.startTime = Date.now();
        this.endTime = null;
        this.file = file;
    }
    updateProgress(percent) {
        this.progressPercent = Math.min(100, Math.max(0, percent));
        if (this.status === 'pending') {
            this.status = 'uploading';
        }
    }
    setTerminalState(status, errorMessage) {
        this.status = status;
        this.endTime = Date.now();
        if (status === 'completed') {
            this.progressPercent = 100;
        }
        else if (errorMessage !== undefined) {
            this.errorMessage = errorMessage;
        }
        else {
            this.errorMessage = 'Upload failed';
        }
    }
    complete() {
        this.setTerminalState('completed');
    }
    fail(errorMessage) {
        this.setTerminalState('failed', errorMessage);
    }
    cancel() {
        this.setTerminalState('cancelled', 'Upload cancelled by user');
    }
}

/**
 * ImageProgressRender manages the ProgressBar component for upload progress display.
 *
 * @hidden
 */
class ImageProgressRenderer {
    constructor(editor, imgElement) {
        this.editor = editor;
        this.imgElement = imgElement;
        this.imageContainer = imgElement.parentElement;
        this.progressBarObj = null;
        this.progressElement = null;
        this.progressContainer = null;
        this.lastUpdatePercent = 0;
        this.badgeElement = null;
        this.badgeTimeoutId = null;
        this.uniqueId = getUniqueID('progress');
        this.initialize();
    }
    initialize() {
        this.progressContainer = createElement('div', {
            id: `${this.editor.element.id}_progress-container-${this.uniqueId}`,
            className: 'e-progress-container e-hidden'
        });
        updateCSSText(this.progressContainer, 'line-height: 0;');
        // Create progress bar element with unique ID to avoid conflicts with multiple simultaneous uploads
        this.progressElement = createElement('div', {
            id: `${this.editor.element.id}_progress-bar-${this.uniqueId}`,
            className: 'e-image-progress-bar'
        });
        this.progressContainer.appendChild(this.progressElement);
        // Calculate width from image element (already in DOM)
        const targetWidth = this.imgElement.offsetWidth || this.imageContainer.offsetWidth || this.imgElement.clientWidth;
        this.progressBarObj = this.editor.progressBarRenderer.renderProgressBar({
            element: this.progressElement,
            type: 'Linear',
            height: '4px',
            value: 0,
            minimum: 0,
            maximum: 100,
            width: targetWidth.toString(),
            margin: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            animation: {
                enable: true,
                duration: 200,
                delay: 0
            },
            showProgressValue: false,
            progressThickness: 4,
            trackThickness: 4
        });
        this.imageContainer.insertBefore(this.progressContainer, this.imageContainer.firstChild);
    }
    /**
     * Shows the progress bar.
     *
     * @returns {void}
     * @hidden
     */
    show() {
        if (this.progressContainer) {
            this.progressContainer.classList.remove('e-hidden');
            this.reset();
        }
    }
    hide(callback) {
        if (this.progressContainer) {
            // Add a small delay to show 100% completion before hiding
            setTimeout(() => {
                if (this.progressContainer) {
                    this.progressContainer.classList.add('e-hidden');
                    this.reset();
                }
                // Execute callback after hiding if provided
                if (callback) {
                    callback();
                }
            }, 100);
        }
    }
    /**
     * Updates the progress bar value.
     * Uses 10% increment throttling with requestAnimationFrame for smooth updates.
     * @param {number} percent - Progress percentage
     *
     * @returns {void}
     * @hidden
     */
    updateProgress(percent) {
        const currentPercent = Math.min(100, Math.max(0, percent));
        // Update at 10% increments OR when complete
        if (currentPercent - this.lastUpdatePercent >= 10 || currentPercent === 100 || currentPercent === 0) {
            this.performUpdate(currentPercent);
            this.lastUpdatePercent = currentPercent;
        }
    }
    performUpdate(percent) {
        // Update progress bar value
        if (this.progressBarObj) {
            this.progressBarObj.value = percent;
        }
    }
    reset() {
        this.lastUpdatePercent = 0;
        if (this.progressBarObj) {
            this.progressBarObj.value = 0;
        }
    }
    /**
     * Checks if progress bar is visible.
     *
     * @returns {boolean} - returns a bool to check if progress bar is visible.
     * @hidden
     */
    isVisible() {
        return this.progressContainer ? !this.progressContainer.classList.contains('e-hidden') : false;
    }
    /**
     * Shows a success badge with tick icon at the top-right corner.
     * Badge automatically hides after 1 second.
     *
     * @returns {void}
     * @hidden
     */
    showSuccessBadge() {
        this.showBadge('success', 'e-badge-success', 'e-be-check');
    }
    /**
     * Shows an error badge with error icon at the top-right corner.
     * Badge automatically hides after 1 second.
     *
     * @returns {void}
     * @hidden
     */
    showErrorBadge() {
        this.showBadge('error', 'e-badge-danger', 'e-be-close');
    }
    showBadge(type, badgeClass, iconClass) {
        // Remove any existing badge first
        this.removeBadge();
        const badge = type === 'success' ? 'badgeSuccess' : 'badgeError';
        const ariaLable = `${this.editor.blockManager.localeJson['tabHeaderUpload']} ${this.editor.blockManager.localeJson[`${badge}`]}`;
        // Create badge container
        this.badgeElement = createElement('span', {
            className: `e-badge e-badge-circle e-icons ${iconClass} ${badgeClass}`,
            attrs: {
                'role': 'status',
                'aria-label': `${ariaLable}`
            }
        });
        // Append to image container
        this.imageContainer.appendChild(this.badgeElement);
        // Auto-remove after 1 second
        this.badgeTimeoutId = window.setTimeout(() => {
            this.removeBadge();
        }, 1000);
    }
    removeBadge() {
        // Clear timeout if exists
        if (this.badgeTimeoutId !== null) {
            clearTimeout(this.badgeTimeoutId);
            this.badgeTimeoutId = null;
        }
        // Remove badge element
        if (this.badgeElement && this.badgeElement.parentElement) {
            detach(this.badgeElement);
            this.badgeElement = null;
        }
    }
    destroy() {
        // Remove badge
        this.removeBadge();
        // Destroy progress bar
        if (this.progressBarObj) {
            this.progressBarObj.destroy();
            this.progressBarObj = null;
        }
        // Remove progress container
        if (this.progressContainer && this.progressContainer.parentElement) {
            detach(this.progressContainer);
            this.progressContainer = null;
        }
        // Clear references
        this.progressElement = null;
        this.lastUpdatePercent = 0;
    }
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * ImageUploaderRenderer manages the Tab and Uploader components for image upload workflow.
 * Combines tab navigation (Upload/Embed) with uploader functionality and embed URL validation.
 *
 * @hidden
 */
class ImageUploaderRenderer {
    constructor(editor) {
        this.editor = editor;
        this.container = null;
        this.tabObj = null;
        this.tabElement = null;
        this.uploaderObj = null;
        this.uploaderElement = null;
        this.embedContainer = null;
        this.selectedTabIndex = 0;
        this.isInitialized = false;
        this.progressRenderers = new Map();
        this.uploadSessions = new Map();
        this.fileNameToBlockId = new Map();
        this.blobUrlsToRevoke = [];
        this.addEventListeners();
    }
    addEventListeners() {
        this.editor.blockManager.observer.on('renderImageUploader', this.renderImageUploader, this);
        this.editor.blockManager.observer.on('imagePopupOpen', this.onPopupOpen, this);
        this.editor.blockManager.observer.on('imagePopupClose', this.onPopupClose, this);
        this.editor.blockManager.observer.on('imageInserted', this.handleImageInserted, this);
        this.editor.blockManager.observer.on('clearUploaderObj', this.clearUploaderObj, this);
    }
    removeEventListeners() {
        this.editor.blockManager.observer.off('renderImageUploader', this.renderImageUploader);
        this.editor.blockManager.observer.off('imagePopupOpen', this.onPopupOpen);
        this.editor.blockManager.observer.off('imagePopupClose', this.onPopupClose);
        this.editor.blockManager.observer.off('imageInserted', this.handleImageInserted);
        this.editor.blockManager.observer.off('clearUploaderObj', this.clearUploaderObj);
    }
    renderImageUploader(args) {
        if (!this.isInitialized && args.container) {
            this.container = args.container;
            this.initialize();
        }
    }
    initialize() {
        // Create tab element
        this.tabElement = createElement('div', {
            id: `${this.editor.element.id}_image-tabs`,
            className: 'e-image-tabs'
        });
        this.container.appendChild(this.tabElement);
        // Define tab items
        const tabItems = [
            {
                header: { text: this.editor.blockManager.localeJson['tabHeaderUpload'] },
                content: this.createUploadTabContent()
            },
            {
                header: { text: this.editor.blockManager.localeJson['tabHeaderEmbed'] },
                content: this.createEmbedTabContent()
            }
        ];
        // Use generic TabRenderer to create Tab component
        this.tabObj = this.editor.tabRenderer.renderTab({
            element: this.tabElement,
            items: tabItems,
            selectedItem: this.selectedTabIndex,
            cssClass: 'e-image-upload-tabs',
            selected: this.handleTabSelect.bind(this)
        });
        // Initialize uploader for upload tab
        this.initializeUploader();
        this.isInitialized = true;
    }
    createUploadTabContent() {
        return `
            <div class="e-upload-tab-content">
                <div class="e-uploader-container" id="${this.editor.element.id}_uploader-container"></div>
            </div>
        `;
    }
    createEmbedTabContent() {
        return `
            <div class="e-embed-tab-content">
                <div class="e-url-input-container">
                    <input type="text" 
                           id="${this.editor.element.id}_embed-url-input" 
                           class="e-embed-url-input e-input" 
                           placeholder="${this.editor.blockManager.localeJson['embedPlaceholder']}"
                           aria-label="${this.editor.blockManager.localeJson['imageUrl']}" />
                </div>
                <div class="e-embed-actions">
                    <button id="${this.editor.element.id}_embed-button" 
                            class="e-btn e-primary e-embed-button e-disabled"
                            type="button">
                        ${this.editor.blockManager.localeJson['embedImage']}
                    </button>
                </div>
            </div>
        `;
    }
    initializeUploader() {
        const uploaderContainer = this.tabElement.querySelector(`#${this.editor.element.id}_uploader-container`);
        // Create uploader input element
        this.uploaderElement = createElement('input', {
            id: `${this.editor.element.id}_uploader`,
            attrs: {
                type: 'File',
                name: 'UploadFiles'
            }
        });
        uploaderContainer.appendChild(this.uploaderElement);
        // Use generic UploaderRenderer to create Uploader component
        this.uploaderObj = this.editor.uploaderRenderer.renderUploader({
            element: this.uploaderElement,
            asyncSettings: {
                saveUrl: this.editor.imageBlockSettings.saveUrl
            },
            multiple: false,
            allowedExtensions: this.editor.imageBlockSettings.allowedTypes.join(','),
            maxFileSize: this.editor.imageBlockSettings.maxFileSize,
            dropArea: uploaderContainer,
            cssClass: 'e-image-uploader',
            selected: this.handleFileSelected.bind(this),
            uploading: this.handleUploading.bind(this),
            progress: this.handleProgress.bind(this),
            success: this.handleSuccess.bind(this),
            failure: this.handleFailure.bind(this),
            beforeUpload: this.handleBeforeUpload.bind(this),
            removing: undefined
        });
    }
    handleTabSelect(args) {
        this.selectedTabIndex = args.selectedIndex;
        // Initialize embed tab functionality when selected
        if (args.selectedIndex === 1 && !this.embedContainer) {
            this.initializeEmbedTab();
        }
    }
    initializeEmbedTab() {
        const embedTabContent = this.tabElement.querySelector('.e-embed-tab-content');
        this.embedContainer = embedTabContent;
        const urlInput = embedTabContent.querySelector(`#${this.editor.element.id}_embed-url-input`);
        const embedButton = embedTabContent.querySelector(`#${this.editor.element.id}_embed-button`);
        // Bind input validation
        urlInput.addEventListener('input', () => {
            urlInput.classList.remove('e-error');
            if (urlInput.value.length === 0) {
                embedButton.classList.add('e-disabled');
            }
            else {
                embedButton.classList.remove('e-disabled');
            }
        });
        // Bind Enter key on input
        urlInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.handleEmbedClick();
            }
        });
        // Bind button click
        embedButton.addEventListener('click', () => {
            this.handleEmbedClick();
        });
    }
    // Handles embed button click (validates URL and embeds image).
    handleEmbedClick() {
        const urlInput = this.tabElement.querySelector(`#${this.editor.element.id}_embed-url-input`);
        const url = urlInput.value.trim();
        // Validate URL format
        const validationResult = this.validateImageUrl(url);
        if (!validationResult.valid) {
            this.showEmbedError(urlInput);
            return;
        }
        // Notify ImageRenderer to embed the image
        this.editor.blockManager.observer.notify('imageEmbedded', {
            url: validationResult.url
        });
        // Clear input and hide error
        urlInput.value = '';
    }
    // Validates an image URL.
    validateImageUrl(urlString) {
        // Block dangerous protocols (XSS prevention)
        const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:', 'about:'];
        const lowerUrl = urlString.toLowerCase();
        for (const protocol of dangerousProtocols) {
            if (lowerUrl.startsWith(protocol)) {
                return { valid: false, error: 'Dangerous protocol detected' };
            }
        }
        // Only allow HTTP/HTTPS
        if (!lowerUrl.startsWith('http://') && !lowerUrl.startsWith('https://')) {
            return { valid: false, error: 'Only HTTP/HTTPS protocols are allowed' };
        }
        // Parse URL to validate structure
        let parsedUrl;
        try {
            parsedUrl = new URL(urlString);
        }
        catch (e) {
            return { valid: false, error: 'Invalid URL format' };
        }
        // Block internal network access (SSRF prevention)
        const hostname = parsedUrl.hostname.toLowerCase();
        const blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];
        if (blockedHosts.indexOf(hostname) !== -1 ||
            hostname.indexOf('192.168.') === 0 ||
            hostname.indexOf('10.') === 0 ||
            hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)) {
            return { valid: false, error: 'Internal network URLs are not allowed' };
        }
        return { valid: true, url: parsedUrl.href }; // Normalized URL
    }
    // Shows an error style over input.
    showEmbedError(input) {
        input.classList.add('e-error');
        input.focus();
    }
    // Handles imageInserted event - unified handler for both pasted and uploader-selected images.
    // This fires for ALL image insertions regardless of source (paste, uploader, etc).
    handleImageInserted(evt) {
        if (!evt || !evt.blockId || !evt.imgElement) {
            return;
        }
        const blockId = evt.blockId;
        const imgElement = evt.imgElement;
        // Check if there's an existing session (from uploader selection)
        const existingSession = this.uploadSessions.get(blockId);
        if (existingSession) {
            // This image came from uploader selection (handleFileSelected)
            // Session already created, just need to show progress bar if saveUrl configured
            const hasSaveUrl = !isNullOrUndefined(this.editor.imageBlockSettings.saveUrl) &&
                this.editor.imageBlockSettings.saveUrl.trim() !== '';
            if (hasSaveUrl && !this.progressRenderers.has(blockId)) {
                // Create progress bar for uploader-selected image
                const progressRenderer = new ImageProgressRenderer(this.editor, imgElement);
                this.progressRenderers.set(blockId, progressRenderer);
                progressRenderer.show();
            }
        }
        else {
            // This image was pasted (no existing session)
            // Check if saveUrl is configured and if image needs upload
            const hasSaveUrl = !isNullOrUndefined(this.editor.imageBlockSettings.saveUrl) &&
                this.editor.imageBlockSettings.saveUrl.trim() !== '';
            if (!hasSaveUrl) {
                return; // No server upload configured
            }
            // Trigger upload for pasted image
            this.uploadPastedImage(imgElement, blockId);
        }
    }
    uploadPastedImage(imgElement, blockId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // If src is already a hosted URL (http/https), skip upload
                if (imgElement.src.startsWith('http://') || imgElement.src.startsWith('https://')) {
                    return;
                }
                // Convert base64/blob to File object
                const file = yield this.convertImageToFile(imgElement.src, blockId);
                if (!file) {
                    return;
                }
                // Create upload session and store in map
                const sessionId = getUniqueID('upload-session');
                const session = new UploadSession(sessionId, blockId, file, imgElement.src);
                this.uploadSessions.set(blockId, session);
                this.fileNameToBlockId.set(file.name, blockId);
                // Show progress bar immediately
                const progressRenderer = new ImageProgressRenderer(this.editor, imgElement);
                this.progressRenderers.set(blockId, progressRenderer);
                progressRenderer.show();
                const fileInfo = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    statusCode: '1',
                    status: 'Ready to upload',
                    rawFile: file,
                    validationMessages: { minSize: '', maxSize: '' }
                };
                this.uploaderObj.upload([fileInfo], true);
            }
            catch (error) {
                console.error('Failed to upload pasted image:', error);
            }
        });
    }
    convertImageToFile(src, blockId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blob;
                if (src.startsWith('data:image/')) {
                    const response = yield fetch(src);
                    blob = yield response.blob();
                }
                else if (src.startsWith('blob:')) {
                    const response = yield fetch(src);
                    blob = yield response.blob();
                }
                else {
                    return null;
                }
                // Generate filename based on blob type and blockId
                const extension = blob.type.split('/')[1] || 'png';
                const filename = `pasted-image-${blockId}.${extension}`;
                // Convert Blob to File
                const file = new File([blob], filename, { type: blob.type });
                return file;
            }
            catch (error) {
                console.error('Error converting image to file:', error);
                return null;
            }
        });
    }
    handleFileSelected(args) {
        if (!args.filesData || args.filesData.length === 0) {
            return;
        }
        const fileData = args.filesData[0];
        const file = fileData.rawFile;
        const blockId = this.getPlaceholderBlockId();
        if (!blockId || fileData.statusCode === '0') {
            return;
        }
        // Create upload session immediately (synchronous) and store in map
        const sessionId = getUniqueID('upload-session');
        const session = new UploadSession(sessionId, blockId, file, null);
        this.uploadSessions.set(blockId, session);
        this.fileNameToBlockId.set(file.name, blockId);
        this.AddImagePreview(file, blockId);
    }
    getPlaceholderBlockId() {
        const placeholder = this.editor.blockManager.blockRenderer.imageRenderer.getCurrentPlaceholder();
        if (placeholder) {
            return placeholder.getAttribute('data-block-id');
        }
        return null;
    }
    AddImagePreview(file, blockId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate preview URL based on saveFormat
            const previewUrl = yield this.getPreviewUrl(file);
            // Update session with preview URL
            const session = this.uploadSessions.get(blockId);
            if (session) {
                session.previewUrl = previewUrl;
            }
            // Trigger internal event
            this.editor.blockManager.observer.notify('fileSelected', {
                file: {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    rawFile: file
                },
                previewUrl: previewUrl,
                blockId: blockId
            });
        });
    }
    getPreviewUrl(file) {
        const saveFormat = (this.editor.imageBlockSettings.saveFormat || 'Base64').toString().toLowerCase();
        // If host requests blob previews, always use blob URL (fast and low-memory)
        if (saveFormat === 'blob') {
            const blobUrl = URL.createObjectURL(file);
            this.blobUrlsToRevoke.push(blobUrl);
            return Promise.resolve(blobUrl);
        }
        else {
            return this.encodeImageAsBase64(file);
        }
    }
    encodeImageAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = () => {
                reject(new Error('Failed to read image as base64.'));
            };
            reader.readAsDataURL(file);
        });
    }
    handleBeforeUpload(args) {
        const beforeArgs = Object.assign({}, args);
        this.editor.trigger('beforeFileUpload', beforeArgs);
        args.cancel = beforeArgs.cancel;
    }
    handleUploading(args) {
        const blockId = this.fileNameToBlockId.get(args.fileData.name) || '';
        const progressRenderer = this.progressRenderers.get(blockId);
        // Upload started - initialize progress at 0%
        if (progressRenderer) {
            progressRenderer.updateProgress(0);
        }
        const uploadingArgs = Object.assign({}, args);
        this.editor.trigger('fileUploading', uploadingArgs);
        args.cancel = uploadingArgs.cancel;
    }
    handleProgress(args) {
        // Calculate progress percentage from loaded/total bytes
        const e = args.e;
        if (e && e.lengthComputable) {
            const progressPercent = Math.round((e.loaded / e.total) * 100);
            // Get blockId from filename lookup
            const fileName = args.file ? args.file.name : '';
            const blockId = this.fileNameToBlockId.get(fileName) || '';
            const progressRenderer = this.progressRenderers.get(blockId);
            // Update session progress
            const session = this.uploadSessions.get(blockId);
            if (session) {
                session.updateProgress(progressPercent);
            }
            // Update progress bar for this specific upload
            if (progressRenderer) {
                progressRenderer.updateProgress(progressPercent);
            }
        }
    }
    handleSuccess(args) {
        const fileName = args.file ? args.file.name : '';
        const blockId = this.fileNameToBlockId.get(fileName) || '';
        const progressRenderer = this.progressRenderers.get(blockId);
        // Ensure progress reaches 100% before hiding
        if (progressRenderer) {
            progressRenderer.updateProgress(100);
        }
        const session = this.uploadSessions.get(blockId);
        if (session) {
            session.complete();
        }
        // Parse server response
        let serverResponse = {};
        if (args.e && typeof args.e === 'object') {
            const eventObj = args.e;
            if (eventObj.target && eventObj.target.response) {
                try {
                    const parsed = JSON.parse(eventObj.target.response);
                    serverResponse = typeof parsed === 'object' ? parsed : { message: parsed };
                }
                catch (e) {
                    serverResponse = { message: eventObj.target.response };
                }
            }
        }
        // Construct final image URL based on path setting
        let finalImageUrl = '';
        const path = this.editor.imageBlockSettings.path;
        if (path && path.trim() !== '') {
            const uploadFileName = session ? session.file.name : (serverResponse.fileName || '');
            const normalizedPath = path.endsWith('/') ? path : path + '/';
            const normalizedFileName = uploadFileName.startsWith('/') ? uploadFileName.substring(1) : uploadFileName;
            finalImageUrl = normalizedPath + normalizedFileName;
        }
        else {
            finalImageUrl = serverResponse.url || (session ? session.previewUrl : '') || '';
        }
        serverResponse.url = finalImageUrl;
        const successArgs = Object.assign({}, args, { fileUrl: finalImageUrl });
        this.editor.trigger('fileUploadSuccess', successArgs);
        this.editor.blockManager.observer.notify('fileUploadSuccess', Object.assign({}, successArgs, { blockId: blockId }));
        // Clean up Blob URLs
        this.revokeBlobUrls();
        // Hide progress bar, show success badge, cleanup
        if (progressRenderer) {
            progressRenderer.hide(() => {
                progressRenderer.showSuccessBadge();
                setTimeout(() => {
                    progressRenderer.destroy();
                    this.progressRenderers.delete(blockId);
                }, 1000);
            });
        }
        // Clean up session and filename mapping
        this.uploadSessions.delete(blockId);
        this.fileNameToBlockId.delete(fileName);
    }
    handleFailure(args) {
        const fileName = args.file ? args.file.name : '';
        const blockId = this.fileNameToBlockId.get(fileName);
        const progressRenderer = this.progressRenderers.get(blockId);
        let errorMessage = 'Upload failed';
        if (args.statusText) {
            errorMessage = args.statusText;
        }
        else if (args.e && typeof args.e === 'object') {
            const eventObj = args.e;
            if (eventObj.target && eventObj.target.statusText) {
                errorMessage = eventObj.target.statusText;
            }
        }
        const session = this.uploadSessions.get(blockId);
        if (session) {
            session.fail(errorMessage);
        }
        const failedArgs = Object.assign({}, args);
        this.editor.blockManager.observer.notify('fileUploadFailed', failedArgs);
        this.editor.trigger('fileUploadFailed', failedArgs);
        // Hide progress bar, show error badge, cleanup
        if (progressRenderer) {
            progressRenderer.hide(() => {
                progressRenderer.showErrorBadge();
                setTimeout(() => {
                    progressRenderer.destroy();
                    this.progressRenderers.delete(blockId);
                }, 1000);
            });
        }
        this.uploadSessions.delete(blockId);
        this.fileNameToBlockId.delete(fileName);
    }
    revokeBlobUrls() {
        this.blobUrlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
        this.blobUrlsToRevoke = [];
    }
    clearUploaderObj() {
        if (this.uploaderObj) {
            this.uploaderObj.clearAll();
        }
    }
    onPopupOpen() {
        if (this.tabObj) {
            this.tabObj.select(0);
        }
        const uploaderContainer = this.tabElement.querySelector(`#${this.editor.element.id}_uploader-container`);
        const browseButton = uploaderContainer.querySelector('.e-upload .e-file-select-wrap > button');
        browseButton.focus();
    }
    onPopupClose() {
        if (this.tabObj) {
            this.tabObj.select(0);
        }
        // Clear embed input if any
        if (this.tabElement) {
            const urlInput = this.tabElement.querySelector(`#${this.editor.element.id}_embed-url-input`);
            if (urlInput) {
                urlInput.value = '';
            }
        }
    }
    refresh() {
        if (this.uploaderObj) {
            this.uploaderObj.clearAll();
        }
    }
    destroy() {
        // Remove event listeners
        this.removeEventListeners();
        // Revoke Blob URLs
        this.revokeBlobUrls();
        // Destroy all progress renderer instances
        this.progressRenderers.forEach((renderer) => {
            renderer.destroy();
        });
        this.progressRenderers.clear();
        // Destroy uploader
        if (this.uploaderObj) {
            this.uploaderObj.destroy();
            this.uploaderObj = null;
        }
        // Remove uploader element
        if (this.uploaderElement && this.uploaderElement.parentElement) {
            detach(this.uploaderElement);
            this.uploaderElement = null;
        }
        // Destroy tab component
        if (this.tabObj) {
            this.tabObj.destroy();
            this.tabObj = null;
        }
        // Remove tab element
        if (this.tabElement && this.tabElement.parentElement) {
            detach(this.tabElement);
            this.tabElement = null;
        }
        // Clear all references
        this.embedContainer = null;
        this.container = null;
        this.uploadSessions.clear();
        this.fileNameToBlockId.clear();
        this.isInitialized = false;
    }
}

/**
 * Manages all event handlers for the BlockEditor component
 * This class centralizes event handling logic and provides a clean interface
 * for wiring and unwiring events across the editor
 */
class EventManager {
    /**
     * Creates a new EventHandlerManager instance
     *
     * @param {BlockEditor} editor The parent BlockEditor instance
     */
    constructor(editor) {
        this.editor = editor;
    }
    /**
     * Wires up all global event handlers for the editor
     *
     * @returns {void}
     * @hidden
     */
    wireGlobalEvents() {
        // Document events
        EventHandler.add(document, 'selectionchange', this.handleEditorSelection, this);
        EventHandler.add(document, 'mousedown', this.handleDocumentClickActions, this);
        EventHandler.add(document, 'mousemove', this.handleMouseMoveActions, this);
        EventHandler.add(window, 'resize', this.onResizeHandler, this);
        // Editor events
        EventHandler.add(this.editor.element, 'mouseup', this.handleMouseUpActions, this);
        EventHandler.add(this.editor.element, 'mousedown', this.handleMouseDownActions, this);
        EventHandler.add(this.editor.element, 'input', this.handleEditorInputActions, this);
        EventHandler.add(this.editor.element, 'keydown', this.handleKeydownActions, this);
        EventHandler.add(this.editor.element, 'click', this.handleEditorClickActions, this);
        EventHandler.add(this.editor.element, 'copy', this.clipboardActionHandler, this);
        EventHandler.add(this.editor.element, 'cut', this.clipboardActionHandler, this);
        EventHandler.add(this.editor.element, 'paste', this.clipboardActionHandler, this);
        EventHandler.add(this.editor.blockContainer, 'focus', this.handleEditorFocusActions, this);
        EventHandler.add(this.editor.blockContainer, 'blur', this.handleEditorBlurActions, this);
        this.editor.on(events.destroy, this.destroy, this);
    }
    /**
     * Unwires all global event handlers for the editor
     *
     * @returns {void}
     * @hidden
     */
    unWireGlobalEvents() {
        // Document events
        EventHandler.remove(document, 'selectionchange', this.handleEditorSelection);
        EventHandler.remove(document, 'mousedown', this.handleDocumentClickActions);
        EventHandler.remove(document, 'mousemove', this.handleMouseMoveActions);
        EventHandler.remove(window, 'resize', this.onResizeHandler);
        // Editor events
        EventHandler.remove(this.editor.element, 'mouseup', this.handleMouseUpActions);
        EventHandler.remove(this.editor.element, 'mousedown', this.handleMouseDownActions);
        EventHandler.remove(this.editor.element, 'input', this.handleEditorInputActions);
        EventHandler.remove(this.editor.element, 'keydown', this.handleKeydownActions);
        EventHandler.remove(this.editor.element, 'click', this.handleEditorClickActions);
        EventHandler.remove(this.editor.element, 'copy', this.clipboardActionHandler);
        EventHandler.remove(this.editor.element, 'cut', this.clipboardActionHandler);
        EventHandler.remove(this.editor.element, 'paste', this.clipboardActionHandler);
        EventHandler.remove(this.editor.blockContainer, 'focus', this.handleEditorFocusActions);
        EventHandler.remove(this.editor.blockContainer, 'blur', this.handleEditorBlurActions);
        this.editor.off(events.destroy, this.destroy);
    }
    /**
     * Triggers the block change event in the editor with required args
     *
     * @param {BlockChangedEventArgs} args - The event args
     * @returns {void}
     * @hidden
     */
    triggerBlockChangeEvent(args) {
        this.editor.trigger('blockChanged', args);
    }
    handleEditorSelection() {
        this.editor.intermediate.processActions('selectionchange');
    }
    handleMouseMoveActions(moveEvent) {
        this.editor.intermediate.processActions('mousemove', moveEvent);
    }
    handleEditorInputActions(inputEvent) {
        this.editor.intermediate.processActions('input', inputEvent);
    }
    handleDocumentClickActions(clickEvent) {
        this.editor.intermediate.processActions('documentClick', clickEvent);
    }
    handleEditorClickActions(clickEvent) {
        this.editor.intermediate.processActions('editorClick', clickEvent);
    }
    handleEditorFocusActions(focusEvent) {
        setTimeout(() => {
            const range = getSelectedRange();
            if (!range || !this.editor.blockManager.currentFocusedBlock) {
                return;
            }
            this.editor.trigger('focus', {
                event: focusEvent,
                blockId: this.editor.blockManager.currentFocusedBlock.id,
                selectionRange: [range.startOffset, range.endOffset]
            });
        }, 200);
    }
    handleEditorBlurActions(blurEvent) {
        const inlineTbarPopup = document.querySelector('#' + this.editor.element.id + INLINE_TBAR_POPUP_ID);
        const contextMenuPopup = document.querySelector('#' + this.editor.element.id + BLOCKEDITOR_CONTEXTMENU_ID);
        const shouldPreventBlurAction = (inlineTbarPopup && inlineTbarPopup.contains(blurEvent.relatedTarget))
            || (contextMenuPopup && contextMenuPopup.contains(blurEvent.relatedTarget));
        const block = this.editor.blockManager.currentFocusedBlock;
        if (!shouldPreventBlurAction) {
            this.editor.trigger('blur', {
                event: blurEvent,
                blockId: block ? block.id : ''
            });
        }
    }
    handleKeydownActions(keyEvent) {
        this.editor.intermediate.processActions('keydown', keyEvent);
    }
    handleMouseUpActions(mouseEvent) {
        this.editor.intermediate.processActions('mouseup', mouseEvent);
    }
    handleMouseDownActions(mouseEvent) {
        this.editor.intermediate.processActions('mousedown', mouseEvent);
    }
    clipboardActionHandler(e) {
        this.editor.intermediate.processActions('clipboardAction', e);
    }
    onResizeHandler() {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            this.editor.intermediate.processActions('resize');
        }, 10);
    }
    destroy() {
        this.unWireGlobalEvents();
        if (!isNullOrUndefined(this.resizeTimer)) {
            clearInterval(this.resizeTimer);
            this.resizeTimer = null;
        }
    }
}

class Intermediate {
    constructor(editor) {
        this.editor = editor;
        this.wireGlobalEvents();
    }
    /**
     * Wires up all global event handlers
     *
     * @returns {void}
     * @hidden
     */
    wireGlobalEvents() {
        this.editor.blockManager.observer.on('updateEditorBlocks', this.handleModelChanges, this);
        this.editor.blockManager.observer.on('selectionChanged', this.handleSelectionChange, this);
        this.editor.blockManager.observer.on('beforePaste', this.triggerBeforePaste, this);
        this.editor.blockManager.observer.on('afterPaste', this.triggerAfterPaste, this);
        this.editor.blockManager.observer.on('blockActionsMenuClose', this.triggerBlockActionsMenuCloseEvent, this);
        this.editor.blockManager.observer.on('blockActionsMenuOpen', this.triggerBlockActionsMenuOpenEvent, this);
        this.editor.blockManager.observer.on('blockDragging', this.triggerBlockDrag, this);
        this.editor.blockManager.observer.on('blockDragStart', this.triggerBlockStart, this);
        this.editor.blockManager.observer.on('blockDropped', this.triggerBlockDrop, this);
        this.editor.blockManager.observer.on('triggerBlockChange', this.triggerBlockChangeEvent, this);
        this.editor.blockManager.observer.on('renderTemplateBlock', this.editor.renderTemplate, this.editor);
        this.editor.blockManager.observer.on('renderDropdownList', this.renderDropdownList, this);
        this.editor.on(events.destroy, this.destroy, this);
    }
    /**
     * Unwires all global event handlers
     *
     * @returns {void}
     * @hidden
     */
    unWireGlobalEvents() {
        this.editor.blockManager.observer.off('updateEditorBlocks', this.handleModelChanges);
        this.editor.blockManager.observer.off('selectionChanged', this.handleSelectionChange);
        this.editor.blockManager.observer.off('beforePaste', this.triggerBeforePaste);
        this.editor.blockManager.observer.off('afterPaste', this.triggerAfterPaste);
        this.editor.blockManager.observer.off('blockActionsMenuClose', this.triggerBlockActionsMenuCloseEvent);
        this.editor.blockManager.observer.off('blockActionsMenuOpen', this.triggerBlockActionsMenuOpenEvent);
        this.editor.blockManager.observer.off('blockDragging', this.triggerBlockDrag);
        this.editor.blockManager.observer.off('blockDragStart', this.triggerBlockStart);
        this.editor.blockManager.observer.off('blockDropped', this.triggerBlockDrop);
        this.editor.blockManager.observer.off('triggerBlockChange', this.triggerBlockChangeEvent);
        this.editor.blockManager.observer.off('renderTemplateBlock', this.editor.renderTemplate);
        this.editor.blockManager.observer.off('renderDropdownList', this.renderDropdownList);
        this.editor.off(events.destroy, this.destroy);
    }
    /**
     * Processes the event actions in block manager which originates from blockeditor
     *
     * @param {string} action - The event action
     * @param {any} args - args required for action if any.
     * @returns {void}
     * @hidden
     */
    processActions(action, args) {
        this.editor.blockManager.observer.notify(action, args);
    }
    handleModelChanges(state) {
        this.editor.setProperties({ blocks: state.blocks }, true);
    }
    handleSelectionChange(args) {
        this.editor.trigger('selectionChanged', args);
    }
    triggerBeforePaste(args) {
        const eventArgs = {
            cancel: args.cancel,
            content: args.content
        };
        this.editor.trigger('beforePaste', eventArgs);
        args.callback(eventArgs);
    }
    triggerAfterPaste(args) {
        this.editor.trigger('afterPaste', args);
    }
    triggerBlockDrag(args) {
        this.editor.trigger('blockDragging', args);
    }
    triggerBlockStart(args) {
        this.editor.trigger('blockDragStart', args);
    }
    triggerBlockDrop(args) {
        this.editor.trigger('blockDropped', args);
    }
    triggerBlockChangeEvent(changes) {
        const validChanges = changes
            .filter((_, index) => Number.isInteger(index) && changes[index] !== undefined)
            .map((change) => {
            const clonedData = cloneObject(change.data, ['targetId', 'isAfter', 'isMovingUp']);
            if (!isNullOrUndefined(change.data.currentParent)) {
                clonedData.currentParent = change.data.currentParent;
            }
            if (!isNullOrUndefined(change.data.prevParent)) {
                clonedData.prevParent = change.data.prevParent;
            }
            return {
                action: change.action,
                data: clonedData
            };
        });
        const blockChangeEventArgs = { changes: validChanges };
        this.editor.eventManager.triggerBlockChangeEvent(blockChangeEventArgs);
        this.editor.blockManager.observer.notify(CLEAREVENTCHANGES);
    }
    triggerBlockActionsMenuCloseEvent(args) {
        const eventArgs = {
            event: args.event,
            items: args.items,
            cancel: args.cancel
        };
        if (this.editor.blockActionMenuSettings.beforeClose) {
            this.editor.blockActionMenuSettings.beforeClose.call(this, eventArgs);
        }
        args.callback(eventArgs);
    }
    triggerBlockActionsMenuOpenEvent(args) {
        const eventArgs = {
            event: args.event,
            items: args.items,
            cancel: args.cancel
        };
        if (this.editor.blockActionMenuSettings.beforeOpen) {
            this.editor.blockActionMenuSettings.beforeOpen.call(this, eventArgs);
        }
        args.callback(eventArgs);
    }
    renderDropdownList(args) {
        this.editor.dropdownListRenderer.renderDropDownList(args);
    }
    destroy() {
        this.unWireGlobalEvents();
    }
}

/**
 * Specifies the type of deletion to be performed.
 *
 */
var DeletionType;
(function (DeletionType) {
    DeletionType["Partial"] = "partial";
    DeletionType["Entire"] = "entire";
})(DeletionType || (DeletionType = {}));

/**
 * Manages all block-related commands in the BlockEditor
 */
class BlockCommand {
    /**
     * Creates a new BlockCommandManager instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    constructor(manager) {
        this.parent = manager;
        this.addEventListener();
    }
    addEventListener() {
        this.parent.observer.on(ADDBLOCK, this.addBlock, this);
        this.parent.observer.on(DELETEBLOCK, this.deleteBlock, this);
        this.parent.observer.on(DELETEATCURSOR, this.deleteBlockAtCursor, this);
        this.parent.observer.on(SPLITBLOCK, this.splitBlock, this);
        this.parent.observer.on(MOVEBLOCK, this.moveBlock, this);
        this.parent.observer.on(DUPLICATEBLOCK, this.duplicateBlock, this);
        this.parent.observer.on(INDENTBLOCK, this.handleBlockIndentation, this);
        this.parent.observer.on(DELETE_NON_MERGABLEBLOCK, this.deleteNonMergableBlock, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListener() {
        this.parent.observer.off(ADDBLOCK, this.addBlock);
        this.parent.observer.off(DELETEBLOCK, this.deleteBlock);
        this.parent.observer.off(DELETEATCURSOR, this.deleteBlockAtCursor);
        this.parent.observer.off(SPLITBLOCK, this.splitBlock);
        this.parent.observer.off(MOVEBLOCK, this.moveBlock);
        this.parent.observer.off(DUPLICATEBLOCK, this.duplicateBlock);
        this.parent.observer.off(INDENTBLOCK, this.handleBlockIndentation);
        this.parent.observer.off(DELETE_NON_MERGABLEBLOCK, this.deleteNonMergableBlock);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    /**
     * Adds a new block to the editor
     *
     * @param {IAddBlockInteraction} args Options for adding new block
     * @returns {BlockModel} The newly created block model
     * @hidden
     */
    addBlock(args) {
        const { isAfter = true } = args;
        this.populateTargetModelAndId(args);
        /* Process Model */
        const addedBlock = this.parent.blockService.addBlock({
            block: this.prepareBlock(args),
            targetBlockId: args.targetBlockId,
            isAfter: isAfter
        });
        this.parent.stateManager.updateManagerBlocks();
        this.parent.undoRedoAction.trackBlockAdditionForUndoRedo(args, addedBlock);
        this.parent.observer.notify('modelChanged', {
            type: 'AddBlock',
            state: Object.assign({}, args, { isAfter: isAfter, addedBlock })
        });
        return addedBlock;
    }
    /**
     * Deletes a block from the editor
     *
     * @param {IDeleteBlockInteraction} args Options for the deletion
     * @returns {void}
     * @hidden
     */
    deleteBlock(args) {
        if (!args.blockElement) {
            return;
        }
        const { removedBlock, blockIndex } = this.parent.blockService.removeBlock({ blockId: args.blockElement.id });
        this.parent.stateManager.updateManagerBlocks();
        if (!removedBlock) {
            return;
        }
        this.parent.undoRedoAction.trackBlockRemovalForUndoRedo(args, args.blockElement.id, removedBlock, blockIndex);
        this.parent.observer.notify('modelChanged', {
            type: 'DeleteBlock',
            state: Object.assign({}, args, { removedBlock,
                blockIndex })
        });
        if (!args.preventMinimumOne) {
            this.parent.blockCommand.createDefaultEmptyBlock(true);
        }
    }
    /**
     * Splits the current block at cursor position and creates a new block
     *
     * @param {IAddBlockInteraction} args - Options to split the block
     * @returns {void}
     * @hidden
     */
    splitBlock(args) {
        let newBlockContents = [];
        const blockElement = this.parent.currentFocusedBlock;
        const range = this.parent.nodeSelection.getRange();
        const blockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        const blockBeforeSplit = decoupleReference(blockModel);
        const currBlockType = blockModel.blockType;
        const contentElement = getBlockContentElement(blockElement);
        const firstNode = contentElement.childNodes[0];
        const isCursorAtStartNode = firstNode
            ? (firstNode.contains(range.startContainer) || firstNode === range.startContainer)
            : (contentElement === range.startContainer);
        const splitOffset = range.startOffset;
        const isSplitAtStart = splitOffset === 0 && isCursorAtStartNode;
        if (!isSplitAtStart) {
            /* Get split fragment for new block */
            const { afterFragment } = this.parent.nodeCutter.splitContent(getBlockContentElement(blockElement), range.startContainer, range.startOffset);
            /* Split node at cursor and remove everything after the split point */
            this.parent.nodeCutter.getSpliceNode(range, range.startContainer);
            removeNodesAfterSplit(range.startContainer, contentElement);
            const currBlockContents = convertInlineElementsToContentModels(contentElement, true);
            newBlockContents = this.getContentModelForFragment(afterFragment);
            this.parent.blockService.updateContent(blockModel.id, currBlockContents.length > 0 ? currBlockContents : [BlockFactory.createTextContent()]);
            // Trigger content change for event tracking alone, no dom renders
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: blockModel, oldBlock: blockBeforeSplit }],
                    preventEventTrigger: true,
                    excludeDomUpdate: true
                } });
        }
        this.addBlock({
            blockType: isListTypeBlock(currBlockType) ? currBlockType : BlockType.Paragraph,
            isAfter: isSplitAtStart ? false : true,
            targetBlock: this.parent.getBlockElementById(blockElement.id),
            contentModel: newBlockContents,
            splitOffset: splitOffset,
            isSplitting: !isSplitAtStart,
            blockBeforeSplit,
            preventEventTrigger: args ? args.preventEventTrigger : false
        });
        this.parent.stateManager.updateManagerBlocks();
    }
    /**
     * Deletes block at cursor
     *
     * @param {IDeleteBlockInteraction} args Optional additional arguments
     * @returns {void}
     * @hidden
     */
    deleteBlockAtCursor(args) {
        const { blockElement, mergeDirection } = args;
        if (!blockElement) {
            return;
        }
        const editorBlocks = this.parent.getEditorBlocks();
        if (blockElement.getAttribute('data-block-type').startsWith('Collapsible')) {
            this.transformToggleBlocksAsRegular(blockElement);
            return;
        }
        const getAdjacentBlock = (element, direction) => {
            return (direction === 'previous' ? element.previousElementSibling : element.nextElementSibling);
        };
        const adjacentBlock = getAdjacentBlock(blockElement, mergeDirection);
        if (!adjacentBlock) {
            return;
        }
        /*
        sourceBlock - the block that will be deleted after merging its content with the targetBlock
        targetBlock - the block that will remain after merging
        */
        const sourceBlock = mergeDirection === 'previous' ? blockElement : adjacentBlock;
        const targetBlock = mergeDirection === 'previous' ? adjacentBlock : blockElement;
        const sourceBlockModel = getBlockModelById(sourceBlock.id, editorBlocks);
        const targetBlockModel = getBlockModelById(targetBlock.id, editorBlocks);
        const sourceContent = getBlockContentElement(sourceBlock);
        const targetContent = getBlockContentElement(targetBlock);
        const newCursorPos = targetContent.textContent.length;
        const blocksBeforeDelete = [decoupleReference(targetBlockModel), decoupleReference(sourceBlockModel)];
        // Source block is trying to merge into an empty block
        if (targetContent.textContent.trim().length === 0) {
            /* At this point, do not merge Source into Target.
            Instead, simply delete the Empty Target. This approach requires Zero Re-rendering */
            this.deleteBlock(Object.assign({}, args, { blockElement: targetBlock, isSplitting: false, isTargetDeletion: true }));
            // Update the source model
            const newContents = convertInlineElementsToContentModels(sourceContent, true);
            this.parent.blockService.updateContent(sourceBlockModel.id, newContents);
            this.parent.setFocusAndUIForNewBlock(sourceBlock);
            return;
        }
        /* (Fallback to your standard merge logic for non-empty blocks) */
        const targetFragment = document.createDocumentFragment();
        while (sourceContent.firstChild) {
            targetFragment.appendChild(sourceContent.firstChild);
        }
        targetContent.appendChild(targetFragment);
        targetContent.normalize();
        const newContents = convertInlineElementsToContentModels(targetContent, true);
        this.parent.blockService.updateContent(targetBlockModel.id, newContents);
        this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                data: [{ block: targetBlockModel, oldBlock: blocksBeforeDelete[0] }],
                preventEventTrigger: true,
                preventChangesTracking: args.preventChangesTracking,
                excludeDomUpdate: true
            } });
        this.parent.setFocusToBlock(targetBlock);
        setCursorPosition(targetContent, newCursorPos);
        this.parent.togglePlaceholder(targetBlock, true);
        this.parent.floatingIconAction.showFloatingIcons(targetBlock);
        /* Delete source block */
        this.deleteBlock(Object.assign({}, args, { blockElement: sourceBlock, isSplitting: true, blocksAfterSplit: blocksBeforeDelete, blockBeforeSplit: targetBlockModel, targetBlockModel: targetBlockModel }));
        if (isListTypeBlock(sourceBlockModel.blockType) || isListTypeBlock(targetBlockModel.blockType)) {
            this.parent.listPlugin.recalculateMarkersForListItems();
        }
    }
    /**
     * Deletes non mergable block
     *
     * @param {IDeleteBlockInteraction} args Optional additional arguments
     * @returns {void}
     * @hidden
     */
    deleteNonMergableBlock(args) {
        const { array, containerType } = getContainerInfo(args.blockElement.id, this.parent.getEditorBlocks());
        if ((containerType === 'cell' || containerType === 'children') && (array && array.length === 1)) {
            this.transformBlock({
                block: getBlockModelById(args.blockElement.id, this.parent.getEditorBlocks()),
                blockElement: args.blockElement,
                newBlockType: BlockType.Paragraph
            });
            return;
        }
        else {
            const adjacentBlockElement = getAdjacentBlock(args.blockElement, 'next')
                || getAdjacentBlock(args.blockElement, 'previous');
            this.deleteBlock(Object.assign({}, args, { blockElement: args.blockElement }));
            /* When there is only single block in editor, on deletion of it, we should create a default empty paragraph */
            if (!isNullOrUndefined(adjacentBlockElement)) {
                this.parent.setFocusAndUIForNewBlock(adjacentBlockElement);
            }
            return;
        }
    }
    /**
     * Handles Clipboard paste of bulk blocks in to the editor
     *
     * @param {IAddBulkBlocksInteraction} args Options for the bulk block addition
     * @returns {void}
     * @hidden
     */
    addBulkBlocks(args) {
        const { blocks, targetBlockId, insertionType } = args;
        if (blocks.length === 0) {
            this.parent.undoRedoAction.trackClipboardPasteForUndoRedo(args);
            return;
        }
        let insertedBlock;
        for (let i = 0; i < blocks.length; i++) {
            insertedBlock = this.addBlock({
                block: blocks[i],
                targetBlock: this.parent.getBlockElementById(i === 0 ? targetBlockId : insertedBlock.id),
                isUndoRedoAction: true,
                preventEventTrigger: true,
                preventUpdateAction: true,
                forceIgnoreTargetUpdate: true
            });
        }
        this.parent.listPlugin.recalculateMarkersForListItems();
        this.parent.setCursorAfterBulkBlockAddition(insertionType);
        this.parent.undoRedoAction.trackClipboardPasteForUndoRedo(args);
    }
    /**
     * Duplicates a block and inserts it above or below the original
     *
     * @param {Object} args The options to duplicate
     * @param {HTMLElement} args.blockElement The block element to duplicate
     * @param {'below'|'above'} args.direction Direction to insert the duplicated block
     * @returns {void}
     * @hidden
     */
    duplicateBlock(args) {
        if (!args.blockElement) {
            return;
        }
        const duplicatedBlock = this.parent.blockService.duplicateBlock({ blockId: args.blockElement.id });
        this.parent.stateManager.updateManagerBlocks();
        if (duplicatedBlock) {
            this.addBlock({
                block: duplicatedBlock,
                targetBlockId: args.blockElement.id,
                isAfter: args.direction === 'below',
                forceIgnoreTargetUpdate: true
            });
        }
    }
    /**
     * Handles the indentation of blocks
     *
     * @param {IIndentOperation} args - The arguments for indenting blocks
     * @returns {void}
     * @hidden
     */
    handleBlockIndentation(args) {
        const { blockIDs, shouldDecrease } = args;
        blockIDs.forEach((blockId) => {
            const oldBlock = decoupleReference(getBlockModelById(blockId, this.parent.getEditorBlocks()));
            const updatedBlock = this.parent.blockService.applyIndentation({
                blockId: blockId,
                shouldDecrease: shouldDecrease
            });
            this.parent.observer.notify('modelChanged', {
                type: 'IndentBlock',
                state: {
                    blockId,
                    newIndent: updatedBlock.indent
                }
            });
            this.parent.eventService.addChange({
                action: 'Update',
                data: {
                    block: updatedBlock,
                    prevBlock: oldBlock
                }
            });
        });
        this.parent.stateManager.updateManagerBlocks();
        this.parent.listPlugin.recalculateMarkersForListItems();
        this.parent.undoRedoAction.trackIndentActionForUndoRedo(args);
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    }
    /**
     * Moves a block or group of blocks to a new position
     *
     * @param {IMoveBlocksInteraction} args Options for moving the block
     * @returns {void}
     * @hidden
     */
    moveBlock(args) {
        const { fromBlockIds = [], toBlockId, isInteracted = true } = args;
        if (fromBlockIds.length === 0 || !toBlockId) {
            return;
        }
        const toBlockElement = this.parent.getBlockElementById(toBlockId);
        if (!toBlockElement) {
            return;
        }
        const allBlocks = Array.from(this.parent.blockContainer.children);
        const fromElements = fromBlockIds
            .map((id) => this.parent.getBlockElementById(id))
            .filter((el) => el instanceof HTMLElement);
        const destination = this.getDestinationBlockDataForMove(toBlockId);
        const toBlockDOM = (destination.toParentBlockModel
            ? allBlocks[destination.toParentBlockIndex].querySelectorAll('.' + BLOCK_CLS)[destination.toBlockIndex]
            : allBlocks[destination.toBlockIndex]);
        const isMovingUp = fromElements[0].getBoundingClientRect().top > toBlockDOM.getBoundingClientRect().top;
        const movedBlocks = this.parent.blockService.moveBlocks({
            blockIds: fromBlockIds,
            toBlockId: toBlockId,
            isMovingUp: isMovingUp
        });
        this.parent.stateManager.updateManagerBlocks();
        this.parent.observer.notify('modelChanged', {
            type: 'MoveBlock',
            state: {
                movedBlocks,
                destination,
                fromElements,
                isInteracted,
                isMovingUp,
                toBlockDOM
            }
        });
        this.parent.undoRedoAction.trackBlockMoveForUndoRedo(args, movedBlocks, destination.toBlockIndex, destination.toParentBlockModel ? destination.toParentBlockModel.id : '', isMovingUp);
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
        }
        this.parent.updateFocusAndCursor(fromElements.length > 0 ? fromElements[0] : null);
    }
    /**
     * Handles the selective deletion of blocks
     *
     * @param {KeyboardEvent} event The keyboard event
     * @returns {boolean} Whether the event was handled
     * @hidden
     */
    handleSelectiveDeletions(event) {
        const selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        if (selectedBlocks && selectedBlocks.length <= 0 || (getSelectedRange() && getSelectedRange().collapsed)) {
            return false;
        }
        this.parent.isEntireEditorSelected = this.parent.nodeSelection.checkIsEntireEditorSelected();
        if (this.parent.isEntireEditorSelected) {
            this.handleEntireBlockDeletion();
            event.preventDefault();
            return true;
        }
        else if (selectedBlocks && selectedBlocks.length > 1) {
            this.handleMultipleBlockDeletion(selectedBlocks, event.key === 'Backspace' ? 'previous' : 'next');
            event.preventDefault();
            return true;
        }
        return false;
    }
    /**
     * Handles the deletion of entire blocks
     *
     * @returns {void}
     * @hidden
     */
    handleEntireBlockDeletion() {
        const prevFocusedBlockid = this.parent.currentFocusedBlock.id;
        const allBlocks = this.parent.getEditorBlocks().map((block) => {
            const decoupledBlock = decoupleReference(block);
            this.parent.eventService.addChange({
                action: 'Deletion',
                data: { block: decoupledBlock }
            });
            return decoupledBlock;
        });
        this.parent.setEditorBlocks([]);
        this.parent.undoRedoAction.pushActionIntoUndoStack({
            action: actionType.multipleBlocksDeleted,
            oldBlockModel: this.createDefaultEmptyBlock(true),
            data: {
                deletedBlocks: allBlocks,
                deletionType: DeletionType.Entire,
                cursorBlockId: prevFocusedBlockid
            }
        });
        this.parent.isEntireEditorSelected = false;
    }
    /**
     * Handles multiple block deletion
     *
     * @param {BlockModel[]} selectedBlocks The selected blocks
     * @param {string} direction The direction of deletion ('previous' or 'next')
     * @param {boolean} isUndoRedoAction Whether the action is an undo/redo action
     * @returns {boolean} Whether the deletion was successful
     * @hidden
     */
    handleMultipleBlockDeletion(selectedBlocks, direction = 'previous', isUndoRedoAction) {
        const prevFocusedBlockid = this.parent.currentFocusedBlock ? this.parent.currentFocusedBlock.id : '';
        const selectedClones = selectedBlocks.map((block) => decoupleReference(block));
        const firstBlock = selectedBlocks[0];
        const firstBlockIndex = getBlockIndexById(firstBlock.id, this.parent.getEditorBlocks());
        const lastBlock = selectedBlocks[selectedBlocks.length - 1];
        const firstBlockElement = this.parent.getBlockElementById(firstBlock.id);
        const lastBlockElement = this.parent.getBlockElementById(lastBlock.id);
        const range = getSelectedRange();
        if (!range || !firstBlockElement || !lastBlockElement) {
            return false;
        }
        /* Middle blocks */
        for (let i = 1; i < selectedBlocks.length - 1; i++) {
            this.parent.execCommand({ command: 'DeleteBlock', state: {
                    blockElement: this.parent.getBlockElementById(selectedBlocks[parseInt(i.toString(), 10)].id),
                    isUndoRedoAction: true,
                    preventEventTrigger: true
                } });
        }
        // Trim suffix of first block
        const startRange = document.createRange();
        startRange.setStart(range.startContainer, range.startOffset);
        startRange.setEndAfter(getBlockContentElement(firstBlockElement).lastChild);
        startRange.deleteContents(); // Native DOM removal. Identity preserved!
        // Trim prefix of last block
        const endRange = document.createRange();
        endRange.setStartBefore(getBlockContentElement(lastBlockElement).firstChild);
        endRange.setEnd(range.endContainer, range.endOffset);
        endRange.deleteContents();
        /* Merge Last into First */
        this.deleteBlockAtCursor({
            blockElement: direction === 'previous' ? lastBlockElement : firstBlockElement,
            mergeDirection: direction,
            isUndoRedoAction: true,
            preventEventTrigger: true
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
        if (!isUndoRedoAction) {
            this.parent.undoRedoAction.pushActionIntoUndoStack({
                action: actionType.multipleBlocksDeleted,
                data: {
                    deletedBlocks: selectedClones,
                    deletionType: DeletionType.Partial,
                    direction: direction,
                    firstBlockIndex: firstBlockIndex,
                    cursorBlockId: prevFocusedBlockid
                }
            });
        }
        return true;
    }
    populateTargetModelAndId(args) {
        if (!args.targetBlockId && args.targetBlock) {
            args.targetBlockId = args.targetBlock.id;
        }
        if (!args.targetBlock && args.targetBlockId) {
            args.targetBlock = this.parent.getBlockElementById(args.targetBlockId);
        }
        args.targetBlockModel = args.targetBlockId
            ? getBlockModelById(args.targetBlockId, this.parent.getEditorBlocks())
            : null;
    }
    /**
     * Handles block transformation, converting one block type to another
     *
     * @param {string} newBlockType - The new block type to transform to
     * @param {BlockProperties} props - Optional properties for the new block type
     * @returns {void}
     * @hidden
     */
    transformBlocksForSelection(newBlockType, props) {
        const range = getSelectedRange();
        const currentRangeLength = range.toString().length;
        const blocksToTransform = this.resolveBlocksToTransform();
        const ignoredTypes = [BlockType.Callout, BlockType.Image, BlockType.Divider, BlockType.Code];
        if (currentRangeLength > 0) {
            this.parent.nodeSelection.saveSelection();
        }
        // Begin batch mode for multiple block transformations
        if (blocksToTransform.length > 1) {
            this.parent.undoRedoAction.beginBatchTransform();
        }
        for (const block of blocksToTransform) {
            const isIgnored = ignoredTypes.indexOf(block.blockType) !== -1;
            const blockEl = this.parent.getBlockElementById(block.id);
            if (isIgnored) {
                continue;
            }
            const model = getBlockModelById(block.id, this.parent.getEditorBlocks());
            this.handleBlockTransformation({
                block: model,
                blockElement: blockEl,
                newBlockType: newBlockType,
                props
            });
        }
        // End batch mode for multiple block transformations
        if (blocksToTransform.length > 1) {
            this.parent.undoRedoAction.endBatchTransform();
        }
        if (currentRangeLength > 0) {
            this.parent.nodeSelection.restoreSelection();
        }
    }
    resolveBlocksToTransform() {
        const selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        const range = getSelectedRange();
        if (selectedBlocks && selectedBlocks.length > 0) {
            return this.expandSelectedBlocks(selectedBlocks);
        }
        if ((!range) && (!selectedBlocks || selectedBlocks.length === 0)) {
            const cellBlocks = this.getSelectedCellBlocksFromTable();
            if (cellBlocks && cellBlocks.length > 0) {
                return cellBlocks;
            }
        }
        // Fallback: if no selection or range, use the currently focused block
        if (this.parent.currentFocusedBlock) {
            const focusedBlockModel = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
            if (focusedBlockModel) {
                return [focusedBlockModel];
            }
        }
        return [];
    }
    expandSelectedBlocks(selectedBlocks) {
        const result = [];
        for (const block of selectedBlocks) {
            if (block.blockType === BlockType.Table) {
                const tableEl = this.parent.getBlockElementById(block.id);
                result.push(...this.parent.tableSelectionManager.getAllCellBlocks(tableEl));
            }
            else {
                result.push(block);
            }
        }
        return result;
    }
    getSelectedCellBlocksFromTable() {
        const tableCtx = this.parent.blockRenderer.tableRenderer.resolveTableContext();
        if (tableCtx && tableCtx.tableBlockEl) {
            return this.parent.tableSelectionManager.getSelectedCellBlocks(tableCtx.tableBlockEl);
        }
        return [];
    }
    handleBlockTransformation(args) {
        const { block, blockElement, newBlockType, isUndoRedoAction } = args;
        const rangePath = this.parent.nodeSelection.getStoredBackupRange();
        this.parent.mentionAction.cleanMentionArtifacts(blockElement, true);
        this.parent.mentionAction.removeMentionQueryKeysFromModel('/', args.isUndoRedoAction);
        const nestedTypes = new Set([BlockType.CollapsibleParagraph, BlockType.CollapsibleHeading,
            BlockType.Callout, BlockType.Quote, BlockType.Table]);
        const specialTypes = new Set([BlockType.Divider, BlockType.Code, BlockType.Image]);
        const nestedSelectors = `.${CALLOUT_BLOCK_CLS}, .${TOGGLE_BLOCK_CLS}, .${QUOTE_BLOCK_CLS}`;
        const closestParentEle = blockElement.closest(nestedSelectors);
        let transformedElement = blockElement;
        const doesBlockHasContent = blockElement.textContent.length > 0;
        let nextSiblingOfTransformedEle;
        const isSpecialType = specialTypes.has(newBlockType) || specialTypes.has(block.blockType);
        const isNestedType = nestedTypes.has(newBlockType) || nestedTypes.has(block.blockType);
        // Proceed to add new block rather than transforming current block for below conditions
        if ((isSpecialType || isNestedType) && (doesBlockHasContent || (isNestedType && closestParentEle))) {
            const addedBlock = this.parent.blockCommand.addBlock({
                blockID: isUndoRedoAction ? block.id : '',
                targetBlock: isNestedType ? closestParentEle || blockElement : blockElement,
                blockType: newBlockType,
                properties: args.props,
                preventEventTrigger: true,
                forceIgnoreTargetUpdate: true,
                isUndoRedoAction: isUndoRedoAction
            });
            // Delete the special block dom after adding a block of it's older type
            if (isUndoRedoAction) {
                this.deleteBlock({ blockElement, isUndoRedoAction: true });
            }
            transformedElement = this.parent.getBlockElementById(addedBlock.id);
        }
        else {
            cleanCheckmarkElement(blockElement);
            transformedElement = this.transformBlock({
                block: block,
                blockElement: blockElement,
                newBlockType: newBlockType,
                isUndoRedoAction: isUndoRedoAction,
                props: args.props,
                preventEventTrigger: true,
                oldBlockModel: args.oldBlockModel
            });
        }
        // Add a new paragraph block after the transformed block if it is a special type block.
        if ((isSpecialType || isNestedType) && !isUndoRedoAction) {
            const addedBlock = this.parent.blockCommand.addBlock({
                targetBlock: transformedElement,
                blockType: BlockType.Paragraph,
                preventUIUpdate: true,
                preventEventTrigger: true,
                forceIgnoreTargetUpdate: true
            });
            nextSiblingOfTransformedEle = this.parent.getBlockElementById(addedBlock.id);
        }
        const contentElement = getBlockContentElement(transformedElement);
        this.parent.togglePlaceholder(transformedElement, true);
        if (transformedElement.getAttribute('data-block-type') === BlockType.Callout ||
            transformedElement.getAttribute('data-block-type') === BlockType.Quote) {
            this.parent.setFocusToBlock(transformedElement.querySelector('.' + BLOCK_CLS));
        }
        else {
            this.parent.setFocusToBlock(transformedElement);
        }
        if (rangePath && rangePath.endContainer && contentElement) {
            setCursorPosition(contentElement, getAbsoluteOffset(contentElement, rangePath.endContainer, rangePath.endOffset));
        }
        this.parent.listPlugin.recalculateMarkersForListItems();
        this.parent.floatingIconAction.showFloatingIcons(transformedElement);
        if ((newBlockType === BlockType.Divider || newBlockType === BlockType.Image) && nextSiblingOfTransformedEle) {
            this.parent.setFocusAndUIForNewBlock(nextSiblingOfTransformedEle);
        }
        else if (newBlockType === 'Table') {
            const firstCell = transformedElement.querySelector('tbody td:not(.e-row-number)');
            this.parent.tableService.addCellFocus(firstCell, true);
        }
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    }
    /**
     * Transforms an existing block into a different type
     *
     * @param {ITransformBlockInteraction} args options for transforming block
     * @returns {HTMLElement} - The transformed block element
     * @hidden
     */
    transformBlock(args) {
        this.parent.previousSelection = captureSelectionState();
        const { newBlockType, isUndoRedoAction, props, shouldPreventUpdates, preventEventTrigger } = args;
        let { block } = args;
        const oldBlockClone = decoupleReference(block);
        let blockModel = oldBlockClone;
        if (isUndoRedoAction) {
            const isOldBlockTypeNonMergable = isNonMergableBlock(args.blockElement);
            blockModel = isOldBlockTypeNonMergable ? args.oldBlockModel : oldBlockClone;
        }
        block.blockType = newBlockType;
        block.properties = props || {};
        block = this.parent.blockService.updateBlock(block.id, BlockFactory.createBlockFromPartial(Object.assign({}, blockModel, { blockType: newBlockType, properties: props || {} })));
        this.parent.stateManager.updateManagerBlocks();
        this.parent.observer.notify('modelChanged', { type: 'TransformBlock', state: {
                block, shouldPreventUpdates, oldBlockClone, isUndoRedoAction, preventEventTrigger
            } });
        const newBlockElement = this.parent.getBlockElementById(block.id);
        if (!shouldPreventUpdates) {
            this.parent.setFocusAndUIForNewBlock(newBlockElement);
            this.parent.undoRedoAction.trackBlockTransformForUndoRedo(newBlockElement, block, oldBlockClone, isUndoRedoAction);
        }
        else {
            this.parent.togglePlaceholder(newBlockElement, false);
        }
        return newBlockElement;
    }
    /**
     * Transforms a block to normal paragraph block.
     *
     * @param {HTMLElement} blockElement - The block element to render the content into.
     * @param {BlockModel} blockModel - The block model to render.
     * @returns {void}
     * @hidden
     */
    transformBlockToParagraph(blockElement, blockModel) {
        this.parent.floatingIconAction.showFloatingIcons(this.transformBlock({
            block: blockModel,
            blockElement: blockElement,
            newBlockType: BlockType.Paragraph
        }));
    }
    /**
     * Creates a default empty block
     *
     * @param {boolean} shouldUpdateDom Whether to update the DOM
     * @param {string} blockId Optional block ID to use
     * @returns {BlockModel} The created block model or null
     * @hidden
     */
    createDefaultEmptyBlock(shouldUpdateDom, blockId) {
        if (this.parent.getEditorBlocks().length === 0) {
            const newBlock = this.prepareBlock({
                blockID: blockId,
                blockType: BlockType.Paragraph,
                contentModel: [BlockFactory.createTextContent()]
            });
            this.parent.setEditorBlocks([newBlock]);
            this.parent.stateManager.updateManagerBlocks();
            if (shouldUpdateDom) {
                this.parent.observer.notify('modelChanged', { type: 'DefaultEmptyBlock' });
            }
            return this.parent.getEditorBlocks()[0];
        }
        return null;
    }
    /**
     * Creates content models from a document fragment
     *
     * @param {DocumentFragment} fragment The document fragment
     * @returns {ContentModel[]} Array of content models
     * @hidden
     */
    getContentModelForFragment(fragment) {
        const tempContainer = document.createElement('div');
        Array.from(fragment.childNodes).forEach((node) => {
            tempContainer.appendChild(node.cloneNode(true));
        });
        const newContents = convertInlineElementsToContentModels(tempContainer, true);
        return newContents;
    }
    /**
     * Generates new IDs for the block and its content.
     *
     * @param {string} destinationBlockId The ID of the destination block.
     * @returns {IToBlockData | null} The destination block data or null if not found.
     * @hidden
     */
    getDestinationBlockDataForMove(destinationBlockId) {
        const editorBlocks = this.parent.getEditorBlocks();
        const toBlockModel = getBlockModelById(destinationBlockId, editorBlocks);
        const toBlockIndex = getBlockIndexById(destinationBlockId, editorBlocks);
        const toParentBlockModel = getBlockModelById(toBlockModel.parentId, editorBlocks);
        const toParentBlockIndex = toParentBlockModel ? getBlockIndexById(toParentBlockModel.id, editorBlocks) : -1;
        return { toBlockModel, toParentBlockModel, toBlockIndex, toParentBlockIndex };
    }
    /**
     * Creates a new block model based on provided arguments
     *
     * @param {IAddBlockInteraction} args - Options for creating the block
     * @returns {BlockModel} - The new block model
     * @hidden
     */
    prepareBlock(args) {
        const { block, targetBlockModel, blockID, blockType, contentModel, properties } = args;
        if (!block) {
            return BlockFactory.createBlockFromPartial({
                id: blockID || generateUniqueId(BLOCK_ID_PREFIX),
                parentId: targetBlockModel ? targetBlockModel.parentId : '',
                blockType: (blockType || BlockType.Paragraph),
                content: (contentModel && contentModel.length > 0) ? contentModel : [BlockFactory.createTextContent()],
                indent: targetBlockModel ? targetBlockModel.indent : 0,
                properties: properties || {}
            });
        }
        if (!args.isUndoRedoAction) {
            this.parent.stateManager.populateUniqueIds([block]);
        }
        return block;
    }
    transformToggleBlocksAsRegular(blockElement) {
        const editorBlocks = this.parent.getEditorBlocks();
        const block = getBlockModelById(blockElement.id, editorBlocks);
        if (!block || !block.blockType.startsWith('Collapsible')) {
            return;
        }
        const headerContentElement = blockElement.querySelector('.e-toggle-header .e-block-content');
        const toggleContentElement = blockElement.querySelector('.' + TOGGLE_CONTENT_CLS);
        const childBlockElements = toggleContentElement.querySelectorAll('.' + BLOCK_CLS);
        const newType = block.blockType.replace(/^Collapsible/, '');
        const children = block.properties.children;
        block.blockType = newType;
        children.forEach((childBlock) => {
            if (childBlock) {
                childBlock.parentId = '';
            }
        });
        editorBlocks.splice(getBlockIndexById(blockElement.id, editorBlocks) + 1, 0, ...children);
        block.properties.children = [];
        blockElement.classList.remove('e-toggle-block');
        blockElement.setAttribute('data-block-type', newType);
        blockElement.removeAttribute('data-collapsed');
        const cloneMainBlock = blockElement.cloneNode(false);
        cloneMainBlock.appendChild(headerContentElement);
        blockElement.insertAdjacentElement('afterend', cloneMainBlock);
        childBlockElements.forEach((childBlockElement) => {
            cloneMainBlock.insertAdjacentElement('afterend', childBlockElement);
        });
        detach(blockElement);
        setCursorPosition(cloneMainBlock, 0);
        this.parent.setFocusToBlock(cloneMainBlock);
        this.parent.stateManager.updateManagerBlocks();
    }
    destroy() {
        this.removeEventListener();
    }
}

/**
 * Service responsible for core block-related logics that updates model
 */
class BlockService {
    constructor(blocks) {
        this.blocks = blocks;
    }
    /**
     * Adds a new block to the provided blocks array
     *
     * @param {IAddBlockOptions} options - Options for creating the block
     * @returns {BlockModel} - The newly added block model
     * @hidden
     */
    addBlock(options) {
        const targetBlockModel = options.targetBlockId ? getBlockModelById(options.targetBlockId, this.blocks) : null;
        const insertArray = targetBlockModel ? getParentBlocksArray(targetBlockModel.id, this.blocks) : this.blocks;
        const indexToInsert = this.getIndexToAdjust(insertArray, targetBlockModel, options.isAfter);
        insertArray.splice(indexToInsert, 0, options.block);
        return options.block;
    }
    /**
     * Removes a block model from the blocks array
     *
     * @param {IRemoveBlockOptions} options - Options for removing the block
     * @returns {{ removedBlock: BlockModel, blockIndex: number }} The removed block and its index
     * @hidden
     */
    removeBlock({ blockId }) {
        const blockModel = getBlockModelById(blockId, this.blocks);
        if (!blockModel) {
            return { removedBlock: null, blockIndex: -1 };
        }
        const containerArray = getParentBlocksArray(blockId, this.blocks);
        const blockIndex = getBlockIndexById(blockId, this.blocks);
        const [removedBlock] = containerArray.splice(blockIndex, 1);
        return { removedBlock, blockIndex };
    }
    /**
     * Updates a block with the provided properties
     *
     * @param {string} blockId - The ID of the block to update
     * @param {Partial<BlockModel>} properties - The properties to update
     * @param {boolean} isUndoRedoAction Whether the action is an undo/redo action
     * @returns {BlockModel} Updated block and blocks array
     * @hidden
     */
    updateBlock(blockId, properties) {
        const blockModel = getBlockModelById(blockId, this.blocks);
        if (!blockModel) {
            return null;
        }
        const updatedBlock = this.mergeBlockProperties(blockModel, properties);
        const containerArray = getParentBlocksArray(blockId, this.blocks);
        const blockIndex = getBlockIndexById(blockId, containerArray);
        containerArray.splice(blockIndex, 1, updatedBlock);
        return updatedBlock;
    }
    /**
     * Duplicates the given block model
     *
     * @param {IDuplicateBlockOptions} options - Options for duplicating the block
     * @returns {BlockModel} The duplicated block model or null
     * @hidden
     */
    duplicateBlock({ blockId }) {
        const blockModel = getBlockModelById(blockId, this.blocks);
        if (!blockModel) {
            return null;
        }
        const containerArray = getParentBlocksArray(blockId, this.blocks);
        const blockIndex = getBlockIndexById(blockId, containerArray);
        const blockToClone = containerArray[blockIndex];
        const clonedBlock = decoupleReference(blockToClone);
        const duplicatedBlockModel = this.generateNewIdsForBlock(clonedBlock);
        return duplicatedBlockModel;
    }
    /**
     * Moves the given block model to a new position
     *
     * @param {IMoveBlockOptions} options - Options for moving the block}
     * @returns {void}
     * @hidden
     */
    moveBlocks(options) {
        const { blockIds, toBlockId, isMovingUp = false } = options;
        const toBlockModel = getBlockModelById(toBlockId, this.blocks);
        if (!toBlockModel) {
            return [];
        }
        // Collect information about blocks to move
        const fromEntries = this.gatherBlocksInfoForMove(blockIds);
        if (fromEntries.length === 0) {
            return [];
        }
        // Remove blocks from their original positions
        const movedBlocks = this.removeBlocksForMove(fromEntries);
        // Insert blocks at the target position
        this.insertBlocksAtTarget(movedBlocks, toBlockId, isMovingUp);
        return movedBlocks;
    }
    /**
     * Handles the indent/outdent of block
     *
     * @param {IIndentBlockOptions} options - Options to indent/unindent block
     * @returns {BlockModel} - The updated block model
     * @hidden
     */
    applyIndentation(options) {
        const { blockId, shouldDecrease } = options;
        const blockModel = getBlockModelById(blockId, this.blocks);
        if (!blockModel) {
            return null;
        }
        const blockIndex = getBlockIndexById(blockId, this.blocks);
        const parentBlock = getBlockModelById(blockModel.parentId, this.blocks);
        if (shouldDecrease) {
            if (blockModel.indent > 0) {
                blockModel.indent--;
            }
        }
        else {
            // Indent - only allow if previous block is at same or higher level
            const adjacentBlockModel = parentBlock
                ? parentBlock.properties.children[blockIndex - 1]
                : this.blocks[blockIndex - 1];
            if (adjacentBlockModel) {
                if (blockModel.indent <= adjacentBlockModel.indent) {
                    blockModel.indent++;
                }
            }
            else {
                blockModel.indent++;
            }
        }
        return blockModel;
    }
    /**
     * Handles the line break of block
     *
     * @param {number} insertOffset - The offset at which to insert the line break
     * @param {ContentModel} contentModel - The content model to update
     * @returns {void}
     * @hidden
     */
    applyLineBreak(insertOffset, contentModel) {
        if (insertOffset < 0 || !contentModel) {
            return;
        }
        contentModel.content =
            contentModel.content.substring(0, insertOffset) +
                '\n' +
                contentModel.content.substring(insertOffset);
    }
    /**
     * Updates the block content with given data
     *
     * @param {string} blockId The id of the block
     * @param {ContentModel[]} content The content to update
     * @returns {void}
     * @hidden
     */
    updateContent(blockId, content) {
        const block = getBlockModelById(blockId, this.blocks);
        block.content = content;
    }
    /**
     * Toggles formatting style on content model
     *
     * @param {ContentModel} content - The content model to update
     * @param {any} format - The format to toggle (eg. Bold, Italic)
     * @param {boolean} force - Whether to force the format intent
     * @param {boolean} formatIntent - Whether to apply or remove the format
     * @param {string} value - The value for non-boolean styles
     * @returns {ContentModel} - The updated content model
     * @hidden
     */
    toggleContentStyles(content, format, force, formatIntent, value) {
        const updatedContent = Object.assign({}, content);
        const booleanStyles = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'uppercase', 'lowercase', 'inlineCode'];
        const togglePairs = ['superscript', 'subscript', 'uppercase', 'lowercase'];
        const isBooleanStyle = booleanStyles.indexOf(format) !== -1;
        const isTogglePair = togglePairs.indexOf(format) !== -1;
        if (!updatedContent.properties) {
            updatedContent.properties = { styles: {} };
        }
        if (!updatedContent.properties.styles) {
            updatedContent.properties.styles = {};
        }
        const styles = updatedContent.properties.styles;
        if (isBooleanStyle) {
            let newValue = !styles[format];
            if (force) {
                newValue = formatIntent;
            }
            if (newValue) {
                styles[format] = true;
            }
            else {
                delete styles[format];
            }
            if (isTogglePair) {
                const oppositeFormat = getInverseStyle(format);
                delete styles[oppositeFormat];
            }
        }
        else {
            if (value) {
                styles[format] = value;
            }
            else {
                delete styles[format];
            }
        }
        return updatedContent;
    }
    /**
     * Applies link formatting to content model
     *
     * @param {ContentModel} content - The content model to update
     * @param {LinkData} linkData - The link data containing URL, text, and other properties
     * @returns {ContentModel} - The updated content model
     * @hidden
     */
    applyLinkFormatting(content, linkData) {
        let updatedContent;
        const textContent = linkData.text ? linkData.text : content.content;
        if (!linkData.shouldRemoveLink) {
            updatedContent = BlockFactory.createLinkContent({ content: textContent }, Object.assign({}, content.properties, { url: linkData.url }));
        }
        else {
            delete content.properties.url;
            updatedContent = BlockFactory.createTextContent({
                content: textContent
            }, content.properties);
        }
        return updatedContent;
    }
    /**
     * Assigns parent ID to multiple blocks
     *
     * @param {BlockModel[]} blocks - The blocks to update
     * @param {string} parentId - The parent ID to assign
     * @returns {void}
     * @hidden
     */
    assignParentIdToBlocks(blocks, parentId) {
        blocks.forEach((block) => {
            block.parentId = parentId;
        });
    }
    /**
     * Gets the index to adjust the block based on the given targetBlock.
     *
     * @param {BlockModel[]} insertionArray The target collection of blocks to insert.
     * @param {BlockModel} targetBlock The block after which the new block should be inserted.
     * @param {boolean} isAfter Specifies whether the new block should be inserted after the targetBlock.
     * @returns {number} The index at which the new block should be inserted.
     * @hidden
     */
    getIndexToAdjust(insertionArray, targetBlock, isAfter = true) {
        let insertIndex = insertionArray.length;
        if (targetBlock) {
            const afterBlockIndex = getBlockIndexById(targetBlock.id, insertionArray);
            if (afterBlockIndex !== -1) {
                insertIndex = afterBlockIndex + (isAfter ? 1 : 0);
            }
        }
        return insertIndex;
    }
    /**
     * Gathers information about blocks to be moved
     *
     * @param {string[]} fromBlockIds Array of block IDs to move
     * @returns {IFromBlockData[]} Array of block information objects
     * @hidden
     */
    gatherBlocksInfoForMove(fromBlockIds) {
        const entries = [];
        for (const fromBlockId of fromBlockIds) {
            const blockModel = getBlockModelById(fromBlockId, this.blocks);
            const index = getBlockIndexById(fromBlockId, this.blocks);
            if (index >= 0 && blockModel) {
                const parent = getBlockModelById(blockModel.parentId, this.blocks);
                entries.push({ blockId: fromBlockId, model: blockModel, index, parent });
            }
        }
        return entries.sort((a, b) => b.index - a.index);
    }
    /**
     * Removes blocks from their current position in the model
     *
     * @param {IFromBlockData[]} fromEntries Array of block information objects
     * @returns {IFromBlockData[]} Array of removed block models
     * @hidden
     */
    removeBlocksForMove(fromEntries) {
        const allFromModels = [];
        // Splice safely from the highest index to avoid index shifts
        for (const entry of fromEntries) {
            const { blockId, index, parent } = entry;
            const containerArray = getParentBlocksArray(blockId, this.blocks);
            const [moved] = containerArray.splice(index, 1);
            // allFromModels has the original indexes and parentid before mutation in reverse order
            allFromModels.push({ blockId: blockId, model: moved, parent, index });
        }
        return allFromModels;
    }
    /**
     * Inserts blocks at the target position in the model
     *
     * @param {IFromBlockData[]} movedBlocks Array of block models to insert
     * @param {string} toBlockId Target block ID
     * @param {boolean} isMovingUp Whether blocks are moving up or down
     * @returns {void}
     * @hidden
     */
    insertBlocksAtTarget(movedBlocks, toBlockId, isMovingUp) {
        const toBlockIndex = getBlockIndexById(toBlockId, this.blocks);
        if (toBlockIndex < 0) {
            return null;
        }
        const insertToArray = getParentBlocksArray(toBlockId, this.blocks);
        const toBlockModel = getBlockModelById(toBlockId, insertToArray);
        const toParentBlock = getBlockModelById(toBlockModel.parentId, this.blocks);
        const insertIndex = getBlockIndexById(toBlockId, insertToArray) + (isMovingUp ? 0 : 1);
        for (const entry of movedBlocks) {
            entry.model.parentId = toParentBlock ? toParentBlock.id : '';
            insertToArray.splice(insertIndex, 0, entry.model);
        }
    }
    /**
     * Replaces a block at specific index in parent's children or root blocks array
     *
     * @param {string} originalBlockId - The ID of the block to replace
     * @param {BlockModel} newBlock - The new block to insert
     * @returns {void}
     * @hidden
     */
    replaceBlock(originalBlockId, newBlock) {
        const originalBlock = getBlockModelById(originalBlockId, this.blocks);
        if (!originalBlock) {
            return;
        }
        const insertToArray = getParentBlocksArray(originalBlockId, this.blocks);
        const indexToReplace = getBlockIndexById(originalBlock.id, insertToArray);
        insertToArray.splice(indexToReplace, 1, newBlock);
    }
    /**
     * Generates new IDs for the block and its content.
     *
     * @param {BlockModel} block The block model to generate new IDs for.
     * @param {string} parentId The parent ID of the block.
     * @returns {void} The block model with new IDs.
     * @hidden
     */
    generateNewIdsForBlock(block, parentId) {
        block.id = generateUniqueId(BLOCK_ID_PREFIX);
        if (parentId) {
            block.parentId = parentId;
        }
        if (block.blockType === BlockType.Table) {
            return this.generateNewIdsForTableBlock(block);
        }
        let children = (block.properties && block.properties.children)
            ? block.properties.children
            : [];
        if (children && children.length > 0) {
            children = children.map((child) => this.generateNewIdsForBlock(child, block.id));
        }
        return block;
    }
    generateNewIdsForTableBlock(tableBlock) {
        const props = tableBlock.properties;
        // 1. Regenerate all column IDs + store mapping
        const columnIdMap = new Map();
        props.columns = props.columns.map((col) => {
            const newId = generateUniqueId('col_');
            columnIdMap.set(col.id, newId);
            return Object.assign({}, col, { id: newId });
        });
        // 2. Regenerate row IDs and cell IDs + fix columnId references
        props.rows = props.rows.map((row) => {
            const newRowId = generateUniqueId('row_');
            const newCells = row.cells.map((cell) => {
                const newCellId = generateUniqueId('cell_');
                const newColumnId = columnIdMap.get(cell.columnId) || cell.columnId;
                // Regenerate IDs for all blocks inside this cell
                const newBlocks = cell.blocks.map((innerBlock) => this.generateNewIdsForBlock(innerBlock, newCellId));
                return Object.assign({}, cell, { id: newCellId, columnId: newColumnId, blocks: newBlocks });
            });
            return Object.assign({}, row, { id: newRowId, cells: newCells });
        });
        return tableBlock;
    }
    /**
     * Merges partial block properties with an existing block
     *
     * @param {BlockModel} block - Original block model
     * @param {Partial<BlockModel>} properties - Partial properties to merge
     * @param {boolean} isUndoRedoAction Whether the action is an undo/redo action
     * @returns {BlockModel} Merged block model
     * @hidden
     */
    mergeBlockProperties(block, properties) {
        const clonedBlock = decoupleReference(block);
        const mergedBlock = Object.assign({}, clonedBlock);
        // Merge block-level properties
        Object.keys(properties).forEach((key) => {
            if (key === 'content' && properties.content) {
                mergedBlock.content = properties.content.map((newContent) => {
                    return BlockFactory.createContentFromPartial(newContent);
                });
            }
            else if ((key === 'properties' && properties.properties)) {
                mergedBlock[key] = this.mergePrimitiveTypes(clonedBlock[key], properties[key]);
            }
            else {
                mergedBlock[key] = properties[key];
            }
        });
        return mergedBlock;
    }
    /**
     * Merges a primitive type model with it's partial updates
     *
     * @param {any} existing - Existing model
     * @param {Partial<any>} updates - Partial updates
     * @returns {any} Merged model
     * @hidden
     */
    mergePrimitiveTypes(existing, updates) {
        const merged = Object.assign({}, existing);
        Object.keys(updates).forEach((key) => {
            merged[key] = updates[key];
        });
        return merged;
    }
    /**
     * Gets the editor blocks data
     *
     * @returns {BlockModel[]} The editor blocks data
     * @hidden
     */
    getBlocks() {
        return this.blocks;
    }
    /**
     * Sets the editor blocks data with the given blocks
     *
     * @param {BlockModel[]} blocks The blocks to set for the editor
     * @returns {void}
     * @hidden
     */
    setBlocks(blocks) {
        this.blocks = blocks;
    }
}

/**
 * Manages block change events and their tracking for the BlockEditor.
 *
 * @hidden
 */
class EventService {
    /**
     * Creates a new BlockCommandManager instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    constructor(manager) {
        this.parent = manager;
        this.blockChanges = [];
        this.addEventListener();
    }
    addEventListener() {
        this.parent.observer.on(CLEAREVENTCHANGES, this.clearEventChanges, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListener() {
        this.parent.observer.off(CLEAREVENTCHANGES, this.clearEventChanges);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    /**
     * Adds a block change operation to the collection.
     *
     * @param {BlockChange} change - The block change to add.
     * @returns {void}
     * @hidden
     */
    addChange(change) {
        this.blockChanges.push(change);
    }
    /**
     * Retrieves the current collection of block change operations.
     *
     * @returns {BlockChange[]} change - Array of block change operations.
     * @hidden
     */
    getChanges() {
        return this.blockChanges;
    }
    /**
     * Clears all recorded block change operations.
     *
     * @returns {void}
     * @hidden
     */
    clearEventChanges() {
        this.blockChanges = [];
    }
    destroy() {
        this.blockChanges = null;
        this.removeEventListener();
    }
}

/**
 * Manages state and data in the BlockEditor
 */
class StateManager {
    /**
     * Creates a new StateManager instance
     *
     * @param {BlockManager} parent The parent BlockManager instance
     */
    constructor(parent) {
        this.parent = parent;
    }
    /**
     * Updates the internal content models based on user typing
     *
     * @param {HTMLElement} blockElement - The block element being updated
     * @param {Event} updateEvent - The original input event that triggered the update (optional)
     * @returns {void}
     * @hidden
     */
    updateContentOnUserTyping(blockElement, updateEvent) {
        if (!blockElement) {
            return;
        }
        const block = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        if (!block || (block && (block.blockType === 'Code' || block.blockType === 'Table'))) {
            return;
        }
        const oldBlockModel = decoupleReference(block);
        const contentElement = this.getContentElementForUpdate(getSelectedRange(), blockElement);
        if (!contentElement) {
            return;
        }
        if (!block.content || contentElement.childNodes.length === 0) {
            this.parent.blockService.updateContent(block.id, []);
        }
        const newContents = convertInlineElementsToContentModels(contentElement, true);
        this.parent.blockService.updateContent(block.id, newContents);
        const clonedBlock = decoupleReference(block);
        this.parent.undoRedoAction.trackContentChangedForUndoRedo(oldBlockModel, clonedBlock);
        this.parent.eventService.addChange({
            action: 'Update',
            data: {
                block: clonedBlock,
                prevBlock: oldBlockModel
            }
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
        this.updateManagerBlocks();
    }
    getContentElementForUpdate(range, blockElement) {
        let contentElement = getBlockContentElement(blockElement);
        if (!contentElement) {
            return null;
        }
        if (blockElement.closest('.' + TOGGLE_BLOCK_CLS)) {
            const toggleHeader = findClosestParent(range.startContainer, '.e-toggle-header');
            if (toggleHeader) {
                contentElement = toggleHeader.querySelector('.' + CONTENT_CLS);
            }
        }
        return contentElement;
    }
    /**
     * Populates blocks with unique IDs if they don't have them
     *
     * @param {BlockModel[]} blocks Array of block models
     * @param {string} parentBlockId Optional parent block ID
     * @returns {void}
     * @hidden
     */
    populateUniqueIds(blocks, parentBlockId) {
        blocks.forEach((block) => {
            if (!block.id) {
                block.id = generateUniqueId(BLOCK_ID_PREFIX);
            }
            if (parentBlockId) {
                block.parentId = parentBlockId;
            }
            const props = block.properties;
            if ((isChildrenProp(block)) && props.children.length > 0) {
                this.populateUniqueIds(props.children, block.id);
            }
        });
    }
    /**
     * Updates the property changes to the model
     *
     * @returns {void}
     * @hidden
     */
    updateManagerBlocks() {
        this.parent.blocks = this.parent.getEditorBlocks();
        this.parent.observer.notify('updateEditorBlocks', { blocks: this.parent.blocks });
    }
}

/**
 * Manages core table block actions
 *
 * @hidden
 */
class TableService {
    /**
     * Creates a new BlockCommandManager instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    constructor(manager) {
        this.parent = manager;
    }
    /**
     * Creates and returns a fully rendered <tr> element for the given row model.
     *
     * @param {number} visualRowIndex - The visual row index in DOM (1-based, accounts for header if present)
     * @param {ITableBlockSettings} settings - Current table configuration (columns, enableHeader, enableRowNumbers, etc.)
     * @param {BlockModel} block - The parent table BlockModel
     * @param {TableRowModel} TableRowModel - The row data model to render
     * @returns {HTMLTableRowElement} The created <tr> element with all cells appended
     *
     * @hidden
     */
    createRow(visualRowIndex, settings, block, TableRowModel) {
        const rowEl = createElement('tr');
        const columns = settings.columns;
        rowEl.dataset.row = visualRowIndex.toString();
        // Row number cell
        if (settings.enableRowNumbers) {
            const rn = createElement('td', {
                className: 'e-row-number',
                attrs: { tabindex: '-1', 'aria-hidden': 'true', contenteditable: 'false' }
            });
            rn.textContent = (settings.enableHeader ? (visualRowIndex) : (visualRowIndex + 1)).toString();
            rowEl.appendChild(rn);
        }
        // Data cells
        columns.forEach((colModel, cIdx) => {
            const td = createElement('td');
            td.dataset.row = visualRowIndex.toString();
            td.dataset.col = cIdx.toString();
            td.tabIndex = 0;
            td.setAttribute('role', 'gridcell');
            const cell = (TableRowModel.cells).find((c) => c.columnId === colModel.id);
            const cellBlockContainer = createElement('div', {
                id: cell.id,
                className: 'e-cell-blocks-container'
            });
            if (cell) {
                cell.blocks.forEach((innerBlock) => {
                    const innerEl = this.parent.blockRenderer.createBlockElement(innerBlock);
                    cellBlockContainer.appendChild(innerEl);
                });
            }
            td.appendChild(cellBlockContainer);
            rowEl.appendChild(td);
        });
        return rowEl;
    }
    /**
     * Inserts a new row at the specified position in both model and DOM.
     * Automatically updates row numbers and dataset indices.
     *
     * @param {ITableRowInsertOptions} options - arguments needed for row insertion in specified position.
     * @returns {void}
     *
     * @hidden
     */
    addRowAt(options) {
        const { blockId, rowIndex, rowModel, isUndoRedoAction } = options;
        const oldBlock = decoupleReference(getBlockModelById(blockId, this.parent.getEditorBlocks()));
        const blockElement = this.parent.getBlockElementById(blockId);
        const table = blockElement.querySelector('table.e-table-element');
        const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        this.removeCellFocus(table);
        const settings = block.properties;
        const tbody = table.tBodies[0];
        const newTableRowModel = rowModel || this.createRowModel(settings);
        settings.rows.splice(rowIndex, 0, newTableRowModel);
        // Render DOM row from model
        const newRowEl = this.createRow(rowIndex, settings, block, newTableRowModel);
        const rows = Array.from(tbody.rows);
        tbody.insertBefore(newRowEl, rows[rowIndex]);
        // Update dataset indices
        Array.from(tbody.rows).forEach((row, rIdx) => {
            row.dataset.row = settings.enableHeader ? (rIdx + 1).toString() : rIdx.toString();
            Array.from(row.cells).forEach((cell) => {
                if (cell.tagName === 'TD') {
                    cell.dataset.row = (rIdx + 1).toString();
                    cell.setAttribute('aria-rowindex', (rIdx + 1).toString());
                }
            });
        });
        this.addCellFocus(newRowEl.cells[0], true);
        this.updateRowNumbers(table, settings);
        const deCoupledRowModel = decoupleReference(newTableRowModel);
        this.parent.undoRedoAction.trackTableRowInsertionForUndoRedo({
            blockId, rowIndex, rowModel: deCoupledRowModel, isUndoRedoAction
        });
        this.triggerBlockUpdate(block, oldBlock);
    }
    /**
     * Inserts a new column at the specified position in both model and DOM.
     * Handles column model creation, width redistribution, and cell block containers.
     *
     * @param {ITableColumnInsertOptions} options - arguments needed for column insertion in specified position.
     * @returns {void}
     *
     * @hidden
     */
    addColumnAt(options) {
        const { blockId, colIndex, columnModel, columnCells, isUndoRedoAction } = options;
        const oldBlock = decoupleReference(getBlockModelById(blockId, this.parent.getEditorBlocks()));
        const blockElement = this.parent.getBlockElementById(blockId);
        const table = blockElement.querySelector('table.e-table-element');
        const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        const tableBlockElement = findClosestParent(table, '.' + TABLE_BLOCK_CLS);
        const targetColIndex = colIndex;
        const settings = block.properties;
        const colIndicator = tableBlockElement.querySelector('.e-col-insert-handle');
        const colLine = tableBlockElement.querySelector('.e-col-hover-line');
        const colResizeHandle = tableBlockElement.querySelector('.e-col-resize-handle');
        const mode = getWidthMode(table);
        const containerWidth = table.clientWidth;
        this.updateDataColCount(table, false);
        const newCount = parseInt(table.getAttribute('data-col-counter'), 10);
        table.setAttribute('data-col-counter', newCount.toString());
        colIndicator.style.display = 'none';
        colLine.style.display = 'none';
        colResizeHandle.style.display = 'none';
        // Insert TableColumnModel into settings.columns
        const newColModel = columnModel || this.createColumnModel(newCount);
        const newColCells = [];
        settings.columns.splice(targetColIndex, 0, newColModel);
        // Insert a new cell into each row model at the same index, populate blocks if provided
        (settings.rows).forEach((row, rIdx) => {
            const newCell = columnModel ? columnCells[rIdx] : this.createTableCell(newColModel.id);
            row.cells.splice(targetColIndex, 0, newCell);
            newColCells.push(decoupleReference(newCell));
        });
        // Update colgroup visuals
        const colgroup = table.querySelector('colgroup');
        const newColEl = createElement('col');
        colgroup.insertBefore(newColEl, colgroup.children[(settings.enableRowNumbers ? targetColIndex + 1 : targetColIndex)]);
        if (mode === 'percent') {
            // Decide if we can keep equal percent after insertion
            const n = settings.columns.length;
            const canStayPercent = projectEqualPercentFits(containerWidth, n, TABLE_NEW_COL_WIDTH);
            if (canStayPercent) {
                // Equal % distribution
                applyEqualPercent(table, settings);
            }
            else {
                // Switch to px mode: keep existing px widths and give new column 120px
                changeColWidthToPxUnits(table, settings, { index: targetColIndex, width: TABLE_NEW_COL_WIDTH });
            }
        }
        else {
            // Already in px mode: keep existing px widths, assign 120px to new col
            const dataCols = getColgroupChildren(table);
            dataCols[targetColIndex].style.width = `${TABLE_NEW_COL_WIDTH}px`;
        }
        // Update rows DOM
        const rowsEl = Array.from(table.rows);
        rowsEl.forEach((rowEl, rIdx) => {
            const isHeader = rowEl.parentElement.tagName === 'THEAD';
            const newCellEl = createElement(isHeader ? 'th' : 'td');
            newCellEl.dataset.row = isHeader ? '0' : (rIdx).toString();
            newCellEl.dataset.col = targetColIndex.toString();
            newCellEl.tabIndex = 0;
            if (isHeader) {
                newCellEl.textContent = newColModel.headerText;
                newCellEl.setAttribute('role', 'columnheader');
                newCellEl.setAttribute('contenteditable', 'true');
            }
            else {
                newCellEl.setAttribute('role', 'gridcell');
                const cellBlockContainer = createElement('div', {
                    id: (settings.rows[rIdx - (settings.enableHeader ? 1 : 0)].cells[targetColIndex]).id,
                    className: TABLE_CELL_BLK_CONTAINER
                });
                const innerBlock = (settings.rows[rIdx - (settings.enableHeader ? 1 : 0)]
                    .cells[targetColIndex]).blocks[0];
                if (innerBlock) {
                    const innerEl = this.parent.blockRenderer.createBlockElement(innerBlock);
                    cellBlockContainer.appendChild(innerEl);
                }
                newCellEl.appendChild(cellBlockContainer);
            }
            rowEl.insertBefore(newCellEl, rowEl.cells[(settings.enableRowNumbers ? targetColIndex + 1 : targetColIndex)]);
            // Shift col data attributes for cells to the right
            for (let i = targetColIndex + 1; i < rowEl.cells.length; i++) {
                const cell = rowEl.cells[(settings.enableRowNumbers ? i + 1 : i)];
                if (cell && cell.dataset.col) {
                    cell.dataset.col = i.toString();
                }
            }
        });
        this.assertColDataset(table);
        // Focus first cell of the newly added column in the first body row
        const firstBodyRow = table.tBodies[0].rows[0];
        if (firstBodyRow) {
            const domCol = settings.enableRowNumbers ? targetColIndex + 1 : targetColIndex;
            const focusCell = firstBodyRow.cells[domCol];
            if (focusCell) {
                this.removeCellFocus(table);
                this.addCellFocus(focusCell, true);
            }
        }
        const deCoupledColModel = decoupleReference(newColModel);
        this.parent.undoRedoAction.trackTableColumnInsertionForUndoRedo({
            blockId, colIndex: targetColIndex, columnModel: deCoupledColModel, columnCells: newColCells, isUndoRedoAction
        });
        this.triggerBlockUpdate(block, oldBlock);
    }
    /**
     * Deletes a row from the table at the given DOM/visual row index.
     * Updates model, DOM, row numbers, and dataset attributes.
     *
     * @param {ITableRowDeletionOptions} options - arguments needed for row deletion in specified index.
     * @returns {void}
     *
     * @hidden
     */
    deleteRowAt(options) {
        const { blockId, modelIndex, isUndoRedoAction } = options;
        const oldBlock = decoupleReference(getBlockModelById(blockId, this.parent.getEditorBlocks()));
        const blockElement = this.parent.getBlockElementById(blockId);
        const table = blockElement.querySelector('table');
        const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        const props = block.properties;
        const tbody = table.tBodies[0];
        if (modelIndex < 0 || modelIndex >= props.rows.length) {
            return;
        }
        const rowModel = props.rows[modelIndex];
        props.rows.splice(modelIndex, 1);
        const rowEl = tbody.rows[modelIndex];
        const previousRowEle = rowEl.previousElementSibling;
        this.removeCellFocus(table);
        if (rowEl) {
            rowEl.remove();
        }
        Array.from(tbody.rows).forEach((row, rIdx) => {
            row.dataset.row = props.enableHeader ? (rIdx + 1).toString() : rIdx.toString();
            Array.from(row.cells).forEach((cell) => {
                if (cell.tagName === 'TD') {
                    const vis = props.enableHeader ? rIdx + 1 : rIdx;
                    cell.dataset.row = vis.toString();
                    cell.setAttribute('aria-rowindex', (rIdx + 1).toString());
                }
            });
        });
        if (tbody.rows.length > 0) {
            this.addCellFocus(tbody.rows[modelIndex - (modelIndex > 0 ? 1 : 0)].cells[0], true);
        }
        else {
            if (props.enableHeader) {
                const headerRow = table.querySelector('thead tr');
                const firstHeaderCell = headerRow.cells[props.enableRowNumbers ? 1 : 0];
                this.addCellFocus(firstHeaderCell, true);
            }
            else {
                const nextBlock = blockElement.nextElementSibling;
                const previousBlock = blockElement.previousElementSibling;
                this.parent.setFocusToBlock(nextBlock || previousBlock);
            }
        }
        this.updateRowNumbers(table, props);
        const deCoupledRowModel = decoupleReference(rowModel);
        this.parent.undoRedoAction.trackTableRowDeletionForUndoRedo({
            blockId, rowIndex: modelIndex, rowModel: deCoupledRowModel, isUndoRedoAction
        });
        this.triggerBlockUpdate(block, oldBlock);
    }
    /**
     * Deletes a column from the table at the given data column index.
     * Updates model, colgroup, DOM cells, and dataset attributes.
     *
     * @param {HTMLTableElement} options - The table element
     * @returns {void}
     *
     * @hidden
     */
    deleteColumnAt(options) {
        const { blockId, colIndex, isUndoRedoAction } = options;
        const oldBlock = decoupleReference(getBlockModelById(blockId, this.parent.getEditorBlocks()));
        const blockElement = this.parent.getBlockElementById(blockId);
        const table = blockElement.querySelector('table');
        const tbody = table.tBodies[0];
        const rowElToUpdateCellFocus = tbody.rows[0];
        const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        const props = block.properties;
        const colModel = props.columns[colIndex];
        const deletedColCells = [];
        const mode = getWidthMode(table);
        // Model
        props.columns.splice(colIndex, 1);
        props.rows.forEach((r) => {
            if (r.cells[colIndex]) {
                deletedColCells.push(decoupleReference(r.cells[colIndex]));
                r.cells.splice(colIndex, 1);
            }
        });
        //DOM
        this.removeCellFocus(table);
        const colgroup = table.querySelector('colgroup');
        const colChildren = Array.from(colgroup.children).filter((col) => !col.classList.contains('e-col-row-number'));
        if (colChildren[colIndex]) {
            colgroup.removeChild(colChildren[colIndex]);
        }
        if (mode === 'percent') {
            // Stay in percent: redistribute equally after deletion
            applyEqualPercent(table, props);
        }
        else {
            changeColWidthToPxUnits(table, props);
        }
        Array.from(table.rows).forEach((row) => {
            const cells = Array.from(row.cells).filter((cell) => !cell.classList.contains('e-row-number'));
            const indexToDelete = Array.from(row.cells).indexOf(cells[colIndex]);
            if (indexToDelete >= 0) {
                row.deleteCell(indexToDelete);
            }
            // Shift col data attributes for cells to the right
            for (let i = colIndex; i < row.cells.length; i++) {
                const cell = row.cells[(props.enableRowNumbers ? i + 1 : i)];
                if (cell && cell.dataset.col) {
                    cell.dataset.col = i.toString();
                }
            }
        });
        this.assertColDataset(table);
        const uiManager = this.parent.blockRenderer.tableRenderer.getManager(blockId);
        if (uiManager) {
            uiManager.hideAllPinnedColBars(); // Removes all .e-col-action-handle.e-pinned
            uiManager.removeRowColSelection(table);
        }
        this.addCellFocus(rowElToUpdateCellFocus.cells[colIndex], true);
        this.updateDataColCount(table, true);
        const deCoupledColModel = decoupleReference(colModel);
        this.parent.undoRedoAction.trackTableColumnDeletionForUndoRedo({
            blockId, colIndex: colIndex, columnModel: deCoupledColModel, columnCells: deletedColCells, isUndoRedoAction
        });
        this.triggerBlockUpdate(block, oldBlock);
    }
    assertColDataset(table) {
        Array.from(table.rows).forEach((row) => {
            const dataCells = Array.from(row.cells).filter((cell) => !cell.classList.contains('e-row-number'));
            dataCells.forEach((cell, dataColIdx) => {
                cell.dataset.col = dataColIdx.toString();
            });
        });
    }
    /**
     * Clears the content of specified table cells (model + DOM).
     *
     * @param {HTMLTableElement} table - The table element
     * @param {HTMLTableCellElement[]} domCells - Collection of table cell elements to clear contents
     * @returns {void}
     *
     * @hidden
     */
    clearCellContents(table, domCells) {
        const blockId = table.getAttribute('data-block-id');
        const oldBlock = decoupleReference(getBlockModelById(blockId, this.parent.getEditorBlocks()));
        const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        const props = block.properties;
        const payloadCells = Array.from(domCells).map((cell) => {
            if (!cell || cell.classList.contains('e-row-number')) {
                return { dataRow: -1, dataCol: -1, prevBlocks: [] };
            }
            const domRow = parseInt(cell.dataset.row, 10);
            const domCol = parseInt(cell.dataset.col, 10);
            const dataRow = props.enableHeader ? domRow - 1 : domRow;
            const dataCol = domCol;
            // Header
            if (domRow === 0 && props.enableHeader && cell.tagName === 'TH') {
                const prevHeaderText = props.columns[dataCol].headerText;
                return { dataRow: -1, dataCol, prevBlocks: [], prevHeaderText, isHeader: true };
            }
            // Body
            const prevBlocks = props.rows[dataRow].cells[dataCol].blocks.map((b) => (Object.assign({}, b)));
            return { dataRow, dataCol, prevBlocks };
        });
        payloadCells.forEach((cell) => this.applyCellChange(table, cell, 'clear'));
        this.parent.undoRedoAction.trackTableCellsClearForUndoRedo({ blockId, cells: payloadCells });
        this.triggerBlockUpdate(block, oldBlock);
    }
    applyCellChange(table, cell, mode) {
        if (cell.isHeader) {
            const headerText = mode === 'restore' ? (cell.prevHeaderText) : '';
            this.setHeaderText(table, cell.dataCol, headerText);
        }
        else {
            const blocks = mode === 'restore' ? (cell.prevBlocks) : [BlockFactory.createParagraphBlock()];
            this.setCellBlocks(table, cell.dataRow, cell.dataCol, blocks);
        }
    }
    /**
     * Replaces the blocks inside a specific table cell with the provided blocks.
     * Updates both the data model and the DOM cell content.
     *
     * @param {HTMLTableElement} table - The table element
     * @param {number} dataRowIndex - The data row index in the model (0-based, excludes header)
     * @param {number} dataColIndex - The data column index in the model (0-based, excludes row-number column)
     * @param {BlockModel[]} blocks - Array of blocks to set as cell content
     * @returns {void}
     *
     * @hidden
     */
    setCellBlocks(table, dataRowIndex, dataColIndex, blocks) {
        const blockId = table.getAttribute('data-block-id');
        const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        const props = block.properties;
        if (!props.rows[dataRowIndex] || !props.rows[dataRowIndex].cells[dataColIndex]) {
            return;
        }
        const cell = props.rows[dataRowIndex].cells[dataColIndex];
        cell.blocks = blocks && blocks.length
            ? BlockFactory.populateBlockProperties(blocks, cell.id)
            : [BlockFactory.createParagraphBlock({ parentId: cell.id })];
        const domColIndex = (props.enableRowNumbers ? dataColIndex + 1 : dataColIndex);
        const td = table.tBodies[0].rows[dataRowIndex].cells[domColIndex];
        if (!td) {
            return;
        }
        const container = td.querySelector('.' + TABLE_CELL_BLK_CONTAINER);
        if (container) {
            container.innerHTML = '';
        }
        cell.blocks.forEach((innerBlock) => {
            const innerEl = this.parent.blockRenderer.createBlockElement(innerBlock);
            container.appendChild(innerEl);
        });
    }
    /**
     * Sets the header content with the provided value
     * Updates both the data model and the DOM cell content.
     *
     * @param {HTMLTableElement} table - The table element
     * @param {number} dataColIndex - The data column index in the model (0-based, excludes row-number column)
     * @param {string} text - Value to set
     * @returns {void}
     *
     * @hidden
     */
    setHeaderText(table, dataColIndex, text) {
        const blockId = table.getAttribute('data-block-id');
        const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        const props = block.properties;
        if (!props.columns[dataColIndex]) {
            return;
        }
        // Model
        props.columns[dataColIndex].headerText = text;
        // DOM
        const th = table.querySelector(`th[data-col="${dataColIndex}"]`);
        th.textContent = text;
    }
    /**
     * Applies visual focus to a table cell and optionally focuses its inner editable block.
     *
     * @param {HTMLElement} cell - The <td> or <th> element to focus
     * @param {boolean} focusInnerBlock - If true, places caret inside the last block of the cell
     * @param {boolean} cursorAtStart - If true and focusing inner block, places cursor at start instead of end
     * @returns {void}
     *
     * @hidden
     */
    addCellFocus(cell, focusInnerBlock, cursorAtStart) {
        if (cell.classList.contains('e-row-number')) {
            // Find the next data cell in the same row
            const row = cell.closest('tr');
            if (row) {
                const next = Array.from(row.cells).find((cell) => !cell.classList.contains('e-row-number'));
                if (next) {
                    return this.addCellFocus(next, true);
                }
            }
            return;
        }
        cell.classList.add(TABLE_CELL_FOCUS);
        if (focusInnerBlock) {
            const tag = cell.tagName.toLowerCase();
            if (tag === 'td') {
                this.shiftFocusToBlockInCell(cell, cursorAtStart);
                return;
            }
            if (tag === 'th') {
                const pos = cursorAtStart ? 0 : (cell.textContent).length;
                this.parent.setFocusToBlock((cell.closest('.' + TABLE_BLOCK_CLS)));
                setCursorPosition(cell, pos);
            }
        }
    }
    /**
     * Removes the focus highlight from all cells in the given table.
     *
     * @param {Element} table - The table element or any element containing the table
     * @returns {void}
     *
     * @hidden
     */
    removeCellFocus(table) {
        removeFocusFromAllCells(table);
    }
    /**
     * Triggers the block update event.
     *
     * @param {BlockModel} block - the block with updated changes.
     * @param {BlockModel} oldBlock - old block
     * @returns {void}
     *
     * @hidden
     */
    triggerBlockUpdate(block, oldBlock) {
        this.parent.eventService.addChange({
            action: 'Update',
            data: {
                block: block,
                prevBlock: oldBlock
            }
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    }
    shiftFocusToBlockInCell(cell, cursorAtStart) {
        const innerBlockEl = cell.querySelector('.e-block:last-child');
        if (innerBlockEl) {
            const contentEl = getBlockContentElement(innerBlockEl);
            this.parent.setFocusToBlock(innerBlockEl);
            setCursorPosition(contentEl, cursorAtStart ? 0 : contentEl.textContent.length);
        }
    }
    setColumnWidth(colgroup, isAdd) {
        const colChildren = Array.from(colgroup.children).filter((col) => !col.classList.contains('e-col-row-number'));
        const totalCols = colChildren.length + (isAdd ? 1 : 0);
        const newWidth = 100 / totalCols + '%';
        colChildren.forEach((col) => {
            col.style.width = newWidth;
        });
        return newWidth;
    }
    createRowModel(settings) {
        const cells = settings.columns.map((column) => this.createTableCell(column.id));
        return { id: generateUniqueId('row_'), cells };
    }
    createColumnModel(newCount) {
        const newColId = generateUniqueId('col_');
        return { id: newColId, type: 'Text', headerText: `Column ${newCount}` };
    }
    updateDataColCount(table, isDeletion) {
        const currentCount = parseInt(table.getAttribute('data-col-counter'), 10);
        const newCount = currentCount + (isDeletion ? -1 : 1);
        table.setAttribute('data-col-counter', newCount.toString());
    }
    updateRowNumbers(table, settings) {
        if (!settings.enableRowNumbers) {
            return;
        }
        const tbody = table.tBodies[0];
        // Body rows: 1..n (independent of enableHeader)
        Array.from(tbody.rows).forEach((tr, i) => {
            const rnTd = tr.querySelector('td.e-row-number');
            if (rnTd) {
                rnTd.textContent = String(i + 1);
            }
        });
    }
    createTableCell(columnId) {
        const cellId = generateUniqueId('cell_');
        return {
            id: cellId,
            columnId: columnId,
            blocks: [BlockFactory.createParagraphBlock({ parentId: cellId })]
        };
    }
}

/**
 * Selection manager for the block editor.
 * This class handles the selection of blocks and text within blocks.
 * It also provides methods to save and restore the selection.
 *
 */
class NodeSelection {
    constructor(wrapper) {
        this.editorWrapper = wrapper;
    }
    /**
     * Saves the current selection state, supporting both single and multi-block selections
     *
     * @returns {void}
     */
    saveSelection() {
        const range = this.getRange();
        if (!range) {
            return;
        }
        this.currentRange = range.cloneRange();
        const startBlockElement = findClosestParent(range.startContainer, ('.' + BLOCK_CLS));
        const endBlockElement = findClosestParent(range.endContainer, ('.' + BLOCK_CLS));
        if (!startBlockElement || !endBlockElement) {
            return;
        }
        this.savedSelectionState = {
            startBlockId: startBlockElement.id,
            endBlockId: endBlockElement.id,
            startOffset: this.calculateOffset(range, getBlockContentElement(startBlockElement), true),
            endOffset: this.calculateOffset(range, getBlockContentElement(endBlockElement), false)
        };
    }
    /**
     * Restores the previously saved selection
     *
     * @returns {void}
     */
    restoreSelection() {
        if (!this.savedSelectionState) {
            return;
        }
        const startBlockElement = this.editorWrapper.querySelector('#' + this.savedSelectionState.startBlockId);
        const endBlockElement = this.editorWrapper.querySelector('#' + this.savedSelectionState.endBlockId);
        const startInfo = this.findNodeAndOffsetFromTextPosition(getBlockContentElement(startBlockElement), this.savedSelectionState.startOffset);
        const endInfo = this.findNodeAndOffsetFromTextPosition(getBlockContentElement(endBlockElement), this.savedSelectionState.endOffset);
        this.createRangeWithOffsets(startInfo.node, endInfo.node, startInfo.offset, endInfo.offset);
    }
    /**
     * Calculates offset within the selection
     *
     * @param {Range} globalRange The global selection range
     * @param {HTMLElement} contentElement The content element
     * @param {boolean} isStart Specifies whether it is start block
     * @returns {number} The calculated offset value
     */
    calculateOffset(globalRange, contentElement, isStart) {
        const node = isStart ? globalRange.startContainer : globalRange.endContainer;
        const offset = isStart ? globalRange.startOffset : globalRange.endOffset;
        const range = document.createRange();
        range.selectNodeContents(contentElement);
        range.setEnd(node, offset);
        return range.toString().length;
    }
    /**
     * Finds the DOM node and offset that corresponds to a text position
     *
     * @param {HTMLElement} container The container to search in
     * @param {number} targetOffset The character offset to find
     * @returns {object|null} Object with node and offset, or null if not found
     */
    findNodeAndOffsetFromTextPosition(container, targetOffset) {
        if (!container) {
            return null;
        }
        const treeWalker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
        let currentOffset = 0;
        let currentNode = treeWalker.nextNode();
        while (currentNode) {
            const nodeLength = currentNode.textContent.length;
            if (currentOffset + nodeLength >= targetOffset) {
                return {
                    node: currentNode,
                    offset: targetOffset - currentOffset
                };
            }
            currentOffset += nodeLength;
            currentNode = treeWalker.nextNode();
        }
        return { node: container, offset: 0 };
    }
    /**
     * Gets the current selection
     *
     * @returns {Selection | null} The current selection or null
     * @hidden
     */
    getSelection() {
        return window.getSelection();
    }
    /**
     * Clears the current selection in the editor
     *
     * @returns {void}
     * @hidden
     */
    clearSelection() {
        const sel = this.getSelection();
        sel.removeAllRanges();
    }
    /**
     * Gets the stored range
     *
     * @returns {Range | null} The stored range or null
     * @hidden
     */
    getStoredRange() {
        return this.currentRange;
    }
    /**
     * Gets the stored backup range
     *
     * @returns {RangePath} The stored range or null
     * @hidden
     */
    getStoredBackupRange() {
        return this.rangeBackup;
    }
    /**
     * Stores the current range
     *
     * @returns {void}
     * @hidden
     */
    storeCurrentRange() {
        this.currentRange = this.getRange();
        this.rangeBackup = {
            startContainer: this.currentRange.startContainer,
            startOffset: this.currentRange.startOffset,
            endContainer: this.currentRange.endContainer,
            endOffset: this.currentRange.endOffset,
            contentElement: findClosestParent(this.currentRange.startContainer, '.' + CONTENT_CLS)
        };
    }
    /**
     * Gets the current range
     *
     * @returns {Range | null} The current range or null
     * @hidden
     */
    getRange() {
        const selection = window.getSelection();
        return selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    }
    /**
     * Gets the position of the current selection
     *
     * @returns {Object} Position object with x and y coordinates
     * @hidden
     */
    getSelectionPosition() {
        const range = this.getRange();
        if (!range) {
            return { x: 0, y: 0 };
        }
        const rect = range.getBoundingClientRect();
        return {
            x: rect.left,
            y: rect.bottom + window.scrollY + 10 // 10px below selection
        };
    }
    /**
     * Checks if the current selection is collapsed (cursor only)
     *
     * @returns {boolean} True if selection is collapsed
     * @hidden
     */
    isCollapsed() {
        const selection = this.getSelection();
        return !selection || selection.isCollapsed;
    }
    /**
     * Gets the selected text
     *
     * @returns {string} Selected text or empty string
     * @hidden
     */
    getSelectedText() {
        const selection = this.getSelection();
        return selection ? selection.toString() : '';
    }
    /**
     * Creates a range with the specified start, end nodes and offsets.
     *
     * @param {Node} startNode - The start node of the range.
     * @param {Node} endNode - The end node of the range.
     * @param {number} startOffset - The start offset of the range.
     * @param {number} endOffset - The end offset of the range.
     *
     * @returns {void} - Returns void
     * @hidden
     */
    createRangeWithOffsets(startNode, endNode, startOffset, endOffset) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset);
        selection.removeAllRanges();
        selection.addRange(range);
        return range;
    }
    /**
     * Checks if selection contains or intersects with a specific node type
     *
     * @param {string} tagName - The tag name to check for.
     * @param {HTMLElement} container - The container to search within.
     * @returns {boolean} True if selection contains or intersects with the specified tag.
     * @hidden
     */
    selectionContainsNodeType(tagName, container) {
        const selection = this.getSelection();
        if (!selection) {
            return false;
        }
        const range = selection.getRangeAt(0);
        const nodes = container.querySelectorAll(tagName);
        for (let i = 0; i < nodes.length; i++) {
            if (range.intersectsNode(nodes[parseInt(i.toString(), 10)])) {
                return true;
            }
        }
        return false;
    }
    /**
     * Gets a node of specific type from the current selection
     *
     * @param {string} tagName - The tag name of the node to find.
     * @returns {HTMLElement | null} The found node or null if not found.
     * @hidden
     */
    getNodeFromSelection(tagName) {
        const selection = this.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return null;
        }
        const range = selection.getRangeAt(0);
        const commonAncestor = range.commonAncestorContainer;
        if (commonAncestor.nodeType === Node.ELEMENT_NODE &&
            commonAncestor.tagName.toLowerCase() === tagName.toLowerCase()) {
            return commonAncestor;
        }
        if (commonAncestor.nodeType === Node.TEXT_NODE &&
            commonAncestor.parentElement &&
            commonAncestor.parentElement.tagName.toLowerCase() === tagName.toLowerCase()) {
            return commonAncestor.parentElement;
        }
        if (commonAncestor.nodeType === Node.ELEMENT_NODE) {
            return commonAncestor.querySelector(tagName);
        }
        const startContainer = range.startContainer;
        const endContainer = range.endContainer;
        if (startContainer && endContainer) {
            const startElement = startContainer.nodeType === Node.ELEMENT_NODE
                ? startContainer
                : startContainer.parentElement;
            const endElement = endContainer.nodeType === Node.ELEMENT_NODE
                ? endContainer
                : endContainer.parentElement;
            return (startElement.closest(tagName) || endElement.closest(tagName));
        }
        return null;
    }
    /**
     * Checks whether the entire editor is selected or not.
     *
     * @returns {boolean} - Returns true if the entire editor is selected, otherwise false.
     * @hidden
     */
    checkIsEntireEditorSelected() {
        const selection = this.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return false;
        }
        const range = getSelectedRange();
        if (!range) {
            return false;
        }
        const firstBlockElement = this.editorWrapper.firstElementChild;
        const lastBlockElement = this.editorWrapper.lastElementChild;
        const firstBlockContent = getBlockContentElement(firstBlockElement);
        const lastBlockContent = getBlockContentElement(lastBlockElement);
        const startContainer = range.startContainer;
        const endContainer = range.endContainer;
        const isFirstBlockEmpty = firstBlockContent.textContent.trim() === '';
        const isLastBlockEmpty = lastBlockContent.textContent.trim() === '';
        const firstBlockStartNode = firstBlockContent.childNodes[0];
        const lastBlockEndNode = lastBlockContent.childNodes[lastBlockContent.childNodes.length - 1];
        // Selection performed using selectAll method
        if (startContainer.nodeType === Node.ELEMENT_NODE && endContainer.nodeType === Node.ELEMENT_NODE &&
            startContainer.classList.contains(BLOCK_CONTAINER_CLS) &&
            endContainer.classList.contains(BLOCK_CONTAINER_CLS)) {
            return true;
        }
        const isEqualsStartContainer = (firstBlockStartNode && firstBlockStartNode.contains(startContainer) ||
            isFirstBlockEmpty && firstBlockElement.contains(startContainer));
        const isEqualsEndContainer = (lastBlockEndNode && lastBlockEndNode.contains(endContainer) ||
            isLastBlockEmpty && lastBlockElement.contains(endContainer));
        return (isEqualsStartContainer &&
            isEqualsEndContainer &&
            range.startOffset === 0 &&
            range.endOffset === endContainer.textContent.length);
    }
}

/**
 * `Popup renderer` module is used to render popup in BlockEditor.
 *
 * @hidden
 */
class PopupRenderer {
    constructor(manager) {
        this.parent = manager;
        this.editorElement = this.parent.rootEditorElement;
    }
    /**
     * Renders popup in BlockEditor.
     *
     * @param {IPopupRenderOptions} args - specifies  the arguments.
     * @returns {Popup} - returns the popup object.
     * @hidden
     */
    renderPopup(args) {
        let element = args.element;
        if (typeof element == 'string') {
            element = document.querySelector(element);
        }
        const popupObj = new Popup(element, {
            targetType: 'relative',
            relateTo: args.relateTo || this.editorElement,
            content: args.content,
            collision: { X: 'fit', Y: 'fit' },
            actionOnScroll: 'hide',
            showAnimation: {
                name: 'FadeIn'
            },
            width: args.width,
            height: args.height
        });
        popupObj.hide();
        return popupObj;
    }
    /**
     * Adjusts the popup position relative to the target element.
     *
     * @param {HTMLElement | Range} target - specifies the target element.
     * @param {Popup | Dialog} popup - specifies the popup object.
     * @returns {void}
     * @hidden
     */
    adjustPopupPositionRelativeToTarget(target, popup) {
        const isInlineTbar = popup.element.classList.contains('e-blockeditor-inline-toolbar-popup');
        const isblkActionPopup = popup.element.classList.contains('e-blockeditor-blockaction-popup');
        const isTableGripperPopup = popup.element.classList.contains('e-table-gripper-action-popup');
        const isImageUploadPopup = popup.element.classList.contains('e-image-upload-popup');
        if (isblkActionPopup) {
            this.positionBlockActionPopup(target, popup);
        }
        else if (isInlineTbar) {
            this.positionInlineToolbar(target, popup);
        }
        else if (isTableGripperPopup) {
            this.positionTableGripperActionPopup(target, popup);
        }
        else if (isImageUploadPopup) {
            this.positionImageUploadPopup(target, popup);
        }
    }
    positionBlockActionPopup(target, popup) {
        addClass([popup.element], 'e-be-action-popup-hide');
        const targetRect = target.getBoundingClientRect();
        const popupRect = popup.element.getBoundingClientRect();
        const editorRect = getElementRect(this.editorElement);
        const editorScrollTop = this.editorElement.scrollTop || 0;
        const adjustedX = targetRect.left - editorRect.left;
        let adjustedY = targetRect.top + editorScrollTop - editorRect.top + 30;
        // To position popup above the drag icon when it overflows out of editor.
        if (targetRect.bottom + popupRect.height > editorRect.bottom) {
            adjustedY = adjustedY - popupRect.height - targetRect.height - 15;
        }
        popup.position.X = adjustedX;
        popup.position.Y = adjustedY;
        removeClass([popup.element], 'e-be-action-popup-hide');
        popup.dataBind();
    }
    /**
     * Positions the image upload popup relative to the placeholder element.
     * The popup will appear below the placeholder if there's space, otherwise above.
     * Handles scroll offsets correctly.
     *
     * @param {HTMLElement} target - The placeholder element (target for positioning)
     * @param {Popup} popup - The image upload popup object
     * @returns {void}
     * @private
     */
    positionImageUploadPopup(target, popup) {
        // Hide popup temporarily while calculating position
        addClass([popup.element], 'e-image-popup-hide');
        // Get the block element (parent of placeholder)
        const blockElement = target.closest('.e-block');
        if (!blockElement || !target) {
            return;
        }
        // Get dimensions and positions
        const blockRect = blockElement.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const popupRect = popup.element.getBoundingClientRect();
        const editorRect = getElementRect(this.editorElement);
        const viewportHeight = window.innerHeight;
        // Calculate scroll offset
        const editorScrollTop = this.editorElement.scrollTop || 0;
        // Calculate relative X position (align with left edge of block)
        const adjustedX = targetRect.left - editorRect.left;
        // Calculate space available below and above the block
        const spaceBelow = viewportHeight - blockRect.bottom;
        const spaceAbove = blockRect.top;
        // Determine Y position based on available space
        let adjustedY;
        const popupOffset = 4; // Gap between block and popup
        if (spaceBelow >= popupRect.height || spaceBelow >= spaceAbove) {
            // Position below the block
            adjustedY = targetRect.bottom - editorRect.top + editorScrollTop + popupOffset;
        }
        else {
            // Position above the block
            adjustedY = targetRect.top - editorRect.top + editorScrollTop - popupRect.height - popupOffset;
        }
        // Set popup position
        popup.position.X = adjustedX;
        popup.position.Y = adjustedY;
        // Show popup and apply position
        removeClass([popup.element], 'e-image-popup-hide');
        popup.dataBind();
    }
    positionInlineToolbar(target, popup) {
        addClass([popup.element], 'e-be-inline-tlbr-hide');
        const popupRect = popup.element.getBoundingClientRect();
        const relativeElem = this.parent.currentFocusedBlock;
        if (isNullOrUndefined(relativeElem)) {
            return;
        }
        const selection = this.parent.nodeSelection.getSelection();
        const clientRects = target.getClientRects();
        const direction = this.getSelectionDirection(selection);
        const rangeDomRect = clientRects.length === 0 ? target.getBoundingClientRect() :
            direction === 'Backward' ? clientRects[0] : clientRects[clientRects.length - 1];
        const offsetCalculationParam = {
            blockElement: relativeElem,
            blockRect: relativeElem.getBoundingClientRect(),
            range: target,
            rangeRect: rangeDomRect,
            direction: direction,
            contentPanelElement: this.parent.rootEditorElement,
            editPanelDomRect: this.parent.blockContainer.getBoundingClientRect(),
            popupRect: popupRect
        };
        const offsetX = this.calculateOffsetX(offsetCalculationParam);
        const offsetY = this.calculateOffsetY(offsetCalculationParam);
        let positionProps = {
            positionX: offsetX,
            positionY: offsetY
        };
        positionProps = this.handleVerticalCollision(offsetCalculationParam, positionProps);
        const popupProps = {
            offsetX: positionProps.positionX,
            offsetY: positionProps.positionY,
            relateTo: relativeElem
        };
        removeClass([popup.element], 'e-be-inline-tlbr-hide');
        popup.setProperties(popupProps);
        popup.dataBind();
    }
    // To calculate the popup offsetX position based on the range and block element position.
    calculateOffsetX(args) {
        const width = args.popupRect.width;
        let finalX;
        const buffer = 16.5; // A small gap between selection and popup
        const rangeEdge = args.direction === 'Backward' ? args.rangeRect.left : args.rangeRect.right;
        const relativePosition = rangeEdge - args.blockRect.left;
        if (relativePosition < width / 4) {
            finalX = relativePosition - buffer;
        }
        else if (relativePosition > width / 4 && relativePosition < width / 2) {
            finalX = relativePosition - width / 4;
        }
        else if (relativePosition > width / 2 && relativePosition < (width * 3 / 4)) {
            finalX = relativePosition - width / 2;
        }
        else if (relativePosition > (width * 3 / 4) && relativePosition < width) {
            finalX = relativePosition - (width * 3 / 4);
        }
        else {
            finalX = relativePosition - width + buffer;
        }
        return finalX;
    }
    // To calculate the popup offsetY position based on the range and block element position.
    calculateOffsetY(args) {
        const finalY = args.rangeRect.bottom - args.blockRect.top + 6;
        return finalY;
    }
    getSelectionDirection(selection) {
        if (selection && selection.rangeCount > 0 && selection.getRangeAt(0).collapsed) {
            return 'Forward';
        }
        const range = new Range();
        range.setStart(selection.anchorNode, selection.anchorOffset);
        range.setEnd(selection.focusNode, selection.focusOffset);
        if (range.collapsed) {
            return 'Backward';
        }
        else {
            return 'Forward';
        }
    }
    handleVerticalCollision(offsetParams, positionProps) {
        const scrollTopParentElement = this.parent.scrollParentElements && this.parent.scrollParentElements.length > 0 &&
            this.parent.scrollParentElements[0].nodeName !== '#document' ? this.parent.scrollParentElements[0] : this.parent.rootEditorElement;
        const scrollParentRect = scrollTopParentElement.getBoundingClientRect();
        const blockRect = offsetParams.blockRect;
        const topViewPortSpace = blockRect.top;
        const botViewPortSpace = blockRect.bottom;
        const spaceAbove = this.getSpaceAbove(offsetParams, scrollParentRect);
        const spaceBelow = this.getSpaceBelow(offsetParams, scrollParentRect);
        const totalPopupHeight = (10 + offsetParams.popupRect.height); // 10 si for tip pointer height
        const isTopPosition = this.isElemVisible(blockRect, 'top') && spaceAbove > totalPopupHeight && topViewPortSpace > totalPopupHeight;
        const isBotPosition = offsetParams.direction === 'Backward' && isTopPosition ? false : this.isElemVisible(blockRect, 'bottom') && spaceBelow > totalPopupHeight && botViewPortSpace > totalPopupHeight;
        if (isBotPosition) {
            return positionProps; // Default Bottom position no need to change offset.
        }
        else if (isTopPosition) {
            positionProps.positionY = -(offsetParams.popupRect.height + 10) + (offsetParams.rangeRect.top - offsetParams.blockRect.top);
        }
        return positionProps;
    }
    getSpaceAbove(args, scrollParentRect) {
        let spaceAbove;
        const blockRect = args.blockRect;
        const parentRect = args.editPanelDomRect;
        const collision = this.getTopCollisionType(blockRect, parentRect, scrollParentRect);
        switch (collision) {
            case 'ParentElement':
                spaceAbove = blockRect.top - parentRect.top;
                break;
            case 'ScrollableContainer':
                spaceAbove = scrollParentRect.top - parentRect.top;
                break;
            case 'ViewPort':
            case 'Hidden':
                spaceAbove = blockRect.top;
                break;
        }
        return spaceAbove;
    }
    getSpaceBelow(args, scrollParentRect) {
        let spaceBelow;
        const blockRect = args.blockRect;
        const parentRect = args.editPanelDomRect;
        const collision = this.getBottomCollisionType(blockRect, parentRect, scrollParentRect);
        switch (collision) {
            case 'Hidden':
            case 'ParentElement':
                spaceBelow = parentRect.bottom - blockRect.bottom;
                break;
            case 'ScrollableContainer':
                spaceBelow = scrollParentRect.bottom - blockRect.bottom;
                break;
            case 'ViewPort':
                spaceBelow = window.innerHeight - blockRect.bottom;
                break;
        }
        if ((window.innerHeight - blockRect.bottom) < (args.popupRect.height + 10)) { // check this 10 is tip pointer height
            spaceBelow = 0;
        }
        return spaceBelow;
    }
    getTopCollisionType(blockRect, parentRect, scrollParentRect) {
        if (blockRect.top < 0 || blockRect.top >= window.innerHeight) {
            return 'Hidden';
        }
        else {
            if (parentRect.top > 0) {
                return 'ParentElement';
            }
            else {
                if (scrollParentRect.top < 0) {
                    return 'ViewPort';
                }
                if (scrollParentRect.top > 0) {
                    return 'ScrollableContainer';
                }
            }
        }
        return 'ParentElement';
    }
    getBottomCollisionType(blockRect, parentRect, scrollParentRect) {
        if (blockRect.bottom < 0 || blockRect.bottom >= window.innerHeight) {
            return 'Hidden';
        }
        else {
            if (scrollParentRect.bottom >= window.innerHeight && parentRect.bottom >= window.innerHeight) {
                return 'ViewPort';
            }
            else {
                if (parentRect.bottom <= scrollParentRect.bottom) {
                    return 'ParentElement';
                }
                else {
                    return 'ScrollableContainer';
                }
            }
        }
    }
    // Returns true when the eleemnt is partially visible. Returns false when the element is not fully visible.
    isElemVisible(elemRect, value) {
        if (value === 'top') {
            return elemRect.top >= 0 && elemRect.top <= window.innerHeight;
        }
        else {
            return elemRect.bottom <= window.innerHeight && elemRect.bottom >= 0;
        }
    }
    positionTableGripperActionPopup(target, popup) {
        addClass([popup.element], 'e-be-gripper-action-popup-hide');
        const isColumnGripper = target.classList.contains('e-col-action-handle');
        const popupRect = popup.element.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const editorRect = this.editorElement.getBoundingClientRect();
        const scrollTop = this.editorElement.scrollTop;
        const offsetX = (targetRect.left - editorRect.left) + (isColumnGripper ? (targetRect.width / 2 - popupRect.width / 2) : 0);
        const offsetY = targetRect.top + scrollTop - editorRect.top - popupRect.height - 5;
        popup.position.X = offsetX;
        popup.position.Y = offsetY;
        removeClass([popup.element], 'e-be-gripper-action-popup-hide');
        popup.dataBind();
    }
    destroyPopup(popup) {
        if (popup) {
            popup.destroy();
            popup.element.remove();
        }
    }
}

/**
 * `SlashCommandModule` module is used to handle the slash command actions in the BlockEditor.
 *
 * @hidden
 */
class SlashCommandModule$1 {
    constructor(manager) {
        this.isPopupOpened = false;
        this.shortcutMap = new Map();
        this.parent = manager;
        this.addEventListeners();
    }
    addEventListeners() {
        this.parent.observer.on(events.keydown, this.onKeyDown, this);
        this.parent.observer.on('slashMenuCreated', this.handleSlashMenuCreated, this);
        this.parent.observer.on('slashCommandChange', this.handleSlashCommandChange, this);
        this.parent.observer.on('updateSlashMenuPopupState', this.updateSlashMenuPopupState, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.parent.observer.off(events.keydown, this.onKeyDown);
        this.parent.observer.off('slashMenuCreated', this.handleSlashMenuCreated);
        this.parent.observer.off('slashCommandChange', this.handleSlashCommandChange);
        this.parent.observer.off('updateSlashMenuPopupState', this.updateSlashMenuPopupState);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    handleSlashMenuCreated() {
        this.buildShortcutMap();
    }
    buildShortcutMap() {
        this.shortcutMap.clear();
        this.parent.commandMenuSettings.commands.forEach((item) => {
            this.shortcutMap.set(item.shortcut.toLowerCase(), item);
        });
    }
    onKeyDown(e) {
        const normalizedKey = getNormalizedKey(e);
        if (!normalizedKey) {
            return;
        }
        const commandItem = this.shortcutMap.get(normalizedKey);
        if (commandItem) {
            e.preventDefault();
            this.transformBlocks(commandItem);
        }
    }
    handleSlashCommandChange(args) {
        this.transformBlocks(args.itemData);
    }
    getHeadingProps(itemId) {
        const extractedType = itemId.replace('-command', '');
        const level = parseInt(extractedType.slice(-1), 10);
        return { level };
    }
    transformBlocks(commandItem) {
        const selectedItem = commandItem.type;
        if (!selectedItem || !this.parent.currentFocusedBlock) {
            return;
        }
        const isHeadingType = selectedItem === BlockType.Heading || selectedItem === BlockType.CollapsibleHeading;
        const headingProps = isHeadingType ? this.getHeadingProps(commandItem.id) : undefined;
        this.parent.blockCommand.transformBlocksForSelection(selectedItem, headingProps);
    }
    updateSlashMenuPopupState(options) {
        this.isPopupOpened = options.isOpen;
        if (!options.isOpen) {
            this.parent.isPopupOpenedOnAddIconClick = false;
        }
    }
    /**
     * Checks whether the slash command popup is opened or not.
     *
     * @returns {boolean} - Returns true if the slash command popup is opened, otherwise false.
     * @hidden
     */
    isPopupOpen() {
        const mentionPopupId = `${this.parent.blockContainer.id}_popup`;
        const commandPopupElement = document.querySelector(`#${mentionPopupId}.e-blockeditor-command-menu`);
        return this.isPopupOpened && (commandPopupElement && commandPopupElement.classList.contains('e-popup-open'));
    }
    /**
     * Hides the slash command popup.
     *
     * @returns {void}
     * @hidden
     */
    hidePopup() {
        this.parent.observer.notify('hideSlashMenuPopup');
    }
    /**
     * Shows the slash command popup.
     *
     * @returns {void}
     * @hidden
     */
    showPopup() {
        this.parent.observer.notify('showSlashMenuPopup');
    }
    filterCommands(text, xOffset, yOffset) {
        this.parent.observer.notify('filterSlashCommands', { text, offsetX: xOffset, offsetY: yOffset });
    }
    /**
     * Destroys the slash command module.
     *
     * @returns {void}
     */
    destroy() {
        this.removeEventListeners();
        this.shortcutMap = null;
    }
}

/**
 * `ContextMenuModule` is used to handle the context menu actions in the BlockEditor.
 *
 * @hidden
 */
class ContextMenuModule$1 {
    constructor(manager) {
        this.isPopupOpened = false;
        this.isClipboardEmptyCache = true;
        this.shortcutMap = new Map();
        this.parent = manager;
        this.addEventListeners();
    }
    addEventListeners() {
        this.parent.observer.on(events.keydown, this.onKeyDown, this);
        this.parent.observer.on('contextMenuCreated', this.handleContextMenuCreated, this);
        this.parent.observer.on('contextMenuBeforeOpen', this.handleContextMenuBeforeOpen, this);
        this.parent.observer.on('updateContextMenuState', this.updateContextMenuPopupState, this);
        this.parent.observer.on('contextMenuSelection', this.handleContextMenuSelection, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.parent.observer.off(events.keydown, this.onKeyDown);
        this.parent.observer.off('contextMenuCreated', this.handleContextMenuCreated);
        this.parent.observer.off('contextMenuBeforeOpen', this.handleContextMenuBeforeOpen);
        this.parent.observer.off('updateContextMenuState', this.updateContextMenuPopupState);
        this.parent.observer.off('contextMenuSelection', this.handleContextMenuSelection);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    handleContextMenuCreated() {
        this.buildShortcutMap();
    }
    buildShortcutMap() {
        this.shortcutMap.clear();
        this.parent.contextMenuSettings.items.forEach((item) => {
            this.shortcutMap.set(item.shortcut.toLowerCase(), item);
        });
    }
    onKeyDown(e) {
        const normalizedKey = getNormalizedKey(e);
        if (!normalizedKey) {
            return;
        }
        const menuItem = this.shortcutMap.get(normalizedKey);
        if (menuItem && menuItem.id !== 'cut' && menuItem.id !== 'copy' && menuItem.id !== 'paste') {
            e.preventDefault();
            this.handleContextMenuActions(menuItem, e);
        }
    }
    handleContextMenuBeforeOpen(args) {
        if (!this.parent.currentFocusedBlock) {
            this.parent.setFocusAndUIForNewBlock(this.parent.currentHoveredBlock);
        }
        this.toggleDisabledItems();
        this.parent.blockActionMenuModule.toggleBlockActionPopup(true);
        this.parent.linkModule.hideLinkPopup();
        setTimeout(() => {
            if (this.parent.inlineToolbarModule) {
                this.parent.inlineToolbarModule.hideInlineToolbar(args.event);
            }
        }, 50);
    }
    updateContextMenuPopupState(value) {
        this.isPopupOpened = value.isOpen;
    }
    handleContextMenuSelection(args) {
        this.handleContextMenuActions(args.item, args.event);
    }
    handleIndentationAction(shouldDecrease) {
        this.parent.execCommand({ command: 'IndentBlock', state: {
                blockIDs: this.parent.editorMethods.getSelectedBlocks().map((block) => block.id),
                shouldDecrease
            } });
    }
    handleContextMenuActions(menuItem, e) {
        const prop = menuItem.id.toLowerCase();
        switch (prop) {
            case 'undo':
                this.parent.undoRedoAction.undo();
                break;
            case 'redo':
                this.parent.undoRedoAction.redo();
                break;
            case 'cut':
                this.parent.clipboardAction.handleContextCut();
                break;
            case 'copy':
                this.parent.clipboardAction.handleContextCopy();
                break;
            case 'paste':
                this.parent.clipboardAction.handleContextPaste();
                break;
            case 'link':
                this.parent.linkModule.showLinkPopup(e);
                break;
            case 'increaseindent':
            case 'decreaseindent':
                this.handleIndentationAction(prop === 'decreaseindent');
                break;
        }
    }
    toggleDisabledItems() {
        if (!getSelectedRange() || !this.parent.currentFocusedBlock) {
            return;
        }
        const blockModel = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        const tableBlk = this.parent.currentFocusedBlock.closest(`.${TABLE_BLOCK_CLS}`);
        const notAllowedTypes = [BlockType.Image, BlockType.Code];
        const isNotAllowedType = notAllowedTypes.indexOf(blockModel.blockType) !== -1;
        const previousBlockElement = getAdjacentBlock(this.parent.currentFocusedBlock, 'previous');
        const previousBlockModel = previousBlockElement
            ? getBlockModelById(previousBlockElement.id, this.parent.getEditorBlocks())
            : null;
        const canIndent = (!tableBlk && (!previousBlockModel ||
            (previousBlockModel && blockModel.indent <= previousBlockModel.indent) && !isNotAllowedType));
        const canOutdent = !tableBlk && (blockModel.indent > 0 && !isNotAllowedType);
        const isSelection = getSelectedRange().toString().trim().length > 0;
        const selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        const canAllowLink = isSelection && !isNotAllowedType && (selectedBlocks && selectedBlocks.length === 1);
        const menuState = {
            'increaseindent': canIndent,
            'decreaseindent': canOutdent,
            'undo': this.parent.undoRedoAction.canUndo(),
            'redo': this.parent.undoRedoAction.canRedo(),
            'link': canAllowLink,
            'cut': isSelection,
            'copy': isSelection,
            'paste': true
        };
        this.parent.observer.notify('enableDisableContextMenuItems', menuState);
    }
    /**
     * Checks whether the context menu is opened or not.
     *
     * @returns {boolean} - Returns true if the context menu is opened, otherwise false.
     * @hidden
     */
    isPopupOpen() {
        return this.isPopupOpened;
    }
    /**
     * Destroys the ContextMenu module.
     *
     * @returns {void}
     */
    destroy() {
        this.removeEventListeners();
        this.shortcutMap = null;
    }
}

/**
 * `BlockActionMenuModule` is used to handle the block action menu in the BlockEditor.
 *
 * @hidden
 */
class BlockActionMenuModule$1 {
    constructor(manager) {
        this.isPopupOpened = false;
        this.shortcutMap = new Map();
        this.parent = manager;
        this.addEventListeners();
    }
    addEventListeners() {
        this.parent.observer.on(events.keydown, this.onKeyDown, this);
        this.parent.observer.on('actionMenuCreated', this.handleMenuCreated, this);
        this.parent.observer.on('popupWidthChanged', this.handlePopupWidthChanges, this);
        this.parent.observer.on('popupHeightChanged', this.handlePopupHeightChanges, this);
        this.parent.observer.on('blockActionsMenuSelect', this.handleBlockActionMenuSelect, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.parent.observer.off(events.keydown, this.onKeyDown);
        this.parent.observer.off('actionMenuCreated', this.handleMenuCreated);
        this.parent.observer.off('popupWidthChanged', this.handlePopupWidthChanges);
        this.parent.observer.off('popupHeightChanged', this.handlePopupHeightChanges);
        this.parent.observer.off('blockActionsMenuSelect', this.handleBlockActionMenuSelect);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    handleMenuCreated() {
        this.menuWrapperElement = this.parent.rootEditorElement.querySelector(`.${BLOCKACTION_MENUBAR_CLS}`);
        this.init();
        this.buildShortcutMap();
    }
    init() {
        const popupElement = document.querySelector(`#${this.parent.rootEditorElement.id + BLOCKACTION_POPUP_ID}`);
        const args = {
            relateTo: this.parent.rootEditorElement,
            element: popupElement,
            content: this.menuWrapperElement,
            width: this.parent.blockActionMenuSettings.popupWidth,
            height: this.parent.blockActionMenuSettings.popupHeight
        };
        this.popupObj = this.parent.popupRenderer.renderPopup(args);
    }
    buildShortcutMap() {
        this.shortcutMap.clear();
        this.parent.blockActionMenuSettings.items.forEach((item) => {
            this.shortcutMap.set(item.shortcut.toLowerCase(), item);
        });
    }
    onKeyDown(e) {
        const normalizedKey = getNormalizedKey(e);
        const isTable = this.parent.currentFocusedBlock &&
            this.parent.currentFocusedBlock.closest(`.${TABLE_BLOCK_CLS}`);
        if (!normalizedKey || isTable) {
            return;
        }
        const actionItem = this.shortcutMap.get(normalizedKey);
        if (actionItem) {
            e.preventDefault();
            this.handleBlockActions(actionItem, this.parent.currentHoveredBlock, e);
        }
    }
    /**
     * Toggles the block action popup based on the provided flag.
     *
     * @param {boolean} shouldHide - Flag indicating whether to hide or show the popup.
     * @param {Event} e - Optional event object.
     * @returns {void}
     * @hidden
     */
    toggleBlockActionPopup(shouldHide, e) {
        setTimeout(() => {
            if (this.parent && this.parent.inlineToolbarModule) {
                this.parent.inlineToolbarModule.hideInlineToolbar();
            }
        }, 10);
        if (this.popupObj) {
            if (shouldHide) {
                const closeEventArgs = {
                    event: e,
                    items: this.parent.blockActionMenuSettings.items,
                    cancel: false,
                    callback: (args) => {
                        if (args.cancel) {
                            return;
                        }
                        this.parent.selectionOverlay.clearSelectionOverlay();
                        this.popupObj.hide();
                        this.isPopupOpened = false;
                    }
                };
                this.parent.observer.notify('blockActionsMenuClose', closeEventArgs);
            }
            else {
                const openEventArgs = {
                    event: e,
                    items: this.parent.blockActionMenuSettings.items,
                    cancel: false,
                    callback: (args) => {
                        if (args.cancel) {
                            return;
                        }
                        this.toggleDisabledItems(this.parent.currentHoveredBlock);
                        this.popupObj.show();
                        this.isPopupOpened = true;
                        setTimeout(() => {
                            const items = this.popupObj.element.querySelectorAll('.e-menu-item');
                            if (items.length > 0) {
                                items[0].focus();
                                items[0].classList.add('e-focused');
                            }
                        });
                    }
                };
                this.parent.observer.notify('blockActionsMenuOpen', openEventArgs);
            }
        }
    }
    getParentBlock(parentId) {
        return getBlockModelById(parentId, this.parent.getEditorBlocks());
    }
    isFirstChildBlock(block, parentBlock) {
        const children = parentBlock.properties.children;
        return (children.length > 0 && children[0].id === block.id);
    }
    isLastChildBlock(block, parentBlock) {
        const children = parentBlock.properties.children;
        return (children.length > 0 && children[children.length - 1].id === block.id);
    }
    toggleMenuItemClass(itemId, disable) {
        const listElement = this.popupObj.element.querySelector(`#${itemId}`);
        if (listElement) {
            listElement.classList.toggle(DISABLED_CLS, disable);
        }
    }
    getBlockPositionInfo(blockElement) {
        const allBlocks = this.parent.getEditorBlocks();
        const currentBlock = getBlockModelById(blockElement.id, allBlocks);
        const currentBlockParent = this.getParentBlock(currentBlock.parentId);
        const currentBlockIndex = getBlockIndexById(blockElement.id, allBlocks);
        const isFirstBlock = currentBlockIndex === 0;
        const isLastBlock = currentBlockIndex === (currentBlockParent
            ? currentBlockParent.properties.children.length - 1
            : allBlocks.length - 1);
        const hasOnlyOneBlock = allBlocks.length === 1;
        return { currentBlock, currentBlockParent, isFirstBlock, isLastBlock, hasOnlyOneBlock };
    }
    toggleDisabledItems(blockElement) {
        if (!blockElement) {
            return;
        }
        const selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        if (selectedBlocks && selectedBlocks.length > 1) {
            for (const item of this.parent.blockActionMenuSettings.items) {
                this.toggleMenuItemClass(item.id, true);
            }
            return;
        }
        const { currentBlock, currentBlockParent, isFirstBlock, isLastBlock, hasOnlyOneBlock } = this.getBlockPositionInfo(blockElement);
        for (const item of this.parent.blockActionMenuSettings.items) {
            let disable = item.disabled;
            switch (item.id) {
                case 'moveup':
                    disable = hasOnlyOneBlock || isFirstBlock;
                    if (currentBlockParent && this.isFirstChildBlock(currentBlock, currentBlockParent)) {
                        disable = true;
                    }
                    break;
                case 'movedown':
                    disable = hasOnlyOneBlock || isLastBlock;
                    if (currentBlockParent && this.isLastChildBlock(currentBlock, currentBlockParent)) {
                        disable = true;
                    }
                    break;
            }
            this.toggleMenuItemClass(item.id, disable);
        }
    }
    handleBlockActionMenuSelect(args) {
        this.handleBlockActions(args.item, this.parent.currentHoveredBlock, args.event);
    }
    handlePopupWidthChanges(data) {
        this.popupObj.width = this.parent.blockActionMenuSettings.popupWidth = data.value.toString();
    }
    handlePopupHeightChanges(data) {
        this.popupObj.height = this.parent.blockActionMenuSettings.popupWidth = data.value.toString();
    }
    handleBlockActions(item, blockElement, e) {
        const selectedItem = item.label.replace(' ', '').toLowerCase();
        let toBlockElement;
        let toBlockModel;
        switch (selectedItem) {
            case 'duplicate':
                this.parent.execCommand({ command: 'DuplicateBlock', state: {
                        blockElement, direction: 'below'
                    } });
                break;
            case 'delete': {
                const adjacentBlock = (blockElement.nextElementSibling || blockElement.previousElementSibling);
                if (adjacentBlock) {
                    this.parent.setFocusAndUIForNewBlock(adjacentBlock);
                }
                this.parent.execCommand({ command: 'DeleteBlock', state: { blockElement } });
                break;
            }
            case 'moveup':
            case 'movedown': {
                this.toggleDisabledItems(blockElement);
                if (!blockElement || this.isItemDisabled(item.id)) {
                    return;
                }
                toBlockElement = (selectedItem === 'moveup' ? blockElement.previousElementSibling : blockElement.nextElementSibling);
                if (toBlockElement) {
                    toBlockModel = getBlockModelById(toBlockElement.id, this.parent.getEditorBlocks());
                    this.parent.execCommand({ command: 'MoveBlock', state: {
                            fromBlockIds: [blockElement.id],
                            toBlockId: toBlockElement.id
                        } });
                }
                break;
            }
        }
        const currentBlockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        if ((currentBlockModel && isListTypeBlock(currentBlockModel.blockType)) ||
            (toBlockModel && isListTypeBlock(toBlockModel.blockType))) {
            this.parent.listPlugin.recalculateMarkersForListItems();
        }
        this.toggleBlockActionPopup(true, e);
    }
    isItemDisabled(itemId) {
        const listElement = this.popupObj.element.querySelector('#' + itemId);
        return listElement && listElement.classList.contains(DISABLED_CLS);
    }
    /**
     * Checks whether the block action popup is opened or not.
     *
     * @returns {boolean} - Returns true if the block action popup is opened, otherwise false.
     * @hidden
     */
    isPopupOpen() {
        return this.isPopupOpened;
    }
    destroy() {
        this.removeEventListeners();
        if (this.popupObj) {
            this.popupObj.destroy();
            detach(this.popupObj.element);
            this.popupObj = null;
        }
        this.shortcutMap = null;
    }
}

class FloatingIcon {
    /**
     * Creates a new FloatingIcon instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    constructor(manager) {
        this.parent = manager;
        this.wireGlobalEvents();
    }
    wireGlobalEvents() {
        this.parent.observer.on('floatingIconsCreated', this.handleFloatingIconsCreated, this);
        this.parent.observer.on('addIconClick', this.handleAddIconClick, this);
        this.parent.observer.on('dragIconClick', this.handleDragIconClick, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    unWireGlobalEvents() {
        this.parent.observer.off('floatingIconsCreated', this.handleFloatingIconsCreated);
        this.parent.observer.off('addIconClick', this.handleAddIconClick);
        this.parent.observer.off('dragIconClick', this.handleDragIconClick);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    handleFloatingIconsCreated() {
        this.floatingIconContainer = document.getElementById(`${this.parent.rootEditorElement.id}_floatingicons`);
        const addIcon = this.floatingIconContainer.querySelector('.e-floating-icon.e-block-add-icon');
        const dragIcon = this.floatingIconContainer.querySelector('.e-floating-icon.e-block-drag-icon');
        EventHandler.add(addIcon, 'click', this.handleAddIconClick, this);
        EventHandler.add(dragIcon, 'click', this.handleDragIconClick, this);
    }
    /**
     * Shows the floating icons
     *
     * @param {HTMLElement} target - The target element to show the floating icons for.
     * @returns {void}
     * @hidden
     */
    showFloatingIcons(target) {
        let blockElement = target;
        this.hideDragIconForEmptyBlock(blockElement);
        const calloutContent = blockElement.closest('.' + CALLOUT_CONTENT_CLS);
        const isToggleBlock = blockElement.classList.contains('e-toggle-block');
        const tableBlock = findClosestParent(target, '.' + TABLE_BLOCK_CLS);
        const quoteBlock = findClosestParent(target, '.' + QUOTE_BLOCK_CLS);
        if ((calloutContent && blockElement === calloutContent.firstElementChild && !tableBlock) ||
            !this.isFullyVisibleInEditor(blockElement) ||
            this.parent.readOnly) {
            // Do not show floating icons for the first child of a callout content block
            this.hideFloatingIcons();
            return;
        }
        updateCSSText(this.floatingIconContainer, 'display: flex;');
        blockElement = (isToggleBlock && !tableBlock)
            ? blockElement.querySelector('.e-toggle-header')
            : (tableBlock
                ? tableBlock
                : (quoteBlock ? quoteBlock : blockElement));
        const editorRect = getElementRect(this.parent.rootEditorElement);
        const blockElementRect = getElementRect(blockElement);
        const styles = window.getComputedStyle(blockElement);
        const floatingIconRect = this.floatingIconContainer.getBoundingClientRect();
        const marginTop = parseFloat(styles.marginTop) || 0;
        const marginLeft = parseFloat(styles.marginLeft) || 0;
        const paddingTop = parseFloat(styles.paddingTop) || 0;
        const paddingLeft = parseFloat(styles.paddingLeft) || 0;
        const editorScrollTop = this.parent.rootEditorElement.scrollTop || 0;
        const baseTopOffset = blockElementRect.top + marginTop - editorRect.top + editorScrollTop;
        const hasHeading = ['h1', 'h2', 'h3', 'h4'].some((tag) => blockElement.querySelector(tag) !== null);
        const topOffset = hasHeading
            ? (baseTopOffset + floatingIconRect.height / 2 + paddingTop)
            : baseTopOffset + paddingTop;
        const adjustedLeft = (blockElementRect.left - marginLeft) + paddingLeft - (floatingIconRect.width + 5) - editorRect.left;
        const cssText = `top: ${topOffset}px; left: ${adjustedLeft}px; pointer-events: auto;`;
        updateCSSText(this.floatingIconContainer, cssText);
    }
    /**
     * Hides the drag icon for empty block
     *
     * @param {HTMLElement} target - The target element to show the floating icons for.
     * @returns {void}
     * @hidden
     */
    hideDragIconForEmptyBlock(target) {
        const dragIcon = this.floatingIconContainer.querySelector('.e-block-drag-icon');
        updateCSSText(dragIcon, 'display: flex;');
        const ignoredTypes = [BlockType.Code, BlockType.Callout, BlockType.Divider, BlockType.CollapsibleHeading,
            BlockType.CollapsibleParagraph, BlockType.Image, BlockType.Table, BlockType.Quote];
        const blockType = target.getAttribute('data-block-type');
        const isIgnoredtype = blockType && ignoredTypes.indexOf(blockType) !== -1;
        const contentElement = getBlockContentElement(target);
        if (!isIgnoredtype && (contentElement && !contentElement.textContent)) {
            updateCSSText(dragIcon, 'display: none;');
        }
    }
    /**
     * Hides the floating icons
     *
     * @returns {void}
     * @hidden
     */
    hideFloatingIcons() {
        if (this.floatingIconContainer) {
            updateCSSText(this.floatingIconContainer, 'display: none;');
        }
    }
    handleDragIconClick(event) {
        if (!this.parent.blockActionMenuSettings.enable) {
            return;
        }
        const dragIcon = this.floatingIconContainer.querySelector('.e-block-drag-icon');
        dragIcon.classList.add('e-drag-icon-selected');
        this.parent.selectionOverlay.selectionOverlayInfo = { element: this.parent.currentHoveredBlock, direction: 'previous' };
        this.parent.lastHighlightedBlockId = this.parent.currentHoveredBlock.id;
        if (this.parent.selectionOverlay) {
            this.parent.selectionOverlay.show(this.parent.currentHoveredBlock.id);
        }
        this.parent.popupRenderer.adjustPopupPositionRelativeToTarget(this.floatingIconContainer, this.parent.blockActionMenuModule.popupObj);
        const popupElement = document.querySelector('#' + this.parent.rootEditorElement.id + BLOCKACTION_POPUP_ID);
        this.parent.blockActionMenuModule.toggleBlockActionPopup(popupElement.classList.contains('e-popup-open'), event);
        if (this.parent.nodeSelection) {
            this.parent.nodeSelection.clearSelection();
        }
    }
    handleAddIconClick() {
        const block = this.parent.currentHoveredBlock;
        if ((this.parent.currentHoveredBlock.innerText.length > 0) || (isNonContentEditableBlock(block.getAttribute('data-block-type')))) {
            this.parent.execCommand({
                command: 'AddBlock',
                state: {
                    targetBlock: this.parent.currentHoveredBlock,
                    preventUpdateAction: true,
                    forceIgnoreTargetUpdate: true
                }
            });
        }
        else {
            this.parent.setFocusAndUIForNewBlock(block);
        }
        if (this.parent.slashCommandModule) {
            this.parent.isPopupOpenedOnAddIconClick = true;
            this.parent.slashCommandModule.showPopup();
        }
    }
    isFullyVisibleInEditor(blockElement) {
        const editorRect = this.parent.rootEditorElement.getBoundingClientRect();
        const blockRect = blockElement.getBoundingClientRect();
        return (blockRect.top >= editorRect.top &&
            blockRect.bottom <= editorRect.bottom);
    }
    destroy() {
        EventHandler.remove(this.floatingIconContainer.firstChild, 'click', this.handleAddIconClick);
        EventHandler.remove(this.floatingIconContainer.lastChild, 'click', this.handleDragIconClick);
        this.unWireGlobalEvents();
        this.floatingIconContainer = null;
    }
}

class ListPlugin {
    constructor(manager) {
        this.parent = manager;
    }
    /**
     * Handles the key press event for list blocks.
     *
     * @param {KeyboardEvent} event - The keyboard event.
     * @param {HTMLElement} blockElement - The block element.
     * @returns {boolean} - Returns true if the event is handled.
     * @hidden
     */
    handleListKeyActions(event, blockElement) {
        const range = getSelectedRange();
        const blockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        let isActionProcessed = false;
        switch (event.key) {
            case 'Enter':
                this.handleEnterKey(event, blockElement, range, blockModel);
                this.parent.isEntireEditorSelected = false;
                isActionProcessed = true;
                break;
            case 'Backspace':
                this.handleBackspaceKey(event, blockElement, range, blockModel);
                this.parent.isEntireEditorSelected = false;
                isActionProcessed = true;
                break;
        }
        return isActionProcessed;
    }
    /**
     * Handles creation of new list item on particular key triggers
     *
     * @param {KeyboardEvent} event - The keyboard event.
     * @param {HTMLElement} blockElement - The block element.
     * @param {BlockModel} blockModel - The block model.
     * @returns {void}
     * @hidden
     */
    handleListTriggerKey(event, blockElement, blockModel) {
        /**
         * Below are the list triggers for the block editor.
         * (*) or (-) for bullet list.
         * (1.) for numbered list.
         * ([]) for checklist.
         */
        const content = blockElement.textContent.trim();
        if (content.length <= 0) {
            return;
        }
        const validLength = (content.startsWith('*') || content.startsWith('-')) ? 1 : 2;
        const isListTrigger = content.startsWith('*') ||
            content.startsWith('-') ||
            content.startsWith('1.') ||
            content.startsWith('[]');
        if (isListTrigger && event.key === ' ' && event.code === 'Space' && content.length === validLength) {
            event.preventDefault();
            let listType;
            switch (content) {
                case '*':
                case '-':
                    listType = BlockType.BulletList.toString();
                    break;
                case '1.':
                    listType = BlockType.NumberedList.toString();
                    break;
                case '[]':
                    listType = BlockType.Checklist.toString();
                    break;
            }
            this.transformBlockToList(blockElement, blockModel, listType);
        }
    }
    handleEnterKey(event, blockElement, range, blockModel) {
        event.preventDefault();
        const isEmpty = blockElement.textContent.trim() === '';
        if (isEmpty) {
            if (blockModel.indent > 0) {
                this.parent.execCommand({ command: 'IndentBlock', state: {
                        blockIDs: [blockModel.id],
                        shouldDecrease: true
                    } });
            }
            else {
                this.parent.blockCommand.transformBlockToParagraph(blockElement, blockModel);
            }
        }
        else {
            this.parent.execCommand({ command: 'SplitBlock' });
        }
    }
    handleBackspaceKey(event, blockElement, range, blockModel) {
        const isAtStart = range.collapsed && range.startOffset === 0;
        const isEmpty = blockElement.textContent.trim() === '';
        if (!isAtStart && !isEmpty) {
            return;
        }
        event.preventDefault();
        this.parent.blockCommand.transformBlockToParagraph(blockElement, blockModel);
        this.recalculateMarkersForListItems();
    }
    transformBlockToList(blockElement, blockModel, listType) {
        if (blockModel.content.length > 0) {
            blockModel.content[0].content = '';
        }
        const newBlockElement = this.parent.blockCommand.transformBlock({
            block: blockModel,
            blockElement: blockElement,
            newBlockType: listType
        });
        const contentElement = getBlockContentElement(newBlockElement);
        setCursorPosition(contentElement, 0);
        this.updateListItemMarkers(newBlockElement);
    }
    /**
     * Updates the list item markers the given block element.
     *
     * @param {HTMLElement} blockElement - The block element to update.
     * @returns {void}
     * @hidden
     */
    updateListItemMarkers(blockElement) {
        const prevBlockType = blockElement.getAttribute('data-block-type');
        const listItem = blockElement.querySelector('li');
        const isNumbered = prevBlockType === BlockType.NumberedList;
        const isChecklist = prevBlockType === BlockType.Checklist;
        if (isChecklist || !isNumbered) {
            return;
        }
        const index = this.getNumberedListItemIndex(blockElement);
        const indentLevel = this.getIndentLevel(blockElement);
        const marker = this.getListMarker(index, indentLevel);
        listItem.style.setProperty('list-style-type', `"${marker} "`);
    }
    getNumberedListItemIndex(blockElement) {
        let index = 1;
        const allBlocks = this.getAllBlockElements(blockElement);
        const currentBlockIndex = allBlocks.indexOf(blockElement);
        if (currentBlockIndex < 0) {
            return index;
        }
        const currentIndentLevel = this.getIndentLevel(blockElement);
        // Count only blocks with same indent level and same type starting from current block
        for (let i = currentBlockIndex - 1; i >= 0; i--) {
            const prevBlock = allBlocks[i];
            const prevBlockType = prevBlock.getAttribute('data-block-type');
            const prevIndentLevel = this.getIndentLevel(prevBlock);
            if (prevBlockType !== BlockType.NumberedList || currentIndentLevel > prevIndentLevel) {
                break; // Stop when block type changes or indent level increases(new series)
            }
            if (prevIndentLevel === currentIndentLevel) {
                index++; // Increment only when indent level is same
            }
        }
        return index;
    }
    getIndentLevel(blockElement) {
        return parseInt((blockElement.style.getPropertyValue(INDENT_KEY)), 10) / ListPlugin.INDENT_STEP_SIZE;
    }
    getListMarker(index, indentLevel) {
        const getRomanNumeral = (num) => {
            // Use lookup table for numbers 1–20 (Improved efficiency)
            if (num >= 1 && num <= 20) {
                return ListPlugin.ROMANNUMERALLOOKUP[num];
            }
            // Fallback algorithm for numbers >20
            const romanMap = [
                [1000, 'm'], [900, 'cm'], [500, 'd'], [400, 'cd'], [100, 'c'], [90, 'xc'],
                [50, 'l'], [40, 'xl'], [10, 'x'], [9, 'ix'], [5, 'v'], [4, 'iv'], [1, 'i']
            ];
            let result = '';
            for (const [value, symbol] of romanMap) {
                while (num >= value) {
                    result += symbol;
                    num -= value;
                }
            }
            return result;
        };
        const getLetterSequence = (num) => {
            let result = '';
            while (num > 0) {
                num--;
                result = String.fromCharCode(97 + (num % 26)) + result;
                num = Math.floor(num / 26);
            }
            return result;
        };
        switch (indentLevel % 3) {
            case 0:
                return `${index}.`;
            case 1:
                return `${getLetterSequence(index)}.`;
            case 2:
                return `${getRomanNumeral(index)}.`;
            default:
                return `${index}.`;
        }
    }
    /**
     * Recalculate the markers for all list items in the editor.
     *
     * @returns {void}
     * @hidden
     */
    recalculateMarkersForListItems() {
        const allBlocks = this.getAllBlockElements();
        const indexByIndent = new Map();
        for (const block of allBlocks) {
            const blockType = block.getAttribute('data-block-type');
            if (!isListTypeBlock(blockType) || blockType === BlockType.Checklist || blockType === BlockType.BulletList) {
                continue;
            }
            const indentLevel = this.getIndentLevel(block);
            const prevBlockIndex = allBlocks.indexOf(block) - 1;
            const prevBlock = prevBlockIndex >= 0 ? allBlocks[prevBlockIndex] : null;
            const prevBlockType = prevBlock ? prevBlock.getAttribute('data-block-type') : '';
            const prevIndentLevel = prevBlock ? this.getIndentLevel(prevBlock) : -1;
            // Reset counters for deeper levels when we encounter a shallower or equal level
            if (prevBlock && (prevIndentLevel > indentLevel ||
                (prevIndentLevel === indentLevel && prevBlockType !== BlockType.NumberedList))) {
                for (const [level] of indexByIndent) {
                    if (level > indentLevel) {
                        indexByIndent.delete(level);
                    }
                }
            }
            if (prevBlockType !== BlockType.NumberedList || prevIndentLevel < indentLevel) {
                indexByIndent.set(indentLevel, 1); // Start new sequence
            }
            else {
                // prevIndentLevel > indentLevel - returning to shallower level
                const currentIndex = (indexByIndent.get(indentLevel) || 0) + 1;
                indexByIndent.set(indentLevel, currentIndex);
            }
            const index = indexByIndent.get(indentLevel) || 1;
            this.setNumberedListMarker(block, index, indentLevel);
        }
    }
    setNumberedListMarker(blockElement, index, indent) {
        const listItem = blockElement.querySelector('li');
        const marker = this.getListMarker(index, indent);
        listItem.style.setProperty('list-style-type', `"${marker} "`);
    }
    getAllBlockElements(focusedBlock) {
        const currentElement = focusedBlock || this.parent.currentFocusedBlock;
        const calloutBlock = currentElement &&
            currentElement.closest('.' + CALLOUT_BLOCK_CLS);
        const quoteBlock = currentElement &&
            currentElement.closest('.' + QUOTE_BLOCK_CLS);
        const toggleBlock = currentElement &&
            currentElement.closest('.' + TOGGLE_BLOCK_CLS);
        const tableBlock = currentElement &&
            currentElement.closest('.' + TABLE_BLOCK_CLS);
        const parentBlock = calloutBlock || quoteBlock || toggleBlock || tableBlock;
        const allBlocks = parentBlock
            ? Array.from(parentBlock.querySelectorAll('.' + BLOCK_CLS))
            : Array.from(this.parent.blockContainer.children);
        return allBlocks;
    }
}
ListPlugin.INDENT_STEP_SIZE = 20;
// Lookup table for Roman numerals 1–20
ListPlugin.ROMANNUMERALLOOKUP = {
    1: 'i', 2: 'ii', 3: 'iii', 4: 'iv', 5: 'v',
    6: 'vi', 7: 'vii', 8: 'viii', 9: 'ix', 10: 'x',
    11: 'xi', 12: 'xii', 13: 'xiii', 14: 'xiv', 15: 'xv',
    16: 'xvi', 17: 'xvii', 18: 'xviii', 19: 'xix', 20: 'xx'
};

/**
 * Manages undo redo actions for the BlockEditor component
 */
class UndoRedoManager {
    constructor(manager, action) {
        this.parent = manager;
        this.undoRedoAction = action;
    }
    /**
     * Renders the block with the previous state
     *
     * @param {string} blockId - Specifies the block id
     * @param {BlockModel} oldBlock - Specifies the old block model
     * @param {BlockModel} newBlock - Specifies the new block model
     * @returns {void} - Returns void
     * @hidden
     */
    reRenderWithPreviousState(blockId, oldBlock, newBlock) {
        const targetBlockModel = getBlockModelById(blockId, this.parent.getEditorBlocks());
        if (!targetBlockModel) {
            return;
        }
        const blockToReplace = this.undoRedoAction.isUndoing ? oldBlock : newBlock;
        this.parent.blockService.replaceBlock(targetBlockModel.id, blockToReplace);
        this.parent.stateManager.updateManagerBlocks();
        this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                data: [{ block: blockToReplace, oldBlock: oldBlock }]
            } });
    }
    /**
     * Handles the undo redo for formatting action
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    handleFormattingUndoRedo(currentState) {
        const data = currentState.data;
        // On Redo, restore the contentchange action first and proceed with formatting action(applicable only for format on user typing)
        if (this.undoRedoAction.isRedoing && data.isTypingWithFormat) {
            this.undoRedoAction.applyNextRedoSibling();
        }
        data.blockIDs.forEach((blockId) => {
            this.reRenderWithPreviousState(blockId, data.oldBlockModels.find((block) => block.id === blockId), data.updatedBlockModels.find((block) => block.id === blockId));
        });
        // On Undo, restore the contentchange action after processing formatting action(applicable only for format on user typing)
        if (this.undoRedoAction.isUndoing && data.isTypingWithFormat) {
            this.undoRedoAction.applyNextUndoSibling();
        }
        if (!data.isTypingWithFormat) {
            this.parent.formattingAction.nodeSelection.savedSelectionState = data.selectionState;
            this.parent.formattingAction.nodeSelection.restoreSelection();
            this.parent.setFocusToBlock(this.parent.getBlockElementById(data.selectionState.startBlockId));
        }
    }
    /**
     * Moves the blocks into its original position
     *
     * @param {IMoveBlocksInteraction} args - Specifies the arguments for moving the blocks
     * @returns {void} - Returns void
     * @hidden
     */
    moveBlocksIntoOriginalPosition(args) {
        const { fromBlockIds, fromIndex, fromParentId, toParentId } = args;
        const editorBlocks = this.parent.getEditorBlocks();
        // Collect current indexes before mutating the array
        const fromEntries = this.parent.blockService.gatherBlocksInfoForMove(fromBlockIds);
        let oldDatas = this.parent.blockService.removeBlocksForMove(fromEntries);
        // Collect the old data models
        oldDatas = [...fromEntries].reverse()
            .map((fromEntry, i) => {
            const index = fromIndex[parseInt(i.toString(), 10)];
            const parent = getBlockModelById(fromParentId[parseInt(i.toString(), 10)], editorBlocks);
            return Object.assign({}, fromEntry, { index, parent });
        });
        let targetId = '';
        // insert in its old position
        for (const entry of oldDatas) {
            const { model: entryModel, index, parent } = entry;
            const insertToArray = parent ? parent.properties.children : editorBlocks;
            if (targetId === '') {
                // to get the correct target id for the moved blocks.
                const targetBlockModel = insertToArray[args.isMovedUp ? index - 1 : index];
                targetId = targetBlockModel.id;
            }
            entryModel.parentId = parent ? parent.id : '';
            insertToArray.splice(index, 0, entryModel);
        }
        this.parent.stateManager.updateManagerBlocks();
        oldDatas.forEach((data) => {
            const prevParent = fromEntries.find((fromModel) => fromModel.parent !== null);
            const currParent = getBlockModelById(data.model.parentId, editorBlocks);
            this.parent.eventService.addChange({
                action: 'Moved',
                data: {
                    block: data.model,
                    targetId: targetId,
                    isMovingUp: !args.isMovedUp,
                    prevParent: prevParent ? prevParent.model : undefined,
                    currentParent: currParent ? currParent : undefined
                }
            });
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
        // DOM updates
        for (const entry of args.isMovedUp ? oldDatas.reverse() : oldDatas) {
            const { blockId, index, parent } = entry;
            const fromElement = this.parent.blockContainer.querySelector(`#${blockId}`);
            const allBlocks = Array.from(this.parent.blockContainer.children);
            // should reduce index only when any block is moved into a special block or last child block is moved outside from a special block (Callout, Toggle)
            const shouldReduceIndex = parent
                ? parent.properties.children[(parent.properties
                    .children.length - 1)].id === blockId
                : toParentId !== '';
            const indexVal = shouldReduceIndex ? index - 1 : index;
            const parentElement = (parent ? this.parent.blockContainer.querySelector(`#${parent.id}`) : null);
            const toBlockDOM = (parent
                ? parentElement.querySelectorAll('.' + BLOCK_CLS)[parseInt(indexVal.toString(), 10)]
                : allBlocks[parseInt(indexVal.toString(), 10)]);
            let wrapperClassName = '';
            if (parent) {
                switch (parent.blockType) {
                    case BlockType.Callout:
                        wrapperClassName = '.' + CALLOUT_CONTENT_CLS;
                        break;
                    case BlockType.Quote:
                        wrapperClassName = '.' + QUOTE_CONTENT_CLS;
                        break;
                    default:
                        if (parent.blockType.toString().startsWith('Collapsible')) {
                            wrapperClassName = '.' + TOGGLE_CONTENT_CLS;
                        }
                        break;
                }
            }
            const wrapperElement = wrapperClassName
                ? parentElement.querySelector(wrapperClassName)
                : this.parent.blockContainer;
            let targetToInsert;
            if (!args.isMovedUp) {
                targetToInsert = (shouldReduceIndex
                    ? (toBlockDOM ? toBlockDOM.nextElementSibling : toBlockDOM)
                    : toBlockDOM);
            }
            else {
                targetToInsert = (toBlockDOM ? toBlockDOM.nextElementSibling : toBlockDOM);
            }
            wrapperElement.insertBefore(fromElement, targetToInsert);
        }
        const blockIdToFocus = fromBlockIds[0];
        const blockElementToFocus = this.parent.getBlockElementById(blockIdToFocus);
        this.parent.updateFocusAndCursor(blockElementToFocus);
    }
    /**
     * Handles the block movement undo redo action
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    handleBlockMovement(currentState) {
        const moveData = currentState.data;
        const moveBlockArgs = {
            fromBlockIds: moveData.blockIds,
            fromIndex: moveData.fromIndex,
            toBlockId: moveData.toBlockId,
            toIndex: moveData.toIndex,
            fromParentId: moveData.fromParentId,
            toParentId: moveData.toParentId,
            isUndoRedoAction: true,
            isMovedUp: moveData.isMovedUp
        };
        if (this.undoRedoAction.isUndoing) {
            this.moveBlocksIntoOriginalPosition(moveBlockArgs);
        }
        else {
            this.parent.execCommand({ command: 'MoveBlock', state: moveBlockArgs });
        }
    }
    /**
     * Re-transforms the block with the previous state
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    reTransformBlocks(currentState) {
        const transformedData = currentState.data;
        if (!transformedData) {
            return;
        }
        const currentBlockModel = transformedData.blockId
            ? getBlockModelById(transformedData.blockId, this.parent.getEditorBlocks()) : null;
        const storedBlockModel = this.undoRedoAction.isUndoing
            ? transformedData.oldBlockModel : transformedData.newBlockModel;
        const blockElement = this.parent.blockContainer.querySelector(`#${transformedData.blockId}`);
        const newBlockType = this.undoRedoAction.isUndoing
            ? transformedData.oldBlockModel.blockType : transformedData.newBlockModel.blockType;
        this.parent.blockCommand.handleBlockTransformation({
            block: currentBlockModel,
            blockElement: blockElement,
            newBlockType: newBlockType,
            isUndoRedoAction: true,
            props: storedBlockModel.properties,
            oldBlockModel: storedBlockModel
        });
    }
    /**
     * Handles undo/redo action for image insertion (placeholder → uploaded image)
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    handleImageInsertion(currentState) {
        const imageData = currentState.data;
        if (!imageData) {
            return;
        }
        const blockId = imageData.blockId;
        const blockElement = this.parent.blockContainer.querySelector(`#${blockId}`);
        if (!blockElement) {
            return;
        }
        // replace the block model in the editor
        this.parent.blockService.replaceBlock(blockId, this.undoRedoAction.isUndoing ? imageData.oldBlockModel : imageData.newBlockModel);
        this.parent.stateManager.updateManagerBlocks();
        // Re-render the block content to reflect the model change
        this.parent.observer.notify('modelChanged', { type: 'ReplaceBlock', state: {
                targetBlockId: blockId,
                block: this.undoRedoAction.isUndoing ? imageData.oldBlockModel : imageData.newBlockModel,
                oldBlock: this.undoRedoAction.isUndoing ? imageData.newBlockModel : imageData.oldBlockModel
            } });
        // Set focus to the block
        this.parent.setFocusToBlock(blockElement);
    }
    /**
     * Handles undo redo action for multiple block transformations
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    reTransformMultipleBlocks(currentState) {
        const multiTransformData = currentState.data;
        if (!multiTransformData || !multiTransformData.transformedBlocks || multiTransformData.transformedBlocks.length === 0) {
            return;
        }
        // Prevent individual undo tracking during batch redo
        this.undoRedoAction.beginBatchTransform();
        for (const transform of multiTransformData.transformedBlocks) {
            const currentBlockModel = getBlockModelById(transform.blockId, this.parent.getEditorBlocks());
            const storedBlockModel = this.undoRedoAction.isUndoing
                ? transform.oldBlockModel : transform.newBlockModel;
            const blockElement = this.parent.blockContainer.querySelector(`#${transform.blockId}`);
            const newBlockType = this.undoRedoAction.isUndoing
                ? transform.oldBlockModel.blockType : transform.newBlockModel.blockType;
            if (currentBlockModel && blockElement) {
                this.parent.blockCommand.handleBlockTransformation({
                    block: currentBlockModel,
                    blockElement: blockElement,
                    newBlockType: newBlockType,
                    isUndoRedoAction: true,
                    props: storedBlockModel.properties,
                    oldBlockModel: storedBlockModel
                });
            }
        }
        // End batch mode without pushing to undo stack
        this.undoRedoAction.endBatchTransform();
    }
    /**
     * Handles undo redo action for multiple block deletions
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    handleMultipleBlocksUndoRedo(currentState) {
        if (this.undoRedoAction.isUndoing) {
            this.restoreDeletedBlocks(currentState);
        }
        else if (this.undoRedoAction.isRedoing) {
            this.reDeleteBlocks(currentState);
        }
    }
    restoreDeletedBlocks(state) {
        const data = state.data;
        if (data.deletionType === DeletionType.Entire) {
            this.restoreEntireEditor(data.deletedBlocks);
            setTimeout(() => {
                this.parent.editorMethods.selectAllBlocks();
            });
        }
        else if (data.deletionType === DeletionType.Partial) {
            this.restorePartialDeletion(state);
        }
        this.parent.stateManager.updateManagerBlocks();
    }
    restoreEntireEditor(deletedBlocks) {
        this.parent.setEditorBlocks(deletedBlocks);
        this.parent.blockContainer.innerHTML = '';
        this.parent.blockRenderer.renderBlocks(deletedBlocks);
    }
    restorePartialDeletion(state) {
        const { deletedBlocks, firstBlockIndex } = state.data;
        if (!deletedBlocks.length) {
            return;
        }
        const [firstBlock, ...middleBlocks] = deletedBlocks;
        const lastBlock = middleBlocks.pop();
        const firstBlockParent = getBlockModelById(firstBlock.parentId, this.parent.getEditorBlocks())
            || findCellById(firstBlock.parentId, this.parent.getEditorBlocks());
        const targetIndex = (firstBlockIndex - 1) >= 0 ? (firstBlockIndex - 1) : 0;
        let targetBlockElement = this.parent.blockContainer.children[targetIndex];
        if (firstBlockParent) {
            const childBlocks = this.parent.getBlockElementById(firstBlockParent.id).querySelectorAll('.' + BLOCK_CLS);
            targetBlockElement = childBlocks[targetIndex];
        }
        const firstBlockElement = this.restoreSingleBlock(firstBlock, firstBlockIndex, targetBlockElement, true);
        this.restoreSingleBlock(lastBlock, firstBlockIndex + 1, firstBlockElement);
        if (middleBlocks.length) {
            this.restoreMiddleBlocks(middleBlocks, firstBlockElement);
        }
        this.parent.listPlugin.recalculateMarkersForListItems();
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    }
    restoreSingleBlock(block, insertIndex, targetElement, isFirstBlock) {
        const editorBlocks = this.parent.getEditorBlocks();
        let blockElement = this.parent.getBlockElementById(block.id);
        const parent = getBlockModelById(block.parentId, editorBlocks);
        const tableParent = findCellById(block.parentId, editorBlocks);
        const deleteCount = isFirstBlock ? 1 : 0;
        const insertArray = parent
            ? parent.properties.children
            : (tableParent ? tableParent.blocks : editorBlocks);
        insertArray.splice(insertIndex, deleteCount, decoupleReference(block));
        if (blockElement) {
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: block }],
                    preventEventTrigger: true
                } });
            return blockElement;
        }
        this.parent.eventService.addChange({
            action: 'Insertion',
            data: { block: block }
        });
        blockElement = this.parent.blockRenderer.createBlockElement(block);
        this.parent.togglePlaceholder(blockElement, false);
        if (targetElement) {
            targetElement.insertAdjacentElement(insertIndex === 0 ? 'beforebegin' : 'afterend', blockElement);
        }
        return blockElement;
    }
    restoreMiddleBlocks(middleBlocks, targetElement) {
        let currentInsertionPoint = targetElement;
        for (const block of middleBlocks) {
            this.parent.execCommand({ command: 'AddBlock', state: {
                    block,
                    targetBlock: currentInsertionPoint,
                    isUndoRedoAction: true,
                    preventEventTrigger: true
                } });
            currentInsertionPoint = this.parent.getBlockElementById(block.id);
            this.parent.togglePlaceholder(currentInsertionPoint, false);
        }
    }
    reDeleteBlocks(state) {
        const data = state.data;
        if (data.deletionType === DeletionType.Entire) {
            this.parent.setEditorBlocks([]);
            this.parent.blockCommand.createDefaultEmptyBlock(true, state.oldBlockModel ? state.oldBlockModel.id : '');
        }
        else if (data.deletionType === DeletionType.Partial) {
            const blocksToDelete = [];
            for (let i = 0; i < data.deletedBlocks.length; i++) {
                const block = data.deletedBlocks[i];
                const currentBlockModel = getBlockModelById(block.id, this.parent.getEditorBlocks());
                if (currentBlockModel) {
                    blocksToDelete.push(currentBlockModel);
                }
            }
            if (blocksToDelete.length > 0) {
                this.undoRedoAction.restoreSelectionState(state);
                this.parent.blockCommand.handleMultipleBlockDeletion(blocksToDelete, data.direction || 'previous', true);
            }
        }
    }
    /**
     * Handles the clipboard undo redo action
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    handleClipboardActions(currentState) {
        if (this.undoRedoAction.isUndoing) {
            this.handleClipboardUndo(currentState);
        }
        else {
            this.handleClipboardRedo(currentState);
        }
    }
    /**
     * Applies a table row action for undo/redo.
     * Decides whether to insert or delete a row based on action intent and current undo/redo phase.
     * When apply is 'insert':
     *  - Undo => perform delete
     *  - Redo => perform insert
     * When apply is 'delete':
     *  - Undo => perform insert
     *  - Redo => perform delete
     *
     * @param { ITableRowInsertOptions } data Payload that includes blockId, rowIndex and optional rowModel
     * @param { string } apply Indicates target action recorded in the stack ('insert' | 'delete')
     * @returns {void} - Returns void
     * @hidden
     */
    processRowAction(data, apply) {
        const shouldInsert = (apply === 'insert' && !this.undoRedoAction.isUndoing)
            || (apply === 'delete' && this.undoRedoAction.isUndoing);
        if (shouldInsert) {
            this.parent.tableService.addRowAt({
                blockId: data.blockId,
                rowIndex: data.rowIndex,
                rowModel: data.rowModel,
                isUndoRedoAction: true
            });
        }
        else {
            this.parent.tableService.deleteRowAt({
                blockId: data.blockId,
                modelIndex: data.rowIndex,
                isUndoRedoAction: true
            });
        }
    }
    /**
     * Applies a table column action for undo/redo.
     * Decides whether to insert or delete a column based on action intent and current undo/redo phase.
     * When apply is 'insert':
     *  - Undo => perform delete
     *  - Redo => perform insert
     * When apply is 'delete':
     *  - Undo => perform insert
     *  - Redo => perform delete
     *
     * @param { ITableColumnInsertOptions } data Payload that includes blockId, colIndex and optional columnModel
     * @param { string } apply Indicates target action recorded in the stack ('insert' | 'delete')
     * @returns {void} - Returns void
     * @hidden
     */
    processColumnAction(data, apply) {
        const shouldInsert = (apply === 'insert' && !this.undoRedoAction.isUndoing)
            || (apply === 'delete' && this.undoRedoAction.isUndoing);
        if (shouldInsert) {
            this.parent.tableService.addColumnAt({
                blockId: data.blockId,
                colIndex: data.colIndex,
                columnModel: data.columnModel,
                columnCells: data.columnCells,
                isUndoRedoAction: true
            });
        }
        else {
            this.parent.tableService.deleteColumnAt({
                blockId: data.blockId,
                colIndex: data.colIndex,
                isUndoRedoAction: true
            });
        }
    }
    /**
     * Handles undo/redo for table cell clearing.
     * On undo: restores each affected cell's previous blocks.
     * On redo: clears the blocks for each affected cell.
     *
     * @param { IUndoRedoState } state that contains blockId and a list of cells with previous blocks
     * @returns {void} - Returns void
     * @hidden
     */
    handleTableCellsCleared(state) {
        const data = state.data;
        const ctx = getTableElements(data.blockId, this.parent.rootEditorElement, this.parent.getEditorBlocks());
        if (!ctx) {
            return;
        }
        const { table } = ctx;
        const oldBlock = decoupleReference(getBlockModelById(data.blockId, this.parent.getEditorBlocks()));
        const mode = this.undoRedoAction.isUndoing ? 'restore' : 'clear';
        data.cells.forEach((cell) => this.parent.tableService.applyCellChange(table, cell, mode));
        const updatedBlock = decoupleReference(getBlockModelById(data.blockId, this.parent.getEditorBlocks()));
        this.parent.tableService.triggerBlockUpdate(updatedBlock, oldBlock);
        const blockId = data.blockId;
        const blockEle = this.parent.getBlockElementById(blockId);
        if (blockEle) {
            this.parent.selectionOverlay.show(blockId);
            if (this.parent.nodeSelection) {
                this.parent.nodeSelection.clearSelection();
            }
        }
    }
    handleTableCellsPasted(state) {
        const data = state.data;
        const ctx = getTableElements(data.blockId, this.parent.rootEditorElement, this.parent.getEditorBlocks());
        if (!ctx) {
            return;
        }
        const { table, props } = ctx;
        const oldBlock = decoupleReference(getBlockModelById(data.blockId, this.parent.getEditorBlocks()));
        const applyBlocks = (useNew) => {
            data.cells.forEach((cell) => {
                const blocks = useNew ? cell.newBlocks : cell.oldBlocks;
                this.parent.tableService.setCellBlocks(table, cell.dataRow, cell.dataCol, blocks);
            });
        };
        if (this.undoRedoAction.isUndoing) {
            // Remove structure added on paste
            if (data.structureDelta) {
                if (data.structureDelta.colsAdded && data.structureDelta.colsAdded.length) {
                    [...data.structureDelta.colsAdded].sort((a, b) => b - a).forEach((c) => {
                        this.parent.tableService.deleteColumnAt({ blockId: data.blockId, colIndex: c, isUndoRedoAction: true });
                    });
                }
                if (data.structureDelta.rowsAdded && data.structureDelta.rowsAdded.length) {
                    [...data.structureDelta.rowsAdded].sort((a, b) => b - a).forEach((r) => {
                        this.parent.tableService.deleteRowAt({ blockId: data.blockId, modelIndex: r, isUndoRedoAction: true });
                    });
                }
            }
            applyBlocks(false);
        }
        else {
            // Rebuild structure before reapplying new blocks
            if (data.structureDelta) {
                if (data.structureDelta.rowsAdded && data.structureDelta.rowsAdded.length) {
                    [...data.structureDelta.rowsAdded].sort((a, b) => a - b).forEach((r) => {
                        this.parent.tableService.addRowAt({ blockId: data.blockId, rowIndex: r, isUndoRedoAction: true });
                    });
                }
                if (data.structureDelta.colsAdded && data.structureDelta.colsAdded.length) {
                    [...data.structureDelta.colsAdded].sort((a, b) => a - b).forEach((c) => {
                        this.parent.tableService.addColumnAt({ blockId: data.blockId, colIndex: c, isUndoRedoAction: true });
                    });
                }
            }
            applyBlocks(true);
        }
        // Restore cell focus to first cell
        if (data.cells[0]) {
            const cellToFocus = getDataCell(table, toDomRow(data.cells[0].dataRow, props.enableHeader), data.cells[0].dataCol);
            this.parent.tableService.removeCellFocus(table);
            this.parent.tableService.addCellFocus(cellToFocus, true);
        }
        const updatedBlock = decoupleReference(getBlockModelById(data.blockId, this.parent.getEditorBlocks()));
        this.parent.tableService.triggerBlockUpdate(updatedBlock, oldBlock);
    }
    handleBulkRowsDeleted(currentState) {
        const data = currentState.data;
        const ctx = getTableElements(data.blockId, this.parent.rootEditorElement, this.parent.getEditorBlocks());
        if (!ctx) {
            return;
        }
        if (this.undoRedoAction.isUndoing) {
            // Re-insert rows at their original indices (ascending)
            [...data.rows].sort((a, b) => a.index - b.index).forEach((r) => {
                this.parent.tableService.addRowAt({
                    blockId: data.blockId,
                    rowIndex: r.index,
                    rowModel: r.rowModel,
                    isUndoRedoAction: true
                });
            });
        }
        else {
            // Re-delete rows (descending DOM order)
            [...data.rows].sort((a, b) => b.index - a.index).forEach((r) => {
                this.parent.tableService.deleteRowAt({
                    blockId: data.blockId,
                    modelIndex: r.index,
                    isUndoRedoAction: true
                });
            });
        }
    }
    handleBulkColumnsDeleted(currentState) {
        const data = currentState.data;
        const ctx = getTableElements(data.blockId, this.parent.rootEditorElement, this.parent.getEditorBlocks());
        if (!ctx) {
            return;
        }
        if (this.undoRedoAction.isUndoing) {
            // Re-insert columns (ascending index)
            [...data.cols].sort((a, b) => a.index - b.index).forEach((c) => {
                this.parent.tableService.addColumnAt({
                    blockId: data.blockId,
                    colIndex: c.index,
                    columnModel: c.columnModel,
                    columnCells: c.columnCells,
                    isUndoRedoAction: true
                });
            });
        }
        else {
            // Re-delete columns (descending index)
            [...data.cols].sort((a, b) => b.index - a.index).forEach((c) => {
                this.parent.tableService.deleteColumnAt({
                    blockId: data.blockId,
                    colIndex: c.index,
                    isUndoRedoAction: true
                });
            });
        }
    }
    handleTableHeaderUndoRedo(state) {
        const data = state.data;
        const blockModel = getBlockModelById(data.blockId, this.parent.getEditorBlocks());
        if (!blockModel) {
            return;
        }
        const blockElement = this.parent.getBlockElementById(blockModel.id);
        const props = blockModel.properties;
        const tableHeaders = blockElement.querySelectorAll('thead th:not(.e-row-number)');
        const columnsToReplace = this.undoRedoAction.isUndoing ? data.oldColumns : data.updatedColumns;
        tableHeaders.forEach((headerElement) => {
            const colIndex = parseInt(headerElement.getAttribute('data-col'), 10);
            const textToUpdate = columnsToReplace[colIndex].headerText;
            //DOM and Model
            headerElement.textContent = props.columns[colIndex].headerText = textToUpdate;
        });
    }
    handleTableColumnResized(state) {
        const data = state.data;
        const blockModel = getBlockModelById(data.blockId, this.parent.getEditorBlocks());
        if (!blockModel) {
            return;
        }
        const props = blockModel.properties;
        const blockEl = this.parent.getBlockElementById(blockModel.id);
        const table = blockEl.querySelector('table.e-table-element');
        const colgroup = table.querySelector('colgroup');
        const useOld = this.undoRedoAction.isUndoing;
        const updatedWidth = useOld ? data.oldWidthValue : data.newWidthValue;
        // Update model
        props.columns[data.resizedColIndex].width = `${updatedWidth}px`;
        // Update DOM colgroup
        const domLeftIdx = toDomCol(data.resizedColIndex, props.enableRowNumbers);
        colgroup.children[domLeftIdx].style.width = `${updatedWidth}px`;
    }
    handleClipboardUndo(currentState) {
        const { type, blocks, targetBlockId, clipboardData, oldContent, isPastedAtStart, isSelectivePaste, cursorBlockAfterSplit } = currentState.data;
        const targetBlock = getBlockModelById(targetBlockId, this.parent.getEditorBlocks());
        const oldTargetBlock = decoupleReference(targetBlock);
        if (type === 'blocks') {
            const clipboardBlocks = clipboardData.blocks;
            const nonMergableTypes = [BlockType.Table, BlockType.Image, BlockType.Divider];
            const isFirstBlkNonMergableType = clipboardBlocks ?
                nonMergableTypes.indexOf(clipboardData.blocks[0].blockType) !== -1 : false;
            const oldBlock = decoupleReference(currentState.oldBlockModel);
            const isEmptyTargetBlock = oldBlock && oldBlock.content
                && ((oldBlock.content.length === 1 && oldBlock.content[0].contentType === ContentType.Text &&
                    (oldBlock.content[0].content === '' || !oldBlock.content[0].content))
                    || !oldBlock.content.length);
            if (blocks && blocks.length > 0) {
                blocks.forEach((block) => {
                    this.parent.blockCommand.deleteBlock({
                        blockElement: this.parent.getBlockElementById(block.id),
                        isUndoRedoAction: true,
                        preventEventTrigger: true
                    });
                });
            }
            if (isEmptyTargetBlock) {
                this.parent.blockService.replaceBlock(targetBlock.id, oldBlock);
                this.parent.observer.notify('modelChanged', { type: 'ReplaceBlock', state: {
                        targetBlockId: targetBlockId,
                        block: oldBlock,
                        oldBlock: oldTargetBlock,
                        preventEventTrigger: true
                    } });
            }
            else if (!isFirstBlkNonMergableType) {
                this.parent.blockService.updateContent(targetBlock.id, cursorBlockAfterSplit.content);
                this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                        data: [{ block: targetBlock, oldBlock: oldTargetBlock }],
                        preventEventTrigger: true
                    } });
                if (!isSelectivePaste) {
                    this.undoRedoAction.applyNextUndoSibling();
                }
            }
        }
        else if (type === 'block') {
            this.parent.blockCommand.deleteBlock({
                blockElement: this.parent.getBlockElementById(blocks[0].id),
                isUndoRedoAction: true,
                preventEventTrigger: true
            });
        }
        else if (type === 'content') {
            this.parent.blockService.updateContent(targetBlock.id, oldContent);
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: targetBlock, oldBlock: oldTargetBlock }],
                    preventEventTrigger: true
                } });
        }
        // Pop the deletion action from the undo stack if user selected a content and pasted
        if (isSelectivePaste) {
            this.undoRedoAction.applyNextUndoSibling();
        }
        this.parent.stateManager.updateManagerBlocks();
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    }
    handleClipboardRedo(currentState) {
        const { type, blocks, targetBlockId, clipboardData, newContent, isPastedAtStart, isSelectivePaste } = currentState.data;
        // Pop the deletion action from the redo stack if user selected a content and pasted
        if (isSelectivePaste) {
            this.undoRedoAction.applyNextRedoSibling();
        }
        const editorBlocks = this.parent.getEditorBlocks();
        const targetBlock = getBlockModelById(targetBlockId, editorBlocks);
        const oldTargetBlock = decoupleReference(targetBlock);
        const clipboardBlocks = clipboardData ? clipboardData.blocks : null;
        const nonMergableTypes = [BlockType.Table, BlockType.Image, BlockType.Divider];
        const isFirstBlkNonMergableType = clipboardBlocks ?
            nonMergableTypes.indexOf(clipboardData.blocks[0].blockType) !== -1 : false;
        let isFirstBlkProcessed = false;
        if (type === 'blocks') {
            const isEmptyTargetBlock = targetBlock && targetBlock.content
                && ((targetBlock.content.length === 1 && targetBlock.content[0].contentType === ContentType.Text &&
                    ((targetBlock.content[0].content === '' || !targetBlock.content[0].content)))
                    || !currentState.oldBlockModel.content.length);
            if (isEmptyTargetBlock) {
                isFirstBlkProcessed = true;
                const block = decoupleReference(clipboardBlocks[0]);
                this.parent.blockService.generateNewIdsForBlock(block);
                block.id = targetBlockId;
                this.parent.blockService.replaceBlock(targetBlock.id, block);
                this.parent.stateManager.updateManagerBlocks();
                const updatedBlockModel = getBlockModelById(block.id, this.parent.getEditorBlocks());
                this.parent.observer.notify('modelChanged', { type: 'ReplaceBlock', state: {
                        targetBlockId: targetBlockId,
                        block: updatedBlockModel,
                        oldBlock: oldTargetBlock,
                        preventEventTrigger: true
                    } });
            }
            else if (!isFirstBlkNonMergableType) {
                isFirstBlkProcessed = true;
                if (!isSelectivePaste) {
                    this.undoRedoAction.applyNextRedoSibling();
                }
                const originalBlock = getBlockModelById(targetBlockId, this.parent.getEditorBlocks());
                const originalClone = decoupleReference(originalBlock);
                this.parent.blockService.updateContent(originalBlock.id, [
                    ...originalBlock.content,
                    ...clipboardBlocks[0].content
                ]);
                this.parent.stateManager.updateManagerBlocks();
                this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                        data: [{ block: originalBlock, oldBlock: originalClone }],
                        preventEventTrigger: true
                    } });
            }
            this.parent.blockCommand.addBulkBlocks({
                blocks: (clipboardBlocks.slice(!isFirstBlkProcessed ? 0 : 1)),
                targetBlockId: targetBlockId,
                isUndoRedoAction: true,
                insertionType: 'blocks'
            });
        }
        else if (type === 'block') {
            this.parent.blockCommand.addBulkBlocks({
                blocks: blocks,
                targetBlockId: targetBlockId,
                isUndoRedoAction: true,
                insertionType: 'block'
            });
        }
        else if (type === 'content') {
            this.parent.blockService.updateContent(targetBlock.id, newContent);
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: targetBlock, oldBlock: oldTargetBlock }],
                    preventEventTrigger: true
                } });
            const pasteEndOffset = currentState.data.pasteEndOffset;
            if (!isNullOrUndefined(pasteEndOffset)) {
                const blockElement = this.parent.getBlockElementById(targetBlock.id);
                if (blockElement) {
                    const contentEl = getBlockContentElement(blockElement);
                    this.parent.setFocusToBlock(blockElement);
                    setCursorPosition(contentEl, pasteEndOffset);
                }
            }
        }
        this.parent.stateManager.updateManagerBlocks();
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    }
    /**
     * Handles undo redo for block addition and deletion
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    blockAdditionDeletionUndoRedo(currentState) {
        switch (currentState.action) {
            case actionType.blockAdded: {
                if (this.undoRedoAction.isUndoing) {
                    this.removeBlock(currentState);
                }
                else {
                    this.createBlock(currentState);
                }
                break;
            }
            case actionType.blockRemoved:
                if (this.undoRedoAction.isUndoing) {
                    this.createBlock(currentState);
                    // If last deletion was a soft-selected special block, restore overlay on undo
                    const restoredId = currentState.oldBlockModel && currentState.oldBlockModel.id;
                    if (restoredId && this.parent.lastHighlightedBlockId === restoredId) {
                        const blockEle = this.parent.getBlockElementById(restoredId);
                        if (blockEle) {
                            this.parent.selectionOverlay.show(currentState.oldBlockModel.id);
                            if (this.parent.nodeSelection) {
                                this.parent.nodeSelection.clearSelection();
                            }
                        }
                    }
                }
                else {
                    this.removeBlock(currentState);
                }
                break;
        }
    }
    /**
     * Creates block with given state
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    createBlock(currentState) {
        const deletedBLockIndex = currentState.data ? currentState.data.currentIndex : -1;
        if (deletedBLockIndex < 0) {
            return;
        }
        const { blockBeforeSplit, blocksAfterSplit, isSplitting, isTargetDeletion } = (currentState.data);
        const parentId = blockBeforeSplit ? blockBeforeSplit.parentId : currentState.oldBlockModel.parentId;
        const parentBlock = getBlockModelById(parentId, this.parent.getEditorBlocks());
        const parentCell = findCellById(parentId, this.parent.getEditorBlocks());
        const targetIndex = deletedBLockIndex === 0 ? deletedBLockIndex : deletedBLockIndex - 1;
        const afterBlockModel = parentBlock
            ? parentBlock.properties.children[targetIndex]
            : (parentCell ? parentCell.blocks[targetIndex] : this.parent.getEditorBlocks()[targetIndex]);
        const addedBlock = this.parent.blockCommand.addBlock({
            targetBlock:  this.parent.blockContainer.querySelector('#' + afterBlockModel.id),
            blockType: isSplitting ? blocksAfterSplit[1].blockType : currentState.oldBlockModel.blockType,
            block: isSplitting ? blocksAfterSplit[1] : currentState.oldBlockModel,
            isAfter: deletedBLockIndex > 0,
            isUndoRedoAction: true,
            preventEventTrigger: true,
            forceIgnoreTargetUpdate: true
        });
        if (isSplitting && blocksAfterSplit) {
            const cursorBlock = blocksAfterSplit[0];
            this.parent.blockService.replaceBlock(cursorBlock.id, cursorBlock);
            this.parent.stateManager.updateManagerBlocks();
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: getBlockModelById(cursorBlock.id, this.parent.getEditorBlocks()) }],
                    preventEventTrigger: true
                } });
        }
        else {
            const newBlockElement = this.parent.getBlockElementById(addedBlock.id);
            const direction = isTargetDeletion ? 'next' : 'previous';
            const adjacentBlock = getAdjacentBlock(newBlockElement, direction);
            const canSetFocusToAdjacent = (adjacentBlock &&
                (isTargetDeletion || isNonContentEditableBlock(currentState.oldBlockModel.blockType)));
            if (canSetFocusToAdjacent) {
                this.parent.setFocusAndUIForNewBlock(adjacentBlock);
            }
            else if (currentState.oldBlockModel.blockType === BlockType.Callout) {
                this.parent.setFocusAndUIForNewBlock(newBlockElement.querySelector('.' + BLOCK_CLS));
            }
            else if (currentState.oldBlockModel.blockType === BlockType.Quote) {
                this.parent.setFocusAndUIForNewBlock(newBlockElement.querySelector('.' + BLOCK_CLS));
            }
        }
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    }
    /**
     * Removes block with given state
     *
     * @param {IUndoRedoState} currentState - Specifies the current state of the undo redo action
     * @returns {void} - Returns void
     * @hidden
     */
    removeBlock(currentState) {
        const { blockBeforeSplit, isAfter, isSplitting } = (currentState.data);
        const blockElement = this.parent.blockContainer.querySelector(`#${currentState.data.blockId}`);
        if (isSplitting) {
            const targetBlockElement = this.parent.getBlockElementById(blockBeforeSplit.id);
            const newCursorPos = getBlockContentElement(targetBlockElement).textContent.length;
            const newBlock = blockBeforeSplit;
            this.parent.blockCommand.deleteBlock({ blockElement: blockElement, isUndoRedoAction: true, preventEventTrigger: true });
            this.parent.blockService.replaceBlock(blockBeforeSplit.id, newBlock);
            this.parent.stateManager.updateManagerBlocks();
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: getBlockModelById(blockBeforeSplit.id, this.parent.getEditorBlocks()) }],
                    preventEventTrigger: true
                } });
            this.parent.setFocusToBlock(targetBlockElement);
            setCursorPosition(getBlockContentElement(targetBlockElement), newCursorPos);
        }
        else {
            const direction = isAfter ? 'previous' : 'next';
            let adjacentBlock = getAdjacentBlock(blockElement, direction);
            if (!adjacentBlock) {
                // Fallback - try with opposite direction
                adjacentBlock = getAdjacentBlock(blockElement, (direction === 'previous' ? 'next' : 'previous'));
            }
            this.parent.setFocusAndUIForNewBlock(adjacentBlock);
            this.parent.blockCommand.deleteBlock({ blockElement: blockElement, isUndoRedoAction: true, preventEventTrigger: true });
        }
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    }
}

/**
 * `UndoRedoManager` module is used to handle undo and redo actions.
 */
class UndoRedoAction {
    constructor(manager) {
        /** @hidden */
        this.undoRedoStack = [];
        /** @hidden */
        this.index = -1; // points to the last applied action; -1 means no actions applied
        /** @hidden */
        this.isUndoing = false;
        /** @hidden */
        this.isRedoing = false;
        this.preventRestores = new Set([
            actionType.tableRowInserted, actionType.tableRowDeleted, actionType.tableColumnDeleted, actionType.tableColumnInserted,
            actionType.tableCellsCleared,
            actionType.blockAdded, actionType.blockRemoved, actionType.blockMoved, actionType.formattingAction,
            actionType.blockTransformed, actionType.multipleBlocksTransformed
        ]);
        /** @hidden */
        this.isBatchMode = false;
        /** @hidden */
        this.batchedTransforms = [];
        this.parent = manager;
        this.undoRedoManager = new UndoRedoManager(this.parent, this);
        this.addEventListener();
    }
    addEventListener() {
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListener() {
        this.parent.observer.off(events.destroy, this.destroy);
    }
    /**
     * Begins a batch mode for tracking multiple block transformations as a single undo action
     *
     * @returns {void}
     * @hidden
     */
    beginBatchTransform() {
        this.isBatchMode = true;
        this.batchedTransforms = [];
    }
    /**
     * Resets the batch mode state and clears batched transformations
     *
     * @returns {void}
     * @private
     */
    resetBatchState() {
        this.isBatchMode = false;
        this.batchedTransforms = [];
    }
    /**
     * Ends batch mode and pushes all accumulated block transformations as a single undo entry
     *
     * @returns {void}
     * @hidden
     */
    endBatchTransform() {
        if (!this.isBatchMode || this.batchedTransforms.length === 0) {
            this.resetBatchState();
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.multipleBlocksTransformed,
            data: {
                transformedBlocks: decoupleReference(this.batchedTransforms)
            }
        });
        this.resetBatchState();
    }
    /**
     * Checks if batch mode is currently active
     *
     * @returns {boolean} True if in batch mode
     * @hidden
     */
    getIsBatchMode() {
        return this.isBatchMode;
    }
    /**
     * Handles the undo operation.
     *
     * @returns {void}
     * @hidden
     */
    undo() {
        this.performUndoRedo(true, 'isUndoing');
    }
    /**
     * Handles the redo operation.
     *
     * @returns {void}
     * @hidden
     */
    redo() {
        this.performUndoRedo(false, 'isRedoing');
    }
    /**
     * Executes undo or redo operation, updating editor state and notifying observers.
     * Processes sibling actions for formatting or paste, then applies the target state.
     *
     * @param {boolean} isUndo - True for undo, false for redo.
     * @param {string} flagName - State flag ('isUndoing' or 'isRedoing') to prevent recursion.
     * @returns {void}
     */
    performUndoRedo(isUndo, flagName) {
        this.parent.selectionOverlay.clearSelectionOverlay();
        this.parent.inlineToolbarModule.hideInlineToolbar();
        const canPerform = isUndo ? this.canUndo() : this.canRedo();
        if (!canPerform) {
            return;
        }
        this[`${flagName}`] = true;
        const siblingAction = this.undoRedoStack[this.index + 2];
        const shouldProcessSiblingAction = !isUndo && siblingAction !== undefined && (
        // Case 1: Formatting while typing (Press ctrlB and type)
        siblingAction.data.isTypingWithFormat ||
            // Case 2: Clipboard paste - (with blocks) or (selective paste)
            (siblingAction.action === 'clipboardPaste' &&
                siblingAction.data.type === 'blocks'
                ||
                    siblingAction.data.isSelectivePaste));
        this.index = shouldProcessSiblingAction ? this.index + 1 : this.index;
        const state = isUndo ? this.undoRedoStack[this.index] : this.undoRedoStack[this.index + 1];
        if (isUndo) {
            this.updateFileUploadPropsOnStack(state);
        }
        if (state) {
            // Process the action first
            this.processUndoRedoAction(state);
            // Then move the pointer
            this.index = isUndo ? this.index - 1 : this.index + 1;
            const eventArgs = {
                isUndo,
                content: isUndo ? state.oldBlockModel : state.updatedBlockModel,
                previousContent: isUndo ? state.updatedBlockModel : state.oldBlockModel
            };
            this.parent.observer.notify('undoRedoPerformed', eventArgs);
            this.parent.listPlugin.recalculateMarkersForListItems();
            this.parent.stateManager.updateManagerBlocks();
        }
        this[`${flagName}`] = false;
    }
    /**
     * Pushes the given state into the undo stack
     *
     * @param {IUndoRedoState} state - The current state.
     * @returns {void}
     * @hidden
     */
    pushActionIntoUndoStack(state) {
        const isSelectionPresent = !isNullOrUndefined(this.parent.previousSelection);
        const isTextSelected = isSelectionPresent && !this.parent.previousSelection.isCollapsed;
        const currentState = Object.assign({}, state, { undoSelection: isSelectionPresent ? this.parent.previousSelection : captureSelectionState(), redoSelection: ((isTextSelected && !(state.action === actionType.formattingAction))
                || (isSelectionPresent && state.action === actionType.blockTransformed))
                ? this.parent.previousSelection
                : captureSelectionState() });
        // Truncate any future states if we are not at the end
        if (this.index < this.undoRedoStack.length - 1) {
            this.undoRedoStack = this.undoRedoStack.slice(0, this.index + 1);
        }
        // Push new state
        this.undoRedoStack.push(currentState);
        // Enforce max size
        if (this.undoRedoStack.length > this.parent.undoRedoStack) {
            const excess = this.undoRedoStack.length - this.parent.undoRedoStack;
            this.undoRedoStack = this.undoRedoStack.slice(excess);
            this.index = Math.max(this.index - excess, -1);
        }
        // Point to the last item
        this.index = this.undoRedoStack.length - 1;
        this.parent.previousSelection = undefined;
    }
    /**
     * Processes the undo/redo action.
     *
     * @param {IUndoRedoState} currentState - The current undo/redo state.
     * @returns {void}
     * @hidden
     */
    processUndoRedoAction(currentState) {
        this.parent.floatingIconAction.hideFloatingIcons();
        /* Perform core actions */
        this.applyUndoRedoChange(currentState);
        /* UI and selection refresh */
        const action = currentState.action;
        const shouldPreventRestore = this.preventRestores.has(action);
        if (!shouldPreventRestore) {
            this.restoreSelectionState(currentState);
        }
        if ((action === actionType.contentChanged || action === actionType.lineBreakAdded) && this.parent.currentFocusedBlock) {
            this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
        }
        this.parent.refreshPlaceholder();
    }
    applyUndoRedoChange(currentState) {
        switch (currentState.action) {
            case actionType.contentChanged: {
                const blockId = currentState.data ? currentState.data.blockId : '';
                this.undoRedoManager.reRenderWithPreviousState(blockId, currentState.oldBlockModel, currentState.updatedBlockModel);
                break;
            }
            case actionType.formattingAction:
                this.undoRedoManager.handleFormattingUndoRedo(currentState);
                break;
            case actionType.isExpanded: {
                const blockElement = this.parent.getBlockElementById(currentState.data.blockId);
                const updatedState = this.isUndoing ? !currentState.data.isExpanded
                    : currentState.data.isExpanded;
                this.parent.blockRenderer.collapsibleRenderer.updateCollapsibleBlockExpansion(blockElement, updatedState, true);
                break;
            }
            case actionType.indent: {
                if (this.isUndoing) {
                    this.parent.execCommand({ command: 'IndentBlock', state: {
                            blockIDs: currentState.data.blockIDs,
                            shouldDecrease: !currentState.data.shouldDecrease,
                            isUndoRedoAction: true
                        } });
                }
                else {
                    this.parent.execCommand({ command: 'IndentBlock', state: {
                            blockIDs: currentState.data.blockIDs,
                            shouldDecrease: currentState.data.shouldDecrease,
                            isUndoRedoAction: true
                        } });
                }
                break;
            }
            case actionType.checked: {
                const block = getBlockModelById(currentState.data.blockId, this.parent.getEditorBlocks());
                const updatedState = this.isUndoing ? !currentState.data.isChecked
                    : currentState.data.isChecked;
                this.parent.blockRenderer.listRenderer.toggleCheckedState(block, updatedState, true);
                break;
            }
            case actionType.lineBreakAdded: {
                const state = currentState.data;
                const blockModel = getBlockModelById(state.blockId, this.parent.getEditorBlocks());
                const oldBlock = decoupleReference(blockModel);
                this.parent.blockService.updateContent(blockModel.id, this.isUndoing ? currentState.oldContents : currentState.newContents);
                this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                        data: [{ block: blockModel, oldBlock: oldBlock }]
                    } });
                break;
            }
            case actionType.blockAdded:
            case actionType.blockRemoved:
                this.undoRedoManager.blockAdditionDeletionUndoRedo(currentState);
                this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
                break;
            case actionType.blockMoved:
                this.undoRedoManager.handleBlockMovement(currentState);
                break;
            case actionType.multipleBlocksDeleted:
                this.undoRedoManager.handleMultipleBlocksUndoRedo(currentState);
                break;
            case actionType.blockTransformed:
                this.undoRedoManager.reTransformBlocks(currentState);
                break;
            case actionType.multipleBlocksTransformed:
                this.undoRedoManager.reTransformMultipleBlocks(currentState);
                break;
            case actionType.imageInsertion:
                this.undoRedoManager.handleImageInsertion(currentState);
                break;
            case actionType.clipboardPaste:
                this.undoRedoManager.handleClipboardActions(currentState);
                break;
            case actionType.tableRowInserted:
                this.undoRedoManager.processRowAction(currentState.data, 'insert');
                break;
            case actionType.tableRowDeleted:
                this.undoRedoManager.processRowAction(currentState.data, 'delete');
                break;
            case actionType.tableColumnInserted:
                this.undoRedoManager.processColumnAction(currentState.data, 'insert');
                break;
            case actionType.tableColumnDeleted:
                this.undoRedoManager.processColumnAction(currentState.data, 'delete');
                break;
            case actionType.tableRowsDeleted:
                this.undoRedoManager.handleBulkRowsDeleted(currentState);
                break;
            case actionType.tableColumnsDeleted:
                this.undoRedoManager.handleBulkColumnsDeleted(currentState);
                break;
            case actionType.tableCellsCleared:
                this.undoRedoManager.handleTableCellsCleared(currentState);
                break;
            case actionType.tableCellsPasted:
                this.undoRedoManager.handleTableCellsPasted(currentState);
                break;
            case actionType.tableHeaderInput:
                this.undoRedoManager.handleTableHeaderUndoRedo(currentState);
                break;
            case actionType.tableColumnResized:
                this.undoRedoManager.handleTableColumnResized(currentState);
                break;
        }
    }
    /**
     * Restores the selection after undo/redo action.
     *
     * @param {IUndoRedoState} currentState - The current undo/redo state.
     * @returns {void}
     * @hidden
     */
    restoreSelectionState(currentState) {
        const selection = this.isUndoing ? currentState.undoSelection : currentState.redoSelection;
        if (selection) {
            const startBlock = this.parent.rootEditorElement.querySelector('#' + selection.startBlockId);
            const endBlock = this.parent.rootEditorElement.querySelector('#' + selection.endBlockId);
            if (startBlock && endBlock) {
                const startNode = getNodeFromPath(startBlock, selection.startContainerPath);
                const endNode = getNodeFromPath(endBlock, selection.endContainerPath);
                const isSelectivePaste = currentState.action === actionType.clipboardPaste
                    && currentState.data.isSelectivePaste;
                const canRestoreForActions = currentState.action === actionType.indent
                    || currentState.action === actionType.formattingAction
                    || currentState.action === actionType.multipleBlocksDeleted;
                if ((this.isUndoing || (canRestoreForActions && this.isRedoing))
                    && !selection.isCollapsed && startNode && endNode) {
                    this.parent.nodeSelection.createRangeWithOffsets(startNode, endNode, selection.startOffset, selection.endOffset);
                }
                else if (!isSelectivePaste && ((this.isRedoing && startNode) || selection.isCollapsed && startNode)) {
                    const blockElement = findClosestParent(startNode, '.' + BLOCK_CLS);
                    this.parent.setFocusToBlock(blockElement);
                    const contentElement = getBlockContentElement(blockElement);
                    const nodeBaseOffset = getTextOffset(startNode, contentElement);
                    const absoluteOffset = nodeBaseOffset + selection.startOffset;
                    setCursorPosition(contentElement, absoluteOffset);
                }
            }
        }
        else {
            // Fallback
            if (this.parent.currentFocusedBlock && document.contains(this.parent.currentFocusedBlock)) {
                const contentElement = getBlockContentElement(this.parent.currentFocusedBlock);
                if (contentElement) {
                    this.parent.setFocusToBlock(this.parent.currentFocusedBlock);
                    const position = contentElement.textContent.length;
                    setCursorPosition(contentElement, position);
                }
            }
        }
    }
    updateFileUploadPropsOnStack(state) {
        /* The block model stored on stack might not have proper src since it is pushed before user uploads
            a file. Hence we are updating here as it surely has updated src in current block model in the editor */
        const validTypes = [BlockType.Image];
        const blockModel = state.action === actionType.blockAdded ?
            state.oldBlockModel : state.data.newBlockModel;
        const isValid = ((state.action === actionType.blockTransformed
            || state.action === actionType.blockAdded || state.action === actionType.imageInsertion)
            && validTypes.indexOf(blockModel.blockType) !== -1);
        if (isValid) {
            // Update the props such as src into the stack
            const currentUpdatedBlock = getBlockModelById(blockModel.id, this.parent.getEditorBlocks());
            blockModel.properties = Object.assign({}, currentUpdatedBlock.properties);
        }
    }
    trackCheckedStateForUndoRedo(blockId, state) {
        this.pushActionIntoUndoStack({
            action: actionType.checked,
            data: { blockId: blockId, isChecked: state }
        });
    }
    trackContentChangedForUndoRedo(oldBlock, updatedBlock) {
        this.pushActionIntoUndoStack({
            oldBlockModel: oldBlock,
            updatedBlockModel: updatedBlock,
            action: actionType.contentChanged,
            data: { blockId: updatedBlock.id }
        });
    }
    trackFormattingForUndoRedo(blockIDs, oldBlockModels, updatedBlockModels, isTypingWithFormat, selection) {
        this.pushActionIntoUndoStack({
            action: actionType.formattingAction,
            data: {
                blockIDs,
                oldBlockModels,
                updatedBlockModels,
                isTypingWithFormat,
                selectionState: selection
            }
        });
    }
    /**
     * Handles undo/redo recording for block addition
     *
     * @param {IAddBlockInteraction} args - The arguments for adding a block.
     * @param {BlockModel} blockModel - The block model.
     * @returns {void}
     * @hidden
     */
    trackBlockAdditionForUndoRedo(args, blockModel) {
        if (args.isUndoRedoAction) {
            return;
        }
        const decoupledBlock = decoupleReference(blockModel);
        const targetBlockModel = args.targetBlockModel ? decoupleReference(args.targetBlockModel) : null;
        const blockBeforeSplit = args.blockBeforeSplit ? decoupleReference(args.blockBeforeSplit) : null;
        this.pushActionIntoUndoStack({
            action: actionType.blockAdded,
            data: {
                blockId: blockModel.id,
                currentIndex: getBlockIndexById(blockModel.id, this.parent.getEditorBlocks()),
                isSplitting: args.isSplitting,
                isAfter: args.isAfter,
                blockBeforeSplit: blockBeforeSplit,
                blocksAfterSplit: [targetBlockModel, decoupledBlock]
            },
            oldBlockModel: decoupledBlock
        });
    }
    /**
     * Records block removal for undo/redo
     *
     * @param {IDeleteBlockInteraction} args - The arguments for deleting a block.
     * @param {string} blockId - The ID of the block.
     * @param {BlockModel} blockModel - The block model.
     * @param {number} blockIndex - The index of the block.
     * @returns {void}
     * @hidden
     */
    trackBlockRemovalForUndoRedo(args, blockId, blockModel, blockIndex) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.blockRemoved,
            data: {
                blockId: blockId,
                currentIndex: blockIndex,
                isSplitting: args.isSplitting,
                isTargetDeletion: args.isTargetDeletion,
                blocksAfterSplit: args.blocksAfterSplit,
                blockBeforeSplit: args.blockBeforeSplit
            },
            oldBlockModel: decoupleReference(blockModel)
        });
    }
    /**
     * Records a block move operation for undo/redo
     *
     * @param {IMoveBlocksInteraction} args - The arguments for moving a block.
     * @param {IFromBlockData[]} movedBlocks - The blocks that are moved.
     * @param {number} toBlockIndex - The index of the block to which the blocks are moved.
     * @param {string} toParentId - The ID of the parent block to which the blocks are moved.
     * @param {boolean} isMovingUp - Indicates whether the blocks are moved up.
     * @returns {void}
     * @hidden
     */
    trackBlockMoveForUndoRedo(args, movedBlocks, toBlockIndex, toParentId, isMovingUp) {
        if (args.isUndoRedoAction) {
            return;
        }
        const reversedFromModels = movedBlocks.slice().reverse();
        this.pushActionIntoUndoStack({
            action: actionType.blockMoved,
            data: {
                blockIds: reversedFromModels.map((fromModel) => fromModel.blockId),
                fromIndex: reversedFromModels.map((fromModel) => fromModel.index),
                toBlockId: args.toBlockId,
                toIndex: toBlockIndex,
                fromParentId: reversedFromModels.map((fromModel) => fromModel.parent ? fromModel.parent.id : ''),
                toParentId: toParentId,
                isMovedUp: isMovingUp
            }
        });
    }
    /**
     * Triggers event notification for block transformation
     *
     * @param {HTMLElement} blockElement The block element
     * @param {BlockModel} newBlock - The new transformed block
     * @param {BlockModel} oldBlock - The old block for reference
     * @param {boolean} isUndoRedoAction - Specifies whether it is undo redo action
     * @returns {void}
     * @hidden
     */
    trackBlockTransformForUndoRedo(blockElement, newBlock, oldBlock, isUndoRedoAction) {
        if (isUndoRedoAction) {
            return;
        }
        // If in batch mode, collect the transformation instead of pushing to stack
        if (this.isBatchMode) {
            this.batchedTransforms.push({
                blockId: blockElement.id,
                oldBlockModel: oldBlock,
                newBlockModel: decoupleReference(newBlock)
            });
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.blockTransformed,
            data: {
                blockId: blockElement.id,
                oldBlockModel: oldBlock,
                newBlockModel: decoupleReference(newBlock)
            }
        });
    }
    /**
     * Handles undo/redo recording for image insertion (placeholder → uploaded image)
     *
     * @param {string} blockId - The ID of the image block
     * @param {BlockModel} oldBlockModel - The block model before insertion (src empty)
     * @param {BlockModel} newBlockModel - The block model after insertion (src filled)
     * @returns {void}
     * @hidden
     */
    trackImageInsertionForUndoRedo(blockId, oldBlockModel, newBlockModel) {
        this.pushActionIntoUndoStack({
            action: actionType.imageInsertion,
            data: {
                blockId: blockId,
                oldBlockModel: oldBlockModel,
                newBlockModel: newBlockModel
            }
        });
    }
    /**
     * Handles undo/redo recording for clipboard paste
     *
     * @param {IAddBulkBlocksInteraction} args - The arguments of clipboard paste.
     * @returns {void}
     * @hidden
     */
    trackClipboardPasteForUndoRedo(args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.clipboardPaste,
            oldBlockModel: args.oldBlockModel,
            data: {
                type: args.insertionType,
                blocks: decoupleReference(args.blocks.map((block) => decoupleReference(block))),
                targetBlockId: args.targetBlockId,
                isPastedAtStart: args.isPastedAtStart,
                isSelectivePaste: args.isSelectivePaste,
                cursorBlockAfterSplit: args.cursorBlockAfterSplit,
                clipboardData: {
                    blocks: args.clipboardBlocks
                }
            }
        });
    }
    /**
     * Handles indent action for undo redo
     *
     * @param {IIndentOperation} args - The arguments for indenting blocks
     * @returns {void}
     * @hidden
     */
    trackIndentActionForUndoRedo(args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.indent,
            data: {
                blockIDs: args.blockIDs,
                shouldDecrease: args.shouldDecrease,
                isUndoRedoAction: args.isUndoRedoAction
            }
        });
    }
    /**
     * Handles Line break action for undo redo
     *
     * @param {ILineBreakOperation} args - The arguments of inserted line breaks
     * @returns {void}
     * @hidden
     */
    trackLineBreakActionForUndoRedo(args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.lineBreakAdded,
            oldContents: args.oldContent,
            newContents: args.newContent,
            data: {
                blockId: args.blockId
            }
        });
    }
    /**
     * Handles expanded state of collapsible block for undo redo
     *
     * @param {string} blockId - The id of the block
     * @param {boolean} state - The collapsed state
     * @returns {void}
     * @hidden
     */
    trackExpandedStateForUndoRedo(blockId, state) {
        this.pushActionIntoUndoStack({
            action: actionType.isExpanded,
            data: { blockId: blockId, isExpanded: state }
        });
    }
    /**
     * Handles undo/redo recording for table block row addition
     *
     * @param {ITableRowInsertOptions} args - The arguments for adding a row.
     * @returns {void}
     * @hidden
     */
    trackTableRowInsertionForUndoRedo(args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.tableRowInserted,
            data: { blockId: args.blockId, rowIndex: args.rowIndex, rowModel: args.rowModel }
        });
    }
    /**
     * Handles undo/redo recording for table block row deletion
     *
     * @param {ITableRowInsertOptions} args - The arguments for adding a row.
     * @returns {void}
     * @hidden
     */
    trackTableRowDeletionForUndoRedo(args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.tableRowDeleted,
            data: { blockId: args.blockId, rowIndex: args.rowIndex, rowModel: args.rowModel }
        });
    }
    /**
     * Handles undo/redo recording for table block column addition
     *
     * @param {ITableColumnInsertOptions} args - The arguments for adding a row.
     * @returns {void}
     * @hidden
     */
    trackTableColumnInsertionForUndoRedo(args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.tableColumnInserted,
            data: {
                blockId: args.blockId,
                colIndex: args.colIndex,
                columnModel: args.columnModel,
                columnCells: args.columnCells
            }
        });
    }
    /**
     * Handles undo/redo recording for table block row deletion
     *
     * @param {ITableColumnInsertOptions} args - The arguments for adding a row.
     * @returns {void}
     * @hidden
     */
    trackTableColumnDeletionForUndoRedo(args) {
        if (args.isUndoRedoAction) {
            return;
        }
        this.pushActionIntoUndoStack({
            action: actionType.tableColumnDeleted,
            data: {
                blockId: args.blockId,
                colIndex: args.colIndex,
                columnModel: args.columnModel,
                columnCells: args.columnCells
            }
        });
    }
    /**
     * Handles undo/redo recording for table cell clearance.
     *
     * @param {ITableCellsClearOperation} args - The arguments for table cell clearance.
     * @returns {void}
     * @hidden
     */
    trackTableCellsClearForUndoRedo(args) {
        this.pushActionIntoUndoStack({
            action: actionType.tableCellsCleared,
            data: {
                blockId: args.blockId,
                cells: args.cells
            }
        });
    }
    /**
     * Handles undo/redo recording for table cell level paste.
     *
     * @param {ITableCellsPasteOperation} args - The arguments for table cell paste.
     * @returns {void}
     * @hidden
     */
    trackTableCellsPasteForUndoRedo(args) {
        this.pushActionIntoUndoStack({
            action: actionType.tableCellsPasted,
            data: {
                blockId: args.blockId,
                cells: args.cells,
                structureDelta: args.structureDelta
            }
        });
    }
    /**
     * Handles undo/redo recording for table header input.
     *
     * @param {ITableHeaderInputOperation} args - The arguments for table header input.
     * @returns {void}
     * @hidden
     */
    trackTableHeaderInputForUndoRedo(args) {
        this.pushActionIntoUndoStack({
            action: actionType.tableHeaderInput,
            data: {
                blockId: args.blockId,
                oldColumns: args.oldColumns,
                updatedColumns: args.updatedColumns
            }
        });
    }
    /**
     * Handles undo/redo recording for table bulk row deletions
     *
     * @param {IBulkRowsDeleteOperation} args - The arguments for bulk rows deletion.
     * @returns {void}
     * @hidden
     */
    trackBulkRowDeletionForUndoRedo(args) {
        this.pushActionIntoUndoStack({
            action: actionType.tableRowsDeleted,
            data: { blockId: args.blockId, rows: args.rows }
        });
    }
    /**
     * Handles undo/redo recording for table bulk column deletions
     *
     * @param {IBulkColumnsDeleteOperation} args - The arguments for bulk column deletion.
     * @returns {void}
     * @hidden
     */
    trackBulkColumnDeletionForUndoRedo(args) {
        this.pushActionIntoUndoStack({
            action: actionType.tableColumnsDeleted,
            data: { blockId: args.blockId, cols: args.cols }
        });
    }
    /**
     * Handles undo/redo recording for table column resize operations
     *
     * @param {ITableColumnResizeOperation} data - The arguments for column resize
     * @returns {void}
     * @hidden
     */
    trackTableColumnResizeForUndoRedo(data) {
        this.pushActionIntoUndoStack({
            action: actionType.tableColumnResized,
            data
        });
    }
    /**
     * Checks whether the undo stack is empty or not.
     *
     * @returns {boolean} Returns true if the undo stack is not empty.
     * @hidden
     */
    canUndo() {
        return this.index >= 0 && this.undoRedoStack.length > 0;
    }
    /**
     * Checks whether the redo stack is empty or not.
     *
     * @returns {boolean} Returns true if the redo stack is not empty.
     * @hidden
     */
    canRedo() {
        return this.undoRedoStack.length > 0 && this.index < this.undoRedoStack.length - 1;
    }
    /**
     * Clears the undo and redo stack.
     *
     * @returns {void}
     * @hidden
     */
    clear() {
        this.undoRedoStack = [];
        this.index = -1;
    }
    destroy() {
        this.removeEventListener();
        this.clear();
        this.undoRedoManager = null;
    }
    /**
     * Adjusts undo and redo stacks to respect the new undoRedoStack limit
     *
     * @returns {void}
     * @hidden
     */
    adjustUndoRedoStacks() {
        if (this.undoRedoStack.length > this.parent.undoRedoStack) {
            // Trim from the start to keep the most recent items
            const excess = this.undoRedoStack.length - this.parent.undoRedoStack;
            this.undoRedoStack = this.undoRedoStack.slice(excess);
            this.index = Math.max(this.index - excess, -1);
        }
        // Ensure index stays within bounds
        if (this.index >= this.undoRedoStack.length) {
            this.index = this.undoRedoStack.length - 1;
        }
    }
    /**
     * Applies the next future action during redo without emitting external push/pop changes.
     * Used internally for formatting flows to replay adjacent actions.
     *
     * @returns {void}
     */
    applyNextRedoSibling() {
        // For redo, we don't need to increase the index values since those are handled automatically
        if (this.canRedo()) {
            const nextState = this.undoRedoStack[this.index];
            if (nextState) {
                this.processUndoRedoAction(nextState);
            }
        }
    }
    /**
     * Applies the previous action during undo without emitting external push/pop changes.
     * Used internally for formatting flows to replay adjacent actions.
     *
     * @returns {void}
     */
    applyNextUndoSibling() {
        if (this.canUndo()) {
            const prevState = this.undoRedoStack[this.index - 1];
            if (prevState) {
                this.processUndoRedoAction(prevState);
                this.index--;
            }
        }
    }
}

class BlockEditorMethods {
    constructor(manager) {
        this.parent = manager;
    }
    addBlock(block, targetId, isAfter, preventUIUpdate) {
        const targetBlockModel = getBlockModelById(targetId, this.parent.getEditorBlocks());
        const populatedBlock = BlockFactory.populateBlockProperties([block], targetBlockModel ? targetBlockModel.parentId : '');
        this.parent.execCommand({
            command: 'AddBlock',
            state: {
                block: populatedBlock[0],
                targetBlock: this.parent.blockContainer.querySelector(`#${targetId}`),
                isAfter: isAfter,
                preventUIUpdate: preventUIUpdate
            }
        });
    }
    removeBlock(blockId) {
        const blockElement = this.parent.blockContainer.querySelector(`#${blockId}`);
        this.parent.execCommand({
            command: 'DeleteBlock',
            state: {
                blockElement: blockElement,
                isMethod: true,
                isUndoRedoAction: false,
                preventMinimumOne: true
            }
        });
    }
    getBlock(blockId) {
        return getBlockModelById(blockId, this.parent.getEditorBlocks());
    }
    moveBlock(fromBlockId, toBlockId) {
        this.parent.execCommand({
            command: 'MoveBlock',
            state: {
                fromBlockIds: [fromBlockId],
                toBlockId: toBlockId,
                isInteracted: false
            }
        });
    }
    updateBlock(blockId, properties) {
        if (!blockId || !properties) {
            return false;
        }
        const block = this.getBlock(blockId);
        if (!block) {
            return false;
        }
        /* Model Updates */
        this.parent.blockService.updateBlock(blockId, properties);
        this.parent.stateManager.updateManagerBlocks();
        /* UI Updates */
        const updatedBlockModel = this.getBlock(blockId);
        const oldBlockElement = this.parent.getBlockElementById(blockId);
        const newBlockElement = this.parent.blockRenderer.createBlockElement(updatedBlockModel);
        const parentBlock = getBlockModelById(updatedBlockModel.parentId, this.parent.getEditorBlocks());
        let wrapper = this.parent.blockContainer;
        if (parentBlock) {
            const parentBlockElement = this.parent.getBlockElementById(parentBlock.id);
            let selector = '';
            switch (parentBlock.blockType) {
                case BlockType.Callout:
                    selector = '.' + CALLOUT_CONTENT_CLS;
                    break;
                case BlockType.Quote:
                    selector = '.' + QUOTE_CONTENT_CLS;
                    break;
                default:
                    if (parentBlock.blockType.toString().startsWith('Collapsible')) {
                        selector = '.' + TOGGLE_CONTENT_CLS;
                    }
                    break;
            }
            if (selector) {
                wrapper = parentBlockElement.querySelector(selector);
            }
        }
        if (wrapper) {
            wrapper.insertBefore(newBlockElement, oldBlockElement);
            detach(oldBlockElement);
        }
        if (isListTypeBlock(updatedBlockModel.blockType)) {
            this.parent.listPlugin.recalculateMarkersForListItems();
            if (block.blockType === BlockType.Checklist) {
                if (this.parent.blockRenderer.listRenderer) {
                    this.parent.blockRenderer.listRenderer.toggleCheckedState(updatedBlockModel, updatedBlockModel.properties.isChecked);
                }
            }
        }
        return true;
    }
    executeToolbarAction(command, value) {
        const builtInCommands = Object.keys(CommandName);
        if (builtInCommands.indexOf(command) !== -1) {
            const convertedCommand = command.toLowerCase();
            this.parent.formattingAction.execCommand({ command: convertedCommand, value: value });
        }
    }
    setSelection(node, start, end) {
        if (node) {
            setSelectionRange(node, start, end);
        }
    }
    setCursorPosition(blockId, position) {
        const blockElement = this.parent.getBlockElementById(blockId);
        if (blockElement) {
            const contentElement = getBlockContentElement(blockElement);
            setCursorPosition(contentElement, position);
        }
    }
    getSelectedBlocks() {
        const range = this.getRange();
        if (!range) {
            return null;
        }
        const tableBlk = this.parent.currentFocusedBlock &&
            this.parent.currentFocusedBlock.closest(`.${TABLE_BLOCK_CLS}`);
        if (tableBlk && hasActiveTableSelection(tableBlk)) {
            return this.parent.tableSelectionManager.getSelectedCellBlocks(tableBlk);
        }
        const selectedBlocks = [];
        const editorBlocks = this.parent.getEditorBlocks();
        const blockElements = this.parent.blockContainer.querySelectorAll('.' + BLOCK_CLS);
        const parent = range.commonAncestorContainer;
        const element = parent.nodeType === Node.ELEMENT_NODE
            ? parent
            : parent.parentElement;
        const isSelectionInsideChild = !!(element && element.closest(`.${CALLOUT_CONTENT_CLS}, .${QUOTE_CONTENT_CLS}, .${TOGGLE_CONTENT_CLS}, .${TABLE_CELL_BLK_CONTAINER}`));
        blockElements.forEach((blockElement) => {
            const blockRange = document.createRange();
            blockRange.selectNodeContents(blockElement);
            const block = getBlockModelById(blockElement.id, editorBlocks);
            const isChildrenRootParent = isSelectionInsideChild &&
                (blockElement.classList.contains(CALLOUT_BLOCK_CLS) ||
                    blockElement.classList.contains(QUOTE_BLOCK_CLS) ||
                    blockElement.classList.contains(TOGGLE_BLOCK_CLS) ||
                    blockElement.classList.contains(TABLE_BLOCK_CLS));
            const tableRootBlk = blockElement.closest(`.${TABLE_BLOCK_CLS}`);
            const isSelectionInsideTableCell = this.parent.currentFocusedBlock &&
                !isNullOrUndefined(this.parent.currentFocusedBlock.closest('.e-cell-blocks-container'));
            const canAllowTableBlks = (!tableRootBlk || blockElement.classList.contains('e-table-block')
                || isSelectionInsideTableCell);
            if (block && range.intersectsNode(blockElement) && !isChildrenRootParent && canAllowTableBlks) {
                selectedBlocks.push(block);
            }
        });
        return selectedBlocks;
    }
    getRange() {
        return getSelectedRange();
    }
    selectRange(range) {
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    selectBlock(blockId) {
        const blockElement = this.parent.getBlockElementById(blockId);
        if (blockElement) {
            const range = document.createRange();
            range.selectNodeContents(blockElement);
            this.selectRange(range);
        }
    }
    selectAllBlocks() {
        const range = document.createRange();
        range.selectNodeContents(this.parent.blockContainer);
        this.selectRange(range);
    }
    focusIn() {
        const startBlock = this.parent.getEditorBlocks()[0];
        const startBlkEle = this.parent.getBlockElementById(startBlock.id);
        if (startBlkEle) {
            this.parent.setFocusAndUIForNewBlock(startBlkEle);
        }
    }
    focusOut() {
        this.parent.removeFocusAndUIForBlock(this.parent.currentFocusedBlock);
        if (this.parent.blockContainer) {
            this.parent.blockContainer.blur();
            const selection = window.getSelection();
            selection.removeAllRanges();
        }
    }
    getBlockCount() {
        return this.parent.blocks.length;
    }
    enableDisableToolbarItems(itemId, enable) {
        const toolbarPopup = document.querySelector('#' + this.parent.rootEditorElement.id + INLINE_TBAR_POPUP_ID);
        const ids = typeof itemId === 'string' ? [itemId] : itemId;
        const parentToolbarElements = [];
        const tbarItemModels = [];
        const items = this.parent.inlineToolbarSettings.items;
        ids.forEach((id) => {
            items.forEach((it) => {
                if (typeof it === 'string') {
                    if (it.toLowerCase() === id.toLowerCase()) {
                        const defaults = getInlineToolbarItems();
                        const match = defaults.find((d) => d.command && d.command.toLowerCase() === it.toLowerCase());
                        if (match) {
                            tbarItemModels.push(match);
                        }
                    }
                }
                else {
                    if (it.id === id || it.command === id) {
                        tbarItemModels.push(it);
                    }
                }
            });
        });
        tbarItemModels.forEach((item) => {
            if (!item || !item.command) {
                return;
            }
            const element = toolbarPopup.querySelector(`[data-command=${item.command}]`);
            if (element) {
                parentToolbarElements.push(element);
            }
        });
        if (parentToolbarElements.length > 0) {
            this.parent.observer.notify('enableDisableTbarItems', {
                items: parentToolbarElements,
                isEnable: enable
            });
        }
    }
    getDataAsJson(blockId) {
        if (blockId) {
            const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
            return block ? decoupleReference(block) : null;
        }
        else {
            return this.parent.getEditorBlocks().map((block) => decoupleReference(block));
        }
    }
    getDataAsHtml(blockId) {
        if (blockId) {
            const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
            return block ? getBlockDataAsHTML([block], this.parent.rootEditorElement.id) : null;
        }
        else {
            return getBlockDataAsHTML(this.parent.getEditorBlocks(), this.parent.rootEditorElement.id);
        }
    }
    parseHtmlToBlocks(html) {
        const container = createElement('div', { innerHTML: html });
        return convertHtmlElementToBlocks(container, true);
    }
    renderBlocksFromJson(json, replace, targetBlockId) {
        try {
            const blocksJson = typeof json === 'string' ? JSON.parse(json) : json;
            const blocks = this.extractBlocks(blocksJson);
            const sanitizedBlocks = blocks.map((block) => decoupleReference(block));
            this.parent.stateManager.populateUniqueIds(sanitizedBlocks);
            const populatedBlocks = BlockFactory.populateBlockProperties(sanitizedBlocks);
            if (replace) {
                return this.replaceAllBlocks(populatedBlocks);
            }
            else {
                return this.insertBlocksAtPosition(populatedBlocks, targetBlockId);
            }
        }
        catch (e) {
            console.error('Error rendering blocks from JSON:', e);
            return false;
        }
    }
    extractBlocks(blocksJson) {
        let blocks = [];
        if (Array.isArray(blocksJson)) {
            blocks = blocksJson;
        }
        else if (blocksJson && typeof blocksJson === 'object') {
            if (Array.isArray(blocksJson.blocks)) {
                blocks = blocksJson.blocks;
            }
            else {
                // Try to convert single object to block if it looks like a block
                if (blocksJson.blockType) {
                    blocks = [blocksJson];
                }
            }
        }
        return blocks;
    }
    /**
     * Replaces all blocks in the editor with the provided blocks.
     *
     * @param {BlockModel[]} blocks - The blocks to render
     * @returns {boolean} - True if operation was successful, false otherwise
     * @hidden
     */
    replaceAllBlocks(blocks) {
        this.parent.setEditorBlocks([]);
        this.parent.blockContainer.innerHTML = '';
        if (blocks.length === 0) {
            this.parent.blockCommand.createDefaultEmptyBlock(true);
            return true;
        }
        this.parent.setEditorBlocks(blocks);
        this.parent.stateManager.updateManagerBlocks();
        this.parent.blockRenderer.renderBlocks(this.parent.getEditorBlocks());
        return true;
    }
    /**
     * Inserts blocks at a specific position in the editor.
     *
     * @param {BlockModel[]} blocks - The blocks to insert
     * @param {string} targetBlockId - ID of the block to insert after, uses focused block if not provided
     * @returns {boolean} - True if operation was successful, false otherwise
     * @private
     */
    insertBlocksAtPosition(blocks, targetBlockId) {
        if (blocks.length === 0) {
            return false;
        }
        let insertionPointId = targetBlockId;
        if (!insertionPointId) {
            if (this.parent.currentFocusedBlock) {
                insertionPointId = this.parent.currentFocusedBlock.id;
            }
            else {
                insertionPointId = this.parent.getEditorBlocks()[this.parent.getEditorBlocks().length - 1].id;
                const blockElement = this.parent.getBlockElementById(insertionPointId);
                this.parent.setFocusToBlock(blockElement);
            }
        }
        let lastInsertedElement;
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            const targetId = i === 0 ? insertionPointId : lastInsertedElement.id;
            const addedBlock = this.parent.blockCommand.addBlock({
                block,
                targetBlock: this.parent.getBlockElementById(targetId),
                isAfter: true,
                preventEventTrigger: true
            });
            lastInsertedElement = this.parent.getBlockElementById(addedBlock.id);
        }
        if (lastInsertedElement) {
            const contentElement = getBlockContentElement(lastInsertedElement);
            this.parent.setFocusToBlock(lastInsertedElement);
            setCursorPosition(contentElement, contentElement.innerText.length);
        }
        return true;
    }
    print() {
        const blockHtml = getBlockDataAsHTML(this.parent.blocks, this.parent.rootEditorElement.id);
        const tempDiv = createElement('div');
        tempDiv.innerHTML = blockHtml;
        let printWind = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth);
        if (Browser.info.name === 'msie') {
            printWind.resizeTo(screen.availWidth, screen.availHeight);
        }
        printWind = print(tempDiv, printWind);
    }
}

class FormattingHandler {
    constructor(manager) {
        this.parent = manager;
    }
    /**
     * Applies or removes a specific formatting style to a given node within a selection range.
     *
     * This method handles the process of wrapping the target node with the appropriate formatting element
     * or unwrapping/removing styles if the formatting is already present. It ensures that the formatting
     * is correctly applied or removed without disrupting the document structure.
     *
     * @param {Range} range - Optional range object representing the current selection, used for precise node splicing.
     * @param {string} format - The style property to modify, such as 'bold', 'italic', 'color', etc.
     * @param {ExecCommandOptions} options - Options to apply formatting
     * @returns {void}
     */
    executeFormat(range, format, options) {
        const { value, shouldRemoveGlobally } = options;
        // STEP 1: Get all text nodes in selection
        const nodes = getNodesInRange(range);
        // STEP 2: Decide apply or remove based on format state
        const shouldRemove = shouldRemoveGlobally !== undefined
            ? shouldRemoveGlobally
            : FormattingHelper.shouldRemoveFormat(nodes, format);
        const valueBasedFormats = ['color', 'backgroundColor', 'link'];
        const isValueBased = valueBasedFormats.indexOf(format) !== -1;
        // STEP 3: Process each node
        for (const node of nodes) {
            const isMentionNode = findClosestParent(node, '.e-mention-chip');
            if (isMentionNode) {
                continue;
            }
            const formatNode = FormattingHelper.getFormattedNode(node, format);
            if ((formatNode && shouldRemove) || (formatNode && isValueBased && !value)) {
                // Node HAS format and we're REMOVING (boolean styles)
                // Node HAS format, user intent to empty it so we're REMOVING (value based styles)
                this.removeFormatFromNode(node, format, range);
            }
            else if (formatNode && isValueBased && value) {
                // Node HAS format and we're REPLACING value (value-based styles)
                // Replace the value instead of wrapping again
                this.updateNodeValue(node, format, value, range);
            }
            else if (!formatNode && !shouldRemove) {
                // Node LACKS format and we're APPLYING
                this.applyFormatToNode(node, format, value, range);
            }
        }
        // STEP 4: Handle toggle pairs (superscript↔subscript, uppercase↔lowercase)
        // When applying a format that has a toggle pair, remove its opposite
        if (!shouldRemove) {
            const togglePairs = ['superscript', 'subscript', 'uppercase', 'lowercase'];
            if (togglePairs.indexOf(format) !== -1) {
                const oppositeFormat = getInverseStyle(format);
                for (const node of nodes) {
                    const conflictNode = FormattingHelper.getFormattedNode(node, oppositeFormat);
                    if (conflictNode) {
                        this.parent.formattingAction.nodeSelection.restoreSelection();
                        const blockRange = getBlockSpecificRange(this.parent.nodeSelection.getRange(), findClosestParent(range.startContainer, '.e-block'));
                        this.removeFormatFromNode(node, oppositeFormat, blockRange);
                    }
                }
            }
        }
        // STEP 5: Final cleanup
        this.cleanupRange(range);
    }
    /**
     * Applies or removes a specific formatting style to a given node within a selection range.
     *
     * @param {Node} node - The DOM node to which the formatting will be applied or removed.
     * @param {string} format - The style property to modify, such as 'bold', 'italic', 'color', etc.
     * @param {string} value - Optional value for the style, e.g., color, bgColor or link.
     * @param {Range} range - Optional range object representing the current selection, used for precise node splicing.
     * @returns {void}
     */
    applyFormatToNode(node, format, value, range) {
        // Step 1: Split to isolate selected content
        const splitNode = this.parent.nodeCutter.getSpliceNode(range, node);
        // Step 2: Create format wrapper element
        const wrapper = this.createFormatElement(format, value);
        // Step 3: Wrap the split node
        const parent = splitNode.parentNode;
        if (parent) {
            parent.insertBefore(wrapper, splitNode);
            wrapper.appendChild(splitNode);
        }
    }
    /**
     * Remove formatting from a node by unwrapping or clearing styles.
     *
     * This method locates the formatted node within the selection,
     * then either unwraps it from its formatting element or clears inline styles.
     *
     * @param {Node} node - The node from which to remove formatting.
     * @param {string} format - The format type to remove.
     * @param {Range} [range] - Optional range to assist in node splicing.
     * @returns {void}
     */
    removeFormatFromNode(node, format, range) {
        const formatNode = FormattingHelper.getFormattedNode(node, format);
        const splitNode = this.parent.nodeCutter.getSpliceNode(range, formatNode);
        if (this.isStyleBased(format)) {
            this.removeStyleFromElement(splitNode, format);
            const elem = splitNode;
            if (elem.getAttribute('style') === '' || !elem.getAttribute('style')) {
                elem.removeAttribute('style');
                if (!elem.hasAttributes()) {
                    this.unwrapElement(elem);
                }
            }
        }
        else {
            this.unwrapElement(splitNode);
        }
    }
    unwrapElement(element) {
        const parent = element.parentNode;
        while (element.firstChild) {
            parent.insertBefore(element.firstChild, element);
        }
        element.remove();
        parent.normalize();
    }
    createFormatElement(format, value) {
        const tagMap = {
            'bold': 'strong',
            'italic': 'em',
            'underline': 'u',
            'strikethrough': 's',
            'subscript': 'sub',
            'superscript': 'sup',
            'inlineCode': 'code',
            'link': 'a'
        };
        const tagName = tagMap[format];
        if (this.isStyleBased(format)) {
            return this.createStyledSpan(format, value);
        }
        const elem = document.createElement(tagName);
        if (format === 'inlineCode') {
            elem.className = 'e-be-inline-code';
        }
        else if (format === 'link') {
            const linkData = value;
            if (linkData && !linkData.shouldRemoveLink) {
                elem.href = linkData.url;
                elem.target = '_blank';
                elem.title = linkData.url;
            }
        }
        return elem;
    }
    createStyledSpan(format, value) {
        const span = document.createElement('span');
        switch (format) {
            case 'color':
                span.style.color = value;
                break;
            case 'backgroundColor':
                span.style.backgroundColor = value;
                break;
            case 'uppercase':
                span.style.textTransform = 'uppercase';
                break;
            case 'lowercase':
                span.style.textTransform = 'lowercase';
                break;
        }
        return span;
    }
    /**
     * Update the style value of an element for value-based formats.
     * This replaces the existing value instead of removing and re-wrapping.
     *
     * @param {Node} node - The node containing the styled content
     * @param {string} format - The format to update
     * @param {string} value - The new value for the style
     * @param {Range} range - Optional range for node splicing
     * @returns {void}
     */
    updateNodeValue(node, format, value, range) {
        const formatNode = FormattingHelper.getFormattedNode(node, format);
        const splitNode = this.parent.nodeCutter.getSpliceNode(range, formatNode);
        if (!splitNode) {
            return;
        }
        // Update the style directly without unwrapping
        const elem = splitNode;
        switch (format) {
            case 'color':
                elem.style.color = value;
                break;
            case 'backgroundColor':
                elem.style.backgroundColor = value;
                break;
            case 'link':
                elem.href = value.url;
                elem.title = value.url;
        }
    }
    removeStyleFromElement(elem, format) {
        switch (format) {
            case 'color':
                elem.style.color = '';
                break;
            case 'backgroundColor':
                elem.style.backgroundColor = '';
                break;
            case 'uppercase':
            case 'lowercase':
                elem.style.textTransform = '';
                break;
        }
    }
    isStyleBased(format) {
        const styleBased = ['color', 'backgroundColor', 'uppercase', 'lowercase'];
        return styleBased.indexOf(format) !== -1;
    }
    cleanupRange(range) {
        const ancestor = range.commonAncestorContainer;
        const container = (ancestor.nodeType === Node.TEXT_NODE) ? ancestor.parentElement : ancestor;
        this.mergeAdjacentTags(container);
        container.normalize();
    }
    mergeAdjacentTags(container) {
        const children = Array.from(container.childNodes);
        let i = 0;
        while (i < children.length - 1) {
            const current = children[i];
            const next = children[(i + 1)];
            if (current.nodeType !== Node.ELEMENT_NODE || next.nodeType !== Node.ELEMENT_NODE) {
                i++;
                continue;
            }
            const currEl = current;
            const nextEl = next;
            if (currEl.tagName !== nextEl.tagName) {
                i++;
                continue;
            }
            if (currEl.tagName === 'SPAN' && currEl.style.cssText !== nextEl.style.cssText) {
                i++;
                continue;
            }
            while (nextEl.firstChild) {
                currEl.appendChild(nextEl.firstChild);
            }
            nextEl.remove();
            children.splice(i + 1, 1);
        }
    }
}

class FormattingAction {
    constructor(manager) {
        /** @hidden */
        this.lastRemovedFormat = null;
        /** @hidden */
        this.activeInlineFormats = new Set();
        this.formatCache = new WeakMap();
        this.ignoredBlockTypes = new Set([BlockType.Callout,
            BlockType.Quote, BlockType.Image, BlockType.Divider, BlockType.Code]);
        this.parent = manager;
        this.nodeSelection = new NodeSelection(this.parent.blockContainer);
        this.formattingHandler = new FormattingHandler(this.parent);
        this.addEventListeners();
    }
    addEventListeners() {
        this.parent.observer.on(FORMATTINGACTION, this.execCommand, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.parent.observer.off(FORMATTINGACTION, this.execCommand);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    /**
     * Executes the formatting command based on the provided options.
     *
     * @param {ExecCommandOptions} options - The options for the formatting command.
     * @returns {void}
     * @hidden
     */
    execCommand(options) {
        this.performOperation(options);
    }
    performOperation(options) {
        const blocksToFormat = this.resolveBlocksToFormat();
        if (!blocksToFormat || blocksToFormat.length === 0) {
            return;
        }
        if (!options.isRemoteChanges) {
            this.nodeSelection.saveSelection();
        }
        const { blockIDs, oldBlockModels, updatedBlockModels } = this.applyFormattingToBlocks(blocksToFormat, options);
        if (!options.isRemoteChanges) {
            this.nodeSelection.restoreSelection();
        }
        this.parent.undoRedoAction.trackFormattingForUndoRedo(blockIDs, oldBlockModels, updatedBlockModels, options.isTypingWithFormat, this.nodeSelection.savedSelectionState);
        this.parent.observer.notify('formatting-performed', options);
    }
    applyFormattingToBlocks(blocks, options) {
        const blockIDs = [];
        const oldBlockModels = [];
        const updatedBlockModels = [];
        options.shouldRemoveGlobally = this.shouldRemoveFormatGlobally(blocks, options);
        for (const block of blocks) {
            if (this.ignoredBlockTypes.has(block.blockType) || block.content.length <= 0) {
                continue;
            }
            blockIDs.push(block.id);
            oldBlockModels.push(decoupleReference(block));
            this.processFormattingActions(block, options);
            updatedBlockModels.push(decoupleReference(block));
        }
        return { blockIDs, oldBlockModels, updatedBlockModels };
    }
    processFormattingActions(block, options) {
        const blockElement = this.parent.getBlockElementById(block.id);
        const contentElement = getBlockContentElement(blockElement);
        const oldBlock = decoupleReference(block);
        const globalRange = getSelectedRange();
        const blockRange = getBlockSpecificRange(globalRange, blockElement);
        // Apply formatting using new handler
        const format = options.subCommand ? options.subCommand.toString() : options.command.toString();
        this.formattingHandler.executeFormat(blockRange, format, options);
        // Parse updated DOM back to model using html-parser utility
        const newContents = convertInlineElementsToContentModels(contentElement, true);
        this.parent.blockService.updateContent(block.id, newContents);
        this.parent.stateManager.updateManagerBlocks();
        // For event track
        this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                data: [{ block: block, oldBlock: oldBlock }],
                excludeDomUpdate: true,
                preventEventTrigger: options.isRemoteChanges
            } });
    }
    /**
     * Handles formatting action on user typing.
     *
     * @returns {boolean} - Returns true if formatting was applied, false otherwise.
     * @hidden
     */
    handleTypingWithActiveFormats() {
        const selection = window.getSelection();
        if (!selection.isCollapsed) {
            return false;
        }
        const range = selection.getRangeAt(0);
        const currentNode = range.startContainer;
        const blockElement = findClosestParent(range.startContainer, '.' + BLOCK_CLS);
        const contentElement = getBlockContentElement(blockElement);
        const absoluteOffset = getAbsoluteOffset(contentElement, range.startContainer, range.startOffset);
        if (this.lastRemovedFormat && this.isNodeFormattedWith(currentNode, this.lastRemovedFormat)) {
            return this.removeFormatToLastCharacter(blockElement, contentElement, range, absoluteOffset);
        }
        if (this.areAllActiveFormatsApplied(currentNode)) {
            return false;
        }
        this.parent.stateManager.updateContentOnUserTyping(blockElement);
        const createdRange = this.nodeSelection.createRangeWithOffsets(range.startContainer, range.startContainer, range.startOffset - 1, range.startOffset);
        this.activeInlineFormats.forEach((format) => {
            if (this.isNodeFormattedWith(currentNode, format)) {
                // Skip this format since it's already applied
                return;
            }
            this.execCommand({ command: format, isTypingWithFormat: true });
        });
        createdRange.collapse(false);
        this.parent.editorMethods.selectRange(createdRange);
        setCursorPosition(contentElement, absoluteOffset);
        return true;
    }
    removeFormatToLastCharacter(blockElement, contentElement, range, absoluteOffset) {
        this.parent.stateManager.updateContentOnUserTyping(blockElement);
        const createdRange = this.nodeSelection.createRangeWithOffsets(range.startContainer, range.startContainer, range.startOffset - 1, range.startOffset);
        this.execCommand({ command: this.lastRemovedFormat, isTypingWithFormat: true });
        this.lastRemovedFormat = null;
        createdRange.collapse(false);
        this.parent.editorMethods.selectRange(createdRange);
        setCursorPosition(contentElement, absoluteOffset);
        return true;
    }
    /**
     * Determines whether formatting should be removed or applied across all selected blocks.
     * This is critical for multi-block selections to ensure consistent behavior.
     *
     * For example, if 3 blocks are selected where block 2 is already bold:
     * - Without global check: Block 1 gets bold applied, Block 2 gets bold removed, Block 3 gets bold applied
     * - With global check: All blocks get bold applied consistently
     *
     * @param {BlockModel[]} blocks - All blocks in the selection
     * @param {ExecCommandOptions} options - Formatting options
     * @returns {boolean} - True if format should be removed, false if it should be applied
     */
    shouldRemoveFormatGlobally(blocks, options) {
        const format = options.subCommand ? options.subCommand.toString() : options.command.toString();
        // Value-based formats (color, backgroundColor, link) should never be "removed" in toggle sense
        const valueBasedFormats = ['color', 'backgroundColor', 'link'];
        if (valueBasedFormats.indexOf(format) !== -1) {
            return false;
        }
        // Collect all text nodes from all blocks
        const globalRange = getSelectedRange();
        const allNodes = [];
        for (const block of blocks) {
            if (this.ignoredBlockTypes.has(block.blockType) || block.content.length <= 0) {
                continue;
            }
            const blockElement = this.parent.getBlockElementById(block.id);
            const blockRange = getBlockSpecificRange(globalRange, blockElement);
            const nodes = getNodesInRange(blockRange);
            allNodes.push(...nodes);
        }
        // Use FormattingHelper to determine if all nodes have the format
        return FormattingHelper.shouldRemoveFormat(allNodes, format);
    }
    /**
     * Toggles the active inline formats when formatting.
     * Triggers when user presses keys such as Ctrl+B, Ctrl+I, Ctrl+U and Ctrl+Shift+X.
     *
     * @param {string} command - The formatting command to toggle.
     * @returns {void}
     * @hidden
     */
    toggleActiveFormats(command) {
        if (this.activeInlineFormats.has(command)) {
            this.activeInlineFormats.delete(command);
            this.lastRemovedFormat = command;
        }
        else {
            this.activeInlineFormats.add(command);
            this.lastRemovedFormat = null;
        }
    }
    areAllActiveFormatsApplied(node) {
        let allApplied = true;
        this.activeInlineFormats.forEach((format) => {
            if (!this.isNodeFormattedWith(node, format)) {
                allApplied = false;
            }
        });
        return allApplied;
    }
    isNodeFormattedWith(node, format) {
        let currentElement = node.nodeType === Node.TEXT_NODE ?
            node.parentElement : node;
        if (currentElement && this.formatCache.has(currentElement)) {
            return this.formatCache.get(currentElement).has(format);
        }
        const formats = new Set();
        while (currentElement) {
            if (this.doesElementHaveFormat(currentElement, format)) {
                formats.add(format);
            }
            // Stop if we've reached an element with an id (root content element)
            if (currentElement.id) {
                break;
            }
            currentElement = currentElement.parentElement;
        }
        if (currentElement) {
            this.formatCache.set(currentElement, formats);
        }
        return formats.has(format);
    }
    doesElementHaveFormat(element, format) {
        switch (format) {
            case 'bold':
                return FormattingHelper.isBold(element);
            case 'italic':
                return FormattingHelper.isItalic(element);
            case 'underline':
                return FormattingHelper.isUnderline(element);
            case 'strikethrough':
                return FormattingHelper.isStrikethrough(element);
            default:
                return false;
        }
    }
    resolveBlocksToFormat() {
        const selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        // Case A: Whole blocks are selected (including possible Table blocks)
        if (selectedBlocks && selectedBlocks.length > 0) {
            return this.expandSelectedBlocks(selectedBlocks);
        }
        // Fallback: should never happen
        return [];
    }
    expandSelectedBlocks(selectedBlocks) {
        const result = [];
        for (const block of selectedBlocks) {
            if (block.blockType === BlockType.Table) {
                const tableEl = this.parent.getBlockElementById(block.id);
                result.push(...this.parent.tableSelectionManager.getAllCellBlocks(tableEl));
            }
            else {
                result.push(block);
            }
        }
        return result;
    }
    destroy() {
        this.removeEventListeners();
        this.lastRemovedFormat = null;
        this.activeInlineFormats = null;
        this.nodeSelection = null;
        this.formatCache = null;
        this.activeInlineFormats = null;
        this.ignoredBlockTypes = null;
    }
}

/**
 * `LinkModule` module is used to handle hyperlinks in the block editor
 *
 * @hidden
 */
class LinkModule$1 {
    constructor(manager) {
        this.parent = manager;
        this.selectionManager = new NodeSelection(this.parent.blockContainer);
        this.addEventListeners();
    }
    addEventListeners() {
        this.parent.observer.on('linkPopupCreated', this.handleLinkCreated, this);
        this.parent.observer.on(events.editorClick, this.handleEditorClick, this);
        this.parent.observer.on(events.documentClick, this.handleDocumentClick, this);
        this.parent.observer.on(events.formattingPerformed, this.formattingPerformed, this);
        this.parent.observer.on('linkPopupAfterOpen', this.handleLinkPopupAfterOpen, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.parent.observer.off(events.editorClick, this.handleEditorClick);
        this.parent.observer.off(events.documentClick, this.handleDocumentClick);
        this.parent.observer.off(events.formattingPerformed, this.formattingPerformed);
        this.parent.observer.off('linkPopupAfterOpen', this.handleLinkPopupAfterOpen);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    handleLinkCreated() {
        this.popupElement = document.querySelector('#' + this.parent.rootEditorElement.id + LINKDIALOG_ID);
        if (this.popupElement) {
            this.bindPopupEvents();
        }
    }
    bindPopupEvents() {
        const insertButton = this.popupElement.querySelector('.e-insert-link-btn');
        const removeButton = this.popupElement.querySelector('.e-remove-link-btn');
        const cancelButton = this.popupElement.querySelector('.e-cancel-link-btn');
        insertButton.addEventListener('click', this.handleLinkInsertDeletion.bind(this));
        removeButton.addEventListener('click', this.handleLinkInsertDeletion.bind(this, true));
        cancelButton.addEventListener('click', () => this.hideLinkPopup());
        const linkDialog = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + LINKDIALOG_ID);
        const urlInput = linkDialog && linkDialog.querySelector('#linkUrl');
        if (urlInput) {
            urlInput.addEventListener('input', () => this.syncButtonsByUrlField());
            // Allow Enter to submit when URL has content, but do NOT steal focus while typing
            urlInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const hasText = (urlInput.value || '').trim().length > 0;
                    if (hasText) {
                        this.handleLinkInsertDeletion(e);
                    }
                }
            });
        }
        this.popupElement.addEventListener('keydown', (e) => {
            const target = e.target;
            if (e.key === 'Enter') {
                e.preventDefault();
                if (target.classList.contains('e-insert-link-btn')) {
                    this.handleLinkInsertDeletion(e);
                }
                else if (target.classList.contains('e-remove-link-btn')) {
                    this.handleLinkInsertDeletion(e, true);
                }
                else if (target.classList.contains('e-cancel-link-btn')) {
                    this.hideLinkPopup();
                }
            }
            else if (e.key === 'Escape') {
                e.preventDefault();
                this.hideLinkPopup();
            }
        });
    }
    formattingPerformed(e) {
        if (e.subCommand === 'link') {
            this.hideLinkPopup();
        }
    }
    handleDocumentClick(e) {
        const target = e.target;
        if (!this.popupElement) {
            return;
        }
        if (this.popupElement.classList.contains('e-popup-open')
            && (!this.popupElement.contains(target))) {
            this.hideLinkPopup();
        }
    }
    handleEditorClick(e) {
        const target = e.target;
        if (target.tagName === 'A' || target.closest('a')) {
            e.preventDefault();
            const linkElement = target.tagName === 'A'
                ? target
                : target.closest('a');
            this.handleLinkClick(linkElement);
        }
    }
    /**
     * Shows the link popup dialog at cursor position
     *
     * @param {KeyboardEvent} e - Keyboard event that triggered the popup
     * @returns {void}
     * @hidden
     */
    showLinkPopup(e) {
        this.parent.inlineToolbarModule.hideInlineToolbar(e);
        const contentElement = getBlockContentElement(this.parent.currentFocusedBlock);
        const selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        if (!contentElement || (selectedBlocks && selectedBlocks.length > 1)) {
            return;
        }
        this.selectionManager.saveSelection();
        const positionY = this.getDialogPosition();
        this.parent.observer.notify('showLinkPopup', { x: 'center', y: positionY });
    }
    getDialogPosition() {
        let distanceFromVisibleTop = this.parent.rootEditorElement.getBoundingClientRect().top;
        if (distanceFromVisibleTop < 0) {
            distanceFromVisibleTop = Math.abs(distanceFromVisibleTop) + this.parent.rootEditorElement.scrollTop;
            return distanceFromVisibleTop.toString();
        }
        else {
            return this.parent.rootEditorElement.scrollTop.toString();
        }
    }
    handleLinkPopupAfterOpen() {
        setTimeout(() => {
            this.populateInputFields();
        }, 10);
    }
    populateInputFields() {
        const linkDialog = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + LINKDIALOG_ID);
        const urlInput = linkDialog.querySelector('#linkUrl');
        const textInput = linkDialog.querySelector('#linkText');
        const titleInput = linkDialog.querySelector('#linkTitle');
        if (this.selectionManager && !this.selectionManager.isCollapsed()) {
            textInput.value = this.selectionManager.getSelectedText();
        }
        const linkInfo = this.getLinkFromSelection();
        if (linkInfo) {
            textInput.value = linkInfo.text;
            urlInput.value = linkInfo.url;
            titleInput.value = linkInfo.title;
        }
        // Ensure Remove button reflects whether a link existed in selection
        const removeBtn = this.popupElement.querySelector('.e-remove-link-btn');
        if (linkInfo) {
            removeBtn.removeAttribute('disabled');
        }
        else {
            removeBtn.setAttribute('disabled', '');
        }
        // Sync Insert button based on URL input
        this.syncButtonsByUrlField();
    }
    syncButtonsByUrlField() {
        const linkDialog = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + LINKDIALOG_ID);
        const urlInput = linkDialog.querySelector('#linkUrl');
        const insertBtn = this.popupElement.querySelector('.e-insert-link-btn');
        const hasText = urlInput.value.trim().length > 0;
        if (hasText) {
            insertBtn.removeAttribute('disabled');
        }
        else {
            insertBtn.setAttribute('disabled', '');
        }
    }
    /**
     * Hides the link popup dialog and restores selection
     *
     * @returns {void}
     * @hidden
     */
    hideLinkPopup() {
        if (this.popupElement && this.popupElement.classList.contains('e-popup-close')) {
            return;
        }
        this.clearInputValues();
        this.parent.observer.notify('hideLinkPopup');
        const contentElement = getBlockContentElement(this.parent.currentFocusedBlock);
        if (contentElement) {
            this.selectionManager.restoreSelection();
        }
    }
    clearInputValues() {
        const linkDialog = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + LINKDIALOG_ID);
        const textInput = linkDialog.querySelector('#linkText');
        const urlInput = linkDialog.querySelector('#linkUrl');
        const titleInput = linkDialog.querySelector('#linkTitle');
        textInput.value = '';
        urlInput.value = '';
        titleInput.value = '';
        // Disable Remove button when inputs are cleared (Remove should not follow URL input)
        const removeBtn = this.popupElement.querySelector('.e-remove-link-btn');
        removeBtn.setAttribute('disabled', '');
        this.syncButtonsByUrlField();
    }
    handleLinkInsertDeletion(e, isRemove) {
        const contentElement = getBlockContentElement(this.parent.currentFocusedBlock);
        const linkDialog = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + LINKDIALOG_ID);
        if (!contentElement) {
            return;
        }
        this.selectionManager.restoreSelection();
        if (isRemove) {
            this.parent.formattingAction.execCommand({ subCommand: 'link', value: null });
            return;
        }
        const textInput = linkDialog.querySelector('#linkText');
        const urlInput = linkDialog.querySelector('#linkUrl');
        const titleInput = linkDialog.querySelector('#linkTitle');
        const url = normalizeUrl(urlInput.value);
        if (!url) {
            urlInput.focus();
            return;
        }
        this.parent.formattingAction.execCommand({
            subCommand: 'link',
            value: { text: textInput.value, url, title: titleInput.value }
        });
    }
    handleLinkClick(link) {
        const url = link.getAttribute('href');
        if (url) {
            window.open(url, link.getAttribute('target') || '_self');
        }
    }
    getLinkFromSelection() {
        if (!this.selectionManager) {
            return null;
        }
        const linkElement = this.selectionManager.getNodeFromSelection('a');
        if (linkElement) {
            const link = linkElement;
            return {
                text: link.textContent,
                url: link.getAttribute('href'),
                title: link.getAttribute('title')
            };
        }
        return null;
    }
    /**
     * Checks whether the slash command popup is opened or not.
     *
     * @returns {boolean} - Returns true if the slash command popup is opened, otherwise false.
     * @hidden
     */
    isPopupOpen() {
        const linkDialogId = `${this.parent.rootEditorElement.id + LINKDIALOG_ID}`;
        const linkPopup = document.querySelector(`#${linkDialogId}.${LINKDIALOG_CLS}`);
        return (linkPopup && linkPopup.classList.contains('e-popup-open'));
    }
    /**
     * Destroys the link module and cleans up resources
     *
     * @returns {void}
     */
    destroy() {
        this.removeEventListeners();
        this.selectionManager = null;
        this.popupElement = null;
    }
}

class InlineContentInsertionModule$1 {
    constructor(manager) {
        this.parent = manager;
        this.addEventListeners();
    }
    addEventListeners() {
        this.parent.observer.on('inlineContentInsertion', this.handleInlineContentInsertion, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.parent.observer.off('inlineContentInsertion', this.handleInlineContentInsertion);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    handleInlineContentInsertion(args) {
        const contentType = (args.value.toString().indexOf('e-user-mention-item-template')) > 0
            ? ContentType.Mention
            : ContentType.Label;
        const options = {
            block: getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks()),
            blockElement: this.parent.currentFocusedBlock,
            range: getSelectedRange().cloneRange(),
            contentType: contentType,
            itemData: args.itemData,
            mentionChar: contentType === ContentType.Mention ? '@' : this.parent.labelSettings.triggerChar
        };
        this.processInsertion(options);
    }
    processInsertion(options) {
        const { range, contentType, blockElement, mentionChar } = options;
        if (!range || !blockElement) {
            return;
        }
        const rangeParent = this.getRangeParent(range);
        const insertedNode = this.findInsertedNode(contentType, rangeParent);
        // Remove the trigger char from the block model first
        this.parent.mentionAction.removeMentionQueryKeysFromModel(mentionChar);
        // Split the DOM and update model
        this.splitAndReorganizeContent(insertedNode, contentType, rangeParent, options);
    }
    splitAndReorganizeContent(insertedNode, contentType, rangeParent, options) {
        const { block } = options;
        const blockContentElement = rangeParent.closest('.' + CONTENT_CLS);
        if (!blockContentElement || !insertedNode) {
            return null;
        }
        const oldBlock = decoupleReference(block);
        const isCurrBlkEmpty = blockContentElement.textContent === '';
        const insertedContent = this.createInlineContentModel(insertedNode, contentType, options);
        // DOM Update
        const newInlineNode = this.parent.blockRenderer.contentRenderer.invokeContentRenderer(block, insertedContent);
        insertedNode.replaceWith(newInlineNode);
        // Normalize empty nodes
        const validNodes = [...Array.from(blockContentElement.childNodes)].filter((n) => n.textContent.trim());
        const isAtEnd = validNodes.indexOf(newInlineNode) === validNodes.length - 1;
        if (!isAtEnd && !isCurrBlkEmpty) {
            blockContentElement.normalize();
        }
        // Model update
        const newContents = convertInlineElementsToContentModels(blockContentElement, true);
        this.parent.blockService.updateContent(block.id, newContents);
        this.parent.stateManager.updateManagerBlocks();
        this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                data: [{ block: block, oldBlock: oldBlock }],
                excludeDomUpdate: true
            } });
        this.parent.undoRedoAction.trackContentChangedForUndoRedo(oldBlock, decoupleReference(block));
        /* Utilize suffix node appended by mention control for cursor, if null-create and append */
        let nextSibling = newInlineNode.nextSibling;
        if (!nextSibling) {
            nextSibling = document.createTextNode('');
            newInlineNode.parentNode.appendChild(nextSibling);
        }
        setCursorPosition(nextSibling, 0);
    }
    createInlineContentModel(element, contentType, options) {
        const user = options.itemData;
        const labelItem = options.itemData;
        const contentValue = contentType === ContentType.Mention ? user.user : element.innerText;
        let newContent;
        if (contentType === ContentType.Mention) {
            newContent = BlockFactory.createMentionContent({ content: contentValue }, { userId: user.id });
        }
        else if (contentType === ContentType.Label) {
            newContent = BlockFactory.createLabelContent({ content: contentValue }, { labelId: labelItem.id });
        }
        return newContent;
    }
    getRangeParent(range) {
        return range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.parentElement
            : range.startContainer;
    }
    findInsertedNode(contentType, rangeParent) {
        const contentClassMap = {
            [ContentType.Mention]: 'e-mention-chip',
            [ContentType.Label]: 'e-mention-chip'
        };
        return rangeParent.querySelector(`span[class='${contentClassMap[`${contentType}`]}`);
    }
    /**
     * Destroys the inline content module.
     *
     * @returns {void}
     */
    destroy() {
        this.removeEventListeners();
    }
}

class WordListConverter {
    constructor(cleanupModule) {
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
    convertListNodes(listNodes) {
        const convertedLists = [];
        const listCollection = [];
        const currentListStyle = '';
        // Process list nodes and build collection
        this.processListNodes(listNodes, convertedLists, listCollection, currentListStyle);
        // Replace original nodes with converted lists
        this.replaceNodesWithLists(listNodes, convertedLists);
    }
    /* Processes list nodes and builds collection of list data */
    processListNodes(listNodes, convertedLists, listCollection, currentListStyle) {
        let listFormatOverride;
        for (let i = 0; i < listNodes.length; i++) {
            const currentNode = listNodes[i];
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
            const nodeStyle = currentNode.getAttribute('style') || '';
            const nestingLevel = this.extractNestingLevel(nodeStyle);
            listFormatOverride = this.extractListFormatOverride(nodeStyle, listFormatOverride);
            // Process list content
            this.listContents = [];
            this.getListContent(currentNode);
            // Skip if no list content
            if (isNullOrUndefined(this.listContents[0])) {
                continue;
            }
            // Determine list properties
            const listProperties = this.determineListProperties(this.listContents[0], i, listNodes, currentNode);
            // Collect content items
            const contentItems = [];
            for (let j = 1; j < this.listContents.length; j++) {
                contentItems.push(this.listContents[j]);
            }
            // Get class name and update style
            const className = !isNullOrUndefined(currentNode.className) ? currentNode.className : '';
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
    }
    /* Fixes outline level in style attribute */
    fixOutlineLevel(node) {
        const style = node.getAttribute('style');
        if (style && style.indexOf('mso-outline-level') !== -1) {
            node.style.cssText = style.replace('mso-outline-level', 'mso-outline');
        }
    }
    /* Extracts nesting level from style */
    extractNestingLevel(style) {
        if (style && style.indexOf('level') !== -1) {
            // eslint-disable-next-line
            return parseInt(style.charAt(style.indexOf('level') + 5), null);
        }
        return 1;
    }
    /* Extracts list format override from style */
    extractListFormatOverride(style, listFormatOverride) {
        if (style && style.indexOf('mso-list:') !== -1) {
            if (style.match(/mso-list:[^;]+;?/)) {
                const normalizedStyle = style.replace(new RegExp('\\n', 'g'), '').split(' ').join('');
                const msoListValue = normalizedStyle.match(/mso-list:[^;]+;?/)[0].split(':l');
                return isNullOrUndefined(msoListValue) ? null : parseInt(msoListValue[1].split('level')[0], 10);
            }
            else {
                return null;
            }
        }
        return listFormatOverride;
    }
    /* Determines list properties based on content */
    determineListProperties(listContent, index, listNodes, currentNode) {
        const result = {
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
    }
    /* Determines start attribute for ordered lists */
    determineStartAttribute(listContent, listStyleType) {
        const startString = listContent.split('.')[0];
        const standardListTypes = ['A', 'a', 'I', 'i', 'α', '1', '01', '1-']; // Add '1-' for rare list type
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
    }
    /* Updates node style */
    updateNodeStyle(node, style) {
        if (!isNullOrUndefined(node.getAttribute('style'))) {
            node.style.cssText = style.replace('text-align:start;', '');
            node.style.textIndent = '';
            return node.getAttribute('style');
        }
        return '';
    }
    /* Replaces original nodes with converted lists */
    replaceNodesWithLists(listNodes, convertedLists) {
        let currentNode = listNodes.shift();
        while (currentNode) {
            const elementsToInsert = [];
            // Find matching converted list
            for (let i = 0; i < convertedLists.length; i++) {
                if (convertedLists[i].node === currentNode) {
                    const convertedContent = convertedLists[i].content;
                    // Collect all child nodes
                    for (let j = 0; j < convertedContent.childNodes.length; j++) {
                        elementsToInsert.push(convertedContent.childNodes[j]);
                    }
                    // Insert before the original node
                    for (let j = 0; j < elementsToInsert.length; j++) {
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
    }
    /* Determines the CSS list-style-type based on list content and type */
    getlistStyleType(listContent, listType) {
        // Extract the marker text before any period
        const markerText = listContent.split('.')[0];
        if (listType === 'ol') {
            return this.getOrderedListStyleType(markerText);
        }
        else {
            return this.getUnorderedListStyleType(markerText);
        }
    }
    /* Determines the CSS list-style-type for ordered lists */
    getOrderedListStyleType(markerText) {
        const charCode = markerText.charCodeAt(0);
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
        const isLeadingZeroNumber = markerText.length > 1 &&
            markerText[0] === '0' && !isNaN(Number(markerText));
        if (isLeadingZeroNumber) {
            return 'decimal-leading-zero';
        }
        // Default to decimal
        return 'decimal';
    }
    /* Determines the CSS list-style-type for unordered lists */
    getUnorderedListStyleType(markerText) {
        switch (markerText) {
            case 'o':
                return 'circle';
            case '§':
                return 'square';
            default:
                return 'disc';
        }
    }
    /* Converts a collection of MSWord list items into HTML list elements */
    makeConversion(collection) {
        const rootElement = createElement('div');
        const CURRENT_ITEM_CLASS = 'e-current-list-item';
        if (collection.length === 0) {
            return rootElement;
        }
        let currentListElement;
        let currentNestingLevel = 1;
        let currentListItem;
        let listItemCount = 0;
        let currentFormatOverride = collection[0].listFormatOverride;
        for (let i = 0; i < collection.length; i++) {
            const currentItem = collection[i];
            const isStandardList = this.isStandardListType(currentItem.class);
            // Remove tracking class from previous item
            if (currentListItem) {
                currentListItem.classList.remove(CURRENT_ITEM_CLASS);
            }
            // Reset previous list item if list type changes
            if (this.shouldResetListItem(currentListItem, i, collection, isStandardList)) {
                currentListItem = null;
            }
            // Create paragraph element with content
            const paragraphElement = this.createParagraphWithContent(currentItem);
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
        const trackedItems = rootElement.querySelectorAll('.' + CURRENT_ITEM_CLASS);
        for (let i = 0; i < trackedItems.length; i++) {
            trackedItems[i].classList.remove(CURRENT_ITEM_CLASS);
            if (trackedItems[i].className === '') {
                trackedItems[i].removeAttribute('class');
            }
        }
        return rootElement;
    }
    /* Checks if the list item is a standard list type */
    isStandardListType(className) {
        const standardListClasses = [
            'MsoListParagraphCxSpFirst',
            'MsoListParagraphCxSpMiddle',
            'MsoListParagraphCxSpLast'
        ];
        for (let i = 0; i < standardListClasses.length; i++) {
            if (!isNullOrUndefined(className) && standardListClasses[i].indexOf(className) >= 0) {
                return true;
            }
        }
        return false;
    }
    /* Determines if the list item should be reset */
    shouldResetListItem(listItem, index, collection, isStandardList) {
        return !isNullOrUndefined(listItem) &&
            index !== 0 &&
            collection[index - 1].listType !== collection[index].listType &&
            !isStandardList;
    }
    /* Creates a paragraph element with content */
    createParagraphWithContent(item) {
        const paragraphElement = createElement('p', { className: 'MsoNoSpacing' });
        paragraphElement.innerHTML = item.content.join(' ');
        return paragraphElement;
    }
    /* Checks if this is a new root list */
    isNewRootList(item, listCount, formatOverride) {
        return item.nestedLevel === 1 &&
            (listCount === 0 || formatOverride !== item.listFormatOverride) &&
            item.content.length > 0;
    }
    /* Creates a root list element */
    createRootList(rootElement, item, paragraphElement) {
        const listElement = createElement(item.listType, { className: item.class });
        const listItem = createElement('li');
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
    }
    /* Checks if this is a same level list item */
    isSameLevelList(item, currentLevel, formatOverride) {
        return item.nestedLevel === currentLevel && formatOverride === item.listFormatOverride;
    }
    /* Adds an item to a same level list */
    addToSameLevelList(item, listElement, paragraphElement, listItem, rootElement) {
        if (!isNullOrUndefined(listItem) && !isNullOrUndefined(listItem.parentElement) &&
            listItem.parentElement.tagName.toLowerCase() === item.listType) {
            // Add to existing list
            const newListItem = createElement('li');
            newListItem.classList.add('e-current-list-item');
            newListItem.appendChild(paragraphElement);
            listItem.parentElement.appendChild(newListItem);
            return listItem.parentElement;
        }
        else if (isNullOrUndefined(listItem)) {
            // Create new list
            const newListElement = createElement(item.listType);
            newListElement.style.listStyleType = item.listStyleTypeName;
            const newListItem = createElement('li');
            newListItem.classList.add('e-current-list-item');
            newListItem.appendChild(paragraphElement);
            newListElement.appendChild(newListItem);
            newListElement.setAttribute('level', item.nestedLevel.toString());
            rootElement.appendChild(newListElement);
            return newListElement;
        }
        else {
            // Create new list at parent level
            const newListElement = createElement(item.listType);
            newListElement.style.listStyleType = item.listStyleTypeName;
            const newListItem = createElement('li');
            newListItem.classList.add('e-current-list-item');
            newListItem.appendChild(paragraphElement);
            newListElement.appendChild(newListItem);
            newListElement.setAttribute('level', item.nestedLevel.toString());
            listItem.parentElement.parentElement.appendChild(newListElement);
            return newListElement;
        }
    }
    /* Checks if this is a deeper nested list */
    isDeeperNestedList(item, currentLevel) {
        return item.nestedLevel > currentLevel;
    }
    /* Creates a nested list */
    createNestedList(item, listItem, paragraphElement, isStandardList, rootElement, currentNestingLevel) {
        let listElement;
        if (!isNullOrUndefined(listItem)) {
            // Create nested list inside existing list item
            const levelDifference = item.nestedLevel - currentNestingLevel;
            for (let j = 0; j < levelDifference; j++) {
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
    }
    /* Creates a standard nested list */
    createStandardNestedList(item, paragraphElement, rootElement) {
        const initialNode = createElement(item.listType);
        let listItem = createElement('li');
        let listElement;
        initialNode.appendChild(listItem);
        initialNode.style.listStyleType = 'none';
        for (let j = 0; j < item.nestedLevel - 1; j++) {
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
    }
    /* Gets the last list item from a list element */
    getLastListItem(listElement) {
        return listElement.querySelector('li:last-child');
    }
    /* Checks if this is a top-level list */
    isTopLevelList(item) {
        return item.nestedLevel === 1;
    }
    /* Handles top-level list creation or reuse */
    handleTopLevelList(item, rootElement, paragraphElement) {
        let listElement;
        const lastChild = rootElement.lastChild;
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
        const listItem = createElement('li');
        listItem.appendChild(paragraphElement);
        listElement.appendChild(listItem);
        listElement.setAttribute('level', item.nestedLevel.toString());
        listItem.classList.add('e-current-list-item');
        return listElement;
    }
    /* Handles other nesting scenarios */
    handleOtherNestingScenarios(item, listItem, paragraphElement, currentFormatOverride) {
        let currentElement = listItem;
        let listElement;
        while (currentElement.parentElement) {
            currentElement = currentElement.parentElement;
            const levelAttribute = currentElement.attributes.getNamedItem('level');
            if (levelAttribute) {
                const elementLevel = parseInt(levelAttribute.textContent, 10);
                if (elementLevel === item.nestedLevel && currentFormatOverride === item.listFormatOverride) {
                    // Same level and format - add to existing list
                    const newListItem = createElement('li');
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
                    const newListItem = createElement('li');
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
    }
    /* Creates a list with different format override */
    createDifferentFormatList(item, parentElement, paragraphElement) {
        let listElement = createElement(item.listType);
        let listItem = createElement('li');
        listElement.appendChild(listItem);
        if (item.nestedLevel > 1) {
            for (let k = 0; k < item.nestedLevel - 1; k++) {
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
    }
    /* Applies styles and attributes to a list item */
    applyListItemStyles(listItem, item) {
        if (isNullOrUndefined(listItem)) {
            return;
        }
        listItem.setAttribute('class', item.class);
        listItem.style.cssText = !isNullOrUndefined(item.listStyle) ? item.listStyle : '';
    }
    /* Sets start attribute if needed */
    setStartAttributeIfNeeded(listElement, item) {
        const needsStartAttribute = !isNullOrUndefined(item.start) &&
            item.start !== 1 && item.listType === 'ol';
        if (needsStartAttribute) {
            listElement.setAttribute('start', item.start.toString());
        }
    }
    /* Extracts list content from an element */
    getListContent(element) {
        const firstChild = element.firstElementChild;
        if (firstChild.childNodes.length > 0) {
            //Add to support separate list which looks like same list and also to add all tags as it is inside list
            this.handleTextList(element, firstChild);
        }
        this.listContents.push(element.innerHTML);
    }
    /* Handles text list content */
    handleTextList(element, firstChild) {
        // Clean up list ignore tags
        this.cleanupListIgnoreTags(firstChild);
        // Clean up list order
        const listOrderElement = this.cleanupListOrder(firstChild);
        this.processListOrderElement(element, firstChild, listOrderElement);
    }
    /* Cleans up list ignore tags */
    cleanupListIgnoreTags(firstChild) {
        const listIgnoreTags = firstChild.querySelectorAll('[style*="mso-list"]');
        for (let i = 0; i < listIgnoreTags.length; i++) {
            const tag = listIgnoreTags[i];
            const style = tag.getAttribute('style').replace(/\n/g, '');
            tag.setAttribute('style', style);
        }
    }
    /* Cleans up list order element */
    cleanupListOrder(firstChild) {
        const listOrderCleanup = firstChild.querySelector('span[style*="mso-list"]');
        if (listOrderCleanup) {
            let style = listOrderCleanup.getAttribute('style');
            if (style) {
                style = style.replace(/\s*:\s*/g, ':');
                listOrderCleanup.setAttribute('style', style);
            }
        }
        return firstChild.querySelector('span[style="mso-list:Ignore"]');
    }
    /* Processes list order element */
    processListOrderElement(element, firstChild, listOrderElement) {
        const isEmptyMarkerSpan = isNullOrUndefined(listOrderElement);
        listOrderElement = isEmptyMarkerSpan ? firstChild : listOrderElement;
        if (!isNullOrUndefined(listOrderElement)) {
            let textContent = listOrderElement.textContent.trim();
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
    }
    /* Extracts bullet marker from text content */
    extractBulletMarker(listOrderElement, textContent) {
        const bulletPattern = /^(\d{1,2}|[a-zA-Z]|[*#~•○■])(\.|\)|-)\s*/;
        const textContentMatch = textContent.match(bulletPattern);
        if (!isNullOrUndefined(textContentMatch)) {
            const markerText = textContentMatch[0].trim();
            listOrderElement.textContent = listOrderElement.textContent.trim().substring(markerText.length).trim();
            return markerText;
        }
        return textContent;
    }
}

/**
 * Handles cleanup of pasted content for the Block Editor.
 */
class ClipboardCleanupModule {
    constructor(manager) {
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
    cleanupPaste(args) {
        const { html, plainText } = args;
        if (this.parent.pasteCleanupSettings.plainText) {
            return this.plainFormatting(plainText);
        }
        const isFromMsWord = this.isFromMsWord(html);
        if (isFromMsWord) {
            return this.cleanMsWordContent(html);
        }
        return this.cleanupHtml(html, this.parent.pasteCleanupSettings.keepFormat);
    }
    isFromMsWord(html) {
        return ClipboardCleanupModule.msWordPatterns.some((pattern) => pattern.test(html));
    }
    cleanMsWordContent(html) {
        const tempDiv = createElement('div');
        tempDiv.innerHTML = html;
        let listNodes = [];
        this.addListClass(tempDiv);
        listNodes = this.listCleanUp(tempDiv, listNodes);
        if (!isNullOrUndefined(listNodes[0]) && listNodes[0].parentElement.tagName !== 'UL' &&
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
    }
    addListClass(elm) {
        const allNodes = elm.querySelectorAll('*');
        for (let index = 0; index < allNodes.length; index++) {
            if (!isNullOrUndefined(allNodes[index].getAttribute('style')) && allNodes[index].getAttribute('style').replace(/ /g, '').replace('\n', '').indexOf('mso-list:l') >= 0 &&
                allNodes[index].className.toLowerCase().indexOf('msolistparagraph') === -1 &&
                allNodes[index].tagName.charAt(0) !== 'H' && allNodes[index].tagName !== 'LI' &&
                allNodes[index].tagName !== 'OL' && allNodes[index].tagName !== 'UL') {
                allNodes[index].classList.add('msolistparagraph');
            }
        }
    }
    /* Cleans up HTML content and identifies list nodes for conversion */
    listCleanUp(containerElement, listNodes) {
        let previousWasMsoList = false;
        const allElements = containerElement.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            const currentElement = allElements[i];
            // Check if element should be ignored
            if (this.shouldIgnoreElement(currentElement)) {
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
    }
    /* Determines if an element should be ignored during cleanup */
    shouldIgnoreElement(element) {
        const isNotInIgnorableList = ClipboardCleanupModule.ignorableNodes.indexOf(element.nodeName) === -1;
        const isEmptyTextNode = element.nodeType === 3 && element.textContent.trim() === '';
        return isNotInIgnorableList || isEmptyTextNode;
    }
    /* Determines if an element is an MS Word list paragraph */
    isMsoListParagraph(element) {
        const elementClass = element.className;
        const hasClassName = elementClass && elementClass.toLowerCase().indexOf('msolistparagraph') !== -1;
        const elementStyles = element.getAttribute('style');
        const hasMsoListStyle = !isNullOrUndefined(elementStyles) && elementStyles.indexOf('mso-list:') >= 0;
        return hasClassName && hasMsoListStyle;
    }
    /* Determines if an element is the first item in a list */
    isFirstListItem(element) {
        return element.className.indexOf('MsoListParagraphCxSpFirst') >= 0;
    }
    /* Determines if a list separator should be added */
    shouldAddListSeparator(previousWasMsoList, currentElement) {
        return previousWasMsoList &&
            this.isBlockElement(currentElement) && !this.isMsoListParagraph(currentElement);
    }
    /* Determines if an element is a block element */
    isBlockElement(element) {
        return ClipboardCleanupModule.blockNode.indexOf(element.nodeName.toLowerCase()) !== -1;
    }
    cleanupHtml(html, keepFormat) {
        const tempDiv = createElement('div');
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
    }
    plainFormatting(html) {
        const tempDiv = createElement('div');
        tempDiv.innerHTML = html;
        this.detachInlineElements(tempDiv);
        this.getTextContent(tempDiv);
        this.removeEmptyElements(tempDiv);
        this.removeComments(tempDiv);
        return tempDiv.innerHTML;
    }
    removeUnwantedElements(element) {
        this.removeStyleElements(element);
        let innerElement = element.innerHTML;
        for (let i = 0; i < ClipboardCleanupModule.removableElements.length; i++) {
            // eslint-disable-next-line security/detect-non-literal-regexp
            const regExpStartElem = new RegExp('<' + ClipboardCleanupModule.removableElements[i] + '\\s*[^>]*>', 'g');
            // eslint-disable-next-line security/detect-non-literal-regexp
            const regExpEndElem = new RegExp('</' + ClipboardCleanupModule.removableElements[i] + '>', 'g');
            innerElement = innerElement.replace(regExpStartElem, '');
            innerElement = innerElement.replace(regExpEndElem, '');
        }
        element.innerHTML = innerElement;
    }
    removeStyleElements(element) {
        const styleElement = element.querySelector('style');
        if (!isNullOrUndefined(styleElement)) {
            detach(styleElement);
        }
    }
    removeComments(element) {
        let innerElement = element.innerHTML;
        innerElement = innerElement.replace(/<!--[\s\S]*?-->/g, '');
        element.innerHTML = innerElement;
    }
    removeEmptyElements(element) {
        const emptyElements = element.querySelectorAll(':empty');
        for (let i = 0; i < emptyElements.length; i++) {
            if (emptyElements[i].tagName !== 'IMG' &&
                emptyElements[i].tagName !== 'BR' &&
                emptyElements[i].tagName !== 'IFRAME' &&
                emptyElements[i].tagName !== 'TD' &&
                emptyElements[i].tagName !== 'HR') {
                const detachableElement = this.findDetachEmptyElem(emptyElements[i]);
                if (!isNullOrUndefined(detachableElement)) {
                    detach(detachableElement);
                }
            }
        }
    }
    findDetachEmptyElem(element) {
        let removableElement;
        if (!isNullOrUndefined(element.parentElement)) {
            const hasNbsp = element.parentElement.textContent.length > 0 &&
                element.parentElement.textContent.match(/\u00a0/g) &&
                element.parentElement.textContent.match(/\u00a0/g).length > 0;
            if (!hasNbsp && element.parentElement.textContent.trim() === '' &&
                isNullOrUndefined(element.parentElement.querySelector('img'))) {
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
    }
    removeWordClasses(element) {
        const elementsWithClass = element.querySelectorAll('*[class]');
        for (let i = 0; i < elementsWithClass.length; i++) {
            const classList = elementsWithClass[i].classList;
            const classesToRemove = [];
            for (let j = 0; j < classList.length; j++) {
                if (classList[j].indexOf('Mso') === 0) {
                    classesToRemove.push(classList[j]);
                }
            }
            classesToRemove.forEach((className) => {
                elementsWithClass[i].classList.remove(className);
            });
            if (elementsWithClass[i].classList.length === 0) {
                elementsWithClass[i].removeAttribute('class');
            }
        }
    }
    cleanupStyles(element, allowedStyles) {
        const elementsWithStyle = element.querySelectorAll('*[style]');
        for (let i = 0; i < elementsWithStyle.length; i++) {
            const styleAttr = elementsWithStyle[i].getAttribute('style');
            if (!styleAttr) {
                continue;
            }
            const styles = styleAttr.split(';');
            let newStyles = '';
            for (let j = 0; j < styles.length; j++) {
                const style = styles[j].trim();
                if (!style) {
                    continue;
                }
                const [property, value] = style.split(':').map((s) => s.trim());
                if (property.indexOf('mso-') === 0) {
                    continue;
                }
                if (allowedStyles.indexOf(property) !== -1) {
                    newStyles += `${property}: ${value}; `;
                }
            }
            if (newStyles) {
                elementsWithStyle[i].setAttribute('style', newStyles.trim());
            }
            else {
                elementsWithStyle[i].removeAttribute('style');
            }
        }
    }
    processTables(element) {
        const tables = element.querySelectorAll('table');
        for (let i = 0; i < tables.length; i++) {
            this.sanitizeTableElement(tables[i]);
        }
    }
    sanitizeTableElement(table) {
        table.classList.add('e-blockeditor-table');
        // Remove unwanted attributes
        const attrs = ['border', 'cellpadding', 'cellspacing', 'width', 'height', 'style'];
        attrs.forEach((attr) => { if (table.hasAttribute(attr)) {
            table.removeAttribute(attr);
        } });
        // Remove colgroup/col sizing; our TableService will manage widths
        const colgroups = table.querySelectorAll('colgroup, col');
        for (let i = 0; i < colgroups.length; i++) {
            colgroups[i].parentElement.removeChild(colgroups[i]);
        }
        const cells = table.querySelectorAll('td, th');
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            // Remove spans unsupported by editor
            cell.removeAttribute('rowspan');
            cell.removeAttribute('colspan');
            // Remove unwanted attributes/styles
            ['width', 'height', 'style'].forEach((attr) => { if (cell.hasAttribute(attr)) {
                cell.removeAttribute(attr);
            } });
            // Ensure minimal content wrapper
            if (cell.textContent.trim() === '' && !cell.querySelector('img') && !cell.querySelector('.e-table-cell-host')) {
                cell.innerHTML = '<p><br/></p>';
            }
        }
    }
    cleanupLists(element) {
        this.cleanList(element, 'UL');
        this.cleanList(element, 'OL');
        this.convertWordListParagraphs(element);
    }
    cleanList(element, listTag) {
        const replacableElem = element.querySelectorAll(`${listTag} div`);
        for (let j = replacableElem.length - 1; j >= 0; j--) {
            const parentElem = replacableElem[j].parentNode;
            while (replacableElem[j].firstChild) {
                parentElem.insertBefore(replacableElem[j].firstChild, replacableElem[j]);
            }
            const closestListElem = this.findClosestListElem(replacableElem[j]);
            if (closestListElem) {
                this.insertAfter(replacableElem[j], closestListElem);
            }
        }
    }
    findClosestListElem(listElem) {
        let closestListElem;
        while (!isNullOrUndefined(listElem)) {
            listElem = !isNullOrUndefined(listElem.closest('ul')) && listElem.tagName !== 'UL'
                ? listElem.closest('ul')
                : (listElem.tagName !== 'OL' ? listElem.closest('ol') : null);
            closestListElem = !isNullOrUndefined(listElem) ? listElem : closestListElem;
        }
        return closestListElem;
    }
    insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    convertWordListParagraphs(element) {
        const listParagraphs = element.querySelectorAll('p[style*="mso-list"]');
        if (listParagraphs.length === 0) {
            return;
        }
        let currentList = null;
        let currentListType = null;
        let currentLevel = 0;
        for (let i = 0; i < listParagraphs.length; i++) {
            const paragraph = listParagraphs[i];
            let listType = 'ul';
            const textContent = paragraph.textContent.trim();
            if (/^\d+\./.test(textContent) || /^[a-zA-Z]\./.test(textContent) || /^[ivxIVX]+\./.test(textContent)) {
                listType = 'ol';
            }
            let level = 1;
            const styleAttr = paragraph.getAttribute('style');
            if (styleAttr) {
                const levelMatch = styleAttr.match(/level(\d+)/);
                if (levelMatch) {
                    level = parseInt(levelMatch[1], 10);
                }
            }
            let content = paragraph.innerHTML;
            content = content.replace(/^[\s\u00A0]*(?:\d+\.|\w\.|\u2022|\u25CF|\u25CB|\u25A0|\u25A1)[\s\u00A0]+/, '');
            if (!currentList || currentListType !== listType || level < currentLevel) {
                currentList = document.createElement(listType);
                currentListType = listType;
                paragraph.parentNode.insertBefore(currentList, paragraph);
            }
            const listItem = document.createElement('li');
            listItem.innerHTML = content;
            currentList.appendChild(listItem);
            currentLevel = level;
            paragraph.parentNode.removeChild(paragraph);
        }
    }
    processImages(element) {
        const images = element.querySelectorAll('img');
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            img.classList.add('e-blockeditor-pasted-img');
            if (!img.hasAttribute('alt')) {
                img.setAttribute('alt', 'Pasted image');
            }
        }
    }
    cleanupCssPatterns(root) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => {
                const text = node.textContent.trim();
                const isInlineStyle = text.match(/^\s*(ol|ul|li)[\s\S]*?\{[\s\S]*?\}/i);
                return isInlineStyle ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        });
        const nodesToRemove = [];
        while (walker.nextNode()) {
            const node = walker.currentNode;
            nodesToRemove.push(node);
        }
        for (const node of nodesToRemove) {
            node.remove();
        }
    }
    deniedTags(element) {
        const deniedTags = this.parent.pasteCleanupSettings.deniedTags;
        for (let i = 0; i < deniedTags.length; i++) {
            const removableElements = element.querySelectorAll(deniedTags[i]);
            for (let j = removableElements.length - 1; j >= 0; j--) {
                const parentElem = removableElements[j].parentNode;
                while (removableElements[j].firstChild) {
                    parentElem.insertBefore(removableElements[j].firstChild, removableElements[j]);
                }
                parentElem.removeChild(removableElements[j]);
            }
        }
        return element;
    }
    deniedAttributes(element, clean) {
        const deniedAttrs = clean ? ['style', 'class'] : this.parent.pasteCleanupSettings.deniedTags;
        for (let i = 0; i < deniedAttrs.length; i++) {
            const elementsWithAttr = element
                .querySelectorAll(`[${deniedAttrs[i]}]`);
            for (let j = 0; j < elementsWithAttr.length; j++) {
                elementsWithAttr[j].removeAttribute(deniedAttrs[i]);
            }
        }
        return element;
    }
    allowedStyle(element) {
        const allowedStyles = this.parent.pasteCleanupSettings.allowedStyles;
        const styleElements = element.querySelectorAll('[style]');
        for (let i = 0; i < styleElements.length; i++) {
            let allowedStyleValue = '';
            const styleValue = styleElements[i].getAttribute('style').split(';');
            for (let j = 0; j < styleValue.length; j++) {
                const stylePair = styleValue[j].trim();
                if (!stylePair) {
                    continue;
                }
                const [property] = stylePair.split(':').map((s) => s.trim());
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
    }
    detachInlineElements(element) {
        for (let i = 0; i < ClipboardCleanupModule.inlineNode.length; i++) {
            const inlineElements = element.querySelectorAll(ClipboardCleanupModule.inlineNode[i]);
            for (let j = 0; j < inlineElements.length; j++) {
                const parentElem = inlineElements[j].parentElement;
                if (!parentElem) {
                    continue;
                }
                while (inlineElements[j].firstChild) {
                    parentElem.insertBefore(inlineElements[j].firstChild, inlineElements[j]);
                }
                parentElem.removeChild(inlineElements[j]);
            }
        }
    }
    getTextContent(element) {
        for (let i = 0; i < ClipboardCleanupModule.blockNode.length; i++) {
            const blockElements = element.querySelectorAll(ClipboardCleanupModule.blockNode[i]);
            for (let j = 0; j < blockElements.length; j++) {
                const paragraph = document.createElement('p');
                paragraph.textContent = blockElements[j].textContent;
                blockElements[j].parentNode.replaceChild(paragraph, blockElements[j]);
            }
        }
        const allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            const attributes = allElements[i].attributes;
            for (let j = attributes.length - 1; j >= 0; j--) {
                allElements[i].removeAttribute(attributes[j].name);
            }
        }
    }
}
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

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-enable @typescript-eslint/no-misused-new, no-redeclare */
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB limit
/**
 * Handles clipboard operations (copy, cut, paste) for the Block Editor.
 */
class ClipboardAction {
    constructor(manager) {
        this.parent = manager;
        this.clipboardCleanupModule = new ClipboardCleanupModule(this.parent);
        this.wireEvents();
    }
    wireEvents() {
        this.parent.observer.on(events.copy, this.handleCopy, this);
        this.parent.observer.on(events.cut, this.handleCut, this);
        this.parent.observer.on(events.paste, this.handlePaste, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    unwireEvents() {
        this.parent.observer.off(events.copy, this.handleCopy);
        this.parent.observer.off(events.cut, this.handleCut);
        this.parent.observer.off(events.paste, this.handlePaste);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    /**
     * Handles the cut operation.
     *
     * @param {ClipboardEvent} e - The clipboard event.
     * @returns {void}
     * @hidden
     */
    handleCut(e) {
        this.handleCopy(e);
        this.performCutOperation();
    }
    /**
     * Handles the copy operation.
     *
     * @param {ClipboardEvent} e - The clipboard event.
     * @returns {void}
     * @hidden
     */
    handleCopy(e) {
        e.preventDefault();
        const focusedEl = this.parent.currentFocusedBlock;
        const tableBlockEl = focusedEl && focusedEl.closest('.' + TABLE_BLOCK_CLS);
        const range = getSelectedRange();
        const hasActiveSel = hasActiveTableSelection(tableBlockEl);
        if (tableBlockEl && (hasActiveSel || findClosestParent(range.startContainer, '.e-action-handle'))) {
            const { payload, html, plainText } = this.getTablePayload(tableBlockEl);
            writeTableClipboardPayload(e.clipboardData, payload, html, plainText);
            return;
        }
        const { html, text, blockeditorData } = this.getClipboardPayload();
        e.clipboardData.setData('text/html', html);
        e.clipboardData.setData('text/plain', text);
        e.clipboardData.setData('text/blockeditor', blockeditorData);
    }
    /**
     * Handles the paste operation.
     *
     * @param {ClipboardEvent} e - The clipboard event.
     * @returns {void}
     * @hidden
     */
    handlePaste(e) {
        e.preventDefault();
        this.performPasteOperation({
            blockeditorData: e.clipboardData.getData('text/blockeditor'),
            html: e.clipboardData.getData('text/html'),
            text: e.clipboardData.getData('text/plain'),
            file: this.extractFileFromClipboard(e)
        });
        this.parent.stateManager.updateManagerBlocks();
    }
    extractFileFromClipboard(e) {
        if (!e.clipboardData || !e.clipboardData.items || (e.clipboardData.items && e.clipboardData.items.length === 0)) {
            return null;
        }
        const items = e.clipboardData.items;
        const file = items[0].getAsFile();
        if (file !== null) {
            return file;
        }
        return !isNullOrUndefined(items[1]) ? items[1].getAsFile() : null;
    }
    /**
     * Gets the clipboard payload for the current selection.
     *
     * @returns {IClipboardPayloadOptions} - The clipboard payload containing HTML, text, and Block Editor data.
     * @hidden
     */
    getClipboardPayload() {
        if (getSelectedRange().toString().trim().length > 0) {
            const tempDiv = document.createElement('div');
            tempDiv.appendChild(getSelectedRange().cloneContents());
            const selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
            const blocks = this.createPartialBlockModels(tempDiv, selectedBlocks);
            return {
                blockeditorData: selectedBlocks && (selectedBlocks.length > 1)
                    ? JSON.stringify({ blocks })
                    : JSON.stringify({ contents: this.createPartialContentModels(tempDiv) }),
                html: selectedBlocks && (selectedBlocks.length > 1)
                    ? getBlockDataAsHTML(blocks, this.parent.rootEditorElement.id)
                    : renderElementWithWrapper('span', renderContentAsHTML(this.createPartialContentModels(tempDiv))),
                text: generatePlainTextForExternalClipboard(blocks)
            };
        }
        const blockModel = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        const sanitizedBlock = decoupleReference(blockModel);
        return {
            blockeditorData: JSON.stringify({ block: sanitizedBlock }),
            html: getBlockDataAsHTML([blockModel], this.parent.rootEditorElement.id),
            text: generatePlainTextForExternalClipboard([blockModel])
        };
    }
    getTablePayload(tableBlockEl) {
        const blockModel = getBlockModelById(tableBlockEl.id, this.parent.getEditorBlocks());
        const payload = buildTableClipboardPayload(tableBlockEl, blockModel);
        const matrixText = extractPlainTextMatrixFromPayload(payload, blockModel);
        const html = htmlTableFromMatrix(matrixText, { hasHeader: payload.meta.enableHeader, hasRowNumbers: payload.meta.enableRowNumbers });
        const plainText = tsvFromMatrix(matrixText);
        return { payload, html, plainText };
    }
    createPartialBlockModels(selectionContainer, originalBlocks) {
        return originalBlocks.length === 0 ? [] : originalBlocks.map((block) => {
            const blockElement = selectionContainer.querySelector('.e-block#' + block.id);
            const contentElement = getBlockContentElement(blockElement) || selectionContainer;
            return BlockFactory.createBlockFromPartial(Object.assign({}, decoupleReference(block), { content: this.createPartialContentModels(contentElement) }));
        });
    }
    createPartialContentModels(selectionContainer) {
        return convertInlineElementsToContentModels(selectionContainer, true);
    }
    performCutOperation() {
        const tableCtx = this.parent.blockRenderer.tableRenderer.resolveTableContext();
        const range = getSelectedRange();
        if (range && range.toString().trim().length > 0) {
            this.performDeletionOperation(range);
        }
        else if (tableCtx) {
            this.performCellCut(tableCtx);
        }
        else {
            const blockElement = this.parent.currentFocusedBlock;
            const nextBlock = blockElement.nextElementSibling;
            const previousBlock = blockElement.previousElementSibling;
            this.parent.execCommand({ command: 'DeleteBlock', state: { blockElement: this.parent.currentFocusedBlock } });
            this.parent.setFocusToBlock(nextBlock || previousBlock);
        }
    }
    performPasteOperation(args) {
        const { blockeditorData, html, text, file } = args;
        // (Taking a snip in windows, automatically gets copied as file and not HTML. Hence below handling)
        if (file && (file.size < MAX_IMAGE_SIZE)) {
            this.parent.blockRenderer.imageRenderer.handleFilePaste(file);
            const url = URL.createObjectURL(file);
            URL.revokeObjectURL(url); // Immediately revoke to free memory
            return;
        }
        const beforePasteEventArgs = {
            cancel: false,
            content: text,
            callback: (args) => {
                if (args.cancel) {
                    return;
                }
                const range = getSelectedRange();
                if (range && range.toString().trim().length > 0) {
                    this.isSelectivePaste = true;
                    this.performDeletionOperation(range);
                }
                // Detect external HTML table when inside a table cell
                const tableCtx = this.parent.blockRenderer.tableRenderer.resolveTableContext();
                if (tableCtx && doesHtmlHasTable(html, text)) {
                    this.handleCellPasteInsideTable(tableCtx, html, text);
                    this.triggerAfterPasteEvent(text);
                    return;
                }
                const currentBlock = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
                if (currentBlock.blockType === BlockType.Code) {
                    this.handleCodeBlockContentPaste(text, currentBlock);
                    this.triggerAfterPasteEvent(text);
                    return;
                }
                if (blockeditorData) {
                    this.handleBlockEditorPaste(blockeditorData, text);
                    this.triggerAfterPasteEvent(text);
                    return;
                }
                const cleanedData = this.clipboardCleanupModule.cleanupPaste({ html: html, plainText: text });
                if (html && !this.parent.pasteCleanupSettings.plainText) {
                    this.handleHtmlPaste(cleanedData);
                }
                else if (text) {
                    this.handlePlainTextPaste(text);
                }
                this.triggerAfterPasteEvent(text);
                this.isSelectivePaste = false;
            }
        };
        this.parent.observer.notify('beforePaste', beforePasteEventArgs);
    }
    performDeletionOperation(range) {
        const selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        if (selectedBlocks && selectedBlocks.length === 1) {
            const blockElement = this.parent.getBlockElementById(selectedBlocks[0].id);
            const contentElement = getBlockContentElement(blockElement);
            const newCursorPos = getAbsoluteOffset(contentElement, range.startContainer, range.startOffset);
            range.deleteContents();
            Array.from(contentElement.childNodes).forEach((node) => {
                const isNodeAroundMention = isNodeAroundSpecialElements(node);
                if (node.textContent.trim() === '' && !isNodeAroundMention) {
                    node.remove();
                }
            });
            this.parent.stateManager.updateContentOnUserTyping(blockElement);
            this.parent.setFocusAndUIForNewBlock(blockElement);
            setCursorPosition(contentElement, newCursorPos);
            const isCodeBlk = selectedBlocks[0].blockType === BlockType.Code;
            const isTableChild = this.parent.currentFocusedBlock.closest(`.${TABLE_BLOCK_CLS}`);
            const isEmptyAfterDeletion = contentElement && contentElement.textContent.trim() === '';
            if (isEmptyAfterDeletion) {
                if (isCodeBlk) {
                    contentElement.textContent = '\n';
                }
                else if (!isNullOrUndefined(isTableChild)) {
                    contentElement.innerHTML = '<br>';
                }
            }
            return;
        }
        this.parent.blockCommand.handleSelectiveDeletions(new KeyboardEvent('keydown', { key: 'Backspace' }));
    }
    handleBlockEditorPaste(data, text) {
        try {
            const parsedData = JSON.parse(data);
            const props = Object.keys(parsedData)[0];
            switch (props) {
                case 'blocks':
                    this.handleMultiBlocksPaste(parsedData.blocks);
                    break;
                case 'block': {
                    const blocksToPaste = [decoupleReference(this.parent.blockService.generateNewIdsForBlock(parsedData.block))];
                    const cursorBlock = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
                    const parentBlock = getBlockModelById(cursorBlock.parentId, this.parent.getEditorBlocks());
                    if (parentBlock) {
                        this.parent.blockService.assignParentIdToBlocks(blocksToPaste, parentBlock.id);
                    }
                    this.parent.blockCommand.addBulkBlocks({
                        blocks: blocksToPaste,
                        targetBlockId: this.parent.currentFocusedBlock.id,
                        insertionType: 'block',
                        isSelectivePaste: this.isSelectivePaste
                    });
                    break;
                }
                case 'contents':
                    this.handleContentPasteWithinBlock(parsedData.contents);
                    break;
            }
        }
        catch (error) {
            console.error('Error parsing Block Editor clipboard data:', error);
            // Fallback to plain text paste
            this.handlePlainTextPaste(text);
        }
    }
    handleContentPasteWithinBlock(content) {
        if (!content.length) {
            return;
        }
        const range = this.parent.nodeSelection.getRange();
        if (!range) {
            return;
        }
        const cursorBlockElement = findClosestParent(range.startContainer, '.' + BLOCK_CLS);
        const contentEle = getBlockContentElement(cursorBlockElement);
        const cursorBlock = getBlockModelById(cursorBlockElement.id, this.parent.getEditorBlocks());
        const oldBlock = decoupleReference(cursorBlock);
        const splitContent = this.parent.nodeCutter.splitContent(getBlockContentElement(cursorBlockElement), range.startContainer, range.startOffset);
        const beforeModels = this.parent.blockCommand.getContentModelForFragment(splitContent.beforeFragment);
        const afterModels = this.parent.blockCommand.getContentModelForFragment(splitContent.afterFragment);
        const pastedLength = content.reduce((sum, c) => sum + (c.content.length), 0);
        const targetOffset = getAbsoluteOffset(contentEle, range.startContainer, range.startOffset) + pastedLength;
        /* Update model */
        this.parent.blockService.updateContent(cursorBlock.id, [
            ...beforeModels,
            ...content,
            ...afterModels
        ]);
        /* Update DOM */
        this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                data: [{ block: cursorBlock, oldBlock: oldBlock }]
            } });
        setCursorPosition(contentEle, targetOffset);
        this.parent.undoRedoAction.pushActionIntoUndoStack({
            action: actionType.clipboardPaste,
            data: {
                type: 'content',
                oldContent: oldBlock.content,
                newContent: decoupleReference(cursorBlock.content),
                targetBlockId: cursorBlock.id,
                isSelectivePaste: this.isSelectivePaste,
                pasteEndOffset: targetOffset
            }
        });
    }
    /**
     * Handles multi-block paste operation.
     *
     * @param {BlockModel[]} blocks - The blocks to be pasted.
     * @param {boolean} isUndoRedoAction - Indicates if the action is part of an undo/redo operation.
     * @returns {void}
     * @hidden
     */
    handleMultiBlocksPaste(blocks, isUndoRedoAction = false) {
        if (!blocks.length) {
            return;
        }
        const range = this.parent.nodeSelection.getRange();
        if (!range) {
            return;
        }
        const editorBlocks = this.parent.getEditorBlocks();
        let cursorBlockElement = findClosestParent(range.startContainer, '.' + BLOCK_CLS);
        const cursorBlock = getBlockModelById(cursorBlockElement.id, editorBlocks);
        const oldCursorBlock = decoupleReference(cursorBlock);
        const contentElement = getBlockContentElement(cursorBlockElement);
        const isContentEmpty = contentElement && isElementEmpty(contentElement);
        const isCursorAtStart = isAtStartOfBlock(contentElement);
        const parentBlock = getBlockModelById(cursorBlock.parentId, editorBlocks)
            || findCellById(cursorBlock.parentId, editorBlocks);
        const specialTypes = [BlockType.Table, BlockType.Image];
        const isFirstBlkSpecialType = specialTypes.indexOf(blocks[0].blockType) !== -1;
        let cursorBlockAfterSplit;
        let isFirstBlkProcessed = false;
        if (parentBlock) {
            this.parent.blockService.assignParentIdToBlocks(blocks, parentBlock.id);
        }
        if (isContentEmpty) {
            isFirstBlkProcessed = true;
            this.parent.blockService.generateNewIdsForBlock(blocks[0]);
            blocks[0].id = cursorBlockElement.id;
            this.parent.blockService.replaceBlock(cursorBlock.id, blocks[0]);
            this.parent.stateManager.updateManagerBlocks();
            this.parent.observer.notify('modelChanged', { type: 'ReplaceBlock', state: {
                    targetBlockId: cursorBlock.id,
                    block: getBlockModelById(blocks[0].id, this.parent.getEditorBlocks()),
                    oldBlock: oldCursorBlock,
                    preventEventTrigger: true
                } });
        }
        else if (!isFirstBlkSpecialType) {
            isFirstBlkProcessed = true;
            this.parent.execCommand({ command: 'SplitBlock', state: { preventEventTrigger: true } });
            /* When split at start, empty block will be appended before target */
            cursorBlockElement = ((range.startOffset === 0)
                ? cursorBlockElement.previousElementSibling
                : cursorBlockElement);
            const updatedCursorBlock = getBlockModelById(cursorBlockElement.id, this.parent.getEditorBlocks());
            if (!updatedCursorBlock) {
                return;
            }
            cursorBlockAfterSplit = decoupleReference(updatedCursorBlock);
            const isContentEmptyAfterSplit = !updatedCursorBlock.content || (updatedCursorBlock.content
                && updatedCursorBlock.content.length === 1 && updatedCursorBlock.content[0].content === '');
            const contentToUpdate = isContentEmptyAfterSplit ? [...blocks[0].content] : [
                ...updatedCursorBlock.content,
                ...blocks[0].content
            ];
            this.parent.blockService.updateContent(updatedCursorBlock.id, contentToUpdate);
            this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                    data: [{ block: updatedCursorBlock, oldBlock: oldCursorBlock }],
                    preventEventTrigger: true
                } });
        }
        this.parent.blockCommand.addBulkBlocks({
            blocks: blocks.slice(!isFirstBlkProcessed ? 0 : 1)
                .map((block) => this.parent.blockService.generateNewIdsForBlock(block)),
            targetBlockId: cursorBlockElement.id,
            isUndoRedoAction: isUndoRedoAction,
            insertionType: 'blocks',
            clipboardBlocks: blocks.map((block) => decoupleReference(block)),
            cursorBlockAfterSplit: cursorBlockAfterSplit,
            oldBlockModel: oldCursorBlock,
            isPastedAtStart: isCursorAtStart,
            isSelectivePaste: this.isSelectivePaste
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    }
    handleCodeBlockContentPaste(content, blockModel) {
        const codeBlockContentElement = document.getElementById(blockModel.id).querySelector('.e-code-content');
        // Store the old block state for undo/redo tracking
        const oldBlockModel = decoupleReference(blockModel);
        // Get current cursor position
        const range = getSelectedRange();
        let cursorPosition = 0;
        if (range && range.startContainer === codeBlockContentElement
            || codeBlockContentElement.contains(range.startContainer)) {
            // Calculate cursor position from the beginning of text content
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(codeBlockContentElement);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            cursorPosition = preCaretRange.toString().length;
        }
        // Get current text content
        const currentText = codeBlockContentElement.textContent === '\n' ? '' : codeBlockContentElement.textContent;
        // Insert pasted content at cursor position
        const beforeCursor = currentText.substring(0, cursorPosition);
        const afterCursor = currentText.substring(cursorPosition);
        const newText = beforeCursor + content + afterCursor;
        // Update DOM
        codeBlockContentElement.textContent = newText;
        // Update model
        blockModel.content[0].content = newText;
        // Position cursor after pasted content
        const newCursorPosition = cursorPosition + content.length;
        setCursorPosition(codeBlockContentElement, newCursorPosition);
        // Track the change for undo/redo
        const clonedBlock = decoupleReference(blockModel);
        this.parent.undoRedoAction.trackContentChangedForUndoRedo(oldBlockModel, clonedBlock);
    }
    handleHtmlPaste(html) {
        const tempDiv = unWrapContainer((() => {
            const div = document.createElement('div');
            div.innerHTML = html;
            return div;
        })());
        if (isBlockLevelContent(tempDiv)) {
            this.handleMultiBlocksPaste(convertHtmlElementToBlocks(tempDiv, this.parent.pasteCleanupSettings.keepFormat));
        }
        else {
            this.handleContentPasteWithinBlock(convertInlineElementsToContentModels(tempDiv, this.parent.pasteCleanupSettings.keepFormat));
        }
    }
    handlePlainTextPaste(text) {
        this.handleMultiBlocksPaste(createBlocksFromPlainText(text));
    }
    handleCellPasteInsideTable(tableCtx, html, text) {
        const cleanedData = this.clipboardCleanupModule.cleanupPaste({ html: html, plainText: text });
        const payloadFromExternal = createCellsPayloadFromExternal(cleanedData, text);
        if (payloadFromExternal && payloadFromExternal.cells && payloadFromExternal.cells.length) {
            this.performCellPaste(payloadFromExternal, tableCtx);
            this.triggerAfterPasteEvent(text);
            this.isSelectivePaste = false;
            return;
        }
    }
    performCellPaste(payload, ctx) {
        if (!(payload.cells && payload.cells.length)) {
            return;
        }
        // Snapshot old blocks and track structure delta for undo/redo
        const oldNewPairs = [];
        const structureDelta = {};
        const needRows = Math.max(0, (ctx.startDataRow + payload.cells.length) - ctx.props.rows.length);
        if (needRows > 0) {
            structureDelta.rowsAdded = [];
            for (let i = 0; i < needRows; i++) {
                const at = ctx.props.rows.length;
                structureDelta.rowsAdded.push(at);
                this.parent.tableService.addRowAt({ blockId: ctx.tableBlockEl.id, rowIndex: at });
            }
        }
        const needCols = Math.max(0, (ctx.startDataCol + payload.cells[0].length) - ctx.props.columns.length);
        if (needCols > 0) {
            structureDelta.colsAdded = [];
            for (let i = 0; i < needCols; i++) {
                const at = ctx.props.columns.length;
                structureDelta.colsAdded.push(at);
                this.parent.tableService.addColumnAt({ blockId: ctx.tableBlockEl.id, colIndex: at });
            }
        }
        this.parent.tableService.removeCellFocus(ctx.tableEl);
        for (let r = 0; r < payload.cells.length; r++) {
            for (let c = 0; c < payload.cells[r].length; c++) {
                const targetRow = ctx.startDataRow + r;
                const targetCol = ctx.startDataCol + c;
                const oldBlocks = (ctx.props.rows[targetRow].cells[targetCol].blocks)
                    .map((b) => decoupleReference(b));
                const newBlocks = payload.cells[r][c];
                oldNewPairs.push({ dataRow: targetRow, dataCol: targetCol, oldBlocks, newBlocks });
                this.parent.tableService.setCellBlocks(ctx.tableEl, targetRow, targetCol, newBlocks);
                if (c === 0 && r === 0) {
                    const cellToFocus = getDataCell(ctx.tableEl, toDomRow(targetRow, ctx.props.enableHeader), targetCol);
                    this.parent.tableService.addCellFocus(cellToFocus, true);
                }
            }
        }
        // Push undo stack entry for table cells paste
        this.parent.undoRedoAction.trackTableCellsPasteForUndoRedo({
            blockId: ctx.tableBlockEl.id,
            cells: oldNewPairs,
            structureDelta
        });
    }
    performCellCut(tableCtx) {
        const selectedCells = Array.from(getSelectedCells(tableCtx.tableBlockEl));
        const tableEl = tableCtx.tableEl;
        const props = tableCtx.props;
        if (!selectedCells.length) {
            return;
        }
        const dataPositions = selectedCells.map((td) => ({
            r: props.enableHeader ? (parseInt(td.dataset.row, 10) - 1) : parseInt(td.dataset.row, 10),
            c: parseInt(td.dataset.col, 10)
        })).filter((p) => !isNaN(p.r) && !isNaN(p.c) && p.r >= 0 && p.c >= 0);
        const totalRows = props.rows.length;
        const totalCols = props.columns.length;
        const selectedKeySet = new Set(dataPositions.map((p) => `${p.r}:${p.c}`));
        // Build counts per row and per column
        const rowCounts = new Map();
        const colCounts = new Map();
        dataPositions.forEach((p) => {
            rowCounts.set(p.r, (rowCounts.get(p.r) || 0) + 1);
            colCounts.set(p.c, (colCounts.get(p.c) || 0) + 1);
        });
        const fullRows = Array.from(rowCounts.entries())
            .filter(([_, count]) => count === totalCols)
            .map(([r]) => r)
            .sort((a, b) => a - b);
        const onlyFullRowsSelected = fullRows.length > 0 && (fullRows.length * totalCols === selectedKeySet.size);
        const fullCols = Array.from(colCounts.entries())
            .filter(([_, count]) => count === totalRows)
            .map(([c]) => c)
            .sort((a, b) => a - b);
        const onlyFullColsSelected = fullCols.length > 0 && (fullCols.length * totalRows === selectedKeySet.size);
        if (onlyFullRowsSelected) {
            const rowsMeta = fullRows.map((r) => ({
                index: r,
                rowModel: decoupleReference(props.rows[r])
            }));
            // Push single undo entry for all rows
            this.parent.undoRedoAction.trackBulkRowDeletionForUndoRedo({
                blockId: tableCtx.tableBlockEl.id, rows: rowsMeta
            });
            const rowsToDeleteDom = fullRows
                .map((r) => (props.enableHeader ? r + 1 : r))
                .sort((a, b) => b - a);
            rowsToDeleteDom.forEach((domRowIdx) => this.parent.tableService.deleteRowAt({
                blockId: tableCtx.tableBlockEl.id,
                modelIndex: toModelRow(domRowIdx, props.enableHeader),
                isUndoRedoAction: true
            }));
            return;
        }
        if (onlyFullColsSelected) {
            const colsMeta = fullCols.map((c) => ({
                index: c,
                columnModel: decoupleReference(props.columns[c]),
                columnCells: props.rows.map((r) => decoupleReference(r.cells[c]))
            }));
            this.parent.undoRedoAction.trackBulkColumnDeletionForUndoRedo({
                blockId: tableCtx.tableBlockEl.id, cols: colsMeta
            });
            // Delete columns from right to left (data col indices)
            fullCols.sort((a, b) => b - a).forEach((dataColIdx) => this.parent.tableService.deleteColumnAt({
                blockId: tableCtx.tableBlockEl.id,
                colIndex: dataColIdx,
                isUndoRedoAction: true
            }));
            return;
        }
        // Partial selection: clear cell contents
        this.parent.tableService.clearCellContents(tableEl, selectedCells);
    }
    triggerAfterPasteEvent(text) {
        this.parent.observer.notify('afterPaste', { content: text });
    }
    /**
     * Checks if the clipboard is empty.
     *
     * @returns {Promise<boolean>} - A promise that resolves to true if the clipboard is empty, false otherwise.
     * @hidden
     */
    isClipboardEmpty() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const clipboardItems = yield navigator.clipboard.read();
            return clipboardItems.length === 0;
        });
    }
    /**
     * Handles the context copy operation.
     *
     * @returns {Promise<void>} - A promise that resolves when the copy operation is complete.
     * @hidden
     */
    handleContextCopy() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const { html, text } = this.getClipboardPayload();
            yield navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': new Blob([html], { type: 'text/html' }),
                    'text/plain': new Blob([text], { type: 'text/plain' })
                })
            ]);
        });
    }
    /**
     * Handles the context cut operation.
     *
     * @returns {Promise<void>} - A promise that resolves when the cut operation is complete.
     * @hidden
     */
    handleContextCut() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.handleContextCopy();
            this.performCutOperation();
        });
    }
    /**
     * Handles the context paste operation.
     *
     * @returns {Promise<void>} - A promise that resolves when the paste operation is complete.
     * @hidden
     */
    handleContextPaste() {
        return __awaiter$1(this, void 0, void 0, function* () {
            let html = '';
            let text = '';
            let file;
            try {
                const clipboardItems = yield navigator.clipboard.read();
                for (const item of clipboardItems) {
                    if (item.types.indexOf('text/html') !== -1) {
                        html = yield (yield item.getType('text/html')).text();
                    }
                    if (item.types.indexOf('text/plain') !== -1) {
                        text = yield (yield item.getType('text/plain')).text();
                    }
                    if (item.types.indexOf('image/png') !== -1) {
                        file = yield item.getType('image/png');
                    }
                }
            }
            catch (err) {
                // Fallback for insecure context
                text = yield navigator.clipboard.readText();
            }
            this.performPasteOperation({ html, text, file: file });
        });
    }
    destroy() {
        this.unwireEvents();
        this.clipboardCleanupModule = null;
    }
}

class MentionAction {
    constructor(manager) {
        this.parent = manager;
        this.wireEvents();
    }
    wireEvents() {
        this.parent.observer.on('mentionOpened', this.onMentionOpen, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    unWireEvents() {
        this.parent.observer.off('mentionOpened', this.onMentionOpen);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    onMentionOpen() {
        this.parent.nodeSelection.storeCurrentRange();
    }
    /**
     * Cleans the artifacts of mention control in BlockEditor such as mention chip and zero width space.
     *
     * @param {HTMLElement} element - specifies the element.
     * @param {boolean} isRemoveChip - specifies whether to remove the mention chip
     * @returns {void}
     * @hidden
     */
    cleanMentionArtifacts(element, isRemoveChip) {
        if (element) {
            const range = getSelectedRange();
            if (!range) {
                return;
            }
            const rangeParent = range.startContainer.nodeType === Node.TEXT_NODE
                ? range.startContainer.parentElement
                : range.startContainer;
            const insertedChip = rangeParent.querySelector('span[class="e-mention-chip"]');
            if (insertedChip && isRemoveChip) {
                insertedChip.remove();
            }
        }
    }
    /**
     * Removes the mention query keys from the block model.
     * When triggering command such as '/' or the filter queries, this function effectively cleans it in the block model
     *
     * @param {string} mentionChar - specifies the mention character.
     * @param {boolean} isUndoRedoAction - specifies whether the action is undo/redo action.
     * @returns {void}
     * @hidden
     */
    removeMentionQueryKeysFromModel(mentionChar, isUndoRedoAction) {
        const rangePath = this.parent.nodeSelection.getStoredBackupRange();
        if ((!rangePath || isUndoRedoAction) ||
            (rangePath && (!rangePath.startContainer || !rangePath.endContainer))) {
            return;
        }
        const { startContainer, startOffset, endOffset, contentElement } = rangePath;
        const blockEl = this.parent.currentFocusedBlock;
        const block = getBlockModelById(blockEl.id, this.parent.getEditorBlocks());
        const targetNode = document.contains(startContainer) ? startContainer : contentElement;
        if (!block || !block.content || block.content.length === 0) {
            return;
        }
        const affectedContent = getContentModelByNode(targetNode, this.parent.getEditorBlocks());
        if (!affectedContent || !affectedContent.content) {
            return;
        }
        const text = affectedContent.content;
        if (startOffset === endOffset) {
            let start = startOffset;
            while (start > 0 && text[start - 1] !== mentionChar) {
                start--;
            }
            // Adjust -1 to the start to remove the mention char as well.
            affectedContent.content = text.slice(0, start - 1) + text.slice(endOffset);
            // Remove contentchanged action triggered by typing '/'
            if (!isUndoRedoAction) {
                if (this.parent.undoRedoAction.undoRedoStack.length > 0) {
                    this.parent.undoRedoAction.undoRedoStack.pop();
                    this.parent.undoRedoAction.index = this.parent.undoRedoAction.undoRedoStack.length - 1;
                }
            }
        }
        this.parent.stateManager.updateManagerBlocks();
    }
    destroy() {
        this.unWireEvents();
    }
}

/**
 * Drag and Drop module is used to perform block reordering actions.
 */
class DragAndDropAction {
    constructor(manager) {
        this.isDragCompleted = false;
        this.isDragMoveCancelled = false;
        this.draggedBlocks = [];
        this.isIndicatorAtTop = false;
        this.parent = manager;
    }
    wireDragEvents() {
        EventHandler.add(this.parent.rootEditorElement, 'dragover', this.updateCurrentDroppingTarget, this);
        EventHandler.add(this.parent.rootEditorElement, 'dragenter', this.preventNoDropIcon, this);
        if (!isNullOrUndefined(this.parent.floatingIconAction.floatingIconContainer)) {
            const dragIcon = this.parent.floatingIconAction.floatingIconContainer.querySelector('.e-block-drag-icon');
            if (!isNullOrUndefined(dragIcon)) {
                EventHandler.add(dragIcon, 'dragstart', this.handleDragStart, this);
                EventHandler.add(dragIcon, 'drag', this.handleDragMove, this);
                EventHandler.add(dragIcon, 'dragend', this.handleDragStop, this);
            }
        }
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    unwireDragEvents() {
        EventHandler.remove(this.parent.rootEditorElement, 'dragover', this.updateCurrentDroppingTarget);
        EventHandler.remove(this.parent.rootEditorElement, 'dragenter', this.preventNoDropIcon);
        if (!isNullOrUndefined(this.parent.floatingIconAction.floatingIconContainer)) {
            const dragIcon = this.parent.floatingIconAction.floatingIconContainer.querySelector('.e-block-drag-icon');
            if (!isNullOrUndefined(dragIcon)) {
                EventHandler.remove(dragIcon, 'dragstart', this.handleDragStart);
                EventHandler.remove(dragIcon, 'drag', this.handleDragMove);
                EventHandler.remove(dragIcon, 'dragend', this.handleDragStop);
            }
        }
        this.parent.observer.off(events.destroy, this.destroy);
    }
    preventNoDropIcon(e) {
        e.preventDefault();
    }
    updateCurrentDroppingTarget(e) {
        e.preventDefault();
        const elementsAtPoint = document.elementsFromPoint(e.clientX, e.clientY);
        const innerMostElement = elementsAtPoint[0];
        const closestBlock = innerMostElement.closest('.' + BLOCK_CLS);
        if (innerMostElement && closestBlock) {
            this.currentDropTarget = closestBlock;
        }
        else {
            this.currentDropTarget = null;
        }
    }
    handleDragMove(e) {
        if (isNullOrUndefined(this.parent.currentHoveredBlock)) {
            return;
        }
        this.isDragCompleted = false;
        const dropIndex = this.currentDropTarget ? getBlockIndexById(this.currentDropTarget.id, this.parent.getEditorBlocks()) : -1;
        const eventArgs = {
            blocks: this.draggedBlocks,
            fromIndex: this.draggedBlocks.map((block) => getBlockIndexById(block.id, this.parent.getEditorBlocks())),
            dropIndex: dropIndex,
            event: e,
            target: this.currentDropTarget,
            cancel: false
        };
        this.parent.observer.notify('blockDragging', eventArgs);
        if (eventArgs.cancel) {
            this.isDragMoveCancelled = true;
            return;
        }
        else {
            this.isDragMoveCancelled = false;
        }
        if (this.dragClone) {
            const editorRect = this.parent.rootEditorElement.getBoundingClientRect();
            updateCSSText(this.parent.floatingIconAction.floatingIconContainer, 'display: flex;');
            const dragIcon = this.parent.floatingIconAction.floatingIconContainer.querySelector('.e-block-drag-icon');
            const dragIconRect = dragIcon.getBoundingClientRect();
            updateCSSText(this.parent.floatingIconAction.floatingIconContainer, 'display: none;');
            const scrollTop = this.parent.rootEditorElement.scrollTop;
            const scrollLeft = this.parent.rootEditorElement.scrollLeft;
            const totalHeight = Array.from(this.dragClone.children)
                .map((child) => child.offsetHeight)
                .reduce((sum, height) => sum + height, 0);
            const cssText = `opacity: 0.7; left: ${e.clientX - editorRect.left + dragIconRect.width + scrollLeft}px; top: ${e.clientY - editorRect.top + scrollTop}px; width: ${this.parent.currentHoveredBlock.offsetWidth}px; height: ${totalHeight}px;`;
            updateCSSText(this.dragClone, cssText);
            if (e.clientY < editorRect.top ||
                e.clientY > editorRect.bottom ||
                e.clientX < editorRect.left ||
                e.clientX > editorRect.right) {
                updateCSSText(this.dragClone, 'opacity: 0;');
            }
        }
        // To prevent the flickering of the drop indicator when drag towards up
        setTimeout(() => {
            this.updateDropIndicator();
        }, 50);
    }
    handleDragStart(e) {
        this.isDragCompleted = false;
        this.isDragMoveCancelled = false;
        const editorBlocks = this.parent.getEditorBlocks();
        if (!e.target.classList.contains('e-block-drag-icon') || !this.parent.currentHoveredBlock) {
            return;
        }
        let selectedBlocks = [];
        const hoveredBlockId = this.parent.currentHoveredBlock.id;
        let isHoveredBlockInSelection = false;
        if (this.parent.editorMethods.getSelectedBlocks()) {
            isHoveredBlockInSelection = this.parent.editorMethods.getSelectedBlocks()
                .some((block) => block.id === hoveredBlockId);
        }
        const range = getSelectedRange();
        if (range && range.toString().trim().length > 0 && isHoveredBlockInSelection) {
            selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        }
        else {
            this.parent.nodeSelection.clearSelection();
            const blockModel = getBlockModelById(hoveredBlockId, editorBlocks);
            if (blockModel) {
                selectedBlocks.push(blockModel);
            }
        }
        this.draggedBlocks = selectedBlocks;
        this.filterDraggedBlocksToExcludeChildren();
        const eventArgs = {
            blocks: this.draggedBlocks,
            fromIndex: this.draggedBlocks.map((block) => getBlockIndexById(block.id, editorBlocks)),
            dropIndex: this.currentDropTarget ? getBlockIndexById(this.currentDropTarget.id, editorBlocks) : -1,
            event: e,
            target: this.currentDropTarget,
            cancel: false
        };
        this.parent.observer.notify('blockDragStart', eventArgs);
        if (eventArgs.cancel) {
            e.preventDefault();
            return;
        }
        this.dragClone = document.createElement('div');
        const cssText = 'position: absolute; opacity: 0; pointer-events: none;';
        updateCSSText(this.dragClone, cssText);
        this.dragClone.classList.add('e-be-dragging-clone');
        for (const block of selectedBlocks) {
            const blockElement = document.getElementById(block.id);
            if (blockElement) {
                this.dragClone.appendChild(blockElement.cloneNode(true));
            }
        }
        this.parent.blockContainer.appendChild(this.dragClone);
        const transparentImage = new Image();
        transparentImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; // 1x1 transparent pixel
        e.dataTransfer.setDragImage(transparentImage, 0, 0);
    }
    handleDragStop(e) {
        if (isNullOrUndefined(this.parent.currentHoveredBlock)) {
            return;
        }
        if (this.isDragMoveCancelled) {
            cleanupElement(this.dragClone);
            cleanupElement(this.dropIndicator);
            return;
        }
        e.preventDefault();
        this.isDragCompleted = true;
        let currentIndicatorBlock;
        if (this.dropIndicator) {
            currentIndicatorBlock = this.dropIndicator.closest('.' + BLOCK_CLS);
        }
        let dropTarget;
        if (currentIndicatorBlock) {
            const hoveredBlockRect = this.parent.currentHoveredBlock.getBoundingClientRect();
            const isMovingDown = hoveredBlockRect.top < currentIndicatorBlock.getBoundingClientRect().top;
            if (!this.isIndicatorAtTop && !isMovingDown) {
                dropTarget = getAdjacentBlock(currentIndicatorBlock, 'next');
                if (isNullOrUndefined(dropTarget)) {
                    dropTarget = currentIndicatorBlock;
                }
            }
            else {
                dropTarget = currentIndicatorBlock;
            }
        }
        const eventArgs = {
            blocks: this.draggedBlocks.map((block) => block),
            fromIndex: this.draggedBlocks.map((block) => getBlockIndexById(block.id, this.parent.getEditorBlocks())),
            dropIndex: dropTarget ? getBlockIndexById(dropTarget.id, this.parent.getEditorBlocks()) : -1,
            event: e,
            target: dropTarget
        };
        this.parent.observer.notify('blockDropped', eventArgs);
        cleanupElement(this.dragClone);
        cleanupElement(this.dropIndicator);
        if (dropTarget && dropTarget !== this.parent.currentHoveredBlock) {
            this.reorderBlocks(this.draggedBlocks, dropTarget);
            this.parent.listPlugin.recalculateMarkersForListItems();
        }
        this.draggedBlocks = [];
    }
    reorderBlocks(draggedBlocks, dropTarget) {
        this.parent.execCommand({ command: 'MoveBlock', state: {
                fromBlockIds: draggedBlocks.map((block) => block.id),
                toBlockId: dropTarget.id
            } });
    }
    filterDraggedBlocksToExcludeChildren() {
        const draggedBlockIds = new Set(this.draggedBlocks.map((block) => block.id));
        this.draggedBlocks = this.draggedBlocks.filter((block) => {
            // If block has a parentId and that parent is also in draggedBlocks, exclude this block
            return !block.parentId || !draggedBlockIds.has(block.parentId);
        });
    }
    isNestedBlockType(blockType) {
        const nestedBlockTypes = [
            BlockType.Quote,
            BlockType.Callout,
            BlockType.CollapsibleParagraph,
            BlockType.CollapsibleHeading
        ];
        return nestedBlockTypes.indexOf(blockType) > -1;
    }
    hasNestedBlockInDraggedBlocks() {
        return this.draggedBlocks.some((block) => this.isNestedBlockType(block.blockType));
    }
    isDropTargetInsideNestedBlock() {
        let currentElement = this.currentDropTarget;
        while (currentElement && currentElement !== this.parent.blockContainer) {
            const blockElement = currentElement.closest('.' + BLOCK_CLS);
            if (blockElement) {
                const blockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
                if (blockModel && this.isNestedBlockType(blockModel.blockType)) {
                    return true;
                }
            }
            currentElement = blockElement ? blockElement.parentElement : null;
        }
        return false;
    }
    updateDropIndicator() {
        if (this.isDragCompleted ||
            !this.currentDropTarget ||
            this.currentDropTarget === this.parent.currentHoveredBlock ||
            this.draggedBlocks.some((block) => block.id === this.currentDropTarget.id)) {
            cleanupElement(this.dropIndicator);
            return;
        }
        // Restrict drop indicator for nested block scenarios
        if (this.hasNestedBlockInDraggedBlocks() && this.isDropTargetInsideNestedBlock()) {
            cleanupElement(this.dropIndicator);
            return;
        }
        if (!this.dropIndicator) {
            this.dropIndicator = document.createElement('div');
            this.dropIndicator.classList.add('e-be-drop-indicator');
        }
        const hoverdBlockRect = this.parent.currentHoveredBlock.getBoundingClientRect();
        const dropTargetRect = this.currentDropTarget.getBoundingClientRect();
        const middleY = dropTargetRect.top + (dropTargetRect.height / 2);
        let draggedBlockRect;
        if (this.dragClone) {
            draggedBlockRect = this.dragClone.children[0].getBoundingClientRect();
        }
        if (isNullOrUndefined(draggedBlockRect) || isNullOrUndefined(hoverdBlockRect)) {
            return;
        }
        if (hoverdBlockRect.top > draggedBlockRect.top) {
            this.handleDraggingAbove(middleY, draggedBlockRect);
        }
        else {
            this.handleDraggingBelow(middleY, draggedBlockRect);
        }
        const currentIndicatorBlock = this.dropIndicator.closest('.' + BLOCK_CLS);
        if (!currentIndicatorBlock) {
            return;
        }
        const indicatorBlockModel = getBlockModelById(currentIndicatorBlock.id, this.parent.getEditorBlocks());
        const specialTypes = [BlockType.Divider, BlockType.CollapsibleParagraph, BlockType.CollapsibleHeading,
            BlockType.Callout, BlockType.Quote, BlockType.Table, BlockType.Image, BlockType.Code];
        const isSpecialType = (specialTypes.indexOf(indicatorBlockModel.blockType) > -1);
        if (isSpecialType) {
            updateCSSText(this.dropIndicator, 'left: 46px;');
            return;
        }
        const blockContent = getBlockContentElement(currentIndicatorBlock);
        if (!blockContent) {
            return;
        }
        const leftOffset = blockContent.getBoundingClientRect().left - currentIndicatorBlock.getBoundingClientRect().left;
        updateCSSText(this.dropIndicator, `left: ${leftOffset}px;`);
    }
    handleDraggingAbove(middleY, draggedBlockRect) {
        if (draggedBlockRect && draggedBlockRect.top < middleY) {
            const adjecentBLockEle = this.currentDropTarget.previousElementSibling;
            if (adjecentBLockEle) {
                if (!this.checkAndInsertIndicatorInListBlock(adjecentBLockEle, true)) {
                    adjecentBLockEle.appendChild(this.dropIndicator);
                }
                this.isIndicatorAtTop = false;
            }
            else {
                if (!this.checkAndInsertIndicatorInListBlock(this.currentDropTarget, false)) {
                    this.currentDropTarget.prepend(this.dropIndicator);
                }
                this.isIndicatorAtTop = true;
            }
        }
    }
    handleDraggingBelow(middleY, draggedBlockRect) {
        if (draggedBlockRect && draggedBlockRect.top > middleY) {
            if (!this.checkAndInsertIndicatorInListBlock(this.currentDropTarget, true)) {
                this.currentDropTarget.appendChild(this.dropIndicator);
            }
            this.isIndicatorAtTop = false;
        }
    }
    checkAndInsertIndicatorInListBlock(element, isAfter) {
        if (isListTypeBlock(element.getAttribute('data-block-type'))) {
            const listItem = element.querySelector('li');
            if (listItem) {
                listItem.insertAdjacentElement(isAfter ? 'afterend' : 'beforebegin', this.dropIndicator);
                return true;
            }
        }
        return false;
    }
    destroy() {
        this.unwireDragEvents();
    }
}

/**
 * InlineToolbarModule class is used to render the inline toolbar for the block editor.
 *
 * @hidden
 */
class InlineToolbarModule$1 {
    constructor(manager) {
        this.parent = manager;
        this.addEventListeners();
    }
    addEventListeners() {
        this.parent.observer.on(events.inlineToolbarItemClick, this.handleInlineToolbarItemClick, this);
        this.parent.observer.on('toolbarCreated', this.handleToolbarCreated, this);
        this.parent.observer.on('handleColorpickerChange', this.handleColorChange, this);
        this.parent.observer.on('popupWidthChanged', this.handlePopupWidthChanges, this);
        this.parent.observer.on(events.formattingPerformed, this.toggleToolbarActiveState, this);
        this.parent.observer.on(events.keydown, this.onKeydown, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.parent.observer.off(events.inlineToolbarItemClick, this.handleInlineToolbarItemClick);
        this.parent.observer.off('toolbarCreated', this.handleToolbarCreated);
        this.parent.observer.off('handleColorpickerChange', this.handleColorChange);
        this.parent.observer.off('popupWidthChanged', this.handlePopupWidthChanges);
        this.parent.observer.off(events.formattingPerformed, this.toggleToolbarActiveState);
        this.parent.observer.off(events.keydown, this.onKeydown);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    handleToolbarCreated() {
        this.toolbarEle = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + BLOCKEDITOR_INLINETBAR_ID);
        this.init();
    }
    init() {
        this.popupElement = this.parent.rootEditorElement.querySelector('#' + this.parent.rootEditorElement.id + INLINE_TBAR_POPUP_ID);
        this.popupObj = this.parent.popupRenderer.renderPopup({
            element: this.popupElement,
            content: this.toolbarEle
        });
        this.popupObj.actionOnScroll = 'none';
    }
    onKeydown(e) {
        const normalizedKey = getNormalizedKey(e);
        if (!normalizedKey) {
            return;
        }
        const command = this.parent.keyCommandMap.get(normalizedKey);
        const allowedCommands = ['bold', 'italic', 'underline', 'strikethrough', 'inlineCode'];
        const tableBlk = this.parent.currentFocusedBlock &&
            this.parent.currentFocusedBlock.closest(`.${TABLE_BLOCK_CLS}`);
        if (allowedCommands.indexOf(command) !== -1) {
            e.preventDefault();
            if (window.getSelection().isCollapsed && !(tableBlk && hasActiveTableSelection(tableBlk))) {
                this.parent.formattingAction.toggleActiveFormats(command);
            }
            else {
                this.parent.execCommand({ command: 'FormattingAction', state: { command: command } });
            }
        }
    }
    isSelectionInTableHeader(range) {
        // Resolve a reliable HTMLElement anchor from the range
        const startEl = (range.startContainer.nodeType === Node.ELEMENT_NODE
            ? range.startContainer
            : range.startContainer.parentElement);
        if (!startEl) {
            return false;
        }
        // Nearest header cell: either an actual <th> or an element marked as column header
        const headerCell = startEl.closest('th,[role="columnheader"]');
        if (!headerCell) {
            return false;
        }
        // Ensure it's within a THEAD to qualify as header, not body cells styled as header
        const inThead = headerCell.closest('thead');
        return !!inThead;
    }
    /**
     * Shows the inline toolbar at the current selection
     *
     * @param {Range} range - Selection range where the toolbar should appear
     * @param {Event} event - Optional event that triggered the toolbar
     * @returns {void}
     * @hidden
     */
    showInlineToolbar(range, event) {
        const notAllowedTypes = [BlockType.Code];
        const blockElement = findClosestParent(range.startContainer, '.' + BLOCK_CLS);
        const blockType = blockElement.getAttribute('data-block-type');
        if (!this.parent.inlineToolbarSettings.enable || (notAllowedTypes.indexOf(blockType) !== -1)) {
            return;
        }
        if (this.isSelectionInTableHeader(range)) {
            return;
        }
        this.toggleToolbarActiveState();
        this.parent.popupRenderer.adjustPopupPositionRelativeToTarget(range, this.popupObj);
        this.popupObj.show();
    }
    /**
     * Hides the inline toolbar
     *
     * @param {Event} e - Optional event that triggered hiding the toolbar
     * @returns {void}
     */
    hideInlineToolbar(e) {
        if (this.popupElement && !this.popupElement.classList.contains('e-popup-open')) {
            return;
        }
        this.popupObj.hide();
    }
    handleInlineToolbarItemClick(args) {
        const selectedItem = args.item.id;
        if (selectedItem === 'color' || selectedItem === 'bgColor') {
            // Do not proceed further for color and background color commands. It will be handled by the color picker.
            return;
        }
        if (selectedItem === 'link') {
            // Show link popup when link item is clicked in inline toolbar
            this.parent.linkModule.showLinkPopup(args.originalEvent);
            return;
        }
        this.parent.execCommand({ command: 'FormattingAction', state: { command: selectedItem } });
    }
    /**
     * Updates active state of toolbar buttons based on current selection formatting.
     *
     * @returns {void}
     * @hidden
     */
    toggleToolbarActiveState() {
        const range = getSelectedRange();
        if (!range) {
            return;
        }
        const toolbarItems = this.popupElement.querySelectorAll('.e-toolbar-item');
        toolbarItems.forEach((item) => item.classList.remove('e-active'));
        const blockElements = this.getBlocksInRange(range);
        // Enable/Disable only the 'link' item based on multi-block selection
        const distinctBlocks = blockElements.filter((b) => b.hasAttribute('data-block-type'));
        const enableLink = distinctBlocks.length <= 1;
        if (this.parent && this.parent.editorMethods) {
            this.parent.editorMethods.enableDisableToolbarItems('link', enableLink);
        }
        const detectedFormats = this.detectFormatsFromSelection(range);
        if (!detectedFormats || Object.keys(detectedFormats).length === 0) {
            return;
        }
        for (const item of Array.from(toolbarItems)) {
            const command = item.getAttribute('data-command');
            this.toggleActiveState(item, command, detectedFormats);
        }
    }
    /**
     * Detects active formats from selected text nodes in DOM.
     *
     * @param {Range} range - The selection range
     * @returns {Styles} - Common styles across selection
     * @hidden
     */
    detectFormatsFromSelection(range) {
        const nodesInSelection = [];
        const selectedBlockModels = this.parent.editorMethods.getSelectedBlocks();
        selectedBlockModels.forEach((block) => {
            const blockElement = this.parent.getBlockElementById(block.id);
            const blockRange = getBlockSpecificRange(range, blockElement);
            nodesInSelection.push(...getNodesInRange(blockRange));
        });
        if (nodesInSelection.length === 0) {
            return {};
        }
        const formatsByNode = nodesInSelection.map((textNode) => {
            return detectFormatsForTextNode(textNode);
        });
        return this.getCommonFormatsAcrossNodes(formatsByNode);
    }
    /**
     * Finds common formats across multiple text nodes.
     * A format is "active" if ALL selected text nodes have it.
     *
     * @param {Styles[]} formatsByNode - Format styles for each text node
     * @returns {Styles} - Only formats that all nodes share
     */
    getCommonFormatsAcrossNodes(formatsByNode) {
        if (!formatsByNode.length) {
            return {};
        }
        if (formatsByNode.length === 1) {
            return formatsByNode[0];
        }
        const commonFormats = {};
        const firstNodeFormats = formatsByNode[0];
        for (const format of Object.keys(firstNodeFormats)) {
            const firstValue = firstNodeFormats[format];
            const isCommon = formatsByNode.every((nodeFormats) => {
                const value = nodeFormats[format];
                return value === firstValue;
            });
            if (isCommon) {
                commonFormats[format] = firstValue;
            }
        }
        return commonFormats;
    }
    getBlocksInRange(range) {
        const blocks = [];
        const startBlock = getParentBlock(range.startContainer);
        const endBlock = getParentBlock(range.endContainer);
        if (!startBlock) {
            return blocks;
        }
        // Single block case
        if (startBlock === endBlock) {
            blocks.push(startBlock);
            return blocks;
        }
        // Multi-block case
        let current = startBlock;
        while (current && current !== endBlock) {
            blocks.push(current);
            current = current.nextElementSibling;
        }
        if (endBlock) {
            blocks.push(endBlock);
        }
        return blocks.filter((block) => block.hasAttribute('data-block-type'));
    }
    toggleActiveState(item, command, styles) {
        let isActive = false;
        switch (command) {
            case 'Bold':
                isActive = styles.bold === true;
                break;
            case 'Italic':
                isActive = styles.italic === true;
                break;
            case 'Underline':
                isActive = styles.underline === true;
                break;
            case 'Strikethrough':
                isActive = styles.strikethrough === true;
                break;
            case 'Superscript':
                isActive = styles.superscript === true;
                break;
            case 'Subscript':
                isActive = styles.subscript === true;
                break;
            case 'Uppercase':
                isActive = styles.uppercase === true;
                break;
            case 'Lowercase':
                isActive = styles.lowercase === true;
                break;
            case 'InlineCode':
                isActive = styles.inlineCode === true;
                break;
            case 'Color':
                this.setColors('color', styles.color);
                break;
            case 'BackgroundColor':
                this.setColors('bgColor', styles.backgroundColor);
                break;
        }
        item.classList.toggle('e-active', isActive);
    }
    setColors(type, value) {
        const colorBtn = this.toolbarEle.querySelector('#toolbar-color-dropdown');
        const bgColorBtn = this.toolbarEle.querySelector('#toolbar-bgcolor-dropdown');
        const currentColor = value ? value : '#000000';
        if (currentColor) {
            const button = type === 'color' ?
                colorBtn.querySelector('.e-inline-color-icon') :
                bgColorBtn.querySelector('.e-inline-bgColor-icon');
            if (button) {
                updateCSSText(button, `border-bottom-color: ${currentColor};`);
            }
        }
    }
    handleColorChange(args) {
        const command = args.type === 'bgColor' ? 'backgroundColor' : args.type;
        this.parent.formattingAction.execCommand({
            command: command,
            value: args.value
        });
        this.setColors(args.type, args.value);
    }
    handlePopupWidthChanges(data) {
        this.popupObj.width = this.parent.inlineToolbarSettings.popupWidth = data.value;
    }
    /**
     * Checks whether the slash command popup is opened or not.
     *
     * @returns {boolean} - Returns true if the slash command popup is opened, otherwise false.
     * @hidden
     */
    isPopupOpen() {
        const inlineTlbrPopupElement = document.querySelector('.e-popup.e-blockeditor-inline-toolbar-popup');
        return (inlineTlbrPopupElement.classList.contains('e-popup-open'));
    }
    /**
     * Destroys the inline toolbar module and cleans up resources
     *
     * @returns {void}
     */
    destroy() {
        this.removeEventListeners();
        if (this.popupObj) {
            this.popupObj.destroy();
            detach(this.popupElement);
            this.popupObj = null;
        }
    }
}

/**
 * Manages all event handlers for the BlockEditor component
 * This class centralizes event handling logic and provides a clean interface
 * for wiring and unwiring events across the editor
 */
class EventAction {
    /**
     * Creates a new EventAction instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    constructor(manager) {
        this.parent = manager;
        this.wireGlobalEvents();
    }
    /**
     * Wires up all global event handlers for the editor
     *
     * @returns {void}
     * @hidden
     */
    wireGlobalEvents() {
        // Document events
        this.parent.observer.on('selectionchange', this.handleEditorSelection, this);
        this.parent.observer.on('documentClick', this.handleDocumentClickActions, this);
        this.parent.observer.on('mousemove', this.handleMouseMoveActions, this);
        this.parent.observer.on('resize', this.handleWindowResize, this);
        // Editor events
        this.parent.observer.on('mouseup', this.handleMouseUpActions, this);
        this.parent.observer.on('mousedown', this.handleMouseDownActions, this);
        this.parent.observer.on('input', this.handleEditorInputActions, this);
        this.parent.observer.on('keydown', this.handleKeydownActions, this);
        this.parent.observer.on('clipboardAction', this.clipboardActionHandler, this);
        this.parent.observer.on('wireUnWireDragEvents', this.wireUnWireDragEvents, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    /**
     * Unwires all global event handlers for the editor
     *
     * @returns {void}
     * @hidden
     */
    unWireGlobalEvents() {
        // Document events
        this.parent.observer.off('selectionchange', this.handleEditorSelection);
        this.parent.observer.off('documentClick', this.handleDocumentClickActions);
        this.parent.observer.off('mousemove', this.handleMouseMoveActions);
        this.parent.observer.off('resize', this.handleWindowResize);
        // Editor events
        this.parent.observer.off('mouseup', this.handleMouseUpActions);
        this.parent.observer.off('mousedown', this.handleMouseDownActions);
        this.parent.observer.off('input', this.handleEditorInputActions);
        this.parent.observer.off('keydown', this.handleKeydownActions);
        this.parent.observer.off('clipboardAction', this.clipboardActionHandler);
        this.parent.observer.off('wireDragEvents', this.wireUnWireDragEvents);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    handleEditorSelection() {
        const range = this.parent.nodeSelection ? this.parent.nodeSelection.getRange() : null;
        if (!range) {
            return;
        }
        const isMoreThanSingleSelection = (range.startContainer !== range.endContainer || range.startOffset !== range.endOffset);
        if (isMoreThanSingleSelection && this.parent.rootEditorElement.contains(range.commonAncestorContainer)) {
            this.parent.isEntireEditorSelected = this.parent.nodeSelection.checkIsEntireEditorSelected();
        }
    }
    handleDocumentClickActions(clickEvent) {
        if (!this.parent.rootEditorElement.contains(clickEvent.target)
            && (this.parent.floatingIconAction.floatingIconContainer
                && !this.parent.floatingIconAction.floatingIconContainer.contains(clickEvent.target))) {
            this.parent.floatingIconAction.hideFloatingIcons();
        }
        this.parent.selectionOverlay.clearSelectionOverlay();
        this.parent.isEntireEditorSelected = false;
        this.togglePopupsOnDocumentClick(clickEvent);
    }
    handleMouseMoveActions(moveEvent) {
        if (this.parent.contextMenuModule.isPopupOpen() || this.parent.blockActionMenuModule.isPopupOpen()) {
            return;
        }
        const blockElement = moveEvent.target.closest('.' + BLOCK_CLS);
        if (blockElement) {
            if (blockElement !== this.parent.currentHoveredBlock) {
                if (this.parent.currentHoveredBlock) {
                    this.parent.floatingIconAction.hideFloatingIcons();
                }
                this.parent.currentHoveredBlock = blockElement;
                this.parent.floatingIconAction.showFloatingIcons(this.parent.currentHoveredBlock);
            }
        }
        else if (this.parent.currentHoveredBlock) {
            if (this.parent.floatingIconAction.floatingIconContainer
                && !this.parent.floatingIconAction.floatingIconContainer.contains(moveEvent.target)) {
                this.parent.floatingIconAction.hideFloatingIcons();
                this.parent.currentHoveredBlock = null;
            }
        }
    }
    handleMouseUpActions(mouseEvent) {
        if (this.parent.readOnly || (mouseEvent.target.tagName === 'TD')) {
            return;
        }
        this.parent.selectionOverlay.clearSelectionOverlay();
        const range = getSelectedRange();
        const startContainerParent = range ? getParentElement(range.startContainer) : null;
        const target = (startContainerParent || mouseEvent.target);
        const blockElement = target.closest('.' + BLOCK_CLS);
        if (blockElement && (this.parent.currentFocusedBlock !== blockElement)) {
            this.parent.togglePlaceholder(this.parent.currentFocusedBlock, false);
            this.parent.setFocusToBlock(blockElement);
            this.parent.togglePlaceholder(this.parent.currentFocusedBlock, true);
            this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
            if (blockElement.innerText.length === 0) {
                setCursorPosition(getBlockContentElement(blockElement), 0);
            }
        }
        setTimeout(() => {
            const isPopupInteracted = this.parent.inlineToolbarModule
                && this.parent.inlineToolbarModule.popupObj.element.contains(mouseEvent.target);
            if (!isPopupInteracted) {
                this.handleTextSelection(mouseEvent);
            }
        });
    }
    handleMouseDownActions(mouseEvent) {
        this.parent.isEntireEditorSelected = false;
        this.parent.selectionOverlay.clearSelectionOverlay();
        if (this.parent.readOnly) {
            return;
        }
        const blockElement = mouseEvent.target.closest('.' + BLOCK_CLS);
        if (blockElement && (this.parent.currentFocusedBlock !== blockElement)) {
            if (blockElement.innerText.length === 0) {
                setCursorPosition(getBlockContentElement(blockElement), 0);
            }
        }
    }
    handleEditorInputActions(inputEvent) {
        if (inputEvent.target && (inputEvent.target.closest('.e-uploader') || inputEvent.target.closest('.e-embed-url-input'))) {
            return;
        }
        this.parent.selectionOverlay.clearSelectionOverlay();
        const focusedBlk = this.parent.currentFocusedBlock;
        const tableBlock = focusedBlk ? findClosestParent(focusedBlk, '.e-table-block') : null;
        if (tableBlock) {
            const range = getSelectedRange();
            const tableEle = tableBlock.querySelector('table');
            const uiManager = this.parent.blockRenderer.tableRenderer.getManager(tableBlock.id);
            const cell = (findClosestParent(range.startContainer, 'td') || findClosestParent(range.startContainer, 'th'));
            uiManager.removeRowColSelection(tableEle);
            uiManager.hideRowGripper();
            uiManager.hideAllPinnedColBars();
            this.parent.tableService.removeCellFocus(tableEle);
            if (cell) {
                this.parent.tableService.addCellFocus(cell);
            }
        }
        this.processEntireEditorSelection();
        this.updateUIAfterInput(inputEvent);
        this.filterSlashCommandOnUserInput();
        if (this.processFormattingActions(inputEvent)) {
            return;
        }
        this.throttleContentUpdate(inputEvent);
    }
    processEntireEditorSelection() {
        if (this.parent.isEntireEditorSelected) {
            const editorBlocks = this.parent.getEditorBlocks();
            const allBlocks = editorBlocks.map((block) => decoupleReference(block));
            this.parent.setFocusToBlock(this.parent.blockContainer.firstElementChild);
            this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
            editorBlocks.splice(1);
            this.parent.stateManager.updateManagerBlocks();
            this.parent.isEntireEditorSelected = false;
            this.parent.undoRedoAction.pushActionIntoUndoStack({
                action: actionType.multipleBlocksDeleted,
                oldBlockModel: editorBlocks[0],
                data: {
                    deletedBlocks: allBlocks,
                    deletionType: DeletionType.Entire
                }
            });
        }
    }
    updateUIAfterInput(inputEvent) {
        if (this.parent.inlineToolbarModule) {
            this.parent.inlineToolbarModule.hideInlineToolbar(inputEvent);
        }
        this.parent.togglePlaceholder(this.parent.currentFocusedBlock, true);
        this.parent.floatingIconAction.hideDragIconForEmptyBlock(this.parent.currentFocusedBlock);
        const blockContent = getBlockContentElement(this.parent.currentFocusedBlock);
        if (blockContent && blockContent.textContent.length <= 1) {
            this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
        }
    }
    processFormattingActions(inputEvent) {
        const isInsertText = inputEvent.inputType === 'insertText';
        if ((isInsertText && this.parent.formattingAction.activeInlineFormats
            && this.parent.formattingAction.activeInlineFormats.size > 0)
            || this.parent.formattingAction.lastRemovedFormat) {
            return this.parent.formattingAction.handleTypingWithActiveFormats();
        }
        return false;
    }
    throttleContentUpdate(inputEvent) {
        clearTimeout(this.parent.updateTimer);
        this.parent.updateTimer = setTimeout(() => {
            const target = this.parent.currentFocusedBlock;
            this.parent.stateManager.updateContentOnUserTyping(target, inputEvent);
        }, 100);
    }
    handleTextSelection(event) {
        const range = this.parent.nodeSelection.getRange();
        // this.parent.nodeSelection.updateSelectionRangeOnUserModel();
        if (!range || range.toString().trim().length === 0) {
            this.parent.inlineToolbarModule.hideInlineToolbar(event);
            return;
        }
        const previousRange = this.parent.nodeSelection.getStoredRange();
        const selectionArgs = {
            event: event,
            // user: this.parent.users.find((user: UserModel) => user.id === this.parent.currentUserId),
            range: [range.startOffset, range.endOffset],
            previousRange: previousRange ? [previousRange.startOffset, previousRange.endOffset] : null
        };
        this.parent.observer.notify('selectionChanged', selectionArgs);
        this.parent.nodeSelection.storeCurrentRange();
        const rect = range.getBoundingClientRect();
        if (range && rect) {
            const parentBlock = getParentBlock(range.startContainer);
            if (parentBlock && parentBlock.classList.contains('e-block')) {
                this.parent.inlineToolbarModule.showInlineToolbar(range, event);
            }
            else {
                this.parent.inlineToolbarModule.hideInlineToolbar(event);
            }
        }
    }
    filterSlashCommandOnUserInput() {
        const blockElement = this.parent.currentFocusedBlock;
        if (this.parent.slashCommandModule.isPopupOpen() &&
            blockElement &&
            blockElement.innerText &&
            this.parent.isPopupOpenedOnAddIconClick) {
            const rect = getElementRect(blockElement);
            const targetEle = getBlockContentElement(blockElement) || blockElement;
            const xOffset = rect.left;
            const yOffset = rect.top + targetEle.offsetHeight;
            this.parent.slashCommandModule.filterCommands(blockElement.innerText, xOffset, yOffset);
        }
    }
    handleKeydownActions(keyEvent) {
        this.parent.previousSelection = captureSelectionState();
        if (!this.parent.currentFocusedBlock || !this.validateKeyEventProcessability(keyEvent) || ((keyEvent.target && keyEvent.target.closest('.e-embed-url-input')))) {
            return;
        }
        this.handleInlineTbarStates(keyEvent);
        if (this.isAnyPopupOpen()) {
            return;
        }
        /* Case where user selects multi blocks and then input a character */
        const range = getSelectedRange();
        const selectedBlocks = this.parent.editorMethods.getSelectedBlocks();
        const isCharacterKey = keyEvent.key.length === 1 && !keyEvent.ctrlKey && !keyEvent.metaKey && !keyEvent.altKey;
        if (selectedBlocks && selectedBlocks.length > 1 && range && !range.collapsed && isCharacterKey) {
            this.parent.isEntireEditorSelected = this.parent.nodeSelection.checkIsEntireEditorSelected();
            if (this.parent.isEntireEditorSelected) {
                this.parent.blockCommand.handleEntireBlockDeletion();
            }
            else {
                this.parent.blockCommand.handleMultipleBlockDeletion(selectedBlocks, 'previous');
            }
            return;
        }
        this.processKeyboardShortcuts(keyEvent);
    }
    validateKeyEventProcessability(keyEvent) {
        const blockModel = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        const isUpDownArrows = ['ArrowUp', 'ArrowDown'].indexOf(keyEvent.key) !== -1;
        const isControlUpDownShift = keyEvent.ctrlKey && isUpDownArrows && keyEvent.shiftKey;
        return blockModel && !isControlUpDownShift;
    }
    handleInlineTbarStates(keyEvent) {
        const isArrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(keyEvent.key) !== -1;
        const isLeftRightArrows = ['ArrowLeft', 'ArrowRight'].indexOf(keyEvent.key) !== -1;
        const isControlKey = keyEvent.ctrlKey || keyEvent.metaKey;
        const isShiftKey = keyEvent.shiftKey;
        if (keyEvent.key === 'Escape' || (!isControlKey && isArrowKeys && !isShiftKey)) {
            this.parent.inlineToolbarModule.hideInlineToolbar(keyEvent);
        }
        else if ((isControlKey && isLeftRightArrows && isShiftKey)) {
            this.showInlineToolbarWithDelay(keyEvent);
        }
    }
    showInlineToolbarWithDelay(keyEvent) {
        const inlineTbarPopup = document.querySelector('#' + this.parent.rootEditorElement.id + INLINE_TBAR_POPUP_ID);
        if (!(inlineTbarPopup && inlineTbarPopup.classList.contains('e-popup-open'))) {
            setTimeout(() => {
                const range = getSelectedRange();
                if (range) {
                    this.parent.inlineToolbarModule.showInlineToolbar(range, keyEvent);
                }
            });
        }
    }
    processKeyboardShortcuts(keyEvent) {
        const blockElement = this.parent.currentFocusedBlock;
        const blockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        if (this.processListBlockEvents(keyEvent, blockElement, blockModel)) {
            return;
        }
        this.handleBlockKeyActions(keyEvent);
    }
    isAnyPopupOpen() {
        const mentionPopupId = `${this.parent.blockContainer.id}_popup`;
        const commandPopupElement = document.querySelector(`#${mentionPopupId}.e-blockeditor-command-menu`);
        const userMentionPopupElement = document.querySelector(`#${mentionPopupId}.e-blockeditor-user-menu`);
        const labelMentionPopupElement = document.querySelector(`#${mentionPopupId}.e-blockeditor-label-menu`);
        const blockModel = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        const actionPopupElement = this.parent.rootEditorElement.querySelector(`#${this.parent.rootEditorElement.id + BLOCKACTION_POPUP_ID}`);
        const linkDialogElement = this.parent.rootEditorElement.querySelector(`#${this.parent.rootEditorElement.id + LINKDIALOG_ID}`);
        const codeLanguagePopup = document.querySelector(`#${this.parent.rootEditorElement.id}_code-ddl_popup`);
        const notAllowedTypes = [BlockType.Code];
        return this.parent.slashCommandModule.isPopupOpen() || (commandPopupElement && commandPopupElement.classList.contains('e-popup-open')) ||
            (userMentionPopupElement && userMentionPopupElement.classList.contains('e-popup-open')) ||
            (labelMentionPopupElement && labelMentionPopupElement.classList.contains('e-popup-open')) ||
            (blockModel && notAllowedTypes.indexOf(blockModel.blockType) !== -1) ||
            (actionPopupElement && actionPopupElement.classList.contains('e-popup-open')) ||
            (linkDialogElement && linkDialogElement.classList.contains('e-popup-open') ||
                (codeLanguagePopup && codeLanguagePopup.classList.contains('e-popup-open')));
    }
    processListBlockEvents(keyEvent, blockElement, blockModel) {
        this.parent.listPlugin.handleListTriggerKey(keyEvent, blockElement, blockModel);
        const range = getSelectedRange();
        const selectedBlocks = range && range.toString().length > 0 ? this.parent.editorMethods.getSelectedBlocks() : [];
        const isSelectiveDeletions = this.parent.isEntireEditorSelected || (selectedBlocks && selectedBlocks.length > 1);
        if (blockModel && isListTypeBlock(blockModel.blockType) && !isSelectiveDeletions) {
            return this.parent.listPlugin.handleListKeyActions(keyEvent, blockElement);
        }
        return false;
    }
    handleBlockKeyActions(event) {
        const blockElement = this.parent.currentFocusedBlock;
        const contentElement = getBlockContentElement(blockElement);
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                this.handleArrowKeyActions(event, getSelectedRange(), blockElement);
                this.parent.isEntireEditorSelected = false;
                break;
            case 'Enter':
                this.processEnterKey(event, blockElement);
                break;
            case 'Backspace':
            case 'Delete':
                this.processBlockDeletions(event, blockElement, blockElement.getAttribute('data-block-type'), contentElement);
                break;
            case 'Tab':
                if (blockElement.closest(`.${TABLE_BLOCK_CLS}`)) {
                    return;
                }
                this.processTabKey(event);
                break;
            case 'Home':
            case 'End': {
                if (!event.shiftKey) {
                    this.handleHomeEndKeyActions(event, blockElement);
                }
                break;
            }
        }
    }
    processEnterKey(event, blockElement) {
        this.parent.inlineToolbarModule.hideInlineToolbar();
        event.preventDefault();
        if (event.shiftKey) {
            this.handleLineBreaksOnBlock(blockElement);
        }
        else {
            this.handleNormalEnterKey();
        }
    }
    handleNormalEnterKey() {
        if (!getSelectedRange()) {
            return;
        }
        if (this.processSpecialContainerBlocks()) {
            return;
        }
        if (this.processIndentIfBlockEmpty()) {
            return;
        }
        this.parent.execCommand({ command: 'SplitBlock' });
        this.parent.isEntireEditorSelected = false;
    }
    processSpecialContainerBlocks() {
        const calloutBlock = this.parent.currentFocusedBlock.closest('.' + CALLOUT_BLOCK_CLS);
        const toggleBlock = this.parent.currentFocusedBlock.closest('.' + TOGGLE_BLOCK_CLS);
        const quoteBlock = this.parent.currentFocusedBlock.closest('.' + QUOTE_BLOCK_CLS);
        if (calloutBlock) {
            return this.handleChildrenBlockExit('.' + CALLOUT_BLOCK_CLS, '.' + CALLOUT_CONTENT_CLS);
        }
        else if (toggleBlock) {
            return this.processToggleBlock(toggleBlock);
        }
        else if (quoteBlock) {
            return this.handleChildrenBlockExit('.' + QUOTE_BLOCK_CLS, '.' + QUOTE_CONTENT_CLS);
        }
        return false;
    }
    processToggleBlock(toggleBlock) {
        const blockModel = getBlockModelById(toggleBlock.id, this.parent.getEditorBlocks());
        const toggleHeader = findClosestParent(getSelectedRange().startContainer, '.e-toggle-header');
        const toggleContent = toggleBlock.querySelector('.' + TOGGLE_CONTENT_CLS);
        if (toggleContent && toggleHeader && toggleContent.textContent === '') {
            this.parent.blockRenderer.collapsibleRenderer.updateCollapsibleBlockExpansion(this.parent.currentFocusedBlock, !blockModel.properties.isExpanded);
            setCursorPosition(toggleContent.querySelector('.' + CONTENT_CLS), 0);
            this.parent.setFocusToBlock(this.parent.currentFocusedBlock.querySelector('.' + BLOCK_CLS));
            return true;
        }
        return this.handleChildrenBlockExit('.' + TOGGLE_BLOCK_CLS, '.' + TOGGLE_CONTENT_CLS);
    }
    processIndentIfBlockEmpty() {
        const blockModel = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        if (this.parent.currentFocusedBlock.textContent.trim() === '' && blockModel.indent > 0) {
            this.parent.execCommand({
                command: 'IndentBlock',
                state: {
                    blockIDs: [blockModel.id],
                    shouldDecrease: true
                }
            });
            this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
            return true;
        }
        return false;
    }
    processBlockDeletions(event, blockElement, blockType, contentElement) {
        const mergeDirection = (event.key === 'Backspace') ? 'previous' : 'next';
        this.parent.inlineToolbarModule.hideInlineToolbar();
        // Handle multi-block / entire selection first
        const isDeletionPerformed = this.parent.blockCommand.handleSelectiveDeletions(event);
        if (isDeletionPerformed) {
            return;
        }
        // Direct deletion of selected Non-mergeable block
        if (isNonMergableBlock(blockElement)) {
            this.parent.execCommand({
                command: 'DeleteNonMergableBlock',
                state: { blockElement: blockElement }
            });
            event.preventDefault();
            return;
        }
        // Two-step delete for adjacent special blocks at boundary
        if (getSelectedRange() && isCursorAtEdge(contentElement, event.key === 'Backspace')) {
            const adjacentBlock = getTargetBlock(blockElement, mergeDirection);
            if (adjacentBlock) {
                const adjacentModel = getBlockModelById(adjacentBlock.id, this.parent.getEditorBlocks());
                const isSpecial = !!adjacentModel && [
                    BlockType.Code,
                    BlockType.Callout,
                    BlockType.Table,
                    BlockType.Image,
                    BlockType.Quote,
                    BlockType.CollapsibleHeading,
                    BlockType.CollapsibleParagraph,
                    BlockType.Divider
                ].indexOf(adjacentModel.blockType) !== -1;
                if (isSpecial) {
                    // First press: stage overlay
                    event.preventDefault();
                    this.parent.selectionOverlay.selectionOverlayInfo = { element: adjacentBlock, direction: mergeDirection };
                    this.parent.lastHighlightedBlockId = adjacentBlock.id;
                    if (this.parent.selectionOverlay) {
                        this.parent.selectionOverlay.show(adjacentBlock.id);
                    }
                    if (this.parent.nodeSelection) {
                        this.parent.nodeSelection.clearSelection();
                    }
                    return;
                }
            }
            // Fallback to normal deletion-at-cursor for block merging
            event.preventDefault();
            this.parent.execCommand({
                command: 'DeleteAtCursor',
                state: {
                    blockElement: blockElement,
                    mergeDirection: mergeDirection
                }
            });
            this.parent.isEntireEditorSelected = false;
            return;
        }
        // Second press: delete
        if (this.parent.selectionOverlay.selectionOverlayInfo && this.parent.selectionOverlay.selectionOverlayInfo.element) {
            event.preventDefault();
            const blockEle = this.parent.selectionOverlay.selectionOverlayInfo.element;
            this.parent.selectionOverlay.clearSelectionOverlay();
            this.parent.execCommand({
                command: 'DeleteNonMergableBlock',
                state: { blockElement: blockEle }
            });
            return;
        }
    }
    processTabKey(event) {
        this.parent.execCommand({
            command: 'IndentBlock',
            state: {
                blockIDs: this.parent.editorMethods.getSelectedBlocks().map((block) => block.id),
                shouldDecrease: event.shiftKey
            }
        });
        this.parent.isEntireEditorSelected = false;
        event.preventDefault();
    }
    handleHomeEndKeyActions(event, blockElement) {
        const contentElement = getBlockContentElement(blockElement);
        setCursorPosition(contentElement, (event.key === 'Home') ? 0 : contentElement.textContent.length);
    }
    handleLineBreaksOnBlock(blockElement) {
        const blockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        const oldBlock = decoupleReference(blockModel);
        const contentElement = getBlockContentElement(blockElement);
        const range = this.parent.nodeSelection.getRange();
        if (!range) {
            return;
        }
        const absoluteOffset = getAbsoluteOffset(contentElement, range.startContainer, range.startOffset);
        const contentModel = getContentModelByNode(range.startContainer, this.parent.getEditorBlocks());
        this.parent.blockService.applyLineBreak(range.startOffset, contentModel);
        this.parent.stateManager.updateManagerBlocks();
        this.parent.observer.notify('modelChanged', { type: 'ReRenderBlockContent', state: {
                data: [{ block: blockModel, oldBlock: oldBlock }]
            } });
        setCursorPosition(contentElement, absoluteOffset + 1);
        this.parent.undoRedoAction.trackLineBreakActionForUndoRedo({
            blockId: blockModel.id,
            oldContent: oldBlock.content,
            newContent: decoupleReference(blockModel.content)
        });
    }
    handleChildrenBlockExit(parentSelector, contentSelector, deleteDirection = 'previous') {
        const parentBlock = this.parent.currentFocusedBlock.closest(parentSelector);
        const contentElement = parentBlock ? parentBlock.querySelector(contentSelector) : null;
        if (parentBlock && contentElement &&
            (this.parent.currentFocusedBlock.textContent.trim() === '') && contentElement.childElementCount > 1 &&
            (contentElement.lastElementChild === this.parent.currentFocusedBlock)) {
            this.parent.execCommand({ command: 'DeleteBlock', state: {
                    blockElement: this.parent.currentFocusedBlock,
                    mergeDirection: deleteDirection
                } });
            this.parent.currentFocusedBlock = parentBlock;
            this.parent.execCommand({ command: 'AddBlock', state: {
                    blockType: BlockType.Paragraph,
                    targetBlock: this.parent.currentFocusedBlock
                } });
            return true;
        }
        return false;
    }
    handleArrowKeyActions(event, range, blockElement) {
        this.parent.selectionOverlay.clearSelectionOverlay();
        const blockContentLength = blockElement.textContent.length;
        const key = event.key;
        const isUp = key === 'ArrowUp';
        const isDown = key === 'ArrowDown';
        const isLeft = key === 'ArrowLeft';
        const isRight = key === 'ArrowRight';
        const isAtStart = range && (range.startOffset === 0 && range.endOffset === 0);
        const isAtEnd = range && (range.startOffset === blockContentLength && range.endOffset === blockContentLength);
        const adjacentBlock = getAdjacentBlock(blockElement, (isUp || isLeft) ? 'previous' : 'next');
        if (!adjacentBlock) {
            return;
        }
        if (adjacentBlock && adjacentBlock.classList.contains(TABLE_BLOCK_CLS)) {
            const tableEl = adjacentBlock.querySelector('table');
            let targetCell = null;
            if ((isUp || isDown) && tableEl) {
                if (isUp) {
                    // focus first data-cell of the last row
                    const lastDomRow = tableEl.rows.length - 1;
                    targetCell = tableEl.rows[lastDomRow].cells[1];
                }
                else {
                    // ArrowDown → first header TH if present, else first body cell
                    targetCell = tableEl.tHead ? tableEl.tHead.rows[0].cells[1] : tableEl.rows[0].cells[1];
                }
            }
            if (targetCell) {
                this.parent.tableService.addCellFocus(targetCell, true);
                event.preventDefault();
                return;
            }
        }
        const isAdjacentEmpty = adjacentBlock.textContent.length === 0;
        //Only prevent default behaviour when cursor at the ends, otherwise let the browser's default behaviour take over
        const isMovingAdjacentBlock = (isAtStart && (isLeft)) || (isAtEnd && (isRight)) || ((isUp || isDown) && isAdjacentEmpty);
        if (isMovingAdjacentBlock) {
            event.preventDefault();
            this.moveCursorToAdjacentBlock(adjacentBlock, key);
        }
        else {
            setTimeout(() => {
                if (!isMovingAdjacentBlock) {
                    const range = getSelectedRange();
                    const currentBlock = (range && range.startContainer.parentElement.closest('.' + BLOCK_CLS));
                    if (currentBlock !== this.parent.currentFocusedBlock) {
                        this.parent.togglePlaceholder(this.parent.currentFocusedBlock, false);
                        this.parent.setFocusToBlock(currentBlock);
                        this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
                    }
                }
            });
        }
    }
    moveCursorToAdjacentBlock(adjacentBlock, key) {
        this.parent.togglePlaceholder(this.parent.currentFocusedBlock, false);
        this.parent.setFocusToBlock(adjacentBlock);
        setCursorPosition(getBlockContentElement(adjacentBlock), (key === 'ArrowLeft') ? adjacentBlock.textContent.length : 0);
        this.parent.togglePlaceholder(this.parent.currentFocusedBlock, true);
        this.parent.floatingIconAction.showFloatingIcons(this.parent.currentFocusedBlock);
    }
    togglePopupsOnDocumentClick(event) {
        const inlineTbarPopup = document.querySelector('#' + this.parent.rootEditorElement.id + INLINE_TBAR_POPUP_ID);
        const blockActionPopup = document.querySelector('#' + this.parent.rootEditorElement.id + BLOCKACTION_POPUP_ID);
        const isInlineTbarOpen = inlineTbarPopup && inlineTbarPopup.classList.contains('e-popup-open');
        const isBlockActionOpen = blockActionPopup && blockActionPopup.classList.contains('e-popup-open');
        const isColorPaletteClick = event.target.closest('.e-colorpicker-wrapper') !== null ||
            event.target.closest('.e-color-palette') !== null;
        if (!this.parent.inlineToolbarModule.popupObj.element.contains(event.target) && isInlineTbarOpen && !isColorPaletteClick) {
            this.parent.inlineToolbarModule.hideInlineToolbar(event);
        }
        if (!this.parent.blockActionMenuModule.popupObj.element.contains(event.target) && isBlockActionOpen) {
            this.parent.blockActionMenuModule.toggleBlockActionPopup(true, event);
        }
    }
    clipboardActionHandler(e) {
        if (this.parent.linkModule.isPopupOpen() || (e.target && e.target.closest('.e-embed-url-input'))) {
            return;
        }
        switch (e.type.toLowerCase()) {
            case 'cut':
                this.parent.observer.notify(events.cut, e);
                break;
            case 'copy':
                this.parent.observer.notify(events.copy, e);
                break;
            case 'paste':
                this.parent.observer.notify(events.paste, e);
                break;
        }
        this.parent.stateManager.updateManagerBlocks();
    }
    handleWindowResize() {
        if (this.parent.inlineToolbarModule && this.parent.inlineToolbarModule.isPopupOpen()) {
            const range = this.parent.nodeSelection.getRange();
            this.parent.popupRenderer.adjustPopupPositionRelativeToTarget(range, this.parent.inlineToolbarModule.popupObj);
        }
        // Reposition overlay on resize
        if (this.parent.selectionOverlay) {
            this.parent.selectionOverlay.reposition();
        }
    }
    wireUnWireDragEvents(options) {
        if (options.enable) {
            this.parent.dragAndDropAction.wireDragEvents();
        }
        else {
            this.parent.dragAndDropAction.unwireDragEvents();
        }
    }
    // Reposition handled by SelectionOverlay
    destroy() {
        this.parent.selectionOverlay.clearSelectionOverlay();
        this.unWireGlobalEvents();
    }
}

class ParagraphRenderer {
    constructor(manager) {
        this.parent = manager;
    }
    /**
     * Renders paragraph block
     *
     * @param {BlockModel} block - specifies the block.
     * @returns {HTMLElement} - the created or updated element
     * @hidden
     */
    renderParagraph(block) {
        const paragraphProps = block.properties;
        paragraphProps.placeholder = this.parent.getPlaceholderValue(block);
        const paragraph = createElement('p', {
            attrs: {
                contenteditable: 'true',
                placeholder: paragraphProps.placeholder
            }
        });
        this.parent.blockRenderer.contentRenderer.renderContent(block, paragraph);
        return paragraph;
    }
}

class HeadingRenderer {
    constructor(manager) {
        this.parent = manager;
    }
    /**
     * Renders heading block
     *
     * @param {BlockModel} block - specifies the block.
     * @returns {HTMLElement} - the created or updated element
     * @hidden
     */
    renderHeading(block) {
        const headingProps = block.properties;
        headingProps.placeholder = this.parent.getPlaceholderValue(block);
        const heading = createElement(`h${headingProps.level}`, {
            attrs: {
                contenteditable: 'true',
                placeholder: headingProps.placeholder
            }
        });
        this.parent.blockRenderer.contentRenderer.renderContent(block, heading);
        return heading;
    }
}

class ListRenderer {
    constructor(manager) {
        this.parent = manager;
    }
    /**
     * Renders a list item block
     *
     * This method creates and transforms list item elements based on the block type.
     * It handles both numbered and checklist types.
     *
     * @param {BlockModel} block - Specifies the block model containing data to render.
     * @param {HTMLElement} blockElement - The parent element that contains all block elements.
     * @returns {HTMLElement} - Returns the created or updated list container element.
     * @hidden
     */
    renderListItem(block, blockElement) {
        const isNumberedList = block.blockType === BlockType.NumberedList;
        const isChecklist = block.blockType === BlockType.Checklist;
        const listType = isNumberedList ? 'ol' : 'ul';
        const listContainer = createElement(listType, {});
        const listProps = block.properties;
        listProps.placeholder = this.parent.getPlaceholderValue(block);
        const listItem = createElement('li', {
            attrs: {
                contenteditable: 'true',
                placeholder: listProps.placeholder
            }
        });
        this.parent.blockRenderer.contentRenderer.renderContent(block, listItem);
        if (isChecklist) {
            this.renderChecklist(block, blockElement);
        }
        listContainer.appendChild(listItem);
        return listContainer;
    }
    /**
     * Renders a checklist item
     *
     * @param {BlockModel} block - Specifies the block model containing data to render.
     * @param {HTMLElement} blockElement - The parent element that contains all block elements.
     * @returns {void}
     * @hidden
     */
    renderChecklist(block, blockElement) {
        const checkmarkContainer = createElement('div', {
            className: 'e-checkmark-container',
            attrs: { contenteditable: 'false', tabindex: '-1' }
        });
        const checkboxSvg = this.renderUncheckedCheckmark();
        checkmarkContainer.appendChild(checkboxSvg);
        blockElement.prepend(checkmarkContainer);
        checkmarkContainer.addEventListener('click', (e) => this.checkmarkClickListener(e, block));
    }
    checkmarkClickListener(event, block) {
        event.preventDefault();
        event.stopPropagation();
        if (this.parent.readOnly) {
            return;
        }
        const props = block.properties;
        this.toggleCheckedState(block, !props.isChecked);
    }
    /**
     * Toggles the checked state of a checklist item.
     *
     * @param {BlockModel} block - The block model of the checklist item.
     * @param {boolean} isChecked - The new checked state.
     * @param {boolean} isUndoRedoAction - specifies whether to track undo or redo action.
     * @returns {void}
     * @hidden
     */
    toggleCheckedState(block, isChecked, isUndoRedoAction) {
        const props = block.properties;
        const oldBlockClone = decoupleReference(block);
        const blockElement = this.parent.getBlockElementById(block.id);
        const listItem = blockElement.querySelector('li');
        if (listItem && listItem.textContent.trim() === '') {
            isChecked = false;
        }
        listItem.classList.toggle('e-checked', isChecked);
        const existingSvg = blockElement.querySelector('svg');
        if (existingSvg) {
            while (existingSvg.firstChild) {
                existingSvg.removeChild(existingSvg.firstChild);
            }
            const svgElements = isChecked ? this.getCheckedSvgElements() : this.getUncheckedSvgElements();
            svgElements.forEach((element) => existingSvg.appendChild(element));
        }
        props.isChecked = isChecked;
        this.parent.stateManager.updateManagerBlocks();
        if (!isUndoRedoAction) {
            this.parent.undoRedoAction.trackCheckedStateForUndoRedo(block.id, props.isChecked);
            this.parent.eventService.addChange({
                action: 'Update',
                data: {
                    block: decoupleReference(block),
                    prevBlock: oldBlockClone
                }
            });
            this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
        }
    }
    getUncheckedSvgElements() {
        return [
            createSvgElement('path', {
                d: 'M6 2.5H18C19.933 2.5 21.5 4.067 21.5 6V18C21.5 19.933 19.933 21.5 18 21.5H6C4.067 21.5 2.5 19.933 2.5 18V6C2.5 4.067 4.067 2.5 6 2.5Z',
                class: 'e-checkmark-border'
            })
        ];
    }
    getCheckedSvgElements() {
        return [
            // Background rectangle that will use theme colors
            createSvgElement('rect', {
                x: '0.5',
                y: '2.5',
                width: '19',
                height: '19',
                rx: '3.5',
                class: 'e-checkmark-bg'
            }),
            // Border rectangle
            createSvgElement('rect', {
                x: '0.5',
                y: '2.5',
                width: '19',
                height: '19',
                rx: '3.5',
                class: 'e-checkmark-border'
            }),
            // Checkmark path (always white)
            createSvgElement('path', {
                d: 'M14.2656 7.73438H14.3906L14.5156 7.76562L14.6406 7.78125L14.7656 7.82812L14.875 7.89062L14.9844 7.95312L15.0938 8.03125L15.1875 8.125L15.2812 8.21875L15.3594 8.32812L15.4219 8.4375L15.4844 8.54688L15.5312 8.67188L15.5469 8.79688L15.5781 8.92188V9.04688V9.17188L15.5469 9.29688L15.5312 9.42188L15.4844 9.54688L15.4219 9.65625L15.3594 9.76562L15.2812 9.875L15.1875 9.96875L9.28125 15.875L9.1875 15.9688L9.07812 16.0469L8.96875 16.1094L8.85938 16.1719L8.73438 16.2188L8.60938 16.2344L8.48438 16.2656H8.35938H8.23438L8.10938 16.2344L7.98438 16.2188L7.85938 16.1719L7.75 16.1094L7.64062 16.0469L7.53125 15.9688L7.4375 15.875L4.8125 13.25L4.71875 13.1562L4.64062 13.0469L4.57812 12.9375L4.51562 12.8281L4.46875 12.7031L4.45312 12.5781L4.42188 12.4531V12.3281V12.2031L4.45312 12.0781L4.46875 11.9531L4.51562 11.8281L4.57812 11.7188L4.64062 11.6094L4.71875 11.5L4.8125 11.4062L4.90625 11.3125L5.01562 11.2344L5.125 11.1719L5.23438 11.1094L5.35938 11.0625L5.48438 11.0469L5.60938 11.0156H5.73438H5.85938L5.98438 11.0469L6.10938 11.0625L6.23438 11.1094L6.34375 11.1719L6.45312 11.2344L6.5625 11.3125L6.65625 11.4062L8.35938 13.0938L13.3438 8.125L13.4375 8.03125L13.5469 7.95312L13.6562 7.89062L13.7656 7.82812L13.8906 7.78125L14.0156 7.76562L14.1406 7.73438H14.2656Z',
                class: 'e-checkmark-color'
            })
        ];
    }
    renderUncheckedCheckmark() {
        const svg = createBaseSvg();
        this.getUncheckedSvgElements().forEach((element) => {
            svg.appendChild(element);
        });
        return svg;
    }
}

class QuoteRenderer {
    constructor(manager) {
        this.parent = manager;
    }
    /**
     * Renders a quote block with container structure for children
     *
     * @param {BlockModel} block - The block model containing data.
     * @param {HTMLElement} blockElement - The block container element.
     * @returns {HTMLElement} - The rendered quote block element.
     */
    renderQuote(block, blockElement) {
        const quoteProps = block.properties;
        // Mark outer block
        addClass([blockElement], QUOTE_BLOCK_CLS);
        // Wrapper (can be contenteditable=false if you want to restrict editing to children only)
        const wrapper = createElement('div', {
            className: 'e-quote-wrapper',
            attrs: { contenteditable: 'true' } // or 'false' depending on UX preference
        });
        // The visible quote area
        const content = createElement('blockquote', {
            className: QUOTE_CONTENT_CLS,
            attrs: { contenteditable: 'true' }
        });
        // Render child blocks (this is the key difference)
        quoteProps.children.forEach((childBlock) => {
            const childEl = this.parent.blockRenderer.createBlockElement(childBlock);
            content.appendChild(childEl);
        });
        wrapper.appendChild(content);
        return wrapper;
    }
}

class CalloutRenderer {
    constructor(manager) {
        this.parent = manager;
    }
    /**
     * Renders a initial level callout block
     *
     * @param {BlockModel} block - The block model containing data.
     * @param {HTMLElement} blockElement - The block container element.
     * @returns {HTMLElement} - The rendered callout block element.
     * @hidden
     */
    renderCallout(block, blockElement) {
        blockElement.classList.add(CALLOUT_BLOCK_CLS);
        const calloutWrapper = createElement('div', {
            className: 'e-callout-wrapper',
            attrs: { contenteditable: 'true' }
        });
        const iconContainer = createElement('div', {
            className: 'e-callout-icon',
            attrs: { contenteditable: 'false' }
        });
        iconContainer.appendChild(this.renderCalloutIcon());
        const contentContainer = createElement('div', {
            className: 'e-callout-content',
            attrs: { contenteditable: 'true' }
        });
        const props = block.properties;
        props.children.forEach((childBlock) => {
            const childBlockElement = this.parent.blockRenderer.createBlockElement(childBlock);
            contentContainer.appendChild(childBlockElement);
        });
        calloutWrapper.appendChild(iconContainer);
        calloutWrapper.appendChild(contentContainer);
        return calloutWrapper;
    }
    renderCalloutIcon() {
        const svg = createBaseSvg();
        svg.append(createSvgElement('path', {
            d: 'M14 22H10C8.89543 22 8 21.1046 8 20V17H16V20C16 21.1046 15.1046 22 14 22Z',
            fill: '#7DA6FF'
        }), createSvgElement('circle', {
            cx: '12',
            cy: '9.5',
            r: '7.5',
            stroke: '#4D4B4B',
            'stroke-width': '2'
        }), createSvgElement('path', {
            d: 'M14 22.5H10C8.89543 22.5 8 21.6046 8 20.5V16H16V20.5C16 21.6046 15.1046 22.5 14 22.5Z',
            stroke: '#4D4B4B',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        }), createSvgElement('circle', {
            cx: '12',
            cy: '9.5',
            r: '7.5',
            fill: '#FFCA26'
        }), createSvgElement('path', {
            d: 'M19.5 9.5C19.5 13.6421 16.1421 17 12 17C12 17 15.5 13.6421 15.5 9.5C15.5 5.35786 12 2 12 2C16.1421 2 19.5 5.35786 19.5 9.5Z',
            fill: '#F39F00'
        }), createSvgElement('path', {
            d: 'M8 19C10.5 20.5 13 20.5 16 19',
            stroke: '#4D4B4B'
        }));
        return svg;
    }
}

class CollapsibleRenderer {
    constructor(manager) {
        /**
         * Updates the expansion state of a collapsible block.
         *
         * @param {HTMLElement} blockElement - The block element to update.
         * @param {boolean} newState - The new expansion state.
         * @param {boolean} isUndoRedoAction - Whether it is invoked through UndoRedo
         * @returns {void}
         */
        this.updateCollapsibleBlockExpansion = (blockElement, newState, isUndoRedoAction) => {
            const contentContainer = blockElement.querySelector('.' + TOGGLE_CONTENT_CLS);
            const blockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
            const updatedState = newState;
            blockModel.properties.isExpanded = updatedState;
            this.parent.stateManager.updateManagerBlocks();
            blockElement.setAttribute('data-collapsed', String(!updatedState));
            updateCSSText(contentContainer, `display: ${updatedState ? 'block' : 'none'};`);
            if (!isUndoRedoAction) {
                this.parent.undoRedoAction.trackExpandedStateForUndoRedo(blockModel.id, blockModel.properties.isExpanded);
            }
        };
        this.parent = manager;
    }
    /**
     * Renders a initial level Collapsible block
     *
     * @param {BlockModel} block - The block model containing data.
     * @param {HTMLElement} blockElement - The block container element.
     * @returns {HTMLElement} - The rendered Collapsible block element.
     */
    renderCollapsibleBlock(block, blockElement) {
        const collapsibleProps = block.properties;
        blockElement.setAttribute('data-collapsed', String(!collapsibleProps.isExpanded));
        const blockContent = createElement('div');
        const toggleHeaderWrapper = createElement('div', {
            className: 'e-toggle-header'
        });
        const toggleIcon = createElement('div', {
            className: 'e-toggle-icon',
            attrs: { contenteditable: 'false' }
        });
        toggleIcon.appendChild(this.renderToggleIcon());
        toggleIcon.addEventListener('click', () => {
            this.updateCollapsibleBlockExpansion(blockElement, !collapsibleProps.isExpanded);
        });
        let headerElement;
        switch (block.blockType) {
            case BlockType.CollapsibleParagraph:
                headerElement = this.parent.blockRenderer.paragraphRenderer.renderParagraph(block);
                break;
            case BlockType.CollapsibleHeading:
                headerElement = this.parent.blockRenderer.headingRenderer.renderHeading(block);
                break;
        }
        updateCSSText(headerElement, 'width: 100%;');
        headerElement.classList.add('e-block-content');
        const contentContainer = createElement('div', {
            className: 'e-toggle-content',
            attrs: { contenteditable: 'true' }
        });
        updateCSSText(contentContainer, `display: ${collapsibleProps.isExpanded ? 'block' : 'none'};`);
        collapsibleProps.children.forEach((childBlock) => {
            const childBlockElement = this.parent.blockRenderer.createBlockElement(childBlock);
            contentContainer.appendChild(childBlockElement);
        });
        toggleHeaderWrapper.appendChild(toggleIcon);
        toggleHeaderWrapper.appendChild(headerElement);
        blockContent.appendChild(toggleHeaderWrapper);
        blockContent.appendChild(contentContainer);
        blockElement.classList.add('e-toggle-block');
        return blockContent;
    }
    renderToggleIcon() {
        const svg = createBaseSvg();
        const commonPathD = 'M5 20.1315V3.86852C5 3.06982 5.89014 2.59343 6.5547 3.03647L18.7519 11.1679C19.3457 11.5638 19.3457 12.4362 18.7519 12.8321L6.5547 20.9635C5.89015 21.4066 5 20.9302 5 20.1315Z';
        const pathStroke = createSvgElement('path', {
            d: commonPathD,
            stroke: '#4D4B4B',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        });
        const pathFill = createSvgElement('path', {
            d: commonPathD,
            fill: '#4D4B4B'
        });
        svg.append(pathStroke, pathFill);
        return svg;
    }
}

class CommonBlocksRenderer {
    constructor(manager) {
        this.parent = manager;
    }
    /**
     * Renders a divider block
     *
     * @param {HTMLElement} blockElement - The block element.
     * @returns {HTMLElement} - The created or updated element.
     */
    renderDivider(blockElement) {
        const dividerElementWrapper = createElement('div', { className: 'e-be-hr-wrapper' });
        const dividerElement = createElement('hr', { className: 'e-be-hr' });
        dividerElementWrapper.appendChild(dividerElement);
        blockElement.addEventListener('click', () => {
            blockElement.classList.add('e-divider-selected');
        });
        blockElement.addEventListener('blur', () => {
            blockElement.classList.remove('e-divider-selected');
        });
        dividerElementWrapper.appendChild(dividerElement);
        blockElement.classList.add('e-divider-block');
        blockElement.setAttribute('tabindex', '0');
        blockElement.setAttribute('contenteditable', 'false');
        updateCSSText(blockElement, 'outline: none;');
        return dividerElementWrapper;
    }
    /**
     * Renders a template block
     *
     * @param {BlockModel} block - The block model containing data.
     * @param {HTMLElement} blockElement - The block container element.
     * @returns {HTMLElement} - The rendered template block element.
     * @hidden
     */
    renderTemplateBlock(block, blockElement) {
        const templateElement = createElement('div', {
            className: 'e-block-template e-block-content',
            id: block.id,
            attrs: { 'tabindex': '-1' }
        });
        blockElement.appendChild(templateElement);
        this.parent.observer.notify('renderTemplateBlock', { block, templateElement });
        return templateElement;
    }
}

class CodeRenderer {
    constructor(manager) {
        this.ctrlAPressed = false;
        this.INDENT_SIZE = 4;
        this.parent = manager;
        this.addEventListeners();
    }
    addEventListeners() {
        this.parent.observer.on(events.keydown, this.handleKeyDownActions, this);
        this.parent.observer.on(events.input, this.handleCodeBlockInput, this);
        this.parent.observer.on(events.localeChanged, this.handleLocaleChange, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.parent.observer.off(events.keydown, this.handleKeyDownActions);
        this.parent.observer.off(events.input, this.handleCodeBlockInput);
        this.parent.observer.off(events.localeChanged, this.handleLocaleChange);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    /**
     * Renders a code block
     *
     * @param {BlockModel} block - The block model containing data.
     * @returns {HTMLElement} - The rendered code block element.
     * @hidden
     */
    renderCodeBlock(block) {
        const codeBlockSettings = block.properties;
        const { container, preElement, codeElement } = this.createCodeContainer(block);
        const { toolbar, copyButton } = this.createCodeToolbar();
        this.initializeLanguageSelector(codeBlockSettings, preElement, codeElement, toolbar);
        toolbar.appendChild(copyButton);
        container.appendChild(toolbar);
        container.appendChild(preElement);
        setCursorPosition(codeElement, 0);
        return container;
    }
    createCodeToolbar() {
        const toolbar = createElement('div', {
            className: 'e-code-block-toolbar',
            attrs: { contenteditable: 'false' }
        });
        const copyButton = createElement('button', {
            className: 'e-code-block-copy-button e-btn',
            innerHTML: '<span class="e-icons e-copy"></span>',
            attrs: {
                title: this.parent.localeJson['codeCopyTooltip'],
                type: 'button',
                contenteditable: 'false'
            }
        });
        this.addCopyButtonClick(toolbar, copyButton);
        return { toolbar, copyButton };
    }
    addCopyButtonClick(toolbar, copyButton) {
        copyButton.addEventListener('click', () => {
            const codeElement = toolbar.closest('.e-code-block-container').querySelector('code');
            if (codeElement) {
                const codeText = codeElement.textContent;
                window.navigator.clipboard.writeText(codeText)
                    .then(() => {
                    const iconElement = copyButton.querySelector('.e-icons');
                    if (iconElement) {
                        const originalClass = iconElement.className;
                        iconElement.className = 'e-icons e-check-tick';
                        setTimeout(() => {
                            iconElement.className = originalClass;
                        }, 2000);
                    }
                })
                    .catch((err) => {
                    console.error('Could not copy text: ', err);
                });
            }
        });
    }
    initializeLanguageSelector(codeBlockSettings, preElement, codeElement, targetElement) {
        const languageDataSource = getLanguageItems();
        if (this.parent.codeBlockSettings.languages.length === 0) {
            this.parent.codeBlockSettings.languages = languageDataSource;
        }
        this.renderDropDown(codeBlockSettings, preElement, codeElement, targetElement);
    }
    renderDropDown(codeBlockSettings, preElement, codeElement, targetElement) {
        this.parent.observer.notify('renderDropdownList', {
            targetElement: targetElement,
            dataSource: this.parent.codeBlockSettings.languages,
            fields: { text: 'label', value: 'language' },
            value: codeBlockSettings.language || this.parent.codeBlockSettings.defaultLanguage,
            change: (e) => {
                const newLanguage = e.value;
                if (codeElement && preElement) {
                    codeElement.className = `e-code-content e-block-content language-${newLanguage}`;
                    preElement.setAttribute('data-language', newLanguage);
                    // Update in Model
                    codeBlockSettings.language = newLanguage;
                }
            }
        });
    }
    createCodeContainer(block) {
        const container = createElement('div', { className: 'e-code-block-container' });
        const preElement = createElement('pre', {
            className: 'e-code-block',
            attrs: {
                'data-language': this.parent.codeBlockSettings.defaultLanguage
            }
        });
        const hasContent = block.content && block.content.length > 0;
        const codeElement = createElement('code', {
            className: `e-code-content e-block-content language-${this.parent.codeBlockSettings.defaultLanguage}`,
            attrs: { contenteditable: 'true' }
        });
        if (hasContent && block.content[0].content) {
            codeElement.textContent = block.content[0].content;
        }
        else {
            codeElement.textContent = '\n';
        }
        preElement.appendChild(codeElement);
        return { container, preElement, codeElement };
    }
    handleKeyDownActions(e) {
        if (!this.parent.currentFocusedBlock) {
            return;
        }
        const codeElement = this.parent.currentFocusedBlock.querySelector('code');
        const block = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        if (!codeElement || (block && block.blockType !== BlockType.Code)) {
            return;
        }
        const normalizedKey = getNormalizedKey(e);
        if (normalizedKey === 'ctrl+a') {
            this.handleCtrlASelection(e, codeElement);
            return;
        }
        switch (e.key) {
            case 'Enter':
                this.handleEnterKey(e, codeElement, block);
                break;
            case 'Backspace':
                this.handleDeletion(e, codeElement, block, false);
                break;
            case 'Delete':
                this.handleDeletion(e, codeElement, block, true);
                break;
            case 'Tab':
                this.handleTabKey(e, codeElement);
                break;
        }
    }
    handleEnterKey(e, codeElement, block) {
        e.preventDefault();
        this.parent.previousSelection = captureSelectionState();
        const action = this.determineEnterAction(codeElement);
        if (action.shouldExit) {
            this.exitCodeBlock(codeElement, block);
            return;
        }
        // Store the old block state for undo/redo tracking
        const oldBlockModel = decoupleReference(block);
        // Insert single newline with indentation
        this.insertTextAtCursor(action.indentation);
        // Update the block model after inserting line breaks
        this.updateBlockModel(codeElement, block);
        // Track the change for undo/redo
        const clonedBlock = decoupleReference(block);
        this.parent.undoRedoAction.trackContentChangedForUndoRedo(oldBlockModel, clonedBlock);
    }
    determineEnterAction(codeElement) {
        const cursorPosition = this.getCursorPosition(codeElement);
        const indentation = this.getCurrentLineIndentation(codeElement, cursorPosition);
        const shouldExit = this.shouldExitCodeBlock(codeElement);
        return { shouldExit, indentation };
    }
    handleDeletion(e, codeElement, block, isDeleteKey) {
        const cursorPosition = this.getCursorPosition(codeElement);
        const textContent = codeElement.textContent;
        const range = getSelectedRange();
        const shouldPreventDefault = isDeleteKey
            ? (cursorPosition >= textContent.length)
            : (cursorPosition === 0 || textContent.length === 0);
        if ((textContent.length === 1) || (range.toString() === textContent)) {
            e.preventDefault();
            // Store the old block state for undo/redo tracking
            const oldBlockModel = decoupleReference(block);
            codeElement.textContent = '\n';
            setCursorPosition(codeElement, 0);
            this.updateBlockModel(codeElement, block);
            // Track the change for undo/redo
            const clonedBlock = decoupleReference(block);
            this.parent.undoRedoAction.trackContentChangedForUndoRedo(oldBlockModel, clonedBlock);
        }
        if (shouldPreventDefault) {
            e.preventDefault();
            return;
        }
    }
    handleTabKey(e, codeElement) {
        e.preventDefault();
        this.parent.previousSelection = captureSelectionState();
        const block = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        if (!block) {
            return;
        }
        // Store the old block state for undo/redo tracking
        const oldBlockModel = decoupleReference(block);
        if (e.shiftKey) {
            this.removeIndentation(codeElement);
        }
        else {
            this.addIndentation();
        }
        // Update block model after indentation change
        this.updateBlockModel(codeElement, block);
        // Track the change for undo/redo
        const clonedBlock = decoupleReference(block);
        this.parent.undoRedoAction.trackContentChangedForUndoRedo(oldBlockModel, clonedBlock);
    }
    handleCodeBlockInput(e) {
        if (!this.parent.currentFocusedBlock) {
            return;
        }
        const codeElement = this.parent.currentFocusedBlock.querySelector('code');
        const block = getBlockModelById(this.parent.currentFocusedBlock.id, this.parent.getEditorBlocks());
        if (!codeElement || block.blockType !== BlockType.Code) {
            return;
        }
        // Store the old block state for undo/redo tracking
        const oldBlockModel = decoupleReference(block);
        const textContent = codeElement.textContent || '';
        if (!textContent.trim() && codeElement.textContent !== '\n') {
            codeElement.textContent = '\n';
        }
        this.updateBlockModel(codeElement, block);
        // Track the change for undo/redo and notify block change event
        const clonedBlock = decoupleReference(block);
        this.parent.undoRedoAction.trackContentChangedForUndoRedo(oldBlockModel, clonedBlock);
        this.parent.eventService.addChange({
            action: 'Update',
            data: {
                block: clonedBlock,
                prevBlock: oldBlockModel
            }
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
    }
    handleCtrlASelection(e, codeElement) {
        if (!this.ctrlAPressed) {
            e.preventDefault();
            this.selectEntireCodeBlock(codeElement);
            this.ctrlAPressed = true;
            setTimeout(() => {
                this.ctrlAPressed = false;
            }, 500);
        }
        else {
            this.ctrlAPressed = false;
        }
    }
    getCursorPosition(element) {
        const range = this.parent.nodeSelection.getRange();
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        return preCaretRange.toString().length;
    }
    insertTextAtCursor(indentValue) {
        const selection = window.getSelection();
        if (!selection.rangeCount) {
            return;
        }
        const codeElement = this.parent.currentFocusedBlock.querySelector('code');
        if (!codeElement) {
            return;
        }
        const range = selection.getRangeAt(0);
        const cursorPositionBefore = this.getCursorPosition(codeElement);
        const textContent = codeElement.textContent || '';
        // 1. Delete any selected text
        range.deleteContents();
        // 2. Determine if we're truly at the document end
        const atEnd = cursorPositionBefore >= textContent.length;
        let newlineToInsert = '\n';
        if (atEnd) {
            // Check the character right before the cursor (if any)
            if (cursorPositionBefore > 0 && textContent[cursorPositionBefore - 1] === '\n') {
                // Already ends with newline → just one more \n
                newlineToInsert = '\n';
            }
            else {
                // Does NOT end with newline → most editors insert double newline
                newlineToInsert = '\n\n';
            }
        }
        const textToInsert = newlineToInsert + (indentValue || '');
        const textNode = document.createTextNode(textToInsert);
        range.insertNode(textNode);
        // Calculate new cursor position and set it
        const newCursorPosition = cursorPositionBefore + textToInsert.length;
        codeElement.normalize();
        setCursorPosition(codeElement, newCursorPosition);
    }
    getCurrentLineIndentation(element, cursorPosition) {
        const textContent = element.textContent;
        const lines = textContent.substring(0, cursorPosition).split('\n');
        const currentLine = lines[lines.length - 1];
        const indentMatch = currentLine.match(/^(\s*)/);
        return indentMatch ? indentMatch[1] : '';
    }
    shouldExitCodeBlock(element) {
        const textContent = element.textContent;
        const cursorPosition = this.getCursorPosition(element);
        // Check if cursor is at the end of content
        if (cursorPosition !== textContent.length) {
            return false;
        }
        // Exit only when content ends with three newlines (user pressed Enter 3 times at the end)
        // This means there are two empty lines at the end
        return textContent.endsWith('\n\n\n');
    }
    exitCodeBlock(codeElement, block) {
        const blockElement = getParentBlock(codeElement);
        setTimeout(() => {
            const nextSibling = blockElement.nextElementSibling;
            if (nextSibling) {
                this.parent.setFocusAndUIForNewBlock(nextSibling);
            }
            else {
                const newBlock = BlockFactory.createParagraphBlock();
                this.parent.blockCommand.addBlock({ block: newBlock, targetBlock: blockElement });
            }
        });
    }
    addIndentation() {
        const indent = ' '.repeat(this.INDENT_SIZE);
        const range = this.parent.nodeSelection.getRange();
        range.insertNode(document.createTextNode(indent));
        const endContainer = range.endContainer;
        setCursorPosition(endContainer, range.startOffset + indent.length);
    }
    removeIndentation(element) {
        const cursorPosition = this.getCursorPosition(element);
        const textContent = element.textContent;
        // Check for spaces right before the cursor position
        const startCheckPos = Math.max(0, cursorPosition - this.INDENT_SIZE);
        const beforeCursor = textContent.substring(startCheckPos, cursorPosition);
        const spacesBeforeCursor = beforeCursor.match(/\s*$/)[0].length;
        if (spacesBeforeCursor > 0) {
            const removeStart = cursorPosition - spacesBeforeCursor;
            element.textContent = textContent.substring(0, removeStart) + textContent.substring(cursorPosition);
            setCursorPosition(element, removeStart);
        }
    }
    selectEntireCodeBlock(element) {
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
    updateBlockModel(codeElement, block) {
        // Since we're using literal newlines now, just use textContent directly
        let textContent = codeElement.textContent || '';
        // Remove trailing newline if it's the only character or if there are multiple trailing newlines,
        // keep only the structure we want
        if (textContent === '\n') {
            textContent = '';
        }
        else if (textContent.endsWith('\n')) {
            // Preserve newlines in the middle of content, but trim excessive trailing newlines
            textContent = textContent.replace(/\n+$/, '');
        }
        if (!block.content || block.content.length === 0) {
            this.parent.blockService.replaceBlock(block.id, Object.assign({}, decoupleReference(block), { content: [BlockFactory.createTextContent({ content: textContent })] }));
        }
        else {
            block.content[0].content = textContent;
        }
        this.parent.stateManager.updateManagerBlocks();
    }
    handleLocaleChange() {
        const codeBlocks = this.parent.rootEditorElement.querySelectorAll('.e-code-block-container');
        for (const codeBlock of Array.from(codeBlocks)) {
            const copyButton = codeBlock.querySelector('.e-code-block-copy-button');
            if (copyButton) {
                copyButton.setAttribute('title', this.parent.localeJson['codeCopyTooltip']);
            }
        }
    }
    destroy() {
        this.removeEventListeners();
    }
}

var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Constants
const MIN_IMAGE_WIDTH = 40;
const MIN_IMAGE_HEIGHT = 40;
const RESIZE_HANDLE_SIZE = 8;
class ImageRenderer {
    constructor(manager) {
        this.isResizing = false;
        this.handleImageResize = (e) => {
            const allowedTarget = this.parent.rootEditorElement;
            if (!allowedTarget.contains(e.target) && (!this.isResizing)) {
                return;
            }
            const dx = e.clientX - this.startPosition.x;
            const dy = e.clientY - this.startPosition.y;
            const position = this.currentResizeHandle.className.split('e-resize-')[1];
            const { newWidth, newHeight } = this.calculateNewDimensions(dx, dy, position);
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = requestAnimationFrame(() => {
                if (this.currentImage && this.currentImage.parentElement) {
                    updateCSSText(this.currentImage, `width: ${formatUnit(newWidth)}; height: ${formatUnit(newHeight)};`);
                    updateCSSText(this.currentImage.parentElement, `width: ${formatUnit(newWidth)}; height: ${formatUnit(newHeight)};`);
                }
            });
        };
        this.stopImageResize = () => {
            if (!this.isResizing) {
                return;
            }
            document.removeEventListener('mousemove', this.handleImageResize);
            document.removeEventListener('mouseup', this.stopImageResize);
            if (this.resizeOverlay && this.resizeOverlay.parentNode) {
                document.body.removeChild(this.resizeOverlay);
            }
            this.isResizing = false;
            this.currentResizeHandle = null;
            this.currentImage = null;
        };
        this.parent = manager;
        this.uploadPopupObj = null;
        this.uploadPopupElement = null;
        this.currentPlaceholder = null;
        this.isUploadPopupOpen = false;
        this.addEventListeners();
        // Create upload popup during initialization to ensure uploader is ready
    }
    addEventListeners() {
        this.parent.observer.on(events.documentClick, this.handleDocumentClick, this);
        this.parent.observer.on('modulesInitialized', this.createUploadPopup, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.parent.observer.off(events.documentClick, this.handleDocumentClick);
        this.parent.observer.off('modulesInitialized', this.createUploadPopup);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    /**
     * Renders a image block
     *
     * @param {BlockModel} block - The block model containing data.
     * @returns {HTMLElement} - The rendered image block element.
     * @hidden
     */
    renderImage(block) {
        const settings = block.properties;
        const isCallFromBlazor = isNullOrUndefined(this.parent.rootEditorElement.ej2_instances);
        // Check if image has source - if not, render placeholder
        if (!isCallFromBlazor && (!settings.src || settings.src === '')) {
            const placeholder = this.renderPlaceholder(block.id);
            // Only auto-open popup if NOT during undo/redo and NOT during initial rendering
            const isUndoRedo = this.parent.undoRedoAction.isUndoing || this.parent.undoRedoAction.isRedoing;
            if (!isUndoRedo && (this.parent.blockRenderer && !this.parent.blockRenderer.isEntireBlocksRendering)) {
                // Open upload popup after a short delay to ensure placeholder is appended in dom
                setTimeout(() => {
                    this.toggleUploadPopup(isNullOrUndefined(this.parent.currentFocusedBlock), placeholder);
                }, 100);
            }
            return placeholder;
        }
        // Render normal image if src exists
        const { container, img } = this.createImageContainer(block);
        this.configureImageElement(img, block);
        container.appendChild(img);
        return container;
    }
    renderPlaceholder(blockId) {
        const placeholder = createElement('div', {
            id: `${this.parent.rootEditorElement.id}_image-placeholder-${blockId}`,
            className: 'e-image-placeholder',
            attrs: {
                'role': 'button',
                'aria-label': this.parent.localeJson['imgPlaceholderAriaLabel'],
                'tabindex': '0',
                'data-block-id': blockId,
                contenteditable: 'false'
            }
        });
        // Create placeholder icon
        const iconContainer = createElement('div', {
            className: 'e-placeholder-icon-container'
        });
        const icon = createElement('span', {
            className: 'e-icons e-block-image-icon'
        });
        iconContainer.appendChild(icon);
        // Create placeholder text
        const textElement = createElement('div', {
            className: 'e-placeholder-text',
            innerHTML: this.parent.localeJson['imagePlaceholder']
        });
        placeholder.appendChild(iconContainer);
        placeholder.appendChild(textElement);
        // Bind click event
        placeholder.addEventListener('click', this.handlePlaceholderClick.bind(this));
        // Bind keyboard events
        placeholder.addEventListener('keydown', this.handlePlaceholderKeydown.bind(this));
        return placeholder;
    }
    handlePlaceholderClick(event) {
        event.preventDefault();
        const target = event.currentTarget;
        if (this.currentPlaceholder !== target) {
            this.toggleUploadPopup(false, target);
        }
        else {
            this.toggleUploadPopup(true);
            this.currentPlaceholder = null;
        }
    }
    handlePlaceholderKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            const target = event.currentTarget;
            this.toggleUploadPopup(false, target);
        }
    }
    toggleUploadPopup(shouldHide, placeholder) {
        if (shouldHide) {
            if (this.uploadPopupObj && this.isUploadPopupOpen) {
                this.uploadPopupObj.hide();
                this.isUploadPopupOpen = false;
                this.currentPlaceholder = null;
            }
        }
        else {
            if (placeholder) {
                this.currentPlaceholder = placeholder;
            }
            // Show popup
            if (this.uploadPopupObj && this.currentPlaceholder) {
                this.uploadPopupObj.relateTo = this.currentPlaceholder;
                this.parent.popupRenderer.adjustPopupPositionRelativeToTarget(this.currentPlaceholder, this.uploadPopupObj);
                this.parent.observer.notify('clearUploaderObj');
                this.uploadPopupObj.show();
                this.isUploadPopupOpen = true;
            }
        }
    }
    createUploadPopup() {
        // Create popup container
        this.uploadPopupElement = createElement('div', {
            id: `${this.parent.rootEditorElement.id}_image-upload-popup`,
            className: 'e-image-upload-popup e-popup-container'
        });
        // Create popup content container
        const contentContainer = createElement('div', {
            id: `${this.parent.rootEditorElement.id}_image-tab-container`,
            className: 'e-popup-content'
        });
        this.uploadPopupElement.appendChild(contentContainer);
        this.parent.rootEditorElement.appendChild(this.uploadPopupElement);
        // Notify BlockEditor to render the tab component in this container
        this.parent.observer.notify('renderImageUploader', { container: contentContainer });
        // Use PopupRenderer to create the popup
        const args = {
            element: this.uploadPopupElement,
            content: contentContainer,
            width: '400px',
            height: 'auto'
        };
        this.uploadPopupObj = this.parent.popupRenderer.renderPopup(args);
        // Bind popup lifecycle events
        this.uploadPopupObj.open = this.handlePopupOpen.bind(this);
        this.uploadPopupObj.close = this.handlePopupClose.bind(this);
        // Bind escape key to close popup
        this.uploadPopupElement.addEventListener('keydown', this.handlePopupKeydown.bind(this));
        // Subscribe to image selection and upload events
        this.subscribeToImageEvents();
    }
    subscribeToImageEvents() {
        // Listen for file selected event to show Base64 preview
        this.parent.observer.on('fileSelected', this.handleFileSelected, this);
        // Listen for upload success to replace with server URL
        this.parent.observer.on('fileUploadSuccess', this.handleUploadSuccess, this);
        // Listen for embed image event
        this.parent.observer.on('imageEmbedded', this.handleImageEmbedded, this);
    }
    unsubscribeFromImageEvents() {
        this.parent.observer.off('fileSelected', this.handleFileSelected);
        this.parent.observer.off('fileUploadSuccess', this.handleUploadSuccess);
        this.parent.observer.off('imageEmbedded', this.handleImageEmbedded);
    }
    handleFileSelected(args) {
        if (!this.currentPlaceholder || !args.previewUrl) {
            return;
        }
        // Get the block ID from placeholder
        const blockId = this.currentPlaceholder.getAttribute('data-block-id') || '';
        // Replace placeholder with image preview
        this.replaceWithImage(this.currentPlaceholder, args.previewUrl, args.file.name, blockId);
        // Close the popup
        this.toggleUploadPopup(true);
    }
    handleUploadSuccess(args) {
        const blockElement = this.parent.rootEditorElement.querySelector(`[data-block-id="${args.blockId}"]`);
        if (!blockElement) {
            return;
        }
        // Find the image element and update its src
        const imgElement = blockElement.querySelector('img.e-image-block');
        if (imgElement) {
            imgElement.src = args.fileUrl;
            // Update the block model
            const block = getBlockModelById(args.blockId, this.parent.getEditorBlocks());
            if (block) {
                block.properties.src = args.fileUrl;
            }
        }
    }
    handleImageEmbedded(args) {
        if (!this.currentPlaceholder || !args.url) {
            return;
        }
        // Get the block ID from placeholder
        const blockId = this.currentPlaceholder.getAttribute('data-block-id') || '';
        // Replace placeholder with image
        this.replaceWithImage(this.currentPlaceholder, args.url, 'Embedded image', blockId);
        // Close the popup
        this.toggleUploadPopup(true);
    }
    // Replaces placeholder element with actual image element using BlockCommand API.
    replaceWithImage(placeholder, imageSrc, altText, blockId) {
        const blockElement = placeholder.parentElement;
        if (!blockElement) {
            return;
        }
        const oldBlock = getBlockModelById(blockId, this.parent.getEditorBlocks());
        if (!oldBlock) {
            return;
        }
        // old block model (src empty)
        const oldBlockClone = decoupleReference(oldBlock);
        // Update the block with the new src
        const updatedProps = Object.assign({}, oldBlock.properties, { src: imageSrc, altText: altText });
        // Update the block model
        oldBlock.properties = updatedProps;
        const newBlock = this.parent.blockService.updateBlock(blockId, oldBlock);
        this.parent.stateManager.updateManagerBlocks();
        const newBlockClone = decoupleReference(newBlock);
        const newBlockElement = this.parent.blockRenderer.createBlockElement(newBlock);
        // Replace the old placeholder block element with the new image block element
        blockElement.parentElement.insertBefore(newBlockElement, blockElement);
        detach(blockElement);
        this.parent.setFocusToBlock(newBlockElement);
        this.parent.undoRedoAction.trackImageInsertionForUndoRedo(blockId, oldBlockClone, newBlockClone);
        this.parent.eventService.addChange({
            action: 'Update',
            data: {
                block: newBlockClone,
                prevBlock: oldBlockClone
            }
        });
        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
        // Clear current placeholder reference
        this.currentPlaceholder = null;
    }
    handlePopupOpen() {
        this.isUploadPopupOpen = true;
        // Notify BlockEditor's tab renderer via event
        this.parent.observer.notify('imagePopupOpen', {});
    }
    handlePopupClose() {
        this.isUploadPopupOpen = false;
        // Notify BlockEditor's tab renderer via event
        this.parent.observer.notify('imagePopupClose', {});
    }
    handlePopupKeydown(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.toggleUploadPopup(true);
        }
    }
    /**
     * Gets the current placeholder element.
     *
     * @returns {HTMLElement | null} The current image placeholder element
     * @hidden
     */
    getCurrentPlaceholder() {
        return this.currentPlaceholder;
    }
    createImageContainer(block) {
        const container = createElement('div', {
            className: 'e-image-container',
            attrs: { 'data-block-id': block.id, contenteditable: 'false' }
        });
        updateCSSText(container, 'position: relative;');
        const img = createElement('img', {
            className: 'e-image-block',
            attrs: { 'alt': block.properties.altText || '', 'role': 'img', 'data-block-id': block.id }
        });
        return { container, img };
    }
    configureImageElement(img, block) {
        const settings = block.properties;
        const globalImgSettings = this.parent.imageBlockSettings;
        updateCSSText(img, `width: ${formatUnit(settings.width ? settings.width : globalImgSettings.width)};`);
        updateCSSText(img, `height: ${formatUnit(settings.height ? settings.height : globalImgSettings.height)};`);
        const isUndoRedo = this.parent.undoRedoAction.isUndoing || this.parent.undoRedoAction.isRedoing;
        if (settings.src) {
            img.src = settings.src;
        }
        else {
            this.handleImageUpload(img, settings);
        }
        if (settings.altText) {
            img.setAttribute('aria-label', settings.altText);
        }
        img.addEventListener('load', () => {
            updateCSSText(img, 'display: block;');
            const minWidth = globalImgSettings.minWidth ? `min-width: ${formatUnit(globalImgSettings.minWidth)};` : '';
            const minHeight = globalImgSettings.minHeight ? `min-height: ${formatUnit(globalImgSettings.minHeight)};` : '';
            const maxWidth = globalImgSettings.maxWidth ? `max-width: ${formatUnit(globalImgSettings.maxWidth)};` : '';
            const maxHeight = globalImgSettings.maxHeight ? `max-height: ${formatUnit(globalImgSettings.maxHeight)};` : '';
            updateCSSText(img, minWidth + minHeight + maxWidth + maxHeight);
            this.aspectRatio = img.naturalWidth / img.naturalHeight;
            // Should notify only during image inserted via uploader and paste action.
            if ((this.parent.blockRenderer && !this.parent.blockRenderer.isEntireBlocksRendering) && !isUndoRedo) {
                this.parent.observer.notify('imageInserted', { blockId: block.id, imgElement: img });
            }
            if (this.parent.imageBlockSettings.enableResize) {
                this.addResizeHandles(img.parentElement, img);
            }
        });
    }
    /**
     * Handles image upload
     *
     * @param {HTMLImageElement} img - The image element whose source will be updated.
     * @param {IImageBlockSettings} settings - Image configuration including allowedTypes and saveFormat.
     * @returns {void}
     * @hidden
     */
    handleImageUpload(img, settings) {
        const fileInput = createElement('input', {
            attrs: {
                type: 'file',
                accept: this.parent.imageBlockSettings.allowedTypes.join(',')
            }
        });
        updateCSSText(fileInput, 'display: none;');
        document.body.appendChild(fileInput);
        const handleFileChange = () => __awaiter$2(this, void 0, void 0, function* () {
            const file = fileInput.files[0];
            if (!file) {
                document.body.removeChild(fileInput);
                return;
            }
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            if (this.parent.imageBlockSettings.allowedTypes.indexOf(fileExtension) === -1) {
                document.body.removeChild(fileInput);
                return;
            }
            const src = yield this.getImageSrcFromFile(file, this.parent.imageBlockSettings.saveFormat);
            img.src = settings.src = src;
            fileInput.removeEventListener('change', handleFileChange);
            if (fileInput.parentNode) {
                fileInput.parentNode.removeChild(fileInput);
            }
        });
        fileInput.addEventListener('change', handleFileChange);
        fileInput.click();
    }
    handleDocumentClick(mouseEvent) {
        const target = mouseEvent.target;
        // Handle upload popup visibility logic
        if (this.uploadPopupObj && this.isUploadPopupOpen) {
            const isInsidePopup = this.uploadPopupElement && this.uploadPopupElement.contains(target);
            const isOnPlaceholder = this.currentPlaceholder && this.currentPlaceholder.contains(target);
            // Close popup if clicking outside both popup and placeholder
            if (!isInsidePopup && !isOnPlaceholder) {
                this.toggleUploadPopup(true);
            }
        }
        // Handle image resize handles visibility
        const isImageClick = target.matches('img') || target.getAttribute('data-block-type') === BlockType.Image;
        const images = this.parent.rootEditorElement.querySelectorAll('img');
        for (const image of Array.from(images)) {
            const isTargetImage = image === target || target.contains(image);
            const resizeHandles = image.parentElement.querySelectorAll('.e-image-rsz-handle');
            for (const handle of Array.from(resizeHandles)) {
                updateCSSText(handle, `display: ${isImageClick && isTargetImage ? 'block' : 'none'};`);
            }
            image.classList.toggle('e-image-focus', isImageClick && isTargetImage);
        }
    }
    /**
     * Handles the paste event for images.
     *
     * @param {File | Blob} file - The file or blob to be pasted.
     * @returns {Promise<void>} - A promise that resolves when the image is pasted.
     * @hidden
     */
    handleFilePaste(file) {
        return __awaiter$2(this, void 0, void 0, function* () {
            const blockElement = this.parent.currentFocusedBlock;
            const block = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
            const saveFormat = this.parent.imageBlockSettings.saveFormat;
            const src = yield this.getImageSrcFromFile(file, (saveFormat || 'Base64'));
            const fileName = (file instanceof File) ? file.name : `image-${Date.now()}`;
            let transformedParagraph = blockElement;
            if (((blockElement.textContent.length > 0))) {
                const addedBlock = this.parent.blockCommand.addBlock({
                    targetBlock: blockElement,
                    blockType: BlockType.Paragraph
                });
                transformedParagraph = this.parent.getBlockElementById(addedBlock.id);
            }
            this.parent.blockCommand.transformBlock({
                block: getBlockModelById(transformedParagraph.id, this.parent.getEditorBlocks()),
                blockElement: transformedParagraph,
                newBlockType: BlockType.Image,
                props: { src: src, altText: fileName }
            });
        });
    }
    getImageSrcFromFile(file, saveFormat) {
        const format = saveFormat.toLowerCase();
        if (format === 'base64') {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => { resolve(event.target.result); };
                reader.onerror = () => { reject(new Error('Failed to read image as base64.')); };
                reader.readAsDataURL(file);
            });
        }
        else {
            return Promise.resolve(URL.createObjectURL(file));
        }
    }
    createResizeHandle(pos, img) {
        const handle = createElement('div', {
            className: `e-image-rsz-handle e-resize-${pos}`
        });
        Object.assign(handle.style, {
            position: 'absolute',
            width: `${RESIZE_HANDLE_SIZE}px`,
            height: `${RESIZE_HANDLE_SIZE}px`,
            backgroundColor: '#0078d4',
            borderRadius: '50%',
            zIndex: '100',
            cursor: ['nw', 'se'].indexOf(pos) !== -1 ? 'nwse-resize' : 'nesw-resize',
            display: 'none'
        });
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.startImageResize(e, img, handle);
        });
        return handle;
    }
    /**
     * Handles image resize
     *
     * @param {HTMLElement} container - The wrapper element that hosts the image and resize handles.
     * @param {HTMLImageElement} img - The image element to which resize handles are attached.
     * @returns {void}
     * @hidden
     */
    addResizeHandles(container, img) {
        const existingHandles = container.querySelectorAll('.e-image-rsz-handle');
        existingHandles.forEach((handle) => container.removeChild(handle));
        const positions = ['nw', 'ne', 'se', 'sw'];
        for (const pos of positions) {
            const handle = this.createResizeHandle(pos, img);
            container.appendChild(handle);
        }
        if (img.clientWidth > 0 || img.clientHeight > 0) {
            updateCSSText(container, `width: ${formatUnit(img.clientWidth)};`);
        }
    }
    startImageResize(e, img, handle) {
        this.isResizing = true;
        this.currentResizeHandle = handle;
        this.currentImage = img;
        this.startDimensions = { width: img.offsetWidth, height: img.offsetHeight };
        this.startPosition = { x: e.clientX, y: e.clientY };
        this.resizeOverlay = createElement('div', { id: this.parent.rootEditorElement.id + 'resize_overlay' });
        Object.assign(this.resizeOverlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: '9999',
            cursor: handle.style.cursor
        });
        document.body.appendChild(this.resizeOverlay);
        document.addEventListener('mousemove', this.handleImageResize);
        document.addEventListener('mouseup', this.stopImageResize);
    }
    calculateNewDimensions(dx, dy, position) {
        let newWidth = this.startDimensions.width;
        let newHeight = this.startDimensions.height;
        switch (position) {
            case 'se':
                newWidth += dx;
                newHeight += dy;
                break;
            case 'sw':
                newWidth -= dx;
                newHeight += dy;
                break;
            case 'ne':
                newWidth += dx;
                newHeight -= dy;
                break;
            case 'nw':
                newWidth -= dx;
                newHeight -= dy;
                break;
        }
        newWidth = Math.max(newWidth, MIN_IMAGE_WIDTH);
        newHeight = Math.max(newHeight, MIN_IMAGE_HEIGHT);
        if (this.aspectRatio) {
            const widthChange = Math.abs(newWidth - this.startDimensions.width);
            const heightChange = Math.abs(newHeight - this.startDimensions.height);
            if (widthChange >= heightChange) {
                newHeight = newWidth / this.aspectRatio;
            }
            else {
                newWidth = newHeight * this.aspectRatio;
            }
        }
        return { newWidth, newHeight };
    }
    destroy() {
        this.removeEventListeners();
        // Unsubscribe from image events
        this.unsubscribeFromImageEvents();
        // Destroy upload popup
        if (this.uploadPopupObj) {
            this.uploadPopupObj.destroy();
            this.uploadPopupObj = null;
        }
        // Remove upload popup element
        if (this.uploadPopupElement && this.uploadPopupElement.parentElement) {
            detach(this.uploadPopupElement);
            this.uploadPopupElement = null;
        }
        // Clean up resize overlay
        if (this.resizeOverlay && this.resizeOverlay.parentNode) {
            document.body.removeChild(this.resizeOverlay);
        }
        // Clear references
        this.currentPlaceholder = null;
        this.isUploadPopupOpen = false;
    }
}

class TableUIManager {
    constructor(parent) {
        // State
        this.hoveredRow = null;
        this.hoveredColIndex = null;
        this.isMultiSelecting = false;
        this.isResizing = false;
        this.lastRowAnchorIndex = null;
        this.lastColAnchorIndex = null;
        this.parent = parent;
    }
    init(table, blockElement, blockModel) {
        this.table = table;
        this.tableContainer = table.parentElement;
        this.blockElement = blockElement;
        this.blockModel = blockModel;
        this.blockId = table.getAttribute('data-block-id');
        this.createUiElements();
        this.mountUiElements();
        this.wireDelegatedMousemove();
        this.wireRowInsert();
        this.wireActionHandles();
        this.wireColInsert();
        this.wireColResize();
        this.wireFocusAndCleanup();
        this.wireObservers();
    }
    // 1) Create all UI elements
    createUiElements() {
        this.rowInsertHandle = createElement('div', { className: 'e-row-insert-handle e-icons e-plus', attrs: { contenteditable: 'false' }, styles: 'display: none' });
        this.rowActionHandle = createElement('div', { className: 'e-row-action-handle e-action-handle', attrs: { contenteditable: 'false', 'data-block-id': this.blockId, 'data-icon-type': 'row' }, styles: 'display: none' });
        const rowActionHandleIcon = createElement('span', { className: 'e-icons e-block-drag-icon' });
        this.rowActionHandle.appendChild(rowActionHandleIcon);
        this.rowHoverLine = createElement('div', { className: 'e-row-hover-line', styles: 'display: none', attrs: { contenteditable: 'false' } });
        this.rowTopDot = createElement('div', { className: 'e-row-dot', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.rowBottomDot = createElement('div', { className: 'e-row-dot', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.colInsertHandle = createElement('div', { className: 'e-col-insert-handle e-icons e-plus', attrs: { contenteditable: 'false' }, styles: 'display: none' });
        this.colActionHandle = createElement('div', { className: 'e-col-action-handle e-action-handle', attrs: { contenteditable: 'false', 'data-block-id': this.blockId, 'data-icon-type': 'col' }, styles: 'display: none' });
        const colActionHandleIcon = createElement('span', { className: 'e-icons e-block-drag-icon' });
        colActionHandleIcon.style.transform = 'rotate(90deg)';
        this.colActionHandle.appendChild(colActionHandleIcon);
        this.colHoverLine = createElement('div', { className: 'e-col-hover-line', styles: 'display: none', attrs: { contenteditable: 'false' } });
        this.colLeftDot = createElement('div', { className: 'e-col-dot', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.colRightDot = createElement('div', { className: 'e-col-dot', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.rowPinned = createElement('div', { className: 'e-row-action-handle e-pinned e-action-handle', attrs: { contenteditable: 'false', 'data-icon-type': 'row' }, styles: 'display: none' });
        const rowPinnedHandleIcon = createElement('span', { className: 'e-icons e-block-drag-icon' });
        this.rowPinned.appendChild(rowPinnedHandleIcon);
        this.colPinned = createElement('div', { className: 'e-col-action-handle e-pinned e-action-handle', attrs: { contenteditable: 'false', 'data-icon-type': 'col' }, styles: 'display: none' });
        const colPinnedHandleIcon = createElement('span', { className: 'e-icons e-block-drag-icon' });
        colPinnedHandleIcon.style.transform = 'rotate(90deg)';
        this.colPinned.appendChild(colPinnedHandleIcon);
        this.rowTopHit = createElement('div', { className: 'e-row-dot-hit', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.rowBottomHit = createElement('div', { className: 'e-row-dot-hit', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.colLeftHit = createElement('div', { className: 'e-col-dot-hit', styles: 'display:none', attrs: { contenteditable: 'false' } });
        this.colRightHit = createElement('div', { className: 'e-col-dot-hit', styles: 'display:none', attrs: { contenteditable: 'false' } });
        // full-height column-resize handle (invisible until needed)
        this.colResizeHandle = createElement('div', {
            className: 'e-col-resize-handle',
            attrs: { contenteditable: 'false' },
            styles: 'display:none; position:absolute; pointer-events:auto;'
        });
    }
    // 2) Mount elements to block element in the same order
    mountUiElements() {
        [this.rowInsertHandle, this.rowHoverLine, this.rowActionHandle, this.rowTopDot, this.rowBottomDot, this.colInsertHandle,
            this.colHoverLine, this.colActionHandle, this.colLeftDot, this.colRightDot, this.rowPinned, this.colPinned]
            .forEach((el) => this.blockElement.appendChild(el));
        [this.rowTopHit, this.rowBottomHit, this.colLeftHit, this.colRightHit]
            .forEach((el) => this.blockElement.appendChild(el));
        // mount the resize handle on top
        this.blockElement.appendChild(this.colResizeHandle);
    }
    // 3) Delegated mouse move handling (exact logic preserved)
    wireDelegatedMousemove() {
        this.table.addEventListener('mousemove', (e) => {
            const target = e.target;
            const isRowNumberCell = target.closest('td.e-row-number, th.e-row-number') !== null;
            const isPlainHeaderCell = target.closest('th.e-row-number') !== null;
            const hasBodyRows = this.table.tBodies[0].rows.length > 0 ? true : false;
            if (this.isMultiSelecting || this.isResizing || !target.closest('td, th')) {
                this.hideRowUI();
                this.hideColUI();
                this.hideHitZones();
                return;
            }
            // Hide row UI only for plain header cell when body rows exist
            if (isPlainHeaderCell && hasBodyRows) {
                this.hideRowUI();
                this.hideColUI();
                this.hideHitZones();
                return;
            }
            // hide the resize handle by default; we'll re-show if near a column boundary
            this.colResizeHandle.style.display = 'none';
            const xLeft = this.table.parentElement.offsetLeft - 8;
            // Row positioning (dots only)
            const row = target.closest('tr');
            this.hoveredRow = row;
            const rowRect = row.getBoundingClientRect();
            const blockRect = this.blockElement.getBoundingClientRect();
            this.rowActionHandle.dataset.rowIndex = Array.from(this.table.rows).indexOf(row).toString();
            this.rowActionHandle.style.top = rowRect.top - blockRect.top + 'px';
            this.rowActionHandle.style.height = `${rowRect.height}` + 'px';
            this.rowActionHandle.style.display = target.tagName === 'TH' ? 'none' : 'flex';
            const isHeaderRow = this.hoveredRow && this.hoveredRow.querySelector('th') !== null;
            let showTopDot = true;
            let showBottomDot = true;
            if (isHeaderRow) {
                if (hasBodyRows) {
                    // Normal case: header with body rows → hide both dots
                    showTopDot = false;
                    showBottomDot = false;
                }
                else {
                    // Only header exists → show ONLY bottom dot
                    showTopDot = false;
                    showBottomDot = true;
                }
            }
            else {
                // Body row → show both dots normally
                showTopDot = true;
                showBottomDot = true;
            }
            if (showTopDot || showBottomDot) {
                // Show row dots at left side (top and bottom of row)
                this.rowTopDot.style.left = `${xLeft - 4}` + 'px';
                this.rowBottomDot.style.left = `${xLeft - 4}` + 'px';
                this.rowTopDot.style.top = `${rowRect.top - blockRect.top - 3}` + 'px';
                this.rowBottomDot.style.top = `${rowRect.bottom - blockRect.top - 3}` + 'px';
                this.rowTopDot.style.display = showTopDot ? 'block' : 'none';
                this.rowBottomDot.style.display = showBottomDot ? 'block' : 'none';
            }
            else {
                this.rowTopDot.style.display = 'none';
                this.rowBottomDot.style.display = 'none';
            }
            // Hit zones at left side for dot
            const xLeftHit = xLeft - 12;
            this.rowTopHit.style.left = `${xLeftHit}` + 'px';
            this.rowBottomHit.style.left = `${xLeftHit}` + 'px';
            this.rowTopHit.style.top = `${rowRect.top - blockRect.top - 15}` + 'px';
            this.rowBottomHit.style.top = `${rowRect.bottom - blockRect.top - 15}` + 'px';
            this.rowTopHit.style.display = 'block';
            this.rowBottomHit.style.display = 'block';
            // Column positioning (dots only)
            const cell = target.closest('td, th');
            const cellRect = cell.getBoundingClientRect();
            const rowEl = cell.parentElement;
            const colIndex = Array.from(rowEl.cells).filter((c) => !c.classList.contains('e-row-number')).indexOf(cell);
            this.hoveredColIndex = colIndex;
            const dotY = this.table.parentElement.offsetTop - 8;
            const dotHalfWidth = 3.2;
            const borderValue = Math.round(parseFloat(getComputedStyle(cell).borderWidth));
            const leftColX = cellRect.left - blockRect.left - borderValue - dotHalfWidth;
            const rightColX = cellRect.right - blockRect.left - borderValue - dotHalfWidth;
            this.colLeftDot.style.left = `${leftColX}` + 'px';
            this.colRightDot.style.left = `${rightColX}` + 'px';
            this.colLeftDot.style.top = `${dotY - 4}` + 'px';
            this.colRightDot.style.top = `${dotY - 4}` + 'px';
            this.colLeftDot.style.display = 'block';
            this.colRightDot.style.display = 'block';
            if (cell.classList.contains('e-row-number')) {
                this.colLeftDot.style.display = 'none';
                this.colRightDot.style.display = 'none';
            }
            this.colLeftHit.style.left = `${leftColX - 10}` + 'px';
            this.colRightHit.style.left = `${rightColX - 10}` + 'px';
            this.colLeftHit.style.top = `${dotY - 12}` + 'px';
            this.colRightHit.style.top = `${dotY - 12}` + 'px';
            this.colLeftHit.style.display = 'block';
            this.colRightHit.style.display = 'block';
            if (!isRowNumberCell) {
                const headerCell = this.table.querySelectorAll('thead th:not(.e-row-number)')[colIndex];
                if (headerCell) {
                    const headerRect = headerCell.getBoundingClientRect();
                    const borderValue = Math.round(parseFloat(getComputedStyle(headerCell).borderWidth));
                    this.colActionHandle.style.left = `${(headerRect.left - borderValue) - blockRect.left}` + 'px';
                    this.colActionHandle.style.width = `${headerRect.width + borderValue}` + 'px';
                }
                else {
                    this.colActionHandle.style.left = `${(cellRect.left - borderValue) - blockRect.left}` + 'px';
                    this.colActionHandle.style.width = `${cellRect.width + borderValue}` + 'px';
                }
                this.colActionHandle.dataset.colIndex = colIndex.toString();
                this.colActionHandle.style.display = 'flex';
                const proximity = 6;
                const distanceFromRight = cellRect.right - e.clientX;
                const distanceFromLeft = e.clientX - cellRect.left;
                const isNearColumnRightBoundary = distanceFromRight <= proximity;
                const isNearColumnLeftBoundary = distanceFromLeft <= proximity;
                if (isNearColumnLeftBoundary || isNearColumnRightBoundary) {
                    // Determine which two columns the boundary separates
                    const leftDataIdx = isNearColumnRightBoundary ? colIndex : colIndex - 1;
                    if (leftDataIdx < 0) {
                        // Do not show resize handle for first column
                        this.colResizeHandle.style.display = 'none';
                    }
                    else {
                        const boundary = isNearColumnRightBoundary ? cellRect.right : cellRect.left;
                        const leftOffset = boundary - blockRect.left - 2.5;
                        this.colResizeHandle.style.left = `${leftOffset}px`;
                        this.colResizeHandle.style.top = `${this.table.parentElement.offsetTop}px`;
                        this.colResizeHandle.style.height = `${this.table.offsetHeight}px`;
                        this.colResizeHandle.style.display = 'block';
                        this.colResizeHandle.setAttribute('data-resize-index', String(leftDataIdx));
                    }
                }
            }
            else {
                this.colActionHandle.style.display = 'none';
            }
        });
    }
    // 4) Row insert UI and handlers
    wireRowInsert() {
        const showRowLine = (which) => {
            if (!this.hoveredRow) {
                return;
            }
            const rowRect = this.hoveredRow.getBoundingClientRect();
            const blockRect = this.blockElement.getBoundingClientRect();
            const tbody = this.table.tBodies[0];
            const hasBodyRows = tbody && tbody.rows.length > 0;
            this.rowHoverLine.style.top = `${(which === 'top' ? rowRect.top : rowRect.bottom) - blockRect.top - 2}` + 'px';
            this.rowHoverLine.style.left = `${this.table.parentElement.offsetLeft}` + 'px';
            this.rowHoverLine.style.width = `${this.table.offsetWidth}` + 'px';
            this.rowHoverLine.style.display = 'block';
            const dotTop = which === 'top' ? this.rowTopDot : this.rowBottomDot;
            const dotRect = dotTop.getBoundingClientRect();
            this.rowInsertHandle.style.top = `${dotRect.top - blockRect.top - 7}` + 'px';
            this.rowInsertHandle.style.left = `${dotRect.left - blockRect.left - 7}` + 'px';
            this.rowInsertHandle.style.display = 'flex';
            // In header-only case, keep bottom dot visible
            if (!hasBodyRows && this.hoveredRow.querySelector('th')) {
                // Only bottom dot visible → don't hide it when showing line
                if (which === 'top') {
                    this.rowTopDot.style.visibility = 'hidden'; // top never shown anyway
                }
                else {
                    this.rowBottomDot.style.visibility = ''; // keep visible
                }
            }
            else {
                dotTop.style.visibility = 'hidden';
            }
            const index = Array.from(tbody.rows).indexOf(this.hoveredRow);
            this.rowInsertHandle.dataset.rowIndex = (which === 'top' ? index : index + 1).toString();
        };
        const hideRowLine = () => {
            this.rowHoverLine.style.display = 'none';
            this.rowInsertHandle.style.display = 'none';
            // Restore visibility, but keep bottom dot visible if only header
            const tbody = this.table.tBodies[0];
            const hasBodyRows = tbody && tbody.rows.length > 0;
            if (!hasBodyRows) {
                this.rowTopDot.style.visibility = 'hidden'; // no top dot
                this.rowTopHit.style.visibility = 'hidden';
                this.rowBottomDot.style.visibility = ''; // keep bottom dot visible
            }
            else {
                this.rowTopDot.style.visibility = '';
                this.rowTopHit.style.visibility = '';
                this.rowBottomDot.style.visibility = '';
            }
        };
        this.rowTopHit.addEventListener('mouseenter', (e) => {
            if (this.isFromInsertHandle(e, this.rowInsertHandle)) {
                return;
            }
            showRowLine('top');
        });
        this.rowBottomHit.addEventListener('mouseenter', (e) => {
            if (this.isFromInsertHandle(e, this.rowInsertHandle)) {
                return;
            }
            showRowLine('bottom');
        });
        this.rowInsertHandle.addEventListener('mouseleave', (e) => {
            if (this.isFromInsertHandle(e, this.rowBottomHit) || this.isFromInsertHandle(e, this.rowTopHit)) {
                return;
            }
            hideRowLine();
        });
        this.rowTopHit.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            if (this.isFromInsertHandle(e, this.rowInsertHandle)) {
                return;
            }
            hideRowLine();
        });
        this.rowBottomHit.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            if (this.isFromInsertHandle(e, this.rowInsertHandle)) {
                return;
            }
            hideRowLine();
        });
        this.rowInsertHandle.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(this.rowInsertHandle.dataset.rowIndex, 10);
            this.parent.tableService.addRowAt({
                blockId: this.blockElement.id,
                rowIndex: index
            });
            this.hideRowGripper(); // Hides row pinned bars
            this.hideAllPinnedColBars(); // Hides col pinned bars
            requestAnimationFrame(() => {
                this.hideRowUI();
            });
            this.rowTopHit.style.display = 'none';
            this.rowBottomHit.style.display = 'none';
            this.clearPinnedGripperSelection();
        });
    }
    // 5) Column insert UI and handlers
    wireColInsert() {
        const showColLine = (side) => {
            if (this.hoveredColIndex == null) {
                return;
            }
            const rows = Array.from(this.table.rows);
            const cells = Array.from(rows[0].cells).filter(((cell) => !cell.classList.contains('e-row-number')));
            const anyRowCell = cells[this.hoveredColIndex];
            const blockRect = this.blockElement.getBoundingClientRect();
            const rect = anyRowCell.getBoundingClientRect();
            const boundary = side === 'right' ? rect.right : rect.left;
            this.colHoverLine.style.left = `${boundary - blockRect.left - 2}` + 'px';
            this.colHoverLine.style.top = `${this.table.parentElement.offsetTop}` + 'px';
            this.colHoverLine.style.height = `${this.table.offsetHeight}` + 'px';
            this.colHoverLine.style.display = 'block';
            const dotEl = side === 'left' ? this.colLeftDot : this.colRightDot;
            const dotRect = dotEl.getBoundingClientRect();
            this.colInsertHandle.style.left = `${dotRect.left - blockRect.left - 6}` + 'px';
            this.colInsertHandle.style.top = `${dotRect.top - blockRect.top - 7}` + 'px';
            this.colInsertHandle.style.display = 'flex';
            dotEl.style.visibility = 'hidden';
            this.colInsertHandle.dataset.colIndex = (side === 'right' ? this.hoveredColIndex + 1 : this.hoveredColIndex).toString();
        };
        const hideColLine = () => {
            this.colHoverLine.style.display = 'none';
            this.colInsertHandle.style.display = 'none';
            this.colLeftDot.style.visibility = '';
            this.colRightDot.style.visibility = '';
        };
        this.colLeftHit.addEventListener('mouseenter', (e) => {
            if (this.isFromInsertHandle(e, this.colInsertHandle)) {
                return;
            }
            showColLine('left');
        });
        this.colRightHit.addEventListener('mouseenter', (e) => {
            if (this.isFromInsertHandle(e, this.colInsertHandle)) {
                return;
            }
            showColLine('right');
        });
        this.colInsertHandle.addEventListener('mouseleave', (e) => {
            if (this.isFromInsertHandle(e, this.colLeftHit) || this.isFromInsertHandle(e, this.colRightHit)) {
                return;
            }
            hideColLine();
        });
        this.colLeftHit.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            if (this.isFromInsertHandle(e, this.colInsertHandle)) {
                return;
            }
            hideColLine();
        });
        this.colRightHit.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            if (this.isFromInsertHandle(e, this.colInsertHandle)) {
                return;
            }
            hideColLine();
        });
        this.colInsertHandle.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(this.colInsertHandle.dataset.colIndex, 10);
            this.parent.tableService.addColumnAt({
                blockId: this.blockElement.id,
                colIndex: index
            });
            this.hideRowGripper(); // Hides row pinned bars
            this.hideAllPinnedColBars(); // Hides col pinned bars
            requestAnimationFrame(() => {
                this.hideColUI();
            });
            this.colLeftHit.style.display = 'none';
            this.colRightHit.style.display = 'none';
            this.clearPinnedGripperSelection();
        });
    }
    isFromInsertHandle(e, insertHandle) {
        const relatedTarget = e.relatedTarget;
        return (relatedTarget !== null && insertHandle !== null && (relatedTarget === insertHandle));
    }
    /**
     * Displays a row gripper for the specified DOM row index.
     * Handles row selection, focus, pinned bar creation, and optional gripper popup.
     * Updates DOM elements, dataset attributes, and integrates with undo/redo tracking.
     *
     * @param {number} domRowIdx - The DOM/visual row index to show the gripper for.
     * @param {boolean} [isFirstRow=false] - Indicates if the row is the first row, triggering popup options.
     * @returns {void}
     *
     * @hidden
     */
    showRowGripperForDomRow(domRowIdx, isFirstRow = false) {
        const rowEl = this.table.rows[parseInt(domRowIdx.toString(), 10)];
        const cellBlock = rowEl.querySelector('.e-block');
        const props = this.blockModel.properties;
        // No gripper or popup for header
        if (props.enableHeader && domRowIdx === 0) {
            return;
        }
        const rowRect = rowEl.getBoundingClientRect();
        const blockRect = this.blockElement.getBoundingClientRect();
        this.addRowSelection(this.table, domRowIdx);
        this.focusCellsInRows([domRowIdx]);
        // Focus first cell in the row
        setCursorPosition(getBlockContentElement(cellBlock), 0);
        this.parent.setFocusToBlock(cellBlock);
        // Create and position a new pinned bar for this row
        const rowPinned = this.createPinnedRowBar();
        rowPinned.style.top = `${Math.round(rowRect.top - blockRect.top - 1)}px`;
        rowPinned.style.height = `${rowRect.height + 1}px`;
        rowPinned.classList.add('e-action-bar-active');
        rowPinned.style.display = 'flex';
        rowPinned.dataset.rowIndex = domRowIdx.toString();
        this.blockElement.appendChild(rowPinned);
        this.rowPinned = rowPinned;
        rowPinned.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const clickedDomRowIdx = parseInt(rowPinned.dataset.rowIndex, 10);
            // Clear all selections and grippers
            this.resetAllTableSelectionUI();
            // Re-show gripper + popup for the clicked row
            this.showRowGripperForDomRow(clickedDomRowIdx, true);
            // Refocus the clicked row (optional but good UX)
            const clickedRowEl = this.table.rows[parseInt(clickedDomRowIdx.toString(), 10)];
            const cellBlock = clickedRowEl.querySelector('.e-block');
            if (cellBlock) {
                setCursorPosition(getBlockContentElement(cellBlock), 0);
                this.parent.setFocusToBlock(cellBlock);
            }
        });
        this.rowActionHandle.style.display = 'none';
        this.colPinned.style.display = 'none';
        this.colPinned.classList.remove('e-action-bar-active');
        if (isFirstRow) {
            this.showGripperPopup(this.rowActionHandle, rowPinned, this.blockModel, {
                label: 'Delete Row',
                iconCss: 'e-trash',
                callback: () => { this.deleteSelectedRows(domRowIdx); }
            });
        }
    }
    deleteSelectedRows(domRowIdx) {
        const selectedRows = this.table.querySelectorAll('tr.e-row-selected');
        const selectedCount = selectedRows.length;
        const props = this.blockModel.properties;
        if (selectedCount === 0) {
            return; // nothing selected → no-op, no undo entry
        }
        if (selectedCount === 1) {
            const modelIdx = toModelRow(domRowIdx, props.enableHeader);
            this.parent.tableService.deleteRowAt({
                blockId: this.blockId,
                modelIndex: modelIdx
            });
        }
        else {
            const rowsMeta = [];
            // Collect metadata for undo/redo
            Array.from(selectedRows)
                .map((row) => parseInt(row.dataset.row, 10))
                .sort((a, b) => b - a)
                .forEach((domRowIdx) => {
                const modelIdx = toModelRow(domRowIdx, props.enableHeader);
                const rowModel = props.rows[parseInt(modelIdx.toString(), 10)];
                if (rowModel) {
                    rowsMeta.push({
                        index: modelIdx,
                        rowModel: decoupleReference(rowModel)
                    });
                }
            });
            // Track bulk undo/redo **once**
            this.parent.undoRedoAction.trackBulkRowDeletionForUndoRedo({
                blockId: this.blockId,
                rows: rowsMeta
            });
            // Perform deletions (skip internal single tracking)
            rowsMeta.forEach(({ index }) => {
                this.parent.tableService.deleteRowAt({
                    blockId: this.blockId,
                    modelIndex: index,
                    isUndoRedoAction: true
                });
            });
        }
    }
    /**
     * Displays a column gripper for the specified DOM column index.
     * Handles column selection, focus, pinned bar creation, and optional gripper popup.
     * Updates DOM elements, dataset attributes, and integrates with undo/redo tracking.
     *
     * @param {number} domColIdx - The DOM/visual column index to show the gripper for.
     * @param {boolean} [isFirstCol=false] - Indicates if the column is the first column, triggering popup options.
     * @returns {void}
     *
     * @hidden
     */
    showColGripperForDomCol(domColIdx, isFirstCol = false) {
        const props = this.blockModel.properties;
        // 1. Get top cell for popup positioning (header if exists, else first body)
        let topCell;
        if (props.enableHeader) {
            const headerCells = this.table.querySelectorAll('thead th:not(.e-row-number)');
            topCell = headerCells[parseInt(domColIdx.toString(), 10)];
        }
        else {
            topCell = getDataCell(this.table, 0, domColIdx);
        }
        // 2. Get target cell for focus + pinned bar positioning (body cell, or header if no body logic needed)
        const headerCell = props.enableHeader
            ? this.table.querySelectorAll('thead th:not(.e-row-number)')[parseInt(domColIdx.toString(), 10)]
            : null;
        const targetCell = getDataCell(this.table, (headerCell ? 1 : 0), domColIdx);
        const cellBlock = targetCell.querySelector('.e-block');
        const cellRect = targetCell.getBoundingClientRect();
        const blockRect = this.blockElement.getBoundingClientRect();
        // Add column selection without clearing others
        this.addColumnSelection(this.table, domColIdx);
        // add e-cell-focus class to selected col cells
        this.focusCellsInColumns([domColIdx]);
        // Focus
        setCursorPosition(getBlockContentElement(cellBlock), 0);
        this.parent.setFocusToBlock(cellBlock);
        let colPinnedLeftOffset = cellRect.left - blockRect.left;
        let colPinnedWidth = cellRect.width;
        if (headerCell) {
            const headerRect = headerCell.getBoundingClientRect();
            const headerBorderValue = Math.round(parseFloat(getComputedStyle(headerCell).borderWidth));
            colPinnedLeftOffset = (headerRect.left - headerBorderValue) - blockRect.left;
            colPinnedWidth = headerRect.width + headerBorderValue;
        }
        // Create and position pinned bar
        const colPinned = this.createPinnedColBar();
        colPinned.style.left = `${colPinnedLeftOffset}px`;
        colPinned.style.width = `${colPinnedWidth}px`;
        colPinned.classList.add('e-action-bar-active');
        colPinned.style.display = 'flex';
        colPinned.dataset.colIndex = domColIdx.toString();
        this.blockElement.appendChild(colPinned);
        this.colPinned = colPinned;
        colPinned.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const clickedDomColIdx = parseInt(colPinned.dataset.colIndex, 10);
            // Focus only this column (clear others + re-apply this one)
            this.focusSinglePinnedColumn(clickedDomColIdx);
        });
        // Hide regular handles
        this.colActionHandle.style.display = 'none';
        if (isFirstCol) {
            this.showGripperPopup(this.colActionHandle, colPinned, this.blockModel, {
                label: 'Delete Column',
                iconCss: 'e-trash',
                callback: () => { this.deleteSelectedColumns(); }
            });
        }
    }
    deleteSelectedColumns() {
        const props = this.blockModel.properties;
        const selectedCells = this.blockElement.querySelectorAll('td.e-col-selected, th.e-col-selected');
        const uniqueColIndices = new Set();
        selectedCells.forEach((cell) => {
            const colIdx = parseInt(cell.dataset.col || '-1', 10);
            if (colIdx >= 0) {
                uniqueColIndices.add(colIdx);
            }
        });
        const selectedCount = uniqueColIndices.size;
        const totalDataColumns = props.columns.length;
        if (selectedCount === totalDataColumns && totalDataColumns > 0) {
            // Full table columns selected → delete entire block directly
            const block = getBlockModelById(this.blockId, this.parent.getEditorBlocks());
            const blockElement = this.parent.getBlockElementById(this.blockId);
            const adjacentBlock = (blockElement.nextElementSibling || blockElement.previousElementSibling);
            if (adjacentBlock) {
                this.parent.setFocusAndUIForNewBlock(adjacentBlock);
            }
            if (block && blockElement) {
                this.parent.lastHighlightedBlockId = this.blockId;
                this.parent.execCommand({
                    command: 'DeleteBlock',
                    state: {
                        blockElement,
                        isUndoRedoAction: false,
                        preventMinimumOne: true,
                        preventEventTrigger: false
                    }
                });
            }
            return;
        }
        const sortedIndices = Array.from(uniqueColIndices).sort((a, b) => b - a);
        if (sortedIndices.length > 1) {
            const colsMeta = [];
            sortedIndices.forEach((dataColIdx) => {
                const colModel = props.columns[parseInt(dataColIdx.toString(), 10)];
                const columnCells = props.rows.map((r) => {
                    const cell = r.cells[parseInt(dataColIdx.toString(), 10)];
                    return decoupleReference(cell);
                });
                colsMeta.push({
                    index: dataColIdx,
                    columnModel: decoupleReference(colModel),
                    columnCells
                });
            });
            this.parent.undoRedoAction.trackBulkColumnDeletionForUndoRedo({
                blockId: this.blockId,
                cols: colsMeta
            });
            sortedIndices.forEach((dataColIdx) => {
                this.parent.tableService.deleteColumnAt({
                    blockId: this.blockId,
                    colIndex: dataColIdx,
                    isUndoRedoAction: true
                });
            });
        }
        else if (sortedIndices.length === 1) {
            // Single column — normal deletion
            this.parent.tableService.deleteColumnAt({
                blockId: this.blockId,
                colIndex: sortedIndices[0]
            });
        }
    }
    focusSinglePinnedColumn(domColIdx) {
        // Clear everything first
        this.resetAllTableSelectionUI();
        // Re-select only the clicked column
        this.addColumnSelection(this.table, domColIdx);
        this.focusCellsInColumns([domColIdx]);
        // Re-show gripper + popup for the clicked column
        this.showColGripperForDomCol(domColIdx, true);
        // Refocus the first body cell in that column (or header if no body)
        const props = this.blockModel.properties;
        const startRow = props.enableHeader ? 1 : 0; // skip header if present
        const rowEl = this.table.tBodies[0].rows[parseInt(startRow.toString(), 10)];
        const domCol = toDomCol(domColIdx, props.enableRowNumbers);
        const cell = rowEl.cells[parseInt(domCol.toString(), 10)];
        this.parent.tableService.removeCellFocus(this.table);
        this.parent.tableService.addCellFocus(cell, true);
        const cellBlock = cell.querySelector('.e-block');
        setCursorPosition(getBlockContentElement(cellBlock), 0);
        this.parent.setFocusToBlock(cellBlock);
    }
    /**
     * Adds a selection state to the specified row in the table.
     * Does not clear previous selections, allowing multiple rows to be selected.
     *
     * @param {HTMLTableElement} table - The table element containing the row.
     * @param {number} rowIndex - The index of the row to mark as selected.
     * @returns {void}
     *
     * @hidden
     */
    addRowSelection(table, rowIndex) {
        // Add selection without removing previous
        if (rowIndex == null || rowIndex < 0) {
            return;
        }
        const row = table.rows[rowIndex];
        if (row) {
            row.classList.add('e-row-selected');
        }
    }
    createPinnedRowBar() {
        const pinned = createElement('div', { className: 'e-row-action-handle e-pinned e-action-handle', attrs: { contenteditable: 'false', 'data-icon-type': 'row' } });
        const pinnedIcon = createElement('span', { className: 'e-icons e-block-drag-icon' });
        pinned.appendChild(pinnedIcon);
        return pinned;
    }
    /**
     * Hides all pinned row grippers from the table block element.
     * Removes pinned row action handles from the DOM and restores the default row action handle display.
     *
     * @returns {void}
     *
     * @hidden
     */
    hideRowGripper() {
        const allPinnedRows = this.blockElement.querySelectorAll('.e-row-action-handle.e-pinned');
        allPinnedRows.forEach((pinned) => {
            pinned.parentElement.removeChild(pinned);
        });
        if (this.rowActionHandle) {
            this.rowActionHandle.style.display = 'none';
        }
    }
    // 6) Row/Col action handle wiring
    wireActionHandles() {
        // Row action
        this.rowActionHandle.addEventListener('click', (e) => {
            if (this.rowInsertHandle.style.display !== 'none') {
                return;
            }
            e.preventDefault();
            const domRowIdx = parseInt(this.rowActionHandle.dataset.rowIndex, 10);
            if (e.shiftKey) {
                let start;
                let end;
                // Case 1: Anchor already set from previous gripper click
                if (this.lastRowAnchorIndex !== null) {
                    start = Math.min(this.lastRowAnchorIndex, domRowIdx);
                    end = Math.max(this.lastRowAnchorIndex, domRowIdx);
                }
                // Case 2: No anchor → fall back to currently selected rows (mouse drag / Shift+Arrow)
                else {
                    const selectedRows = this.table.querySelectorAll('tr.e-row-selected');
                    if (selectedRows.length === 0) {
                        // No existing selection → treat as normal single click
                        start = end = domRowIdx;
                    }
                    else {
                        const indices = Array.from(selectedRows).map((tr) => parseInt(tr.dataset.row, 10));
                        start = Math.min(...indices, domRowIdx);
                        end = Math.max(...indices, domRowIdx);
                    }
                }
                this.removeRowColSelection(this.table);
                this.hideRowGripper();
                this.hideAllPinnedColBars();
                this.parent.tableService.removeCellFocus(this.table);
                let isFirst = true;
                for (let rowIndex = start; rowIndex <= end; rowIndex++) {
                    if (!this.hasPinnedRowGripper(rowIndex)) {
                        this.showRowGripperForDomRow(rowIndex, isFirst);
                        isFirst = false;
                    }
                }
            }
            else {
                // Normal single click (unchanged)
                this.resetAllTableSelectionUI();
                this.showRowGripperForDomRow(domRowIdx, true);
                // Remember this row as anchor for next Shift+click
                this.lastRowAnchorIndex = domRowIdx;
            }
        });
        // Column action
        this.colActionHandle.addEventListener('mousedown', (e) => e.preventDefault());
        this.colActionHandle.addEventListener('click', (e) => {
            if (this.colInsertHandle.style.display !== 'none') {
                return;
            }
            e.preventDefault();
            const domColIdx = parseInt(this.colActionHandle.dataset.colIndex, 10);
            if (e.shiftKey) {
                let start;
                let end;
                // Case 1: Anchor already set from previous gripper click
                if (this.lastColAnchorIndex !== null) {
                    start = Math.min(this.lastColAnchorIndex, domColIdx);
                    end = Math.max(this.lastColAnchorIndex, domColIdx);
                }
                // Case 2: No anchor → fall back to currently selected columns (mouse drag / Shift+Arrow)
                else {
                    const selectedColCells = this.table.querySelectorAll('td.e-col-selected, th.e-col-selected');
                    if (selectedColCells.length === 0) {
                        // No existing selection → treat as normal single click
                        start = end = domColIdx;
                    }
                    else {
                        const indices = [];
                        const colMap = new Set(); // to deduplicate
                        Array.from(selectedColCells).forEach((cell) => {
                            const col = parseInt(cell.dataset.col, 10);
                            if (!colMap.has(col)) {
                                colMap.add(col);
                                indices.push(col);
                            }
                        });
                        start = Math.min(...indices, domColIdx);
                        end = Math.max(...indices, domColIdx);
                    }
                }
                this.resetAllTableSelectionUI();
                let isFirst = true;
                for (let colIndex = start; colIndex <= end; colIndex++) {
                    if (!this.hasPinnedColGripper(colIndex)) {
                        this.showColGripperForDomCol(colIndex, isFirst);
                        isFirst = false;
                    }
                }
            }
            else {
                // Normal single click (unchanged)
                this.resetAllTableSelectionUI();
                this.showColGripperForDomCol(domColIdx, true);
                // Remember this column as anchor for next Shift+click
                this.lastColAnchorIndex = domColIdx;
            }
        });
    }
    hasPinnedColGripper(colIndex) {
        return !!this.blockElement.querySelector(`.e-col-action-handle.e-pinned[data-col-index="${colIndex}"]`);
    }
    hasPinnedRowGripper(rowIndex) {
        return !!this.blockElement.querySelector(`.e-row-action-handle.e-pinned[data-row-index="${rowIndex}"]`);
    }
    /**
     * Adds a selection state to the specified column in the table.
     * Does not clear previous selections, allowing multiple columns to be selected.
     *
     * @param {HTMLTableElement} table - The table element containing the column.
     * @param {number} colIndex - The index of the column to mark as selected.
     * @returns {void}
     *
     * @hidden
     */
    addColumnSelection(table, colIndex) {
        if (colIndex == null || colIndex < 0) {
            return;
        }
        Array.from(table.rows).forEach((r) => {
            const cells = Array.from(r.cells).filter((cell) => !cell.classList.contains('e-row-number'));
            if (cells[parseInt(colIndex.toString(), 10)]) {
                cells[parseInt(colIndex.toString(), 10)].classList.add('e-col-selected');
            }
        });
    }
    createPinnedColBar() {
        const pinned = createElement('div', {
            className: 'e-col-action-handle e-pinned e-action-handle',
            attrs: { contenteditable: 'false', 'data-icon-type': 'col' }
        });
        const icon = createElement('span', { className: 'e-icons e-block-drag-icon' });
        icon.style.transform = 'rotate(90deg)';
        pinned.appendChild(icon);
        return pinned;
    }
    /**
     * Removes all pinned column bars from the table block element.
     * Queries for pinned column action handles and deletes them from the DOM.
     *
     * @returns {void}
     *
     * @hidden
     */
    hideAllPinnedColBars() {
        const allPinnedCols = this.blockElement.querySelectorAll('.e-col-action-handle.e-pinned');
        allPinnedCols.forEach((el) => el.remove());
    }
    // 7) Table focus, mouseleave, and outside-click cleanup
    wireFocusAndCleanup() {
        this.table.addEventListener('focusin', () => {
            this.removeRowColSelection(this.table);
            this.rowPinned.style.display = 'none';
            this.colPinned.style.display = 'none';
        });
        this.blockElement.addEventListener('mouseleave', () => {
            this.hideRowUI();
            this.hideColUI();
            this.hideHitZones();
            this.rowTopDot.style.visibility = '';
            this.rowBottomDot.style.visibility = '';
            this.colLeftDot.style.visibility = '';
            this.colRightDot.style.visibility = '';
            this.colResizeHandle.style.display = 'none';
        });
        this.table.addEventListener('mousedown', (e) => {
            const target = e.target;
            const cell = target.closest('td, th');
            if (!cell || (cell && cell.classList.contains('e-row-number'))) {
                return;
            }
            if (cell.classList.contains('e-cell-focus')) {
                const selectedCells = getSelectedCells(this.blockElement);
                if (selectedCells && selectedCells.length === 1) {
                    return;
                }
            }
            this.parent.tableService.removeCellFocus(this.table);
            this.parent.tableService.addCellFocus(cell, true);
            this.hideRowGripper();
            this.hideAllPinnedColBars();
        });
        const onDocClick = (e) => {
            const t = e.target;
            const inside = !!t.closest(`table.e-table-element[data-block-id="${this.blockId}"]`);
            const blkEl = t.closest('.e-table-block');
            const tableSlashItem = t.closest('.e-list-item[data-value="Table"]');
            if (inside || (blkEl && blkEl.contains(t)) || tableSlashItem) {
                return;
            }
            this.removeRowColSelection(this.table);
            document.querySelectorAll('.e-row-action-handle.e-pinned').forEach((node) => (node.style.display = 'none'));
            document.querySelectorAll('.e-col-action-handle.e-pinned').forEach((node) => (node.style.display = 'none'));
            if (this.parent.tableService) {
                this.parent.tableService.removeCellFocus(this.table);
            }
        };
        document.addEventListener('click', onDocClick);
    }
    // 8) Observers and sync helpers
    wireObservers() {
        const RO = window.ResizeObserver;
        if (RO) {
            const ro = new RO(() => { this.syncRowUI(); });
            ro.observe(this.table);
            Array.from(this.table.rows).forEach((r) => ro.observe(r));
            Array.from(this.table.querySelectorAll('th')).forEach((th) => ro.observe(th));
        }
        this.parent.observer.on('handleEscapeKey', this.handleEscapeAction, this);
    }
    // 9) Column resize wiring
    wireColResize() {
        let startMouseX = 0;
        let initialColumnWidthPx = 0;
        let initialHoverLineLeft = 0;
        let resizingColumnIndex = -1; // data index of the column being resized
        let tableRect;
        let blockRect;
        // Clamp width and compute hover line position
        const computeResizedValues = (deltaX) => {
            const unclampedWidth = initialColumnWidthPx + deltaX;
            const newWidthPx = Math.max(TABLE_COL_MIN_WIDTH, unclampedWidth);
            return newWidthPx;
        };
        const onMouseMove = (e) => {
            if (!this.isResizing) {
                return;
            }
            e.preventDefault();
            this.hideColUI();
            const deltaX = (e.clientX + this.tableContainer.scrollLeft) - startMouseX;
            const props = this.blockModel.properties;
            const colgroup = this.table.querySelector('colgroup');
            const domColIndex = toDomCol(resizingColumnIndex, props.enableRowNumbers);
            const newWidthPx = computeResizedValues(deltaX);
            // Update left column width (Only DOM here)
            const leftColEl = colgroup.children[domColIndex];
            leftColEl.style.width = `${newWidthPx.toFixed(0)}px`;
            // Update hover line
            this.colHoverLine.style.display = 'block';
            this.colHoverLine.style.left = `${leftColEl.getBoundingClientRect().right - blockRect.left - 2}px`;
            this.colHoverLine.style.height = this.table.getBoundingClientRect().height - 2 + 'px';
            this.colResizeHandle.style.left = `${leftColEl.getBoundingClientRect().right - blockRect.left - 2}px`;
            this.colHoverLine.style.display = 'block';
            // Shrink table width when dragging left
            if (deltaX < 0) {
                const currentTableWidth = this.table.offsetWidth;
                this.table.style.width = `${currentTableWidth + deltaX}px`;
            }
        };
        const onMouseUp = (e) => {
            if (!this.isResizing) {
                return;
            }
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            const deltaX = (e.clientX + this.tableContainer.scrollLeft) - startMouseX;
            if (deltaX === 0) {
                this.colHoverLine.style.display = 'none';
                setResizeStatus(false);
                return;
            }
            const newWidthPx = computeResizedValues(deltaX);
            const props = this.blockModel.properties;
            const oldBlock = decoupleReference(getBlockModelById(this.blockId, this.parent.getEditorBlocks()));
            // Final update
            const colgroup = this.table.querySelector('colgroup');
            const domColIndex = toDomCol(resizingColumnIndex, props.enableRowNumbers);
            const leftColEl = colgroup.children[domColIndex];
            leftColEl.style.width = `${newWidthPx.toFixed(0)}px`;
            props.columns[resizingColumnIndex].width = `${newWidthPx.toFixed(0)}px`;
            this.colHoverLine.style.display = 'none';
            setResizeStatus(false);
            // Notify changes and track
            this.parent.tableService.triggerBlockUpdate(this.blockModel, oldBlock);
            this.parent.undoRedoAction.trackTableColumnResizeForUndoRedo({
                blockId: this.blockId,
                resizedColIndex: resizingColumnIndex,
                oldWidthValue: initialColumnWidthPx,
                newWidthValue: newWidthPx
            });
        };
        // Start resize
        this.colResizeHandle.addEventListener('mousedown', (e) => {
            const props = this.blockModel.properties;
            if (props.readOnly) {
                return;
            }
            e.preventDefault();
            this.clearPinnedGripperSelection();
            this.hideColUI();
            this.hideRowUI();
            this.parent.tableService.removeCellFocus(this.table);
            const colIndexAttr = this.colResizeHandle.getAttribute('data-resize-index');
            if (!colIndexAttr) {
                return;
            }
            resizingColumnIndex = parseInt(colIndexAttr, 10);
            // Switch to px mode if not already
            if (this.table.getAttribute('data-col-width-mode') !== 'px') {
                this.convertColgroupToPxMode();
            }
            tableRect = this.table.getBoundingClientRect();
            blockRect = this.blockElement.getBoundingClientRect();
            const colgroup = this.table.querySelector('colgroup');
            const domColIndex = toDomCol(resizingColumnIndex, props.enableRowNumbers);
            const columnEl = colgroup.children[domColIndex];
            initialColumnWidthPx = columnEl.getBoundingClientRect().width;
            startMouseX = e.clientX + this.tableContainer.scrollLeft;
            initialHoverLineLeft = columnEl.getBoundingClientRect().right - blockRect.left - 2;
            // Show hover line
            this.colHoverLine.style.top = `${tableRect.top - blockRect.top}px`;
            this.colHoverLine.style.height = `${tableRect.height - 2}px`;
            this.colHoverLine.style.left = `${initialHoverLineLeft}px`;
            this.colHoverLine.style.display = 'block';
            this.colResizeHandle.style.left = `${initialHoverLineLeft}px`;
            this.colHoverLine.style.display = 'block';
            document.body.style.userSelect = 'none';
            setResizeStatus(true);
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
        // Hide UI elements on horizontal scroll
        this.table.parentElement.addEventListener('scroll', () => {
            this.hideColUI();
            this.hideRowUI();
            this.hideHitZones();
            this.clearPinnedGripperSelection();
        });
        const setResizeStatus = (value) => {
            this.isResizing = value;
            this.table.setAttribute('data-resizing', value ? 'true' : 'false');
        };
    }
    convertColgroupToPxMode() {
        const props = this.blockModel.properties;
        const colgroup = this.table.querySelector('colgroup');
        props.columns.forEach((col, i) => {
            const domIdx = toDomCol(i, props.enableRowNumbers);
            const colEl = colgroup.children[domIdx];
            const currentWidthPx = colEl.getBoundingClientRect().width;
            const pxWidth = currentWidthPx.toFixed(0);
            colEl.style.width = `${pxWidth}px`;
            col.width = `${pxWidth}px`;
        });
        setTableWidthMode(this.table, 'px');
        this.parent.observer.on('handleEscapeKey', this.handleEscapeAction, this);
    }
    syncRowUI() {
        if (!this.hoveredRow || (this.table && this.table.querySelectorAll('tr.e-row-selected').length > 1)) {
            return;
        }
        const rowRect = this.hoveredRow.getBoundingClientRect();
        const blockRect = this.blockElement.getBoundingClientRect();
        const xLeft = this.table.offsetLeft - 8;
        this.rowTopDot.style.left = `${xLeft - 4}` + 'px';
        this.rowBottomDot.style.left = `${xLeft - 4}` + 'px';
        this.rowTopDot.style.top = `${rowRect.top - blockRect.top - 3}` + 'px';
        this.rowBottomDot.style.top = `${rowRect.bottom - blockRect.top - 3}` + 'px';
        if (this.rowActionHandle.style.display !== 'none') {
            this.rowActionHandle.style.top = `${rowRect.top - blockRect.top}` + 'px';
            this.rowActionHandle.style.height = `${rowRect.height}` + 'px';
        }
        const pinnedRow = this.blockElement.querySelector('.e-row-action-handle.e-pinned');
        if (pinnedRow && pinnedRow.style.display !== 'none') {
            pinnedRow.style.top = `${rowRect.top - blockRect.top}` + 'px';
            pinnedRow.style.height = `${rowRect.height}` + 'px';
        }
    }
    hideRowUI() {
        this.rowInsertHandle.style.display = 'none';
        this.rowHoverLine.style.display = 'none';
        this.rowActionHandle.style.display = 'none';
        this.rowTopDot.style.display = 'none';
        this.rowBottomDot.style.display = 'none';
    }
    hideColUI() {
        this.colInsertHandle.style.display = 'none';
        this.colHoverLine.style.display = 'none';
        this.colActionHandle.style.display = 'none';
        this.colLeftDot.style.display = 'none';
        this.colRightDot.style.display = 'none';
    }
    hideHitZones() {
        [this.rowTopHit, this.rowBottomHit, this.colLeftHit, this.colRightHit].forEach((el) => el.style.display = 'none');
    }
    /**
     * Removes all row and column selection states from the given table.
     * Clears the `e-row-selected` class from rows and the `e-col-selected` class from cells.
     *
     * @param {HTMLTableElement} table - The table element to clear selections from.
     * @returns {void}
     *
     * @hidden
     */
    removeRowColSelection(table) {
        Array.from(table.rows).forEach((r) => r.classList.remove('e-row-selected'));
        Array.from(table.querySelectorAll('td, th')).forEach((c) => {
            const cell = c;
            cell.classList.remove('e-col-selected');
        });
        this.lastRowAnchorIndex = null;
        this.lastColAnchorIndex = null;
    }
    clearPinnedGripperSelection() {
        // Clear selections
        this.removeRowColSelection(this.table);
        // hide pinned handles
        this.rowPinned.style.display = 'none';
        this.rowPinned.classList.remove('e-action-bar-active');
        this.colPinned.style.display = 'none';
        this.colPinned.classList.remove('e-action-bar-active');
        this.lastRowAnchorIndex = null;
        this.lastColAnchorIndex = null;
    }
    showGripperPopup(actionHandle, pinnedActionHandle, blockModel, action) {
        const existingPopup = this.parent.rootEditorElement.querySelector('.e-table-gripper-action-popup');
        if (existingPopup && existingPopup.parentElement) {
            existingPopup.parentElement.removeChild(existingPopup);
        }
        const popup = createElement('div', {
            className: 'e-table-gripper-action-popup'
        });
        this.parent.rootEditorElement.appendChild(popup);
        const item = createElement('div', {
            className: `e-table-gripper-action-item e-icons ${action.iconCss}`
        });
        item.setAttribute('title', 'Delete');
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            try {
                action.callback();
            }
            finally {
                // Cleanup
                if (this.popupObj && this.parent && this.parent.popupRenderer) {
                    this.popupObj.hide();
                    this.parent.popupRenderer.destroyPopup(this.popupObj);
                    this.popupObj = null;
                }
                actionHandle.style.display = 'none';
                pinnedActionHandle.style.display = 'none';
                this.hideRowGripper();
                this.hideAllPinnedColBars();
            }
        });
        popup.appendChild(item);
        const iconType = actionHandle.getAttribute('data-icon-type');
        const args = {
            element: popup,
            content: item,
            width: 'auto',
            height: 'auto',
            relateTo: actionHandle,
            position: { X: 'left', Y: 'top' },
            offsetX: iconType === 'col' ? 20 : -11,
            offsetY: iconType === 'col' ? -8 : 21
        };
        this.popupObj = this.parent.popupRenderer.renderPopup(args);
        this.popupObj.show();
        this.parent.popupRenderer.adjustPopupPositionRelativeToTarget(pinnedActionHandle, this.popupObj);
        const removePopup = (e) => {
            const target = e.target;
            // Find the current popup from DOM (not from closure)
            const currentPopup = this.parent.rootEditorElement.querySelector('.e-table-gripper-action-popup');
            if (currentPopup && !currentPopup.contains(target) && !target.closest('.e-action-handle')) {
                this.handleRemovePopup();
                document.removeEventListener('mousedown', removePopup);
            }
        };
        document.addEventListener('mousedown', removePopup);
    }
    /**
     * Handles removal of the active popup instance.
     * Hides the popup, destroys it via the parent renderer, and clears the reference.
     *
     * @returns {void}
     *
     * @hidden
     */
    handleRemovePopup() {
        if (this.popupObj && this.parent && this.parent.popupRenderer) {
            this.popupObj.hide();
            this.parent.popupRenderer.destroyPopup(this.popupObj);
            this.popupObj = null;
        }
    }
    handleEscapeAction() {
        this.handleRemovePopup();
        const isColumnGripper = this.colPinned.classList.contains('e-action-bar-active');
        const isRowGripper = this.rowPinned.classList.contains('e-action-bar-active');
        if (isColumnGripper) {
            const focusCell = this.table.querySelector('thead th.e-col-selected');
            if (focusCell) {
                this.parent.tableService.addCellFocus(focusCell, true);
            }
        }
        else if (isRowGripper) {
            const selectedRow = this.table.querySelector('.e-row-selected');
            if (selectedRow) {
                const focusCell = selectedRow.querySelector('td:not(.e-row-number)');
                this.parent.tableService.addCellFocus(focusCell, true);
            }
        }
        this.clearPinnedGripperSelection();
    }
    focusCellsInRows(rowIndices) {
        rowIndices.forEach((rowIndex) => {
            const row = this.table.rows[parseInt(rowIndex.toString(), 10)];
            if (!row) {
                return;
            }
            Array.from(row.cells).forEach((cell) => {
                if (!cell.classList.contains('e-row-number')) {
                    cell.classList.add(TABLE_CELL_FOCUS);
                }
            });
        });
    }
    focusCellsInColumns(colIndices) {
        const props = this.blockModel.properties;
        const enableRowNumbers = props.enableRowNumbers;
        colIndices.forEach((colIndex) => {
            const domCol = toDomCol(colIndex, enableRowNumbers);
            for (let r = 0; r < this.table.rows.length; r++) {
                const cell = this.table.rows[parseInt(r.toString(), 10)].cells[parseInt(domCol.toString(), 10)];
                if (cell && !cell.classList.contains('e-row-number')) {
                    cell.classList.add(TABLE_CELL_FOCUS);
                }
            }
        });
    }
    /**
     * Resets all row/column selection UI states: clears visual selection classes,
     * hides floating and pinned grippers (both row and column), and removes cell focus.
     * @returns {void}
     *
     * @hidden
     */
    resetAllTableSelectionUI() {
        this.removeRowColSelection(this.table); // clears .e-row-selected / .e-col-selected
        this.hideRowGripper(); // hides floating row gripper
        this.hideAllPinnedColBars(); // hides floating column grippers
        this.parent.tableService.removeCellFocus(this.table); // removes .e-cell-focus from all cells
    }
    destroy() {
        this.rowInsertHandle = null;
        this.rowActionHandle = null;
        this.rowHoverLine = null;
        this.rowTopDot = null;
        this.rowBottomDot = null;
        this.colInsertHandle = null;
        this.colActionHandle = null;
        this.colHoverLine = null;
        this.colLeftDot = null;
        this.colRightDot = null;
        this.rowPinned = null;
        this.colPinned = null;
        this.rowTopHit = null;
        this.rowBottomHit = null;
        this.colLeftHit = null;
        this.colRightHit = null;
        // State
        this.hoveredRow = null;
        this.hoveredColIndex = null;
        this.isMultiSelecting = null;
        // Instance
        if (this.popupObj) {
            this.parent.popupRenderer.destroyPopup(this.popupObj);
            this.popupObj = null;
        }
        this.parent.observer.off('handleEscapeKey', this.handleEscapeAction);
    }
}

class TableRenderer {
    constructor(editor) {
        this.uiManagers = new Map();
        this.nonEditableElements = [
            'e-row-insert-handle',
            'e-col-insert-handle',
            'e-row-action-handle',
            'e-col-action-handle',
            'e-row-dot',
            'e-col-dot',
            'e-row-dot-hit',
            'e-col-dot-hit',
            'e-row-number'
        ];
        this.parent = editor;
        this.addEventListener();
    }
    addEventListener() {
        this.parent.observer.on('input', this.handleHeaderInput, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListener() {
        this.parent.observer.off('input', this.handleHeaderInput);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    /**
     * Renders the table block element in the editor
     *
     * @param {BlockModel} block - The data model of the block, used to determine available actions and state.
     * @param {HTMLElement} blockElement - The root DOM element representing the table block.
     * @returns {HTMLElement} - The table container element
     * @hidden
     */
    renderTable(block, blockElement) {
        blockElement.classList.add(TABLE_BLOCK_CLS);
        const props = block.properties;
        const blockId = block.id;
        const tableContainer = createElement('div', {
            className: 'e-table-container e-scrollable-block'
        });
        const table = createElement('table', {
            className: 'e-table-element',
            attrs: {
                'data-block-id': blockId,
                'data-col-counter': `${(props.columns).length}`,
                'role': 'grid',
                'style': `width: ${formatUnit(props.width)}`
            }
        });
        tableContainer.appendChild(table);
        // Create colgroup for column width management
        const colgroup = createElement('colgroup');
        table.appendChild(colgroup);
        if (props.enableRowNumbers) {
            const rnCol = createElement('col');
            rnCol.classList.add('e-col-row-number');
            rnCol.style.width = '44px'; // fixed width for row numbers
            colgroup.appendChild(rnCol);
        }
        const colCount = props.columns.length;
        const newWidth = (100 / colCount).toLocaleString() + '%';
        // Add columns with specified widths or default
        for (let i = 0; i < colCount; i++) {
            const col = createElement('col');
            col.style.width = props.columns[i].width ? formatUnit(props.columns[i].width) : newWidth;
            colgroup.appendChild(col);
        }
        if (props.enableHeader && colCount > 0) {
            const thead = createElement('thead');
            const headerRow = createElement('tr');
            if (props.enableRowNumbers) {
                const thRN = createElement('th', {
                    className: 'e-row-number',
                    attrs: { 'aria-hidden': 'true', tabindex: '-1', contenteditable: 'false' }
                });
                headerRow.appendChild(thRN);
            }
            props.columns.forEach((c, cIdx) => {
                const th = createElement('th');
                th.textContent = c.headerText;
                th.dataset.row = '0';
                th.dataset.col = cIdx.toString();
                th.tabIndex = 0;
                th.setAttribute('role', 'columnheader');
                th.setAttribute('title', c.headerText);
                th.setAttribute('contenteditable', 'true');
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);
        }
        const tbody = createElement('tbody');
        props.rows.forEach((row, rIdx) => {
            const visualIndex = props.enableHeader ? rIdx + 1 : rIdx;
            tbody.appendChild(this.parent.tableService.createRow(visualIndex, props, block, row));
        });
        table.appendChild(tbody);
        if (!props.readOnly) {
            this.attachHoverUI(table, blockElement, block);
            this.parent.tableSelectionManager.attachTableEvents(table, blockElement);
        }
        else {
            this.updateTableReadyOnlyState(table, props.readOnly);
        }
        return tableContainer;
    }
    /**
     * Refreshes the column width and it's mode based on available container width
     *
     * @param {BlockModel} block - The data model of the block.
     * @returns {void}
     * @hidden
     */
    refreshColWidths(block) {
        const blockElement = this.parent.getBlockElementById(block.id);
        const props = block.properties;
        const colCount = props.columns.length;
        const table = blockElement.querySelector('table');
        // === NEW: Decide width mode on initial render ===
        let usePxMode = false;
        let defaultWidthsPx = [];
        if (colCount > 0) {
            const containerWidth = table.clientWidth;
            // Check if equal % would violate min width
            const projectedPx = containerWidth / colCount;
            if (projectedPx < TABLE_NEW_COL_WIDTH) {
                usePxMode = true;
            }
            // Pre-compute px widths if switching to px mode
            if (usePxMode) {
                const equalPx = Math.max(TABLE_NEW_COL_WIDTH, Math.floor(containerWidth / colCount));
                defaultWidthsPx = Array(colCount).fill(equalPx);
                setTableWidthMode(table, 'px');
            }
        }
        const dataCols = getColgroupChildren(table);
        // Apply columns with correct width mode
        dataCols.forEach((colEl, i) => {
            // Respect the user provided width if any
            if (props.columns[i].width) {
                return;
            }
            if (usePxMode) {
                const widthPx = defaultWidthsPx[i];
                colEl.style.width = `${widthPx}px`;
                props.columns[i].width = `${widthPx}px`; // sync model
            }
            else {
                const pct = (100 / colCount).toFixed(2) + '%';
                colEl.style.width = pct;
                props.columns[i].width = pct;
            }
        });
    }
    /**
     * Attaches unified hover UI elements (dots, hit-zones, drag lines, action menu, and insert handles)
     * to the specified block when the mouse hovers over it
     *
     * @param {HTMLTableElement} table - The table element associated with the block (used for certain block types).
     * @param {HTMLElement} blockElement - The root DOM element representing the table block.
     * @param {BlockModel} blockModel - The data model of the block, used to determine available actions and state.
     * @returns {void}
     * @hidden
     */
    attachHoverUI(table, blockElement, blockModel) {
        const uiManager = this.registerUIManager(blockElement.id);
        uiManager.init(table, blockElement, blockModel);
    }
    /**
     * Removes the created ui manager instance for the particular block
     *
     * @param {string} blockId - The id of the table block
     * @returns {void}
     * @hidden
     */
    removeHoverUI(blockId) {
        const uiManager = this.getManager(blockId);
        if (uiManager) {
            uiManager.destroy();
            this.uiManagers.delete(blockId);
        }
    }
    /**
     * Registers the UI manager instance in map for retrieving.
     *
     * @param {string} blockId - The id of the table block
     * @returns {TableUIManager} - Manager instance
     * @hidden
     */
    registerUIManager(blockId) {
        const manager = new TableUIManager(this.parent);
        this.uiManagers.set(blockId, manager);
        return manager;
    }
    /**
     * Fetches the UI manager instance based on blockId.
     *
     * @param {string} blockId - The id of the table block
     * @returns {TableUIManager} - Manager instance
     * @hidden
     */
    getManager(blockId) {
        return this.uiManagers.get(blockId);
    }
    /**
     * Updates the read-only state of a table block by toggling content editing capabilities.
     *
     * @param {HTMLTableElement} element - The table element to update.
     * @param {boolean} value - `true` to make the table read-only, `false` to make it editable.
     * @returns {void}
     * @hidden
     */
    updateTableReadyOnlyState(element, value) {
        let editableElements = Array.from(element.querySelectorAll(`[contenteditable='${value}']`));
        editableElements = editableElements.filter((element) => {
            return !this.nonEditableElements.some((className) => element.classList.contains(className));
        });
        editableElements.forEach((element) => {
            element.contentEditable = (!value).toString();
            element.dataset.tableReadonlyProcessed = 'true';
        });
        element.classList.toggle('e-readonly', value);
    }
    /**
     * Based on current focused cell element, resolves the context and returns it.
     *
     * @returns {TableContext} - The context object containing details about current focused table
     * @hidden
     */
    resolveTableContext() {
        const focusedEl = this.parent.currentFocusedBlock;
        const tableBlockEl = focusedEl && focusedEl.closest('.' + TABLE_BLOCK_CLS);
        if (!tableBlockEl) {
            return null;
        }
        const tableEl = tableBlockEl.querySelector('table');
        const blockId = tableEl.getAttribute('data-block-id') || tableBlockEl.id;
        const tableBlock = getBlockModelById(blockId, this.parent.getEditorBlocks());
        const props = tableBlock.properties;
        const td = focusedEl.closest('td') || tableEl.querySelector('.e-cell-focus');
        const startDataRow = props.enableHeader ? (parseInt(td.dataset.row, 10) - 1) : parseInt(td.dataset.row, 10);
        const startDataCol = parseInt(td.dataset.col, 10);
        return { tableBlockEl, tableEl, props, startDataRow, startDataCol };
    }
    handleHeaderInput() {
        const blockElement = this.parent.currentFocusedBlock;
        if (!blockElement || (blockElement && extractBlockTypeFromElement(blockElement) !== 'Table')) {
            return;
        }
        const blockModel = getBlockModelById(blockElement.id, this.parent.getEditorBlocks());
        const props = blockModel.properties;
        const tableHeaders = blockElement.querySelectorAll('thead th:not(.e-row-number)');
        const oldColumns = decoupleReference(props.columns);
        tableHeaders.forEach((headerElement) => {
            const colIndex = parseInt(headerElement.getAttribute('data-col'), 10);
            const updatedHeaderText = headerElement.textContent;
            props.columns[colIndex].headerText = updatedHeaderText;
        });
        const updatedColumns = decoupleReference(props.columns);
        this.parent.undoRedoAction.trackTableHeaderInputForUndoRedo({
            blockId: blockModel.id,
            oldColumns,
            updatedColumns
        });
    }
    destroyAllTableManagers() {
        if (this.uiManagers.size > 0) {
            this.uiManagers.forEach((manager) => {
                manager.destroy();
            });
            this.uiManagers.clear();
        }
    }
    destroy() {
        this.removeEventListener();
        this.destroyAllTableManagers();
    }
}

/**
 * `Content renderer` module is used to render content in Blocks.
 *
 * @hidden
 */
class ContentRenderer {
    constructor(manager) {
        this.parent = manager;
    }
    /**
     * Renders the actual content of a block.
     *
     * @param {BlockModel} block - The block model containing the content.
     * @param {HTMLElement} contentElement - The HTML element where the content will be rendered.
     * @returns {void}
     * @hidden
     */
    renderContent(block, contentElement) {
        if (block.content && block.content.length > 0) {
            // clear html and render again
            if (contentElement) {
                contentElement.innerHTML = '';
            }
            block.content.forEach((content) => {
                const node = this.invokeContentRenderer(block, content);
                if (node && contentElement) {
                    contentElement.appendChild(node);
                }
            });
        }
        else {
            const emptyNode = this.renderText(null);
            if (emptyNode && contentElement) {
                contentElement.appendChild(emptyNode);
                if (!block.properties.placeholder) {
                    const br = document.createElement('br');
                    contentElement.appendChild(br);
                }
            }
        }
        this.parent.stateManager.updateManagerBlocks();
    }
    /**
     * Invokes appropriate content renderer based on content type.
     * Pure function - creates and returns nodes without side effects.
     *
     * @param {BlockModel} block - The block model
     * @param {ContentModel} contentModel - The content model to render
     * @returns {Node} - The created node
     * @hidden
     */
    invokeContentRenderer(block, contentModel) {
        let node = null;
        switch (contentModel.contentType) {
            case ContentType.Text:
                node = this.renderText(contentModel);
                break;
            case ContentType.Link:
                node = this.renderAnchor(contentModel);
                break;
            case ContentType.Mention:
                node = this.renderMention(contentModel);
                break;
            case ContentType.Label:
                node = this.renderLabel(contentModel);
                break;
        }
        // Add <br> if placeholder check is needed and content is empty
        if (node && !contentModel.content && !block.properties.placeholder) {
            const container = document.createElement('span');
            container.appendChild(node);
            const br = document.createElement('br');
            container.appendChild(br);
            return container;
        }
        return node;
    }
    /**
     * Renders text content as a pure function.
     * Creates and returns text node with applied formatting.
     *
     * @param {ContentModel} content - The content model to render
     * @returns {Node} - The created text node
     * @hidden
     */
    renderText(content) {
        if (!content) {
            return document.createTextNode('');
        }
        const formattedNode = createFormattingElement(content);
        return formattedNode;
    }
    /**
     * Renders link/anchor content as a pure function.
     * Creates and returns anchor node with applied formatting.
     *
     * @param {ContentModel} content - The content model to render
     * @returns {Node} - The created anchor node
     * @hidden
     */
    renderAnchor(content) {
        const props = content.properties;
        props.url = normalizeUrl(props.url);
        const linkData = {
            url: props.url
        };
        const formattedNode = createFormattingElement(content, linkData);
        return formattedNode;
    }
    /**
     * Renders mention/user chip as a pure function.
     * Creates and returns mention element without appending.
     *
     * @param {ContentModel} content - The content model with mention properties
     * @returns {Node} - The created mention element
     * @hidden
     */
    renderMention(content) {
        const props = content.properties;
        const userModel = this.parent.users.find((user) => user.id.toLowerCase() === props.userId);
        if (!userModel) {
            return null;
        }
        const name = userModel.user.trim();
        const initials = getUserInitials(name);
        const backgroundColor = userModel.avatarBgColor || getAutoAvatarColor(userModel.id);
        const avatarUrl = userModel.avatarUrl || '';
        const wrapper = createElement('div', {
            className: 'e-mention-chip e-user-chip',
            attrs: {
                'data-user-id': userModel.id,
                contenteditable: 'false'
            }
        });
        const avatar = createElement('div', {
            className: 'em-avatar',
            attrs: {
                style: `background-color: ${backgroundColor};`
            }
        });
        if (avatarUrl) {
            const avatarImg = createElement('img', {
                className: 'em-img',
                attrs: {
                    src: avatarUrl,
                    alt: userModel.user
                }
            });
            avatar.appendChild(avatarImg);
        }
        else {
            const initial = createElement('div', {
                className: 'em-initial'
            });
            initial.innerText = initials;
            avatar.appendChild(initial);
        }
        const userNameContent = createElement('div', {
            className: 'em-content'
        });
        userNameContent.innerText = userModel.user;
        content.content = userModel.user;
        wrapper.appendChild(avatar);
        wrapper.appendChild(userNameContent);
        return wrapper;
    }
    /**
     * Renders label/tag chip as a pure function.
     * Creates and returns label element without appending.
     *
     * @param {ContentModel} content - The content model with label properties
     * @returns {Node} - The created label element
     * @hidden
     */
    renderLabel(content) {
        const props = content.properties;
        const items = this.parent.labelSettings.items;
        const labelItem = items.find((item) => item.id === props.labelId);
        if (!labelItem) {
            return null;
        }
        const labelChip = createElement('span', {
            className: 'e-mention-chip e-label-chip',
            styles: `background: ${labelItem.labelColor};color: ${getAccessibleTextColor(labelItem.labelColor)};`,
            attrs: {
                'data-label-id': labelItem.id,
                contenteditable: 'false'
            }
        });
        labelChip.innerText = `${labelItem.groupBy}: ${labelItem.text}`;
        content.content = `${labelItem.groupBy}: ${labelItem.text}`;
        return labelChip;
    }
}

/**
 * Manages all block rendering operations in the BlockEditor
 */
class BlockRenderer {
    /**
     * Creates a new BlockRendererManager instance
     *
     * @param {BlockManager} manager The parent BlockManager instance
     */
    constructor(manager) {
        this.parent = manager;
        this.contentRenderer = new ContentRenderer(this.parent);
        this.initializeRenderers();
        this.addEventListeners();
    }
    addEventListeners() {
        this.parent.observer.on('modelChanged', this.handleBlockUIUpdates, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListeners() {
        this.parent.observer.off('modelChanged', this.handleBlockUIUpdates);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    /**
     * Initializes all the renderers used by this manager
     *
     * @returns {void}
     */
    initializeRenderers() {
        this.paragraphRenderer = new ParagraphRenderer(this.parent);
        this.headingRenderer = new HeadingRenderer(this.parent);
        this.listRenderer = new ListRenderer(this.parent);
        this.quoteRenderer = new QuoteRenderer(this.parent);
        this.codeRenderer = new CodeRenderer(this.parent);
        this.imageRenderer = new ImageRenderer(this.parent);
        this.calloutRenderer = new CalloutRenderer(this.parent);
        this.collapsibleRenderer = new CollapsibleRenderer(this.parent);
        this.commonBlocksRenderer = new CommonBlocksRenderer(this.parent);
        this.tableRenderer = new TableRenderer(this.parent);
    }
    /**
     * Creates a new block element based on the given block model.
     *
     * @param {BlockModel} block - The block model to create the element for.
     * @returns {HTMLElement} The created block element.
     * @hidden
     */
    createBlockElement(block) {
        const blockElement = createElement('div', {
            id: block.id,
            className: `e-block ${isListTypeBlock(block.blockType) ? 'e-list-block' : ''}${block.cssClass ? ' ' + block.cssClass : ''}`,
            attrs: {
                'data-block-type': block.blockType
            }
        });
        this.updateBlockCssClass(blockElement, block.cssClass);
        this.updateBlockIndentAttribute(blockElement, block.indent);
        if (block.blockType === BlockType.Divider) {
            blockElement.setAttribute('contenteditable', 'false');
        }
        if (isChildrenTypeBlock(block.blockType)) {
            this.renderNestedTypeBlockContent(block, blockElement);
        }
        else {
            this.renderBlockContent(block, blockElement);
        }
        return blockElement;
    }
    /**
     * Creates a new block element based on the given model and replaces it with current element.
     *
     * @param {string} currentBlockId - The current block Id to replace
     * @param {string} newBlockId - The new block Id to create element for.
     * @returns {HTMLElement} The replaced block element.
     * @hidden
     */
    createAndReplaceBlockElement(currentBlockId, newBlockId) {
        const newBlockElement = this.createBlockElement(getBlockModelById(newBlockId, this.parent.getEditorBlocks()));
        const currentElement = this.parent.getBlockElementById(currentBlockId);
        currentElement.replaceWith(newBlockElement);
        return this.parent.getBlockElementById(newBlockId);
    }
    /**
     * Inserts a new block element into the DOM.
     *
     * @param {HTMLElement} blockElement - The block element to insert.
     * @param {HTMLElement} targetElement - The target element to insert the block element relative to.
     * @param {boolean} isAfter - Whether to insert the block element after the target element.
     * @returns {void}
     * @hidden
     */
    insertBlockElementInDOM(blockElement, targetElement, isAfter) {
        if (targetElement) {
            targetElement.insertAdjacentElement(isAfter ? 'afterend' : 'beforebegin', blockElement);
        }
        else {
            this.parent.blockContainer.appendChild(blockElement);
        }
    }
    /**
     * Renders the content of a block element based on the given block model.
     *
     * @param {BlockModel} block - The block model to render.
     * @param {HTMLElement} blockElement - The block element to render the content into.
     * @returns {void}
     * @hidden
     */
    renderBlockContent(block, blockElement) {
        blockElement.setAttribute('data-block-type', block.blockType);
        let contentElement;
        switch (block.blockType) {
            case BlockType.Paragraph:
                contentElement = this.paragraphRenderer.renderParagraph(block);
                break;
            case BlockType.Heading:
                contentElement = this.headingRenderer.renderHeading(block);
                break;
            case BlockType.BulletList:
            case BlockType.NumberedList:
            case BlockType.Checklist:
                contentElement = this.listRenderer.renderListItem(block, blockElement);
                break;
            case BlockType.Code:
                contentElement = this.codeRenderer.renderCodeBlock(block);
                break;
            case BlockType.Image:
                contentElement = this.imageRenderer.renderImage(block);
                break;
            case BlockType.Table:
                contentElement = this.tableRenderer.renderTable(block, blockElement);
                break;
            case BlockType.Divider:
                contentElement = this.commonBlocksRenderer.renderDivider(blockElement);
                break;
            case BlockType.Template:
                contentElement = this.commonBlocksRenderer.renderTemplateBlock(block, blockElement);
                break;
        }
        if (contentElement) {
            this.populateClassListsForContent(block, contentElement);
            blockElement.appendChild(contentElement);
        }
    }
    populateClassListsForContent(block, contentElement) {
        const notAllowedTypes = [BlockType.Code, BlockType.Callout, BlockType.Quote]; //Table, Code, Callout etc.
        if (isListTypeBlock(block.blockType)) {
            const listItem = contentElement.querySelector('li');
            if (listItem) {
                listItem.classList.add('e-block-content');
            }
        }
        else if (notAllowedTypes.indexOf(block.blockType) === -1) {
            contentElement.classList.add('e-block-content');
        }
    }
    /**
     * Renders the content for nested type blocks (e.g., Callout, Toggle).
     *
     * @param {BlockModel} block - The block model to render.
     * @param {HTMLElement} blockElement - The block element to render the content into.
     * @returns {void}
     * @hidden
     */
    renderNestedTypeBlockContent(block, blockElement) {
        let contentElement;
        if (block.blockType === BlockType.Callout) {
            contentElement = this.calloutRenderer.renderCallout(block, blockElement);
        }
        else if (block.blockType === BlockType.Quote) {
            contentElement = this.quoteRenderer.renderQuote(block, blockElement);
        }
        else if (block.blockType.toString().startsWith('Collapsible')) {
            contentElement = this.collapsibleRenderer.renderCollapsibleBlock(block, blockElement);
        }
        if (contentElement) {
            blockElement.appendChild(contentElement);
        }
    }
    /**
     * Re-renders the content of a block
     *
     * @param {BlockModel} block The block model to re-render
     * @returns {void}
     * @hidden
     */
    reRenderBlockContent(block) {
        if (!block) {
            return;
        }
        const blockElement = this.parent.getBlockElementById(block.id);
        if (!blockElement) {
            return;
        }
        const contentElement = getBlockContentElement(blockElement);
        if (!contentElement) {
            return;
        }
        contentElement.innerHTML = '';
        this.contentRenderer.renderContent(block, contentElement);
    }
    /**
     * Renders multiple blocks
     *
     * @param {BlockModel} blocks Array of block models to render
     * @returns {void}
     * @hidden
     */
    renderBlocks(blocks) {
        if (blocks.length <= 0) {
            return;
        }
        this.isEntireBlocksRendering = true;
        blocks.forEach((block) => {
            const blockElement = this.createBlockElement(block);
            this.insertBlockIntoDOM(blockElement);
            if (!isAlwaysOnPlaceHolderBlk(block.blockType)) {
                this.parent.togglePlaceholder(blockElement, false);
            }
            if (isListTypeBlock(block.blockType)) {
                this.parent.listPlugin.updateListItemMarkers(blockElement);
            }
            if (isChildrenTypeBlock(block.blockType) && block.properties.children.length > 0) {
                block.properties.children.forEach((childBlock) => {
                    if (isListTypeBlock(childBlock.blockType)) {
                        this.parent.listPlugin.updateListItemMarkers(blockElement.querySelector('#' + childBlock.id));
                    }
                });
            }
            if (block.blockType === BlockType.Table && this.tableRenderer) {
                this.tableRenderer.refreshColWidths(block);
            }
        });
        requestAnimationFrame(() => {
            if (this.parent) {
                blocks.forEach((block) => {
                    if (block.blockType === BlockType.Checklist && this.listRenderer) {
                        this.listRenderer.toggleCheckedState(block, block.properties.isChecked, true);
                    }
                });
                this.isEntireBlocksRendering = false;
            }
        });
    }
    /**
     * Updates the CSS class for a block
     *
     * @param {HTMLElement} blockElement The block element to update
     * @param {string} customClass The CSS class to apply
     * @returns {void}
     * @hidden
     */
    updateBlockCssClass(blockElement, customClass) {
        if (customClass) {
            addClass([blockElement], customClass.trim().split(' '));
        }
    }
    /**
     * Updates the indentation attribute for a block
     *
     * @param {HTMLElement} blockElement The block element to update
     * @param {number} indentValue The indentation value to set
     * @returns {void}
     * @hidden
     */
    updateBlockIndentAttribute(blockElement, indentValue) {
        blockElement.style.setProperty(INDENT_KEY, (indentValue * 20).toString());
        if (this.parent.rootEditorElement.contains(blockElement)) {
            this.parent.floatingIconAction.showFloatingIcons(blockElement);
        }
    }
    /**
     * Inserts a block element into the DOM
     *
     * @param {HTMLElement} blockElement The block element to insert
     * @param {HTMLElement} afterElement Optional element to insert after
     * @returns {void}
     * @hidden
     */
    insertBlockIntoDOM(blockElement, afterElement) {
        if (afterElement) {
            this.parent.blockContainer.insertBefore(blockElement, afterElement.nextSibling);
        }
        else {
            this.parent.blockContainer.appendChild(blockElement);
        }
    }
    /**
     * Clears the editor and renders the default block
     *
     * @returns {void}
     * @hidden
     */
    clearEditorAndRenderDefaultBlock() {
        this.parent.blockContainer.innerHTML = '';
        const blockElement = this.createBlockElement(this.parent.getEditorBlocks()[0]);
        this.parent.blockContainer.appendChild(blockElement);
        this.parent.setFocusToBlock(blockElement);
        setCursorPosition(getBlockContentElement(blockElement), 0);
        this.parent.floatingIconAction.showFloatingIcons(blockElement);
    }
    handleBlockUIUpdates(options) {
        switch (options.type) {
            case 'AddBlock': {
                const { addedBlock, targetBlockModel, preventUIUpdate, isAfter, preventEventTrigger } = options.state;
                const blockElement = this.createBlockElement(addedBlock);
                const targetElement = targetBlockModel ? this.parent.getBlockElementById(targetBlockModel.id) : null;
                const blockToFocus = isAfter ? blockElement : targetElement;
                this.insertBlockElementInDOM(blockElement, targetElement, isAfter);
                // Hide placeholder for created block by default, let blockToFocus decide based on isAfter boolean
                this.parent.togglePlaceholder(blockElement, false);
                if (!preventUIUpdate) {
                    this.parent.setFocusAndUIForNewBlock(blockToFocus);
                }
                if (isListTypeBlock(addedBlock.blockType)) {
                    this.parent.listPlugin.recalculateMarkersForListItems();
                }
                this.parent.adjustViewForFocusedBlock();
                this.parent.eventService.addChange({
                    action: 'Insertion',
                    data: {
                        block: addedBlock,
                        targetId: targetBlockModel ? targetBlockModel.id : '',
                        isAfter
                    }
                });
                if (!preventEventTrigger) {
                    this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                }
                break;
            }
            case 'DeleteBlock': {
                detach(options.state.blockElement);
                this.parent.eventService.addChange({
                    action: 'Deletion',
                    data: { block: options.state.removedBlock }
                });
                if (!options.state.preventEventTrigger) {
                    this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                }
                break;
            }
            case 'MoveBlock': {
                const { destination, fromElements, isMovingUp, toBlockDOM, movedBlocks } = options.state;
                const allBlocks = Array.from(this.parent.blockContainer.children);
                const parentElement = this.getParentElementToInsert(destination, allBlocks);
                const targetToInsert = (isMovingUp ? toBlockDOM : toBlockDOM.nextSibling);
                fromElements.forEach((el) => {
                    parentElement.insertBefore(el, targetToInsert);
                });
                const reversedFromModels = [...movedBlocks].reverse();
                reversedFromModels.forEach((data) => {
                    const prevParent = reversedFromModels.find((fromModel) => fromModel.parent !== null);
                    this.parent.eventService.addChange({
                        action: 'Moved',
                        data: {
                            block: data.model,
                            targetId: toBlockDOM.id,
                            isMovingUp: isMovingUp,
                            prevParent: prevParent ? prevParent.model : undefined,
                            currentParent: options.state.destination.toParentBlockModel
                                ? options.state.destination.toParentBlockModel
                                : undefined
                        }
                    });
                });
                this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                break;
            }
            case 'TransformBlock': {
                const { block, shouldPreventUpdates, oldBlockClone, preventEventTrigger } = options.state;
                const blockElement = this.parent.getBlockElementById(block.id);
                const newBlockElement = this.createBlockElement(block);
                blockElement.replaceWith(newBlockElement);
                if (!shouldPreventUpdates) {
                    this.parent.eventService.addChange({
                        action: 'Update',
                        data: {
                            block: block,
                            prevBlock: oldBlockClone
                        }
                    });
                    if (!preventEventTrigger) {
                        this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                    }
                }
                break;
            }
            case 'IndentBlock':
                this.updateBlockIndentAttribute(this.parent.getBlockElementById(options.state.blockId), options.state.newIndent);
                break;
            case 'ReplaceBlock': {
                const { block, oldBlock, targetBlockId, preventEventTrigger } = options.state;
                const blockElement = this.parent.getBlockElementById(targetBlockId);
                const newBlockElement = this.createBlockElement(block);
                blockElement.replaceWith(newBlockElement);
                this.parent.eventService.addChange({
                    action: 'Update',
                    data: {
                        block: block,
                        prevBlock: oldBlock
                    }
                });
                if (!preventEventTrigger) {
                    this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                }
                break;
            }
            case 'DefaultEmptyBlock':
                this.clearEditorAndRenderDefaultBlock();
                this.parent.eventService.addChange({
                    action: 'Insertion',
                    data: { block: this.parent.getEditorBlocks()[0] }
                });
                this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                break;
            case 'ReRenderBlockContent': {
                const data = options.state.data;
                data.forEach((data) => {
                    if (!options.state.excludeDomUpdate) {
                        this.reRenderBlockContent(data.block);
                    }
                    if (!options.state.preventChangesTracking) {
                        this.parent.eventService.addChange({
                            action: 'Update',
                            data: {
                                block: data.block,
                                prevBlock: data.oldBlock
                            }
                        });
                    }
                });
                if (!options.state.preventEventTrigger) {
                    this.parent.observer.notify('triggerBlockChange', this.parent.eventService.getChanges());
                }
                break;
            }
        }
    }
    getParentElementToInsert(destination, allBlocks) {
        const wrapperClassName = destination.toParentBlockModel
            ? (destination.toParentBlockModel.blockType === BlockType.Callout
                ? '.' + CALLOUT_CONTENT_CLS
                : destination.toParentBlockModel.blockType.toString().startsWith('Collapsible')
                    ? '.' + TOGGLE_CONTENT_CLS
                    : destination.toParentBlockModel.blockType === BlockType.Quote
                        ? '.' + QUOTE_CONTENT_CLS
                        : '')
            : '';
        return wrapperClassName
            ? allBlocks[destination.toParentBlockIndex].querySelector(wrapperClassName)
            : this.parent.blockContainer;
    }
    destroy() {
        this.removeEventListeners();
        this.contentRenderer = null;
        this.paragraphRenderer = null;
        this.headingRenderer = null;
        this.listRenderer = null;
        this.codeRenderer = null;
        this.quoteRenderer = null;
        this.calloutRenderer = null;
        this.collapsibleRenderer = null;
        this.commonBlocksRenderer = null;
        this.tableRenderer = null;
    }
}

class TableSelectionManager {
    constructor(parent) {
        // rectangle selection anchors
        this.multiselectStartRow = null;
        this.multiselectEndRow = null;
        this.multiselectStartCol = null;
        this.multiselectEndCol = null;
        this.parent = parent;
        this.addEventListener();
    }
    addEventListener() {
        this.parent.observer.on('keydown', this.handleKeyDown, this);
        this.parent.observer.on(events.destroy, this.destroy, this);
    }
    removeEventListener() {
        this.parent.observer.off('keydown', this.handleKeyDown);
        this.parent.observer.off(events.destroy, this.destroy);
    }
    attachTableEvents(table, blockElement) {
        let isMouseSelecting = false;
        let dragStartCell = null;
        let selectionRectActive = false;
        const onMouseDown = (e) => {
            const target = e.target;
            const cell = target.closest('td, th');
            if (!cell || cell.classList.contains('e-row-number')) {
                return;
            }
            isMouseSelecting = true;
            dragStartCell = cell;
            selectionRectActive = false;
            const startRow = parseInt(cell.dataset.row, 10);
            const startCol = parseInt(cell.dataset.col, 10);
            this.multiselectStartRow = startRow;
            this.multiselectStartCol = startCol;
            this.multiselectEndRow = startRow;
            this.multiselectEndCol = startCol;
        };
        const onMouseMove = (e) => {
            if (!isMouseSelecting) {
                return;
            }
            const target = e.target;
            const cell = target.closest('td, th');
            if (!cell || cell.classList.contains('e-row-number')) {
                return;
            }
            if (!selectionRectActive && dragStartCell && cell !== dragStartCell) {
                selectionRectActive = true;
                blockElement.style.userSelect = 'none';
                table.style.userSelect = 'none';
            }
            if (!selectionRectActive) {
                return;
            }
            const endRow = parseInt(cell.dataset.row, 10);
            const endCol = parseInt(cell.dataset.col, 10);
            // to avoid popup flicker
            if (endRow === this.multiselectEndRow && endCol === this.multiselectEndCol) {
                return;
            }
            this.updateRectangleFocus(this.multiselectStartRow, this.multiselectStartCol, endRow, endCol, table);
            this.multiselectEndRow = endRow;
            this.multiselectEndCol = endCol;
            // Auto-scroll while dragging selection to keep current cell in view
            this.ensureCellVisible(table, cell);
            // Clear any native selection range while dragging across cells
            this.clearRangeAndSetCursor(table);
            const blockId = table.getAttribute('data-block-id');
            if (blockId) {
                const uiManager = this.parent.blockRenderer.tableRenderer.getManager(blockId);
                if (uiManager) {
                    uiManager.hideRowGripper();
                    uiManager.hideAllPinnedColBars();
                    const minRow = Math.min(this.multiselectStartRow, this.multiselectEndRow);
                    const maxRow = Math.max(this.multiselectStartRow, this.multiselectEndRow);
                    const minCol = Math.min(this.multiselectStartCol, this.multiselectEndCol);
                    const maxCol = Math.max(this.multiselectStartCol, this.multiselectEndCol);
                    const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
                    const settings = block.properties;
                    const totalRows = settings.rows.length + (settings.enableHeader ? 1 : 0);
                    const totalCols = settings.columns.length;
                    const isFullRowSelection = minCol === 0 && maxCol >= totalCols - 1;
                    uiManager.removeRowColSelection(table);
                    if (isFullRowSelection) {
                        let first = true;
                        for (let r = minRow; r <= maxRow; r++) {
                            uiManager.showRowGripperForDomRow(r, first);
                            first = false;
                        }
                    }
                    else {
                        uiManager.hideRowGripper();
                        if (uiManager.popupObj) {
                            uiManager.handleRemovePopup();
                        }
                    }
                    const isFullColumnSelection = minRow === 0 && maxRow >= totalRows - 1;
                    if (isFullColumnSelection) {
                        let first = true;
                        for (let c = minCol; c <= maxCol; c++) {
                            uiManager.showColGripperForDomCol(c, first);
                            first = false;
                        }
                    }
                    else {
                        uiManager.hideAllPinnedColBars();
                    }
                }
            }
            e.preventDefault();
            e.stopPropagation();
        };
        const onMouseUp = () => {
            isMouseSelecting = false;
            dragStartCell = null;
            selectionRectActive = false;
            // Only clear multi-select if no selection rectangle is active (i.e., mouseup without drag)
            // If a selection rectangle is active, keep the multi-select state for shift+arrow
            if (this.multiselectStartRow === this.multiselectEndRow && this.multiselectStartCol === this.multiselectEndCol) {
                this.multiselectStartRow = null;
                this.multiselectStartCol = null;
                this.multiselectEndRow = null;
                this.multiselectEndCol = null;
            }
            blockElement.style.userSelect = '';
            table.style.userSelect = '';
        };
        table.addEventListener('mousedown', onMouseDown);
        table.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
    // Ensure the given cell is visible inside the scrollable table container
    ensureCellVisible(table, cell) {
        const container = table.parentElement;
        const margin = 12; // small breathing room
        const cRect = container.getBoundingClientRect();
        const cellRect = cell.getBoundingClientRect();
        // Horizontal scroll
        if (cellRect.left < cRect.left) {
            const dx = cRect.left - cellRect.left + margin;
            container.scrollLeft -= dx;
        }
        else if (cellRect.right > cRect.right) {
            const dx = cellRect.right - cRect.right + margin;
            container.scrollLeft += dx;
        }
    }
    getAllCellBlocks(tableBlock) {
        const tableBlockModel = getBlockModelById(tableBlock.id, this.parent.getEditorBlocks());
        const allBlocks = [];
        tableBlockModel.properties.rows.forEach((row) => {
            row.cells.forEach((cell) => {
                allBlocks.push(...cell.blocks);
            });
        });
        return allBlocks;
    }
    getSelectedCellBlocks(tableBlock) {
        const tableBlockModel = getBlockModelById(tableBlock.id, this.parent.getEditorBlocks());
        const selectedCells = getSelectedCells(tableBlock);
        const selectedBlocks = [];
        selectedCells.forEach((cell) => {
            if (cell.tagName === 'TH') {
                return;
            }
            const cellId = cell.querySelector(`.${TABLE_CELL_BLK_CONTAINER}`).id;
            const cellModel = findCellById(cellId, [tableBlockModel]);
            selectedBlocks.push(...cellModel.blocks);
        });
        return selectedBlocks;
    }
    isCaretAtHeaderBoundary(th, edge) {
        const sel = this.parent.nodeSelection.getSelection();
        if (!sel || sel.rangeCount === 0) {
            return true;
        }
        const range = sel.getRangeAt(0);
        if (!th.contains(range.startContainer) || !th.contains(range.endContainer)) {
            return true;
        }
        // Compute start: at beginning of th
        if (edge === 'start') {
            return range.collapsed && range.startOffset === 0;
        }
        // Compute end: at end of th
        // Try to use endContainer length
        const endNodeText = (range.endContainer && (range.endContainer.textContent || '')) || '';
        if (range.endOffset === endNodeText.length && th.contains(range.endContainer)) {
            return true;
        }
        const thTextLen = (th.textContent || '').length;
        return thTextLen === 0 || range.toString().length === 0;
    }
    shouldMoveHorizFromHeader(direction, headerCell) {
        return direction === 'left'
            ? this.isCaretAtHeaderBoundary(headerCell, 'start')
            : this.isCaretAtHeaderBoundary(headerCell, 'end');
    }
    handleKeyDown(e) {
        const targetEl = e.target;
        const focusedBlk = this.parent.currentFocusedBlock;
        const tableBlockElement = targetEl.closest(`.${TABLE_BLOCK_CLS}`)
            || (focusedBlk && focusedBlk.closest(`.${TABLE_BLOCK_CLS}`));
        if (!tableBlockElement) {
            return;
        }
        if (focusedBlk && this.parent.eventAction.isAnyPopupOpen()) {
            return;
        }
        const table = tableBlockElement.querySelector('table');
        const cell = targetEl.closest('td, th')
            || tableBlockElement.querySelector('td.e-cell-focus, th.e-cell-focus')
            || focusedBlk.closest('td, th');
        if (!cell) {
            return;
        }
        const blockId = tableBlockElement.id || tableBlockElement.getAttribute('data-block-id');
        const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        if (!block) {
            return;
        }
        const settings = block.properties;
        const totalRows = settings.rows.length + (settings.enableHeader ? 1 : 0);
        const totalCols = settings.columns.length;
        const rowIdx = parseInt(cell.dataset.row || '-1', 10);
        const colIdx = parseInt(cell.dataset.col || '-1', 10);
        const tableGripperPopup = this.parent.rootEditorElement.querySelector('.e-table-gripper-action-popup');
        if (tableGripperPopup && tableGripperPopup.classList.contains('e-popup-open') && e.key === 'Escape') {
            this.parent.observer.notify('handleEscapeKey');
            return;
        }
        switch (e.key) {
            case 'Tab':
                e.preventDefault();
                this.moveFocus(table, rowIdx, colIdx, !e.shiftKey, block);
                break;
            case 'Escape':
                e.preventDefault();
                this.exitTableNavigation(table, 'forward');
                break;
            case 'Enter':
            case 'Backspace':
            case 'Delete': {
                if (!hasActiveTableSelection(tableBlockElement)) {
                    break;
                }
                e.preventDefault();
                e.stopPropagation();
                const targetCells = Array.from(table.querySelectorAll(`td.${TABLE_CELL_FOCUS}, th.${TABLE_CELL_FOCUS}`));
                // Gripper fallback if no rectangle focus
                if (targetCells.length === 0) {
                    // From selected rows
                    table.querySelectorAll('tr.e-row-selected').forEach((tr) => {
                        Array.from(tr.cells).forEach((cell) => {
                            if (!cell.classList.contains('e-row-number')) {
                                targetCells.push(cell);
                            }
                        });
                    });
                    // From selected columns
                    table.querySelectorAll('td.e-col-selected, th.e-col-selected').forEach((cell) => {
                        if (targetCells.indexOf(cell) === -1) {
                            targetCells.push(cell);
                        }
                    });
                }
                if (targetCells.length <= 1) {
                    break;
                }
                const uiManager = this.parent.blockRenderer.tableRenderer.getManager(blockId);
                const allEmpty = targetCells.every((cell) => (cell.textContent || '').trim() === '');
                if (!allEmpty) {
                    // 1st Delete → clear contents
                    this.parent.tableService.clearCellContents(table, targetCells);
                    // Refocus last cell
                    const lastCell = targetCells[targetCells.length - 1];
                    if (lastCell.tagName.toLowerCase() === 'td') {
                        this.parent.tableService.shiftFocusToBlockInCell(lastCell, true);
                    }
                    else {
                        setCursorPosition(lastCell, 0);
                    }
                    return;
                }
                this.parent.lastHighlightedBlockId = blockId;
                let shouldDeleteRows = false;
                let shouldDeleteCols = false;
                const rowIndicesToDelete = [];
                // Rectangle mode
                if (this.multiselectStartRow !== null &&
                    this.multiselectEndRow !== null &&
                    this.multiselectStartCol !== null &&
                    this.multiselectEndCol !== null) {
                    const minRow = Math.min(this.multiselectStartRow, this.multiselectEndRow);
                    const maxRow = Math.max(this.multiselectStartRow, this.multiselectEndRow);
                    const minCol = Math.min(this.multiselectStartCol, this.multiselectEndCol);
                    const maxCol = Math.max(this.multiselectStartCol, this.multiselectEndCol);
                    const isFullRow = minCol === 0 && maxCol >= totalCols - 1;
                    const isFullCol = minRow === 0 && maxRow >= totalRows - 1;
                    if (isFullRow) {
                        shouldDeleteRows = true;
                        for (let r = minRow; r <= maxRow; r++) {
                            rowIndicesToDelete.push(r);
                        }
                    }
                    if (isFullCol) {
                        shouldDeleteCols = true;
                    }
                }
                // Gripper mode
                const selectedRows = table.querySelectorAll('tr.e-row-selected');
                if (selectedRows.length > 0) {
                    shouldDeleteRows = true;
                    Array.from(selectedRows).forEach((tr) => {
                        const index = parseInt(tr.dataset.row || '-1', 10);
                        if (index >= 0 && rowIndicesToDelete.indexOf(index) === -1) {
                            rowIndicesToDelete.push(index);
                        }
                    });
                }
                const selectedColCells = table.querySelectorAll('td.e-col-selected, th.e-col-selected');
                if (selectedColCells.length > 0) {
                    const colCount = new Map();
                    Array.from(selectedColCells).forEach((cell) => {
                        const col = parseInt(cell.dataset.col || '-1', 10);
                        if (col >= 0) {
                            colCount.set(col, (colCount.get(col) || 0) + 1);
                        }
                    });
                    colCount.forEach((count) => {
                        if (count >= totalRows - (settings.enableHeader ? 1 : 0)) {
                            shouldDeleteCols = true;
                        }
                    });
                }
                // Execute deletion
                if (shouldDeleteCols && uiManager) {
                    uiManager.deleteSelectedColumns();
                    this.multiselectStartRow = this.multiselectEndRow =
                        this.multiselectStartCol = this.multiselectEndCol = null;
                }
                else if (shouldDeleteRows && uiManager) {
                    rowIndicesToDelete.sort((a, b) => b - a); // bottom to top
                    rowIndicesToDelete.forEach((rowIdx) => {
                        uiManager.deleteSelectedRows(rowIdx);
                    });
                    this.multiselectStartRow = this.multiselectEndRow =
                        this.multiselectStartCol = this.multiselectEndCol = null;
                }
                // Always clean UI
                uiManager.hideRowGripper();
                uiManager.hideAllPinnedColBars();
                uiManager.handleRemovePopup();
                break;
            }
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight': {
                const direction = e.key.replace('Arrow', '').toLowerCase();
                if (e.shiftKey) {
                    if (!this.canAllowMultiSelection(cell, direction)) {
                        return;
                    }
                    this.parent.tableService.removeCellFocus(table);
                    if (this.multiselectStartRow == null || this.multiselectStartCol == null) {
                        this.multiselectStartRow = rowIdx;
                        this.multiselectStartCol = colIdx;
                    }
                    if (this.multiselectEndRow == null || this.multiselectEndCol == null) {
                        this.multiselectEndRow = rowIdx;
                        this.multiselectEndCol = colIdx;
                    }
                    e.preventDefault();
                    this.handleMultiselect(direction, table);
                    this.ensureCellVisible(table, getDataCell(table, this.multiselectEndRow, this.multiselectEndCol));
                    this.clearRangeAndSetCursor(table);
                }
                else {
                    // Clearing multi-select state
                    this.multiselectStartRow = null;
                    this.multiselectStartCol = null;
                    this.multiselectEndRow = null;
                    this.multiselectEndCol = null;
                    // Clear all row & column visual selections
                    const blockId = table.getAttribute('data-block-id');
                    const uiManager = this.parent.blockRenderer.tableRenderer.getManager(blockId);
                    if (uiManager) {
                        uiManager.removeRowColSelection(table);
                        uiManager.hideRowGripper(); // Hides row pinned bars
                        uiManager.hideAllPinnedColBars(); // Hides col pinned bars
                        uiManager.handleRemovePopup(); // Closes any popup if open
                    }
                    const selectedCells = getSelectedCells(tableBlockElement);
                    const cellName = cell.tagName.toLowerCase();
                    if (hasActiveTableSelection(tableBlockElement) && (selectedCells && selectedCells.length > 1)) {
                        if (cellName === 'td') {
                            this.parent.tableService.shiftFocusToBlockInCell(cell);
                        }
                        else {
                            // keep caret inside header cell (TH)
                            const th = cell;
                            setCursorPosition(th,  0);
                        }
                    }
                    const isHorizontal = direction === 'left' || direction === 'right';
                    if (isHorizontal) {
                        const isHeader = cellName === 'th';
                        const shouldMoveHoriz = isHeader
                            ? this.shouldMoveHorizFromHeader(direction, cell)
                            : this.shouldMoveToAdjacentCell(direction, this.parent.currentFocusedBlock, block);
                        if (shouldMoveHoriz) {
                            e.preventDefault();
                            this.parent.tableService.removeCellFocus(table);
                            this.moveCellFocus(table, rowIdx, colIdx, direction);
                        }
                    }
                    else {
                        // Vertical navigation (up/down)
                        const isHeaderCell = cellName === 'th';
                        // From any header cell, ArrowUp exits the table backward
                        if (isHeaderCell && direction === 'up') {
                            e.preventDefault();
                            this.parent.tableService.removeCellFocus(table);
                            this.exitTableNavigation(table, 'backward');
                            return;
                        }
                        // Use the TH itself as the source when in header (no inner block exists)
                        // Use the currentFocusedBlock only for TD cells
                        const sourceForNav = isHeaderCell
                            ? cell
                            : this.parent.currentFocusedBlock;
                        const nextCellEl = this.shouldMoveCellFocus(direction, sourceForNav, table);
                        if (nextCellEl) {
                            e.preventDefault();
                            this.parent.tableService.removeCellFocus(table);
                            this.moveCellFocus(table, rowIdx, colIdx, direction);
                        }
                        else {
                            // Consider exiting the table if:
                            // - caret is at the correct boundary of the current focused block, AND
                            // - there is no adjacent block inside this cell in that direction, AND
                            // - we are at the first/last table row.
                            const settings = block.properties;
                            const totalRows = settings.rows.length + (settings.enableHeader ? 1 : 0);
                            const atBoundary = isHeaderCell
                                ? (direction === 'up'
                                    ? this.isCaretAtHeaderBoundary(cell, 'start')
                                    : this.isCaretAtHeaderBoundary(cell, 'end'))
                                : (direction === 'up'
                                    ? isAtStartOfBlock(this.parent.currentFocusedBlock)
                                    : isAtEndOfBlock(this.parent.currentFocusedBlock));
                            const isEdgeRow = direction === 'up'
                                ? rowIdx === 0
                                : rowIdx === (totalRows - 1);
                            // For headers, there is no inner adjacent block constraint
                            const hasAdjacentBlockInCell = isHeaderCell
                                ? false
                                : !!getAdjacentBlock(this.parent.currentFocusedBlock, direction === 'up' ? 'previous' : 'next');
                            if (atBoundary && isEdgeRow && !hasAdjacentBlockInCell) {
                                e.preventDefault();
                                this.exitTableNavigation(table, direction === 'up' ? 'backward' : 'forward');
                                return;
                            }
                        }
                    }
                }
                break;
            }
        }
    }
    clearRangeAndSetCursor(tableEle) {
        this.parent.nodeSelection.clearSelection();
        const lastSelectedCell = getDataCell(tableEle, this.multiselectEndRow, this.multiselectEndCol);
        if (lastSelectedCell) {
            setCursorPosition(lastSelectedCell, 0);
        }
    }
    shouldMoveCellFocus(direction, cellBlock, table) {
        const isUp = direction === 'up';
        const isDown = direction === 'down';
        const isLeft = direction === 'left';
        if (!cellBlock) {
            return null;
        }
        const hostCell = cellBlock.closest('td, th');
        if (!hostCell) {
            return null;
        }
        const isHeader = hostCell.tagName.toLowerCase() === 'th';
        if (!isHeader) {
            const adjacentBlock = getAdjacentBlock(cellBlock, (isUp || isLeft) ? 'previous' : 'next');
            if (adjacentBlock) {
                return null;
            }
        }
        if (isUp || isDown) {
            return getAdjacentCell(table, direction, hostCell);
        }
        return null;
    }
    // Move to adjacent cell only when,
    // * caret is at boundary AND there is no adjacent block inside the cell
    // * cell is empty
    shouldMoveToAdjacentCell(direction, cellBlock, blockModel) {
        const atStart = isAtStartOfBlock(cellBlock);
        const atEnd = isAtEndOfBlock(cellBlock);
        const isEmptyCell = cellBlock.textContent.trim() === '';
        if (isEmptyCell) {
            return true;
        }
        if (direction === 'left') {
            const prev = getAdjacentBlock(cellBlock, 'previous');
            const firstCellBlockId = blockModel.properties.rows[0].cells[0].blocks[0].id;
            return atStart && !prev && (cellBlock.id !== firstCellBlockId);
        }
        const next = getAdjacentBlock(cellBlock, 'next');
        return atEnd && !next;
    }
    // Helpers for keyboard shift selection behavior
    isSelectionWithinCell(cell) {
        const sel = this.parent.nodeSelection.getSelection();
        const anchorNode = sel.anchorNode;
        const focusNode = sel.focusNode;
        return cell.contains(anchorNode) && cell.contains(focusNode);
    }
    getCellBlockContentElements(cell) {
        const blocks = Array.from(cell.querySelectorAll('.e-block'));
        const contents = blocks
            .map((b) => getBlockContentElement(b))
            .filter((el) => !!el);
        return contents;
    }
    canAllowMultiSelection(cell, direction) {
        if (this.multiselectEndRow || this.multiselectEndCol) {
            return true;
        }
        const sel = window.getSelection && window.getSelection();
        if (!sel || sel.rangeCount === 0) {
            return false;
        }
        if (!this.isSelectionWithinCell(cell)) {
            return false;
        }
        const isLeft = direction === 'left';
        const isRight = direction === 'right';
        const isUpDown = direction === 'up' || direction === 'down';
        const range = sel.getRangeAt(0);
        if (cell.tagName === 'TH') {
            const startsAtFirst = range.startOffset === 0 && (isLeft || isUpDown);
            const endsAtLast = range.endOffset === cell.textContent.length && (isRight || isUpDown);
            return startsAtFirst || endsAtLast;
        }
        const contents = this.getCellBlockContentElements(cell);
        const isFirstTextNode = (!contents[0].firstChild ||
            (contents[0].firstChild && contents[0].firstChild.nodeType === Node.TEXT_NODE));
        const firstChild = isFirstTextNode
            ? contents[0]
            : contents[0].firstChild;
        const lastContent = contents[contents.length - 1];
        const isLastTextNode = (!lastContent.lastChild ||
            (lastContent.lastChild && lastContent.lastChild.nodeType === Node.TEXT_NODE));
        const lastChild = isLastTextNode
            ? lastContent
            : lastContent.lastChild;
        const expectedStartNode = getDeepestTextNode(firstChild) || contents[0];
        const expectedEndNode = getDeepestTextNode(lastChild) || lastContent;
        const startsAtFirst = (expectedStartNode && expectedStartNode.contains(range.startContainer) &&
            range.startOffset === 0 && (isLeft || isUpDown));
        const endsAtLast = (expectedEndNode && expectedEndNode.contains(range.endContainer) &&
            range.endOffset === lastChild.textContent.length && (isRight || isUpDown));
        return startsAtFirst || endsAtLast;
    }
    handleMultiselect(direction, table) {
        if (this.multiselectEndRow == null || this.multiselectEndCol == null) {
            return;
        }
        const blockId = table.getAttribute('data-block-id');
        const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        const settings = block.properties;
        const totalRows = (settings.rows).length + (settings.enableHeader ? 1 : 0);
        const totalCols = (settings.columns).length;
        let newEndRow = this.multiselectEndRow;
        let newEndCol = this.multiselectEndCol;
        switch (direction) {
            case 'up':
                newEndRow = Math.max(0, newEndRow - 1);
                break;
            case 'down':
                newEndRow = Math.min(totalRows - 1, newEndRow + 1);
                break;
            case 'left':
                newEndCol = Math.max(0, newEndCol - 1);
                break;
            case 'right':
                newEndCol = Math.min(totalCols - 1, newEndCol + 1);
                break;
        }
        this.updateRectangleFocus(this.multiselectStartRow, this.multiselectStartCol, newEndRow, newEndCol, table);
        this.multiselectEndRow = newEndRow;
        this.multiselectEndCol = newEndCol;
        // clear previous row/column selections
        const uiManager = this.parent.blockRenderer.tableRenderer.getManager(blockId);
        if (uiManager) {
            uiManager.removeRowColSelection(table);
            uiManager.hideRowGripper();
            uiManager.hideAllPinnedColBars();
        }
        const minRow = Math.min(this.multiselectStartRow, this.multiselectEndRow);
        const maxRow = Math.max(this.multiselectStartRow, this.multiselectEndRow);
        const minCol = Math.min(this.multiselectStartCol, this.multiselectEndCol);
        const maxCol = Math.max(this.multiselectStartCol, this.multiselectEndCol);
        // Re-check if full row selection (all columns selected)
        const isFullRowSelection = minCol === 0 && maxCol >= totalCols - 1;
        if (isFullRowSelection && uiManager) {
            let first = true;
            for (let r = minRow; r <= maxRow; r++) {
                uiManager.addRowSelection(table, r);
                uiManager.showRowGripperForDomRow(r, first);
                first = false;
            }
        }
        // Re-check if full column selection (all rows selected)
        const isFullColumnSelection = minRow === 0 && maxRow >= totalRows - 1;
        if (isFullColumnSelection && uiManager) {
            let first = true;
            for (let c = minCol; c <= maxCol; c++) {
                uiManager.addColumnSelection(table, c);
                uiManager.showColGripperForDomCol(c, first);
                first = false;
            }
        }
        if (!isFullRowSelection && !isFullColumnSelection) {
            uiManager.handleRemovePopup(); // Close popup when shrunk to single cell
        }
        this.ensureCellVisible(table, getDataCell(table, this.multiselectEndRow, this.multiselectEndCol));
        this.clearRangeAndSetCursor(table);
    }
    moveCellFocus(table, rowIdx, colIdx, direction) {
        const blockId = table.getAttribute('data-block-id');
        const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        const settings = block.properties;
        const totalRows = (settings.rows).length + (settings.enableHeader ? 1 : 0);
        const totalCols = (settings.columns).length;
        let targetRow = rowIdx;
        let targetCol = colIdx;
        switch (direction) {
            case 'up':
                if (rowIdx > 0) {
                    targetRow = rowIdx - 1;
                }
                break;
            case 'down':
                if (rowIdx + 1 < totalRows) {
                    targetRow = rowIdx + 1;
                }
                break;
            case 'left':
                if (colIdx > 0) {
                    targetCol = colIdx - 1;
                }
                else if (rowIdx > 0) {
                    targetRow = rowIdx - 1;
                    targetCol = totalCols - 1;
                }
                break;
            case 'right':
                if (colIdx + 1 < totalCols) {
                    targetCol = colIdx + 1;
                }
                else if (rowIdx + 1 < totalRows) {
                    targetRow = rowIdx + 1;
                    targetCol = 0;
                }
                break;
        }
        if (targetRow === rowIdx && targetCol === colIdx) {
            return;
        }
        const domCol = toDomCol(targetCol, settings.enableRowNumbers);
        const rowEl = table.rows[targetRow];
        const nextCell = rowEl && rowEl.cells[domCol];
        const cursorAtStart = direction === 'right' || direction === 'up' || direction === 'down';
        if (nextCell) {
            this.parent.tableService.removeCellFocus(table);
            this.parent.tableService.addCellFocus(nextCell, true, cursorAtStart);
            // Ensure focused cell is visible when navigating with arrow keys
            this.ensureCellVisible(table, nextCell);
            // If header cell, set caret directly in TH so cursor doesn’t remain in previous row’s TD
            if (nextCell.tagName && nextCell.tagName.toLowerCase() === 'th') {
                const th = nextCell;
                const placeAtEnd = direction === 'left' ? true : false; // moving left -> end, right -> start
                // For vertical moves, default to start
                requestAnimationFrame(() => {
                    setCursorPosition(th, placeAtEnd ? (th.textContent).length : 0);
                });
            }
        }
    }
    updateRectangleFocus(row1, col1, row2, col2, table) {
        const blockId = table.getAttribute('data-block-id');
        const block = getBlockModelById(blockId, this.parent.getEditorBlocks());
        const settings = block.properties;
        this.parent.tableService.removeCellFocus(table);
        const minRow = Math.min(row1, row2);
        const maxRow = Math.max(row1, row2);
        const minCol = Math.min(col1, col2);
        const maxCol = Math.max(col1, col2);
        for (let r = minRow; r <= maxRow; r++) {
            const tr = table.rows[r];
            for (let c = minCol; c <= maxCol; c++) {
                const domCol = toDomCol(c, settings.enableRowNumbers);
                const cellEl = tr.cells[domCol];
                if (cellEl) {
                    cellEl.classList.add(TABLE_CELL_FOCUS);
                }
            }
        }
    }
    moveFocus(table, row, col, forward, block) {
        const settings = block.properties;
        this.parent.tableService.removeCellFocus(table);
        const headerOffset = settings.enableHeader ? 1 : 0;
        const totalRows = (settings.rows).length + headerOffset;
        const totalCols = (settings.columns).length;
        let nextRow = row;
        let nextCol = col;
        if (forward) {
            nextCol++;
            if (nextCol >= totalCols) {
                nextRow++;
            }
        }
        else {
            nextCol--;
            if (nextCol < 0) {
                nextRow--;
            }
        }
        // Forward past the last cell -> add a new row
        if (nextRow >= totalRows && nextCol >= totalCols) {
            // Add new row and focus its first cell
            this.parent.tableService.addRowAt({
                blockId: block.id,
                rowIndex: totalRows - headerOffset
            });
            const newLastRow = table.rows[table.rows.length - 1];
            this.parent.tableService.addCellFocus(newLastRow.cells[toDomCol(0, settings.enableRowNumbers)], true);
            return;
        }
        // Backward past the header (or top when no header) -> exit table
        // Note: only exit when we went before row 0 entirely.
        if (!forward && nextRow < 0 && nextCol < 0) {
            this.exitTableNavigation(table, 'backward');
            return;
        }
        // Clamp candidate row into [0, totalRows-1] to allow selecting header row as well
        const targetDOMRowIndex = Math.max(0, Math.min(nextRow, totalRows - 1));
        const rowElement = table.rows[targetDOMRowIndex];
        if (rowElement && nextCol >= 0 && nextCol < totalCols) {
            const domCol = toDomCol(nextCol, settings.enableRowNumbers);
            const targetCell = rowElement.cells[domCol];
            if (targetCell) {
                this.parent.tableService.addCellFocus(targetCell, true);
                this.ensureCellVisible(table, targetCell);
                if (targetCell.tagName.toLowerCase() === 'th') {
                    const th = targetCell;
                    // For Tab forward, place at start; for Shift+Tab, place at end
                    requestAnimationFrame(() => {
                        setCursorPosition(th, forward ? 0 : (th.textContent || '').length);
                    });
                }
                return;
            }
        }
        if (forward && targetDOMRowIndex < totalRows) {
            const domCol = toDomCol(0, settings.enableRowNumbers);
            const fallbackCell = table.rows[targetDOMRowIndex].cells[domCol];
            this.parent.tableService.addCellFocus(fallbackCell, true);
            this.ensureCellVisible(table, fallbackCell);
            if (fallbackCell && fallbackCell.tagName.toLowerCase() === 'th') {
                const th = fallbackCell;
                requestAnimationFrame(() => setCursorPosition(th, 0));
            }
        }
        else if (!forward && targetDOMRowIndex >= 0) {
            const domCol = toDomCol(totalCols - 1, settings.enableRowNumbers);
            const fallbackCell = table.rows[targetDOMRowIndex].cells[domCol];
            this.parent.tableService.addCellFocus(fallbackCell, true);
            this.ensureCellVisible(table, fallbackCell);
            if (fallbackCell && fallbackCell.tagName.toLowerCase() === 'th') {
                const th = fallbackCell;
                requestAnimationFrame(() => setCursorPosition(th, (th.textContent || '').length));
            }
        }
    }
    exitTableNavigation(table, direction) {
        const blockEl = table.closest('.e-block');
        const nextBlock = (direction === 'forward'
            ? blockEl.nextElementSibling : blockEl.previousElementSibling);
        if (nextBlock) {
            setCursorPosition(getBlockContentElement(nextBlock), 0);
            this.parent.setFocusToBlock(nextBlock);
            this.parent.tableService.removeCellFocus(table);
        }
    }
    destroy() {
        this.removeEventListener();
    }
}

/**
 * Selection overlay to visually indicate a selection over a target content element.
 * It draws an absolutely positioned box inside the editor root, without affecting layout.
 */
class SelectionOverlay {
    constructor(manager) {
        this.overlayEl = null;
        this.selectionOverlayInfo = null;
        this.parent = manager;
    }
    show(targetId) {
        const el = this.ensureOverlay();
        this.positionTo(targetId);
        el.style.display = 'block';
    }
    hide() {
        if (this.overlayEl) {
            this.overlayEl.style.display = 'none';
        }
    }
    reposition() {
        if (!this.overlayEl || this.overlayEl.style.display === 'none') {
            return;
        }
        const targetId = this.overlayEl.getAttribute('data-target-id');
        this.positionTo(targetId);
    }
    destroy() {
        if (this.overlayEl && this.overlayEl.parentElement) {
            this.overlayEl.parentElement.removeChild(this.overlayEl);
        }
        this.overlayEl = null;
    }
    clearSelectionOverlay() {
        const dragIcon = this.parent.floatingIconAction.floatingIconContainer.querySelector('.e-block-drag-icon');
        if (dragIcon) {
            dragIcon.classList.remove('e-drag-icon-selected');
        }
        this.selectionOverlayInfo = null;
        if (this.parent.selectionOverlay) {
            this.parent.selectionOverlay.hide();
        }
    }
    ensureOverlay() {
        if (this.overlayEl && this.overlayEl.parentElement) {
            return this.overlayEl;
        }
        const overlay = createElement('div', {
            className: 'e-be-selection-overlay'
        });
        overlay.id = this.parent.rootEditorElement.id + '_softSelOverlay';
        overlay.style.display = 'none';
        this.parent.rootEditorElement.appendChild(overlay);
        this.overlayEl = overlay;
        return overlay;
    }
    positionTo(targetId) {
        const isMultipleBlockSeleceted = this.parent.editorMethods.getSelectedBlocks() && this.parent.editorMethods.getSelectedBlocks().length > 1;
        if (this.overlayEl && !isMultipleBlockSeleceted) {
            const targetBlock = this.parent.getBlockElementById(targetId);
            if (targetBlock) {
                const rootRect = this.parent.rootEditorElement.getBoundingClientRect();
                const targetRect = targetBlock.getBoundingClientRect();
                const isRtl = this.parent.rootEditorElement.classList.contains('e-rtl');
                const styles = getComputedStyle(targetBlock);
                const paddingLeft = styles.getPropertyValue('padding-left');
                const marginLeft = styles.getPropertyValue('margin-left');
                const paddingRight = styles.getPropertyValue('padding-right');
                const marginRight = styles.getPropertyValue('margin-right');
                const left = (targetRect.left - rootRect.left + parseInt(paddingLeft, 10) - parseInt(marginLeft, 10) +
                    (!isRtl ? -3 : parseInt(paddingRight, 10) - 6.5 + parseInt(marginRight, 10))) +
                    this.parent.rootEditorElement.scrollLeft;
                const top = (targetRect.top - rootRect.top) + this.parent.rootEditorElement.scrollTop;
                this.overlayEl.style.left = left + 'px';
                this.overlayEl.style.top = top + 'px';
                this.overlayEl.style.width = targetRect.width - 50 - (parseInt(targetBlock.style.getPropertyValue('--block-indent'), 10)) + 'px';
                this.overlayEl.style.height = targetRect.height + 'px';
                this.overlayEl.setAttribute('data-target-id', targetId);
            }
        }
    }
}

class BlockManager {
    constructor() {
        this.defaultKeyConfig = {
            bold: 'ctrl+b',
            italic: 'ctrl+i',
            underline: 'ctrl+u',
            strikethrough: 'ctrl+shift+x',
            inlineCode: 'ctrl+`',
            link: 'ctrl+k',
            print: 'ctrl+p'
        };
        this.observer = new Observer(this);
    }
    updateContext(BlockEditorObj) {
        extend(this, this, BlockEditorObj);
    }
    initialize() {
        /* Populate all block level properties which are not provided on application end */
        const populatedBlocks = BlockFactory.populateBlockProperties(this.blocks);
        this.blocks = populatedBlocks.slice();
        this.observer.notify('updateEditorBlocks', { blocks: this.blocks });
        this.blockCommand = new BlockCommand(this);
        this.stateManager = new StateManager(this);
        this.blockService = new BlockService(this.blocks);
        this.eventService = new EventService(this);
        this.tableService = new TableService(this);
        this.tableSelectionManager = new TableSelectionManager(this);
        this.blockCommand.createDefaultEmptyBlock();
        this.popupRenderer = new PopupRenderer(this);
        this.blockRenderer = new BlockRenderer(this);
        this.listPlugin = new ListPlugin(this);
        this.nodeSelection = new NodeSelection(this.blockContainer);
        this.nodeCutter = new NodeCutter();
        this.selectionOverlay = new SelectionOverlay(this);
        this.lastHighlightedBlockId = '';
        this.eventAction = new EventAction(this);
        this.floatingIconAction = new FloatingIcon(this);
        this.undoRedoAction = new UndoRedoAction(this);
        this.formattingAction = new FormattingAction(this);
        this.clipboardAction = new ClipboardAction(this);
        this.dragAndDropAction = new DragAndDropAction(this);
        this.mentionAction = new MentionAction(this);
        this.editorMethods = new BlockEditorMethods(this);
        this.inlineContentInsertionModule = new InlineContentInsertionModule$1(this);
        this.linkModule = new LinkModule$1(this);
        this.inlineToolbarModule = new InlineToolbarModule$1(this);
        this.blockActionMenuModule = new BlockActionMenuModule$1(this);
        this.contextMenuModule = new ContextMenuModule$1(this);
        this.slashCommandModule = new SlashCommandModule$1(this);
        this.scrollParentElements = getScrollableParent(this.rootEditorElement);
        this.wireEvents();
        this.initializeKeyBindings();
    }
    wireEvents() {
        this.observer.on(events.destroy, this.destroy, this);
    }
    unwireEvents() {
        this.observer.off(events.destroy, this.destroy);
    }
    /**
     * Initializes the key bindings
     *
     * @returns {void}
     */
    initializeKeyBindings() {
        const config = Object.assign({}, this.defaultKeyConfig, this.keyConfig);
        const map = new Map();
        for (const command in config) {
            if (Object.prototype.hasOwnProperty.call(config, command)) {
                const keyCombo = config[`${command}`].toLowerCase().replace(/\s+/g, '');
                map.set(keyCombo, command);
            }
        }
        this.keyCommandMap = map;
    }
    execCommand(options) {
        switch (options.command) {
            case 'AddBlock':
                this.observer.notify(ADDBLOCK, options.state);
                break;
            case 'SplitBlock':
                this.observer.notify(SPLITBLOCK, options.state);
                break;
            case 'DeleteBlock':
                this.observer.notify(DELETEBLOCK, options.state);
                break;
            case 'DeleteAtCursor':
                this.observer.notify(DELETEATCURSOR, options.state);
                break;
            case 'DuplicateBlock':
                this.observer.notify(DUPLICATEBLOCK, options.state);
                break;
            case 'IndentBlock':
                this.observer.notify(INDENTBLOCK, options.state);
                break;
            case 'MoveBlock':
                this.observer.notify(MOVEBLOCK, options.state);
                break;
            case 'FormattingAction':
                this.observer.notify(FORMATTINGACTION, options.state);
                break;
            case 'DeleteNonMergableBlock':
                this.observer.notify(DELETE_NON_MERGABLEBLOCK, options.state);
                break;
        }
    }
    /**
     * Sets focus to a block element
     *
     * @param {HTMLElement} block The block element to focus
     * @returns {void}
     * @hidden
     */
    setFocusToBlock(block) {
        if (block) {
            block.focus();
            this.currentFocusedBlock = block;
        }
    }
    /**
     * Fetches the editor blocks from service
     *
     * @returns {BlockModel[]} The editor blocks data
     * @hidden
     */
    getEditorBlocks() {
        if (!this.blockService) {
            return [];
        }
        return this.blockService.getBlocks();
    }
    /**
     * Populates the editor blocks data with the given blocks
     *
     * @param {BlockModel[]} blocks The blocks to set for the editor
     * @returns {void}
     * @hidden
     */
    setEditorBlocks(blocks) {
        if (!this.blockService) {
            return;
        }
        this.blockService.setBlocks(blocks);
    }
    /**
     * Gets a block element by ID
     *
     * @param {string} blockId The block ID
     * @returns {HTMLElement | null} The block element or null if not found
     * @hidden
     */
    getBlockElementById(blockId) {
        return this.blockContainer.querySelector(`#${blockId}`);
    }
    /**
     * Adjusts the view to focus on the current block
     *
     * @returns {void}
     * @hidden
     */
    adjustViewForFocusedBlock() {
        if (!this.currentFocusedBlock) {
            return;
        }
        const editorBlocks = this.getEditorBlocks();
        const lastBlock = editorBlocks[editorBlocks.length - 1];
        const containerRect = this.rootEditorElement.getBoundingClientRect();
        const blockRect = this.currentFocusedBlock.getBoundingClientRect();
        if (lastBlock && lastBlock.id === this.currentFocusedBlock.id) {
            this.rootEditorElement.scrollTo({ top: this.rootEditorElement.scrollHeight });
        }
        else if (blockRect.bottom > containerRect.bottom) {
            this.rootEditorElement.scrollTop += blockRect.bottom - containerRect.bottom;
        }
    }
    /**
     * Sets the focus and UI for a new block
     *
     * @param {HTMLElement} blockElement The block element to focus
     * @returns {void}
     * @hidden
     */
    setFocusAndUIForNewBlock(blockElement) {
        this.togglePlaceholder(this.currentFocusedBlock, false);
        this.setFocusToBlock(blockElement);
        setCursorPosition(getBlockContentElement(blockElement), 0);
        this.togglePlaceholder(this.currentFocusedBlock, true);
        this.floatingIconAction.showFloatingIcons(this.currentFocusedBlock);
    }
    /**
     * Removes the focus and UI for the given block
     *
     * @param {HTMLElement} blockElement The block element to remove focus
     * @returns {void}
     * @hidden
     */
    removeFocusAndUIForBlock(blockElement) {
        this.togglePlaceholder(blockElement, false);
        this.currentFocusedBlock = null;
        this.floatingIconAction.hideFloatingIcons();
    }
    /**
     * Gets the placeholder value for the given block element.
     *
     * @param {BlockModel} block The block model to get placeholder for.
     * @returns {string} The placeholder value for the given block type.
     * @hidden
     */
    getPlaceholderValue(block) {
        const props = block.properties;
        const tableCell = findCellById(block.parentId, this.getEditorBlocks());
        if (tableCell || (props && props.placeholder && props.placeholder !== '')) {
            return props.placeholder;
        }
        let constant = block.blockType.charAt(0).toLowerCase() + block.blockType.slice(1);
        if (block.blockType.endsWith(BlockType.Heading) && props && props.level) {
            constant += props.level.toString();
        }
        return this.localeJson[constant];
    }
    /**
     * Toggles the placeholder for a block element
     *
     * @param {HTMLElement} blockElement The block element
     * @param {boolean} isFocused Whether the block is currently focused
     * @returns {void}
     * @hidden
     */
    togglePlaceholder(blockElement, isFocused) {
        const blockModel = blockElement ? getBlockModelById(blockElement.id, this.getEditorBlocks()) : null;
        const isTableBlock = blockElement && findClosestParent(blockElement, `.${TABLE_BLOCK_CLS}`);
        const isCalloutBlock = blockElement && findClosestParent(blockElement, `.${CALLOUT_BLOCK_CLS}`);
        const isQuoteBlock = blockElement && findClosestParent(blockElement, `.${QUOTE_BLOCK_CLS}`);
        const isCalloutHasOneChild = isCalloutBlock && isCalloutBlock.querySelectorAll(`.${BLOCK_CLS}`).length === 1;
        const isQuoteHasOneChild = isQuoteBlock && isQuoteBlock.querySelectorAll(`.${BLOCK_CLS}`).length === 1;
        const isAlwaysOnBlock = blockModel && isAlwaysOnPlaceHolderBlk(blockModel.blockType);
        const tableCriteria = (isTableBlock &&
            ((blockModel && !(blockModel.properties.placeholder)) || !isFocused));
        const isNullPlaceholder = (blockModel && (blockModel && !('placeholder' in blockModel.properties)));
        if (!blockModel || isNullPlaceholder || tableCriteria || (isAlwaysOnBlock && !isFocused) || (isCalloutHasOneChild && !isFocused) ||
            (isQuoteHasOneChild && !isFocused)) {
            return;
        }
        const blockType = blockElement.getAttribute('data-block-type');
        const placeholderValue = this.getPlaceholderValue(blockModel);
        const contentEle = getBlockContentElement(blockElement);
        const isEmptyContent = isElementEmpty(contentEle);
        contentEle.setAttribute('placeholder', isEmptyContent && isFocused ? placeholderValue : '');
        if (isEmptyContent && blockType !== BlockType.Code) {
            clearBreakTags(contentEle);
        }
    }
    /**
     * Removes all placeholder attributes from block contents
     * and refreshes the placeholder for the current focused block
     *
     * @returns {void}
     * @hidden
     */
    refreshPlaceholder() {
        this.rootEditorElement.querySelectorAll('.' + CONTENT_CLS).forEach((el) => {
            const blockEle = el.closest(`.${BLOCK_CLS}`);
            this.togglePlaceholder(blockEle, false);
        });
        if (this.currentFocusedBlock) {
            this.togglePlaceholder(this.currentFocusedBlock, true);
        }
    }
    /**
     * Sets the cursor position after adding a bulk block (Clipboard paste)
     *
     * @param {string} insertionType - The type of insertion (blocks or text)
     * @returns {void}
     * @hidden
     */
    setCursorAfterBulkBlockAddition(insertionType) {
        let cursorElement = this.currentFocusedBlock;
        let cursorpos = cursorElement.textContent.length;
        if (insertionType === 'blocks') {
            cursorElement = (cursorElement.nextElementSibling || cursorElement);
            cursorpos = 0;
            this.togglePlaceholder(this.currentFocusedBlock, false);
            this.togglePlaceholder(cursorElement, true);
        }
        this.setFocusToBlock(cursorElement);
        setCursorPosition(getBlockContentElement(cursorElement), cursorpos);
    }
    /**
     * Updates focus and cursor position
     *
     * @param {HTMLElement} blockElement The block element to split
     * @returns {void}
     * @hidden
     */
    updateFocusAndCursor(blockElement) {
        if (blockElement) {
            const content = getBlockContentElement(blockElement);
            this.setFocusToBlock(blockElement);
            setCursorPosition(content, 0);
            this.floatingIconAction.showFloatingIcons(blockElement);
        }
    }
    /**
     * Serializes the given value for HTML encoding and sanitization
     *
     * @param {string} value The value to serialize
     * @returns {string} The serialized value
     * @hidden
     */
    serializeValue(value) {
        if (!isNullOrUndefined(value) && value.trim() !== '') {
            if (this.enableHtmlEncode) {
                value = sanitizeHelper(decode(value), this.enableHtmlSanitizer);
                value = encode(value);
            }
            else {
                value = sanitizeHelper(value, this.enableHtmlSanitizer);
            }
        }
        return value;
    }
    removeAndNullify(element) {
        if (element) {
            if (!isNullOrUndefined(element.parentNode)) {
                remove(element);
            }
            else {
                element.innerHTML = '';
            }
        }
    }
    destroyBlockEditor() {
        const properties = [
            'currentHoveredBlock',
            'currentFocusedBlock',
            'blockContainer'
        ];
        for (const prop of properties) {
            const element = prop;
            this.removeAndNullify(this[element]);
            this[element] = null;
        }
    }
    destroy() {
        this.scrollParentElements = [];
        this.unwireEvents();
        if (!isNullOrUndefined(this.updateTimer)) {
            clearInterval(this.updateTimer);
            this.updateTimer = null;
        }
        this.popupRenderer = null;
        if (this.selectionOverlay) {
            this.selectionOverlay.destroy();
        }
        this.selectionOverlay = null;
        this.inlineToolbarModule = null;
        this.inlineContentInsertionModule = null;
        this.slashCommandModule = null;
        this.contextMenuModule = null;
        this.blockActionMenuModule = null;
        this.linkModule = null;
        this.nodeSelection = null;
        this.nodeCutter = null;
        this.popupRenderer = null;
        this.lastHighlightedBlockId = null;
        this.eventAction = null;
        this.formattingAction = null;
        this.listPlugin = null;
        this.editorMethods = null;
        this.mentionAction = null;
        this.stateManager = null;
        this.blockService = null;
        this.eventService = null;
        this.blockCommand = null;
        this.blockRenderer = null;
        this.tableService = null;
        this.tableSelectionManager = null;
        this.keyCommandMap = null;
        this.defaultKeyConfig = null;
        this.dragAndDropAction = null;
        this.undoRedoAction = null;
        this.updateTimer = null;
        this.destroyBlockEditor();
    }
}

var __decorate$f = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents TransformSettings in the Inline Toolbar of block editor component.
 */
class TransformSettings extends ChildProperty {
}
__decorate$f([
    Property([])
], TransformSettings.prototype, "items", void 0);
__decorate$f([
    Event()
], TransformSettings.prototype, "itemSelect", void 0);
__decorate$f([
    Property('auto')
], TransformSettings.prototype, "popupWidth", void 0);
__decorate$f([
    Property('auto')
], TransformSettings.prototype, "popupHeight", void 0);

var __decorate$g = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents the root class for the Block Editor component.
 * The BlockEditor is a block based editor that provides functionality for creating, editing, and managing blocks of content.
 * Blocks can include paragraph, lists, toggles, and other block types, organized hierarchically.
 *
 **/
let BlockEditor = class BlockEditor extends Component {
    /**
     * Constructor for creating the component
     *
     * @param {BlockEditorModel} options - Specifies the BlockEditorModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    preRender() {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    }
    getDirective() {
        return 'EJS-BLOCKEDITOR';
    }
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    getModuleName() {
        return 'blockeditor';
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    getPersistData() {
        return this.addOnPersist(['blocks']);
    }
    /**
     * Renders the editor component
     *
     * @returns {void}
     */
    render() {
        this.initialize();
    }
    /**
     * Initializes the editor component
     *
     * @returns {void}
     */
    initialize() {
        this.initializeLocale();
        this.initializeManagers();
        this.intializeEngines();
        this.blockManager.observer.notify('modulesInitialized');
        // Set dimensions and styles
        this.setDimension();
        this.setCssClass();
        this.setRtlClass();
        this.blockManager.stateManager.populateUniqueIds(this.blockManager.getEditorBlocks());
        // Create floating icons and overlay containers
        if (!this.floatingIconRenderer.floatingIconContainer) {
            this.floatingIconRenderer.createFloatingIcons();
        }
        // Render the blocks
        this.initializeMentionModules();
        this.renderBlocks(this.blockManager.getEditorBlocks());
        this.updateEditorReadyOnlyState();
        // Wire events
        if (this.enableDragAndDrop) {
            this.intermediate.processActions('wireUnWireDragEvents', { enable: true });
        }
        this.eventManager.wireGlobalEvents();
    }
    /**
     * Initializes locale values
     *
     * @returns {void}
     */
    initializeLocale() {
        this.l10n = new L10n(this.getModuleName(), getLocaleItems(), this.locale);
        this.updateInternalLocaleCollection();
    }
    updateInternalLocaleCollection() {
        this.localeJson = getCurrentLocaleJson(this.l10n);
    }
    /**
     * Initializes all manager classes
     *
     * @returns {void}
     */
    initializeManagers() {
        this.blockManager = new BlockManager();
        this.intermediate = new Intermediate(this);
        this.renderblockContainer();
        this.blockManager.updateContext(Object.assign({ localeJson: this.localeJson, blocks: this.blocks, blockContainer: this.blockContainer, rootEditorElement: this.element, pasteCleanupSettings: this.pasteCleanupSettings, imageBlockSettings: this.imageBlockSettings, codeBlockSettings: this.codeBlockSettings, labelSettings: this.labelSettings, users: this.users, blockActionMenuSettings: this.blockActionMenuSettings, contextMenuSettings: this.contextMenuSettings, commandMenuSettings: this.commandMenuSettings, inlineToolbarSettings: this.inlineToolbarSettings }, this.getEditorProps()));
        this.blockManager.initialize();
        this.floatingIconRenderer = new FloatingIconRenderer(this);
        this.eventManager = new EventManager(this);
    }
    getEditorProps() {
        return {
            readOnly: this.readOnly,
            undoRedoStack: this.undoRedoStack,
            enableHtmlEncode: this.enableHtmlEncode,
            enableHtmlSanitizer: this.enableHtmlSanitizer,
            enableDragAndDrop: this.enableDragAndDrop,
            keyConfig: this.keyConfig
        };
    }
    /**
     * Initializes all engines
     *
     * @returns {void}
     */
    intializeEngines() {
        this.menubarRenderer = new MenuBarRenderer(this);
        this.mentionRenderer = new MentionRenderer(this);
        this.tabRenderer = new TabRenderer(this);
        this.uploaderRenderer = new UploaderRenderer(this);
        this.progressBarRenderer = new ProgressBarRenderer(this);
        this.tooltipRenderer = new TooltipRenderer(this);
        this.dialogRenderer = new DialogRenderer(this);
        this.dropdownListRenderer = new DropDownListRenderer(this);
        this.imageUploaderRenderer = new ImageUploaderRenderer(this);
        this.inlineContentInsertionModule = new InlineContentInsertionModule(this);
        this.inlineToolbarModule = new InlineToolbarModule(this);
        this.blockActionMenuModule = new BlockActionMenuModule(this);
        this.contextMenuModule = new ContextMenuModule(this);
        this.linkModule = new LinkModule(this);
    }
    /**
     * Sets the dimensions of the editor
     *
     * @returns {void}
     */
    setDimension() {
        const cssText = `
          width: ${!isNullOrUndefined(this.width) ? formatUnit(this.width) : this.element.style.width};
          height: ${!isNullOrUndefined(this.height) ? formatUnit(this.height) : this.element.style.height};
         `;
        updateCSSText(this.element, cssText);
    }
    /**
     * Sets the CSS class on the editor
     *
     * @returns {void}
     */
    setCssClass() {
        if (this.cssClass) {
            addClass([this.element], this.cssClass.trim().split(' '));
        }
    }
    /**
     * Sets the Rtl class on the editor
     *
     * @returns {void}
     */
    setRtlClass() {
        this.element.classList.toggle(RTL_CLS, this.enableRtl);
    }
    /**
     * Applies dynamic locale changes
     *
     * @returns {void}
     */
    updateLocale() {
        this.l10n.setLocale(this.locale);
        this.updateInternalLocaleCollection();
        this.blockManager.updateContext({ localeJson: this.localeJson });
        if (this.blockManager.currentFocusedBlock) {
            this.blockManager.togglePlaceholder(this.blockManager.currentFocusedBlock, true);
        }
        this.floatingIconRenderer.updateFloatingIconTooltipContent();
        this.notify(events.localeChanged, {});
        this.blockManager.observer.notify(events.localeChanged, {});
    }
    /**
     * Initializes mention modules for @ mentions and slash commands
     *
     * @returns {void}
     */
    initializeMentionModules() {
        this.slashCommandModule = new SlashCommandModule(this);
        this.inlineContentInsertionModule.initializeUserMention();
        this.inlineContentInsertionModule.initializeLabelContent();
    }
    /**
     * Creates the block container
     *
     * @returns {void}
     */
    renderblockContainer() {
        this.blockContainer = this.createElement('div', {
            id: this.element.id + BLOCK_CONTAINER_ID,
            className: BLOCK_CONTAINER_CLS
        });
        this.element.appendChild(this.blockContainer);
    }
    /**
     * Renders blocks in the editor
     *
     * @param {BlockModel[]} blocks The blocks to render
     * @returns {void}
     * @hidden
     */
    renderBlocks(blocks) {
        this.blockManager.blockCommand.createDefaultEmptyBlock();
        this.blockManager.blockRenderer.renderBlocks(blocks);
    }
    /**
     * Gets the current focused block model
     *
     * @returns {BlockModel | null} The current focused block model or null if no block is focused
     * @hidden
     */
    getCurrentFocusedBlockModel() {
        if (!this.blockManager.currentFocusedBlock) {
            return null;
        }
        return getBlockModelById(this.blockManager.currentFocusedBlock.id, this.blockManager.getEditorBlocks());
    }
    /**
     * Responsible for rendering the template for a block
     *
     * @param {{ block: BlockModel, templateElement: HTMLElement }} args The options to render template
     * @returns {void}
     * @hidden
     */
    renderTemplate(args) {
        const templateName = args.block.id + 'template';
        this.clearTemplate([templateName]);
        const templateFunction = getTemplateFunction(args.block.template);
        append(templateFunction({}, this, templateName, 'template', this.isStringTemplate), args.templateElement);
        this.renderReactTemplates();
    }
    /**
     * Updates read-only state of editable elements in the editor
     *
     * @returns {void}
     * @hidden
     */
    updateEditorReadyOnlyState() {
        const defaultNonEditableElements = [
            'e-callout-icon', 'e-toggle-icon', 'e-image-container', 'e-image-placeholder', 'e-checkmark-container', 'e-divider-block',
            'e-code-block-toolbar', 'e-code-block-copy-button', 'e-mention-chip',
            ...this.blockManager.blockRenderer.tableRenderer.nonEditableElements
        ];
        let editableElements = Array.from(this.element.querySelectorAll(`[contenteditable='${this.readOnly}']:not([data-table-readonly-processed]`));
        editableElements = editableElements.filter((element) => {
            return !defaultNonEditableElements.some((className) => element.classList.contains(className));
        });
        editableElements.forEach((element) => {
            element.contentEditable = (!this.readOnly).toString();
        });
        this.element.classList.toggle('e-readonly', this.readOnly);
    }
    /* Section Public methods */
    /**
     * Adds a new block to the editor
     *
     * @param {BlockModel} block - The block model to add
     * @param {string} targetId - The ID of the target block to insert the new block. If not provided, the block will be appended to the end of the editor.
     * @param {boolean} isAfter - Specifies whether to insert the new block after the target block. Default is false.
     * @returns {void}
     */
    addBlock(block, targetId, isAfter) {
        this.blockManager.editorMethods.addBlock(block, targetId, isAfter);
    }
    /**
     * Removes a block from the editor
     *
     * @param {string} blockId - ID of the block to remove
     * @returns {void}
     */
    removeBlock(blockId) {
        this.blockManager.editorMethods.removeBlock(blockId);
    }
    /**
     * Gets a block by ID
     *
     * @param {string} blockId - ID of the block to retrieve
     * @returns {BlockModel | null} - The block model or null if not found
     */
    getBlock(blockId) {
        return this.blockManager.editorMethods.getBlock(blockId);
    }
    /**
     * Moves a block to a new position
     *
     * @param {string} fromBlockId - ID of the block to move
     * @param {string} toBlockId - ID of the target block to move to
     * @returns {void}
     */
    moveBlock(fromBlockId, toBlockId) {
        this.blockManager.editorMethods.moveBlock(fromBlockId, toBlockId);
    }
    /**
     * Updates block properties
     *
     * @param {string} blockId - ID of the block to update
     * @param {Partial<BlockModel>} properties - Properties to update
     * @returns {boolean} True if update was successful
     */
    updateBlock(blockId, properties) {
        return this.blockManager.editorMethods.updateBlock(blockId, properties);
    }
    /**
     * Enables one or more toolbar items.
     * This method allows the specified toolbar items to be enabled.
     *
     * @param {string | string[]} itemId - The id(s) of the toolbar item(s) to enable.
     * @returns {void}
     */
    enableToolbarItems(itemId) {
        this.blockManager.editorMethods.enableDisableToolbarItems(itemId, true);
    }
    /**
     * Disables one or more toolbar items.
     * This method allows the specified toolbar items to be disabled.
     *
     * @param {string | string[]} itemId - The id(s) of the toolbar item(s) to disable.
     * @returns {void}
     */
    disableToolbarItems(itemId) {
        this.blockManager.editorMethods.enableDisableToolbarItems(itemId, false);
    }
    /**
     * Executes the specified toolbar action on the editor.
     *
     * @param {string} action - The action to execute.
     * @param {value} value - The value required if any (Optional).
     * @returns {void}
     */
    executeToolbarAction(action, value) {
        this.blockManager.editorMethods.executeToolbarAction(action, value);
    }
    /**
     * Sets the selection range within a content.
     * This method selects content within the specified element using a start and end index.
     *
     * @param {Node} node - Node to apply selection
     * @param {number} startIndex - The starting index of the selection.
     * @param {number} endIndex - The ending index of the selection.
     * @returns {void}
     */
    setSelection(node, startIndex, endIndex) {
        this.blockManager.editorMethods.setSelection(node, startIndex, endIndex);
    }
    /**
     * Sets cursor position
     *
     * @param {string} blockId - ID of the target block
     * @param {number} position - Character offset position
     * @returns {void}
     */
    setCursorPosition(blockId, position) {
        this.blockManager.editorMethods.setCursorPosition(blockId, position);
    }
    /**
     * Gets the block from current selection
     *
     * @returns {BlockModel | null} - The block model or null if not found
     */
    getSelectedBlocks() {
        return this.blockManager.editorMethods.getSelectedBlocks();
    }
    /**
     * Gets current selection range
     *
     * @returns {Range | null} Current selection range or null
     */
    getRange() {
        return this.blockManager.editorMethods.getRange();
    }
    /**
     * Selects the given range
     *
     * @param {Range} range - DOM Range object to select
     * @returns {void}
     */
    selectRange(range) {
        this.blockManager.editorMethods.selectRange(range);
    }
    /**
     * Selects an entire block
     *
     * @param {string} blockId - ID of the block to select
     * @returns {void}
     */
    selectBlock(blockId) {
        this.blockManager.editorMethods.selectBlock(blockId);
    }
    /**
     * Selects all blocks in the editor.
     *
     * @returns {void}
     */
    selectAllBlocks() {
        this.blockManager.editorMethods.selectAllBlocks();
    }
    /**
     * Focuses the editor
     *
     * @returns {void}
     */
    focusIn() {
        this.blockManager.editorMethods.focusIn();
    }
    /**
     * Removes focus from the editor
     *
     * @returns {void}
     */
    focusOut() {
        this.blockManager.editorMethods.focusOut();
    }
    /**
     * Gets total block count
     *
     * @returns {number} Number of blocks in editor
     */
    getBlockCount() {
        return this.blockManager.editorMethods.getBlockCount();
    }
    /**
     * Prints all the block data.
     *
     * @returns {void}
     */
    print() {
        this.blockManager.editorMethods.print();
    }
    /**
     * Renders blocks from JSON data, either replacing all existing content or inserting at cursor position.
     *
     * @param {object | string} json - The JSON data (object or string) containing block definitions
     * @param {boolean} replace - Whether to replace all existing content (true) or insert at cursor (false). By default, it is set to false.
     * @param {string} targetBlockId - ID of block to insert after (applicable only if replace is false).
     * @returns {boolean} - True if operation was successful, false otherwise
     */
    renderBlocksFromJson(json, replace = false, targetBlockId) {
        return this.blockManager.editorMethods.renderBlocksFromJson(json, replace, targetBlockId);
    }
    /**
     * Retrieves data from the editor as JSON.
     * If a block ID is provided, returns the data of that specific block; otherwise returns all content.
     *
     * @param {string} blockId - Optional ID of the block to retrieve
     * @returns {any} The JSON representation of the editor data
     */
    getDataAsJson(blockId) {
        return this.blockManager.editorMethods.getDataAsJson(blockId);
    }
    /**
     * Retrieves data from the editor as HTML.
     * If a block ID is provided, returns the data of that specific block; otherwise returns all content.
     *
     * @param {string} blockId - Optional ID of the block to retrieve
     * @returns {string} The HTML representation of the editor data
     */
    getDataAsHtml(blockId) {
        return this.blockManager.editorMethods.getDataAsHtml(blockId);
    }
    /**
     * Parses an HTML string into an array of BlockModel objects.
     *
     * @param {string} html - HTML string to parse.
     * @returns {BlockModel[]} An array of BlockModel objects representing the parsed HTML structure.
     */
    parseHtmlToBlocks(html) {
        return this.blockManager.editorMethods.parseHtmlToBlocks(html);
    }
    destroy() {
        if (this.isDestroyed) {
            return;
        }
        this.notify(events.destroy, {});
        this.blockManager.observer.notify(events.destroy, {});
        this.mentionRenderer = null;
        this.tabRenderer = null;
        this.uploaderRenderer = null;
        this.progressBarRenderer = null;
        this.menubarRenderer = null;
        this.tooltipRenderer = null;
        this.dialogRenderer = null;
        this.dropdownListRenderer = null;
        if (this.imageUploaderRenderer) {
            this.imageUploaderRenderer.destroy();
            this.imageUploaderRenderer = null;
        }
        this.inlineToolbarModule = null;
        this.inlineContentInsertionModule = null;
        this.slashCommandModule = null;
        this.contextMenuModule = null;
        this.blockActionMenuModule = null;
        this.linkModule = null;
        this.floatingIconRenderer = null;
        this.eventManager = null;
        this.l10n = null;
        this.blockContainer = null;
        this.isRendered = false;
        this.intermediate = null;
        super.destroy();
    }
    /**
     * Called if any of the property value is changed.
     *
     * @param  {BlockEditorModel} newProp - Specifies new properties
     * @param  {BlockEditorModel} oldProp - Specifies old properties
     * @returns {void}
     * @hidden
     */
    onPropertyChanged(newProp, oldProp) {
        const prevProp = oldProp;
        if (!prevProp) {
            return;
        }
        this.blockManager.updateContext(this.getEditorProps());
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'width':
                case 'height':
                    this.setDimension();
                    break;
                case 'cssClass':
                    this.setCssClass();
                    break;
                case 'locale':
                    this.updateLocale();
                    break;
                case 'enableRtl':
                    this.setRtlClass();
                    this.notify(events.rtlChanged, {});
                    break;
                case 'readOnly':
                    this.updateEditorReadyOnlyState();
                    this.intermediate.processActions('wireUnWireDragEvents', { enable: !this.readOnly });
                    break;
                case 'keyConfig':
                    this.blockManager.initializeKeyBindings();
                    break;
                case 'undoRedoStack':
                    this.blockManager.undoRedoAction.adjustUndoRedoStacks();
                    break;
                case 'enableDragAndDrop':
                    this.intermediate.processActions('wireUnWireDragEvents', { enable: this.enableDragAndDrop });
                    break;
                case 'enableHtmlSanitizer':
                case 'enableHtmlEncode':
                case 'blocks':
                    this.blockManager.editorMethods.replaceAllBlocks(prop === 'blocks' ? newProp.blocks : this.blockManager.getEditorBlocks());
                    break;
                case 'labelSettings':
                case 'users':
                    this.notify(events.moduleChanged, { module: 'inlineContent', newProp: newProp, oldProp: oldProp });
                    break;
                case 'commandMenuSettings':
                    this.notify(events.moduleChanged, { module: 'slashCommand', newProp: newProp, oldProp: oldProp });
                    break;
                case 'inlineToolbarSettings':
                    this.notify(events.moduleChanged, { module: 'inlineToolbarSettings', newProp: newProp, oldProp: oldProp });
                    break;
                case 'blockActionMenuSettings':
                    this.notify(events.moduleChanged, { module: 'blockActionMenuSettings', newProp: newProp, oldProp: oldProp });
                    break;
                case 'contextMenuSettings':
                    this.notify(events.moduleChanged, { module: 'contextMenuSettings', newProp: newProp, oldProp: oldProp });
                    break;
                case 'fontColorSettings':
                    this.notify(events.moduleChanged, { module: 'fontColorSettings', newProp: newProp, oldProp: oldProp });
                    break;
                case 'backgroundColorSettings':
                    this.notify(events.moduleChanged, { module: 'backgroundColorSettings', newProp: newProp, oldProp: oldProp });
                    break;
            }
        }
    }
};
__decorate$g([
    Property('auto')
], BlockEditor.prototype, "height", void 0);
__decorate$g([
    Property('100%')
], BlockEditor.prototype, "width", void 0);
__decorate$g([
    Property('')
], BlockEditor.prototype, "cssClass", void 0);
__decorate$g([
    Property('en-US')
], BlockEditor.prototype, "locale", void 0);
__decorate$g([
    Property(null)
], BlockEditor.prototype, "keyConfig", void 0);
__decorate$g([
    Property(30)
], BlockEditor.prototype, "undoRedoStack", void 0);
__decorate$g([
    Property(false)
], BlockEditor.prototype, "readOnly", void 0);
__decorate$g([
    Property(false)
], BlockEditor.prototype, "enableHtmlEncode", void 0);
__decorate$g([
    Property(true)
], BlockEditor.prototype, "enableHtmlSanitizer", void 0);
__decorate$g([
    Property(true)
], BlockEditor.prototype, "enableDragAndDrop", void 0);
__decorate$g([
    Property([])
], BlockEditor.prototype, "blocks", void 0);
__decorate$g([
    Collection([], User)
], BlockEditor.prototype, "users", void 0);
__decorate$g([
    Complex({}, CommandMenuSettings)
], BlockEditor.prototype, "commandMenuSettings", void 0);
__decorate$g([
    Complex({}, InlineToolbarSettings)
], BlockEditor.prototype, "inlineToolbarSettings", void 0);
__decorate$g([
    Complex({}, TransformSettings)
], BlockEditor.prototype, "transformSettings", void 0);
__decorate$g([
    Complex({}, BlockActionMenuSettings)
], BlockEditor.prototype, "blockActionMenuSettings", void 0);
__decorate$g([
    Complex({}, ContextMenuSettings)
], BlockEditor.prototype, "contextMenuSettings", void 0);
__decorate$g([
    Complex({}, PasteCleanupSettings)
], BlockEditor.prototype, "pasteCleanupSettings", void 0);
__decorate$g([
    Complex({ items: [], triggerChar: '$' }, LabelSettings)
], BlockEditor.prototype, "labelSettings", void 0);
__decorate$g([
    Complex({}, ImageBlockSettings)
], BlockEditor.prototype, "imageBlockSettings", void 0);
__decorate$g([
    Complex({ languages: [], defaultLanguage: 'plaintext' }, CodeBlockSettings)
], BlockEditor.prototype, "codeBlockSettings", void 0);
__decorate$g([
    Complex({}, FontColorSettings)
], BlockEditor.prototype, "fontColorSettings", void 0);
__decorate$g([
    Complex({}, BackgroundColorSettings)
], BlockEditor.prototype, "backgroundColorSettings", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "created", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "blockChanged", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "selectionChanged", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "blockDragging", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "blockDragStart", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "blockDropped", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "focus", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "blur", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "beforePasteCleanup", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "afterPasteCleanup", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "beforeFileUpload", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "fileUploading", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "fileUploadSuccess", void 0);
__decorate$g([
    Event()
], BlockEditor.prototype, "fileUploadFailed", void 0);
BlockEditor = __decorate$g([
    NotifyPropertyChanges
], BlockEditor);

export { BackgroundColorSettings, BlockActionMenuModule, BlockEditor, BlockType, CodeBlockSettings, ColorPickerRenderer, CommandItem, CommandMenuSettings, CommandName, ContentType, ContextMenuItem, ContextMenuModule, ContextMenuSettings, DialogRenderer, DropDownListRenderer, FloatingIconRenderer, FontColorSettings, ImageBlockSettings, ImageProgressRenderer, ImageUploaderRenderer, InlineContentInsertionModule, InlineToolbarModule, InlineToolbarSettings, LabelItem, LabelSettings, LinkModule, MentionRenderer, MenuBarRenderer, PasteCleanupSettings, ProgressBarRenderer, SlashCommandModule, TabRenderer, ToolbarRenderer, TooltipRenderer, UploaderRenderer, User };
//# sourceMappingURL=ej2-blockeditor.es2015.js.map
