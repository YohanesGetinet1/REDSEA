export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: 'drinks' | 'appetizers' | 'mains' | 'desserts';
  featured?: boolean;
  image?: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  recurring?: boolean;
  recurringDay?: string;
}

export interface SocialPost {
  id: number;
  image: string;
  caption: string;
  date: string;
  likes: number;
  url: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface DailySpecial {
  id: number;
  day: string;
  title: string;
  description: string;
  price: string;
}

export interface BusinessHours {
  day: string;
  hours: string;
}