import { Gantt } from '../base/gantt';
/**
 * Column freeze module
 */
export declare class Freeze {
    parent: Gantt;
    constructor(gantt: Gantt);
    /**
     * Get module name
     *
     * @returns {string} .
     */
    private getModuleName;
    /**
     * To destroy freeze module.
     *
     * @returns {void} .
     * @private
     */
    destroy(): void;
}
