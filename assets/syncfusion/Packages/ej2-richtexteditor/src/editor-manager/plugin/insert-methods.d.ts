/**
 * Node appending methods.
 *
 * @hidden
 */
export declare class InsertMethods {
    /**
     * WrapBefore method
     *
     * @param {Text} textNode - specifies the text node
     * @param {HTMLElement} parentNode - specifies the parent node
     * @param {boolean} isAfter - specifies the boolean value
     * @returns {Text} - returns the text value
     * @hidden
     * @private
     */
    static WrapBefore(textNode: Text, parentNode: HTMLElement, isAfter?: boolean): Text;
    /**
     * Wrap method
     *
     * @param {HTMLElement} childNode - specifies the child node
     * @param {HTMLElement} parentNode - specifies the parent node.
     * @returns {HTMLElement} - returns the element
     * @hidden
     * @private
     */
    static Wrap(childNode: HTMLElement, parentNode: HTMLElement): HTMLElement;
    /**
     * unwrap method
     *
     * @param {Node} node - specifies the node element.
     * @returns {Node[]} - returns the array of value
     * @hidden
     * @private
     */
    static unwrap(node: Node | HTMLElement): Node[];
    /**
     * AppendBefore method
     *
     * @param {HTMLElement} textNode - specifies the element
     * @param {HTMLElement} parentNode - specifies the parent node
     * @param {boolean} isAfter - specifies the boolean value
     * @returns {void}
     * @hidden
     * @private
     */
    static AppendBefore(textNode: HTMLElement | Text | DocumentFragment, parentNode: HTMLElement | Text | DocumentFragment, isAfter?: boolean): HTMLElement | Text | DocumentFragment;
}
