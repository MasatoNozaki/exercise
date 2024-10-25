import { describe, expect, test } from "bun:test";
import { calcTotalPrice, calcTotalPriceWithTax, IndexOutOfRangeError, NegativeNumError } from "../src/totalPrice";
import { TAX } from "../src/const";

describe('合計金額（税金なし）の計算', () => {
    test('商品を1種類買う', () => {
        expect(calcTotalPrice({ 1: 1 })).toBe(100 * 1);

        expect(calcTotalPrice({ 5: 3 })).toBe(400 * 3);
    });

    test('商品を2種類買う', () => {
        expect(calcTotalPrice({ 2: 1, 6: 2 })).toBe(40 + 420 * 2);
    });

    test('商品を1つも買わない', () => {
        expect(calcTotalPrice({})).toBe(0);
    });

    describe('存在しない商品を買う', () => {
        test('idが大きい', () => {
            expect(() => calcTotalPrice({ 100: 1 })).toThrowError(IndexOutOfRangeError);
        });

        test('idが負', () => {
            expect(() => calcTotalPrice({ '-1': 1 })).toThrowError(IndexOutOfRangeError);
        });
    });

    test('負の個数買う', () => {
        expect(() => calcTotalPrice({ 1: -1 })).toThrowError(NegativeNumError);
    });
});

describe('合計金額（税金あり）の計算', () => {
    test('商品を1種類買う', () => {
        expect(calcTotalPriceWithTax({ 1: 1 })).toBe(100 * 1 * TAX);

        expect(calcTotalPriceWithTax({ 5: 3 })).toBe(400 * 3 * TAX);
    });

    test('商品を2種類買う', () => {
        expect(calcTotalPriceWithTax({ 2: 1, 6: 2 })).toBe((40 + 420 * 2) * TAX);
    });

    test('商品を1つも買わない', () => {
        expect(calcTotalPriceWithTax([])).toBe(0);
    });

    test('存在しない商品を買う', () => {
        expect(() => calcTotalPriceWithTax({ 100: 1 })).toThrowError(IndexOutOfRangeError);
    });

    test('負の個数買う', () => {
        expect(() => calcTotalPriceWithTax({ 1: -1 })).toThrowError(NegativeNumError);
    });
});