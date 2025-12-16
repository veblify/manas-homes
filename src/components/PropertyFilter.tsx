import React from 'react';
import { ChevronDownIcon, ArrowPathIcon } from './Icons';

interface PropertyFilterProps {
  locations: string[];
  locationFilter: string;
  onLocationFilterChange: (location: string) => void;
  propertyType: string;
  onPropertyTypeChange: (type: string) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
  onReset: () => void;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({
  locations,
  locationFilter,
  onLocationFilterChange,
  propertyType,
  onPropertyTypeChange,
  priceRange,
  onPriceRangeChange,
  onReset
}) => {
  const propertyTypes = ['All', 'Residential', 'Commercial'];
  const priceRanges = ['All', '< 50 Lacs', '50 Lacs - 1 Cr', '> 1 Cr', 'Rentals'];

  return (
    <div className="bg-gradient-to-br from-white/90 to-gray-50/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg shadow-blue-100/50 mb-20 max-w-6xl mx-auto border border-white/60">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        {/* Search by Location */}
        <div>
          <label htmlFor="search-location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
             <select
              id="search-location"
              value={locationFilter}
              onChange={(e) => onLocationFilterChange(e.target.value)}
              className="w-full py-3 pl-4 pr-10 bg-white/50 border border-gray-300/70 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 appearance-none transition-all duration-300 text-gray-800"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
               <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filter by Type */}
        <div>
          <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <div className="relative">
            <select
              id="property-type"
              value={propertyType}
              onChange={(e) => onPropertyTypeChange(e.target.value)}
              className="w-full py-3 pl-4 pr-10 bg-white/50 border border-gray-300/70 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 appearance-none transition-all duration-300 text-gray-800"
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
               <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filter by Price */}
        <div>
          <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="relative">
            <select
              id="price-range"
              value={priceRange}
              onChange={(e) => onPriceRangeChange(e.target.value)}
              className="w-full py-3 pl-4 pr-10 bg-white/50 border border-gray-300/70 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 appearance-none transition-all duration-300 text-gray-800"
            >
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
               <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div>
            <button
              onClick={onReset}
              className="w-full bg-gradient-to-br from-orange-500 to-orange-600 text-white py-3 px-4 font-semibold rounded-lg shadow-md hover:shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Reset
            </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;