import { describe, expect, test } from "bun:test";
import type { feeInfo } from "../src/lowSpeedTimeMeter";
import { Temporal } from "temporal-polyfill";

test('1km未満ならいくら距離を加算しても400円で、1kmを超えると400mごとに40円が加算され、10kmを超えると350mごとに40円が加算される', () => {
    const inputs: feeInfo[] = [
        {
            rate: 'normal',
            elapsed: {
                elapsedSecond: 0,
                distance: 0.0
            }
        },
        {
            rate: 'normal',
            elapsed: {
                elapsedSecond: 60,
                distance: 400
            },
        },
        {
            rate: 'normal', // ここまで1km未満
            elapsed: {
                elapsedSecond: 120,
                distance: 599
            },
        },
        {
            rate: 'normal', // ここで1km到達
            elapsed: {
                elapsedSecond: 120.001,
                distance: 1.0
            },
        },
        {
            rate: 'normal', // ここで40円加算
            elapsed: {
                elapsedSecond: 180.001,
                distance: 400
            },
        },
        {
            rate: 'normal', // ここでは加算されない
            elapsed: {
                elapsedSecond: 240.001,
                distance: 399
            },
        },
        {
            rate: 'normal', // ここで10200に到達。400mごとの加算が終了。計8800円加算
            elapsed: {
                elapsedSecond: 300.001,
                distance: 8401
            },
        },
        {
            rate: 'normal', // ここで40円加算
            elapsed: {
                elapsedSecond: 360.001,
                distance: 350
            },
        }
    ];

    const feeMeter = new FeeMeter();
    for (const info of inputs) {
        feeMeter.update(info);
    }
    expect(feeMeter.fee).toBe(9280);
});

test('低速走行時間45秒ごとに40円が加算される', () => {

});

test('深夜12時-朝6時の間、深夜割増料金になる', () => {

});

test('朝6時-9時半の間、ピークタイム割増料金になる', () => {

});

test('夕方6時-深夜12時の間、ピークタイム割増料金になる', () => {

});