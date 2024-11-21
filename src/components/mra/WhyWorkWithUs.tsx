import React from "react";

const WhyWorkWithUs: React.FC = () => {
  return (
    <section className="bg-white py-36">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mx-auto max-w-6xl lg:mx-0">
          <h2 className="text-2xl font-semibold text-gray-800">
            Why work with us?
          </h2>
          <p className="text-gray-600 mt-2">Here are three reasons why</p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
          {/* Wide range of properties */}
          <div className="flex flex-col items-center">
            <div className="text-5xl text-gray-800">
              <img src={`/images/building.svg`} />
            </div>
            <h3 className="text-xl font-regular text-gray-800 mt-4">
              Wide range of properties
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Condos, house and lots, apartments, and even lots for your
              business - we have those.
            </p>
          </div>

          {/* Buy or rent homes */}
          <div className="flex flex-col items-center">
            <div className="text-5xl text-yellow-500">
              <img src={`/images/icon-core-house.svg`} />
            </div>
            <h3 className="text-xl font-regular text-gray-800 mt-4">
              Buy or rent homes
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              We sell your home at the best market price and very quickly as
              well.
            </p>
          </div>

          {/* Trusted by many */}
          <div className="flex flex-col items-center">
            <div className="text-5xl text-yellow-500">
              <img src={`/images/security.svg`} />
            </div>
            <h3 className="text-xl font-regular text-gray-800 mt-4">
              Trusted by many
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              We offer you free consultancy on how to get a loan for your new
              home.
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-action */}
      <div className="mt-12">
        <div className="bg-brand-active text-white mx-auto max-w-md md:max-w-2xl xl:max-w-7xl rounded-2xl py-8 px-6 flex flex-col">
          <div className="flex items-center justify-between px-6 md:px-12">
            {/* Left Text */}
            <div className="text-left">
              <h2 className="text-2xl">Fill up our form, or consult with us</h2>
              <p className="text-sm mt-2">
                There's no harm in asking. So, ask away!
              </p>
            </div>

            {/* Right Button */}
            <div className="mt-6 md:mt-0">
              <button className="btn btn-primary btn-lg">
                Inquire with us, don't be shy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
