import BusinessHeader from "../../components/common/BusinessHeader";
import EditJob from "../../components/businessabout/registerjob/EditJob";

export default function EditJobPage() {
    return (
        <div>
            <BusinessHeader />
            <div className="mt-20 flex flex-col justify-center w-full mx-auto max-w-6xl">
                <EditJob />
            </div>
        </div>
    );
}