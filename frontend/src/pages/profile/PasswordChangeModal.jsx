import { useState } from "react";

// 비밀번호 검증용 함수
const validatePassword = (password) => {
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*#?&]/.test(password);
  const isValidLength = password.length >= 8 && password.length <= 20;

  const requirements = {
    hasLetter,
    hasNumber,
    hasSpecial,
    isValidLength,
  };

  return requirements;
};

const isPasswordValid = (requirements) => {
  return Object.values(requirements).every(Boolean);
};

const PasswordRequirement = ({ met, text }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-2 h-2 rounded-full ${met ? "bg-green-500" : "bg-gray-300"}`}
    />
    <span className={`text-sm ${met ? "text-green-500" : "text-gray-500"}`}>
      {text}
    </span>
  </div>
);

const PasswordChangeModal = ({ isOpen, onClose, onPasswordChange }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    hasLetter: false,
    hasNumber: false,
    hasSpecial: false,
    isValidLength: false,
  });

  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (key, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [key]: value,
    }));

    // 새 비밀번호 입력 시 실시간 유효성 검사
    if (key === "newPassword") {
      const requirements = validatePassword(value);
      setPasswordRequirements(requirements);
      setPasswordError("");

      // 비밀번호 확인과 일치 여부 체크
      if (
        passwordData.confirmPassword &&
        value !== passwordData.confirmPassword
      ) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      }
    }

    // 비밀번호 확인 실시간 체크
    if (key === "confirmPassword") {
      if (value !== passwordData.newPassword) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = () => {
    // 비밀번호 변경 시도 시 검증
    if (!passwordData.currentPassword) {
      alert("현재 비밀번호를 입력해주세요.");
      return;
    }

    if (!isPasswordValid(passwordRequirements)) {
      alert("새 비밀번호가 요구사항을 충족하지 않습니다.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (passwordData.newPassword === passwordData.currentPassword) {
      alert("새 비밀번호는 현재 비밀번호와 달라야 합니다.");
      return;
    }

    // 비밀번호 변경 처리
    onPasswordChange(passwordData);

    // 모달 닫기
    onClose();

    // 입력값 초기화
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordRequirements({
      hasLetter: false,
      hasNumber: false,
      hasSpecial: false,
      isValidLength: false,
    });
    setPasswordError("");
  };

  const handleCancel = () => {
    // 입력값 초기화
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordRequirements({
      hasLetter: false,
      hasNumber: false,
      hasSpecial: false,
      isValidLength: false,
    });
    setPasswordError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">비밀번호 변경</h2>

        <div className="space-y-4">
          {/* 현재 비밀번호 */}
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              현재 비밀번호
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                handlePasswordChange("currentPassword", e.target.value)
              }
              className="w-full p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="현재 비밀번호를 입력하세요"
            />
          </div>

          {/* 새 비밀번호 */}
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              새 비밀번호
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                handlePasswordChange("newPassword", e.target.value)
              }
              className="w-full p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="새 비밀번호를 입력하세요"
            />
            <div className="mt-2 space-y-1">
              <PasswordRequirement
                met={passwordRequirements.hasLetter}
                text="영문자 포함"
              />
              <PasswordRequirement
                met={passwordRequirements.hasNumber}
                text="숫자 포함"
              />
              <PasswordRequirement
                met={passwordRequirements.hasSpecial}
                text="특수문자 포함"
              />
              <PasswordRequirement
                met={passwordRequirements.isValidLength}
                text="8-20자 길이"
              />
            </div>
          </div>

          {/* 새 비밀번호 확인 */}
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              새 비밀번호 확인
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
              className="w-full p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="새 비밀번호를 다시 입력하세요"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-500 rounded-lg hover:text-gray-600 transition-colors bg-gray-100 hover:bg-gray-200"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white rounded-lg hover:bg-teal-600 transition-colors bg-teal-500"
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
