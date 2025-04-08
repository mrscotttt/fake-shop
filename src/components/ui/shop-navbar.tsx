"use client";
import { SiJordan } from "react-icons/si";
import { FC } from "react";
import { Separator } from "./separator";
import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { CarouselPlugin } from "./carousal-slide";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ShopNavBarContainer: FC<any> = () => {
  const slideText = [
    "ลดเพิ่ม 30% สำหรับสินค้าลดราคา เมื่อซื้อขั้นต่ำ 2 ชิ้น พร้อมใช้โค้ด: LEVELUP เงื่อนไขเป็นไปตามที่กำหนด ช็อปเลย",
    "สำหรับคำสั่งซื้อมูลค่า ฿5,500 บาท หรือมากกว่า ดูรายละเอียด",
    "ลดเพิ่ม 30% สำหรับสินค้าลดราคา เมื่อซื้อขั้นต่ำ 2 ชิ้น พร้อมใช้โค้ด: FRESH เงื่อนไขเป็นไปตามที่กำหนด ช็อปเลย",
    "สำหรับคำสั่งซื้อมูลค่า ฿5,500 บาท หรือมากกว่า ดูรายละเอียด",
  ];

  return (
    <div>
      <div className="flex justify-between bg-[#F5F5F5] w-full py-[10px] h-[36px] px-[64px]">
        <SiJordan className="text-left bg-[#F5F5F5] text-[20px] mt-[-4px]" />
        <div>
          <div className="flex text-[12px] font-[700] mt-[3px] h-3 items-center space-x-4 text-sm">
            <div>ค้นหาร้าน</div>
            <Separator
              className="w-[2px] mb-[6px] bg-black"
              orientation="vertical"
            />
            <div>ความช่วยเหลือ</div>
            <Separator
              className="w-[2px] mb-[6px] bg-black"
              orientation="vertical"
            />
            <div>เข้าร่วมกับเรา</div>
            <Separator
              className="w-[2px] mb-[6px] bg-black"
              orientation="vertical"
            />
            <div>ลงชื่อเข้าใช้</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between bg-white w-full py-[24px] h-[60px] px-[64px]">
        <Image
          className="dark:invert mt-[-8px] ml-[-12px]"
          src="/images/nike-logo.svg"
          alt="Vercel logomark"
          width={80}
          height={15}
        />

        <div>
          <div className="flex text-[16px] font-[550] mt-[0px] h-5 items-center space-x-5 text-sm">
            <div>ลดเพิ่ม 30%</div>
            <div>ใหม่และโดดเด่น</div>
            <div>ผู้ชาย</div>
            <div>ผู้หญิง</div>
            <div>เด็ก</div>
            <div>ลดราคา</div>
            <div>SNKRS</div>
          </div>
        </div>

        <div className="flex !item-right">
          <IoMdHeartEmpty className="text-[26px] mt-[-8px]" />
          <Link href="/cart">
            <IoBagOutline className="text-[26px] ml-[16px] mt-[-8px]" />
          </Link>
        </div>
      </div>

      <CarouselPlugin slideText={slideText} />
    </div>
  );
};
