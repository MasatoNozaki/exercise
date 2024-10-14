import { describe, expect, test } from "bun:test";
import { DistanceMeter } from "../src/distanceMeter";

// distanceMeter自体は負でも小数無しでも許容する
test('総走行距離を記録する', () => {
    const inputs: number[] = [-1, 0, 10.1, 12, 20.12, 99.9];

    const distanceMeter = new DistanceMeter();

    for (const input of inputs) {
        distanceMeter.update(input);
    }

    expect(distanceMeter.distance).toBe(inputs.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
});