import InputGroup from "../../../components/Input/GusetInput/InputGroup.jsx";
import BackButton from "../../../components/button/SignUpPageButton/BackButton.jsx";
import NextButton from "../../../components/button/SignUpPageButton/NextButton.jsx";

export default function DesignerSignUpPage({ onBackClick }) {
  return (
    <div
      className={
        "w-1/2 h-full flex flex-col items-center justify-center bg-white"
      }
    >
      <InputGroup />
      <BackButton onBackClick={onBackClick} />
      <NextButton />
    </div>
  );
}
