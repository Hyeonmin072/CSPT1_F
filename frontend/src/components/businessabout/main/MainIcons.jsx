import { Newspaper , Star, Scissors, Gift, QrCode , UserRoundPen, Building2 , UserX, NotebookPen , LogOut } from 'lucide-react';
import { Link } from "react-router-dom"

export default function MainIcons(){
    return(
        <>
            {[
                {icon: <Newspaper />, label: '공지사항 등록'},
                {icon: <Scissors/>, label: '근태 관리'},
                {icon: <Gift/>, label: '이벤트 및 쿠폰 관리', path: "/eventmenu"},
                {icon: <Building2/>, label: '구인 구직'},
                {icon: <UserX/>, label: '블랙리스트 관리', path: "/blacklist"},
                {icon: <NotebookPen />, label: '메뉴 설정'},
            ].map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-200"
                >
                    {/* 라우터 기능 */}
                    {item.path ? (
                        <Link to={item.path} className="flex flex-col items-center">
                            <div className="text-green-600 mb-2 text-5xl">{item.icon}</div>
                            <p className="text-gray-700 font-medium">{item.label}</p>
                        </Link>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="text-green-600 mb-2 text-5xl">{item.icon}</div>
                            <p className="text-gray-700 font-medium">{item.label}</p>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}