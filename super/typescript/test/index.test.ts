import { describe, expect, test } from "bun:test";
import { main } from "..";
import { TAX } from "../src/const";

describe('合計金額の計算(消費税あり)', () => {
    test('りんご、のり弁、お茶を買う', () => {
        const data = { 1: 1, 4: 1, 9: 1 };
        expect(main(data)).toBe((100 + 350 + 80) * TAX);
    });

    test('タバコの内税を考慮して合計金額を出す', () => {
        const data = { 1: 1, 4: 1, 6: 1 };
        expect(main(data)).toBe((100 + 350) * TAX + 420);
    });

    test('りんごを3つ買うと280円になる', () => {
        const data = { 1: 3, 4: 1, 6: 1 };
        expect(main(data)).toBe((280 + 350) * TAX + 420);
    });
});