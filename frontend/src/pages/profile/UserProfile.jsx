import d1 from "../../assets/designer/d1.png";
import ProfileBanner from "../../components/profile/userprofile/ProfileBanner";
import ProfileImage from "../../components/profile/userprofile/ProfileImage";
import ProfileBannerEdit from "../../components/profile/userprofile/ProfileBannerEdit";
import ProfileImageEdit from "../../components/profile/userprofile/ProfileImageEdit";
import ProfileInfo from "../../components/profile/userprofile/ProfileInfo";
import MyCouponButton from "../../components/button/MyCouponButton";
import ProfileEditButton from "../../components/button/ProfileEditButton";

//유저의 임시데이터
const UserProfile = () => {
  const userData = {
    name: "홍길동",
    phone: "010-3579-1271",
    email: "test@gmail.com",
    membership: "일반",
  };

  return (
    <div className="flex flex-col items-center w-full mt-12">
      <div className="relative mb-16 w-[1200px]">
        <ProfileBanner bannerImage={d1} />
        <ProfileImage profileImage={d1} />
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <ProfileInfo {...userData} />
        <div className="flex justify-center gap-4">
          <MyCouponButton />
          <ProfileEditButton />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
