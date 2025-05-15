import BusinessHeader from "../../components/common/BusinessHeader";
import WriteNotice from "../../components/businessabout/notices/writenotice";

export default function RegisterNotice() {
    return (
        <div className="min-h-screen bg-white">
            <BusinessHeader />
            <div className="">
                <WriteNotice />
            </div>
        </ div>
    );
}

