// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import ScrollToTop from './utils/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

import Home from './pages/Home';
import Menu from './pages/Menu';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage from './pages/admin/LoginPage';
import MenuEditor from './pages/admin/MenuEditor';
import EventEditor from './pages/admin/EventEditor';
import DailySpecialsEditor from './pages/admin/DailySpecialsEditor';
import BusinessHoursEditor from './pages/admin/BusinessHoursEditor';
import SocialPostsEditor from './pages/admin/SocialPostsEditor';
import TeamMembersEditor from './pages/admin/TeamMembersEditor'; 

import './index.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin routes are now wrapped with ProtectedRoute */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="menu" element={<MenuEditor />} />
                  <Route path="events" element={<EventEditor />} />
                  {/* Add more admin sub-routes here if needed */}
                  <Route path="specials" element={<DailySpecialsEditor />} />
                  <Route path="hours" element={<BusinessHoursEditor />} />
                  <Route path="social" element={<SocialPostsEditor />} />
                  <Route path="team" element={<TeamMembersEditor />} />
                  <Route index element={<MenuEditor />} /> {/* Default admin page */}
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Consider adding a 404 Not Found page for public routes */}
                  {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;