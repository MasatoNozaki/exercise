import { ITEMS } from "../items";
import { TAX } from "./const";

export function appleThreeDiscount(appleBuyInfo: { 1: number; }): number {
    return Math.floor(appleBuyInfo[1] / 3) * 280 + appleBuyInfo[1] % 3 * ITEMS[1].price;
}

export function appleThreeDiscountWithTax(appleBuyInfo: { 1: number; }): number {
    return appleThreeDiscount(appleBuyInfo) * TAX;
}