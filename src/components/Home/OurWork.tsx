const OurWork: React.FC = () => {
  return (
    <section
      id="OurWork"
      className="overflow-hidden bg-theme-veryWhite py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base leading-7 text-blue-600">
                See Our Work
              </h2>
              <p className="mt-2 text-5xl font-bold tracking-tight text-gray-900">
                Baptist Bible Seminary and Institute, Inc.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Baptist Bible Seminary and Institute – College is a theological
                institution committed to develop called men and women through
                sound biblical training to effectively make Christ known to the
                world. We developed a website that serves as their school
                brochure for prospect students seeking a Christian college
                education.
              </p>
              <div className="mt-10 flex items-center justify-left gap-x-6">
                <a href="https://bbsi.edu.ph/" className="btn btn-primary">
                  See it in action
                </a>
                <a
                  href="https://blog.cortanatechsolutions.com/inspiring-through-words-merrel-yas-personal-blog"
                  className="btn btn-outline btn-primary"
                >
                  See other works <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src={`/images/bbsi.png`}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </section>
  );
};

export default OurWork;
