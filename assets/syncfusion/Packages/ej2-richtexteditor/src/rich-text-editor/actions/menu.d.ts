import { RendererFactory } from '../services/renderer-factory';
import { ServiceLocator } from '../services/service-locator';
import { Menu } from '@syncfusion/ej2-navigations';
import { IRichTextEditor } from '../../rich-text-editor/base/interface';
import { IToolbarItems } from '../../common/interface';
import { IMenuRenderTargetType } from '../base/types';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
export declare class MenuButton {
    parent: IRichTextEditor;
    private isDestroyed;
    protected locator: ServiceLocator;
    protected renderFactory: RendererFactory;
    private i10n;
    aiCommandsMenu: Menu;
    aiCommandsDropDownButton: DropDownButton;
    private toolbarRenderer;
    private initRender;
    constructor(parent: IRichTextEditor, serviceLocator: ServiceLocator);
    private addEventListener;
    renderMenu(toolbarItems: (string | IToolbarItems)[], toolbarElement: HTMLElement, containerType: IMenuRenderTargetType): void;
    private setRtl;
    private setCssClass;
    destroyMenu(): void;
    private removeEventListener;
    destroy(): void;
}
