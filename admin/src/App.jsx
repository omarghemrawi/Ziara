import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StaticPlace from "./pages/static/StaticPlace";
import AddStaticPlace from "./pages/static/AddStaticPlace";
import EditStaticPage from "./pages/static/EditStaticPage";
import ClientPage from "./pages/client/ClientPage";

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
      </Routes>
    </Router>
  );
}

export default App;
