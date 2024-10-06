import type { Temporal } from "temporal-polyfill";

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

export class TimeBackError extends Error {
    public constructor(message?: string) {
        super(message);
    }
}