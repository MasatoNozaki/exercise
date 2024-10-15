import { DistanceMeter } from "./distanceMeter";
import { LowSpeedTimeMeter, type elapsedRecord } from "./lowSpeedTimeMeter";

// 23時59分59秒999から0時に戻ると、低速走行時間メーターからすると時刻が連続しているという確証が取れない
// レコード記録時点からの経過時間を表すレコードをRecordに追加することで対応
// LowSpeedTimeMeterは経過レコードを扱う
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

    update = (feeInfo: feeInfo) => {
        // fee += this.distanceFee(feeInfo.elapsed.distance) * overTimeRate(feeInfo.rate) + lowSpeedTimeFee(feeInfo.elapsed.elapsedSecond) * overTimeRate(feeInfo.rate);
        this.fee += this.distanceFee(feeInfo.elapsed.distance);
        console.log(this.fee);
    };
    private distanceFee = (distance: feeInfo['elapsed']['distance']) => {
        this.distanceMeter.update(distance);
        if (!this.isCalculateFirstSection && this.distanceMeter.distance <= 1000) {
            this.isCalculateFirstSection = true;
            return 400;
        }
        else if (1000 < this.distanceMeter.distance && this.distanceMeter.distance <= 10200) {
            const newSection = Math.floor((this.distanceMeter.distance - 1000) / 400);
            const distanceFee = (newSection - this.nowDistanceSection) * 40;
            this.nowDistanceSection = newSection;
            return distanceFee;
        }
        else if (10200 < this.distanceMeter.distance) {
            const newSection = Math.floor((this.distanceMeter.distance - 10200) / 350) + Math.floor((10200 - 1000) / 400);
            const distanceFee = (newSection - this.nowDistanceSection) * 40;
            this.nowDistanceSection = newSection;
            return distanceFee;
        }
        else {
            return 0;
        }
    };
}