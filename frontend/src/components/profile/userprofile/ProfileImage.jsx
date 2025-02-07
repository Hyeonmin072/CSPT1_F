const ProfileImage = ({ profileImage }) => {
  return (
    <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
      <div className="w-24 h-24 bg-white rounded-full overflow-hidden border-4 border-white">
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProfileImage;
