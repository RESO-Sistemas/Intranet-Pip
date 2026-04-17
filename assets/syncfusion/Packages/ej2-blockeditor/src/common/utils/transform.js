var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * Creates a shallow copy of the given object, excluding specified properties.
 *
 * @param {any} obj - The object to copy.
 * @param {string[]} excludeKeys - Optional array of property keys to exclude from the copy.
 * @returns {any} A new object with copied properties.
 */
export function cloneObject(obj, excludeKeys) {
    if (excludeKeys === void 0) { excludeKeys = []; }
    var result = Object.create(Object.getPrototypeOf(obj));
    for (var key in obj) {
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
export function transformIntoToolbarItem(items) {
    return items.map(function (item) { return ({
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
    }); });
}
export function sanitizeBlockActionItems(items) {
    return items.map(function (item) { return ({
        id: item.id,
        label: item.label,
        iconCss: item.iconCss,
        disabled: item.disabled,
        tooltip: item.tooltip,
        shortcut: item.shortcut
    }); });
}
export function sanitizeCommandMenuItems(items) {
    return items.map(function (item) { return ({
        id: item.id,
        type: item.type,
        disabled: item.disabled,
        iconCss: item.iconCss,
        label: item.label,
        groupBy: item.groupBy,
        tooltip: item.tooltip,
        shortcut: item.shortcut
    }); });
}
export function sanitizeLabelItems(items) {
    return items.map(function (item) { return ({
        id: item.id,
        text: item.text,
        groupBy: item.groupBy,
        labelColor: item.labelColor,
        iconCss: item.iconCss
    }); });
}
export function sanitizeContextMenuItems(items) {
    return items.map(function (item) { return ({
        id: item.id,
        text: item.text,
        iconCss: item.iconCss,
        separator: item.separator,
        shortcut: item.shortcut,
        items: sanitizeContextMenuItems(item.items)
    }); });
}
export function sanitizeHeadingProps(props) {
    var sanitizedInnerProps = props ? __assign({}, props) : {};
    var level = sanitizedInnerProps.level;
    if (!Number.isInteger(level) || level < 1 || level > 4) {
        sanitizedInnerProps.level = 1;
    }
    return sanitizedInnerProps;
}
