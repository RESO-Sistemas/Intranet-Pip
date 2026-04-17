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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deepMerge(target, source) {
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var targetValue = target["" + key];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var sourceValue = source["" + key];
            if (isObject(targetValue) && isObject(sourceValue)) {
                deepMerge(targetValue, sourceValue);
            }
            else if (sourceValue !== undefined) {
                target["" + key] = sourceValue;
            }
        }
    }
    return target;
}
/**
 * Checks whether a value is a plain object (i.e., not null and not an array).
 *
 * @param {any} item - The value to check.
 * @returns {boolean} - `true` if the value is a plain object, otherwise `false`.
 * @hidden
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
