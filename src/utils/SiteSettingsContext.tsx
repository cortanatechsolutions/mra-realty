import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchGoogleSheetData } from "./fetchGoogleSheetData";
import ISiteSettings from "../components/interfaces/ISiteSettings";

const GOOGLE_SHEET_CSV_URL = import.meta.env.VITE_REACT_APP_SITESETTINGS_GOOGLE_SHEET_CSV_URL;

type SiteSettingsContextType = {
  settings: ISiteSettings[];
  getSetting: (key: string) => string | undefined;
};


// Create the context
const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ISiteSettings[]>([]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchGoogleSheetData<ISiteSettings>(GOOGLE_SHEET_CSV_URL);
        setSettings(data);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };

    loadSettings();
  }, []);

  const getSetting = (key: string): string | undefined =>
    settings.find((setting) => setting.Setting === key)?.Value;

  return (
    <SiteSettingsContext.Provider value={{ settings, getSetting }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

// Custom hook for using the context
export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return context;
};
