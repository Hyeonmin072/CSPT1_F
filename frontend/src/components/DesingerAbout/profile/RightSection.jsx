import { useState, useEffect } from "react";
import { Heart, Mail, Phone, BriefcaseBusiness, User } from "lucide-react";

export default function RightSection() {
    const [designerInfo, setDesignerInfo] = useState(null); // 디자이너 정보 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 더미 데이터
    const dummyDesignerInfo = {
        gender: "남성",
        age: "47세",
        email: "designer@gmail.com",
        phone: "010-9876-5432",
    };

    // 데이터 가져오기
    useEffect(() => {
        const fetchDesignerInfo = async () => {
            try {
                // const response = await fetch("/");
                // const data = await response.json();

                // 더미 데이터
                const data = dummyDesignerInfo;
                setDesignerInfo(data); // 가져온 데이터 저장
            } catch (error) {
                console.error("Error fetching designer info:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchDesignerInfo();
    }, []);

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>;
    }

    if (!designerInfo) {
        return <div className="text-center mt-4">정보를 불러올 수 없습니다.</div>;
    }

    return (
        <>
            <h2 className="text-lg font-bold pb-4 border-b-2 ">관련 정보</h2>
            <ul className="mt-4 space-y-8 text-s">
                <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                    <User className="text-[#00B3A6] w-6 h-6" />
                    <p className="flex-1 mt-1 md:mt-0">{designerInfo.gender}</p>
                </li>
                <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                    <BriefcaseBusiness className="text-[#00B3A6] w-6 h-6" />
                    <p className="flex-1 mt-1 md:mt-0">{designerInfo.age}</p>
                </li>
                <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                    <Mail className="text-[#00B3A6] w-6 h-6" />
                    <p className="flex-1 mt-1 md:mt-0">{designerInfo.email}</p>
                </li>
                <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                    <Phone className="text-[#00B3A6] w-6 h-6" />
                    <p className="flex-1 mt-1 md:mt-0">{designerInfo.phone}</p>
                </li>
            </ul>
        </>
    );
}
