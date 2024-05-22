import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Top from "./component/Top/Top";
import Terms from "./component/Terms/Terms";
import TermDetail from "./component/TermDetail/TermDetail";
import ShareTerms from "./component/Share/ShareTerms";
import ShareDetail from "./component/Share/ShareDetail";
import ProtectedRoute from "./component/ProtectedRoute";
import CategoryProtectedRoute from "./component/CategoryProtectedRoute";
import ShareProtectedRoute from "./component/ShareProtectedRoute";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/terms" element={<ProtectedRoute element={Terms} />} />
        <Route
          path="/termsDetail/:categoryId"
          element={<CategoryProtectedRoute element={TermDetail} />}
        />
        <Route path="/shareTerms/:shareCode" element={<ShareTerms />} />
        <Route
          path="/shareDetail/:shareCode/:categoryId"
          element={<ShareProtectedRoute element={ShareDetail} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
