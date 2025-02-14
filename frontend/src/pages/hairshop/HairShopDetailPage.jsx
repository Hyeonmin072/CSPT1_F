import ShopDetail from "../../components/hairshop/hairshopdetail/Detail.jsx";
import Header from "../../components/common/Header.jsx";
export default function HairShopDetailPage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="p-4">
        <ShopDetail />
      </div>
    </div>
  );
}
