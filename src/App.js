import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BUY from './page/search/BuyMain';
import BUYSEARCH from './page/search/BuySearch';
import SELL from './page/search/SellMain';
import SELLSEARCH from './page/search/SellSearch';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/buy' element={<BUY/>}/>
        <Route path='/buy/search' element={<BUYSEARCH/>}/>
        <Route path='/sell' element={<SELL/>}/>
        <Route path='/sell/search' element={<SELLSEARCH/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;