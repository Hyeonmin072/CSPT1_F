import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 고객
import MainPage from "./pages/main/MainPage.jsx";
import HairShopPage from "./pages/hairshop/HairShopPage.jsx";
import DesignerPage from "./pages/designer/DesignerPage.jsx";
import SignIntergration from "./components/sign/SignIntergration.jsx";
import HairShopDetailPage from "./pages/hairshop/HairShopDetailPage.jsx";
import UserProfile from "./pages/profile/UserProfile.jsx";
import UserProfileEdit from "./pages/profile/UserProfileEdit.jsx";
import SubscriptDesignerPage from "./pages/designer/SubscriptDesignerPage.jsx";
import DesignerSelectPage from "./pages/reservation/DesignerSelectPage.jsx";
import CalendarSelectPage from "./pages/reservation/CalendarSelectPage.jsx";
import MenuSelectPage from "./pages/reservation/MenuSelectPage.jsx";
import ReviewsPage from "./pages/reviews/ReviewsPage.jsx";
import PhotoReview from "./pages/reviews/PhotoReview.jsx";
import ReservationCheckPage from "./pages/reservation/reservationcheck/ReservationCheckPage.jsx";
import MapPage from "./pages/location-setting/MapPage.jsx";

// 디자이너
import DesignerMainPage from "./pages/main/DesignerMainPage.jsx";
import CurriculumVitaePage from "./pages/cv/CurriculumVitaePage.jsx";
import SalesPage from "./pages/salesstatus/SalesPage.jsx";
import ClientCheckPage from "./pages/clientcheck/ClientCheckPage.jsx";
import GetJobPage from "./pages/getjob/GetJobPage.jsx";
import GetJobDetailPage from "./pages/getjob/GetJobDetailPage.jsx";
import CVCheck from "./pages/cv/CVCheckPage.jsx";
import DesignerProfilePage from "./pages/profile/DesignerProfilePage.jsx";
import DesignerProfileEditPage from "./pages/profile/DesignerProfileEditPage.jsx";
import WeekNotice from "./components/DesingerAbout/main/notice/WeekNotice.jsx";

// 사업자
import BusinessMainPage from "./pages/main/BusinessMainPage.jsx";
import BusinessSalesPage from "./pages/salesstatus/BusinessSalesPage.jsx";
import SalesCalendar from "./components/businessabout/sales/SalesCalendar.jsx";
import BlackListPage from "./pages/blacklist/BlackListPage.jsx";
import ShopReservationCheckPage from "./pages/reservation/ShopReservationCheckPage.jsx";
import EventCouponMenuPage from "./pages/evnet-coupon-menu/EventCouponMenuPage.jsx";

function App() {
  const [userRole, setUserRole] = useState("shop");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType) {
      // userType을 userRole로 변환
      switch (userType) {
        case "SHOP":
          setUserRole("shop");
          break;
        case "USER":
          setUserRole("user");
          break;
        case "DESIGNER":
          setUserRole("designer");
          break;
        default:
          setUserRole("user");
      }
    }

    // 로그인 상태 변경 이벤트 리스너 추가
    const handleLoginStatusChange = () => {
      const updatedUserType = localStorage.getItem("userType");
      if (updatedUserType) {
        switch (updatedUserType) {
          case "SHOP":
            setUserRole("shop");
            break;
          case "USER":
            setUserRole("user");
            break;
          case "DESIGNER":
            setUserRole("designer");
            break;
          default:
            setUserRole("user");
        }
      } else {
        setUserRole("user");
      }
    };

    window.addEventListener("loginStatusChanged", handleLoginStatusChange);

    // 클린업 함수
    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
    };
  }, []);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* 기본 라우트 */}
          <Route
            path="/"
            element={<MainPage onLoginClick={openLoginModal} />}
          />
          <Route 
                path="/map" 
                element={<MapPage />}
          />

          {/* 공통 라우트 */}
          <Route
            path="/hairshop"
            element={<HairShopPage onLoginClick={openLoginModal} />}
          />
          <Route
            path="/detail"
            element={<HairShopDetailPage onLoginClick={openLoginModal} />}
          />
          <Route
            path="/reviews"
            element={<ReviewsPage onLoginClick={openLoginModal} />}
          />
          <Route
            path="/reviews/photo"
            element={<PhotoReview onLoginClick={openLoginModal} />}
          />

          {/* 고객 전용 라우트 */}
          {userRole === "user" && (
            <>
              
              <Route
                path="/designerpage"
                element={<DesignerPage onLoginClick={openLoginModal} />}
              />
              <Route
                path="/userprofile"
                element={<UserProfile onLoginClick={openLoginModal} />}
              />
              <Route
                path="/userprofileedit"
                element={<UserProfileEdit onLoginClick={openLoginModal} />}
              />
              <Route
                path="/designerselect"
                element={<DesignerSelectPage onLoginClick={openLoginModal} />}
              />
              <Route
                path="/calendarselect"
                element={<CalendarSelectPage onLoginClick={openLoginModal} />}
              />
              <Route
                path="/menuselect"
                element={<MenuSelectPage onLoginClick={openLoginModal} />}
              />
              <Route
                path="/reservationcheck"
                element={<ReservationCheckPage onLoginClick={openLoginModal} />}
              />
              <Route
                path="/subscriptdesigner"
                element={
                  <SubscriptDesignerPage onLoginClick={openLoginModal} />
                }
              />
            </>
          )}

          {/* 디자이너 전용 라우트 */}
          {userRole === "designer" && (
            <>
              {/* 메인 페이지 */}
              <Route
                path="/designer"
                element={<DesignerMainPage onLoginClick={openLoginModal} />}
              />
              <Route
                path="/notice"
                element={<WeekNotice onLoginClick={openLoginModal} />}
              />

              {/* 고객 확인 페이지 */}
              <Route
                path="/client"
                element={<ClientCheckPage onLoginClick={openLoginModal} />}
              />

              {/* 구인구직 페이지 */}
              <Route
                path="/job"
                element={<GetJobPage onLoginClick={openLoginModal} />}
              />
              <Route
                path="/job/detail"
                element={<GetJobDetailPage onLoginClick={openLoginModal} />}
              />
              <Route
                path="/job/detail/cv"
                element={<CVCheck onLoginClick={openLoginModal} />}
              />
              {/* 이력서 페이지 */}
              <Route
                path="/cv"
                element={<CurriculumVitaePage onLoginClick={openLoginModal} />}
              />
              {/* 매출확인 페이지 */}
              <Route
                path="/sales"
                element={<SalesPage onLoginClick={openLoginModal} />}
              />

              {/* 프로필 페이지 */}
              <Route
                path="/profile"
                element={<DesignerProfilePage onLoginClick={openLoginModal} />}
              />
              <Route
                path="/profileedit"
                element={
                  <DesignerProfileEditPage onLoginClick={openLoginModal} />
                }
              />
            </>
          )}

          {/* 사업자 전용 */}
          {userRole === "shop" && (
            <>
              <Route
                path="/shop"
                element={<BusinessMainPage onLoginClick={openLoginModal} />}
              />
              <Route
                path="/sales"
                element={<BusinessSalesPage onLoginClick={openLoginModal} />}
              />
              <Route
                path="/sales/calendar"
                element={<SalesCalendar onLoginClick={openLoginModal} />}
              /> 
              <Route
                  path="/blacklist"
                  element={<BlackListPage onLoginClick={openLoginModal} />}
                />
              <Route
                  path="/schedulecheck"
                  element={<ShopReservationCheckPage onLoginClick={openLoginModal} />}
              />
              <Route
                  path="/eventmenu"
                  element={<EventCouponMenuPage onLoginClick={openLoginModal} />}
              />
            </>
          )}
        </Routes>
        {/* 로그인 모달 */}
        <SignIntergration isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      </div>
    </Router>
  );
}

export default App;
