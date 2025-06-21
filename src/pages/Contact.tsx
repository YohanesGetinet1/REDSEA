// src/pages/Contact.tsx
import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react'; // Removed Clock, not used here directly
// Removed: import { businessHours as staticBusinessHours } from '../data/businessHours';
import { BusinessHours as BusinessHoursType } from '../types';
import { fetchBusinessHours } from '../services/firestoreService'; // Import the fetching function
import toast from 'react-hot-toast';


const Contact: React.FC = () => {
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

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with us for reservations, inquiries, or feedback"
        bgImage="https://images.pexels.com/photos/1267351/pexels-photo-1267351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionTitle
                title="Get In Touch"
                subtitle="We'd love to hear from you"
              />

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                {/* TODO: Make Contact Info dynamic from Firestore? */}
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="mr-3 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <span className="block font-medium">Address</span>
                      <span className="text-gray-700">4263 E Main St, Columbus, OH 43213</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Phone className="mr-3 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <span className="block font-medium">Phone</span>
                      <a href="tel:+11234567890" className="text-gray-700 hover:text-red-600 transition-colors">
                        +1 (740) 564-4979
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="mr-3 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <span className="block font-medium">Email</span>
                      <a href="mailto:info@redsealounge.com" className="text-gray-700 hover:text-red-600 transition-colors">
                        redsealounge12@gmail.com
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                {loadingHours ? (
                  <p className="text-gray-700">Loading hours...</p>
                ) : businessHours.length > 0 ? (
                  <ul className="space-y-2">
                    {businessHours.map((item) => (
                      <li key={item.docId || item.day} className="flex justify-between">
                        <span className="font-medium">{item.day}</span>
                        <span className="text-gray-700">{item.hours}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">Business hours not available.</p>
                )}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                 {/* TODO: Make Social links dynamic from Firestore? */}
                <p className="text-gray-700 mb-4">
                  Follow us on social media for the latest updates, events, and special promotions.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
              <ContactForm /> {/* ContactForm submission will be a later step for Firebase */}
            </div>
          </div>
        </div>
      </section>

      {/* ... (rest of the Contact page JSX: Map, FAQ) ... */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
            <SectionTitle
            title="Find Us"
            subtitle="Visit Red Sea Lounge in downtown"
            center={true}
            />
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-[450px] w-full">
                <div className="bg-gray-300 h-full w-full flex items-center justify-center">
                <p className="text-gray-700">Google Maps would be embedded here in a real implementation.</p>
                </div>
            </div>
            </div>
        </div>
        </section>

        <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Find answers to common inquiries"
            center={true}
            />
            {/* TODO: FAQs could also be made dynamic */}
            <div className="max-w-3xl mx-auto">
                {/* ... FAQ items ... */}
            </div>
        </div>
        </section>
    </div>
  );
};

export default Contact;