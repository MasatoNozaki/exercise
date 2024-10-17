const LOW_SPEED_TIME_BASE_FEE = 40;

// cumulativeTimeが戻っても、新しくSectionを超えない限り問題ないとする
export class LowSpeedTimeFee {
    private nowLowSpeedTimeSection = 0;

    calculate = (cumulativeTime: number) => {
        const newSection = Math.floor(cumulativeTime / 45);
        if (Math.floor(cumulativeTime / 45) > this.nowLowSpeedTimeSection) {
            const lowSpeedTimeFee = (newSection - this.nowLowSpeedTimeSection) * LOW_SPEED_TIME_BASE_FEE;
            this.nowLowSpeedTimeSection = newSection;
            return lowSpeedTimeFee;
        }
        else {
            return 0;
        }
    };
}