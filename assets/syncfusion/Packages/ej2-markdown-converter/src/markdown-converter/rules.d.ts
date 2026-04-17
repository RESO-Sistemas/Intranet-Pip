export declare const other: any;
/**
 * Normal Block Grammar
 */
declare const blockNormal: any;
declare type BlockKeys = keyof typeof blockNormal;
/**
 * Normal Inline Grammar
 */
declare const inlineNormal: any;
declare type InlineKeys = keyof typeof inlineNormal;
/**
 * exports
 */
export declare const block: any;
export declare const inline: any;
export interface Rules {
    other: typeof other;
    block: Record<BlockKeys, RegExp>;
    inline: Record<InlineKeys, RegExp>;
}
export {};
