// pages/designer/SubscriptDesignerPage.jsx
import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import d1 from "../../assets/designer/d1.png";
import Header from "../../components/common/Header";

const DesignerCard = ({ designer }) => {
  const [liked, setLiked] = useState(designer.isLiked || false);

  return (
    <div className="relative">
      <div className="flex flex-col items-center w-64 p-4 bg-white rounded-lg shadow-md m-2 mt-5">
        <img
          src={designer.image}
          alt={designer.name}
          className="w-32 h-32 rounded-full mb-4"
        />
        <h3 className="font-bold text-lg mb-1">{designer.name}</h3>
        <p className="text-gray-500 mb-2">{designer.hairshop}</p>
        <p className="text-sm text-gray-400 text-center">
          새로운 감성의 이용환경을 선물하드립니다.
        </p>
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-6 right-6 z-10"
        >
          <Heart
            className={`w-6 h-6 ${
              liked ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

const SubscriptDesignerPage = () => {
  const designers = [
    {
      id: 1,
      name: "디자이너 ㅁㅁㅁ",
      hairshop: "ㅁㅁ헤어샵",
      image: d1,
      isLiked: false,
    },
    {
      id: 2,
      name: "디자이너 ㅁㅁㅁ",
      hairshop: "ㅁㅁ헤어샵",
      image: d1,
      isLiked: false,
    },
    {
      id: 3,
      name: "디자이너 ㅁㅁㅁ",
      hairshop: "ㅁㅁ헤어샵",
      image: d1,
      isLiked: false,
    },
    {
      id: 4,
      name: "디자이너 ㅁㅁㅁ",
      hairshop: "ㅁㅁ헤어샵",
      image: d1,
      isLiked: true,
    },
    {
      id: 5,
      name: "디자이너 ㅁㅁㅁ",
      hairshop: "ㅁㅁ헤어샵",
      image: d1,
      isLiked: true,
    },
  ];

  const scrollContainer = (direction) => {
    const container = document.getElementById("designer-container");
    const scrollAmount = direction === "left" ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="w-full max-w-6xl mx-auto my-8 mt-[100px]">
        <h2 className="text-2xl font-bold text-center mb-8">
          좋아하는 디자이너
        </h2>
        <div className="relative">
          <button
            onClick={() => scrollContainer("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            id="designer-container"
            className="flex overflow-x-auto scroll-smooth hide-scrollbar gap-4 px-12"
          >
            {designers.map((designer) => (
              <DesignerCard key={designer.id} designer={designer} />
            ))}
          </div>

          <button
            onClick={() => scrollContainer("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptDesignerPage;
