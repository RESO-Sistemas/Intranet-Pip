/**
 * Defines the constraint types used for task scheduling.
 *
 * Available values:
 * - `0`: AsSoonAsPossible (ASAP) – Task starts as early as possible. Default for auto-scheduled tasks.
 * - `1`: AsLateAsPossible (ALAP) – Task finishes as late as possible without delaying dependents.
 * - `2`: MustStartOn (MSO) – Task must start on the specified date.
 * - `3`: MustFinishOn (MFO) – Task must finish on the specified date.
 * - `4`: StartNoEarlierThan (SNET) – Task cannot start before the specified date.
 * - `5`: StartNoLaterThan (SNLT) – Task must start on or before the specified date.
 * - `6`: FinishNoEarlierThan (FNET) – Task cannot finish before the specified date.
 * - `7`: FinishNoLaterThan (FNLT) – Task must finish on or before the specified date.
 */
export var ConstraintType;
(function (ConstraintType) {
    ConstraintType[ConstraintType["AsSoonAsPossible"] = 0] = "AsSoonAsPossible";
    ConstraintType[ConstraintType["AsLateAsPossible"] = 1] = "AsLateAsPossible";
    ConstraintType[ConstraintType["MustStartOn"] = 2] = "MustStartOn";
    ConstraintType[ConstraintType["MustFinishOn"] = 3] = "MustFinishOn";
    ConstraintType[ConstraintType["StartNoEarlierThan"] = 4] = "StartNoEarlierThan";
    ConstraintType[ConstraintType["StartNoLaterThan"] = 5] = "StartNoLaterThan";
    ConstraintType[ConstraintType["FinishNoEarlierThan"] = 6] = "FinishNoEarlierThan";
    ConstraintType[ConstraintType["FinishNoLaterThan"] = 7] = "FinishNoLaterThan";
})(ConstraintType || (ConstraintType = {}));
