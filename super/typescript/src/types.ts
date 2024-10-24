import type { ITEMS } from "../items";

export type buyContents = {
    [index: keyof typeof ITEMS]: number;
};