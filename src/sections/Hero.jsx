import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section id="home" className="pt-20 pb-20 md:pt-48 md:pb-32 min-h-screen flex items-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -z-10 mix-blend-screen animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -z-10 mix-blend-screen animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-10 left-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl -z-10 mix-blend-screen animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-3 md:space-y-6"
        >
          <h3 className="text-cyan-400 font-medium tracking-wide uppercase text-sm md:text-base">Welcome to my world</h3>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Joynul</span>
            <br />
            <div className="text-3xl md:text-4xl lg:text-5xl mt-2 leading-tight">
              <Typewriter
                options={{
                  strings: ['MERN Stack Developer', 'Problem Solver', 'React Specialist','Lifelong Learner'],
                  autoStart: true,
                  loop: true,
                  wrapperClassName: "text-slate-200",
                  cursorClassName: "text-cyan-400"
                }}
              />
            </div>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
            I build modern, scalable, and beautifully animated web applications. Passionate about creating seamless user experiences.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              to="projects" 
              spy={true} 
              smooth={true} 
              className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-1 w-full md:w-auto"
            >
              View My Work
            </Link>
            <Link 
              to="contact" 
              spy={true} 
              smooth={true} 
              className="px-8 py-3 rounded-full border border-slate-700 hover:border-purple-500 text-slate-300 hover:text-white cursor-pointer transition-all transform hover:-translate-y-1 w-full md:w-auto"
            >
              Get In Touch
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full p-2 bg-gradient-to-tr from-cyan-500 via-purple-500 to-blue-500">
            <div className="absolute inset-2 bg-slate-900 rounded-full"></div>
            {/* Provided Image per user request */}
            <img 
              src="/banner-img.png" 
              alt="Joynul" 
              className="absolute inset-0 w-full h-full object-cover rounded-full p-4 hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;