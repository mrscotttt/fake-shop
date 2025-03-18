import { Button } from "@/components/ui/button";
import { CouponType, ICoupon } from "@/modules/cart/interface";
import { FC } from "react";

interface CouponCardProps {
  type: CouponType;
  index: number;
  coupon: ICoupon;
  onChooseCoupon: (type: CouponType, index: number, reset?: boolean) => void;
}

export const CouponCard: FC<CouponCardProps> = (props) => {
  const { type, coupon, index, onChooseCoupon } = props;

  const renderButton = () => {
    if (coupon.status === "available") {
      if (coupon?.isSelected) {
        return (
          <div className="!flex !items-center bg-gray-950 text-white !justify-center text-[12px] border-1 border-gray-300 !rounded-r-lg !h-auto w-[100px] font-semibold">
            กำลังเลือกใช้งาน
          </div>
        );
      } else {
        return (
          <Button
            className="text-[12px] border-1 bg-white border-gray-300  bg-gray-400 !rounded-l-none w-[100px] !h-auto font-semibold"
            onClick={() => onChooseCoupon(type, index)}
          >
            เลือกใช้
          </Button>
        );
      }
    } else {
      return (
        <div className="!flex !items-center bg-gray-400 text-white !justify-center text-[12px] border-1 border-gray-300 !rounded-r-lg !h-auto w-[100px] font-semibold">
          {coupon.status}
        </div>
      );
    }
  };

  return (
    <div className="p-2">
      <div className="!flex !justify-between border-1 bg-white border-gray-300 text-center rounded-lg">
        <div className="text-[12px] text-left p-[8px]">
          <div className="">{`${coupon?.couponDesc} ${coupon?.couponSubDesc}`}</div>
          <div className=""></div>
          <div className="">รหัสอ้างอิง {coupon?.couponCode}</div>
        </div>
        {renderButton()}
      </div>
    </div>
  );
};
