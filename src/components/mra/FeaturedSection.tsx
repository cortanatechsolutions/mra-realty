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

const GOOGLE_SHEET_CSV_URL = import.meta.env.VITE_REACT_APP_FEATURED_GOOGLE_SHEET_CSV_URL;

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
    <section id="featured" className="relative isolate overflow-hidden text-center px-16 sm:px-20 lg:px-20 mt-0 lg:mt-32 xl:mt-0">
      <div className="max-w-8xl">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Our Featured Properties
          </h2>
          <p className="text-gray-600 mt-2">
            Check out the places below where you think your ideal home is here in the Philippines
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center z-0">
  {loading
    ? Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="relative group rounded-2xl overflow-hidden shadow-lg h-72 w-full max-w-xs"
        >
          <Skeleton className="w-full h-full" />
        </div>
      ))
    : featuredProperties.map((property) => (
        <a
          key={property.Id}
          href={property.PropertyRedirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-72 w-full max-w-xs"
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
