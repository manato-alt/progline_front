import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Top from "./component/Top/Top";
import Terms from "./component/Terms/Terms";
import TermDetail from "./component/TermDetail/TermDetail";
import ShareTerms from "./component/Share/ShareTerms";
import ShareDetail from "./component/Share/ShareDetail";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import CategoryProtectedRoute from "./component/ProtectedRoute/CategoryProtectedRoute";
import ShareTermProtectedRoute from "./component/ProtectedRoute/ShareTermProtectedRoute";
import ShareProtectedRoute from "./component/ProtectedRoute/ShareProtectedRoute";
import PageNotFound from "./component/PageNotFound";

function App() {
  return (
    <Router>
      <Header />
      <div className="pt-10">
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/terms" element={<ProtectedRoute element={Terms} />} />
          <Route
            path="/termsDetail/:categoryId"
            element={<CategoryProtectedRoute element={TermDetail} />}
          />
          <Route
            path="/shareTerms/:shareCode"
            element={<ShareTermProtectedRoute element={ShareTerms} />}
          />
          <Route
            path="/shareDetail/:shareCode/:categoryId"
            element={<ShareProtectedRoute element={ShareDetail} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
