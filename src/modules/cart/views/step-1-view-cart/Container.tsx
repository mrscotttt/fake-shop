"use client";

import { FC } from "react";
import { IcommonProps, ISelectItemDetail } from "../../interface";
import { formatBaht } from "@/modules/helpers/format";
import { ItemCard } from "./views/item-card";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useViewCartController } from "./controller";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CouponCard } from "./views/coupon-card";
import { Controller } from "react-hook-form";
import Image from "next/image";

export const CartStep1Container: FC<IcommonProps> = (props) => {
  const { cartDetail, formHandler } = props;
  const {
    setWatchList,
    viewCoupon,
    toggleCoupon,
    toggleOnTop,
    toggleSpecial,
    onChooseCoupon,
    viewOnTop,
    viewSpecial,
    switchPoint,
    calculateDiscount,
    calculatePrice,
  } = useViewCartController(props);

  const CartList = () => {
    return (
      <div className="">
        <div className="text-[28px] font-left mb-[8px] font-[500]">ตะกร้า</div>

        <div>
          {cartDetail?.item.map((item: ISelectItemDetail, index) => {
            return (
              <ItemCard
                item={item}
                index={index}
                setWatchList={setWatchList}
                key={index}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const PrictList = () => {
    return (
      <div className="!text-left mb-[100px] mb-[96px]">
        <div className="text-[28px] font-medium mb-[8px]">สรุป</div>
        <div className="flex justify-between">
          <div className="!text-left w-[full]">
            <div className="!flex text-[20px]">
              ยอดรวมย่อย
              <AiFillQuestionCircle className="text-[18px] mt-[5px] ml-[8px]" />
            </div>
          </div>

          <div className="!text-right text-[18px]">
            {formatBaht(cartDetail?.price)}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="!text-left w-[full]">
            <div className="!flex text-[20px]">
              ค่าธรรมเนียมการจัดส่งและดำเนินการโดยประมาณ
            </div>
          </div>

          <div className="!text-right text-[18px]">ฟรี</div>
        </div>

        <div className="flex justify-between mt-[24px]">
          <div className="!text-left w-[full]">
            <div className="!flex text-[20px] font-bold">ยอดรวม</div>
          </div>

          <div className="!text-right text-[18px] font-bold">
            {formatBaht(cartDetail?.price)}
          </div>
        </div>

        <div
          className={`flex justify-between ${
            calculateDiscount.coupon ? "" : "hidden"
          }`}
        >
          <div className="!text-left w-[full]">
            <div className="!flex text-[20px]">ส่วนลดจากคูปอง</div>
          </div>

          <div className="!text-right text-[18px] text-red-500">
            -{formatBaht(calculateDiscount.coupon)}
          </div>
        </div>

        <div
          className={`flex justify-between  ${
            cartDetail?.point.isSelectpoint && cartDetail?.selectDiscount.point
              ? ""
              : "hidden"
          }`}
        >
          <div className="!text-left w-[full]">
            <div className="!flex text-[20px]">ใช้ point แทนเงินส่วนลด</div>
          </div>

          <div className="!text-right text-[18px] text-red-500">
            -{formatBaht(calculateDiscount.point)}
          </div>
        </div>

        <div
          className={`flex justify-between ${
            calculateDiscount.ontop ? "" : "hidden"
          }`}
        >
          <div className="!text-left w-[full]">
            <div className="!flex text-[20px]">
              ส่วนลดจากคูปองส่วนลดเพิ่มเติม
            </div>
          </div>

          <div className="!text-right text-[18px] text-red-500">
            -{formatBaht(calculateDiscount.ontop)}
          </div>
        </div>

        <div
          className={`flex justify-between ${
            calculateDiscount.seasonal ? "" : "hidden"
          }`}
        >
          <div className="!text-left w-[full]">
            <div className="!flex text-[20px]">ส่วนลดจากคูปองแคมเปญ</div>
          </div>

          <div className="!text-right text-[18px] text-red-500">
            -{formatBaht(calculateDiscount.seasonal)}
          </div>
        </div>

        <div
          className={`flex justify-between ${
            calculatePrice !== cartDetail?.price ? "" : "hidden"
          }`}
        >
          <div className="!text-left w-[full]">
            <div className="!flex text-[20px]">ยอดที่ต้องชำระ</div>
          </div>

          <div className="!text-right text-[18px]">
            {formatBaht(calculatePrice)}
          </div>
        </div>

        <div className="flex mt-[24px]">
          <div className="ml-auto">
            <Button
              variant="outline"
              className="mr-1"
              onClick={() => toggleCoupon()}
            >
              {" "}
              ใช้คูปอง{" "}
            </Button>
            <Button
              variant="outline"
              className="mr-1"
              onClick={() => toggleOnTop()}
            >
              {" "}
              ใช้คูปองส่วนลดเพิ่มเติม{" "}
            </Button>
            <Button variant="outline" onClick={() => toggleSpecial()}>
              {" "}
              ใช้คูปองส่วนลดแคมเปญ{" "}
            </Button>
          </div>
        </div>

        <Dialog open={viewCoupon}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>รายการคูปองส่วนลด</DialogTitle>
              <DialogDescription>
                สามารถเลือกคูปองได้มากที่สุด 1 ใบต่อประเภทคูปอง
              </DialogDescription>
            </DialogHeader>

            <div
              className={`max-w-screen-lg overflow-y-scroll max-h-[500px] disable`}
            >
              {cartDetail?.coupon.map((item, index) => {
                return (
                  <CouponCard
                    key={index}
                    type={"coupon"}
                    index={index}
                    coupon={item}
                    onChooseCoupon={onChooseCoupon}
                  />
                );
              })}
            </div>

            {calculateDiscount.coupon ? (
              <div className="p-[8px] text-green-500 !text-[12px]">
                {`ได้รับส่วนลดไปแล้ว ${formatBaht(calculateDiscount.coupon)}`}
              </div>
            ) : (
              <></>
            )}

            <DialogFooter>
              {cartDetail?.selectDiscount.coupon ? (
                <Button
                  variant={"outline"}
                  onClick={() => onChooseCoupon("coupon", 0, true)}
                >
                  Reset
                </Button>
              ) : (
                <></>
              )}
              <Button onClick={() => toggleCoupon()}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={viewOnTop}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>รายการคูปองส่วนลดเพิ่มเติม</DialogTitle>
              <DialogDescription>
                สามารถเลือกคูปองได้มากที่สุด 1 ใบต่อประเภทคูปอง หรือเลือกใช้
                point แทนเงินสด
              </DialogDescription>
            </DialogHeader>

            {cartDetail?.point.isSelectpoint ? (
              <div className="py-[4px] text-[14px]">
                <div>
                  เมื่อเลือกใช้ point แลกแทนส่วนลดจะไม่สามารถเลือกคูปองส่วนลดได้
                </div>
                <div>1 Point ใช้แทนมูลค่าของเงินสด ฿1</div>
                <div className="text-[16px] font-[500]">{`จำนวน point คงเหลือของคุณ คือ ${cartDetail.point.customerPoint}`}</div>
                <div className="font-red-500">{`*สามารถใช้ point สูงสุดไม่เกิน ${Math.floor(
                  cartDetail.price * 0.2
                )} point (${
                  cartDetail.point.percentAvailable
                }% ของราคาสินค้า)`}</div>
              </div>
            ) : (
              <div className="max-w-screen-lg overflow-y-scroll max-h-[500px]">
                {cartDetail?.ontop.map((item, index) => {
                  return (
                    <CouponCard
                      key={index}
                      type={"ontop"}
                      index={index}
                      coupon={item}
                      onChooseCoupon={onChooseCoupon}
                    />
                  );
                })}
              </div>
            )}

            {calculateDiscount.ontop && !cartDetail?.point.isSelectpoint ? (
              <div className="p-[8px] text-green-500 !text-[12px]">
                {`ได้รับส่วนลดไปแล้ว ${formatBaht(calculateDiscount.ontop)}`}
              </div>
            ) : (
              <></>
            )}

            <div className="flex w-full items-center space-x-2 w-full">
              <div className="py-[8px] text-[14px]">Point</div>
              <Switch
                checked={cartDetail?.point.isSelectpoint}
                onCheckedChange={(check) => switchPoint(check)}
              />

              {cartDetail?.point.isSelectpoint ? (
                <Controller
                  name="selectDiscount.point"
                  control={formHandler.control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="selectDiscount.point"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="ระบุพ้อยที่ต้องการแลก"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        const maxRange = Math.min(
                          Math.floor(
                            (cartDetail.price *
                              cartDetail.point.percentAvailable) /
                              100
                          ),
                          cartDetail.point.customerPoint
                        );
                        const intValue =
                          value === ""
                            ? ""
                            : Math.min(
                                maxRange,
                                Math.max(0, parseInt(value, 10) || 0)
                              ); // Enforce range 0-100
                        field.onChange(intValue);
                      }}
                    />
                  )}
                />
              ) : (
                <></>
              )}
            </div>

            <DialogFooter>
              {cartDetail?.selectDiscount.ontop &&
              !cartDetail?.point.isSelectpoint ? (
                <Button
                  variant={"outline"}
                  onClick={() => onChooseCoupon("ontop", 0, true)}
                >
                  Reset
                </Button>
              ) : (
                <></>
              )}

              <Button onClick={() => toggleOnTop()}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={viewSpecial}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>รายการคูปองส่วนลดตามแคมเปญ</DialogTitle>
              <DialogDescription>
                สามารถเลือกคูปองได้มากที่สุด 1 ใบต่อประเภทคูปอง
              </DialogDescription>
            </DialogHeader>

            <div className="max-w-screen-lg overflow-y-scroll max-h-[500px]">
              {cartDetail?.seasonal.map((item, index) => {
                return (
                  <CouponCard
                    key={index}
                    type={"seasonal"}
                    index={index}
                    coupon={item}
                    onChooseCoupon={onChooseCoupon}
                  />
                );
              })}
            </div>

            {calculateDiscount.seasonal ? (
              <div className="p-[8px] text-green-500 !text-[12px]">
                {`ได้รับส่วนลดไปแล้ว ${formatBaht(calculateDiscount.seasonal)}`}
              </div>
            ) : (
              <></>
            )}

            <DialogFooter>
              {cartDetail?.selectDiscount.seasonal ? (
                <Button
                  variant={"outline"}
                  onClick={() => onChooseCoupon("seasonal", 0, true)}
                >
                  Reset
                </Button>
              ) : (
                <></>
              )}
              <Button onClick={() => toggleSpecial()}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="!block">
          <Button className="!block item-center !mt-[32px] my-[10px] text-[20px]  w-full  h-[64px] rounded-full">
            บุคคลทั่วไปเช็คเอาท์
          </Button>
          <Button className="!block item-center my-[10px] text-[20px] w-full h-[64px] rounded-full">
            สมาชิกเช็คเอาท์
          </Button>
          <Button
            variant="ghost"
            className="!block bg-[#F5F5F5] border-2 !item-center my-[10px] text-[20px]  w-full h-[64px] rounded-full"
          >
            <Image
              className="!item-center mx-auto"
              src={"/images/paypal-icon.png"}
              alt="Description of image"
              width={60}
              height={60}
              layout="intrinsic"
            />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="!min-h-screen !pb-[500px]">
      <div className="flex p-8">
        <div className="size-14 grow-7 p-8">{CartList()}</div>
        <div className="size-14 grow-4 p-8">{PrictList()}</div>
      </div>
      <div className="fixed bottom-0 left-0 p-[16px] w-full bg-white border-2 text-white text-center">
        <Button className="item-center text-[20px] w-full h-[64px] rounded-full">
          ไปที่เช็คเอาท์
        </Button>
      </div>
    </div>
  );
};
