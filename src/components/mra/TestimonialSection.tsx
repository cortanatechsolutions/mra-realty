import { useEffect, useState } from "react";
import Papa from "papaparse";

// Define the Testimonial type
type Testimonial = {
  Id: string;
  Name: string;
  Role: string;
  Image: string;
  Message: string;
};

// Google Sheets CSV URL
const GOOGLE_SHEET_CSV_URL = import.meta.env.VITE_REACT_APP_TESTIMONIALS_GOOGLE_SHEET_CSV_URL

const TestimonialSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        const csvText = await response.text();

        // Parse the CSV data
        Papa.parse<Testimonial>(csvText, {
          header: true, // Use the first row as the header
          skipEmptyLines: true, // Skip empty rows
          complete: (result) => {
            setTestimonials(result.data); // Set the parsed data
            setLoading(false);
          },
          error: (error: any) => {
            console.error("Error parsing CSV:", error);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

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
    <div className="bg-brand-active text-white py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header and Testimonials */}
        <div className="flex flex-col lg:flex-row justify-between">
          <h2 className="text-3xl pb-10 ml-3 lg:ml-16 font-regular text-left lg:w-1/4">
            What our clients are saying about us?
          </h2>

          <div className="lg:w-2/4 overflow-hidden relative">
            {loading ? (
              <p>Loading testimonials...</p>
            ) : (
              <>
                {/* Testimonials Carousel */}
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="flex-shrink-0 w-full px-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={testimonial.Image}
                            alt={testimonial.Name}
                            className="w-16 h-16 rounded-full mr-4"
                          />
                          <div>
                            <h3 className="font-regular text-lg">
                              {testimonial.Name}
                            </h3>
                            <p className="text-sm">{testimonial.Role}</p>
                          </div>
                        </div>
                        <img
                          alt=""
                          src="/images/quote.svg"
                          className="w-10 h-10 text-yellow-400"
                        />
                      </div>
                      <blockquote className="text-sm mt-4">
                        {testimonial.Message}
                      </blockquote>
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-center lg:justify-start space-x-4 pt-8">
                  <button
                    onClick={handlePrev}
                    className="btn btn-transparent btn-primary"
                    disabled={currentIndex === 0}
                  >
                    &lt;
                  </button>
                  <button
                    onClick={handleNext}
                    className="btn btn-transparent btn-primary"
                    disabled={currentIndex === testimonials.length - 1}
                  >
                    &gt;
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Logos Section */}
        <div className="mt-12 text-center">
          <p className="text-regular">
            We have properties with the major real estate developers such as:
          </p>
          <div className="flex flex-wrap justify-center gap-24 mt-10">
            <img src="/images/SMDC.svg" alt="SMDC" className="h-10" />
            <img src="/images/Camella.svg" alt="Camella" className="h-10" />
            <img
              src="/images/PhirstWhiteLogo.svg"
              alt="Phirst White Logo"
              className="h-10"
            />
            <img src="/images/Bellavita.svg" alt="BellaVita" className="h-10" />
            <img src="/images/Palmville.svg" alt="Palmville" className="h-10" />
            <img
              src="/images/CuestaVerdeWhite.svg"
              alt="Cuesta Verde"
              className="h-10"
            />
            <img src="/images/Ramaland.svg" alt="Ramaland" className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
