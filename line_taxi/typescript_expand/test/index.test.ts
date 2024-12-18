import * as fs from 'fs';
import { describe, expect, test } from "bun:test";
import { main } from "..";
import { DistanceRecordFormError } from "../src/checkDistanceRecordForm";

describe('正常レコード', () => {
    test('1kmまでは距離による定額400円', () => {
        expect(main('0.0\n1.0\n3.0\n')).toBe(400);
    });

    test('1kmを超えても40円は加算されない', () => {
        const data = fs.readFileSync('test/data/oneKiloMeterTest.txt', 'utf-8');
        expect(main(data)).toBe(400);
    });

    test('1.3kmでも加算はされない', () => {
        const data = fs.readFileSync('test/data/one-threeKiloMeterTest.txt', 'utf-8');
        expect(main(data)).toBe(400);
    });

    test('1.4kmでは加算は1回', () => {
        const data = fs.readFileSync('test/data/one-fourKiloMeterTest.txt', 'utf-8');
        expect(main(data)).toBe(440);
    });

    test('10.2kmまで400mごとに加算される', () => {
        const data = fs.readFileSync('test/data/maxShortDistanceSection.txt', 'utf-8');
        expect(main(data)).toBe(400 + 920);
    });

    test('10.55kmから350mごとに加算される', () => {
        const data = fs.readFileSync('test/data/minLongDistanceSection.txt', 'utf-8');
        expect(main(data)).toBe(400 + 920 + 40);
    });

    test('10.90kmで2回加算される', () => {
        const data = fs.readFileSync('test/data/ten-ninetyKiloMeter.txt', 'utf-8');
        expect(main(data)).toBe(400 + 920 + 40 + 40);
    });
});

describe('異常系', () => {
    test('距離レコードの形式が誤っている場合、Errorが出る', () => {
        expect(() => main('1.0\n1.0\n3.0\n')).toThrowError(DistanceRecordFormError);
    });

    test('仕様と異なる区切り文字', () => {
        expect(() => main('0.0$n1.0\n3.0\n')).toThrowError(DistanceRecordFormError);
    });

    test('末尾に改行がない', () => {
        expect(() => main('0.0\n1.0\n3.0')).toThrowError(DistanceRecordFormError);
    });
});