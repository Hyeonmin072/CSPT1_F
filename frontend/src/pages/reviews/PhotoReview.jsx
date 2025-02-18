import Header from "../../components/common/Header.jsx";
import PhotoReviews from "../../components/reviews/photoreviews/PhotoReviews.jsx";

export default function photoReview(){
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div className="p-7">
                <PhotoReviews/>
            </div>
        </div>
    );
}