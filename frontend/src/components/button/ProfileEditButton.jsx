import { Link } from "react-router-dom";

const ProfileEditButton = () => {
  return (
    <Link to="/userprofileedit">
      <button
        className="px-6 py-2 
      text-teal-500 rounded-lg hover:text-teal-600 transition-colors bg-teal-100 hover:bg-teal-200"
      >
        프로필 편집
      </button>
    </Link>
  );
};

export default ProfileEditButton;
