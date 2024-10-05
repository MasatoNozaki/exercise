import { describe, expect, test } from "bun:test";
import { overTimeRate } from "../src/overTimeRate";
import { Temporal } from "temporal-polyfill";

describe('midnight', () => {
    test('midnight time', () => {
        const time = Temporal.PlainTime.from("03:00:00.000");
        expect(overTimeRate(time)).toBe(1.5);
    });

    test('midnight start', () => {
        const time = Temporal.PlainTime.from("00:00:00.000");
        expect(overTimeRate(time)).toBe(1.5);
    });

    test('midnight end', () => {
        const time = Temporal.PlainTime.from("05:59:59.999");
        expect(overTimeRate(time)).toBe(1.5);
    });

    test('before midnight start', () => {
        const time = Temporal.PlainTime.from("23:59:59.999");
        expect(overTimeRate(time)).not.toBe(1.5);
    });

    test('after midnight end', () => {
        const time = Temporal.PlainTime.from("06:00:00.000");
        expect(overTimeRate(time)).not.toBe(1.5);
    });
});