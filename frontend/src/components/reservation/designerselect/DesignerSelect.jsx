import { Heart, Star, Check, MessageCircleMore } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import {useState} from "react";

import designerEX from "../../../assets/hairshop/designerEX.jpg";
import d1 from "../../../assets/designer/d1.png";

import DesignerHeader from "./DesignerHeader.jsx"
import SelectButton from "../../button/SelectButton.jsx"


export default function DesignerSelect({handleDesignerSelect}) {
    const navigate = useNavigate();
    const [likedDesigners, setLikedDesigners] = useState([]);

    // 좋아요 로직
    const handleLikeClick = (designerId) => {
        if (likedDesigners.includes(designerId)) {
            setLikedDesigners(likedDesigners.filter(id => id !== designerId));
        } else {
            setLikedDesigners([...likedDesigners, designerId]);
        }
    }
    
    // 임시 디자이너 리스트
    const designers = [
        {
            id: 1,
            name: '디자이너 해나',
            experience: '7년',
            description: '앞머리 컬러링 및 건강하게 센스있게',
            likes: '3.9K',
            rating: 5.0,
            reviews: 521,
            image: designerEX
        },
        {
            id: 2,
            name: '디자이너 유용운',
            experience: '9년',
            description: '세련된 감각과 아름다움을 선물해드립니다.',
            likes: '1.4K',
            rating: 4.5,
            reviews: 466,
            image: d1
        }
    ];

    const handleReviewClick = () => {
        navigate("/reviews");
    };

    return (
        <>
            <div className="flex items-center justify-between px-4 py-2">
                <DesignerHeader/>
            </div>

            <div className="lg:flex-row mx-10 lg:mx-20 my-10 lg:my-0 gap-6">
                <div className="flex flex-col items-center p-8 w-full">
                    <h1 className="font-semibold text-xl mb-6 w-full text-left text-gray-400">디자이너 선택</h1>
                    <div className="w-full border-t border-gray-300 mb-4"></div>

                    {designers.map((designer) => (
                        <div key={designer.id} className="flex p-6 mb-6 w-full border-b border-gray-300">
                            <div className="flex flex-1 ml-20">
                                <img src={designer.image} alt={designer.name} className="w-28 h-28 rounded-full mr-6"/>
                                <div className="flex flex-col flex-1">
                                    <p className="font-semibold text-lg pb-4">{designer.name} ({designer.experience})</p>
                                    <p className="text-sm text-gray-600">{designer.description}</p>
                                    <div className="flex flex-row items-center gap-1 mt-2">
                                        {Array.from({length: Math.floor(designer.rating)}).map((_, idx) => (
                                            <Star key={idx} className="text-yellow-400 w-5 h-5"/>
                                        ))}
                                        <span className="text-black px-2 text-lg">{designer.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex flex-col items-center mx-4"
                                             onClick={() => handleLikeClick(designer.id)}>
                                            <Heart
                                                className={`w-6 h-6 ${likedDesigners.includes(designer.id) ? 'text-red-500 fill-current' : 'text-red-500'}`}/>
                                            <p className="mt-2">{designer.likes}</p>
                                        </div>
                                        <div className="flex flex-col items-center" onClick={handleReviewClick}>
                                            <MessageCircleMore/>
                                            <p className="mt-2">{designer.reviews}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <SelectButton/>
                        </div>
                    ))}

                    <div className="w-full mt-4"></div>
                </div>
            </div>
        </>
    );
}
