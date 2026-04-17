import { createFormattingElement } from '../../../common/utils/dom';
import { getAccessibleTextColor, getAutoAvatarColor, getUserInitials, normalizeUrl } from '../../../common/utils/common';
import { ContentType } from '../../../models/enums';
import { createElement } from '@syncfusion/ej2-base';
/**
 * `Content renderer` module is used to render content in Blocks.
 *
 * @hidden
 */
var ContentRenderer = /** @class */ (function () {
    function ContentRenderer(manager) {
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
    ContentRenderer.prototype.renderContent = function (block, contentElement) {
        var _this = this;
        if (block.content && block.content.length > 0) {
            // clear html and render again
            if (contentElement) {
                contentElement.innerHTML = '';
            }
            block.content.forEach(function (content) {
                var node = _this.invokeContentRenderer(block, content);
                if (node && contentElement) {
                    contentElement.appendChild(node);
                }
            });
        }
        else {
            var emptyNode = this.renderText(null);
            if (emptyNode && contentElement) {
                contentElement.appendChild(emptyNode);
                if (!block.properties.placeholder) {
                    var br = document.createElement('br');
                    contentElement.appendChild(br);
                }
            }
        }
        this.parent.stateManager.updateManagerBlocks();
    };
    /**
     * Invokes appropriate content renderer based on content type.
     * Pure function - creates and returns nodes without side effects.
     *
     * @param {BlockModel} block - The block model
     * @param {ContentModel} contentModel - The content model to render
     * @returns {Node} - The created node
     * @hidden
     */
    ContentRenderer.prototype.invokeContentRenderer = function (block, contentModel) {
        var node = null;
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
            var container = document.createElement('span');
            container.appendChild(node);
            var br = document.createElement('br');
            container.appendChild(br);
            return container;
        }
        return node;
    };
    /**
     * Renders text content as a pure function.
     * Creates and returns text node with applied formatting.
     *
     * @param {ContentModel} content - The content model to render
     * @returns {Node} - The created text node
     * @hidden
     */
    ContentRenderer.prototype.renderText = function (content) {
        if (!content) {
            return document.createTextNode('');
        }
        var formattedNode = createFormattingElement(content);
        return formattedNode;
    };
    /**
     * Renders link/anchor content as a pure function.
     * Creates and returns anchor node with applied formatting.
     *
     * @param {ContentModel} content - The content model to render
     * @returns {Node} - The created anchor node
     * @hidden
     */
    ContentRenderer.prototype.renderAnchor = function (content) {
        var props = content.properties;
        props.url = normalizeUrl(props.url);
        var linkData = {
            url: props.url
        };
        var formattedNode = createFormattingElement(content, linkData);
        return formattedNode;
    };
    /**
     * Renders mention/user chip as a pure function.
     * Creates and returns mention element without appending.
     *
     * @param {ContentModel} content - The content model with mention properties
     * @returns {Node} - The created mention element
     * @hidden
     */
    ContentRenderer.prototype.renderMention = function (content) {
        var props = content.properties;
        var userModel = this.parent.users.find(function (user) { return user.id.toLowerCase() === props.userId; });
        if (!userModel) {
            return null;
        }
        var name = userModel.user.trim();
        var initials = getUserInitials(name);
        var backgroundColor = userModel.avatarBgColor || getAutoAvatarColor(userModel.id);
        var avatarUrl = userModel.avatarUrl || '';
        var wrapper = createElement('div', {
            className: 'e-mention-chip e-user-chip',
            attrs: {
                'data-user-id': userModel.id,
                contenteditable: 'false'
            }
        });
        var avatar = createElement('div', {
            className: 'em-avatar',
            attrs: {
                style: "background-color: " + backgroundColor + ";"
            }
        });
        if (avatarUrl) {
            var avatarImg = createElement('img', {
                className: 'em-img',
                attrs: {
                    src: avatarUrl,
                    alt: userModel.user
                }
            });
            avatar.appendChild(avatarImg);
        }
        else {
            var initial = createElement('div', {
                className: 'em-initial'
            });
            initial.innerText = initials;
            avatar.appendChild(initial);
        }
        var userNameContent = createElement('div', {
            className: 'em-content'
        });
        userNameContent.innerText = userModel.user;
        content.content = userModel.user;
        wrapper.appendChild(avatar);
        wrapper.appendChild(userNameContent);
        return wrapper;
    };
    /**
     * Renders label/tag chip as a pure function.
     * Creates and returns label element without appending.
     *
     * @param {ContentModel} content - The content model with label properties
     * @returns {Node} - The created label element
     * @hidden
     */
    ContentRenderer.prototype.renderLabel = function (content) {
        var props = content.properties;
        var items = this.parent.labelSettings.items;
        var labelItem = items.find(function (item) { return item.id === props.labelId; });
        if (!labelItem) {
            return null;
        }
        var labelChip = createElement('span', {
            className: 'e-mention-chip e-label-chip',
            styles: "background: " + labelItem.labelColor + ";color: " + getAccessibleTextColor(labelItem.labelColor) + ";",
            attrs: {
                'data-label-id': labelItem.id,
                contenteditable: 'false'
            }
        });
        labelChip.innerText = labelItem.groupBy + ": " + labelItem.text;
        content.content = labelItem.groupBy + ": " + labelItem.text;
        return labelChip;
    };
    return ContentRenderer;
}());
export { ContentRenderer };
