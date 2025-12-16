import React, { useState, useEffect } from "react";

const Logo = () => (
  <div className="flex items-center flex-shrink-0">
    <svg width="40" height="40" viewBox="0 0 150 150" className="mr-2">
      <path d="M5 110 L5 50 L25 50 L25 110 Z" fill="#a5f3fc" />
      <path d="M10 100 L20 100" stroke="#0284c7" strokeWidth="3" />
      <path d="M10 90 L20 90" stroke="#0284c7" strokeWidth="3" />
      <path d="M10 80 L20 80" stroke="#0284c7" strokeWidth="3" />
      <path d="M10 70 L20 70" stroke="#0284c7" strokeWidth="3" />
      <path d="M30 110 L30 20 L55 20 L55 110 Z" fill="#6b7280" />
      <path d="M35 100 L50 100" stroke="#e5e7eb" strokeWidth="3" />
      <path d="M35 90 L50 90" stroke="#e5e7eb" strokeWidth="3" />
      <path d="M35 80 L50 80" stroke="#e5e7eb" strokeWidth="3" />
      <path d="M35 70 L50 70" stroke="#e5e7eb" strokeWidth="3" />
      <path d="M35 60 L50 60" stroke="#e5e7eb" strokeWidth="3" />
      <path d="M35 50 L50 50" stroke="#e5e7eb" strokeWidth="3" />
      <path d="M35 40 L50 40" stroke="#e5e7eb" strokeWidth="3" />
      <path d="M35 30 L50 30" stroke="#e5e7eb" strokeWidth="3" />
    </svg>
    <div className="font-teko tracking-wider">
      <img
        src="/property.ico"
        alt="Manas Homes Logo"
        className="h-20 w-auto object-contain"
      />
    </div>
  </div>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#properties", label: "Properties" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About Us" },
  ];

  const whatsappUrl = `https://wa.me/919594626392?text=${encodeURIComponent(
    "Hello Manas Homes, I'm interested in your properties and would like to know more."
  )}`;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.href.split("#")[1];
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleNavClick(e);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <a href="#home" onClick={handleNavClick}>
            <Logo />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block bg-green-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
          >
            Whatsapp Us
          </a>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            className={`md:hidden mt-4 rounded-lg ${
              isScrolled ? "bg-white" : "bg-gray-100"
            } p-4`}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleMobileNavClick}
                className="block py-2 px-4 text-gray-700 hover:bg-orange-100 rounded-md"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
            >
              Whatsapp Us
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
