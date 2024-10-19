import type { Temporal } from "temporal-polyfill";

export interface IDistanceFee {
    calculate(distance: number): number;
}

export interface ILowSpeedTimeFee {
    calculate(distance: number): number;
}

export type TOverTimeRate = (time: Temporal.PlainTime) => number;

export class FeeMeter {
    fee: number = 0;
    constructor(
        private distanceFee: IDistanceFee,
        private lowSpeedTimeFee: ILowSpeedTimeFee,
        private overTimeRate: TOverTimeRate
    ) { }

    update = (time: Temporal.PlainTime, distance: number, cumulativeTime: number) => {
        this.fee += this.distanceFee.calculate(distance) * this.overTimeRate(time) + this.lowSpeedTimeFee.calculate(cumulativeTime) * this.overTimeRate(time);
    };
}

// DistanceMeter自体は値が負になっても困らないが、FeeMeterは想定が複雑になり受け入れられない
// FeeMeterからすると、仮にバックしたとしても移動距離として正の数で与えてほしいので、ここでDistanceBackErrorを出す。
export class DistanceBackError extends Error {
    public constructor(value?: number) {
        super(`Distance is back. result: ${value}`);
    }
}