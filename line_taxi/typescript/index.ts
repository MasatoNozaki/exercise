import type { Temporal } from "temporal-polyfill";
import { DistanceMeter } from "./src/distanceMeter";
import { FeeMeter } from "./src/feeMeter";
import { LowSpeedTimeMeter } from "./src/lowSpeedTimeMeter";
import { DistanceFee } from "./src/distanceFee";
import { LowSpeedTimeFee } from "./src/lowSpeedTimeFee";
import { overTimeRate } from "./src/overTimeRate";

type Record = {
    time: Temporal.PlainTime;
    distance: number;
    elapsedSecond: number;
};

const answer = (input: string) => {
    const distanceMeter = new DistanceMeter();
    const lowSpeedTimeMeter = new LowSpeedTimeMeter();

    // 使うの大変だなぁ
    const distanceFee = new DistanceFee();
    const lowSpeedTimeFee = new LowSpeedTimeFee();
    const feeMeter = new FeeMeter(distanceFee, lowSpeedTimeFee, overTimeRate); // overTimeRateまでやってるのはやりすぎ？

    const lines = input.split('\n');
    validate(lines);
    for (const line of lines) {
        const record = convertRecord(line);
        update(record, distanceMeter, lowSpeedTimeMeter, feeMeter);
    }
};

const update = (record: Record, distanceMeter: DistanceMeter, lowSpeedTimeMeter: LowSpeedTimeMeter, feeMeter: FeeMeter) => {
    distanceMeter.update(record.distance);
    lowSpeedTimeMeter.update({
        elapsedSecond: record.elapsedSecond,
        distance: record.distance
    });
    feeMeter.update(record.time, distanceMeter.distance, lowSpeedTimeMeter.cumulativeTime);
};

