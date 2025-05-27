import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//npm install react-toastify

// 공통 컴포넌트
import Footer from "./components/common/Footer";

import ChattingPage from "./pages/chatting/ChattingPage.jsx";

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
import SocialSignup from "./components/sign/social/SocialSignup";
import DesignerMatchPage from "./pages/designer/DesignerMatchPage";
import ReservationConfirmPage from "./pages/reservation/ReservationConfirmPage.jsx";
import ReservationLastCheckPage from "./pages/reservation/ReservationLastCheckPage.jsx";
import DesignerInfoPage from "./pages/designer/DesignerInfoPage.jsx";

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
import EventCouponMenuPage from "./pages/evnet-coupon-menu/EventCouponMenuPage.jsx";
import DesignerManagePage from "./pages/designermanage/DesignerManagePage.jsx";
import ShopProfile from "./pages/profile/ShopProfile.jsx";
import MenuSetting from "./pages/business/MenuSetting.jsx";
import NoticesPage from "./pages/notices/NoticesPage.jsx";
import RegisterNotice from "./pages/notices/RegisterNotice.jsx";
import DetailNotice from "./pages/notices/DetailNotice.jsx";
import EditNotice from "./pages/notices/EditNotice.jsx";
import ShopReservations from "./pages/reservation/ShopReservations.jsx";


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
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* 기본 라우트 */}
          <Route
            path="/"
            element={<MainPage onLoginClick={openLoginModal} />}
          />
          <Route path="/map" element={<MapPage />} />

          {/* 공통 라우트 */}
          <Route path="/social/signup" element={<SocialSignup />} />
          <Route
            path="/chat"
            element={<ChattingPage onLoginClick={openLoginModal} />}
          />
          <Route
            path="/hairshop"
            element={<HairShopPage onLoginClick={openLoginModal} />}
          />
          <Route
            path="/shopdetails/:shopEmail"
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
                path="/designerinfo/:designerEmail"
                element={<DesignerInfoPage />}
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
                path="/designerselect/:shopEmail"
                element={<DesignerSelectPage />}
              />
              <Route
                path="/calendarselect/:designerEmail"
                element={<CalendarSelectPage />}
              />
              <Route
                path="/menuselect/:designerEmail"
                element={<MenuSelectPage />}
              />
              <Route
                path="/reservationcheck"
                element={<ReservationCheckPage />}
              />
              <Route
                path="/subscriptdesigner"
                element={
                  <SubscriptDesignerPage onLoginClick={openLoginModal} />
                }
              />
              <Route path="/designer/match" element={<DesignerMatchPage />} />
              <Route
                path="/reservationlastcheck"
                element={<ReservationLastCheckPage />}
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
              {/* 메인 페이지 */}
              <Route
                path="/shop"
                element={<BusinessMainPage onLoginClick={openLoginModal} />}
              />              
              {/* 사업자 매출 페이지 */}
              <Route
                path="/sales"
                element={<BusinessSalesPage onLoginClick={openLoginModal} />}
              />

              {/* 사업자 매출 상세 페이지 */}
              <Route
                path="/sales/calendar/:designerEmail"
                element={<SalesCalendar onLoginClick={openLoginModal} />}
              />
              {/* 사업자 블랙리스트 페이지 */}
              <Route
                path="/blacklist"
                element={<BlackListPage onLoginClick={openLoginModal} />}
              />
              {/* 사업자 이벤트-쿠폰 등록 페이지 */}
              <Route
                path="/eventmenu"
                element={<EventCouponMenuPage onLoginClick={openLoginModal} />}
              />
              {/* 사업자 디자이너 관리 페이지 */}
              <Route
                path="/designermanage"
                element={<DesignerManagePage onLoginClick={openLoginModal} />}
              />
              {/* 사업자 프로필 페이지 */}
              <Route
                path="/shop/profile"
                element={<ShopProfile onLoginClick={openLoginModal} />}
              />
              {/* 사업자 메뉴 설정 페이지 */}
              <Route
                path="/menu-setting"
                element={<MenuSetting onLoginClick={openLoginModal} />}
              />
              {/* 사업자 공지사항 작성/등록 페이지 */}
              <Route
                path="/notices"
                element={<NoticesPage onLoginClick={openLoginModal} />}
              />
              <Route
                path="/notices/register"
                element={<RegisterNotice onLoginClick={openLoginModal} />}  
              />
              {/* 사업자 공지사항 상세 페이지 */}
              <Route
                path="/notices/detail/:noticeId"
                element={<DetailNotice onLoginClick={openLoginModal} />}  
              />
              {/* 사업자 공지사항 수정 페이지 */}
              <Route
                path="/notices/edit/:noticeId"
                element={<EditNotice onLoginClick={openLoginModal} />}
              />
              {/* 사업자 예약 목록 페이지 */}
              <Route
                  path="/reservations"
                  element={<ShopReservations onLoginClick={openLoginModal} />}
              />
            </>
          )}
          <Route
            path="/reservation/confirm"
            element={<ReservationConfirmPage />}
          />
          <Route
            path="/user/payment/success"
            element={<ReservationLastCheckPage />}
          />
          <Route
            path="/user/payment/fail"
            element={<ReservationLastCheckPage />}
          />
        </Routes>
        {/* 로그인 모달 */}
        <SignIntergration isOpen={isLoginModalOpen} onClose={closeLoginModal} />
        {/* ✅ 토스트 컨테이너 (알림창) */}
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover={false}
          draggable
          theme="light"
        />
        {/* Footer 컴포넌트 */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
