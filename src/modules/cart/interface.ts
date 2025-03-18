import { UseFormReturn } from "react-hook-form";

export type CouponType = "coupon" | "ontop" | "seasonal";
export type DiscountType = "percent" | "amount" | "subtracting";
export type ItemType = "cloth" | "sneaker" | "wearing";
export type CouponStatus = "available" | "expire";

export interface IItemDetail {
  itemCode: string;
  itemDesc: string;
  itemSubDesc: string;
  itemType: ItemType;
  itemSubType?: string;
  sizing: boolean;
  price: number;
  status: string;
  size?: string;
  watchList?: boolean;
  imgSource: string;
}

export interface ISelectItemDetail {
  quantity: number;
  totalPrice: number;
  itemDetail: IItemDetail;
}

export interface ICartItemForm {
  quantity: number;
  price: number;
  item: ISelectItemDetail[];
  coupon: ICoupon[];
  ontop: ICoupon[];
  seasonal: ICoupon[];
  point: {
    customerPoint: number;
    percentAvailable: number;
    isSelectpoint: boolean;
  };
  selectDiscount: {
    coupon?: string;
    ontop?: string;
    seasonal?: string;
    point: number;
  };
}

export interface ICalculateDiscount {
  coupon: number
  point: number
  ontop: number
  seasonal: number
}

export interface ICoupon {
  couponCode: string;
  couponDesc: string;
  couponSubDesc?: string;
  warningDesc?: string;
  couponType: CouponType;
  discount: number;
  discountSubtracting?: number;
  discountType: DiscountType;
  fixCategory?: ItemType;
  isSelected: boolean;
  status: CouponStatus;
}

export interface IcommonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formHandler: UseFormReturn<ICartItemForm, any, undefined>;
  cartDetail?: ICartItemForm;
}
