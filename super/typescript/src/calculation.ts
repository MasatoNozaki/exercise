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
    const [tabaccoBuyInfo, restBuyInfo] = extractItem([6, 7], buyContents);
    return calcTotalPrice(tabaccoBuyInfo) + totalFunc(restBuyInfo);
}

/**
 * りんご1個は100円だが、3個で280円という割引
 * 6個だと...280*2、つまり3個単位で割引されるとする
 * りんごの合計金額計算式：3で割った商*280 + 余り*単価
 * 税あり、なしに対応するため、ここでは税金なしの処理
 * @param buyContents 
 * @param totalFunc 
 * @returns 合計金額
 */
export function calcTotalPriceAppleThreeDiscount(buyContents: buyContents): number {
    const [appleBuyInfo, restBuyInfo] = extractItem([1], buyContents);
    return Math.floor(appleBuyInfo[1] / 3) * 280 + appleBuyInfo[1] % 3 * ITEMS[1].price + calcTotalPrice(restBuyInfo);
}

export function calcTotalPriceAppleThreeDiscountWithTax(buyContents: buyContents): number {
    return calcTotalPriceAppleThreeDiscount(buyContents) * 1.08;
}

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