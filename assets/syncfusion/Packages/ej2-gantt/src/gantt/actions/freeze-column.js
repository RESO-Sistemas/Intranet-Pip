import { TreeGrid, Freeze as TreeGridFreeze } from '@syncfusion/ej2-treegrid';
/**
 * Column freeze module
 */
var Freeze = /** @class */ (function () {
    function Freeze(gantt) {
        this.parent = gantt;
        TreeGrid.Inject(TreeGridFreeze);
        this.parent.treeGrid.frozenColumns = this.parent.frozenColumns;
    }
    /**
     * Get module name
     *
     * @returns {string} .
     */
    Freeze.prototype.getModuleName = function () {
        return 'freeze';
    };
    /**
     * To destroy freeze module.
     *
     * @returns {void} .
     * @private
     */
    Freeze.prototype.destroy = function () {
        // Destroy Method
    };
    return Freeze;
}());
export { Freeze };
