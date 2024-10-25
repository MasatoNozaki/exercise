import { getId } from "../items";
import { TAX } from "./const";
import { calcTotalPrice } from "./totalPrice";
import { type buyContents } from "./types";
import { extractItem } from "./util";

export function calcTotalPriceWithTabaccoTaxInclude(buyContents: buyContents): number {
    const [tabaccoBuyInfo, restBuyInfo] = extractItem([getId('タバコ'), getId('メンソールタバコ')], buyContents);
    return calcTotalPrice(tabaccoBuyInfo) + calcTotalPrice(restBuyInfo);
}

export function calcTotalPriceWithTabaccoTaxIncludeWithTax(buyContents: buyContents): number {
    return calcTotalPriceWithTabaccoTaxInclude(buyContents) * TAX;
}