import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type CarouselSlideProps = {
  slideText: string[];
};

export const CarouselPlugin: React.FC<CarouselSlideProps> = (props) => {
  const plugin = React.useRef(Autoplay({ delay: 4000 }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="w-full ml-auto item-center">
        {props.slideText.map((value, index) => (
          <CarouselItem key={index} className="w-full !pl-0 my-auto">
            <div className="text-[14px] text-black bg-[#F5F5F5] font-[600] h-[70px] p-[26px] text-center item-center">
              {value}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
