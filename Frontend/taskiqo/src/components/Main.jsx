import React from 'react';
import Header from './main/header';
import Sidebar from './main/sidebar';
import Canvas from './main/canvas';


const Main = () => {
  return (
    <>
      <Header/>
      <div style={{display: 'flex', justifyContent: 'flex-start', height: 'calc(100vh - 120px)'}}>
      <Sidebar/>
      <Canvas/>
      </div>
    </>
  )
}

export default Main
