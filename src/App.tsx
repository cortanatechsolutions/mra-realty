// App.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/core/footer";
import HomePage from "./pages/home";
import PrivacyPolicyPage from "./components/Legal/PrivacyPolicyPage";
import TermsOfServicePage from "./components/Legal/TermsOfServicePage";
import ErrorPage404 from "./components/Error/ErrorPage404";
import ProtectedRoute from "./utils/ProtectedRoute";
import FacebookPageConnect from "./utils/FacebookPageConnect";

const App: React.FC = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
        <Route path="/termsOfService" element={<TermsOfServicePage />} />
        {/* Add other routes here */}

        <Route
          path="/facebook-connect"
          element={
            <ProtectedRoute>
              <FacebookPageConnect />
            </ProtectedRoute>
          }
        />
        {/* Catch all unmatched routes */}
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
