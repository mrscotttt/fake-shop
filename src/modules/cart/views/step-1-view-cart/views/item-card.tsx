import { FC } from "react";
import { ISelectItemDetail } from "../../../interface";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { formatBaht } from "@/modules/helpers/format";
import { FaMinus } from "react-icons/fa6";

interface props {
  item: ISelectItemDetail;
  index: number;
  setWatchList: (index: number, value: boolean) => void;
}

export const ItemCard: FC<props> = ({ item, index, setWatchList }) => {
  return (
    <div className="py-[12px]">
      <hr className="border-t border-gray-300 mb-[24px]"></hr>
      <div className="flex">
        <div className="">
          <Image
            src={item.itemDetail?.imgSource}
            alt="Description of image"
            width={200}
            height={164}
            layout="intrinsic"
          />
          <div className="flex justify-between">
            <div className="text-center mt-[8px] border-2 border-gray-200 rounded-full p-2 w-[100px] h-[40px]  text-[16px]">
              <div className="flex justify-between">
                {item.quantity === 1 ? (
                  <RiDeleteBinLine className="text-[20px]" />
                ) : (
                  <FaMinus className="text-[20px]" />
                )}
                <div>{item.quantity}</div>
                <GoPlus className="text-[20px]" />
              </div>
            </div>
            <div className="text-center mt-[8px] border-2 border-gray-200 rounded-full p-2 w-[40px] h-[40px]">
              {item.itemDetail.watchList ? (
                <IoMdHeart
                  className="text-[20px] !text-red-500"
                  onClick={() => setWatchList(index, false)}
                />
              ) : (
                <IoMdHeartEmpty
                  className="text-[20px]"
                  onClick={() => setWatchList(index, true)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full p-[16px]">
          <div className="!flex !justify-between">
            <div className="!text-left w-[full]">
              <div className="text-[18px] font-bold">
                {item.itemDetail.itemDesc}
              </div>
              <div className="text-[18px] font-light">
                {item.itemDetail.itemSubDesc}
              </div>
              <div className="text-[18px] font-light">
                {`ไซส์ ${item.itemDetail.size}`}
              </div>
            </div>
            <div className="!text-right text-[18px] font-bold">
              {formatBaht(item.totalPrice)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
