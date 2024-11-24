import { useState } from "react";
import ModalForm from "../core/ContactFormModal";

const WhyWorkWithUs: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Why work with us?</h2>
          <p className="text-gray-600 mt-2">Here are three reasons why</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img src={`/images/building.svg`} alt="Wide range of properties" className="h-16 w-16" />
            <h3 className="text-xl font-medium text-gray-800 mt-4">Wide range of properties</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Condos, house and lots, apartments, and even lots for your business - we have those.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src={`/images/icon-core-house.svg`} alt="Buy or rent homes" className="h-16 w-16" />
            <h3 className="text-xl font-medium text-gray-800 mt-4">Buy or rent homes</h3>
            <p className="text-gray-600 mt-2 text-sm">
              We sell your home at the best market price and very quickly as well.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src={`/images/security.svg`} alt="Trusted by many" className="h-16 w-16" />
            <h3 className="text-xl font-medium text-gray-800 mt-4">Trusted by many</h3>
            <p className="text-gray-600 mt-2 text-sm">
              We offer you free consultancy on how to get a loan for your new home.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-brand-active text-white mt-12 max-w-6xl mx-auto rounded-2xl py-8 px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl">Fill up our form, or consult with us</h2>
          <p className="text-sm mt-2">There's no harm in asking. So, ask away!</p>
        </div>
        <button 
        className="btn btn-primary mt-6 md:mt-0"
        onClick={openModal}
        >Inquire with us, don't be shy</button>
      </div>
      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default WhyWorkWithUs;
