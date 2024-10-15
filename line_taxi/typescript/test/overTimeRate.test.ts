import { expect, test } from "bun:test";
import { Temporal } from "temporal-polyfill";
import { overTimeRate } from "../src/overTimeRate";

test('深夜時間帯に深夜割増倍率を返す', () => {
    const midnightRate = 1.5;
    expect(overTimeRate(Temporal.PlainTime.from('00:00:00.000'))).toBe(midnightRate);
    expect(overTimeRate(Temporal.PlainTime.from('03:00:00.000'))).toBe(midnightRate);
    expect(overTimeRate(Temporal.PlainTime.from('05:59:59.999'))).toBe(midnightRate);
});

test('ピークタイムにピークタイム割増料金倍率を返す', () => {
    const peekTimeRate = 1.3;
    expect(overTimeRate(Temporal.PlainTime.from('08:00:00.000'))).toBe(peekTimeRate);
    expect(overTimeRate(Temporal.PlainTime.from('06:00:00.000'))).toBe(peekTimeRate);
    expect(overTimeRate(Temporal.PlainTime.from('09:29:59.999'))).toBe(peekTimeRate);
    expect(overTimeRate(Temporal.PlainTime.from('18:00:00.000'))).toBe(peekTimeRate);
    expect(overTimeRate(Temporal.PlainTime.from('20:29:59.999'))).toBe(peekTimeRate);
    expect(overTimeRate(Temporal.PlainTime.from('23:59:59.999'))).toBe(peekTimeRate);
});

test('深夜時間帯てもピークタイムでもないときは、割増にならない', () => {
    const regularRate = 1.0;
    expect(overTimeRate(Temporal.PlainTime.from('09:30:00.000'))).toBe(regularRate);
    expect(overTimeRate(Temporal.PlainTime.from('12:00:00.000'))).toBe(regularRate);
    expect(overTimeRate(Temporal.PlainTime.from('17:59:59.999'))).toBe(regularRate);
});