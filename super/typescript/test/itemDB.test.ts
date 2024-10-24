import { describe, expect, test } from "bun:test";
import { getId } from "../items";

describe('商品IDの取得', () => {
    test('りんごのIDを取得', () => {
        expect(getId('りんご')).toBe(1);
    });

    test('しゃけ弁のIDを取得', () => {
        expect(getId('しゃけ弁')).toBe(5);
    });

    test('存在しない商品のIDを取得', () => {
        expect(getId('ほげほげ')).toBe(-1);
    });
});