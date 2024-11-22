/* eslint-disable @typescript-eslint/no-unused-vars */
import Team from "../components/Home/ourteam"; 
import Home from "../components/Home/home";
import BlogList from "../components/Home/bloglist";
import IAppData from "../components/interfaces/IAppData";
import CallToAction from "../components/Home/CallToAction";
import FacebookFeed from "../components/Home/FacebookFeed";
import FeaturedSection from "../components/mra/FeaturedSection";
import WhyWorkWithUs from "../components/mra/WhyWorkWithUs";
import TestimonialSection from "../components/mra/TestimonialSection";
import AboutYourAgent from "../components/mra/AboutYourAgentSection";
import StayUpToDate from "../components/mra/StayUpToDateSection";
import ScrollToTopButton from "../utils/ScrollToTopButton";

const HomePage: React.FC<{ data: IAppData }> = ({ data }) => {
  return (
    <>
      <Home data={data.jumbotron} />
      {/* <ComponentDemo /> */}
      <FeaturedSection />
      <WhyWorkWithUs />
      <FacebookFeed />
      <TestimonialSection />
      <AboutYourAgent />
      <StayUpToDate/>
      <ScrollToTopButton />
      {/*<ContactUs /> */}
    </>
  );
};

export default HomePage;
