import hairLogo from "../../assets/logo/hairlogo.png";

const DesignerCard = ({ designer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 p-4 min-w-max">
          {/* 이미지정보 */}
          {designer.portfolioImages.map((image, index) => (
            <div
              key={index}
              className="w-[172px] h-48 flex-shrink-0 rounded-lg overflow-hidden"
            >
              <img
                src="/api/placeholder/224/224"
                alt={`Portfolio ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 디자이너 정보 */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-start gap-4">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden flex-shrink-0">
            <img
              src="/api/placeholder/64/64"
              alt={designer.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-bold mb-2">{designer.name}</h2>
            <p className="text-gray-600 text-sm mb-4">{designer.description}</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                예약하기
              </button>
              <button className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                문의하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DesignerPage() {
  const designers = [
    {
      name: "머시기 디자이너",
      description:
        "안녕하세용 경력 20년차 남성 전문 헤어 디자이너 홍길동입니다. 관련 문의가 있으시면 많은 연락 부탁드립니다. 가격은 샵 예약 후 별도 예약 부탁드리며, 별점 2개 이하로 리뷰를 남기면 찾아가겠습니다.",
      portfolioImages: Array(4).fill(""), // 실제 이미지 URL들이 들어갈 자리
    },
    // 추가 디자이너 데이터+
    {
      name: "머시기 디자이너",
      description:
        "안녕하세용 경력 20년차 남성 전문 헤어 디자이너 홍길동입니다. 관련 문의가 있으시면 많은 연락 부탁드립니다. 가격은 샵 예약 후 별도 예약 부탁드리며, 별점 2개 이하로 리뷰를 남기면 찾아가겠습니다.",
      portfolioImages: Array(4).fill(""), // 실제 이미지 URL들이 들어갈 자리
    },
    {
      name: "머시기 디자이너",
      description:
        "안녕하세용 경력 20년차 남성 전문 헤어 디자이너 홍길동입니다. 관련 문의가 있으시면 많은 연락 부탁드립니다. 가격은 샵 예약 후 별도 예약 부탁드리며, 별점 2개 이하로 리뷰를 남기면 찾아가겠습니다.",
      portfolioImages: Array(4).fill(""), // 실제 이미지 URL들이 들어갈 자리
    },
    {
      name: "머시기 디자이너",
      description:
        "안녕하세용 경력 20년차 남성 전문 헤어 디자이너 홍길동입니다. 관련 문의가 있으시면 많은 연락 부탁드립니다. 가격은 샵 예약 후 별도 예약 부탁드리며, 별점 2개 이하로 리뷰를 남기면 찾아가겠습니다.",
      portfolioImages: Array(4).fill(""), // 실제 이미지 URL들이 들어갈 자리
    },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-[900px] mx-auto mt-10">
        {designers.map((designer, index) => (
          <DesignerCard key={index} designer={designer} />
        ))}
      </div>

      <div className="fixed top-1/2 right-[100px] transform -translate-y-1/2 bg-white rounded-lg shadow-md p-4 h-[300px] w-[200px]">
        <div className="flex flex-col items-center space-y-2">
          <span>
            <img
              src={hairLogo}
              alt="헤어리즘 로고"
              className="w-full h-full object-contain" // object-cover 대신 object-contain을 사용하여 이미지 비율 유지
            />
          </span>
          <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-gray-600 transition-colors">
            나의 디자이너 추천받기
          </button>
        </div>
      </div>
    </div>
  );
}
