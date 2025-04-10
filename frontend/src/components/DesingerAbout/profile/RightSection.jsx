import { useState, useEffect } from "react";
import { Heart, Mail, Phone, BriefcaseBusiness, User } from "lucide-react";
import { selectedDesigner } from "../../dummydata/DummydbDesigner.jsx";

export default function RightSection() {
    const [designerinfo, setDesignerInfo] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 데이터 가져오기
    useEffect(() => {
        const fetchDesignerInfo = async () => {
            try {
                // 더미 데이터
                const data = selectedDesigner;
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

    if (!designerinfo) {
        return <div className="text-center mt-4">정보를 불러올 수 없습니다.</div>;
    }

    return (
        <>
            <h2 className="text-lg font-bold pb-4 border-b-2 ">관련 정보</h2>
            <ul className="mt-4 space-y-8 text-s">
                <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                    <User className="text-green-600 w-6 h-6" />
                    <p className="flex-1 mt-1 md:mt-0">{selectedDesigner.d_name}</p>
                </li>

                <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                    <BriefcaseBusiness className="text-green-600 w-6 h-6" />
                    <p className="flex-1 mt-1 md:mt-0">{selectedDesigner.d_birth_date}</p>
                </li>

                <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                    <Mail className="text-green-600 w-6 h-6" />
                    <p className="flex-1 mt-1 md:mt-0">{selectedDesigner.d_email}</p>
                </li>

                <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                    <Phone className="text-green-600 w-6 h-6" />
                    <p className="flex-1 mt-1 md:mt-0">{selectedDesigner.d_tel}</p>
                </li>
            </ul>
        </>
    );
}
