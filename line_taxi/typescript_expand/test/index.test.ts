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
        expect(main('0.0$n1.0\n3.0\n')).toBeFalse();
    });

    test('1行のみである', () => {
        expect(main('0.0\n')).toBeFalse();
    });

    test('末尾に改行がない', () => {
        expect(main('0.0\n1.0\n3.0')).toBeFalse();
    });

    test('距離レコード形式が異なる', () => {
        expect(main('0.0\n1.00\n')).toBeFalse();
        expect(main('0.0\nhoge\n')).toBeFalse();
        expect(main('0.0\n100.0\n')).toBeFalse();
        expect(main('0.0\n-1.0\n')).toBeFalse();
    });

    test('降車までの総移動距離が0.1以上でない', () => {
        expect(main('0.0\n0.0\n')).toBeFalse();
    });
});