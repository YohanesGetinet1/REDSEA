import React from 'react';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import TeamMemberCard from '../components/TeamMemberCard';
import { teamMembers } from '../data/team';

const About: React.FC = () => {
  return (
    <div>
      <PageHero
        title="About Red Sea Lounge"
        subtitle="Our story, our team, and our passion for great food and entertainment"
        bgImage="https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <SectionTitle
                title="Our Story"
                subtitle="The journey behind Red Sea Lounge"
              />
              <p className="text-gray-700 mb-4">
                Founded in 2018, Red Sea Lounge was born from a passion for creating an exceptional dining and entertainment experience. Our vision was to create a space where people could enjoy great food, innovative cocktails, and vibrant entertainment in a sophisticated yet welcoming atmosphere.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small cocktail bar has evolved into a full-service lounge featuring a complete kitchen, weekly events, and a reputation as one of the city's premier nightlife destinations.
              </p>
              <p className="text-gray-700">
                Today, Red Sea Lounge continues to grow and evolve, but our commitment to quality, service, and creating memorable experiences remains unchanged.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Red Sea Lounge interior"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <SectionTitle
            title="Our Mission"
            subtitle="What drives us every day"
            center={true}
          />
          <p className="text-gray-700 text-lg mb-6">
            At Red Sea Lounge, our mission is to provide an unforgettable experience for every guest who walks through our doors. We believe in creating a space where people can connect, celebrate, and create lasting memories.
          </p>
          <p className="text-gray-700 text-lg">
            We are committed to culinary excellence, exceptional service, and fostering a vibrant community through our events and atmosphere. Every aspect of Red Sea Lounge is designed with our guests' enjoyment in mind.
          </p>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-red-800 text-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Values"
            subtitle="The principles that guide us"
            center={true}
            light={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-200">
                We are committed to excellence in everything we do, from the ingredients we use to the entertainment we provide.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-3">Hospitality</h3>
              <p className="text-gray-200">
                We believe in creating a welcoming environment where every guest feels valued and well taken care of.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-200">
                We continuously seek new ways to surprise and delight our guests, from creative cocktails to unique events.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-200">
                We are proud to be part of our local community and strive to create a space where people can connect.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-gray-200">
                We are committed to environmentally responsible practices in our operations and sourcing.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-3">Passion</h3>
              <p className="text-gray-200">
                We bring enthusiasm and dedication to our work every day, and it shows in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet the Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Meet Our Team"
            subtitle="The talented individuals behind Red Sea Lounge"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="What Our Guests Say"
            subtitle="Read testimonials from our valued patrons"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {'★★★★★'.split('').map((star, index) => (
                    <span key={index}>{star}</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The atmosphere is electric, the cocktails are innovative, and the food is outstanding. Red Sea Lounge has become my favorite weekend spot!"
              </p>
              <p className="font-semibold">- Michelle K.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {'★★★★★'.split('').map((star, index) => (
                    <span key={index}>{star}</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "I hosted my birthday party here and it was perfect! The staff took care of everything, and my guests are still talking about the amazing experience."
              </p>
              <p className="font-semibold">- James L.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {'★★★★★'.split('').map((star, index) => (
                    <span key={index}>{star}</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The live jazz nights are incredible. Great music, fantastic drinks, and a sophisticated vibe. It's like stepping into another world."
              </p>
              <p className="font-semibold">- Sarah T.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Our Team */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Passionate about hospitality? We're always looking for talented individuals to join our team.
            Check out our current openings or send us your resume.
          </p>
          <button
            className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md transition-colors duration-300"
            onClick={() => window.location.href = '/contact'}
          >
            View Open Positions
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;