import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import MainPage from "./pages/main/MainPage";
import CouponMainModal from "./pages/coupon/CouponMainModal.jsx";
import UserProfile from "./pages/profile/UserProfile";
import DesignerPage from "./pages/designer/DesignerPage.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col scrollbar-hide">
        {/* 헤더 */}
        <Header className="overflow-y-scroll" />
        <main className="flex-1">
          {/* 라우트 설정 구간 */}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/designerpage" element={<DesignerPage />} />
            <Route path="/coupon" element={<CouponMainModal />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
