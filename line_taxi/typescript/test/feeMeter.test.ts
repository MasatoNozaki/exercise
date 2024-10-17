import { describe, expect, test } from "bun:test";
import { FeeMeter } from "../src/feeMeter";
import { Temporal } from "temporal-polyfill";

describe('正常系', () => {
    test('深夜割増料金になる', () => {
        const feeMeter = new FeeMeter();
        feeMeter.update(Temporal.PlainTime.from('03:00:00.000'), 1.0, 60);
        expect(feeMeter.fee).toBe((400 + 40 * 1) * 1.5);
    });

    test('ピークタイム割増料金になる', () => {
        const feeMeter = new FeeMeter();
        feeMeter.update(Temporal.PlainTime.from('07:00:00.000'), 1.0, 60);
        expect(feeMeter.fee).toBe((400 + 40 * 1) * 1.3);
    });
});