import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ModalForm from "./ContactFormModal";
import { useHandleNavClick } from "../../hooks/useHandleNavClick";

interface NavbarProps {
  data: {
    brand: string;
    links: { name: string; href: string }[];
  };
}

const Navbar: React.FC<NavbarProps> = ({ data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleNavClick = useHandleNavClick(); // Use the custom hook

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? "sticky bg-brand-active shadow-lg" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{data.brand}</span>
            <img alt="" src={`/default-logo.svg`} className="h-20 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-x-20 flex-grow">
          {data.links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm py-2 leading-6 text-white hover:text-theme-default"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:justify-end gap-x-4">
          <button
            onClick={openModal}
            className="btn btn-transparent btn-primary"
          >
            Refer a Property
          </button>
          <button onClick={openModal} className="btn btn-primary">
            Inquire about Property
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">{data.brand}</span>
              <img alt="" src={`/default-logo-light.svg`} className="h-20 w-auto" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {data.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block px-3 py-2 text-base font-heading leading-7 text-gray-900 hover:text-theme-default"
                  >
                    {link.name}
                  </a>
                ))}
                <button
                  onClick={() => {
                    openModal();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-primary"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default Navbar;
