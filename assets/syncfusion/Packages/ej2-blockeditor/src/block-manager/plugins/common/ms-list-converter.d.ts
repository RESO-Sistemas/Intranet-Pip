import { ClipboardCleanupModule } from './clipboard-cleanup';
/**
 * List item properties for the list conversion in MS Word cleanup
 *
 * @private
 * @hidden
 */
export interface ListItemProperties {
    listType: string;
    content: string[];
    nestedLevel: number;
    listFormatOverride: number;
    class: string;
    listStyle: string;
    listStyleTypeName: string;
    start: number;
    styleMarginLeft: string;
}
export declare class WordListConverter {
    private parent;
    private upperRomanNumber;
    private lowerRomanNumber;
    private lowerGreekNumber;
    private listContents;
    constructor(cleanupModule: ClipboardCleanupModule);
    /**
     * Converts MS Word list nodes to standard HTML lists
     *
     * @param {Element[]} listNodes - Array of list nodes to convert
     * @returns {void} - No return value
     * @hidden
     */
    convertListNodes(listNodes: Element[]): void;
    private processListNodes;
    private fixOutlineLevel;
    private extractNestingLevel;
    private extractListFormatOverride;
    private determineListProperties;
    private determineStartAttribute;
    private updateNodeStyle;
    private replaceNodesWithLists;
    private getlistStyleType;
    private getOrderedListStyleType;
    private getUnorderedListStyleType;
    private makeConversion;
    private isStandardListType;
    private shouldResetListItem;
    private createParagraphWithContent;
    private isNewRootList;
    private createRootList;
    private isSameLevelList;
    private addToSameLevelList;
    private isDeeperNestedList;
    private createNestedList;
    private createStandardNestedList;
    private getLastListItem;
    private isTopLevelList;
    private handleTopLevelList;
    private handleOtherNestingScenarios;
    private createDifferentFormatList;
    private applyListItemStyles;
    private setStartAttributeIfNeeded;
    private getListContent;
    private handleTextList;
    private cleanupListIgnoreTags;
    private cleanupListOrder;
    private processListOrderElement;
    private extractBulletMarker;
}
