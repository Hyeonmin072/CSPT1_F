import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Plus, Trash2 } from "lucide-react";
import axiosInstance from "../../components/sign/axios/AxiosInstance";
import BusinessHeader from "../../components/common/BusinessHeader";
import { toast } from "react-hot-toast";

export default function MenuSetting() {
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState({
    designerEmail: "",
    name: "",
    desc: "",
    price: "",
    estimatedTime: "",
    common: "no", // 기본값 no로 설정
  });
  const [designers, setDesigners] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        console.log("디자이너 목록 불러오기 시작");
        const response = await axiosInstance.get("/shop/designers");
        console.log("디자이너 목록 불러오기 성공:", response.data);
        setDesigners(response.data);
      } catch (err) {
        console.error(
          "디자이너 목록 불러오기 실패:",
          err.response?.data || err.message
        );
        setError("디자이너 목록을 불러오는데 실패했습니다.");
      }
    };

    fetchDesigners();
  }, []);

  // 이미지 미리보기 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMenuData({ ...menuData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 디자이너 선택 처리
  const handleDesignerSelect = (designerEmail) => {
    setMenuData((prev) => ({
      ...prev,
      designerEmail: designerEmail,
    }));
  };

  // 메뉴 저장 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 필드 검증
    if (!menuData.name || !menuData.desc || !menuData.common) {
      toast.error("필수 항목을 모두 입력해주세요.", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    // 디자이너 선택 검증 (공통 메뉴가 아닌 경우)
    if (menuData.common === "no" && !menuData.designerEmail) {
      toast.error("담당 디자이너를 선택해주세요.", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    try {
      console.log("\n=== 메뉴 등록 시작 ===");
      console.log("메뉴 데이터:", menuData);

      const formData = new FormData();
      // 공통 메뉴가 아닌 경우에만 디자이너 이메일 전송
      if (menuData.common === "no") {
        formData.append("designerEmail", menuData.designerEmail);
      }
      formData.append("name", menuData.name);
      formData.append("desc", menuData.desc);
      formData.append("price", menuData.price);
      formData.append("estimatedTime", menuData.estimatedTime);
      formData.append("common", menuData.common);
      if (menuData.image) {
        formData.append("image", menuData.image);
      }

      // FormData 내용 확인
      console.log("\n=== 서버로 전송되는 데이터 ===");
      for (let [key, value] of formData.entries()) {
        if (key === "image") {
          console.log("이미지 파일 정보:");
          console.log("- 파일명:", value.name);
          console.log("- 파일크기:", value.size, "bytes");
          console.log("- 파일타입:", value.type);
        } else {
          console.log(`${key}:`, value);
        }
      }

      const response = await axiosInstance.post("/shop/menu", formData, {
        withCredentials: true,
      });

      console.log("\n=== 메뉴 등록 성공 ===");
      console.log("서버 응답:", response.data);

      toast.success("메뉴가 성공적으로 등록되었습니다.", {
        position: "bottom-right",
        autoClose: 2000,
      });

      navigate("/shop");
    } catch (err) {
      console.error("\n=== 메뉴 등록 실패 ===");
      console.error("에러 메시지:", err.message);
      console.error("에러 상세:", err.response?.data);
      console.error("에러 상태 코드:", err.response?.status);

      toast.error(
        "메뉴 등록에 실패했습니다: " +
          (err.response?.data?.message || err.message),
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">메뉴 설정</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 메뉴 이름 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              메뉴 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={menuData.name}
              onChange={(e) =>
                setMenuData({ ...menuData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          {/* 메뉴 이미지 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              메뉴 이미지
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative">
                {previewImage ? (
                  <>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setMenuData({ ...menuData, image: null });
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-gray-400" />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500">
                이미지를 업로드하려면 클릭하세요
              </p>
            </div>
          </div>

          {/* 가격 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              가격
            </label>
            <div className="relative">
              <input
                type="number"
                value={menuData.price}
                onChange={(e) =>
                  setMenuData({ ...menuData, price: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="absolute right-4 top-2 text-gray-500">원</span>
            </div>
          </div>

          {/* 예상 소요시간 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              예상 소요시간
            </label>
            <div className="relative">
              <input
                type="text"
                value={menuData.estimatedTime}
                onChange={(e) =>
                  setMenuData({ ...menuData, estimatedTime: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="absolute right-4 top-2 text-gray-500">분</span>
            </div>
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={menuData.desc}
              onChange={(e) =>
                setMenuData({ ...menuData, desc: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-32"
              placeholder="메뉴에 대한 설명을 입력하세요"
              required
            />
          </div>

          {/* 공통 메뉴 여부 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              공통 메뉴 여부 <span className="text-red-500">*</span>
            </label>
            <select
              value={menuData.common}
              onChange={(e) =>
                setMenuData({ ...menuData, common: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="no">아니오</option>
              <option value="yes">예</option>
            </select>
          </div>

          {/* 담당 디자이너 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              담당 디자이너
            </label>
            {designers.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {designers.map((designer) => (
                  <div
                    key={designer.id}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      menuData.designerEmail === designer.email
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleDesignerSelect(designer.email)}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={menuData.designerEmail === designer.email}
                        onChange={() => {}}
                        className="h-4 w-4 text-green-500"
                      />
                      <span>{designer.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                현재 샵에 등록된 디자이너가 없습니다.
              </div>
            )}
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* 저장 버튼 */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/business")}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
