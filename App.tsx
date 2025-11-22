import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PropertyCard from './components/PropertyCard';
import PropertyDetailModal from './components/PropertyDetailModal';
import PropertyFilter from './components/PropertyFilter';
import { Property, Service, Feature, Testimonial } from './types';
import { PROPERTIES, SERVICES, FEATURES, TESTIMONIALS } from './constants';
import { PhoneIcon, EnvelopeIcon, FacebookIcon, InstagramIcon } from './components/Icons';

const Hero: React.FC = () => {
    const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = e.currentTarget.href.split('#')[1];
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative h-screen flex items-center justify-center text-white">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://picsum.photos/seed/bg/1920/1080')` }}></div>
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 text-center px-4 animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-teko font-bold uppercase tracking-wider mb-4">
                    Find Your <span className="text-orange-500">Dream Property</span> With Us
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200">
                    Your trusted partner in buying, selling, and renting properties across Mumbai, Thane, and beyond.
                </p>
                <a href="#properties" onClick={handleExploreClick} className="bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 inline-block">
                    Explore Properties
                </a>
            </div>
        </section>
    );
};

const parsePrice = (price: string): number => {
    if (price.includes('/month')) return -1; // Special value for rentals

    const numericString = price.replace(/[^0-9.]/g, '');
    const value = parseFloat(numericString);

    if (price.toLowerCase().includes('cr')) {
        return value * 1_00_00_000;
    }
    if (price.toLowerCase().includes('lacs')) {
        return value * 1_00_000;
    }
    return value;
};

const locations = ['All', ...new Set(PROPERTIES.map(p => p.location))];

const FeaturedProperties: React.FC<{
    properties: Property[],
    onViewDetails: (property: Property) => void,
    locationFilter: string;
    onLocationFilterChange: (location: string) => void;
    propertyType: string;
    onPropertyTypeChange: (type: string) => void;
    priceRange: string;
    onPriceRangeChange: (range: string) => void;
    onResetFilters: () => void;
}> = ({
    properties,
    onViewDetails,
    locationFilter,
    onLocationFilterChange,
    propertyType,
    onPropertyTypeChange,
    priceRange,
    onPriceRangeChange,
    onResetFilters
}) => (
    <section id="properties" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-teko font-bold text-gray-800 uppercase">Featured Properties</h2>
                <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">Discover our handpicked selection of the finest properties available.</p>
                <div className="mt-4 w-24 h-1 bg-orange-500 mx-auto"></div>
            </div>

            <PropertyFilter
                locations={locations}
                locationFilter={locationFilter}
                onLocationFilterChange={onLocationFilterChange}
                propertyType={propertyType}
                onPropertyTypeChange={onPropertyTypeChange}
                priceRange={priceRange}
                onPriceRangeChange={onPriceRangeChange}
                onReset={onResetFilters}
            />

            {properties.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map(property => <PropertyCard key={property.id} property={property} onViewDetails={onViewDetails} />)}
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-gray-700">No Properties Found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search filters to find your perfect property.</p>
                </div>
            )}
        </div>
    </section>
);


const Services: React.FC<{ services: Service[] }> = ({ services }) => (
    <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-teko font-bold text-gray-800 uppercase">Our Services</h2>
                <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">All solutions at one point - from finding a home to financing it.</p>
                 <div className="mt-4 w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map(service => (
                    <div key={service.title} className="text-center p-8 border rounded-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50">
                        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 text-blue-600 mx-auto mb-6">
                            <service.icon className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const WhyChooseUs: React.FC<{ features: Feature[] }> = ({ features }) => (
    <section id="about" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                 <h2 className="text-4xl md:text-5xl font-teko font-bold text-gray-800 uppercase">Why Choose Manas Homes?</h2>
                <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">Experience the difference with a partner who values integrity and your dreams.</p>
                <div className="mt-4 w-24 h-1 bg-orange-500 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {features.map(feature => (
                    <div key={feature.title} className="bg-white p-8 rounded-lg shadow-md flex items-start space-x-4">
                        <div className="flex-shrink-0 h-16 w-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                            <feature.icon className="w-8 h-8"/>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                            <p className="mt-2 text-gray-600">{feature.description}</p>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
    </section>
);

const Testimonials: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => (
    <section id="testimonials" className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-6">
             <div className="text-center mb-12">
                 <h2 className="text-4xl md:text-5xl font-teko font-bold uppercase">What Our Clients Say</h2>
                 <p className="text-lg text-blue-200 mt-2 max-w-2xl mx-auto">We are proud to have earned the trust of families and businesses.</p>
                 <div className="mt-4 w-24 h-1 bg-orange-500 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map(testimonial => (
                    <div key={testimonial.name} className="bg-blue-600 p-8 rounded-lg shadow-lg">
                        <p className="text-blue-100 mb-6 italic">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                            <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 border-2 border-orange-400" />
                            <div>
                                <h4 className="font-bold text-white">{testimonial.name}</h4>
                                <p className="text-sm text-blue-200">{testimonial.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Contact: React.FC = () => (
    <footer id="contact" className="py-20 bg-gray-800 text-gray-300">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-2xl font-teko font-semibold text-white mb-4">Manas Homes</h3>
                    <p className="text-gray-400">Your trusted partner in realizing real estate dreams. All solutions at one point.</p>
                    <p className="mt-2 text-sm text-gray-500">MAHARERA: A51700024887</p>
                </div>
                <div>
                    <h3 className="text-2xl font-teko font-semibold text-white mb-4">Operating Areas</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>Dombivli, Kalyan, Ambernath, Badlapur</li>
                        <li>Thane, Mumbai, Navi Mumbai</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-2xl font-teko font-semibold text-white mb-4">Contact Us</h3>
                    <address className="not-italic">
                        <p className="mb-2">Mr. Mahendra R. Gupta</p>
                        <div className="flex items-center justify-center md:justify-start mb-2 space-x-2 hover:text-orange-400 transition-colors">
                           <PhoneIcon className="w-5 h-5"/> <a href="tel:+919594626392">+91 9594626392</a>
                        </div>
                         <div className="flex items-center justify-center md:justify-start mb-2 space-x-2 hover:text-orange-400 transition-colors">
                           <PhoneIcon className="w-5 h-5"/> <a href="tel:+919067172056">+91 9067172056</a>
                        </div>
                        <p className="mt-2">Badlapur 421503</p>
                    </address>
                </div>
            </div>
            <div className="mt-12 mb-[-3px] border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                 <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Manas Homes. All Rights Reserved.</p>
                  <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Manas Homes:Developed &amp; maintained by:<a href="https://veblify.vercel.app/" target="_blank">VEBLIFY</a></p>
                 <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="https://www.instagram.com/manas.homes/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors" aria-label="Instagram">
                       <InstagramIcon className="w-6 h-6" />
                    </a>
                    <a href="https://facebook.com/Manas.Homes5" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors" aria-label="Facebook">
                        <FacebookIcon className="w-6 h-6" />
                    </a>
                     <a href="https://www.youtube.com/@manas.homes5" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors" aria-label="YouTube">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.594.42-7.812.42-7.812.42s-6.218 0-7.812-.42a2.506 2.506 0 0 1-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814a2.506 2.506 0 0 1 1.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418zM9.75 15.5V8.5l6 3.5-6 3.5z" clipRule="evenodd" /></svg>
                    </a>
                 </div>
            </div>
        </div>
    </footer>
);


const App: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [locationFilter, setLocationFilter] = useState('All');
  const [propertyType, setPropertyType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(PROPERTIES);

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  const handleResetFilters = () => {
    setLocationFilter('All');
    setPropertyType('All');
    setPriceRange('All');
  };

  useEffect(() => {
    let result = PROPERTIES;

    // Filter by location
    if (locationFilter !== 'All') {
        result = result.filter(p => p.location === locationFilter);
    }

    // Filter by property type
    if (propertyType !== 'All') {
        result = result.filter(p => p.type === propertyType);
    }
    
    // Filter by price range
    if (priceRange !== 'All') {
         result = result.filter(p => {
            const price = parsePrice(p.price);

            if(priceRange === 'Rentals') {
                return p.status === 'For Rent';
            }

            if (p.status === 'For Rent') return false; // Exclude rentals from price range filters

            switch (priceRange) {
                case '< 50 Lacs':
                    return price < 50_00_000;
                case '50 Lacs - 1 Cr':
                    return price >= 50_00_000 && price <= 1_00_00_000;
                case '> 1 Cr':
                    return price > 1_00_00_000;
                default:
                    return true;
            }
        });
    }

    setFilteredProperties(result);
  }, [locationFilter, propertyType, priceRange]);


  useEffect(() => {
    if (selectedProperty) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProperty]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedProperties
            properties={filteredProperties}
            onViewDetails={handleViewDetails}
            locationFilter={locationFilter}
            onLocationFilterChange={setLocationFilter}
            propertyType={propertyType}
            onPropertyTypeChange={setPropertyType}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            onResetFilters={handleResetFilters}
        />
        <Services services={SERVICES} />
        <WhyChooseUs features={FEATURES} />
        <Testimonials testimonials={TESTIMONIALS} />
      </main>
      <Contact />
      {selectedProperty && (
        <PropertyDetailModal property={selectedProperty} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default App;