import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import HairShopPage from "./pages/hairshop/HairShopPage";
import HairShopDetailPage from "./pages/hairshop/HairShopDetailPage.jsx";
import DesignerPage from "./pages/designer/DesignerPage";
import UserProfile from "./pages/profile/UserProfile";
import DesignerSelectPage from "./pages/reservation/DesignerSelectPage.jsx";
import UserProfileEdit from "./pages/profile/UserProfileEdit";
import LoginAndRegisterPage from "./pages/loginandregister/LoginAndRegisterPage.jsx";
import SubscriptDesignerPage from "./pages/designer/SubscriptDesignerPage.jsx";
import { UserProvider } from "./components/context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/hairshop" element={<HairShopPage />} />
              <Route path="/detail" element={<HairShopDetailPage />} />
              <Route path="/designerpage" element={<DesignerPage />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/userprofileedit" element={<UserProfileEdit />} />
              <Route path="/designerselect" element={<DesignerSelectPage />} />
              <Route
                path="/loginandregister"
                element={<LoginAndRegisterPage />}
              />
              <Route
                path="/subscriptdesigner"
                element={<SubscriptDesignerPage />}
              />
              {/* 추가 라우트는 여기에 설정 */}
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
