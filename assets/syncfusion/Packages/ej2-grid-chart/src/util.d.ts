/**
 * This function performs a recursive deep merge, ensuring that nested objects
 * are merged correctly without replacing entire structures unless necessary.
 *
 * @template T - The type of the target object.
 * @param {T} target - The target object that will receive properties from the source.
 * @param {Partial<T>} source - The source object containing properties to merge into the target.
 * @returns {T} - The merged target object.
 * @hidden
 */
export declare function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T;
