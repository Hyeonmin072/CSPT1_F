import { useState, useEffect } from "react";
import { Upload, UserRound } from "lucide-react";
import axios from "axios";

export default function CVProfile({ isEditable, resumeData, image, setImage }) {
  const [profile, setProfile] = useState({
    d_id: "",
    d_name: "",
    d_email: "",
    d_tel: "",
    d_gender: "",
    d_age: "",
    d_image: "",
  }); // 프로필 데이터 상태
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 프로필 데이터 가져오기
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (resumeData) {
          const profileData = {
            d_id: resumeData.d_id || "",
            d_name: resumeData.d_name || "",
            d_email: resumeData.d_email || "",
            d_tel: resumeData.d_tel || "",
            d_gender: resumeData.d_gender || "",
            d_age: resumeData.d_age || "",
            d_image: resumeData.d_image || "",
          };

          console.log(profileData);
          setProfile(profileData);

          // d_image가 null이 아니면 초기 이미지로 설정
          if (resumeData.d_image) {
            console.log("CVProfile - 이미지 설정:", resumeData.d_image);
            setImage(resumeData.d_image);
            setPreview(URL.createObjectURL(resumeData.d_image));
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchProfileData();
  }, [resumeData]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file); // File 객체만 저장
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // File 객체만 저장
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    if (image && image instanceof File) {
      formData.append("image", image);
    }
    // ...다른 데이터 append
    axios.post("/api/your-endpoint", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  if (loading) {
    return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
  }

  if (!profile) {
    return (
      <div className="text-center mt-4">프로필 정보를 불러올 수 없습니다.</div>
    ); // 에러 처리
  }

  return (
    <div className="flex w-full max-w-4xl border-b-2">
      <div className="p-8 flex justify-center">
        <div
          className="w-[240px] h-[280px] border-dashed border-4 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() =>
            isEditable && document.getElementById("fileInput").click()
          }
        >
          {preview ? (
            <img
              src={preview}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : isEditable ? (
            <>
              <Upload className="w-12 h-12 text-gray-600" />
              <span className="text-gray-600 mt-2">사진을 올려주세요!</span>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
              <UserRound size={80} className="text-gray-400" />
            </div>
          )}
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
            disabled={!isEditable}
          />
        </div>
      </div>
      <div className="p-8">
        {/* 이름 */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-gray-700 font-bold">이름</label>
          <span className="w-[400px] border rounded p-2 bg-gray-100">
            {profile.d_name}
          </span>
        </div>

        {/* 이메일 */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-gray-700 font-bold">이메일</label>
          <span className="w-[400px] border rounded p-2 bg-gray-100">
            {profile.d_email}
          </span>
        </div>

        {/* 전화번호 */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-gray-700 font-bold">전화번호</label>
          <span className="w-[400px] border rounded p-2 bg-gray-100">
            {profile.d_tel}
          </span>
        </div>

        {/* 성별 */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-gray-700 font-bold">성별</label>
          <span className="w-[400px] border rounded p-2 bg-gray-100">
            {profile.d_gender === "MALE"
              ? "남성"
              : profile.d_gender === "FEMALE"
              ? "여성"
              : profile.d_gender}
          </span>
        </div>

        {/* 생년월일 */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-gray-700 font-bold">나이</label>
          <span className="w-[400px] border rounded p-2 bg-gray-100">
            {profile.d_age}
          </span>
        </div>
      </div>
    </div>
  );
}
