import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Top from "./component/Top/Top";
import Terms from "./component/Terms/Terms";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;
