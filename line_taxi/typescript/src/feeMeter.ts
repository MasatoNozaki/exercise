import { DistanceMeter } from "./distanceMeter";
import { LowSpeedTimeMeter, type elapsedRecord } from "./lowSpeedTimeMeter";

// feeにとっては実際の時刻ではなく、現在割増がかかるかどうかが重要。timeとelapsedSecondとの辻褄の問題も出てくるので、利用しないなら使わないようにする。
export type feeInfo = {
    rate: 'normal' | 'peekTime' | 'midnight';
    elapsed: elapsedRecord;
};

export class FeeMeter {
    fee: number = 0;
    private distanceMeter = new DistanceMeter();
    private lowSpeedTimeMeter = new LowSpeedTimeMeter();
    private isCalculateFirstSection = false;
    private nowDistanceSection = 0;
    private nowLowSpeedTimeSection = 0;

    private readonly FIRST_RIDE_DISTANCE = 1000;
    private readonly SHORT_DISTANCE = 10200;
    private readonly SHORT_DISTANCE_SECTION = 400;
    private readonly LONG_DISTANCE_SECTION = 350;
    private readonly FIRST_RIDE_FEE = 400;
    private readonly DISTANCE_BASE_FEE = 40;
    private readonly LOW_SPEED_TIME_BASE_FEE = 40;
    private readonly MAX_SHORT_DISTANCE_SECTION_NUM = Math.floor((this.SHORT_DISTANCE - this.FIRST_RIDE_DISTANCE) / this.SHORT_DISTANCE_SECTION);

    update = (feeInfo: feeInfo) => {
        this.fee += this.distanceFee(feeInfo.elapsed.distance) * this.overTimeRate(feeInfo.rate) + this.lowSpeedTimeFee(feeInfo.elapsed) * this.overTimeRate(feeInfo.rate);

    };
    private distanceFee = (distance: feeInfo['elapsed']['distance']) => {
        if (distance < 0) {
            throw new DistanceBackError(distance);
        }
        this.distanceMeter.update(distance);
        // 初乗区間
        if (!this.isCalculateFirstSection && this.distanceMeter.distance <= this.FIRST_RIDE_DISTANCE) {
            this.isCalculateFirstSection = true;
            return this.FIRST_RIDE_FEE;
        }
        // 短距離区間
        else if (this.FIRST_RIDE_DISTANCE < this.distanceMeter.distance && this.distanceMeter.distance <= this.SHORT_DISTANCE) {
            const newSection = Math.floor((this.distanceMeter.distance - this.FIRST_RIDE_DISTANCE) / this.SHORT_DISTANCE_SECTION);
            const distanceFee = (newSection - this.nowDistanceSection) * this.DISTANCE_BASE_FEE;
            this.nowDistanceSection = newSection;
            return distanceFee;
        }
        // 長距離区間
        else if (this.SHORT_DISTANCE < this.distanceMeter.distance) {
            const newSection = Math.floor((this.distanceMeter.distance - this.SHORT_DISTANCE) / this.LONG_DISTANCE_SECTION) + this.MAX_SHORT_DISTANCE_SECTION_NUM;
            const distanceFee = (newSection - this.nowDistanceSection) * this.DISTANCE_BASE_FEE;
            this.nowDistanceSection = newSection;
            return distanceFee;
        }
        else {
            return 0;
        }
    };

    private lowSpeedTimeFee = (elapsed: feeInfo['elapsed']) => {
        this.lowSpeedTimeMeter.update(elapsed);
        const newSection = Math.floor(this.lowSpeedTimeMeter.cumulativeTime / 45);
        if (Math.floor(this.lowSpeedTimeMeter.cumulativeTime / 45) > this.nowLowSpeedTimeSection) {
            const lowSpeedTimeFee = (newSection - this.nowLowSpeedTimeSection) * this.LOW_SPEED_TIME_BASE_FEE;
            this.nowLowSpeedTimeSection = newSection;
            return lowSpeedTimeFee;
        }
        else {
            return 0;
        }
    };

    private overTimeRate = (rate: feeInfo['rate']) => {
        switch (rate) {
            case 'normal':
                return 1.0;
            case 'peekTime':
                return 1.3;
            case 'midnight':
                return 1.5;
        }
    };
}

// DistanceMeter自体は値が負になっても困らないが、FeeMeterは想定が複雑になり受け入れられない
// FeeMeterからすると、仮にバックしたとしても移動距離として正の数で与えてほしいので、ここでDistanceBackErrorを出す。
export class DistanceBackError extends Error {
    public constructor(value?: number) {
        super(`Distance is back. result: ${value}`);
    }
}