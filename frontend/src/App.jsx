import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import MainPage from "./pages/main/MainPage";
import DesignerPage from "./pages/main/DesignerPage";
import CouponMainModal from "./pages/coupon/CouponMainModal.jsx"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* 헤더 */}
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/designerpage" element={<DesignerPage />} />
            <Route path="/coupon" element={<CouponMainModal />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
