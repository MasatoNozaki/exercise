import { describe, expect, test } from "bun:test";
import { LowSpeedTimeMeter, TimeBackError, type record } from "../src/lowSpeedTimeMeter";
import { Temporal } from "temporal-polyfill";

describe('低速走行時間メーター', () => {
    test('低速走行時間を加算する', () => {
        const inputs: record[] = [
            {
                time: Temporal.PlainTime.from("00:00:00.000"),
                elapsedSecond: 0,
                distance: 0
            },
            {
                time: Temporal.PlainTime.from("00:01:00.000"),
                elapsedSecond: 60,
                distance: 10
            },
            // 低速走行でない
            {
                time: Temporal.PlainTime.from("00:01:30.000"),
                elapsedSecond: 90,
                distance: 120
            },
            {
                time: Temporal.PlainTime.from("00:02:00.000"),
                elapsedSecond: 120,
                distance: 10
            },
        ];

        const lowSpeedTimeMeter = new LowSpeedTimeMeter();
        for (const record of inputs) {
            lowSpeedTimeMeter.update(record);
        }

        expect(lowSpeedTimeMeter.cumulativeTime).toBe(90);
    });

    test('時刻が一周しても低速走行時間が記録できる', () => {
        const inputs: record[] = [
            {
                time: Temporal.PlainTime.from("23:59:00.000"),
                elapsedSecond: 0,
                distance: 0
            },
            {
                time: Temporal.PlainTime.from("00:01:00.000"),
                elapsedSecond: 120,
                distance: 10
            },
            {
                time: Temporal.PlainTime.from("00:02:00.000"),
                elapsedSecond: 180,
                distance: 10
            },
        ];

        const lowSpeedTimeMeter = new LowSpeedTimeMeter();
        for (const record of inputs) {
            lowSpeedTimeMeter.update(record);
        }

        expect(lowSpeedTimeMeter.cumulativeTime).toBe(180);
    });

    test('時刻が逆戻りしたらエラーを出す', () => {
        const inputs: record[] = [
            {
                time: Temporal.PlainTime.from("00:01:00.000"),
                elapsedSecond: 0,
                distance: 0
            },
            {
                time: Temporal.PlainTime.from("00:00:00.000"),
                elapsedSecond: -60,
                distance: 10
            },
        ];

        const lowSpeedTimeMeter = new LowSpeedTimeMeter();
        lowSpeedTimeMeter.update(inputs[0]);
        expect(() => lowSpeedTimeMeter.update(inputs[1])).toThrowError(TimeBackError);
    });
});