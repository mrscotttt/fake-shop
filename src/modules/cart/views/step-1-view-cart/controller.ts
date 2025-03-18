import { useCallback, useMemo, useState } from "react";
import {
  CouponType,
  ICalculateDiscount,
  IcommonProps,
  // ICoupon,
} from "../../interface";

export const useViewCartController = (props: IcommonProps) => {
  const { formHandler, cartDetail } = props;
  const [viewCoupon, setViewCoupon] = useState<boolean>(false);
  const [viewOnTop, setViewOnTop] = useState<boolean>(false);
  const [viewSpecial, setViewSpecial] = useState<boolean>(false);

  const toggleCoupon = () => {
    setViewCoupon(!viewCoupon);
  };

  const toggleOnTop = () => {
    setViewOnTop(!viewOnTop);
  };

  const toggleSpecial = () => {
    setViewSpecial(!viewSpecial);
  };

  const switchPoint = (select: boolean) => {
    formHandler.setValue(`point.isSelectpoint`, select);
  };

  const setWatchList = useCallback(
    (index: number, value: boolean) => {
      formHandler.setValue(`item.${index}.itemDetail.watchList`, value);
    },
    [formHandler]
  );

  const onChooseCoupon = useCallback(
    (type: CouponType, index: number, reset?: boolean) => {
      cartDetail?.[type].map((coupon, couponIndex) => {
        if (reset) {
          formHandler.setValue(`selectDiscount.${type}`, undefined);
        }
        if (couponIndex === index && !reset) {
          formHandler.setValue(`selectDiscount.${type}`, coupon.couponCode);
        }
        formHandler.setValue(
          `${type}.${couponIndex}.isSelected`,
          couponIndex === index && !reset
        );
      });
    },
    [cartDetail, formHandler]
  );

  const calculateDiscount: ICalculateDiscount = useMemo(() => {
    let price: number;
    let discount: ICalculateDiscount;
    const x = cartDetail?.price ? cartDetail?.price : 0;
    price = x;
    // eslint-disable-next-line prefer-const
    discount = {
      coupon: 0,
      point: 0,
      ontop: 0,
      seasonal: 0,
    };

    if (!price) return discount;

    //Discount from first coupon
    if (cartDetail?.selectDiscount.coupon) {
      const mapCoupon = cartDetail?.coupon.find(
        (coupon) => coupon.couponCode === cartDetail?.selectDiscount.coupon
      );

      if (mapCoupon) {
        if (mapCoupon?.discountType === "amount") {
          discount.coupon = mapCoupon?.discount;
          const afterCouponDiscount = price - discount.coupon;
          if (afterCouponDiscount > 0) {
            price = afterCouponDiscount;
          } else {
            discount.coupon = price;
            price = 0;
            return discount;
          }
        } else if (mapCoupon?.discountType === "percent" && price > 0) {
          discount.coupon = (mapCoupon?.discount / 100) * price;
          const afterCouponDiscount = price - discount.coupon;
          if (afterCouponDiscount > 0) {
            price = afterCouponDiscount;
          } else {
            discount.coupon = price;
            price = 0;
            return discount;
          }
        }
      } else {
        //ไม่มีคูปอง
        discount.coupon = 0;
      }
    }

    //if select the point will discount by point
    if (
      cartDetail?.point.isSelectpoint &&
      cartDetail?.selectDiscount?.point > 0
    ) {
      discount.point = cartDetail?.selectDiscount?.point;
      const afterCouponDiscount = price - discount.point;
      if (afterCouponDiscount > 0) {
        price = afterCouponDiscount;
      } else {
        discount.point = price;
        price = 0;
        return discount;
      }
    }

    //discount by topup Category
    if (cartDetail?.selectDiscount.ontop && !cartDetail?.point.isSelectpoint) {
      const mapCoupon = cartDetail?.ontop.find(
        (coupon) => coupon.couponCode === cartDetail?.selectDiscount.ontop
      );

      const filterCatagory = cartDetail?.item.filter(
        (item) => item.itemDetail.itemType === mapCoupon?.fixCategory
      );

      let priceByCatagory = 0;
      priceByCatagory = filterCatagory.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      if (priceByCatagory > 0 && mapCoupon) {
        if (mapCoupon?.discountType === "percent") {
          discount.ontop = (mapCoupon?.discount / 100) * priceByCatagory;
          const afterCouponDiscount = price - discount.ontop;
          if (afterCouponDiscount > 0) {
            if (afterCouponDiscount > 0) {
              price = afterCouponDiscount;
            } else {
              discount.ontop = price;
              price = 0;
              return discount;
            }
          }
        } else {
          discount.ontop = 0;
        }
      } else {
        discount.ontop = 0;
      }
    }

    //discount by seasonal coupon
    if (
      cartDetail?.selectDiscount.seasonal &&
      !cartDetail?.point.isSelectpoint
    ) {
      const mapCoupon = cartDetail?.seasonal.find(
        (coupon) => coupon.couponCode === cartDetail?.selectDiscount.seasonal
      );

      if (mapCoupon && mapCoupon?.discountSubtracting) {
        discount.seasonal =
          Math.floor(price / mapCoupon.discountSubtracting) *
          mapCoupon.discount;
        const afterCouponDiscount = price - discount.seasonal;
        if (afterCouponDiscount <= 0) {
          discount.seasonal = price;
        }
      } else {
        return discount;
      }
    }

    return discount;
  }, [
    cartDetail?.coupon,
    cartDetail?.item,
    cartDetail?.ontop,
    cartDetail?.point.isSelectpoint,
    cartDetail?.price,
    cartDetail?.seasonal,
    cartDetail?.selectDiscount.coupon,
    cartDetail?.selectDiscount.ontop,
    cartDetail?.selectDiscount?.point,
    cartDetail?.selectDiscount.seasonal,
  ]);

  const calculatePrice: number = useMemo(() => {
    const calculatePrice =
      Number(cartDetail?.price) -
      calculateDiscount.coupon -
      calculateDiscount.seasonal;
    return cartDetail?.point.isSelectpoint
      ? calculatePrice - calculateDiscount.point
      : calculatePrice - calculateDiscount.ontop;
  }, [
    calculateDiscount.coupon,
    calculateDiscount.ontop,
    calculateDiscount.point,
    calculateDiscount.seasonal,
    cartDetail?.point.isSelectpoint,
    cartDetail?.price,
  ]);

  return {
    viewCoupon,
    toggleCoupon,
    toggleOnTop,
    toggleSpecial,
    setWatchList,
    onChooseCoupon,
    viewOnTop,
    viewSpecial,
    switchPoint,
    calculateDiscount,
    calculatePrice,
  };
};
