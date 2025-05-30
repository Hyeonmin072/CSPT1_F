import { useState, useEffect } from "react";
import { MessageSquareText, Edit } from "lucide-react";
import { selectedDesigner } from "../../dummydata/DummydbDesigner.jsx";
import { useNavigate } from "react-router-dom";

export default function LeftSection({ description, isViewMode = false }) {
  const [designer, setDesigner] = useState(null); // 디자이너 정보 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const navigate = useNavigate();

  const currentProfileId = 1; // 보여주고 싶은 디자이너의 id

  // 데이터 가져오기
  useEffect(() => {
    const fetchDesignerProfile = async () => {
      try {
        // 더미 데이터 사용
        const data = selectedDesigner;
        setDesigner(data); // 디자이너 데이터 상태 업데이트
      } catch (error) {
        console.error("Error fetching designer profile:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchDesignerProfile();
  }, []);

  const handleEditProfile = () => {
    navigate("/profileedit");
  };

  const handleReservation = () => {
    // 디자이너 이메일을 URL 파라미터로 추가
    if (designer && designer.email) {
      navigate(`/calendarselect/${designer.email}`);
    } else {
      // 이메일이 없는 경우 fallback
      console.error("디자이너 이메일 정보가 없습니다.");
    }
  };

  const handleChat = () => {
    navigate("/chat");
  };

  if (loading) {
    return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
  }

  if (!designer) {
    return (
      <div className="text-center mt-4">
        디자이너 정보를 불러올 수 없습니다.
      </div>
    ); // 에러 메시지
  }

  return (
    <>
      {designer && (
        <div>
          {/* 소개 */}
          <div className="bg-gray-100 p-5 rounded">
            <p className="mt-2">{description || "소개글이 없습니다."}</p>
          </div>

          {/* 버튼 영역 */}
          <div className="mt-4 px-5 flex flex-row space-x-3">
            {isViewMode ? (
              // 사용자가 디자이너 프로필 보기 모드 (예약하기, 채팅하기 버튼 표시)
              <>
                <button
                  className="flex-1 border border-green-600 text-green-600 py-2 rounded hover:bg-green-600 hover:text-white transition-colors"
                  onClick={handleReservation}
                >
                  예약하기
                </button>
                <button
                  className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                  onClick={handleChat}
                >
                  <MessageSquareText className="w-5 h-5 text-white" />
                </button>
              </>
            ) : (
              // 디자이너가 자신의 프로필 보기 모드 (프로필 수정 버튼 표시)
              <button
                className="w-full border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center"
                onClick={handleEditProfile}
              >
                <Edit className="w-4 h-4 mr-1" />
                프로필 수정
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
