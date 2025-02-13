import Logo from "../../../components/Logo/Logo.jsx"
import InputGroup from "../../../components/Input/InputGroup.jsx";
import BackButton from "../../../components/button/SignUpButton/BackButton.jsx";
import NextButton from "../../../components/button/SignUpButton/NextButton.jsx";

export default function DesignerSignUpPage({ onBackClick }) {
    return (
        <div className={"w-1/2 h-full flex flex-col items-center justify-center bg-white"}>
            <Logo/>
            <InputGroup/>
            <BackButton onBackClick={onBackClick}/>
            <NextButton/>
        </div>
    );
};