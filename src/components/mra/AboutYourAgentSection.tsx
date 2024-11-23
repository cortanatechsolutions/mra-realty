import React from "react";

// Define the interface for the agent props
interface AgentProps {
  imageUrl: string;
  name: string;
  description: string;
  contactLink: string;
}

// Sample agent details (use a single object, not an array)
const agentDetails: AgentProps = {
  name: "Monic Alzola",
  description: `
    Meet Monic Alzola, your go-to real estate matchmaker in Lucena City! With a genuine love for helping people find "the one"—whether it’s a cozy starter home, a sleek condo, or the perfect investment property—Monic makes house-hunting feel like a breeze. Known for her bright personality and can-do attitude, she brings a personal touch to every deal, making sure her clients enjoy the journey as much as the destination.

    When she’s not sealing deals, you’ll find Monic exploring local cafés or discovering hidden gems around town, always on the lookout for the next must-see property. Ready to turn those real estate dreams into reality? Monic’s here to help you find your perfect place, with plenty of smiles along the way!
  `,
  imageUrl: "/images/ownerprofile.png", // Replace with the actual image URL
  contactLink: "mailto:contact@monicalzola.com", // Replace with the actual contact link
};

const AboutYourAgent: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left py-20 lg:mr-28">
          <h2 className="text-3xl font-regular text-gray-900 mb-4">About Your Agent</h2>
          <p className="text-regular text-gray-700 mb-8">{agentDetails.description}</p>
          <a
            href={agentDetails.contactLink}
            className="btn btn-primary btn-lg"
          >
            Contact Me
          </a>
        </div>

        {/* Image Section */}
        <div className="rounded-3xl overflow-hidden w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96">
          <img
            src={agentDetails.imageUrl}
            alt={`Photo of ${agentDetails.name}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutYourAgent;
