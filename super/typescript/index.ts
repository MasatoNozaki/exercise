import { ITEMS, MAXID } from "./items";

type buyContent = {
    id: number;
    num: number;
};

export function calcTotalPrice(buyContents: buyContent[]): number {
    let sum = 0;
    for (const buyContent of buyContents) {
        if (buyContent.id > MAXID) {
            throw new IndexOutOfRangeError();
        }

        if (buyContent.num < 0) {
            throw new NegativeNumError();
        }

        sum += ITEMS[buyContent.id].price * buyContent.num;
    }
    return sum;
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