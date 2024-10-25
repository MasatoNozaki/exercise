import { ITEMS } from "../items";
import { type buyContents } from "./types";

export function calcTotalPrice(buyContents: buyContents): number {
    let sum = 0;
    for (const [id, buyNum] of Object.entries(buyContents)) {
        if (buyNum < 0) {
            throw new NegativeNumError();
        }

        const item = ITEMS[Number(id)];
        if (item === undefined) {
            throw new IndexOutOfRangeError();
        }
        sum += item.price * buyNum;
    }
    return sum;
}

export function calcTotalPriceWithTax(buyContents: buyContents): number {
    return calcTotalPrice(buyContents) * 1.08;
}

export class IndexOutOfRangeError extends Error {
    constructor() {
        super('Index out of range');
    }
}

export class NegativeNumError extends Error {
    constructor() {
        super('Buy num is negative');
    }
}