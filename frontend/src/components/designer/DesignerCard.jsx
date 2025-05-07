import d1 from "../../assets/designer/d1.png";
import DesignerPortfolio from "./DesignerPortfolio";
import DesignerInfo from "./DesignerInfo";
import { fetchDesignerReviewImages } from "../../pages/designer/DesignerPageAxios.jsx";
import React, { useState, useEffect } from 'react';

/* eslint-disable */ //수정 시 eslint 해제
export const DesignerCard = ({ designer }) => {

  const [portfolioImages, setPortfolioImages] = useState([]);
  
  useEffect(() => {
    const fetchPortfolioImages = async () => {
      try {
        // 이메일을 이용해 포트폴리오 이미지 요청
        const response = await fetchDesignerReviewImages(designer.designerEmail);
        console.log("이미지 요청 response : ",response);
        const imageUrls = response.map((item) => item.reviewImage);
        setPortfolioImages(imageUrls);
      } catch (error) {
        console.error("Error fetching portfolio images", error);
      }
    };

    if(designer?.designerEmail){
      fetchPortfolioImages();
    }
  },[designer?.designerEmail]);


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-0">
      {/* 임포트한 디자이너 포트폴리오 컴포넌트 호출 */}
      <DesignerPortfolio images={portfolioImages} />
      {/* 임포트한 디자이너인포 컴포넌트 호출 */}
      {/* 디자이너 인포 컴포넌트에서 사용하는 정보가 3개이므로 3개의 props를 전달 */}
      <DesignerInfo
        name={designer.designerNickName}
        description={designer.designerDesc}
        profileImage={designer.designerImage || d1} 
      />
    </div>
  );
};
