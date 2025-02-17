import UserName from "./UserName.jsx";
import PhoneNumber from "./PhoneNumber.jsx";
import PassWord from "./PassWord.jsx";
import PassWordCheck from "./PassWordCheck.jsx";
import Email from "./Email.jsx";
import Birth from "./Birth.jsx";
import Gender from "./Gender.jsx";

export default function InputGroup({ role }) {
  return (
    <div className={"w-full h-auto mt-9 space-y-4"}>
      <UserName />
      <PassWord />
      <PassWordCheck />
      <Email />
      <PhoneNumber />
      <Birth />
      <Gender />
    </div>
  );
}
