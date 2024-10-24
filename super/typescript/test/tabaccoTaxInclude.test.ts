import { describe, expect, test } from "bun:test";
import { calcTotalPriceWithTabaccoTaxInclude, calcTotalPriceWithTabaccoTaxIncludeWithTax } from "../src/tabaccoTaxInclude";
import { TAX } from "../src/const";

describe('タバコ金額が内税である場合の合計金額', () => {
    test('タバコを1つ買う', () => {
        const data = { 6: 1 };

        expect(calcTotalPriceWithTabaccoTaxInclude(data)).toBe(420);
    });

    test('異なる種類のタバコを複数買う', () => {
        const data = { 6: 1, 7: 3 };

        expect(calcTotalPriceWithTabaccoTaxInclude(data)).toBe(420 + 440 * 3);
    });

    test('タバコでないもののみ買う(消費税あり)', () => {
        const data = { 1: 2, 5: 1 };
        expect(calcTotalPriceWithTabaccoTaxIncludeWithTax(data)).toBe((100 * 2 + 400) * TAX);
    });

    test('タバコとそうでないものを買う(消費税なし)', () => {
        const data = { 1: 2, 5: 1, 6: 1 };
        expect(calcTotalPriceWithTabaccoTaxInclude(data)).toBe(100 * 2 + 400 + 420);
    });
});