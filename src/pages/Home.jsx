import React, { useState, useEffect } from 'react';
import { Send, Briefcase, ChevronDown } from 'lucide-react'; 

// 1. Import all required section components (Ensuring consistent capitalization)
import Hero from "../components/Hero"; 
import About from "../components/About";
import Skills from "../components/skills"; // Assuming you fix the typo in the import path
import Projects from "../components/projects";
import Blogs from "../components/Blogs";
import Testimonials from "../components/Testimonials";
import Experience from "../components/Experience";
import Services from "../components/Services";
import Contact from '../components/contact'; 
// Note: Since we are rendering Contact inline, we don't strictly need the import here, 
// but it's good practice if you separate it later.

// --- Shared Data (kept here for single-file template) ---
const navigation = [
  { name: 'Home', href: 'hero' },
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Services', href: 'services' },
  { name: 'Experience', href: 'experience' },
  { name: 'Blog', href: 'blogs' },
  { name: 'Testimonials', href: 'testimonials' },
  { name: 'Contact', href: 'contact' },
];

// Map section IDs to their components for easy rendering
const sectionMap = {
  hero: Hero,
  about: About,
  skills: Skills,
  projects: Projects,
  services: Services,
  experience: Experience,
  blogs: Blogs,
  testimonials: Testimonials,
  contact: Contact,
  // 'contact' will be handled manually below
};

// --- Sub-Components for Layout ---

const Footer = () => (
  <footer className="bg-gray-50 py-12 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Anju Pavithran. All rights reserved.
      </p>
    </div>
  </footer>
);

// --- Main Page Component ---

export default function Home() {
  // State to track the active section ID
  const [activeSection, setActiveSection] = useState(navigation[0].href);
  
  // Set the initial active section based on URL hash (e.g., #about)
  useEffect(() => {
    const initialHash = window.location.hash.substring(1);
    if (initialHash && sectionMap[initialHash] || initialHash === 'contact') {
      setActiveSection(initialHash);
    }
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
    // Update the URL hash to maintain history and allow direct links
    window.location.hash = id;
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
      // THE CRITICAL FIX: PREVENT DEFAULT BROWSER FORM SUBMISSION
      e.preventDefault(); 
      alert("Message Sent! (Form submission handled in React)");
      // Add your actual form submission logic here (e.g., fetch, axios, etc.)
  };

  // The Header now uses the state management
  const Header = () => (
    <header className="sticky top-0 z-70 bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="w-full px-6 sm:px-13 lg:px-12">

              <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#" onClick={() => handleNavClick('hero')} className="text-2xl font-extrabold text-indigo-600 tracking-tight">
            Anju Pavithran
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden sm:block">
            <ul className="flex space-x-6">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={`#${item.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`
                      font-medium transition duration-150 relative 
                      ${activeSection === item.href 
                        ? 'text-indigo-600 after:w-full after:bg-indigo-600' 
                        : 'text-gray-600 hover:text-indigo-600 after:w-0 hover:after:w-full'}
                      after:h-[2px] after:absolute after:bottom-[-4px] after:left-0 after:transition-all
                    `}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          
          
          {/* Mobile menu icon (Placeholder) */}
          <div className="sm:hidden">
            <button className="text-gray-600 hover:text-indigo-600">
              <ChevronDown className="w-6 h-6" /> 
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  // Component that renders the correct section based on state
  const ActiveSectionComponent = sectionMap[activeSection];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* RENDER ONLY THE ACTIVE SECTION (excluding contact) */}
        {activeSection !== 'contact' && ActiveSectionComponent ? (
          <ActiveSectionComponent />
        ) : (
          // Fallback to Hero if component is not found
          activeSection !== 'contact' && <Hero />
        )}
        
       
        
      </main>
      
      <Footer />
    </div>
  );
}