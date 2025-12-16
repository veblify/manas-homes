import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import OwnerLoginModal from "./OwnerloginModal";
import AdminPanel from "./AdminPanel";

const OWNER_EMAIL = "veblify@gmail.com"; // <-- replace with your Firebase email

const Logo = () => (
  <div className="flex items-center flex-shrink-0">
    <div className="font-teko tracking-wider">
      <img
        src="/property.ico"
        alt="ManasHomes Logo"
        className="h-20 w-auto object-contain"
      />
    </div>
  </div>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ⭐ Login modal state
  const [showLogin, setShowLogin] = useState(false);

  // ⭐ Owner login detection
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.email === OWNER_EMAIL) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    });

    return () => unsub();
  }, []);

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">

            {/* ⭐ CLICK LOGO TO OPEN LOGIN */}
            <button onClick={() => setShowLogin(true)}>
              <Logo />
            </button>

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
                    d={
                      isOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16m-7 6h7"
                    }
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

      {/* ⭐ LOGIN MODAL */}
      <OwnerLoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={() => setShowLogin(false)}
      />

      {/* ⭐ ADMIN PANEL (only visible when owner logged in) */}
      {isOwner && (
        <div className="fixed bottom-4 right-4 z-50">
          <AdminPanel />
          <button
            onClick={() => signOut(auth)}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
