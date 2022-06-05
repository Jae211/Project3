import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style/Global.css';
import './style/Notice.css';
import'./App.css';
import Message from './pages/Message/MessagePage';
import Notice from './pages/Notice/NoticePage';
import NoticeRead from './pages/Notice/NoticeRead';
import NoticeWrite from './pages/Notice/NoticeWrite';
import NoticeSearch from './pages/Notice/NoticeSearch';
import BUY from './pages/Search/BuyMain';
import BUYSEARCH from './pages/Search/BuySearch';
import BUYDETAIL from './pages/Detail/BuyDetail';
import SELL from './pages/Search/SellMain';
import SELLSEARCH from './pages/Search/SellSearch';
import SELLDETAIL from './pages/Detail/SellDetail';
import MAIN from './pages/Main/Main';
import Login from './pages/Login/Login';
import FindId from './pages/FindId/FindId';
import FindPw from './pages/FindPw/FindPw';
import Register from './pages/Register/Register';
import ChangeMyInfo from './pages/ChangeMyInfo/ChangeMyInfo'
import ReportWrite from './pages/ReportWrite/ReportWrite'
import ReportBoard from './pages/Report/ReportBoard';
import ReportDetail from './pages/Report/ReportDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<MAIN/>}/>
        <Route path="/buy" element={<BUY/>}/>
        <Route path="/buy/search/*" element={<BUYSEARCH/>}/>
        <Route path="/buy/detail/*" element={<BUYDETAIL/>}/>
        <Route path='/sell' element={<SELL/>}/>
        <Route path='/sell/search/*' element={<SELLSEARCH/>}/>
        <Route path="/sell/detail/*" element={<SELLDETAIL/>}/>
        <Route path="/notice" element={<Notice/>}/>
        <Route path="/notice/read/*" element={<NoticeRead/>}/>
        <Route path="/notice/write" element={<NoticeWrite/>}/>
        <Route path="/notice/search/*" element={<NoticeSearch/>}/>
        <Route path="/msgbox" element={<Message/>}/>
        <Route path="/findid" element={<FindId/>}/>
        <Route path="/findpw" element={<FindPw/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/changemyinfo" element={<ChangeMyInfo/>}/>
        <Route path="/report" element={<ReportBoard/>}/>
        <Route path="/report/write" element={<ReportWrite/>}/>
        <Route path="/report/detail" element={<ReportDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;