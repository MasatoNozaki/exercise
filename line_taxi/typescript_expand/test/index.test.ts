import { describe, expect, test } from "bun:test";
import { main } from "..";

test('正常レコード', () => {
    expect(main('0.0\n1.0\n3.0\n')).toBeTrue();
});

describe('異常系', () => {
    test('1行目が0.0でない', () => {
        expect(main('1.0\n1.0\n3.0\n')).toBeFalse();
    });

    test('空のレコード', () => {
        expect(main('')).toBeFalse();
    });

    test('仕様と異なる区切り文字', () => {
        expect(main('1.0$n1.0\n3.0')).toBeFalse();
    });

    test('1行のみである', () => {
        expect(main('0.0')).toBeFalse();
    });

    test('末尾に改行がない', () => {
        expect(main('0.0\n1.0\n3.0')).toBeFalse();
    });
});