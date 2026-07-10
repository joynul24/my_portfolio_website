import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Experience', to: 'experience' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="space-grotesk container mx-auto px-6 md:px-12 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="jetbrains-mono text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 cursor-pointer"
        >
          Joynul<span className="text-white">.dev</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6">
            {navLinks.map((link, i) => (
              <Link 
                key={i} 
                to={link.to} 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500}
                className="text-slate-300 hover:text-cyan-400 cursor-pointer text-sm font-medium transition-colors"
                activeClass="text-cyan-400"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <a 
            href="https://rxresu.me/joynula919/joynul-abedin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 transition-all font-medium text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
          >
            View Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-200 text-2xl">
            {mobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 shadow-2xl py-6 flex flex-col items-center gap-6"
        >
          {navLinks.map((link, i) => (
            <Link 
              key={i} 
              to={link.to} 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-cyan-400 text-lg font-medium cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="https://rxresu.me/joynula919/joynul-abedin" 
            target="_blank" 
            className="px-6 py-2 rounded-full bg-cyan-500 text-slate-900 font-semibold"
          >
            Resume
          </a>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;