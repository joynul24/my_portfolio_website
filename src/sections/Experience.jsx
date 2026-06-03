import React from 'react';
import { motion } from "framer-motion";
import { Building2, MapPin, CalendarDays } from 'lucide-react';


const experiences = [
  {
    title: "MERN Stack Developer",
    company: "Self-Learning & Freelance Projects",
    location: "Bangladesh",
    date: "2024 - Present",
    description: [
      "Building full-stack web applications using MongoDB, Express.js, React, and Node.js.",
      "Developing responsive and user-friendly interfaces with React and Tailwind CSS.",
      "Implementing authentication, authorization, REST APIs, and database integration.",
      "Continuously learning modern web technologies and software engineering best practices."
    ],
    skills: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"]
  },
  {
    title: "EarnZone - Micro Task Platform",
    company: "Personal Project",
    location: "Full Stack Development",
    date: "2025",
    description: [
      "Developed a complete MERN stack micro-task and earning platform.",
      "Implemented role-based dashboards for Admin, Buyer, and Worker users.",
      "Integrated Firebase Authentication, JWT authorization, and MongoDB database.",
      "Built task management, coin system, withdrawal requests, and payment functionality."
    ],
    skills: ["React", "Express.js", "MongoDB", "Firebase", "JWT"]
  },
  {
    title: "Professional Portfolio Website",
    company: "Personal Branding Project",
    location: "Frontend & Backend Development",
    date: "2025",
    description: [
      "Designed and developed a modern portfolio website with responsive design.",
      "Integrated dynamic project and profile management using MongoDB.",
      "Added contact form functionality with email integration.",
      "Implemented animations and interactive UI using Framer Motion."
    ],
    skills: ["React", "Tailwind CSS", "MongoDB", "Express.js", "Framer Motion"]
  },
  {
    title: "Smart Attendance System",
    company: "University Innovation Project",
    location: "Research & Development",
    date: "2025",
    description: [
      "Designed a QR code-based attendance management system.",
      "Focused on reducing proxy attendance and improving attendance tracking.",
      "Planned real-time attendance monitoring and reporting features.",
      "Created scalable architecture for future university deployment."
    ],
    skills: ["React", "Node.js", "MongoDB", "QR Code", "REST API"]
  }
];



const Experience = () => {
  return (
    <section id="experience-timeline" className="py-20 relative z-10 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
             Work Experience
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            My professional journey in frontend development and the impactful projects I've worked on.
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Timeline Line (Desktop center, Mobile left) */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 md:-translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-purple-500 transform -translate-x-1/2 mt-8 md:mt-0 z-10 ring-4 ring-slate-900"></div>

                  {/* Empty space for alignment on Desktop */}
                  <div className="hidden md:block w-5/12"></div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 pl-16 md:pl-0 relative`}>
                    <ExperienceCard exp={exp} isEven={isEven} index={index} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ exp, isEven, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-slate-800/80 transition-all duration-300 text-left flex flex-col w-full shadow-xl shadow-black/20`}
    >
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{exp.title}</h3>
      
      <div className={`flex flex-col xl:flex-row xl:items-center gap-2 xl:gap-4 text-sm text-gray-400 mb-6`}>
        <div className="flex items-center gap-1.5">
          <Building2 size={16} className="text-purple-400 shrink-0" />
          <span>{exp.company}</span>
        </div>
        <div className="hidden xl:block w-1 h-1 rounded-full bg-gray-600"></div>
        <div className="flex items-center gap-1.5">
          <MapPin size={16} className="text-cyan-400 shrink-0" />
          <span>{exp.location}</span>
        </div>
        <div className="hidden xl:block w-1 h-1 rounded-full bg-gray-600"></div>
        <div className="flex items-center gap-1.5">
          <CalendarDays size={16} className="text-purple-400 shrink-0" />
          <span>{exp.date}</span>
        </div>
      </div>

      <ul className={`space-y-3 mb-8 w-full text-sm text-gray-300`}>
        {exp.description.map((desc, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-purple-500 mt-[2px] shrink-0 text-base leading-none">•</span>
            <span className="leading-relaxed">{desc}</span>
          </li>
        ))}
      </ul>

      <div className={`flex flex-wrap gap-2 mt-auto`}>
        {exp.skills.map((skill, i) => (
          <span 
            key={i} 
            className="px-3 py-1.5 text-xs font-medium bg-slate-900/80 text-gray-300 border border-white/5 rounded hover:bg-white/10 hover:text-white transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;