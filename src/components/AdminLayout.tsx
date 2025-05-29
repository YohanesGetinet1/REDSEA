import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Settings, Calendar, Menu as MenuIcon } from 'lucide-react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In a real app, this would check for actual authentication
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const location = useLocation();
  
  const navItems = [
    { path: '/admin/menu', label: 'Menu Items', icon: MenuIcon },
    { path: '/admin/events', label: 'Events', icon: Calendar },
  ];

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
                            location.pathname === item.path
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