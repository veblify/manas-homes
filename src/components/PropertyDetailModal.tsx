import React from "react";
import { Property } from "../types";
import { MapPinIcon, BedIcon, ArrowsPointingOutIcon, XMarkIcon } from "./Icons";

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
}

const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
}) => {
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const whatsappMessage = `Hello Manas Homes, I'm interested in the property '${property.title}' located at '${property.location}'. Could you please provide more details?`;
  const whatsappUrl = `https://wa.me/919594626392?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // ⭐ Fallback for old properties that used imageUrl instead of images[]
  const images = property.images && property.images.length > 0
    ? property.images
    : [property.imageUrl];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  // ⭐ Reset slider when opening a new property
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [property]);

  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-title"
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-scale-in"
        onClick={handleModalContentClick}
      >
        <div className="relative">
          {/* ⭐ IMAGE SLIDER */}
          <div className="relative w-full h-96 overflow-hidden rounded-t-lg">
            <img
              src={images[currentIndex]}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* ⭐ Left Arrow */}
            {hasMultipleImages && (
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            )}

            {/* ⭐ Right Arrow */}
            {hasMultipleImages && (
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}

            {/* ⭐ Dots Indicator */}
            {hasMultipleImages && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i === currentIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 text-gray-700 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            aria-label="Close property details"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* ⭐ DETAILS SECTION */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-4">
                <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full">
                  {property.status}
                </span>
                <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
                  {property.type}
                </span>
              </div>

              <h2
                id="property-title"
                className="text-4xl font-bold font-teko text-gray-800 mt-4"
              >
                {property.title}
              </h2>

              <div className="flex items-center text-gray-500 mt-1">
                <MapPinIcon className="w-5 h-5 mr-2" />
                <p className="text-lg">{property.location}</p>
              </div>
            </div>

            <div className="text-left md:text-right flex-shrink-0 md:ml-8">
              <p className="text-4xl font-bold text-blue-700">
                {property.price}
              </p>
            </div>
          </div>

          <div className="flex justify-around text-gray-700 border-t border-b my-6 py-4">
            <div className="text-center px-2">
              <BedIcon className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <span className="text-lg">{property.beds} Beds</span>
            </div>

            <div className="text-center px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 mx-auto mb-2 text-orange-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
              <span className="text-lg">{property.baths} Baths</span>
            </div>

            <div className="text-center px-2">
              <ArrowsPointingOutIcon className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <span className="text-lg">{property.area} sqft</span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-teko font-semibold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          <div className="mt-8 text-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailModal;
