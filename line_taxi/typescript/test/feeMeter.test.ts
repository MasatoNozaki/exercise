import { describe, expect, test, mock, type Mock, beforeEach } from "bun:test";
import { FeeMeter } from "../src/feeMeter";
import { Temporal } from "temporal-polyfill";

describe('正常系', () => {
    let feeMeter: FeeMeter;
    let mockDistanceFee = { calculate: mock(() => 400) };
    let mockLowSpeedTimeFee = { calculate: mock(() => 40) };
    let mockOverTimeRate: Mock<() => number>;

    beforeEach(() => {
        mockOverTimeRate = mock();
        feeMeter = new FeeMeter(mockDistanceFee, mockLowSpeedTimeFee, mockOverTimeRate);
    });

    test('深夜割増料金になる', () => {
        mockOverTimeRate.mockReturnValue(1.5);
        feeMeter.update(Temporal.PlainTime.from('03:00:00.000'), 1.0, 60);
        expect(feeMeter.fee).toBe((400 + 40 * 1) * 1.5);
    });

    test('ピークタイム割増料金になる', () => {
        mockOverTimeRate.mockReturnValue(1.3);
        feeMeter.update(Temporal.PlainTime.from('07:00:00.000'), 1.0, 60);
        expect(feeMeter.fee).toBe((400 + 40 * 1) * 1.3);
    });
});