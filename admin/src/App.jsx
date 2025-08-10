// admin/src/App.jsx

import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StaticPlace from "./pages/static/StaticPlace";
import AddStaticPlace from "./pages/static/AddStaticPlace";
import EditStaticPage from "./pages/static/EditStaticPage";
import ClientPage from "./pages/client/ClientPage";

// --- CHANGE THIS LINE ---
// Import 'ReportPage' because that's what Report.jsx exports by default
import ReportPage from "./pages/report/Report"; 
// Also, import the CSS for the ReportPage here, so it's applied when the component mounts
import "./pages/report/report.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientPlace" element={<ClientPage />} />
        <Route path="/staticPlace" element={<StaticPlace />} />
        <Route
          path="/addStaticPlace"
          element={
            <AddStaticPlace
            // onAdd={(place) => {
            //   /* handle add */
            // }}
            />
          }
        />
        <Route path="/editStaticPlace/:id" element={<EditStaticPage />} />
        {/* This line is now correct, as ReportPage is imported with the right name */}
        <Route path="/report" element={<ReportPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;