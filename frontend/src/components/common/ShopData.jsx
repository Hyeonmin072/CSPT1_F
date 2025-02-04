import { ShopSearch } from "../shop/ShopSearch";
import { ShopImageSlider } from "../shop/ShopImageSlider";
import { ShopInfo } from "../shop/ShopInfo";
import h1 from "../../assets/hairshop/h1.jpg";

export default function ShopData() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <ShopSearch />
      <div className="flex justify-center">
        <div className="mt-4 border rounded-lg w-[1000px]">
          <ShopImageSlider image={h1} />
          <ShopInfo />
        </div>
      </div>
    </div>
  );
}
