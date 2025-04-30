import { Heart, Mail, Phone, BriefcaseBusiness, User } from "lucide-react";

export default function RightSection({ name, age, gender, email, tel }) {
  return (
    <>
      <h2 className="text-lg font-bold pb-4 border-b-2 ">관련 정보</h2>
      <ul className="mt-4 space-y-8 text-s">
        <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
          <User className="text-green-600 w-6 h-6" />
          <p className="flex-1 mt-1 md:mt-0">{name}</p>
        </li>

        <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
          <BriefcaseBusiness className="text-green-600 w-6 h-6" />
          <p className="flex-1 mt-1 md:mt-0">
            {age}세 / {gender === "MALE" ? "남성" : "여성"}
          </p>
        </li>

        <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
          <Mail className="text-green-600 w-6 h-6" />
          <p className="flex-1 mt-1 md:mt-0">{email}</p>
        </li>

        <li className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
          <Phone className="text-green-600 w-6 h-6" />
          <p className="flex-1 mt-1 md:mt-0">{tel}</p>
        </li>
      </ul>
    </>
  );
}
