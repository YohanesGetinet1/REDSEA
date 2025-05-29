import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import MenuCard from '../components/MenuCard';
import EventCard from '../components/EventCard';
import SocialFeed from '../components/SocialFeed';
import DailySpecialsSlider from '../components/DailySpecialsSlider';
import { menuItems } from '../data/menuItems';
import { events } from '../data/events';
import { socialPosts } from '../data/socialPosts';
import { dailySpecials } from '../data/dailySpecials';

const Home: React.FC = () => {
  // Filter featured menu items
  const featuredMenuItems = menuItems.filter(item => item.featured).slice(0, 3);
  
  // Get upcoming events (first 3)
  const upcomingEvents = events.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
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
        
        {/* Location & Hours Banner */}
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
                <span>Mon-Fri: 4PM-2AM | Sat-Sun: 12PM-2AM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <SectionTitle
                title="Welcome to Red Sea Lounge"
                subtitle="A premier destination for food, drinks, and entertainment"
              />
              <p className="text-gray-700 mb-6">
                Located in the heart of the city, Red Sea Lounge offers a perfect blend of delicious cuisine, craft cocktails, and vibrant atmosphere. Whether you're looking for a casual dinner, drinks with friends, or a night of entertainment, we've got you covered.
              </p>
              <p className="text-gray-700 mb-6">
                Our full kitchen serves up a variety of delectable dishes, while our bar features an extensive selection of signature cocktails, wines, and craft beers. Enjoy live sports on our large screens, weekly events, and special themed nights.
              </p>
              <Link
                to="/about"
                className="inline-block bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition-colors duration-300"
              >
                Learn More About Us
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Lounge interior"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg mt-8">
                <img
                  src="https://images.pexels.com/photos/2734521/pexels-photo-2734521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Cocktail preparation"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Food dish"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg mt-8">
                <img
                  src="https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Lounge atmosphere"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
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
            <DailySpecialsSlider specials={dailySpecials} />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMenuItems.map(item => (
              <MenuCard key={item.id} item={item} featured={true} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-block bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition-colors duration-300"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/events"
              className="inline-block bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition-colors duration-300"
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
          <SocialFeed posts={socialPosts} />
          <div className="text-center mt-10">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-md transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
            >
              Follow @RedSeaLounge
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 bg-cover bg-center relative" 
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1267351/pexels-photo-1267351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience Red Sea Lounge?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join us for an unforgettable experience of food, drinks, and entertainment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md transition-colors duration-300"
              >
                Make a Reservation
              </Link>
              <Link
                to="/events"
                className="bg-transparent hover:bg-white/10 text-white border border-white py-3 px-6 rounded-md transition-colors duration-300"
              >
                View Upcoming Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;