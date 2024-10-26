import type { distanceRecord } from "./checkDistanceRecordForm";

const FIRST_RIDE_FEE = 400;
const FIRST_RIDE_DISTANCE = 1000;
const SHORT_DISTANCE_SECTION = 400;
const DISTANCE_FEE = 40;

/**
 * distanceはm単位
 * 
 * 1400mから40円の加算が開始し、10200mで40円の加算を行ったあと、短距離区間は終了（問題文に「1000+400*0を超え」とあるため）
 * 
 * 10550mから40円の加算が開始
 * @param distanceRecords 距離レコードの文字列配列
 * @returns 距離による総運賃
 */
export function calculateDistanceFee(distanceRecords: distanceRecord[]): number {
    let totalFee = 0;
    let totalDistance = getTotalDistance(distanceRecords);
    // 初乗運賃
    if (totalDistance > 0) {
        totalFee += FIRST_RIDE_FEE;
        totalDistance -= FIRST_RIDE_DISTANCE;
    }

    // 10km未満
    while (totalDistance >= SHORT_DISTANCE_SECTION) {
        totalFee += DISTANCE_FEE;
        totalDistance -= SHORT_DISTANCE_SECTION;
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