import "./App.css";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Admin from "./components/admin/AdminLogin.js";
import AdminDashboard from "./components/admin/AdminDashboard.js";
import VerifyAccount from "./components/VerifyAccount";
import ForgotPassword from "./components/ForgotPassword";
import NewPassword from "./components/NewPassword";
import DeleteAccount from "./components/DeleteAccount";
import SpendAnalysis from "./components/SpendAnalysis.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/spend-analysis" element={<SpendAnalysis />} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
