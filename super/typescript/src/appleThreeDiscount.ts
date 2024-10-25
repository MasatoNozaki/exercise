import { getId, ITEMS } from "../items";
import { TAX } from "./const";
import { calcTotalPrice } from "./totalPrice";
import { type buyContents } from "./types";
import { extractItem } from "./util";

/**
 * りんご1個は100円だが、3個で280円という割引
 * 
 * 6個だと...280\*2、つまり3個単位で割引されるとする
 * 
 * りんごの合計金額計算式：3で割った商*280 + 余り*単価
 * 
 * 税あり、なしに対応するため、ここでは税金なしの処理
 * @param buyContents 
 * @returns 合計金額
 */
export function calcTotalPriceAppleThreeDiscount(buyContents: buyContents): number {
    const [appleBuyInfo, restBuyInfo] = extractItem([getId('りんご')], buyContents);
    return Math.floor(appleBuyInfo[1] / 3) * 280 + appleBuyInfo[1] % 3 * ITEMS[1].price + calcTotalPrice(restBuyInfo);
}

export function calcTotalPriceAppleThreeDiscountWithTax(buyContents: buyContents): number {
    return calcTotalPriceAppleThreeDiscount(buyContents) * TAX;
}