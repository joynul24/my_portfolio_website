import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const About = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await axiosInstance.get('/profile');
      return res.data;
    }
  });

  return (
    <section id="about" className="py-20 bg-transparent border-t border-slate-800/50 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="space-grotesk text-3xl md:text-5xl font-bold mb-4">About <span className="text-cyan-400">Me</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative group rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <div className="absolute inset-0 bg-cyan-500/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              {/* As requested, first picture in about section. Using standard professional placeholder or user provided style */}
              <img 
                src="/about-img.jpeg" 
                alt="Joynul About" 
                className="w-full max-w-sm rounded-2xl scale-100 group-hover:scale-105 transition-transform duration-700 object-cover grayscale group-hover:grayscale-0"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800&q=80" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-slate-300"
          >
            <h3 className="space-grotesk text-2xl font-semibold text-white">{profile?.title || 'Transforming Ideas into Exceptional Digital Experiences'}</h3>
            <p className="leading-relaxed text-lg">
              {profile?.description1 || 'I am Joynul, a passionate Full Stack Developer with expertise in the MERN stack. I specialize in building robust, beautifully animated, and responsive web applications that solve real-world problems.'}
            </p>
            <p className="leading-relaxed text-lg">
              {profile?.description2 || 'My journey involves constant learning and implementing clean architecture, focusing on performance, scalability, and seamless UI/UX design. When I\'m not writing code, I love exploring new technologies and writing technical blogs.'}
            </p>
            
            <div className="space-grotesk grid grid-cols-2 gap-6 pt-6">
              <div className="relative p-[1px] rounded-xl overflow-hidden group hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
                <div className="absolute inset-0 bg-slate-700 transition-opacity duration-300 group-hover:opacity-0"></div>
                <div className="absolute inset-[-200%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#06b6d4_30%,transparent_50%,#a855f7_80%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-4 rounded-[11px] bg-slate-800 h-full w-full flex flex-col">
                  <h4 className="text-3xl font-bold text-cyan-400 mb-2">{profile?.experience || '5+'}</h4>
                  <p className="text-sm uppercase tracking-wider font-medium text-slate-400">Years of Experience</p>
                </div>
              </div>
              <div className="relative p-[1px] rounded-xl overflow-hidden group hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
                <div className="absolute inset-0 bg-slate-700 transition-opacity duration-300 group-hover:opacity-0"></div>
                <div className="absolute inset-[-200%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#a855f7_30%,transparent_50%,#06b6d4_80%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-4 rounded-[11px] bg-slate-800 h-full w-full flex flex-col">
                  <h4 className="text-3xl font-bold text-purple-400 mb-2">{profile?.projects || '150+'}</h4>
                  <p className="text-sm uppercase tracking-wider font-medium text-slate-400">Projects Completed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;