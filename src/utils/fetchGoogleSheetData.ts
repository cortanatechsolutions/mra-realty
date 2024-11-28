import Papa from "papaparse";

export const fetchGoogleSheetData = async <T>(url: string): Promise<T[]> => {
  try {
    const response = await fetch(url);
    const csvText = await response.text();

    return new Promise<T[]>((resolve, reject) => {
      Papa.parse<T>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => resolve(result.data),
        error: (error: any) => reject(error),
      });
    });
  } catch (error) {
    console.error("Error fetching Google Sheet data:", error);
    throw error;
  }
};
