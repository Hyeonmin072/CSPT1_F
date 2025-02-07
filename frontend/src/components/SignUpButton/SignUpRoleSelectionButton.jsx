import SignUpGuestButton from "./SignUpGuestButton.jsx";
import SignUpBossButton from "./SignUpBossButton.jsx";
import SignUpDesignerButton from "./SignUpDesignerButton.jsx";

export default function SignUpRoleSelectionButton () {
    return (
        <div className="mt-6 space-y-6 flex flex-col items-center">
            <SignUpGuestButton/>
            <SignUpDesignerButton/>
            <SignUpBossButton/>
        </div>
    );
}