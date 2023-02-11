import React from 'react';
import ToolBar from '../components/ToolBar';
import Sidebar from '../components/Sidebar';

let firstRender = true;
const Home = () => {
  return (
    <div>
        <ToolBar />
        <Sidebar />
    </div>
  )
}

export default Home;