import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGithub, FaTerminal,FaGitAlt } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiNextdotjs, SiExpress, SiMongodb, SiFirebase, SiStripe, SiJsonwebtokens, SiVercel, SiNetlify, SiDaisyui, SiTypescript, SiRedux, SiFigma,SiReactquery,SiMui,SiNestjs,SiMysql,SiPostgresql,SiDocker,SiRender,SiApachespark,SiGraphql } from 'react-icons/si';

const defaultIcons = {
  'HTML5': <FaHtml5 className="text-[#E34F26]" />,
  'CSS3': <FaCss3Alt className="text-[#1572B6]" />,
  'Tailwind CSS': <SiTailwindcss className="text-[#06B6D4]" />,
  'JavaScript': <SiJavascript className="text-[#F7DF1E]" />,
  'React': <FaReact className="text-[#61DAFB]" />,
  'Next.js': <SiNextdotjs className="text-white" />,
  'DaisyUI': <SiDaisyui className="text-[#1AD1A5]" />,
  'Node.js': <FaNodeJs className="text-[#339933]" />,
  'Express.js': <SiExpress className="text-white" />,
  'MongoDB': <SiMongodb className="text-[#47A248]" />,
  'Firebase': <SiFirebase className="text-[#FFCA28]" />,
  'Stripe': <SiStripe className="text-[#008CDD]" />,
  'JWT': <SiJsonwebtokens className="text-[#000000] bg-white rounded-full" />,
  'GitHub': <FaGithub className="text-white" />,
  'Netlify': <SiNetlify className="text-[#00C7B7]" />,
  'Vercel': <SiVercel className="text-white" />,
  'TypeScript': <SiTypescript className="text-[#3178C6]" />,
  'Redux': <SiRedux className="text-[#764ABC]" />,
  'React Query': <SiReactquery className="text-[#FF4154]" />,
  'Material UI': <SiMui className="text-[#007FFF]" />,
  'NestJS': <SiNestjs className="text-[#E0234E]" />,
  'MySQL': <SiMysql className="text-[#4479A1]" />,
  'PostgreSQL': <SiPostgresql className="text-[#336791]" />,
  'Git': <FaGitAlt className="text-[#F05032]" />,
  'Docker': <SiDocker className="text-[#2496ED]" />,
  'Render': <SiRender className="text-[#46E3B7]" />,
  'REST API': <SiApachespark className="text-orange-400" />,
  'GraphQL': <SiGraphql className="text-[#E10098]" />,
  'Figma': <SiFigma className="text-[#F24E1E]" />,
};

const MySkills = () => {
 const { data: skills = [], isLoading } = useQuery({
  queryKey: ["skills"],
  queryFn: async () => {
    const res = await axios.get(
      "http://localhost:3000/api/skills"
    );

    return Array.isArray(res.data) ? res.data : [];
  },
});

  return (
    <section id="experience" className="py-20 bg-transparent relative border-t border-slate-800/50 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My <span className="text-purple-400">Skills</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center max-w-5xl mx-auto">
            {skills.map((skill, index) => {
              const Icon = defaultIcons[skill.name] || <FaTerminal className="text-cyan-400" />;
              return (
                <motion.div
                  key={skill._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative p-[1px] rounded-2xl overflow-hidden group hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300"
                >
                  {/* Default border color */}
                  <div className="absolute inset-0 bg-slate-800 transition-opacity duration-300 group-hover:opacity-0"></div>

                  {/* Rotating Gradient Background */}
                  <div className="absolute inset-[-200%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#06b6d4_30%,transparent_50%,#a855f7_80%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Inner Content Wrapper */}
                  <div className="relative flex flex-col items-center justify-center p-6 bg-slate-900 rounded-[15px] h-full w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-50"></div>
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                      {Icon}
                    </div>
                    <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors relative z-10 mb-2">{skill.name}</p>
                    
                    {/* Skill level bar */}
                    <div className="w-full bg-slate-800 rounded-full h-1 mt-auto relative z-10 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 h-1 rounded-full" 
                        title={`${skill.level}%`}
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MySkills;