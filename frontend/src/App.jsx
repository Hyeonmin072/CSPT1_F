import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import MainPage from "./pages/main/MainPage";
import HairShopPage from "./pages/hairshop/HairShopPage"
import HairShopDetailPage from "./pages/hairshop/HairShopDetailPage.jsx"
import DesignerPage from "./pages/designer/DesignerPage";
import UserProfile from "./pages/profile/UserProfile";
import DesignerSelectPage from "./pages/reservation/DesignerSelectPage.jsx"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* 헤더 */}
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/hairshop" element={<HairShopPage />} />
            <Route path="/detail" element={<HairShopDetailPage />} />
            <Route path="/designerselect" element={<DesignerSelectPage />} />
            {/* 추가 라우트는 여기에 설정 */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
