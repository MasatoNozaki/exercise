const FIRST_RIDE_DISTANCE = 1000;
const SHORT_DISTANCE = 10200;
const SHORT_DISTANCE_SECTION = 400;
const LONG_DISTANCE_SECTION = 350;
const FIRST_RIDE_FEE = 400;
const DISTANCE_BASE_FEE = 40;
const MAX_SHORT_DISTANCE_SECTION_NUM = Math.floor((SHORT_DISTANCE - FIRST_RIDE_DISTANCE) / SHORT_DISTANCE_SECTION);

export class DistanceFee {
    private isCalculateFirstSection = false;
    private nowDistanceSection = 0;

    calculate = (distance: number) => {
        if (distance < 0) {
            throw new DistanceBackError(distance);
        }
        // 初乗区間
        if (!this.isCalculateFirstSection && distance <= FIRST_RIDE_DISTANCE) {
            this.isCalculateFirstSection = true;
            return FIRST_RIDE_FEE;
        }
        // 短距離区間
        else if (FIRST_RIDE_DISTANCE < distance && distance <= SHORT_DISTANCE) {
            const newSection = Math.floor((distance - FIRST_RIDE_DISTANCE) / SHORT_DISTANCE_SECTION);
            const distanceFee = (newSection - this.nowDistanceSection) * DISTANCE_BASE_FEE;
            this.nowDistanceSection = newSection;
            return distanceFee;
        }
        // 長距離区間
        else if (SHORT_DISTANCE < distance) {
            const newSection = Math.floor((distance - SHORT_DISTANCE) / LONG_DISTANCE_SECTION) + MAX_SHORT_DISTANCE_SECTION_NUM;
            const distanceFee = (newSection - this.nowDistanceSection) * DISTANCE_BASE_FEE;
            this.nowDistanceSection = newSection;
            return distanceFee;
        }
        else {
            return 0;
        }
    };
}

// DistanceMeter自体は値が負になっても困らないが、料金計算は想定が複雑になり受け入れられない
// 料金計算からすると、仮にバックしたとしても移動距離として正の数で与えてほしいので、ここでDistanceBackErrorを出す。
export class DistanceBackError extends Error {
    public constructor(value?: number) {
        super(`Distance is back. result: ${value}`);
    }
}