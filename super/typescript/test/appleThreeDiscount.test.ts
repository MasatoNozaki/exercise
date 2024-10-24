import { describe, expect, test } from "bun:test";
import { calcTotalPriceAppleThreeDiscount, calcTotalPriceAppleThreeDiscountWithTax } from "../src/appleThreeDiscount";
import { TAX } from "../src/const";

describe('りんご3個で280(税なし)', () => {
    test('りんご3個で割り引かれる', () => {
        expect(calcTotalPriceAppleThreeDiscount({ 1: 3 })).toBe(280);
    });

    test('りんご6個で2回分割り引かれる', () => {
        expect(calcTotalPriceAppleThreeDiscount({ 1: 6 })).toBe(280 * 2);
    });

    test('りんご2個で割り引かれない', () => {
        expect(calcTotalPriceAppleThreeDiscount({ 1: 2 })).toBe(200);
    });

    test('りんご4個で、一部割り引かれる', () => {
        expect(calcTotalPriceAppleThreeDiscount({ 1: 4 })).toBe(280 + 100);
    });

    test('他の商品と購入して割り引かれる', () => {
        expect(calcTotalPriceAppleThreeDiscount({ 1: 3, 4: 2 })).toBe(280 + 350 * 2);
    });
});

describe('りんご3個で280(税あり)', () => {
    test('りんご3個で割り引かれる', () => {
        expect(calcTotalPriceAppleThreeDiscountWithTax({ 1: 3 })).toBe(280 * TAX);
    });

    test('りんご6個で2回分割り引かれる', () => {
        expect(calcTotalPriceAppleThreeDiscountWithTax({ 1: 6 })).toBe(280 * 2 * TAX);
    });

    test('りんご2個で割り引かれない', () => {
        expect(calcTotalPriceAppleThreeDiscountWithTax({ 1: 2 })).toBe(200 * TAX);
    });

    test('りんご4個で、一部割り引かれる', () => {
        expect(calcTotalPriceAppleThreeDiscountWithTax({ 1: 4 })).toBe((280 + 100) * TAX);
    });

    test('他の商品と購入して割り引かれる', () => {
        expect(calcTotalPriceAppleThreeDiscountWithTax({ 1: 3, 4: 2 })).toBe((280 + 350 * 2) * TAX);
    });
});