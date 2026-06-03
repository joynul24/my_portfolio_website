import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      <motion.div
        className="relative w-24 h-24 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <span className="block w-full h-full rounded-full border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></span>
        <span className="block w-16 h-16 rounded-full border-4 border-b-purple-500 border-t-transparent border-r-transparent border-l-transparent absolute"></span>
      </motion.div>
      <motion.div 
        className="absolute mt-32 text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        LOADING...
      </motion.div>
    </div>
  );
};

export default Loader;