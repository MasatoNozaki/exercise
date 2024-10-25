import { describe, expect, test } from "bun:test";
import { main } from "..";
import { DistanceRecordFormError } from "../src/checkDistanceRecordForm";

describe('正常レコード', () => {
    test('1kmまでは距離による定額400円', () => {
        expect(main('0.0\n1.0\n3.0\n')).toBe(400);
    });
});

describe('異常系', () => {
    test('距離レコードの形式が誤っている場合、Errorが出る', () => {
        expect(() => main('1.0\n1.0\n3.0\n')).toThrowError(DistanceRecordFormError);
    });
});