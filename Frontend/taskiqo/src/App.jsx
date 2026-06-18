import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "./App.css";

import AuthPage from './component/03-Auth/00-AuthPage/AuthPage';
import Logo from './component/01-logo/logo';
import Login from '../../../wrong Frontend/srcode/components/home/form/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<AuthPage />}>
      <Route index element={<Login/>}></Route>
      {/* <Route path='' element={}></Route> */}
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
