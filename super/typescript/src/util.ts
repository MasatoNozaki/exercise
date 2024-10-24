import type { ITEMS } from "../items";
import { type buyContents } from "./types";

/**
 * 
 * @param targets 抽出する商品ID
 * @param buyContents 購入データ
 * @returns 抽出した購入データ配列と、それ以外の購入データ配列
 */
export function extractItem(targets: (keyof typeof ITEMS)[], buyContents: buyContents): [buyContents, buyContents] {
    const extracted: buyContents = {};
    // インデックスの末尾からのループのため、配列の長さが変わっても動作する
    for (const [id, buyNum] of Object.entries(buyContents)) {
        if (targets.includes(Number(id))) {
            extracted[Number(id)] = buyNum;
            delete buyContents[Number(id)];
        }
    }

    return [extracted, buyContents];
}