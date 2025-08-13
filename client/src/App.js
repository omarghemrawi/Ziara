// src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Signup from "./pages/signup/Signup";
import Login  from "./pages/login/Login";
import AdditionalInfo from "./pages/AdditionalInfo";
import ProfilePage from "./pages/profile/ProfilePage";
 import Plan             from "./pages/plan/Plan"; 
 import ReviewsPage from "./pages/review/ReviewsPage";
 import ReportReview from "./pages/profile/report/ReportReview";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Home carousel on "/" */}
          <Route path="/" element={<Carousel />} />

          {/* Signup page on "/signup" */}
          <Route path="/signup" element={<Signup />} />

          {/* AdditionalInfo page on "/additional-info" */}
          <Route path="/additional-info" element={<AdditionalInfo />} />

           <Route path="/profile" element={<ProfilePage />} />

         {/* صفحة المراجعات لكل business */}
         {/* <Route path="/reviews/:placeId" element={<ReviewsPage />} /> */}
        <Route path="/reviews/:placeId" element={<ReviewsPage />} />
          {/* Signup page on "/login" */}
          <Route path="/login" element={<Login />} />
          
          {/* Plan page on "/plan" */}
          <Route path="/plan" element={<Plan />} />

          {/* Redirect any unknown path back to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/report-review" element={<ReportReview />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
