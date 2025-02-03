import { ChevronLeft, ChevronRight } from "lucide-react";

// 가게 이미지 슬라이더
//eslint-disable-next-line
export function ShopImageSlider({ image }) {
  return (
    <div className="relative h-[250px] w-full">
      <img
        src={image}
        alt="Shop preview"
        className="w-full h-[250px] object-cover"
      />
      <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white">
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
