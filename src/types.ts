// FIX: Import React to resolve 'Cannot find namespace React' error.
import React from 'react';

export interface Property {
  id: string | number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: number; // in sq. ft.
  imageUrl: string;
  type: 'Residential' | 'Commercial';
  status: 'For Sale' | 'For Rent';
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