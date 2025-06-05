// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, GlassWater, UserCircle, LogOut } from 'lucide-react'; // Added LogOut
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useAuth } from '../hooks/useAuth'; // Import useAuth hook
import { auth } from '../firebase/config'; // Import auth for signOut
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth(); // Use our auth hook

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error("Error logging out: ", error);
      toast.error('Failed to log out.');
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Avoid rendering mismatch during initial auth check
  if (authLoading) {
    // You could return a minimal header or null, or a loading spinner
    // For simplicity, let's render the structure but links might briefly change
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-red-500 font-bold text-2xl"
          >
            <GlassWater className="h-8 w-8" />
            <span className="tracking-wider">RED SEA LOUNGE</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-white hover:text-red-400 transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-red-500 font-semibold'
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to="/admin/menu" // Or a general admin dashboard path
                  className="flex items-center text-white hover:text-red-400 transition-colors duration-300"
                >
                  <UserCircle size={18} className="mr-1" />
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white hover:text-red-400 transition-colors duration-300"
                >
                  <LogOut size={18} className="mr-1" />
                  Logout
                </button>
              </>
            ) : (
              !authLoading && ( // Only show login if not loading and no user
                <Link
                  to="/admin/login"
                  className="text-white hover:text-red-400 transition-colors duration-300"
                >
                  Admin Login
                </Link>
              )
            )}
            <Link
              to="/contact"
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
            >
              Reserve Now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-red-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 animation-fade-in">
            <ul className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`block text-white hover:text-red-400 py-2 transition-colors ${
                      location.pathname === item.path
                        ? 'text-red-500 font-semibold'
                        : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                {user ? (
                  <>
                    <Link
                      to="/admin/menu"
                      className="flex items-center text-white hover:text-red-400 py-2 transition-colors"
                    >
                      <UserCircle size={18} className="mr-2" />
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left text-white hover:text-red-400 py-2 transition-colors"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                 !authLoading && ( // Only show login if not loading and no user
                    <Link
                      to="/admin/login"
                      className="flex items-center text-white hover:text-red-400 py-2 transition-colors"
                    >
                      <UserCircle size={18} className="mr-2" />
                      Admin Login
                    </Link>
                  )
                )}
              </li>
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="block bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-center transition-colors duration-300"
                >
                  Reserve Now
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;