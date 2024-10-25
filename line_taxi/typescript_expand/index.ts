import { checkExistance_First_and_LastRecord, checkFirstDistance } from "./src/checkDistanceRecordForm";

export function main(record: string): boolean {
    return checkFirstDistance(record) && checkExistance_First_and_LastRecord(record);
}

// console.log(main(''));