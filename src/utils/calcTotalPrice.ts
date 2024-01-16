// @ts-ignore
import {CartItemsType} from "../redux/filter/cartSlice.ts";

export const calcTotalPrice = (items: CartItemsType[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
