export interface MenuItem {
  docId?: string; // To store Firestore document ID
  // id: number; // We might phase this out or decide if it's still needed for other logic
  name: string;
  description: string;
  price: string;
  category: 'drinks' | 'appetizers' | 'mains' | 'desserts';
  featured?: boolean;
  image?: string;
}


export interface Event {
  docId?: string; // To store Firestore document ID
  // id: number; // Phasing out, using docId
  title: string;
  description: string;
  date: string; // Consider Firestore Timestamp for future enhancements
  time: string;
  image: string;
  recurring?: boolean;
  recurringDay?: string;
}


export interface SocialPost {
  docId?: string; // To store Firestore document ID
  // id: number; // Phasing out
  image: string;
  caption: string;
  date: string; // Consider Firestore Timestamp
  likes: number;
  url: string;
}


export interface TeamMember {
  docId?: string; // To store Firestore document ID
  // id: number; // Phasing out
  name: string;
  role: string;
  bio: string;
  image: string;
}


export interface DailySpecial {
  docId?: string; // Will store the day name (e.g., "Monday")
  // id: number; // No longer needed
  day: string; // e.g., "Monday", "Tuesday"
  title: string;
  description: string;
  price: string;
}



export interface BusinessHours {
  docId?: string; // Will store the day name (e.g., "Monday")
  day: string;
  hours: string;
}