import React from 'react';

const Footer = () => {
  // dummy data
  const stats = {
    views: 12470,
    likes: 10250
  };

  return (
    <footer className="bg-transparent py-8 border-t border-slate-800/50 relative z-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

        {/* Logo */}
        <div className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 md:mb-0">
          Joynul<span className="text-white">.</span>
        </div>

        {/* Dummy Stats */}
        <div className="text-slate-400 text-sm flex items-center gap-4 mb-4 md:mb-0">
          <span>👀 Views: {stats.views}</span>
          <span>❤️ Likes: {stats.likes}</span>
        </div>

        {/* Copyright */}
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Joynul. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;