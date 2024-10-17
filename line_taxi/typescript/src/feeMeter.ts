import type { Temporal } from "temporal-polyfill";
import { DistanceFee } from "./distanceFee";
import { LowSpeedTimeFee } from "./lowSpeedTimeFee";
import { overTimeRate } from "./overTimeRate";

export class FeeMeter {
    fee: number = 0;
    private distanceFee = new DistanceFee();
    private lowSpeedTimeFee = new LowSpeedTimeFee();

    update = (time: Temporal.PlainTime, distance: number, cumulativeTime: number) => {
        this.fee += this.distanceFee.calculate(distance) * overTimeRate(time) + this.lowSpeedTimeFee.calculate(cumulativeTime) * overTimeRate(time);

    };
}

// DistanceMeter自体は値が負になっても困らないが、FeeMeterは想定が複雑になり受け入れられない
// FeeMeterからすると、仮にバックしたとしても移動距離として正の数で与えてほしいので、ここでDistanceBackErrorを出す。
export class DistanceBackError extends Error {
    public constructor(value?: number) {
        super(`Distance is back. result: ${value}`);
    }
}