import "./App.css";
import SidebarNavbar from "./Components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/UserPages/HomePage2";
import About from "./Pages/AdminPages/Approval";
import IncidentDetails from "./Pages/UserPages/incidentPage";
import Login from "./Pages/Login";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* All routes with Sidebar */}
          <Route element={<SidebarNavbar />}>
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/about" element={<About />} />
              {/* Add more protected routes here */}
            </Route>
            <Route element={<ProtectedRoute />}>
             <Route path="/incident/:id" element={<IncidentDetails />} />
              {/* Add more protected routes here */}
            </Route>
            {/* Public route with sidebar */}
            <Route path="/" element={<Home />} />
          </Route>
          {/* Public route without sidebar */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
