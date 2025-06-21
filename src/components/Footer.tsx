import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlassWater, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
// Removed: import { businessHours as staticBusinessHours } from '../data/businessHours';
import { BusinessHours as BusinessHoursType } from '../types'; // Use the type
import { fetchBusinessHours } from '../services/firestoreService'; // Import the fetching function
import toast from 'react-hot-toast';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [businessHours, setBusinessHours] = useState<BusinessHoursType[]>([]);
  const [loadingHours, setLoadingHours] = useState(true);

  useEffect(() => {
    const getHours = async () => {
      try {
        setLoadingHours(true);
        const hours = await fetchBusinessHours();
        setBusinessHours(hours);
      } catch (error) {
        toast.error("Could not load business hours.");
        console.error(error);
      } finally {
        setLoadingHours(false);
      }
    };
    getHours();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Consider saving subscriber emails to Firebase (e.g., a 'subscribers' collection)
    toast.success(`Thanks for subscribing with ${email}! You'll receive our updates soon.`);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-red-500 font-bold text-xl mb-4">
              <GlassWater className="h-6 w-6" />
              <span className="tracking-wider">RED SEA LOUNGE</span>
            </Link>
            <p className="text-gray-400 mb-4">
              A vibrant local lounge known for daily drink specials, weekly events, full kitchen, and live sports streaming.
            </p>
            <div className="flex space-x-4">
              {/* TODO: Make social links dynamic from Firestore? */}
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-red-500 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">Home</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-red-500 transition-colors">Menu</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-red-500 transition-colors">Events</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-red-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-red-500 pb-2 inline-block">Contact Us</h3>
            {/* TODO: Make contact info dynamic from Firestore? */}
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-red-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">4263 E Main St, Columbus, OH 43213</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-red-500 flex-shrink-0" />
                <span className="text-gray-400">+1 (740) 564-4979</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-red-500 flex-shrink-0" />
                <span className="text-gray-400">redsealounge12@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-red-500 pb-2 inline-block">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for exclusive updates, promotions, and events.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Hours */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4 text-center">Business Hours</h3>
          {loadingHours ? (
            <p className="text-center text-gray-400">Loading hours...</p>
          ) : businessHours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
              {businessHours.map((item) => (
                <div key={item.docId || item.day} className="text-center"> {/* Use docId if available, fallback to day */}
                  <p className="font-medium">{item.day}</p>
                  <p className="text-gray-400 text-sm">{item.hours}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">Business hours not available.</p>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Red Sea Lounge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;