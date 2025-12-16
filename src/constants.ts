
import { Property, Service, Feature, Testimonial } from './types';
import { BuildingOffice2Icon, HomeModernIcon, BanknotesIcon, MagnifyingGlassIcon, ShieldCheckIcon, UserGroupIcon, StarIcon } from './components/Icons';

export const PROPERTIES: Property[] = [
  {
    id: 1,
    title: 'Luxury 2BHK Apartment',
    location: 'Dombivli East',
    price: '₹ 75 Lacs',
    beds: 2,
    baths: 2,
    area: 950,
    imageUrl: 'https://picsum.photos/seed/home1/800/600',
    type: 'Residential',
    status: 'For Sale',
  },
  {
    id: 2,
    title: 'Spacious Commercial Office',
    location: 'Kalyan West',
    price: '₹ 50,000/month',
    beds: 0,
    baths: 2,
    area: 1500,
    imageUrl: 'https://picsum.photos/seed/office1/800/600',
    type: 'Commercial',
    status: 'For Rent',
  },
  {
    id: 3,
    title: 'Modern 3BHK Villa',
    location: 'Badlapur',
    price: '₹ 1.2 Cr',
    beds: 3,
    baths: 3,
    area: 1800,
    imageUrl: 'https://picsum.photos/seed/home2/800/600',
    type: 'Residential',
    status: 'For Sale',
  },
  {
    id: 4,
    title: 'Compact 1RK Studio',
    location: 'Ambernath',
    price: '₹ 8,000/month',
    beds: 1,
    baths: 1,
    area: 400,
    imageUrl: 'https://picsum.photos/seed/home3/800/600',
    type: 'Residential',
    status: 'For Rent',
  },
    {
    id: 5,
    title: 'Prime Retail Space',
    location: 'Thane',
    price: '₹ 2.5 Cr',
    beds: 0,
    baths: 1,
    area: 2000,
    imageUrl: 'https://picsum.photos/seed/shop1/800/600',
    type: 'Commercial',
    status: 'For Sale',
  },
  {
    id: 6,
    title: 'Cozy 1BHK Flat',
    location: 'Dombivli West',
    price: '₹ 45 Lacs',
    beds: 1,
    baths: 1,
    area: 600,
    imageUrl: 'https://picsum.photos/seed/home4/800/600',
    type: 'Residential',
    status: 'For Sale',
  },
];

export const SERVICES: Service[] = [
  {
    icon: HomeModernIcon,
    title: 'Buy Property',
    description: 'Find your dream home from our curated list of residential properties.',
  },
  {
    icon: BuildingOffice2Icon,
    title: 'Sell Property',
    description: 'Get the best market value for your property with our expert assistance.',
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Rent Property',
    description: 'Discover rental properties that fit your lifestyle and budget perfectly.',
  },
  {
    icon: BanknotesIcon,
    title: 'Loan Assistance',
    description: 'We guide you through the entire home loan process for a hassle-free experience.',
  },
];

export const FEATURES: Feature[] = [
  {
    icon: ShieldCheckIcon,
    title: 'MAHARERA Registered',
    description: 'We are a fully compliant and registered entity (A51700024887), ensuring transparency and trust.',
  },
  {
    icon: UserGroupIcon,
    title: 'Expert Team',
    description: 'Our experienced professionals provide dedicated support and guidance at every step of your journey.',
  },
  {
    icon: StarIcon,
    title: 'Affordable Solutions',
    description: 'We specialize in budget-friendly options, making real estate investment accessible to everyone.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Manas Homes made our dream of owning a home a reality. Their process was transparent and their team was incredibly supportive. Highly recommended!",
    name: "Prakash Sharma",
    location: "Kalyan",
    avatarUrl: "https://picsum.photos/seed/avatar1/100/100",
  },
  {
    quote: "Finding a commercial space was a breeze with Manas Homes. They understood our requirements perfectly and found us a great location.",
    name: "Sunita Verma",
    location: "Dombivli",
    avatarUrl: "https://picsum.photos/seed/avatar2/100/100",
  },
  {
    quote: "The loan assistance service was a lifesaver. Mr. Gupta and his team handled all the paperwork and made it so simple for us.",
    name: "Anil & Rekha Desai",
    location: "Badlapur",
    avatarUrl: "https://picsum.photos/seed/avatar3/100/100",
  },
];
