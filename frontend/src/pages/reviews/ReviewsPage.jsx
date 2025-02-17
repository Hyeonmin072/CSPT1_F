import Header from "../../components/common/Header.jsx";
import Reviews from "../../components/reviews/Reviews.jsx";

export default function ReviewsPage(){
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div className="p-4">
                <Reviews/>
            </div>
        </div>
    );
}