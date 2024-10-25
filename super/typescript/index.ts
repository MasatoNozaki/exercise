import { getId } from "./items";
import { appleThreeDiscountWithTax } from "./src/discounts";
import { calcTotalPrice, calcTotalPriceWithTax } from "./src/totalPrice";
import type { buyContents } from "./src/types";
import { extractItem } from "./src/util";

/**
 * レジのエントリポイント。
 */
export function main(buyContents: buyContents): number {
    const [tabacco, withoutTabacco] = extractItem([getId('タバコ'), getId('メンソールタバコ')], buyContents);
    const [apple, withoutApple] = extractItem([getId('りんご')], withoutTabacco);
    return calcTotalPrice(tabacco) + appleThreeDiscountWithTax(apple as { 1: number; }) + calcTotalPriceWithTax(withoutApple);
}