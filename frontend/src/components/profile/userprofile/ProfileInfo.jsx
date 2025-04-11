import React from "react";

//eslint-disable-next-line
const ProfileInfo = ({
  name,
  phone,
  email,
  membership,
  isEditing,
  onDataChange,
}) => {
  const infoItems = [
    { label: "이름", value: name, key: "name" },
    { label: "연락처", value: phone, key: "phone" },
    { label: "이메일", value: email, key: "email" },
    { label: "내 멤버십 등급", value: membership, key: "membership" },
  ];

  const handleChange = (key, value) => {
    onDataChange((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoItems.map((item) => (
          <div
            key={item.label}
            className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md"
          >
            <h2 className="text-sm font-medium text-gray-500 mb-2">
              {item.label}
            </h2>
            {isEditing ? (
              <input
                type="text"
                value={item.value}
                onChange={(e) => handleChange(item.key, e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                placeholder={`${item.label} 입력`}
              />
            ) : (
              <div className="flex items-center">
                <p className="text-gray-800 font-medium">{item.value}</p>
                {item.key === "membership" && (
                  <span className="ml-2 px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded-full">
                    {item.value}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfo;
