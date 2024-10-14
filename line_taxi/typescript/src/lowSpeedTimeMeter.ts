import type { Temporal } from "temporal-polyfill";

// 23時59分59秒999から0時に戻ると、低速走行時間メーターからすると時刻が連続しているという確証が取れない
// レコード記録時点からの経過時間を表すレコードをRecordに追加することで対応
// LowSpeedTimeMeterは経過レコードを扱う
export type record = {
    time: Temporal.PlainTime;
    elapsed: elapsedRecord;
};

export type elapsedRecord = {
    elapsedSecond: number;
    distance: number;
};

export class LowSpeedTimeMeter {
    cumulativeTime: number = 0;
    private beforeElapsed: elapsedRecord['elapsedSecond'] | null = null;
    update = (record: elapsedRecord): void => {
        this.cumulativeTime += this.newLowSpeedTime(record);
        this.updateBeforeRecord(record.elapsedSecond);
    };
    private updateBeforeRecord = (time: elapsedRecord['elapsedSecond']): void => {
        this.beforeElapsed = time;
    };
    private newLowSpeedTime = (record: elapsedRecord): number => {
        if (this.beforeElapsed != null) {
            const difference = record.elapsedSecond - this.beforeElapsed;
            if (difference < 0) {
                throw new TimeBackError(`Time is back. result: ${difference}`);
            }
            // 時速10km以下なら
            const km = record.distance / 1000;
            const hour = difference / 60 / 60;
            if (km / hour < 10) {
                return difference;
            }
        }

        return 0;
    };
}

export class TimeBackError extends Error {
    public constructor(message?: string) {
        super(message);
        this.name = 'TimeBackError';
    }
}