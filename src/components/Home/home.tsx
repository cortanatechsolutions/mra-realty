import React from "react";
import { useHandleNavClick } from "../../hooks/useHandleNavClick";

interface JumbotronProps {
  data: {
    title: string;
    description: string;
    button: { text: string; href: string };
  };
}

const Home: React.FC<JumbotronProps> = ({ data }) => {
  const featuredLink = "#featured";
  const handleNavClick = useHandleNavClick();

  return (
    <section id="Home" className="overflow-hidden py-10 sm:py-8">
      <img
        alt=""
        src={`/images/web-banner.jpg`}
        className="absolute inset-0 -z-10 h-full w-full object-cover sm:object-center"
      />
      <div className="pb-16 pr-20 sm:max-w-6xl sm:pb-24 lg:pb-52 xl:pb-96">
        <div className="pl-16 sm:pl-24 lg:pl-36 sm:pr-8 sm:pt-28">
            <div className="text-left">
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-8xl">
                {data.title}
              </h1>
              <p className="sm:max-w-2xl mt-6 font-regular text-sm sm:text-lg lg:text-lg leading-8 text-white">
                {data.description}
              </p>
              <div className="mt-10 flex items-center justify-left gap-x-6">
                <button
                  onClick={() => handleNavClick(featuredLink)}
                  className="btn btn-primary btn-lg"
                >
                  {data.button.text}
                </button>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
