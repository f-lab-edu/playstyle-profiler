// src/App.tsx
import { Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import QuizPage from "./pages/QuizPageComponent.tsx";
import ResultPage from "./pages/ResultPage.tsx";
import DashboardPage from "./pages/DashboardRecommendations.tsx";

function Header() {
  const location = useLocation();
  return (
    <header style={{ padding: "12px 16px", display: "flex", gap: 12, alignItems: "center", borderBottom: "1px solid #222" }}>
      <Link to="/" style={{ fontWeight: 700 }}>PlayStyle MBTI</Link>
      <nav style={{ display: "flex", gap: 8 }}>
        <Link to="/quiz" style={{ opacity: location.pathname.startsWith("/quiz") ? 1 : 0.7 }}>퀴즈</Link>
        <Link to="/result" style={{ opacity: location.pathname.startsWith("/result") ? 1 : 0.7 }}>결과</Link>
        <Link to="/dashboard" style={{ opacity: location.pathname.startsWith("/dashboard") ? 1 : 0.7 }}>대시보드</Link>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <div style={{ color: "#eaeaea", background: "#0b0e12", minHeight: "100dvh" }}>
      <Header />
      <main style={{ padding: 16, maxWidth: 960, margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/quiz" replace />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/quiz" replace />} />
        </Routes>
      </main>
    </div>
  );
}
