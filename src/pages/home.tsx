/* eslint-disable @typescript-eslint/no-unused-vars */
import Home from "../components/Home/home";
import FacebookFeed from "../components/Home/FacebookFeed";
import FeaturedSection from "../components/mra/FeaturedSection";
import WhyWorkWithUs from "../components/mra/WhyWorkWithUs";
import TestimonialSection from "../components/mra/TestimonialSection";
import AboutYourAgent from "../components/mra/AboutYourAgentSection";
import StayUpToDate from "../components/mra/StayUpToDateSection";
import ScrollToTopButton from "../utils/ScrollToTopButton";
import { SiteSettingsProvider } from "../utils/SiteSettingsContext";

const HomePage: React.FC = () => {
  return (
    <>
      <Home />
      <FeaturedSection />
      <WhyWorkWithUs />
      <FacebookFeed />
      <TestimonialSection />
      <AboutYourAgent />
      <StayUpToDate/>
      <ScrollToTopButton />
    </>
  );
};

export default HomePage;
