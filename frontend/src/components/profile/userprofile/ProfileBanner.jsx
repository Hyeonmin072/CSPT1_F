const ProfileBanner = ({ bannerImage }) => {
  return (
    <div className="w-full h-48 bg-teal-100 rounded-lg overflow-hidden">
      <img
        src={bannerImage}
        alt="Banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProfileBanner;
