import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "./App.css";
import Logo from './component/01-logo/logo';

import AuthPage from './component/03-Auth/00-AuthPage/AuthPage';

import Login from '../src/component/03-Auth/01-RightOutlet/Login';
import Signup from './component/03-Auth/01-RightOutlet/Signup';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<AuthPage />}>
      <Route index element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      {/* <Route path='' element={}></Route> */}
      {/* <Route path='' element={}></Route> */}
      {/* <Route path='' element={}></Route> */}
      {/* <Route path='' element={}></Route> */}
    </Route>    
    </Routes>
    </BrowserRouter>
  )
}

export default App
