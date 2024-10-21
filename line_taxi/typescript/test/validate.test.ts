import { describe, expect, test } from "bun:test";
import { RecordFormError, validate } from "../src/validate";

test('正常', () => {
    expect(validate('10:00:00.000 12.0')).toBeTrue();
    expect(validate('10:00:00.000 1.0')).toBeTrue();
});

describe('レコード形式が誤っている', () => {
    test('値の数が誤っている', () => {
        expect(() => validate('10:00:00.000')).toThrowError(RecordFormError);
        expect(() => validate('10.0')).toThrowError(RecordFormError);
        expect(() => validate('10:00:00.000 10.0 11.0')).toThrowError(RecordFormError);
    });
    test('距離形式が誤っている', () => {
        expect(() => validate('10:00:00.000 12')).toThrowError(RecordFormError);
        expect(() => validate('10:00:00.000 1.123')).toThrowError(RecordFormError);
        expect(() => validate('10:00:00.000 -1.0')).toThrowError(RecordFormError);
        expect(() => validate('10:00:00.000 a')).toThrowError(RecordFormError);
    });
    test('時刻形式が誤っている', () => {
        expect(() => validate('10:00 1.0')).toThrowError(RecordFormError);
        expect(() => validate('10 1.0')).toThrowError(RecordFormError);
        expect(() => validate('10:0:00.000 1.0')).toThrowError(RecordFormError);
        expect(() => validate('10:00:00.0 1.0')).toThrowError(RecordFormError);
        expect(() => validate('10:00:00.0000 1.0')).toThrowError(RecordFormError);
        expect(() => validate('10min 1.0')).toThrowError(RecordFormError);
    });
});