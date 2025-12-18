import React from "react";
import { Property } from "../types";
import { MapPinIcon, BedIcon, ArrowsPointingOutIcon } from "./Icons";

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
}) => {
  const imageSrc = property.images?.[0] || property.imageUrl;
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
      <div className="relative">
        <img
          src={imageSrc}
          alt={property.title}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {property.status}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-white text-xl font-bold">{property.title}</h3>
          <div className="flex items-center text-gray-200 mt-1">
            <MapPinIcon className="w-4 h-4 mr-1" />
            <p className="text-sm">{property.location}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-blue-700">{property.price}</p>
          <p className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
            {property.type}
          </p>
        </div>
        <div className="flex justify-around text-gray-700 border-t border-b py-3">
          <div className="text-center">
            <BedIcon className="w-6 h-6 mx-auto mb-1 text-orange-500" />
            <span className="text-sm">{property.beds} Beds</span>
          </div>
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mx-auto mb-1 text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
            <span className="text-sm">{property.baths} Baths</span>
          </div>
          <div className="text-center">
            <ArrowsPointingOutIcon className="w-6 h-6 mx-auto mb-1 text-orange-500" />
            <span className="text-sm">{property.area} sqft</span>
          </div>
        </div>
        <button
          onClick={() => onViewDetails(property)}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
