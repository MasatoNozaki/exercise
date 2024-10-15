export type elapsedRecord = {
    elapsedSecond: number;
    distance: number;
};

export class LowSpeedTimeMeter {
    cumulativeTime: number = 0;
    private beforeElapsed: elapsedRecord['elapsedSecond'] = 0;
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
        else {

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