import { describe, expect, test } from "bun:test";
import { LowSpeedTimeMeter, TimeBackError, type elapsedRecord } from "../src/lowSpeedTimeMeter";

describe('低速走行時間メーター', () => {
    test('低速走行時間を加算する', () => {
        const inputs: elapsedRecord[] = [
            {
                elapsedSecond: 0,
                distance: 0
            },
            {
                elapsedSecond: 60,
                distance: 10
            },
            // 低速走行でない
            {
                elapsedSecond: 90,
                distance: 120
            },
            {
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

    test('時刻が逆戻りしたらエラーを出す', () => {
        const inputs: elapsedRecord[] = [
            {
                elapsedSecond: 0,
                distance: 0
            },
            {
                elapsedSecond: -60,
                distance: 10
            },
        ];

        const lowSpeedTimeMeter = new LowSpeedTimeMeter();
        lowSpeedTimeMeter.update(inputs[0]);
        expect(() => lowSpeedTimeMeter.update(inputs[1])).toThrowError(TimeBackError);
    });
});