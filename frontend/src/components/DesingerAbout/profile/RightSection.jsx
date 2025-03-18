import { Heart, MessageSquareText, Mail, Phone, Cake, User, UserRound } from "lucide-react";

export default function RightSection(){
    return(
        <>
            <h2 className="text-lg font-bold pb-4 border-b-2">관련 정보</h2>
            <ul className="mt-4 space-y-8 text-s">
                <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                    <User className="text-[#00B3A6] w-6 h-6"/>
                    <p className="flex-1 mt-1 md:mt-0">남성</p>
                </li>
                <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                    <Cake className="text-[#00B3A6] w-6 h-6"/>
                    <p className="flex-1 mt-1 md:mt-0">47세</p>
                </li>
                <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                    <Mail className="text-[#00B3A6] w-6 h-6"/>
                    <p className="flex-1 mt-1 md:mt-0">designer@gmail.com</p>
                </li>
                <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                    <Phone className="text-[#00B3A6] w-6 h-6"/>
                    <p className="flex-1 mt-1 md:mt-0">010-9876-5432</p>
                </li>
            </ul>
        </>
    );
}