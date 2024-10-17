import { describe, expect, test } from "bun:test";
import { LowSpeedTimeFee } from "../src/lowSpeedTimeFee";

describe('正常系', () => {
    test('低速走行時間45秒ごとに40円が加算される', () => {
        const inputs: number[] = [
            0,
            45, // ここで40円加算
            89, // ここでは加算されない
            90, // ここで40円加算
        ];

        let sum = 0;
        const lowSpeedTimeFee = new LowSpeedTimeFee();
        for (const input of inputs) {
            sum += lowSpeedTimeFee.calculate(input);
        }
        expect(sum).toBe(80);
    });
});