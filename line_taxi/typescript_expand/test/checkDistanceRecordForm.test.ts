import { describe, expect, test } from "bun:test";
import { checkDistanceRecordForm } from "../src/checkDistanceRecordForm";

test('正常レコード', () => {
    expect(checkDistanceRecordForm('0.0\n1.0\n3.0\n')).toBeTrue();
});

describe('異常系', () => {
    test('1行目が0.0でない', () => {
        expect(checkDistanceRecordForm('1.0\n1.0\n3.0\n')).toBeFalse();
    });

    test('空のレコード', () => {
        expect(checkDistanceRecordForm('')).toBeFalse();
    });

    test('仕様と異なる区切り文字', () => {
        expect(checkDistanceRecordForm('0.0$n1.0\n3.0\n')).toBeFalse();
    });

    test('1行のみである', () => {
        expect(checkDistanceRecordForm('0.0\n')).toBeFalse();
    });

    test('末尾に改行がない', () => {
        expect(checkDistanceRecordForm('0.0\n1.0\n3.0')).toBeFalse();
    });

    test('距離レコード形式が異なる', () => {
        expect(checkDistanceRecordForm('0.0\n1.00\n')).toBeFalse();
        expect(checkDistanceRecordForm('0.0\nhoge\n')).toBeFalse();
        expect(checkDistanceRecordForm('0.0\n100.0\n')).toBeFalse();
        expect(checkDistanceRecordForm('0.0\n-1.0\n')).toBeFalse();
    });

    test('降車までの総移動距離が0.1以上でない', () => {
        expect(checkDistanceRecordForm('0.0\n0.0\n')).toBeFalse();
    });
});