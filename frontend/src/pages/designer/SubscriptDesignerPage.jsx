// pages/designer/SubscriptDesignerPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Header from "../../components/common/Header";
import api from "../../api/axiosInstance"; // Correct axios instance

const DesignerCard = ({ designer, onUnlike }) => {
  const navigate = useNavigate();

  const handleDesignerClick = () => {
    navigate(`/designerinfo/${designer.designerEmail}`);
  };

  const handleUnlikeClick = (e) => {
    e.stopPropagation(); // Prevent card click event from firing
    onUnlike(designer.designerEmail);
  };

  return (
    <div className="relative cursor-pointer" onClick={handleDesignerClick}>
      <div className="flex flex-col items-center w-64 p-4 bg-white rounded-lg shadow-md m-2 mt-5">
        <img
          src={designer.designerImage || "https://via.placeholder.com/128"} // Placeholder image
          alt={designer.designerName}
          className="w-32 h-32 rounded-full mb-4"
        />
        <h3 className="font-bold text-lg mb-1">{designer.designerName}</h3>
        <p className="text-gray-500 mb-2">{designer.shopName}</p>
        <p className="text-sm text-gray-400 text-center h-10 overflow-hidden">
          {designer.designerDesc || "한층 업그레이드 된 서비스와 펌 실력으로 고객님들의 마음을 사로 잡아 드리겠습니다"}
        </p>
        <button
          onClick={handleUnlikeClick} // Use the new handler
          className="absolute top-6 right-6 z-10"
        >
          <Heart className="w-6 h-6 fill-red-500 text-red-500" />
        </button>
      </div>
    </div>
  );
};

const SubscriptDesignerPage = () => {
  const [designers, setDesigners] = useState([]);

  const fetchLikedDesigners = async () => {
    try {
      // Assuming the endpoint is '/user/like-designerpage'
      const response = await api.get("/user/like-designerpage");
      console.log("Liked Designers API Response:", response.data);
      setDesigners(response.data);
    } catch (error) {
      console.error("Error fetching liked designers:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    fetchLikedDesigners();
  }, []);

  const handleUnlike = async (designerEmail) => {
    try {
      // Assuming the endpoint to unlike is '/user/designerlike' with a DELETE request
      // or a POST request with a specific payload, here we use POST as an example
      await api.post("/user/designerlike", { designerEmail: designerEmail, like: false });
      // Update the state to remove the unliked designer
      setDesigners(designers.filter((designer) => designer.designerEmail !== designerEmail));
    } catch (error) {
      console.error("Error unliking designer:", error);
    }
  };

  const scrollContainer = (direction) => {
    const container = document.getElementById("designer-container");
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
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
            {designers.length > 0 ? (
              designers.map((designer) => (
                <DesignerCard
                  key={designer.designerEmail}
                  designer={designer}
                  onUnlike={handleUnlike}
                />
              ))
            ) : (
              <p className="text-center w-full">좋아요한 디자이너가 없습니다.</p>
            )}
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
