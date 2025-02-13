import Logo from "../../../components/loginandregisterlogo/Logo.jsx";
import InputGroup from "../../../components/Input/InputGroup.jsx";
import BackButton from "../../../components/button/SignUpPageButton/BackButton.jsx";
import NextButton from "../../../components/button/SignUpPageButton/NextButton.jsx";

export default function GuestSignUpPage({ onBackClick }) {
  return (
    <div
      className={
        "w-1/2 h-full flex flex-col items-center justify-center bg-white"
      }
    >
      <Logo />
      <InputGroup />
      <BackButton onBackClick={onBackClick} />
      <NextButton />
    </div>
  );
}
