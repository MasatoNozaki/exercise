/**
 * 料金計算
 * 元々問題文通り料金メータークラス（FeeMeter）としていたが、feeの累積をやめたため、関数化
 * 問題文では考慮しなくて良いとされているが、複数区間を一気に通過することを考えた場合、累積計算をやめるのが都合が良かった
 * そのおかげで、前回の区間を記憶する必要もなくなった
 * その時与えられた総走行距離、総低速時間、時刻をもとに料金を計算するだけの機能なので、レコード順番はこれを利用する側が担保する
 */

import type { DistanceMeter, LowSpeedTimeMeter, record } from "./meters";
import { overTimeRate } from "./overTimeRate";

const FIRST_RIDE_DISTANCE = 1000;
const FIRST_RIDE_FEE = 400;
const DISTANCE_BASE_FEE = 40;
const LOW_SPEED_TIME_BASE_FEE = 40;

export const calculateFee = (distance: DistanceMeter['distance'], cumlativeTime: LowSpeedTimeMeter['cumulativeTime'], time: record['time']) => {
    return distanceFee(distance) * overTimeRate(time) + lowSpeedTimeFee(cumlativeTime) * overTimeRate(time);
};

const distanceFee = (distance: DistanceMeter['distance']): number => {
    if (distance <= FIRST_RIDE_DISTANCE) {
        return FIRST_RIDE_FEE;
    }
    else if (distance < 10000) {
        return FIRST_RIDE_FEE + Math.floor((distance - FIRST_RIDE_DISTANCE) / 400) * DISTANCE_BASE_FEE;
    }
    else {
        return FIRST_RIDE_FEE + Math.floor((distance - FIRST_RIDE_DISTANCE) / 350) * DISTANCE_BASE_FEE;
    }
};

const lowSpeedTimeFee = (cumulativeTime: LowSpeedTimeMeter['cumulativeTime']): number => {
    return Math.floor(cumulativeTime / 45) * LOW_SPEED_TIME_BASE_FEE;
};