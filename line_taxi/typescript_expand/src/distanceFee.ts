import type { distanceRecord } from "./checkDistanceRecordForm";

/**
 * distanceはm単位
 * @param distanceRecords 距離レコードの文字列配列
 * @returns 距離による総運賃
 */
export function calculateDistanceFee(distanceRecords: distanceRecord[]): number {
    let totalFee = 0;
    let totalDistance = getTotalDistance(distanceRecords);
    // 初乗運賃
    if (totalDistance > 0) {
        totalFee += 400;
        totalDistance -= 1000;
    }

    // 10km未満
    while (totalDistance >= 0) {
        totalFee += 40;
        totalDistance -= 400;
    }

    return totalFee;
}

function getTotalDistance(distanceRecords: distanceRecord[]): number {
    let sum = 0;
    for (const distance of distanceRecords) {
        sum += Number(distance);
        sum = Math.round(sum * 10) / 10;
    }

    return sum;
}