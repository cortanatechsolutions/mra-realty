import { useEffect, useState } from "react";
import { useHandleNavClick } from "../../hooks/useHandleNavClick";
import Navbar from "../core/navbar";
import IAppData from "../interfaces/IAppData";
import dataJson from "../../data/data.json";
import Loading from "../core/loading";
import { useSiteSettings } from "../../utils/SiteSettingsContext";

const Home: React.FC = () => {
  const { settings, getSetting } = useSiteSettings();
  const featuredLink = "#featured";
  const handleNavClick = useHandleNavClick();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IAppData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the imported JSON data directly
        const result = dataJson;

        // Simulate a 2-second loading delay
        setTimeout(() => {
          setData(result);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />; // Show loading animation while data is loading
  }

  if (!data) {
    return <div>Error loading data</div>; // Show error if data is not available
  }

  return (
    <section id="Home" className="relative overflow-hidden min-h-screen">
      <Navbar data={data?.navbar} />
      <div className="py-10 sm:py-8">
        <img
          alt="Web Banner"
          src={`/images/web-banner.svg`}
          className="absolute inset-0 -z-10 h-full w-full object-cover sm:object-center"
        />
        <div className="pb-16 pr-20 sm:max-w-6xl sm:pb-24 lg:pb-52 xl:pb-96">
          <div className="pl-16 sm:pl-24 lg:pl-36 sm:pr-8 sm:pt-28">
            <div className="text-left">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
                {getSetting("HeroHeaderText")}
              </h1>
              <p className="sm:max-w-2xl mt-6 font-regular text-sm sm:text-lg lg:text-lg leading-8 text-white">
              {getSetting("HeroHeaderDescription")}
              </p>
              <div className="mt-10 flex items-center justify-left gap-x-6">
                <button
                  onClick={() => handleNavClick(featuredLink)}
                  className="btn btn-primary btn-lg"
                >
                  {data?.jumbotron.button.text}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
