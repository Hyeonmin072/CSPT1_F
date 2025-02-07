import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import MainPage from "./pages/main/MainPage";
<<<<<<< HEAD
import DesignerPage from "./pages/main/DesignerPage";
import CouponMainModal from "./pages/coupon/CouponMainModal.jsx"
=======
import DesignerPage from "./pages/designer/DesignerPage";
import UserProfile from "./pages/profile/UserProfile";
>>>>>>> frontend-userprofile

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
<<<<<<< HEAD
            <Route path="/coupon" element={<CouponMainModal />} />
=======
            <Route path="/userprofile" element={<UserProfile />} />
>>>>>>> frontend-userprofile
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
