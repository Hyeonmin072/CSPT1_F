import BusinessHeader from "../../components/common/BusinessHeader";
import SearchJob from "../../components/businessabout/registerjob/SearchJob";

export default function SearchJobPage() {
    return (
        <div>
            <BusinessHeader />
            <div className="p-10 mt-20 flex flex-col justify-center w-full mx-auto max-w-6xl">
                <SearchJob />
            </div>
        </div>
    );
}