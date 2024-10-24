import { describe, expect, test } from "bun:test";
import { calcTotalPrice, calcTotalPriceWithTabaccoTaxInclude, calcTotalPriceWithTax, IndexOutOfRangeError, NegativeNumError } from "../src/calculation";

const TAX = 1.08;

describe('合計金額（税金なし）の計算', () => {
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

    test('同じ商品のエントリーが2つある', () => {
        expect(calcTotalPrice(
            [
                { id: 2, num: 1 },
                { id: 2, num: 1 }
            ]
        )).toBe(40 + 40);
    });

    test('商品を1つも買わない', () => {
        expect(calcTotalPrice([])).toBe(0);
    });

    describe('存在しない商品を買う', () => {
        test('idが大きい', () => {
            expect(() => calcTotalPrice(
                [
                    { id: 100, num: 1 }
                ]
            )).toThrowError(IndexOutOfRangeError);
        });

        test('idが負', () => {
            expect(() => calcTotalPrice(
                [
                    { id: -1, num: 1 }
                ]
            )).toThrowError(IndexOutOfRangeError);
        });
    });

    test('負の個数買う', () => {
        expect(() => calcTotalPrice(
            [
                { id: 1, num: -1 }
            ]
        )).toThrowError(NegativeNumError);
    });
});

describe('合計金額（税金あり）の計算', () => {
    test('商品を1種類買う', () => {
        expect(calcTotalPriceWithTax(
            [
                { id: 1, num: 1 }
            ]
        )).toBe(100 * 1 * TAX);

        expect(calcTotalPriceWithTax(
            [
                { id: 5, num: 3 }
            ]
        )).toBe(400 * 3 * TAX);
    });

    test('商品を2種類買う', () => {
        expect(calcTotalPriceWithTax(
            [
                { id: 2, num: 1 },
                { id: 6, num: 2 }
            ]
        )).toBe((40 + 420 * 2) * TAX);
    });

    test('商品を1つも買わない', () => {
        expect(calcTotalPriceWithTax([])).toBe(0);
    });

    test('存在しない商品を買う', () => {
        expect(() => calcTotalPriceWithTax(
            [
                { id: 100, num: 1 }
            ]
        )).toThrowError(IndexOutOfRangeError);
    });

    test('負の個数買う', () => {
        expect(() => calcTotalPriceWithTax(
            [
                { id: 1, num: -1 }
            ]
        )).toThrowError(NegativeNumError);
    });
});

describe('タバコ金額が内税である場合の合計金額', () => {
    test('タバコを1つ買う', () => {
        const data = [
            { id: 6, num: 1 }
        ];

        expect(calcTotalPriceWithTabaccoTaxInclude(data, calcTotalPriceWithTax)).toBe(420);
    });

    test('異なる種類のタバコを複数買う', () => {
        const data = [
            { id: 6, num: 1 },
            { id: 7, num: 3 }
        ];

        expect(calcTotalPriceWithTabaccoTaxInclude(data, calcTotalPriceWithTax)).toBe(420 + 440 * 3);
    });

    test('タバコでないもののみ買う(消費税あり)', () => {
        const data = [
            { id: 1, num: 2 },
            { id: 5, num: 1 }
        ];
        expect(calcTotalPriceWithTabaccoTaxInclude(data, calcTotalPriceWithTax)).toBe((100 * 2 + 400) * TAX);
    });

    test('タバコとそうでないものを買う(消費税なし)', () => {
        const data = [
            { id: 1, num: 2 },
            { id: 5, num: 1 },
            { id: 6, num: 1 }
        ];
        expect(calcTotalPriceWithTabaccoTaxInclude(data, calcTotalPrice)).toBe(100 * 2 + 400 + 420);
    });
});