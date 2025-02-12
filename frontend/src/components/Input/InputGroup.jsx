import UserName from "./UserName.jsx"
import PhoneNumber from "./PhoneNumber.jsx"
import PassWord from "./PassWord.jsx"
import PassWordCheck from "./PassWordCheck.jsx"
import Email from "./Email.jsx"
import Birth from "./Birth.jsx"

export default function InputGroup() {
    return (
        <div>
            <UserName/>
            <PassWord/>
            <PassWordCheck/>
            <Email/>
            <PhoneNumber/>
            <Birth/>
        </div>
    )
}