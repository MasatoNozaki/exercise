import { describe, expect, test } from "bun:test";
import { DistanceBackError, DistanceFee } from "../src/distanceFee";

describe('正常系', () => {
    test('1km未満ならいくら距離を加算しても400円で、1kmを超えると400mごとに40円が加算され、10kmを超えると350mごとに40円が加算される', () => {
        const inputs: number[] = [
            0.0,
            400,
            999, // ここまで1km未満
            1000, // ここで1km到達
            1400, // ここで40円加算
            1799, // ここでは加算されない
            10200, // ここで10200に到達。400mごとの加算が終了。計880円加算
            10550, // ここで40円加算
        ];

        let sum = 0;
        const distanceFee = new DistanceFee();
        for (const input of inputs) {
            sum += distanceFee.calculate(input);
        }
        expect(sum).toBe(1360);
    });
});

describe('異常系', () => {
    test('距離が戻る', () => {
        const inputs: number[] = [10, -10];

        const distanceFee = new DistanceFee();
        distanceFee.calculate(inputs[0]);
        expect(() => distanceFee.calculate(inputs[1])).toThrowError(new DistanceBackError(-10));
    });
});