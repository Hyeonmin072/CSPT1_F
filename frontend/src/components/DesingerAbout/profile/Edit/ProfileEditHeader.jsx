import React from "react";
import { UserRound } from "lucide-react";

export default function ProfileEditHeader({ setBannerImage, profileImage,setProfileImage, bannerImage }){
    const handleImageChange = (event, setImage) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event, setImage) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return(
        <>
            {/* 배경 이미지 */}
            <div
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, setBannerImage)}
            >
                <img
                    src={bannerImage}
                    alt="Designer Banner"
                    className="w-full h-64 object-cover rounded-lg"
                />
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="bannerImageInput"
                    onChange={(event) => handleImageChange(event, setBannerImage)}
                />
                <label htmlFor="bannerImageInput"
                       className="cursor-pointer absolute top-0 left-0 w-full h-full"></label>
            </div>

            {/* 프로필 이미지 */}
            <div
                className="absolute top-[200px] left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, setProfileImage)}
            >
                {/* 숨겨진 input */}
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profileImageInput"
                    onChange={(event) => handleImageChange(event, setProfileImage)}
                />
                {/* 클릭 가능한 레이블 */}
                <label htmlFor="profileImageInput" className="cursor-pointer">
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="Designer Profile"
                            className="w-28 h-28 rounded-full object-cover border-white"
                        />
                    ) : (
                        <div
                            className="w-28 h-28 bg-gray-300 rounded-full border-white flex flex-col items-center justify-end pb-2"
                        >
                            <UserRound className="w-20 h-20 text-gray-600"/>
                        </div>
                    )}
                </label>
            </div>
        </>
    );
}