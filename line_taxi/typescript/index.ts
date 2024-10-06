import { calculateFee } from "./src/fee";
import { DistanceMeter, LowSpeedTimeMeter, type record } from "./src/meters";

const distanceMeter = new DistanceMeter();
const lowSpeedTimeMeter = new LowSpeedTimeMeter();

const update = (record: record) => {
    distanceMeter.update(record.distance);
    lowSpeedTimeMeter.update(record);
};

export const answer = (input: string) => {
    const lines = input.split('\n');
    for (const line of lines) {
        const record = convert_to_record(line);
        update(record);
    }
    // やっぱり累積じゃないとだめだわ！
    // トップダウンでやっていきましょう
    console.log(calculateFee(distanceMeter.distance, lowSpeedTimeMeter.cumulativeTime,));
    return 0;
};

