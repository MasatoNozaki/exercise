import { describe, expect, test } from "bun:test";
import { Temporal } from "temporal-polyfill";
import { LowSpeedTimeMeter, TimeBackError, type record } from "../src/meters";

describe('LowSpeedMeterTest', () => {
    test('add low speed', () => {
        const firstRecord: record = {
            time: Temporal.PlainTime.from("00:00:00"),
            distance: 0
        };

        const secondRecord: record = {
            time: Temporal.PlainTime.from("01:00:00"),
            distance: 99.9
        };

        const lowSpeedMeter = new LowSpeedTimeMeter();
        lowSpeedMeter.update(firstRecord);
        expect(lowSpeedMeter.time).toBe(0);

        lowSpeedMeter.update(secondRecord);
        expect(lowSpeedMeter.time).toBe(3600);
    });

    test('add no low speed', () => {
        const firstRecord: record = {
            time: Temporal.PlainTime.from("00:00:00"),
            distance: 0
        };

        const secondRecord: record = {
            time: Temporal.PlainTime.from("00:00:01"),
            distance: 99.9
        };

        const lowSpeedMeter = new LowSpeedTimeMeter();
        lowSpeedMeter.update(firstRecord);
        expect(lowSpeedMeter.time).toBe(0);

        lowSpeedMeter.update(secondRecord);
        expect(lowSpeedMeter.time).toBe(0);
    });

    test('add triple record', () => {
        const firstRecord: record = {
            time: Temporal.PlainTime.from("00:00:00"),
            distance: 0
        };
        const secondRecord: record = {
            time: Temporal.PlainTime.from("00:00:01"),
            distance: 99.9
        };
        const thirdRecord: record = {
            time: Temporal.PlainTime.from("00:00:11"),
            distance: 1
        };

        const lowSpeedMeter = new LowSpeedTimeMeter();
        lowSpeedMeter.update(firstRecord);
        expect(lowSpeedMeter.time).toBe(0);

        lowSpeedMeter.update(secondRecord);
        expect(lowSpeedMeter.time).toBe(0);

        lowSpeedMeter.update(thirdRecord);
        expect(lowSpeedMeter.time).toBe(10);
    });

    test('add before record', () => {
        const firstRecord: record = {
            time: Temporal.PlainTime.from("02:00:00"),
            distance: 0
        };

        const secondRecord: record = {
            time: Temporal.PlainTime.from("01:00:00"),
            distance: 99.9
        };

        const lowSpeedMeter = new LowSpeedTimeMeter();
        lowSpeedMeter.update(firstRecord);
        expect(lowSpeedMeter.time).toBe(0);

        expect(() => lowSpeedMeter.update(secondRecord)).toThrowError(TimeBackError);
    });
});