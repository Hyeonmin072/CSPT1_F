import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuSelect from "../../components/reservation/menuselect/MenuSelect.jsx";
import Header from "../../components/common/Header.jsx";
import axiosInstance from "../../components/sign/axios/AxiosInstance";

export default function MenuSelectPage() {
  const { designerEmail } = useParams();
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      setLoading(true);
      try {
        console.log("\n=== 디자이너 메뉴 데이터 요청 시작 ===");
        console.log("디자이너 이메일:", designerEmail);

        const response = await axiosInstance.get(
          `/user/reservation/selectmenu/${designerEmail}`
        );

        console.log("\n=== 메뉴 데이터 응답 ===");
        console.log("Status:", response.status);
        console.log("Headers:", response.headers);
        console.log("데이터:", response.data);
        console.log("데이터 타입:", typeof response.data);

        if (typeof response.data === "object") {
          console.log("\n=== 메뉴 데이터 상세 ===");
          Object.keys(response.data).forEach((key) => {
            console.log(`${key}:`, response.data[key]);
          });
        }

        setMenuData(response.data);
      } catch (error) {
        console.error("\n=== 메뉴 데이터 요청 실패 ===");
        console.error("에러 메시지:", error.message);
        console.error("에러 상세:", error.response?.data);
        console.error("에러 상태 코드:", error.response?.status);
        setError("메뉴 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (designerEmail) {
      fetchMenuData();
    }
  }, [designerEmail]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
        {loading ? (
          <div className="text-center">로딩 중...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <MenuSelect menuData={menuData} />
        )}
      </div>
    </div>
  );
}
