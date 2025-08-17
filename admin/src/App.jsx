// admin/src/App.jsx

import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StaticPlace from "./pages/static/StaticPlace";
import AddStaticPlace from "./pages/static/AddStaticPlace";
import EditStaticPage from "./pages/static/EditStaticPage";
import ClientPage from "./pages/client/ClientPage";
import { ToastContainer} from 'react-toastify';
import ReportPage from "./pages/report/Report"; 
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import Review from "./pages/review/Review.jsx";
import "./pages/report/report.css";


function App() {
  return (
<Router>
  <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
  <Routes>
    {/* Public route */}
    <Route path="/" element={<Login />} />

    {/* Protected routes */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/clientPlace"
      element={
        <ProtectedRoute>
          <ClientPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/staticPlace"
      element={
        <ProtectedRoute>
          <StaticPlace />
        </ProtectedRoute>
      }
    />
    <Route
      path="/addStaticPlace"
      element={
        <ProtectedRoute>
          <AddStaticPlace />
        </ProtectedRoute>
      }
    />
    <Route
      path="/editStaticPlace/:id"
      element={
        <ProtectedRoute>
          <EditStaticPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/report"
      element={
        <ProtectedRoute>
          <ReportPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/review"
      element={
        <ProtectedRoute>
          <Review />
        </ProtectedRoute>
      }
    />
  </Routes>
</Router>
  )
}

export default App;