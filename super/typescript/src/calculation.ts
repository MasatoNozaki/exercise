import { ITEMS, MAXID } from "../items";

type buyContent = {
    id: keyof typeof ITEMS;
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

export function calcTotalPriceWithTax(buyContents: buyContent[]): number {
    return calcTotalPrice(buyContents) * 1.08;
}

export function calcTotalPriceWithTabaccoTaxInclude(buyContents: buyContent[], totalFunc: (buyContents: buyContent[]) => number): number {
    const [tabaccoArray, restArray] = extractItem([6, 7], buyContents);
    return calcTotalPrice(tabaccoArray) + totalFunc(restArray);
}

/**
 * 
 * @param targets 抽出する商品ID
 * @param buyContents 購入データ
 * @returns 抽出した購入データ配列と、それ以外の購入データ配列
 */
function extractItem(targets: (keyof typeof ITEMS)[], buyContents: buyContent[]): [buyContent[], buyContent[]] {
    const extracted: buyContent[] = [];
    // インデックスの末尾からのループのため、配列の長さが変わっても動作する
    for (let i = buyContents.length - 1; i >= 0; i--) {
        if (targets.includes(buyContents[i].id)) {
            extracted.push(buyContents[i]);
            buyContents.splice(i, 1);
        }
    }

    return [extracted, buyContents];
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