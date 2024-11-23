import Papa from "papaparse";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface FeaturedProperties {
  Id: string;
  PropertyLocation: string;
  PropertyImageLink: string;
  PropertyRedirectUrl: string;
}

const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQIBCbBBocsY7K-QE0CX2wt0l58CjDUelMfp_CdZf2qxQhTo9RuBLij8fRAtH0VftK5MQ9Xy1J9KrrZ/pub?gid=0&single=true&output=csv";

const FeaturedSection: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<FeaturedProperties[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        const csvText = await response.text();

        Papa.parse<FeaturedProperties>(csvText, {
          header: true,
          skipEmptyLines: true,
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

  return (
    <section id="featured" className="relative isolate overflow-hidden text-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white lg:text-gray-800">
            Our Featured Properties
          </h2>
          <p className="text-white lg:text-gray-600 mt-2">
            Check out the places below where you think your ideal home is here in the Philippines
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="relative group rounded-2xl overflow-hidden shadow-lg h-72">
                  <Skeleton className="w-full h-full" />
                </div>
              ))
            : featuredProperties.map((property) => (
                <a
                  key={property.Id}
                  href={property.PropertyRedirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-72"
                >
                  <img
                    src={property.PropertyImageLink}
                    alt={property.PropertyLocation}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-white text-lg font-bold">{property.PropertyLocation}</h3>
                  </div>
                </a>
              ))}
        </div>
        <a
          href="https://www.facebook.com/mrarealty"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark btn-variant mt-8 px-6 py-2"
        >
          More Properties
        </a>
      </div>
    </section>
  );
};

export default FeaturedSection;
