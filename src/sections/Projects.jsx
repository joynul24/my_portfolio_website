import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink as LinkIcon, FiGithub as GithubIcon } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

const tabs = [
  'All', 
  'E-Commerce', 
  'FinTech & Productivity',
  'Real Estate & Property', 
  'Non-Profit & Community', 
  'Travel & Tourism', 
  'Healthcare & Wellness', 
  'Education & E-Learning', 
  'Agency & Portfolio', 
  'Food & Delivery'
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const { data: allProjects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await axiosInstance.get('/projects');
      return Array.isArray(res.data) ? res.data : [];
    }
  });

  const filteredProjects = Array.isArray(allProjects)
    ? activeTab === 'All'
      ? allProjects
      : allProjects.filter((project) => project.category === activeTab)
    : [];

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-20 bg-transparent border-t border-slate-800/50 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="space-grotesk text-cyan-400">Journey</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-8"></div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setShowAll(false);
                }}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center text-center py-20 px-4 bg-slate-900/40 border border-slate-800/60 rounded-3xl max-w-lg mx-auto backdrop-blur-sm"
          >
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-[0_0_30px_rgba(6,182,212,0.1)] mb-6 text-slate-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-cyan-400/80">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18a2.25 2.25 0 012.25 2.25v4.5A2.25 2.25 0 0118 22.5H6a2.25 2.25 0 01-2.25-2.25v-4.5a2.25 2.25 0 012.25-2.25zM6.75 6.75h10.5a2.25 2.25 0 012.25 2.25v2.25H4.5V9a2.25 2.25 0 012.25-2.25z" />
              </svg>
            </motion.div>

            <h3 className="space-grotesk text-xl font-semibold text-white mb-2">
              No Projects Found in <span className="text-cyan-400">{activeTab}</span>
            </h3>
            <p className="text-slate-400 text-sm max-w-sm">
              There are currently no projects listed under this category. Stay tuned for updates!
            </p>
          </motion.div>

        ) : (
          
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {displayedProjects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-[1px] rounded-2xl overflow-hidden group hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-slate-700 transition-opacity duration-300 group-hover:opacity-0"></div>
                  <div className="absolute inset-[-200%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#06b6d4_30%,transparent_50%,#a855f7_80%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative bg-slate-800 rounded-[15px] overflow-hidden h-full flex flex-col">
                    <div className="h-60 overflow-hidden relative group">
                      <div
                        className="h-[800px] w-full bg-top bg-cover transition-all duration-[8000ms] ease-linear group-hover:bg-bottom"
                        style={{ backgroundImage: `url(${project.image})` }}
                      />

                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noreferrer" className="p-3 bg-cyan-500 text-slate-900 rounded-full hover:scale-110 transition-transform">
                            <LinkIcon size={20} />
                          </a>
                        )}
                        {project.codeLink && (
                          <a href={project.codeLink} target="_blank" rel="noreferrer" className="p-3 bg-slate-700 text-white rounded-full hover:scale-110 transition-transform">
                            <GithubIcon size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="space-grotesk text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                      <div className="jetbrains-mono flex flex-wrap gap-2">
                        {project.tags?.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs text-cyan-400 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredProjects.length > 6 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full bg-cyan-500 text-slate-900 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-105 transition-all duration-300"
            >
              {showAll ? 'Show Less' : 'See All Projects'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;