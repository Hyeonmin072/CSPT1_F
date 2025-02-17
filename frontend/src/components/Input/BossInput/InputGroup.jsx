import UserName from "./UserName.jsx";
import PhoneNumber from "./PhoneNumber.jsx";
import PassWord from "./PassWord.jsx";
import PassWordCheck from "./PassWordCheck.jsx";
import Email from "./Email.jsx";
import Birth from "./Birth.jsx";
import BusinessNumber from "./BusinessNumber.jsx";

//eslint-disable-next-line
export default function InputGroup({ role }) {
  return (
    <div className={"w-full h-auto mt-9 space-y-4"}>
      <UserName />
      <PassWord />
      <PassWordCheck />
      <Email />
      <PhoneNumber />
      <Birth />
      {/* 사장(Boss)일 때만 BusinessNumber 보이게 */}
      {role === "boss" && <BusinessNumber />}
    </div>
  );
}
