import { checkDistanceRecordForm, DistanceRecordFormError, SPLIT, type distanceRecord } from "./checkDistanceRecordForm";

export function getDistanceRecords(record: string): distanceRecord[] {
    if (!checkDistanceRecordForm(record)) {
        throw new DistanceRecordFormError();
    }

    return record.split(SPLIT) as distanceRecord[]; // distanceRecord形式のチェックに合格しているので、asが許される
}