import React from "react";

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
}

interface TeamProps {
  data: {
    title: string;
    members: TeamMember[];
  };
}

const Team: React.FC<TeamProps> = ({ data }) => {
  return (
    <section id="OurLeadership" className="bg-theme-dirtyWhite">
      <div className="overflow-hidden  py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-5xl font-bold">{data.title}</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We are a vibrant team of dedicated professionals, driven by our
            passion for excellence and committed to achieving outstanding
            results for our clients. We're here to journey with you towards the
            success of your company's mission.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {data.members.map((member, index) => (
              <div
                key={index}
                className="bg-theme-white rounded-2xl shadow-md p-6"
              >
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="mx-auto w-32 h-32 rounded-full shadow-xl ring-1 ring-gray-400/10 mb-4"
                />
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold leading-6 text-theme-royalBlue">
                  {member.position}
                </p>
                <p className="text-gray-700">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
