import { checkDistanceRecordForm } from "./src/checkDistanceRecordForm";

export function main(record: string): boolean {
    return checkDistanceRecordForm(record);
}

// console.log(main(''));