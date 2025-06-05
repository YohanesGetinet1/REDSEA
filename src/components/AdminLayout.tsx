import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Settings, Calendar, Menu as MenuIcon, Star, Clock, Share2, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth'; // Import useAuth hook

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/admin/menu', label: 'Menu Items', icon: MenuIcon },
    { path: '/admin/events', label: 'Events', icon: Calendar },
    // Add other admin sections here as needed
    { path: '/admin/specials', label: 'Daily Specials', icon: Star },
    { path: '/admin/hours', label: 'Business Hours', icon: Clock },
    { path: '/admin/social', label: 'Social Posts', icon: Share2 },
    { path: '/admin/team', label: 'Team Members', icon: Users },
    // { path: '/admin/team', label: 'Team Members', icon: Users },
  ];

  if (authLoading) {
    // You can return a loading spinner or a blank page while auth state is resolving
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page if not authenticated
    // Pass the current location to redirect back after login (optional)
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="text-red-600" />
              <span className="font-semibold text-xl">Admin Dashboard</span>
            </div>
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              View Website
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <nav>
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                            location.pathname.startsWith(item.path) // Use startsWith for active parent routes
                              ? 'bg-red-50 text-red-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <Icon size={18} />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          <main className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;