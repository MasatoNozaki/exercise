import { describe, expect, test } from "bun:test";
import { main } from "..";

describe('1行目は必ず0.0から始まる', () => {
    test('1行目が0.0', () => {
        expect(main('0.0\n1.0\n3.0')).toBeTrue();
    });

    test('1行目が0.0でない', () => {
        expect(main('1.0\n1.0\n3.0')).toBeFalse();
    });

    test('空のレコード', () => {
        expect(main('')).toBeFalse();
    });

    test('仕様と異なる区切り文字', () => {
        expect(main('1.0$n1.0\n3.0')).toBeFalse();
    });
});