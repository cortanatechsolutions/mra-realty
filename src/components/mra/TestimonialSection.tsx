import { useState } from "react";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  message: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Janine Corazon",
    role: "Manager",
    image: "/images/Manager.jpg",
    message:
      "Working with Monic was an absolute delight! From our first conversation, she made us feel comfortable and excited about the home-buying process. Monic took the time to understand exactly what we were looking for and found options that fit our style, budget, and dreams. She was always available to answer our questions, no matter how big or small, and she guided us through every step with patience and expertise. Thanks to Monic, we found our perfect home in Lucena City, and we couldn't be happier. If you're looking for a real estate agent who genuinely cares and makes the process fun, Monic is the one!",
  },
  {
    name: "Janine Coronel",
    role: "Manager",
    image: "/images/Manager.jpg",
    message:
      "XXX Working with Monic was an absolute delight! From our first conversation, she made us feel comfortable and excited about the home-buying process. Monic took the time to understand exactly what we were looking for and found options that fit our style, budget, and dreams. She was always available to answer our questions, no matter how big or small, and she guided us through every step with patience and expertise. Thanks to Monic, we found our perfect home in Lucena City, and we couldn't be happier. If you're looking for a real estate agent who genuinely cares and makes the process fun, Monic is the one!",
  },
  // Add more testimonials here
];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="bg-brand-active text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header and Testimonials in the Same Row */}
        <div className="flex flex-col lg:flex-row">
          <h2
            id="header"
            className="text-2xl font-regular text-left mr-10 pt-0 lg:text-left lg:mb-0 lg:w-1/4"
          >
            What our clients are saying about us?
          </h2>
          <div id="testimonials" className="lg:w-2/3 overflow-hidden relative">
            {/* Testimonials container */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full px-4"
                >
                  <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-regular text-lg">{testimonial.name}</h3>
                      <p className="text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <img
                    alt=""
                    src={`/images/quote.svg`}
                    className="w-10 h-10 text-yellow-400"
                  />
                  </div>
                  <blockquote className="text-sm mt-4">{testimonial.message}</blockquote>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-4 pt-8 pb-18">
              <button
                onClick={handlePrev}
                className="btn btn-transparent text-white"
                disabled={currentIndex === 0} // Disable if at the first testimonial
              >
                &lt;
              </button>
              <button
                onClick={handleNext}
                className="btn btn-transparent text-white"
                disabled={currentIndex === testimonials.length - 1} // Disable if at the last testimonial
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Logos Section */}
        <div className="mt-12 text-center">
          <p className="text-regular">
            We have properties with the major real estate developers such as
            the following:
          </p>
          <div className="flex flex-wrap justify-center gap-24 mt-10">
            <img src={`/images/SMDC.svg`} alt="SMDC" className="h-10" />
            <img src={`/images/Camella.svg`} alt="Camella" className="h-10" />
            <img
              src={`/images/PhirstWhiteLogo.svg`}
              alt="Phirst White Logo"
              className="h-10"
            />
            <img src={`/images/Bellavita.svg`} alt="BellaVita" className="h-10" />
            <img
              src={`/images/Palmville.svg`}
              alt="Palmville"
              className="h-10"
            />
            <img
              src={`/images/CuestaVerdeWhite.svg`}
              alt="Cuesta Verde"
              className="h-10"
            />
            <img src={`/images/Ramaland.svg`} alt="Ramaland" className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
