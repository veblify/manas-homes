// FIX: Import React to resolve 'Cannot find namespace React' error.
import React from 'react';

export interface Property {
  id: string | number;
  title: string;
  location: string | number;
  price: string | number;
  beds: number  | string;
  baths: number | string;
  area: number  |string ; // in sq. ft.
  images?: string[];
  imageUrl?: string;
  description?:string;
  type: 'Residential' | 'Commercial' | 'Apartment';
  status: 'For Sale' | 'For Rent' | 'Sold';
}

export interface Service {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export interface Feature {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  avatarUrl: string;
}