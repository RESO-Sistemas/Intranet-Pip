import { IRenderer } from './../base/interface';
import { ServiceLocator } from './../services/service-locator';
import { Dialog } from '@syncfusion/ej2-popups';
/**
 * `Link` module is used to handle undo actions.
 */
export declare class Link {
    private rteID;
    private i10n;
    private parent;
    contentModule: IRenderer;
    dialogObj: Dialog;
    private checkBoxObj;
    serviceLocator: ServiceLocator;
    private rendererFactory;
    private quickToolObj;
    private dialogRenderObj;
    private isDestroyed;
    private mouseDown;
    private linkQTPopupTime;
    private constructor();
    protected addEventListener(): void;
    private bindOnEnd;
    private onToolbarAction;
    protected removeEventListener(): void;
    private onIframeMouseDown;
    private updateCss;
    private setCssClass;
    private showLinkQuickToolbar;
    private showLinkPopup;
    private hideLinkQuickToolbar;
    private editAreaClickHandler;
    private onKeyDown;
    private openDialog;
    private showDialog;
    private closeDialog;
    private clearDialogObj;
    private linkDialog;
    private hasAnchorNodePresent;
    private insertlink;
    private isUrl;
    private handleKeyDown;
    private checkUrl;
    private removeLink;
    private openLink;
    private getAnchorNode;
    private editLink;
    private cancelDialog;
    private onDocumentClick;
    /**
     * Destroys the ToolBar.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     */
    private getModuleName;
}
