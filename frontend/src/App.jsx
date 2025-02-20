import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import MainPage from "./pages/main/MainPage";
import HairShopPage from "./pages/hairshop/HairShopPage";
import HairShopDetailPage from "./pages/hairshop/HairShopDetailPage.jsx";
import DesignerPage from "./pages/designer/DesignerPage";
import UserProfile from "./pages/profile/UserProfile";
import UserProfileEdit from "./pages/profile/UserProfileEdit";
import LoginAndRegisterPage from "./pages/loginandregister/LoginAndRegisterPage.jsx";
import SubscriptDesignerPage from "./pages/designer/SubscriptDesignerPage.jsx";
import DesignerSelectPage from "./pages/reservation/DesignerSelectPage.jsx"
import CalendarSelectPage from "./pages/reservation/CalendarSelectPage.jsx"
import MenuSelectPage from "./pages/reservation/MenuSelectPage.jsx"
import ReviewsPage from "./pages/reviews/ReviewsPage.jsx";
import PhotoReview from "./pages/reviews/PhotoReview.jsx";
import ReservationCheckPage from "./pages/reservation/reservationcheck/ReservationCheckPage.jsx";
import DesignerMainPage from "./pages/main/DesignerMainPage.jsx";

function App() {
  // 임시 역할 설정(customer, designer, business)
  const userRole = 'customer';

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <Routes>
            {/* 공통 */}
            <Route
                path="/loginandregister"
                element={<LoginAndRegisterPage />}
            />

            {/* 고객 전용 */}
            {userRole === 'customer' && (
                <>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/hairshop" element={<HairShopPage />} />
                  <Route path="/detail" element={<HairShopDetailPage />} />
                  <Route path="/designerpage" element={<DesignerPage />} />
                  <Route path="/userprofile" element={<UserProfile />} />
                  <Route path="/userprofileedit" element={<UserProfileEdit />} />
                  <Route path="/designerselect" element={<DesignerSelectPage />} />
                  <Route path="/calendarselect" element={<CalendarSelectPage />} />
                  <Route path="/menuselect" element={<MenuSelectPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route path="/reviews/photo" element={<PhotoReview />} />
                  <Route path="/reservationcheck" element={<ReservationCheckPage />} />
                  <Route path="/subscriptdesigner" element={<SubscriptDesignerPage />} />
                </>
            )}

            {/* 디자이너 전용 */}
            {userRole === 'designer' && (
                <>
                  <Route path="/" element={<DesignerMainPage />} />
                </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
