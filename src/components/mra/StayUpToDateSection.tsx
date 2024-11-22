import { useState } from 'react';

const StayUpToDate: React.FC = () => {
  const [viberNumber, setViberNumber] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setViberNumber(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission logic here (e.g., send viber number to an API)
    console.log('Viber number submitted:', viberNumber);
  };

  return (
    <div className="bg-white py-52 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="p-4 inline-block mb-6">
            <img src={`/images/stayuptodate.svg`} alt="Ramaland" className="h-20" />
        </div>
        <h2 className="text-3xl font-regular text-gray-900 mb-4">Stay Up to Date</h2>
        <p className="text-sm text-gray-700 mb-8">
          Subscribe to Viber to receive regular updates of listings.
        </p>
        <form onSubmit={handleSubmit} className="flex justify-center items-center">
          <div className="input input-lg">
            <input 
            type="text"
            value={viberNumber}
            onChange={handleInputChange}
            placeholder="Your viber number"
            className='border-none focus:outline-none focus:ring-0'/>
            <button className="btn btn-icon">
                <i className="ki-solid ki-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StayUpToDate;
