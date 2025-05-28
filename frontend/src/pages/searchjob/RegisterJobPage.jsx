import BusinessHeader from "../../components/common/BusinessHeader";
import RegisterJob from "../../components/businessabout/registerjob/RegisterJob";

export default function RegisterJobPage() {
    return (
        <div>
            <BusinessHeader />
            <div className="p-10 flex flex-col justify-center w-full mx-auto max-w-6xl">
                <RegisterJob />
            </div>
        </div>
    );
}