//eslint-disable-next-line
const Step1UserType = ({ userType, setUserType, nextStep }) => {
  const handleNext = () => {
    if (!userType) {
      Swal.fire({
        icon: "warning",
        title: "사용자 유형 선택 필요",
        text: "사용자 유형을 선택해주세요.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    }
    nextStep();
  };

  return (
    <>
      <h3 className="text-center text-sm font-medium mb-4 mt-24">
        어떤 유형의 사용자인가요?
      </h3>
      <div className="flex justify-center space-x-3 mb-5">
        <button
          type="button"
          onClick={() => setUserType("owner")}
          className={`px-4 py-2 text-sm rounded-lg border transition-all ${
            userType === "owner"
              ? "bg-green-500 text-white border-green-500 shadow-md transform scale-105"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          사장
        </button>
        <button
          type="button"
          onClick={() => setUserType("customer")}
          className={`px-4 py-2 text-sm rounded-lg border transition-all ${
            userType === "customer"
              ? "bg-green-500 text-white border-green-500 shadow-md transform scale-105"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          고객
        </button>
        <button
          type="button"
          onClick={() => setUserType("designer")}
          className={`px-4 py-2 text-sm rounded-lg border transition-all ${
            userType === "designer"
              ? "bg-green-500 text-white border-green-500 shadow-md transform scale-105"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          디자이너
        </button>
      </div>

      <div className="flex justify-center mt-11">
        <button
          type="button"
          onClick={handleNext}
          disabled={!userType}
          className={`px-6 py-2 rounded-md text-white font-medium ${
            userType
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          } transition-colors text-sm`}
        >
          다음 &rarr;
        </button>
      </div>
    </>
  );
};

export default Step1UserType;
