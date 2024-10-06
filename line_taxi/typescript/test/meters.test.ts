import { describe, expect, test } from "bun:test";
import { Temporal } from "temporal-polyfill";
import { FeeMeter, LowSpeedTimeMeter, TimeBackError, type record } from "../src/meters";

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
        expect(lowSpeedMeter.cumulativeTime).toBe(0);

        lowSpeedMeter.update(secondRecord);
        expect(lowSpeedMeter.cumulativeTime).toBe(3600);
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
        expect(lowSpeedMeter.cumulativeTime).toBe(0);

        lowSpeedMeter.update(secondRecord);
        expect(lowSpeedMeter.cumulativeTime).toBe(0);
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
        expect(lowSpeedMeter.cumulativeTime).toBe(0);

        lowSpeedMeter.update(secondRecord);
        expect(lowSpeedMeter.cumulativeTime).toBe(0);

        lowSpeedMeter.update(thirdRecord);
        expect(lowSpeedMeter.cumulativeTime).toBe(10);
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
        expect(lowSpeedMeter.cumulativeTime).toBe(0);

        expect(() => lowSpeedMeter.update(secondRecord)).toThrowError(TimeBackError);
    });
});

describe('feeMeter test', () => {
    test('通常時に異なる距離区間を与えて値段が40円上がる', () => {
        const feeMeter = new FeeMeter();
        const time = Temporal.PlainTime.from("12:00:00.000");
        feeMeter.update(1001, 0, time);
        expect(feeMeter.fee).toBe(400);

        feeMeter.update(1400, 0, time);
        expect(feeMeter.fee).toBe(440);
    });

    test('ピーク時に異なる距離区間を与えて値段が52円上がる', () => {
        const feeMeter = new FeeMeter();
        const time = Temporal.PlainTime.from("07:00:00.000");
        feeMeter.update(1001, 0, time);
        expect(feeMeter.fee).toBe(520);

        feeMeter.update(1400, 0, time);
        expect(feeMeter.fee).toBe(572);
    });

    test('深夜に異なる距離区間を与えて値段が60円上がる', () => {
        const feeMeter = new FeeMeter();
        const time = Temporal.PlainTime.from("04:00:00.000");
        feeMeter.update(1001, 0, time);
        expect(feeMeter.fee).toBe(600);

        feeMeter.update(1400, 0, time);
        expect(feeMeter.fee).toBe(660);
    });

    test('通常時、初乗区間で異なる低速時間区間を与えて値段が40円上がる', () => {
        const feeMeter = new FeeMeter();
        const time = Temporal.PlainTime.from("12:00:00.000");
        feeMeter.update(0, 45, time);
        expect(feeMeter.fee).toBe(440);

        feeMeter.update(0, 100, time);
        expect(feeMeter.fee).toBe(480);
    });

    test('ピーク時、初乗区間で異なる低速時間区間を与えて値段が52円上がる', () => {
        const feeMeter = new FeeMeter();
        const time = Temporal.PlainTime.from("07:00:00.000");
        feeMeter.update(0, 45, time);
        expect(feeMeter.fee).toBe(572);

        feeMeter.update(0, 100, time);
        expect(feeMeter.fee).toBe(624);
    });

    test('深夜に初乗区間で異なる低速時間区間を与えて値段が60円上がる', () => {
        const feeMeter = new FeeMeter();
        const time = Temporal.PlainTime.from("03:00:00.000");
        feeMeter.update(0, 45, time);
        expect(feeMeter.fee).toBe(660);

        feeMeter.update(0, 100, time);
        expect(feeMeter.fee).toBe(720);
    });

    test('通常時、距離区間を一気に2つまたぐと値段が80円上がる', () => {
        const feeMeter = new FeeMeter();
        const time = Temporal.PlainTime.from("12:00:00.000");
        feeMeter.update(1001, 0, time);
        expect(feeMeter.fee).toBe(400);

        feeMeter.update(1800, 0, time);
        expect(feeMeter.fee).toBe(480);
    });

    test('通常時、時間区間を一気に2つまたぐと値段が80円上がる', () => {
        const feeMeter = new FeeMeter();
        const time = Temporal.PlainTime.from("12:00:00.000");
        feeMeter.update(0, 45, time);
        expect(feeMeter.fee).toBe(440);

        feeMeter.update(0, 135, time);
        expect(feeMeter.fee).toBe(520);
    });
});