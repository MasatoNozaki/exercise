import { describe, expect, test } from "bun:test";
import { calcTotalPrice, IndexOutOfRangeError, NegativeNumError } from "..";

describe('合計金額の計算', () => {
    test('商品を1種類買う', () => {
        expect(calcTotalPrice(
            [
                { id: 1, num: 1 }
            ]
        )).toBe(100 * 1);

        expect(calcTotalPrice(
            [
                { id: 5, num: 3 }
            ]
        )).toBe(400 * 3);
    });

    test('商品を2種類買う', () => {
        expect(calcTotalPrice(
            [
                { id: 2, num: 1 },
                { id: 6, num: 2 }
            ]
        )).toBe(40 + 420 * 2);
    });

    test('商品を1つも買わない', () => {
        expect(calcTotalPrice([])).toBe(0);
    });

    test('存在しない商品を買う', () => {
        expect(() => calcTotalPrice(
            [
                { id: 100, num: 1 }
            ]
        )).toThrowError(IndexOutOfRangeError);
    });

    test('負の個数買う', () => {
        expect(() => calcTotalPrice(
            [
                { id: 1, num: -1 }
            ]
        )).toThrowError(NegativeNumError);
    });
});