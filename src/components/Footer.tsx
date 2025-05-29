import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassWater, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { businessHours } from '../data/businessHours';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks for subscribing with ${email}! You'll receive our updates soon.`);
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
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-red-500 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-red-500 transition-colors">Menu</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-red-500 transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-red-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-red-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-red-500 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-red-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">123 Nightlife Avenue, Downtown, City, ST 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-red-500 flex-shrink-0" />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-red-500 flex-shrink-0" />
                <span className="text-gray-400">info@redsealounge.com</span>
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
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Hours */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4 text-center">Business Hours</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {businessHours.map((item) => (
              <div key={item.day} className="text-center">
                <p className="font-medium">{item.day}</p>
                <p className="text-gray-400 text-sm">{item.hours}</p>
              </div>
            ))}
          </div>
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