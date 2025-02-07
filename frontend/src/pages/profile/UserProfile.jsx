import d1 from "../../assets/designer/d1.png";
const UserProfile = () => {
  return (
    <div className="flex flex-col items-center w-full mt-12">
      {/* 배너 이미지 */}
      <div className="relative mb-16 w-[1200px]">
        <div className="w-full h-48 bg-teal-100 rounded-lg overflow-hidden">
          <img src={d1} alt="Banner" className="w-full h-full object-cover" />
        </div>

        {/* 프로필 이미지 */}
        <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
          <div className="w-24 h-24 bg-white rounded-full overflow-hidden border-4 border-white">
            <img
              src={d1}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Profile Information */}
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 text-center">홍길동</h1>

        <div className="grid grid-cols-2 gap-y-8 gap-x-16 mb-6">
          <div>
            <h2 className="text-gray-600 text-sm mb-2">이름</h2>
            <div className="bg-gray-100 rounded p-3 w-96">
              <p className="text-gray-800">홍길동</p>
            </div>
          </div>

          <div>
            <h2 className="text-gray-600 text-sm mb-2">연락처</h2>
            <div className="bg-gray-100 rounded p-3 w-96">
              <p className="text-gray-800">010-3579-1271</p>
            </div>
          </div>

          <div>
            <h2 className="text-gray-600 text-sm mb-2">이메일</h2>
            <div className="bg-gray-100 rounded p-3 w-96">
              <p className="text-gray-800">test@gmail.com</p>
            </div>
          </div>

          <div>
            <h2 className="text-gray-600 text-sm mb-2">내 멤버십 등급</h2>
            <div className="bg-gray-100 rounded p-3 w-96">
              <p className="text-gray-800">일반</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 text-teal-500 rounded-lg hover:text-teal-600 transition-colors bg-teal-50 hover:bg-teal-100">
            내 쿠폰함
          </button>
          <button className="px-6 py-2 text-teal-500 rounded-lg hover:text-teal-600 transition-colors bg-teal-100 hover:bg-teal-200">
            프로필 편집
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
