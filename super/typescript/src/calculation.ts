import { ITEMS } from "../items";

/**
 * {id: keyof typeof ITEMS, num: number}の配列では、同じ商品のレコードが複数含まれる可能性があり、処理の手間が増えるためidをkeyとするオブジェクトとしている
 */
type buyContents = {
    [index: keyof typeof ITEMS]: number;
};

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

export function calcTotalPriceWithTabaccoTaxInclude(buyContents: buyContents, totalFunc: (buyContents: buyContents) => number): number {
    const [tabaccoArray, restArray] = extractItem([6, 7], buyContents);
    return calcTotalPrice(tabaccoArray) + totalFunc(restArray);
}

// export function calcTotalPriceAppleThreeDiscount(buyContents: buyContent[], totalFunc: (buyContents: buyContent[]) => number): number {
//     const [appleArray, restArray] = extractItem([1], buyContents);

// }

/**
 * 
 * @param targets 抽出する商品ID
 * @param buyContents 購入データ
 * @returns 抽出した購入データ配列と、それ以外の購入データ配列
 */
function extractItem(targets: (keyof typeof ITEMS)[], buyContents: buyContents): [buyContents, buyContents] {
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

// function integrateRecord()

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