import { describe, expect, test } from "bun:test";
import { answer } from "..";

describe('input test', () => {
    test('regular input', () => {
        expect(answer('13:50:00.245 0.0')).toBe(0);
    });
});