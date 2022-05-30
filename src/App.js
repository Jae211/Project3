import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import'./App.css';

import Login from "./page/Login/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;