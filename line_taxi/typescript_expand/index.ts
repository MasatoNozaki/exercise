import { checkDistanceRecordForm, DistanceRecordFormError } from "./src/checkDistanceRecordForm";

export function main(record: string): number {
    if (!checkDistanceRecordForm(record)) {
        throw new DistanceRecordFormError();
    }
    return 400;
}

// console.log(main(''));