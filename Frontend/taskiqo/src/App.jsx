import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import "./components/logo.css";
import ChangePassword from "./components/home/form/ChangePassword"
import Login from "./components/home/form/Login"
import Signup from "./components/home/form/Signup"
import ForgotPassword from "./components/home/form/ForgotPassword"
import VerifyMail from "./components/home/form/VerifyEMail"
import verfied from "./components/home/form/Verified"


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
        <Route path="verified/:token" element={<verfied/>} />
    </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
