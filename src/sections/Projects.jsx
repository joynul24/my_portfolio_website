import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const tabs = ['All', 'Static', 'Frontend', 'Full Stack'];

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');

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
      : allProjects.filter(
        (project) => project.category === activeTab
      )
    : [];

  return (
    <section id="projects" className="py-20 bg-transparent border-t border-slate-800/50 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My <span className="text-cyan-400">Journey</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-8"></div>

          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab
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
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
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
                      {/* Screenshot */}
                      <div
                        className="
      h-[800px]
      w-full
      bg-top
      bg-cover
      transition-all
      duration-[8000ms]
      ease-linear
      group-hover:bg-bottom
    "
                        style={{
                          backgroundImage: `url(${project.image})`,
                        }}
                      />

                      {/* Overlay */}
                      <div
                        className="
      absolute inset-0
      bg-slate-900/60
      opacity-0
      group-hover:opacity-100
      transition-opacity
      duration-300
      flex
      items-center
      justify-center
      gap-4
    "
                      >
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="
          p-3
          bg-cyan-500
          text-slate-900
          rounded-full
          hover:scale-110
          transition-transform
        "
                          >
                            <FiExternalLink size={20} />
                          </a>
                        )}

                        {project.codeLink && (
                          <a
                            href={project.codeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="
          p-3
          bg-slate-700
          text-white
          rounded-full
          hover:scale-110
          transition-transform
        "
                          >
                            <FiGithub size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
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
      </div>
    </section>
  );
};

export default Projects;