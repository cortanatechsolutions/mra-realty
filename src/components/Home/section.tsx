import React from "react";

interface SectionProps {
  data: {
    title: string;
    content: string;
  };
}

const Section: React.FC<SectionProps> = ({ data }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">{data.title}</h2>
        <p className="mt-4 text-lg">{data.content}</p>
      </div>
    </section>
  );
};

export default Section;
