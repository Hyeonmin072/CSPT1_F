import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import DesignerProfileEdit from "../../components/DesingerAbout/profile/Edit/DesignerProfileEdit.jsx";
import DesignerID from "../../components/DesingerAbout/DesignerID.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// axios 기본 설정
axios.defaults.baseURL = "http://localhost:1271"; // 백엔드 서버 URL
axios.defaults.withCredentials = true; // CORS 인증 설정

export default function DesignerProfileEditPage() {
  const [designerData, setDesignerData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDesignerProfile = async () => {
      try {
        const response = await axios.get("/designer/profile/update");
        console.log("디자이너 프로필 수정 데이터:", response.data);
        console.log("요청 주소: /designer/profile/update");
        setDesignerData(response.data);
      } catch (error) {
        console.error("디자이너 프로필 수정 데이터 가져오기 실패:", error);
      }
    };

    fetchDesignerProfile();
  }, []);

  const handleProfileUpdate = async (formData) => {
    setIsSubmitting(true);
    try {
      // FormData 객체 생성
      const updateData = new FormData();

      // 각 필드 추가 (변경되지 않은 필드도 모두 포함)
      updateData.append("updateNickName", formData.nickname || "");
      updateData.append("updateDesc", formData.description || "");
      updateData.append("updateTel", formData.tel || "");

      // 이미지 파일 처리 - 변경된 경우에만 파일 추가, 변경되지 않은 경우 null로 설정
      if (formData.profileImage && formData.profileImage instanceof File) {
        updateData.append("updateImage", formData.profileImage);
      } else {
        updateData.append("updateImage", null);
      }

      if (formData.bannerImage && formData.bannerImage instanceof File) {
        updateData.append("updateBackgroundImage", formData.bannerImage);
      } else {
        updateData.append("updateBackgroundImage", null);
      }

      // 비밀번호 관련 필드 추가 - 변경되지 않은 경우 null로 설정
      if (formData.currentPassword && formData.currentPassword.trim() !== "") {
        updateData.append("oldPwd", formData.currentPassword);
      } else {
        updateData.append("oldPwd", null);
      }

      if (formData.newPassword && formData.newPassword.trim() !== "") {
        updateData.append("newPwd", formData.newPassword);
      } else {
        updateData.append("newPwd", null);
      }

      if (formData.confirmPassword && formData.confirmPassword.trim() !== "") {
        updateData.append("checkPwd", formData.confirmPassword);
      } else {
        updateData.append("checkPwd", null);
      }

      // FormData 내용 로깅
      console.log("전송할 프로필 업데이트 데이터:");
      for (const [key, value] of updateData.entries()) {
        if (value instanceof File) {
          console.log(
            `${key}: File 객체 (${value.name}, ${value.type}, ${value.size} bytes)`
          );
        } else if (value === null) {
          console.log(`${key}: null`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      // API 요청
      const response = await axios.post(
        "/designer/profile/update",
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("프로필 업데이트 성공:", response.data);

      // 성공 시 프로필 페이지로 이동
      navigate("/profile");
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 데이터가 로딩 중일 때 표시할 내용
  if (!designerData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <DesignerHeader />

      <div className="p-4">
        <DesignerProfileEdit
          name={designerData.name}
          nickname={designerData.nickname}
          email={designerData.email}
          tel={designerData.tel}
          description={designerData.description}
          image={designerData.image}
          backgroundImage={designerData.backgroundImage}
          onUpdate={handleProfileUpdate}
          isSubmitting={isSubmitting}
        />
      </div>

      <DesignerID designer={selectedDesigner} />
    </div>
  );
}
