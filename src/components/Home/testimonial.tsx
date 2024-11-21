export default function Testimonial() {
  return (
    <section
      id="Testimonial"
      className="relative isolate overflow-hidden bg-theme-white py-24 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <img alt="" src={`/images/bbsi-logo.svg`} className="mt-10 h-12" />
        <figure className="mt-10">
          <blockquote className="text-left text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              “We are thankful for the privilege of partnering with Cortanatech
              Solutions in advanced technology web development and email setup.
              This partnership gives us an advantage by providing platforms that
              enhance our promotion and communication efforts. The
              professionalism of their services is commendable. We look forward
              to more partnership opportunities in the future.”
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <div className="mt-4 flex justify-left space-x-3 text-base">
              <div className="font-semibold text-gray-900">Evangel Balmes</div>
              <svg
                width={3}
                height={3}
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="fill-gray-900 mt-3"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="text-gray-600">IT Administrator</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
