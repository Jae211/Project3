//import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style/Global.css';
import MessagePage from './pages/Message/MessagePage';
import ManageProduct from './pages/Management/ManageProduct';
import ManageReport from './pages/Management/ManageReport';
import ManageUser from './pages/Management/ManageUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/msgbox" element={<MessagePage/>}/>
        <Route path='/manager/product' element={<ManageProduct/>}/>
        <Route path='/manager/report' element={<ManageReport/>}/>
        <Route path='/manager/user' element={<ManageUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
