import { ChevronLeft, ChevronRight } from "lucide-react";

export const ImageSlider = ({ images = [] }) => {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <img
        src="/api/placeholder/1200/400"
        alt="Shop"
        className="w-full h-full object-cover"
      />
      <SliderNavButtons />
    </div>
  );
};
