import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Plus, Trash2 } from "lucide-react";
import axiosInstance from "../../components/sign/axios/AxiosInstance";
import BusinessHeader from "../../components/common/BusinessHeader";
import { toast } from "react-hot-toast";

export default function MenuSetting() {
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState({
    designerEmails: [],
    name: "",
    desc: "",
    price: "",
    estimatedTime: "",
    category: "NONE",
  });
  const [designers, setDesigners] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");

  // 카테고리 매핑 객체
  const categoryMap = {
    NONE: "선택 안함",
    CUT: "컷",
    PERM: "펌",
    DYEING: "염색",
    CLINIC: "클리닉",
    STYLING: "스타일링",
  };

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
    setMenuData((prev) => {
      const currentEmails = [...prev.designerEmails];
      const index = currentEmails.indexOf(designerEmail);

      if (index === -1) {
        // 선택되지 않은 경우 추가
        currentEmails.push(designerEmail);
      } else {
        // 이미 선택된 경우 제거
        currentEmails.splice(index, 1);
      }

      return {
        ...prev,
        designerEmails: currentEmails,
      };
    });
  };

  // 메뉴 저장 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 필드 검증
    if (
      !menuData.name ||
      !menuData.desc ||
      !menuData.category ||
      !menuData.price
    ) {
      toast.error("필수 항목을 모두 입력해주세요.", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    // 디자이너 선택 검증
    if (menuData.designerEmails.length === 0) {
      toast.error("최소 한 명의 담당 디자이너를 선택해주세요.", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    try {
      console.log("\n=== 메뉴 등록 시작 ===");
      console.log("메뉴 데이터:", menuData);

      // 요청 DTO 객체 생성
      const requestDto = {
        designerEmails: menuData.designerEmails,
        name: menuData.name,
        desc: menuData.desc,
        category: menuData.category,
        price: parseInt(menuData.price),
        image: menuData.image ? menuData.image.name : "",
      };

      console.log("요청 DTO:", requestDto);

      const formData = new FormData();

      // JSON 데이터를 직접 추가
      formData.append(
        "request",
        new Blob([JSON.stringify(requestDto)], {
          type: "application/json",
        })
      );

      // 이미지 파일 추가
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
        } else if (key === "request") {
          const reader = new FileReader();
          reader.onload = () => {
            console.log("request 내용:", reader.result);
          };
          reader.readAsText(value);
        }
      }

      const response = await axiosInstance.post("/menus", formData, {
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
          {/* 메뉴 이미지 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              메뉴 이미지
            </label>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative">
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
                  <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      이미지를 업로드하려면 클릭하세요
                    </p>
                  </label>
                )}
              </div>
            </div>
          </div>

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

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <select
              value={menuData.category}
              onChange={(e) =>
                setMenuData({ ...menuData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              {Object.entries(categoryMap).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
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

          {/* 담당 디자이너 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              담당 디자이너 <span className="text-red-500">*</span>
            </label>
            {designers.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {designers.map((designer) => (
                  <div
                    key={designer.id}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      menuData.designerEmails.includes(designer.email)
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleDesignerSelect(designer.email)}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={menuData.designerEmails.includes(
                          designer.email
                        )}
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
