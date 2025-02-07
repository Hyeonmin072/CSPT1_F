//eslint-disable-next-line
const ProfileInfo = ({ name, phone, email, membership }) => {
  const infoItems = [
    { label: "이름", value: name },
    { label: "연락처", value: phone },
    { label: "이메일", value: email },
    { label: "내 멤버십 등급", value: membership },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-8 text-center">{name}</h1>
      <div className="grid grid-cols-2 gap-y-8 gap-x-16 mb-6">
        {infoItems.map((item) => (
          <div key={item.label}>
            <h2 className="text-gray-600 text-sm mb-2">{item.label}</h2>
            <div className="bg-gray-100 rounded p-3 w-96">
              <p className="text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileInfo;
