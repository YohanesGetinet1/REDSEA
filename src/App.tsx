import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLayout from './components/AdminLayout';
import MenuEditor from './pages/admin/MenuEditor';
import EventEditor from './pages/admin/EventEditor';
import ScrollToTop from './utils/ScrollToTop';
import './index.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={
            <Routes>
              <Route
                path="menu"
                element={
                  <AdminLayout>
                    <MenuEditor />
                  </AdminLayout>
                }
              />
              <Route
                path="events"
                element={
                  <AdminLayout>
                    <EventEditor />
                  </AdminLayout>
                }
              />
            </Routes>
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