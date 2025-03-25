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
import DesignerSelectPage from "./pages/reservation/DesignerSelectPage.jsx";
import CalendarSelectPage from "./pages/reservation/CalendarSelectPage.jsx";
import MenuSelectPage from "./pages/reservation/MenuSelectPage.jsx";
import ReviewsPage from "./pages/reviews/ReviewsPage.jsx";
import PhotoReview from "./pages/reviews/PhotoReview.jsx";
import ReservationCheckPage from "./pages/reservation/reservationcheck/ReservationCheckPage.jsx";
import DesignerMainPage from "./pages/main/DesignerMainPage.jsx";
import CurriculumVitaePage from "./pages/cv/CurriculumVitaePage.jsx";
import SalesPage from "./pages/salesstatus/SalesPage.jsx";
import SignIntegrational from "./pages/loginandregister/LoginAndRegisterPage.jsx";
import { useEffect, useState } from "react";

function App() {
  // localStorage에서 userType을 가져와서 userRole로 변환
  const [userRole, setUserRole] = useState(() => {
    const userType = localStorage.getItem("userType");
    // userType을 userRole로 변환 (SHOP -> business, USER -> customer, DESIGNER -> designer)
    switch (userType) {
      case "SHOP":
        return "SHOP";
      case "USER":
        return "USER";
      case "DESIGNER":
        return "designer";
      default:
        return "USER"; // 기본값
    }
  });

  // userType이 변경될 때마다 userRole 업데이트
  useEffect(() => {
    const handleStorageChange = () => {
      const userType = localStorage.getItem("userType");
      switch (userType) {
        case "SHOP":
          setUserRole("SHOP");
          break;
        case "USER":
          setUserRole("USER");
          break;
        case "DESIGNER":
          setUserRole("DESIGNER");
          break;
        default:
          setUserRole("USER");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
            <Route path="/signintergrational" element={<SignIntegrational />} />

            {/* 고객 전용 */}
            {userRole === "USER" && (
              <>
                <Route path="/" element={<MainPage />} />
                <Route path="/hairshop" element={<HairShopPage />} />
                <Route path="/detail" element={<HairShopDetailPage />} />
                <Route path="/designerpage" element={<DesignerPage />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/userprofileedit" element={<UserProfileEdit />} />
                <Route
                  path="/designerselect"
                  element={<DesignerSelectPage />}
                />
                <Route
                  path="/calendarselect"
                  element={<CalendarSelectPage />}
                />
                <Route path="/menuselect" element={<MenuSelectPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/reviews/photo" element={<PhotoReview />} />
                <Route
                  path="/reservationcheck"
                  element={<ReservationCheckPage />}
                />
                <Route
                  path="/subscriptdesigner"
                  element={<SubscriptDesignerPage />}
                />
              </>
            )}

            {/* 사장님 전용 */}
            {userRole === "SHOP" && (
              <>
                <Route path="/" element={<HairShopPage />} />
                <Route path="/hairshop" element={<HairShopPage />} />
                <Route path="/detail" element={<HairShopDetailPage />} />
                <Route path="/sales" element={<SalesPage />} />
              </>
            )}

            {/* 디자이너 전용 */}
            {userRole === "designer" && (
              <>
                <Route path="/" element={<DesignerMainPage />} />
                <Route path="/cv" element={<CurriculumVitaePage />} />
                <Route path="/sales" element={<SalesPage />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
