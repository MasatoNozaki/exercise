import { describe, expect, test } from "bun:test";
import { LowSpeedTimeMeter, type record } from "../src/lowSpeedTimeMeter";
import { Temporal } from "temporal-polyfill";

describe('低速走行時間メーター', () => {
    test('低速走行時間を加算する', () => {
        const inputs: record[] = [
            {
                time: Temporal.PlainTime.from("00:00:00"),
                distance: 0
            },
            {
                time: Temporal.PlainTime.from("00:01:00"),
                distance: 10
            },
            // 低速走行でない
            {
                time: Temporal.PlainTime.from("00:01:30"),
                distance: 120
            },
            {
                time: Temporal.PlainTime.from("00:02:00"),
                distance: 10
            },
        ];

        const lowSpeedTimeMeter = new LowSpeedTimeMeter();
        for (const record of inputs) {
            lowSpeedTimeMeter.update(record);
        }

        expect(lowSpeedTimeMeter.cumulativeTime).toBe(90);
    });
});