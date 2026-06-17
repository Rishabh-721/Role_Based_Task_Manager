import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import "./components/logo.css";
import Home from "./components/Home";
import ChangePassword from "./components/home/form/ChangePassword";
import Login from "./components/home/form/Login";
import Signup from "./components/home/form/Signup";
import ForgotPassword from "./components/home/form/ForgotPassword";
import VerifyMail from "./components/home/form/VerifyEMail";
import Verified from "./components/home/form/Verified";
import Main from "./components/Main";
import Dashboard from "./components/main/canvas/Dashboard";
import Employee from "./components/main/canvas/Employee";
import Tasks from "./components/main/canvas/Task";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-email" element={<VerifyMail />} />
        <Route path="change-password/:token" element={<ChangePassword />} />
        <Route path="verified/:token" element={<Verified />} />
    </Route>
    <Route element={<ProtectedRoute/>}>
    <Route path="/main" element={<Main />}>
      <Route index element={<Dashboard />}></Route>
      <Route path="users" element={<Employee/>}></Route>
      <Route path="tasks" element={<Tasks/>}></Route>
    </Route>
    </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
