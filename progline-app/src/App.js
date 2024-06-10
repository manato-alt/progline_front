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
import Privacy from "./component/Footer/Privacy";
import Rule from "./component/Footer/Rule";
import Footer from "./component/Footer/Footer";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
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
            <Route path="/rule" element={<Rule />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;
