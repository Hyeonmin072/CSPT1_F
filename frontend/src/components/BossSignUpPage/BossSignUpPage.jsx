import Logo from "../Logo/Logo.jsx"
import InputGroup from "../Input/InputGroup.jsx";
import BackButton from "../button/SignUpButton/BackButton.jsx";
import NextButton from "../button/SignUpButton/NextButton.jsx";

export default function BossSignUpPage({ onBackClick }) {
    return (
        <div className={"w-1/2 h-full flex flex-col items-center justify-center bg-white"}>
            <Logo/>
            <InputGroup role="boss"/>
            <BackButton onBackClick={onBackClick}/>
            <NextButton/>
        </div>
    );
};