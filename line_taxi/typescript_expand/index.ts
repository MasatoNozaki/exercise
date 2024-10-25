import { calculateDistanceFee } from "./src/distanceFee";
import { getDistanceRecords } from "./src/getDistanceRecords";

export function main(record: string): number {
    const distanceRecords = getDistanceRecords(record);

    return calculateDistanceFee(distanceRecords);
}

// console.log(main(''));