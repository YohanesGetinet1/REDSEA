// src/pages/Home.tsx
import React, { useState, useEffect } from 'react'; // Added useState, useEffect
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import MenuCard from '../components/MenuCard';
import EventCard from '../components/EventCard';
import SocialFeed from '../components/SocialFeed';
import DailySpecialsSlider from '../components/DailySpecialsSlider';

// Remove static imports for data that will be fetched
// import { menuItems as staticMenuItems } from '../data/menuItems';
// import { events as staticEvents } from '../data/events';
// import { socialPosts as staticSocialPosts } from '../data/socialPosts';
// import { dailySpecials as staticDailySpecials } from '../data/dailySpecials';

import { DailySpecial, MenuItem, Event, SocialPost } from '../types'; // Import types
import { fetchDailySpecials, fetchMenuItems, fetchEvents, fetchSocialPosts } from '../services/firestoreService'; // Import our new function
// We will import other fetch functions as we implement them
import toast from 'react-hot-toast';


const Home: React.FC = () => {
  // State for fetched data
  const [dailySpecials, setDailySpecials] = useState<DailySpecial[]>([]);
  const [loadingSpecials, setLoadingSpecials] = useState(true);

  // const [featuredMenuItems, setFeaturedMenuItems] = useState<MenuItem[]>([]);
  
  // TODO: Add state and fetching for menuItems, events, socialPosts
  const [featuredMenuItems, setFeaturedMenuItems] = useState<MenuItem[]>([]);
  const [loadingFeaturedMenu, setLoadingFeaturedMenu] = useState(true);

  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loadingUpcomingEvents, setLoadingUpcomingEvents] = useState(true);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
// const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]); // State was already here
  const [loadingSocialPosts, setLoadingSocialPosts] = useState(true); // Added loading state



useEffect(() => {
    const getDailySpecials = async () => {
      try {
        setLoadingSpecials(true);
        const specials = await fetchDailySpecials();
        setDailySpecials(specials);
      } catch (error) {
        toast.error("Could not load daily specials.");
      } finally {
        setLoadingSpecials(false);
      }
    };

    const getFeaturedMenuItems = async () => {
      try {
        setLoadingFeaturedMenu(true);
        const items = await fetchMenuItems({ featuredOnly: true, count: 3 });
        setFeaturedMenuItems(items);
      } catch (error) {
        toast.error("Could not load featured menu items.");
      } finally {
        setLoadingFeaturedMenu(false);
      }
    };

    const getUpcomingEvents = async () => {
      try {
        setLoadingUpcomingEvents(true);
        // Fetch a slightly larger number if filtering client-side, or rely on admin curating well.
        // For now, let's fetch up to e.g. 6 events ordered by date.
        let events = await fetchEvents({ count: 6 }); // Fetches events ordered by date string asc.

        // Client-side filter for "upcoming" based on string date YYYY-MM-DD
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today to start of day

        const filteredUpcoming = events.filter(event => {
          if (event.recurring) return true; // Always show recurring events for simplicity on home
          try {
            const eventDate = new Date(event.date); // Assumes YYYY-MM-DD which JS Date constructor handles
            eventDate.setHours(0,0,0,0); // Normalize event date
            return eventDate >= today;
          } catch (e) {
            return false; // Invalid date string
          }
        }).slice(0, 3); // Then take the first 3 of these

        setUpcomingEvents(filteredUpcoming);
      } catch (error) {
        toast.error("Could not load upcoming events.");
      } finally {
        setLoadingUpcomingEvents(false);
      }
    };

    const getSocialPosts = async () => {
      try {
        setLoadingSocialPosts(true);
        // The SocialFeed component seems designed for 4 posts based on earlier static data
        const posts = await fetchSocialPosts({ count: 4 });
        setSocialPosts(posts);
      } catch (error) {
        toast.error("Could not load social posts.");
      } finally {
        setLoadingSocialPosts(false);
      }
    };

    getDailySpecials();
    getFeaturedMenuItems();
    getUpcomingEvents();
    getSocialPosts();

    // TODO: Fetch other data (events, social posts) here
  }, []);

  // Filter featured menu items (will be done after fetching menuItems)
  // const featuredMenuItems = menuItems.filter(item => item.featured).slice(0, 3);
  // Get upcoming events (first 3) (will be done after fetching events)
  // const upcomingEvents = events.slice(0, 3);

  return (
    <div>
      {/* Hero Section ... remains the same ... */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
              Experience the Vibrant Atmosphere of Red Sea Lounge
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Daily specials, weekly events, delicious food, and live sports in a stylish lounge setting.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md transition-colors duration-300"
              >
                View Our Menu
              </Link>
              <Link
                to="/contact"
                className="bg-transparent hover:bg-white/10 text-white border border-white py-3 px-6 rounded-md transition-colors duration-300"
              >
                Make a Reservation
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center">
                <MapPin className="mr-2 text-red-500" />
                <span>123 Nightlife Avenue, Downtown, City</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 text-red-500" />
                <span>Open 7 Days a Week</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 text-red-500" />
                {/* This could also be made dynamic if general hours change, but for now, static */}
                <span>Mon-Fri: 4PM-2AM | Sat-Sun: 12PM-2AM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section ... remains the same for now ... */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* ... about content ... */}
            </div>
        </div>
      </section>


      {/* Daily Specials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Daily Specials"
            subtitle="Something special every day of the week"
            center={true}
          />
          <div className="max-w-3xl mx-auto">
            {loadingSpecials ? (
              <p className="text-center text-gray-600">Loading specials...</p>
            ) : dailySpecials.length > 0 ? (
              <DailySpecialsSlider specials={dailySpecials} />
            ) : (
              <p className="text-center text-gray-600">Daily specials coming soon!</p>
            )}
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Featured Menu Items"
            subtitle="Discover our chef's signature creations"
            center={true}
          />
          {loadingFeaturedMenu ? (
            <p className="text-center text-gray-600">Loading featured items...</p>
          ) : featuredMenuItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredMenuItems.map(item => (
                <MenuCard key={item.docId} item={item} featured={true} /> // Key uses docId
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No featured items available at the moment.</p>
          )}
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="btn-primary" // Assuming btn-primary is defined or you use Tailwind
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Upcoming Events"
            subtitle="Join us for special nights and entertainment"
            center={true}
            light={true}
          />
          {loadingUpcomingEvents ? (
            <p className="text-center text-gray-300">Loading upcoming events...</p>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map(event => (
                <EventCard key={event.docId} event={event} /> // Key uses docId
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-300">No upcoming events scheduled at the moment. Check back soon!</p>
          )}
          <div className="text-center mt-10">
            <Link
              to="/events"
              className="btn-primary" // Assuming btn-primary is defined
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Follow Us on Instagram"
            subtitle="Stay updated with our latest happenings"
            center={true}
          />
          {loadingSocialPosts ? (
            <p className="text-center text-gray-500">Loading social feed...</p>
          ) : socialPosts.length > 0 ? (
            <SocialFeed posts={socialPosts} />
          ) : (
            <p className="text-center text-gray-500">No social posts to display at the moment.</p>
          )}
          <div className="text-center mt-10">
            <a
              href="#" // TODO: Add your actual Instagram profile URL
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-md transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
            >
              Follow @RedSeaLounge
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section ... remains the same ... */}
      <section 
        className="py-20 bg-cover bg-center relative" 
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1267351/pexels-photo-1267351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
      >
        {/* ... CTA content ... */}
      </section>
    </div>
  );
};

export default Home;