import Logo from "../Logo/Logo.jsx"
import InputGroup from "../Input/InputGroup.jsx";
import BackButton from "../button/SignUpButton/BackButton.jsx";

export default function GuestSignUpPage({ onBackClick }) {
    return (
        <div className={"w-1/2 h-full flex flex-col items-center justify-center bg-white"}>
            <Logo/>
            <InputGroup/>
            <BackButton onBackClick={onBackClick}/>
        </div>
    );
};