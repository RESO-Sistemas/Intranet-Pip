/**
 * Type guard to check if a shape is a BPMN Event.
 * Use this to safely access event-specific properties.
 *
 * @param {BPMNShape} shape - The shape to check.
 * @returns {boolean} True if the shape is a BPMNEventShape; otherwise, false.
 *
 * @example
 * if (isBPMNEventShape(shape)) {
 *     console.log(shape.event.event); // Safe access to event type
 * }
 *
 * @private
 */
export function isBPMNEventShape(shape) {
    return shape.shape === 'Event';
}
/**
 * Type guard to check if a shape is a BPMN Activity.
 * Use this to safely access activity-specific properties (task or subprocess).
 *
 * @param {BPMNShape} shape - The shape to check.
 * @returns {boolean} True if the shape is a BPMNActivityShape; otherwise, false.
 *
 * @example
 * if (isBPMNActivityShape(shape)) {
 *     console.log(shape.activity.activity); // Safe access to activity type
 * }
 *
 * @private
 */
export function isBPMNActivityShape(shape) {
    return shape.shape === 'Activity';
}
/**
 * Type guard to check if a shape is a BPMN Gateway.
 * Use this to safely access gateway-specific properties.
 *
 * @param {BPMNShape} shape - The shape to check.
 * @returns {boolean} True if the shape is a BPMNGatewayShape; otherwise, false.
 *
 * @example
 * if (isBPMNGatewayShape(shape)) {
 *     console.log(shape.gateway.type); // Safe access to gateway type
 * }
 *
 * @private
 */
export function isBPMNGatewayShape(shape) {
    return shape.shape === 'Gateway';
}
