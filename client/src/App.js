// src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdditionalInfo from "./pages/AdditionalInfo";
import ProfilePage from "./pages/ProfilePage";
import Plan from "./pages/plan/Plan";
import ReviewsPage from "./pages/ReviewsPage";   // ← use the real page file
import ReportReview from "./pages/ReportReview"; // ← report page
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Carousel />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/additional-info" element={<AdditionalInfo />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reviews/:placeId" element={<ReviewsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/report-review" element={<ReportReview />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
