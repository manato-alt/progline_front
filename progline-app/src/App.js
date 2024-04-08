import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Top from "./component/Top/Top";
import Terms from "./component/Terms/Terms";
import TermDetail from "./component/TermDetail/TermDetail";
import axios from "axios";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/termsDetail" element={<TermDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
