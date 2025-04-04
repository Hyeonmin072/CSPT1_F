import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

import designerEX from "../../assets/hairshop/designerEX.jpg";

export default function DesignerInfo() {
    const [designerList] = useState([
        {id: 1, name: "DESMOND JOEL", rating:"⭐ 4.8 평점", introduction:"안녕하세요. DESMOND JOEL입니다.", professions:"컷트, 염색 전문", career: "OO스튜디오", years: "2015 ~ 2019"},
        {id: 2, name: "LUEMA SHALON", rating:"⭐ 4.0 평점", introduction:"안녕하세요. LUEMA SHALON입니다.", professions:"스타일링 전문", career: "OO헤어", years: "2019 ~ 2022"},
        {id: 3, name: "MISS CHARLLEN", rating:"⭐ 4.5 평점", introduction:"안녕하세요. MISS CHARLLEN입니다.", professions:"컷트 전문", career: "OO헤어스튜디오", years: "2022 ~ 2023"},
    ]);

    // slick 설정
    const settings = {
        dots: true, // 아래 점 네비게이션 표시
        infinite: true, // 무한 반복
        slidesToShow: 1, // 한 번에 보이는 슬라이드 개수
        slidesToScroll: 1, // 한 번에 넘어가는 슬라이드 개수
    };

    return (
        <div className="mt-4 w-full">
            <Slider {...settings}>
                {designerList.map((designer) => (
                    <div key={designer.id} className="w-[200px]">
                        <div className="bg-gray-900 text-white p-6 rounded-lg">
                            <img
                                src={designerEX}
                                alt="디자이너"
                                className="w-full h-60 object-cover rounded-lg"
                            />
                            <div className="mt-2 mb-2">
                                <h3 className="text-lg font-bold mt-2">{designer.name}</h3>
                            </div>
                            <div className="mt-1 mb-1">
                                <p className="text-gray-400">{designer.rating}</p>
                            </div>
                            <p className="text-gray-400">{designer.professions}</p>
                            <div className="mt-6 mb-4">
                                <h2>경력</h2>
                                <p className="text-gray-400">{designer.career} ({designer.years})</p>
                            </div>
                            <div className="mt-4 mb-4">
                                <p>소개글</p>
                                <p className="text-gray-400">{designer.introduction}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
