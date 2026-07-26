import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaEye, FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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

  // Social Links Array
  const socialLinks = [
    { icon: <FaLinkedin size={18} />, href: "https://www.linkedin.com/in/devjoynul/", label: "LinkedIn" },
    { icon: <FaGithub size={18} />, href: "https://github.com/joynul24", label: "GitHub" },
    { icon: <FaFacebook size={18} />, href: "https://web.facebook.com/devjoynul", label: "Facebook" },
    { icon: <FaInstagram size={18} />, href: "https://www.instagram.com/devjoynul/", label: "Instagram" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-4 transition-all duration-500">
      <div 
        className={`mx-auto flex items-center justify-between transition-all duration-500 px-6 py-3 space-grotesk relative
          ${isScrolled 
            ? 'w-[90%] md:w-[85%] bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)]' 
            : 'w-[95%] bg-transparent border border-transparent rounded-none'
          }`}
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="jetbrains-mono text-xl md:text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 cursor-pointer"
        >
          Joynul<span className="text-white">.dev</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6">
            {navLinks.map((link, i) => (
              <Link 
                key={i} 
                to={link.to} 
                spy={true} 
                smooth={true} 
                offset={-90} 
                duration={500}
                className="text-slate-300 hover:text-white cursor-pointer text-sm font-medium transition-colors relative py-1 group"
                activeClass="text-cyan-400"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <a 
            href="https://rxresu.me/joynula919/joynul-abedin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm shadow-[0_0_15px_rgba(168,85,247,0.3)] bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-1 w-full md:w-auto"
          >
            <FaEye size={15}/>
            <span>View Resume</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden z-50"> 
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-slate-200 text-2xl p-2 bg-slate-800/80 rounded-full border border-slate-700/50 hover:bg-slate-800 transition-colors flex items-center justify-center"
          >
            {mobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed top-[85px] left-[5%] w-[90%] bg-slate-900/95 backdrop-blur-2xl border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-8 rounded-3xl flex flex-col items-center gap-6 z-50"
          >
            {navLinks.map((link, i) => (
              <Link 
                key={i} 
                to={link.to} 
                spy={true} 
                smooth={true} 
                offset={-90} 
                duration={500}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400 text-lg font-medium cursor-pointer transition-colors w-full text-center py-2"
              >
                {link.name}
              </Link>
            ))}
            
            <a 
              href="https://rxresu.me/joynula919/joynul-abedin" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-[80%] px-6 py-3 rounded-full bg-gradient-to-r text-sm shadow-lg from-cyan-500 to-blue-500 text-white font-semibold"
            >
              <FaEye size={15} />
              <span>Resume</span>
            </a>

            {/* Social Media Icons (Resume Button-এর নিচে) */}
            <div className="flex items-center gap-4 pt-2 border-t border-slate-800/80 w-[80%] justify-center">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 bg-slate-800/60 rounded-full text-slate-300 hover:text-cyan-400 hover:bg-slate-800 border border-slate-700/50 transition-all hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;