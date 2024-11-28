// App.tsx

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/core/footer";
import HomePage from "./pages/home";
import PrivacyPolicyPage from "./components/Legal/PrivacyPolicyPage";
import TermsOfServicePage from "./components/Legal/TermsOfServicePage";
import ErrorPage404 from "./components/Error/ErrorPage404";
import ProtectedRoute from "./utils/ProtectedRoute";
import FacebookPageConnect from "./utils/FacebookPageConnect";
import { fetchGoogleSheetData } from "./utils/fetchGoogleSheetData";
import Loading from "./components/core/loading";
import ISiteSettings from "./components/interfaces/ISiteSettings";

const GOOGLE_SHEET_CSV_URL = import.meta.env.VITE_REACT_APP_SITESETTINGS_GOOGLE_SHEET_CSV_URL;

const App: React.FC = () => {
  const [siteSettings, setSiteSettings] = useState<ISiteSettings[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGoogleSheetData<ISiteSettings>(GOOGLE_SHEET_CSV_URL);
        setSiteSettings(data);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <Loading />; // Show loading animation while data is loading
  }

  if (!siteSettings) {
    return <div>Error loading data</div>; // Show error if data is not available
  }
  
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
