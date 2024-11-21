import Papa from "papaparse";
import { useEffect, useState } from "react";

interface FeaturedProperties {
  Id: string;
  PropertyLocation: string;
  PropertyImageLink: string;
  PropertyRedirectUrl: string;
}

// Google Sheet CSV URL
const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQIBCbBBocsY7K-QE0CX2wt0l58CjDUelMfp_CdZf2qxQhTo9RuBLij8fRAtH0VftK5MQ9Xy1J9KrrZ/pub?output=csv";

const FeaturedSection: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<
    FeaturedProperties[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        const csvText = await response.text();

        // Parse CSV data
        Papa.parse<FeaturedProperties>(csvText, {
          header: true, // Automatically use the first row as headers
          skipEmptyLines: true, // Skip empty rows
          complete: (result) => {
            setFeaturedProperties(result.data);
            setLoading(false);
          },
          error: (error: any) => {
            console.error("Error parsing CSV:", error);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("Error fetching Google Sheet data:", error);
        setLoading(false);
      }
    };

    fetchGoogleSheetData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <section className="relative isolate overflow-hidden text-center">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mx-auto max-w-6xl lg:mx-0 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Our Featured Properties
          </h2>
          <p className="text-gray-600 mt-2">
            Check out the places below where you think your ideal home is here
            in the Philippines
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <a
              key={property.Id}
              href={property.PropertyRedirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-120"
            >
              <img
                src={property.PropertyImageLink}
                alt={property.PropertyLocation}
                className="w-full h-120 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white text-lg font-bold">
                  {property.PropertyLocation}
                </h3>
              </div>
            </a>
          ))}
        </div>
        <button className="btn btn-primary btn-lg mt-8 px-6 py-2">
          More Properties
        </button>
      </div>
    </section>
  );
};

export default FeaturedSection;
