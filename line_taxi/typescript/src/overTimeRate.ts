import { Temporal } from "temporal-polyfill";

const MIDNIGHT_START = Temporal.PlainTime.from("00:00:00.000");
const MIDNIGHT_END = Temporal.PlainTime.from("05:59:59.999");
const PEEK_FIRST_START = Temporal.PlainTime.from("06:00:00.000");
const PEEK_FIRST_END = Temporal.PlainTime.from("09:29:59.999");
const PEEK_SECOND_START = Temporal.PlainTime.from("18:00:00.000");
const PEEK_SECOND_END = Temporal.PlainTime.from("23:59:59.999");
export const overTimeRate = (time: Temporal.PlainTime): number => {
    if (isMidnight(time)) {
        return 1.5;
    }

    if (isPeek(time)) {
        return 1.3;
    }
    return 1.0;
};

const isMidnight = (time: Temporal.PlainTime): boolean => {
    if (
        Temporal.PlainTime.compare(time, MIDNIGHT_START) >= 0 &&
        Temporal.PlainTime.compare(time, MIDNIGHT_END) <= 0
    ) {
        return true;
    }

    return false;
};

const isPeek = (time: Temporal.PlainTime): boolean => {
    if (
        Temporal.PlainTime.compare(time, PEEK_FIRST_START) >= 0 &&
        Temporal.PlainTime.compare(time, PEEK_FIRST_END) <= 0
    ) {
        return true;
    }

    if (
        Temporal.PlainTime.compare(time, PEEK_SECOND_START) >= 0 &&
        Temporal.PlainTime.compare(time, PEEK_SECOND_END) <= 0
    ) {
        return true;
    }

    return false;
};