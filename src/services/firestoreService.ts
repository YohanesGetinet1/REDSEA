// src/services/firestoreService.ts
import {
  collection,
  getDocs,
  query,
  where,
  limit as firestoreLimit,
  orderBy,
  DocumentData
} from 'firebase/firestore';
import { db } from '../firebase/config';
// Ensure Event type is imported
import { BusinessHours, DailySpecial, MenuItem, Event, SocialPost, TeamMember } from '../types';

const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const fetchBusinessHours = async (): Promise<BusinessHours[]> => {
  try {
    // Since document IDs are day names, we can't directly order by ID in a custom way with Firestore query.
    // We'll fetch all and then sort them in code.
    // If you had a 'sortOrder' field (e.g., 0 for Monday, 1 for Tuesday), you could orderBy that.
    const hoursCollectionRef = collection(db, 'businessHours');
    const querySnapshot = await getDocs(hoursCollectionRef);

    const hoursList: BusinessHours[] = [];
    querySnapshot.forEach(docSnap => {
      // Ensure we only process expected documents if there are others accidentally
      if (daysOrder.includes(docSnap.id)) {
        hoursList.push({
          docId: docSnap.id,
          ...(docSnap.data() as Omit<BusinessHours, 'docId'>),
        });
      }
    });

    // Sort the fetched hours according to daysOrder
    hoursList.sort((a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day));
    return hoursList;
  } catch (error) {
    console.error("Error fetching business hours: ", error);
    throw error; // Re-throw to be caught by the component
  }
};


export const fetchDailySpecials = async (): Promise<DailySpecial[]> => {
  try {
    const specialsCollectionRef = collection(db, 'dailySpecials');
    const querySnapshot = await getDocs(specialsCollectionRef);

    const specialsList: DailySpecial[] = [];
    querySnapshot.forEach(docSnap => {
      // Assuming document IDs are the day names e.g. "Monday"
      if (daysOrder.includes(docSnap.id)) {
        specialsList.push({
          docId: docSnap.id, // This will be the day name
          ...(docSnap.data() as Omit<DailySpecial, 'docId'>),
        });
      }
    });

    // Sort the fetched specials according to daysOrder
    specialsList.sort((a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day));
    return specialsList;
  } catch (error) {
    console.error("Error fetching daily specials: ", error);
    throw error; // Re-throw to be caught by the component
  }
};


interface FetchMenuItemsOptions {
  featuredOnly?: boolean;
  category?: string; // For future use on Menu page
  count?: number;    // Renamed from 'limit' to avoid conflict if not careful
}

export const fetchMenuItems = async (options?: FetchMenuItemsOptions): Promise<MenuItem[]> => {
  try {
    const menuItemsCollectionRef = collection(db, 'menuItems');
    let q = query(menuItemsCollectionRef, orderBy('name', 'asc')); // Default query, order by name

    if (options?.featuredOnly) {
      q = query(q, where('featured', '==', true));
    }
    if (options?.category && options.category !== 'all') {
      q = query(q, where('category', '==', options.category));
    }
    if (options?.count) {
      q = query(q, firestoreLimit(options.count));
    }

    const querySnapshot = await getDocs(q);
    const menuItemsList: MenuItem[] = [];
    querySnapshot.forEach((docSnap) => {
      menuItemsList.push({
        docId: docSnap.id,
        ...(docSnap.data() as Omit<MenuItem, 'docId'>),
      });
    });
    return menuItemsList;
  } catch (error) {
    console.error("Error fetching menu items: ", error);
    throw error;
  }
};


interface FetchEventsOptions {
  count?: number;
  // For more advanced "upcoming" logic with string dates, more complex querying or client-side filtering is needed.
  // If date was a Firestore Timestamp, we could query: where('date', '>=', Timestamp.now())
  // For now, we'll order by date and let the client filter if truly "upcoming" is strict.
  // Or, if events are manually curated, simply fetching the latest added might be what's intended for the homepage.
  // Let's order by date ascending, which is suitable for an "upcoming" list.
}

export const fetchEvents = async (options?: FetchEventsOptions): Promise<Event[]> => {
  try {
    const eventsCollectionRef = collection(db, 'events');
    // Order by the 'date' field (string YYYY-MM-DD).
    // For truly "upcoming", client-side filtering will be needed after this fetch if some are past.
    let q = query(eventsCollectionRef, orderBy('date', 'asc'));

    if (options?.count) {
      q = query(q, firestoreLimit(options.count));
    }

    const querySnapshot = await getDocs(q);
    const eventsList: Event[] = [];
    querySnapshot.forEach((docSnap) => {
      eventsList.push({
        docId: docSnap.id,
        ...(docSnap.data() as Omit<Event, 'docId'>),
      });
    });
    return eventsList;
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw error;
  }
};


interface FetchSocialPostsOptions {
  count?: number;
}

export const fetchSocialPosts = async (options?: FetchSocialPostsOptions): Promise<SocialPost[]> => {
  try {
    const postsCollectionRef = collection(db, 'socialPosts');
    // Order by date descending to get the latest posts first.
    // This works lexicographically for "YYYY-MM-DD" format.
    let q = query(postsCollectionRef, orderBy('date', 'desc'));

    if (options?.count) {
      q = query(q, firestoreLimit(options.count));
    }

    const querySnapshot = await getDocs(q);
    const postsList: SocialPost[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      // Ensure date is handled correctly if it were a Timestamp, but it's string from admin editor
      postsList.push({
        docId: docSnap.id,
        image: data.image,
        caption: data.caption,
        date: data.date, // Keep as string as per current setup
        likes: data.likes,
        url: data.url,
      });
    });
    return postsList;
  } catch (error) {
    console.error("Error fetching social posts: ", error);
    throw error;
  }
};


interface FetchTeamMembersOptions {
  count?: number;
  // Add other options like sortBy if needed later
}

export const fetchTeamMembers = async (options?: FetchTeamMembersOptions): Promise<TeamMember[]> => {
  try {
    const membersCollectionRef = collection(db, 'teamMembers');
    // Order by name alphabetically by default.
    // You could add an 'order' field in Firestore if you want a custom order.
    let q = query(membersCollectionRef, orderBy('name', 'asc'));

    if (options?.count) {
      q = query(q, firestoreLimit(options.count));
    }

    const querySnapshot = await getDocs(q);
    const membersList: TeamMember[] = [];
    querySnapshot.forEach((docSnap) => {
      membersList.push({
        docId: docSnap.id,
        ...(docSnap.data() as Omit<TeamMember, 'docId'>),
      });
    });
    return membersList;
  } catch (error) {
    console.error("Error fetching team members: ", error);
    throw error;
  }
};
// You can add more fetching functions here for other data types later
// e.g., fetchDailySpecials, fetchMenuItems, etc.