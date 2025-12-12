import React, { useState, useEffect } from 'react';
import { Send, Briefcase, ChevronDown } from 'lucide-react'; 

// Section components
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/skills";
import Projects from "../components/projects";
import Blogs from "../components/Blogs";
import Testimonials from "../components/Testimonials";
import Experience from "../components/Experience";
import Services from "../components/Services";
import Contact from '../components/contact';

// Navigation items
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

// Map section IDs to components
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
};

const Footer = () => (
  <footer className="bg-gray-50 py-12 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Anju Pavithran. All rights reserved.
      </p>
    </div>
  </footer>
);

export default function Home() {
  const [activeSection, setActiveSection] = useState(navigation[0].href);

  useEffect(() => {
    const initialHash = window.location.hash.substring(1);
    if (initialHash && sectionMap[initialHash]) {
      setActiveSection(initialHash);
    }
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
    window.location.hash = id;
  };

  // UPDATED NAVBAR
  const Header = () => (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-700 via-violet-900 to-purple-800 shadow-xl">
      <div className="max-w-[1400px] mx-auto w-full px-10">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <a
            href="#"
            onClick={() => handleNavClick('hero')}
            className="text-3xl font-extrabold text-white tracking-tight"
          >
            Anju Pavithran
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden sm:block">
            <ul className="flex space-x-10">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={`#${item.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`font-medium transition duration-150 relative text-white 
                    ${
                      activeSection === item.href
                        ? "after:w-full after:bg-white"
                        : "after:w-0 hover:after:w-full opacity-80 hover:opacity-100"
                    }
                    after:h-[2px] after:absolute after:bottom-[-6px] after:left-0 after:transition-all`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:hidden">
            <button className="text-white hover:opacity-80">
              <ChevronDown className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const ActiveSectionComponent = sectionMap[activeSection];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      {/* Padding top increased because navbar is fixed */}
      <main className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {ActiveSectionComponent ? <ActiveSectionComponent /> : <Hero />}
      </main>

      <Footer />
    </div>
  );
}
