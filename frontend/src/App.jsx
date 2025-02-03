import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import MainPage from "./pages/main/MainPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* 헤더 */}
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MainPage />} />
            {/* 추가 라우트는 여기에 설정 */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
