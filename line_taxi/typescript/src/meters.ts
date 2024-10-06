import type { Temporal } from "temporal-polyfill";
import { overTimeRate } from "./overTimeRate";

export type record = {
    time: Temporal.PlainTime;
    distance: number;
};

// 累積なのでクラスである必要がある
export class DistanceMeter {
    distance: number = 0;
    update = (newDistance: number) => {
        this.distance += newDistance;
    };
};

// 累積なのでクラスである必要がある
export class LowSpeedTimeMeter {
    cumulativeTime: number = 0;
    private beforeTime: Temporal.PlainTime | null = null;
    update = (record: record): void => {
        this.cumulativeTime += this.newLowSpeedTime(record);
        this.updateBeforeRecord(record.time);
    };
    private updateBeforeRecord = (time: Temporal.PlainTime): void => {
        this.beforeTime = time;
    };
    private newLowSpeedTime = (record: record): number => {
        if (this.beforeTime != null) {
            // 45秒単位で計算することになるので、秒変換
            const difference = record.time.since(this.beforeTime).total('second');
            // 時速10km以下なら
            const km = record.distance / 1000;
            const hour = difference / 60 / 60;
            if (km / hour < 10) {
                // 結果が負の場合。1日経った結果なのか、2日経った結果なのかが不明で経過時間が定義できないためエラー
                if (difference < 0) {
                    throw new TimeBackError(`Time is back. result: ${difference}`);
                }
                return difference;
            }
        }

        return 0;
    };
}

// その時与えられた総走行距離、総低速時間、時刻をもとに料金を計算するだけの機能
// 時刻の順番などはこれを利用する側が担保する
// feeが累積でなくなったため、クラスである必要がない
export class FeeMeter {
    fee: number = 0;
    private firstRideDistance = 1000;
    private firstRideFee = 400;
    private distanceBaseFee = 40;
    private lowSpeedTimeBaseFee = 40;
    update = (distance: DistanceMeter['distance'], cumlativeTime: LowSpeedTimeMeter['cumulativeTime'], time: record['time']) => {
        this.fee = this.distanceFee(distance) * overTimeRate(time) + this.lowSpeedTimeFee(cumlativeTime) * overTimeRate(time);
    };
    private distanceFee = (distance: DistanceMeter['distance']): number => {
        if (distance <= this.firstRideDistance) {
            return this.firstRideFee;
        }
        else if (distance < 10000) {
            return this.firstRideFee + Math.floor((distance - this.firstRideDistance) / 400) * this.distanceBaseFee;
        }
        else {
            return this.firstRideFee + Math.floor((distance - this.firstRideDistance) / 350) * this.distanceBaseFee;
        }
    };
    private lowSpeedTimeFee = (cumulativeTime: LowSpeedTimeMeter['cumulativeTime']): number => {
        return Math.floor(cumulativeTime / 45) * this.lowSpeedTimeBaseFee;
    };
}

export class TimeBackError extends Error {
    public constructor(message?: string) {
        super(message);
    }
}