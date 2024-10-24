type itemInfo = {
    name: string;
    price: number;
};

type itemDB = {
    [id: number]: itemInfo;
};

export const ITEMS: itemDB = {
    1: { name: 'りんご', price: 100 },
    2: { name: 'みかん', price: 40 },
    3: { name: 'ぶどう', price: 150 },
    4: { name: 'のり弁', price: 350 },
    5: { name: 'しゃけ弁', price: 400 },
    6: { name: 'タバコ', price: 420 },
    7: { name: 'メンソールタバコ', price: 440 },
    8: { name: 'ライター', price: 100 },
    9: { name: 'お茶', price: 80 },
    10: { name: 'コーヒー', price: 100 }
};

export function getId(name: string): keyof itemDB {
    for (const [id, itemData] of Object.entries(ITEMS)) {
        if (itemData.name === name) {
            return Number(id);
        }
    }

    return -1;
}