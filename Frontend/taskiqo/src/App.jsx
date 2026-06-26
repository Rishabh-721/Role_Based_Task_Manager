import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "./App.css";
import Logo from './component/01-logo/logo';

import AuthPage from './component/03-Auth/00-AuthPage/AuthPage';

import Login from '../src/component/03-Auth/01-RightOutlet/Login';
import Signup from './component/03-Auth/01-RightOutlet/Signup';
import ForgotPwd from './component/03-Auth/01-RightOutlet/ForgotPwd';
import Verified from './component/03-Auth/01-RightOutlet/Verified';
import ChangePwd from './component/03-Auth/01-RightOutlet/changePwd';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<AuthPage />}>
      <Route index element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/forgot-password' element={<ForgotPwd/>}></Route>
      <Route path='/verified/:token' element={<Verified />}></Route>
      <Route path='/change-password/:token' element={<ChangePwd/>}></Route>
    </Route>    
    </Routes>
    </BrowserRouter>
  )
}

export default App
