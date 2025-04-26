import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/common/Header.jsx";
import axiosInstance from "../../components/sign/axios/AxiosInstance";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";

export default function MenuSelectPage() {
  const { designerEmail } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, selectedTime } = location.state || {};
  const [menuData, setMenuData] = useState(null);
  const [designerInfo, setDesignerInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [menuResponse, designerResponse] = await Promise.all([
          axiosInstance.get(`/user/reservation/selectmenu/${designerEmail}`),
          axiosInstance.get(`/user/reservation/selecttime/${designerEmail}`)
        ]);
        
        console.log("=== 디자이너 정보 응답 데이터 구조 ===");
        console.log("전체 응답:", designerResponse.data);
        console.log("속성 목록:", Object.keys(designerResponse.data));
        console.log("================================");
        
        setMenuData(menuResponse.data);
        setDesignerInfo(designerResponse.data);
      } catch (error) {
        console.error("데이터 요청 실패:", error);
        setError("데이터를 불러오는데 실패했습니다.");
        toast.error("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (designerEmail) {
      fetchData();
    }
  }, [designerEmail]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`;
  };

  const handleComplete = () => {
    if (!selectedMenu) {
      toast.error("메뉴를 선택해주세요.");
      return;
    }

    // 선택된 모든 데이터 종합하여 로깅
    const reservationData = {
      // 디자이너 정보
      designerName: designerInfo?.designerName,
      designerDesc: designerInfo?.designerDesc,
      designerEmail: designerEmail,
      
      // 예약 일시
      reservationDate: selectedDate,
      reservationTime: selectedTime,
      
      // 선택된 메뉴 정보
      menuInfo: {
        menuId: selectedMenu.menuId,
        menuName: selectedMenu.menuName,
        menuDesc: selectedMenu.menuDesc,
        originalPrice: selectedMenu.menuPrice,
        discountPrice: selectedMenu.discountPrice,
        discountType: selectedMenu.discountType,
        finalPrice: selectedMenu.menuPrice - (selectedMenu.discountPrice || 0)
      }
    };

    console.log("=== 예약 정보 종합 ===");
    console.log("디자이너:", reservationData.designerName);
    console.log("디자이너 소개:", reservationData.designerDesc);
    console.log("예약 날짜:", formatDate(reservationData.reservationDate));
    console.log("예약 시간:", reservationData.reservationTime);
    console.log("선택 메뉴:", reservationData.menuInfo.menuName);
    console.log("메뉴 설명:", reservationData.menuInfo.menuDesc);
    console.log("원래 가격:", reservationData.menuInfo.originalPrice.toLocaleString() + "원");
    if (reservationData.menuInfo.discountPrice > 0) {
      console.log("할인 정보:", reservationData.menuInfo.discountType);
      console.log("할인 금액:", reservationData.menuInfo.discountPrice.toLocaleString() + "원");
    }
    console.log("최종 가격:", reservationData.menuInfo.finalPrice.toLocaleString() + "원");
    console.log("=====================");

    toast.success("메뉴가 선택되었습니다!");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col mt-20">
      <Header />
      {/* 커스텀 헤더 */}
      <div className="fixed top-16 left-0 right-0 bg-white border-b z-10 mt-3">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-600 p-2"
          >
            <IoChevronBackOutline size={24} />
          </button>
          <h1 className="ml-2 text-lg font-medium">메뉴 선택</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 mt-20 w-full">
        {/* 예약 정보 요약 카드 */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img
                src={designerInfo?.designerImage || "/default-avatar.png"}
                alt={designerInfo?.designerName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">{designerInfo?.designerName}</h2>
              <p className="text-gray-600">{designerInfo?.designerDesc}</p>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-4">
            <div>
              <p>예약 날짜: {formatDate(selectedDate)}</p>
              <p>예약 시간: {selectedTime}</p>
            </div>
          </div>
        </div>

        {/* 메뉴 섹션 */}
        {loading ? (
          <div className="text-center py-8">로딩 중...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="space-y-6">
            {/* 컷트 메뉴 */}
            {menuData?.cutMenus?.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-4">컷트</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuData.cutMenus.map((menu) => (
                    <div
                      key={menu.menuId}
                      className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all
                        ${selectedMenu?.menuId === menu.menuId ? 'ring-2 ring-[#03DAC5]' : 'hover:shadow-lg'}`}
                      onClick={() => setSelectedMenu(menu)}
                    >
                      <h4 className="font-medium text-lg">{menu.menuName}</h4>
                      <p className="text-gray-600 text-sm mt-1">{menu.menuDesc}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-bold text-lg">
                          {menu.menuPrice.toLocaleString()}원
                        </span>
                        {menu.discountPrice > 0 && (
                          <span className="text-red-500 text-sm">
                            {menu.discountType} {menu.discountPrice.toLocaleString()}원
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleComplete}
            className={`w-full py-3 rounded-lg font-medium
              ${selectedMenu
                ? "bg-[#03DAC5] text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            disabled={!selectedMenu}
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
}
