export interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  email?: string;
  photo?: string;
}

export interface Area {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  projectCount: number;
}

export interface Project {
  id: string;
  name: string;
  areaId: string;
  areaName: string;
  tagline: string;
  description: string;
  address?: string;
  floors?: number;
  units?: string;
  completionYear?: string;
  priceFrom?: string;
  type: 'luxury' | 'residential' | 'resort' | 'branded';
  status: 'pre-construction' | 'under-construction' | 'completed';
  amenities: string[];
  features: string[];
  image: string;
  featured?: boolean;
}
