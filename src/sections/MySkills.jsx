import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGithub, FaGitAlt, FaTerminal, FaBootstrap, FaVuejs } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiNextdotjs, SiExpress, SiMongodb, SiFirebase, SiStripe, SiJsonwebtokens, SiVercel, SiNetlify, SiDaisyui, SiTypescript, SiRedux, SiFigma, SiReactquery, SiMysql, SiPostgresql, SiRender } from 'react-icons/si';
import axiosInstance from '../api/axiosInstance';

const defaultIcons = {
  'HTML5': <FaHtml5 className="text-[#E34F26]" />,
  'CSS3': <FaCss3Alt className="text-[#1572B6]" />,
  'JavaScript': <SiJavascript className="text-[#F7DF1E]" />,
  'TypeScript': <SiTypescript className="text-[#3178C6]" />,
  'React': <FaReact className="text-[#61DAFB]" />,
  'Next.js': <SiNextdotjs className="text-white" />,
  'Tailwind CSS': <SiTailwindcss className="text-[#06B6D4]" />,
  'DaisyUI': <SiDaisyui className="text-[#1AD1A5]" />,
  'Bootstrap': <FaBootstrap className="text-[#7952B3]" />,
  'Vue.js': <FaVuejs className="text-[#4FC08D]" />,
  'Redux': <SiRedux className="text-[#764ABC]" />,
  'React Query': <SiReactquery className="text-[#FF4154]" />,
  'Node.js': <FaNodeJs className="text-[#339933]" />,
  'Express.js': <SiExpress className="text-white" />,
  'MongoDB': <SiMongodb className="text-[#47A248]" />,
  'Firebase': <SiFirebase className="text-[#FFCA28]" />,
  'JWT': <SiJsonwebtokens className="text-[#000000] bg-white rounded-full p-[1px]" />,
  'Stripe': <SiStripe className="text-[#008CDD]" />,
  'MySQL': <SiMysql className="text-[#4479A1]" />,
  'PostgreSQL': <SiPostgresql className="text-[#336791]" />,
  'Git': <FaGitAlt className="text-[#F05032]" />,
  'GitHub': <FaGithub className="text-white" />,
  'Vercel': <SiVercel className="text-white" />,
  'Netlify': <SiNetlify className="text-[#00C7B7]" />,
  'Render': <SiRender className="text-[#46E3B7]" />,
  'Figma': <SiFigma className="text-[#F24E1E]" />,
};

const MySkills = () => {
  const { data: skills = [], isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await axiosInstance.get("/skills");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const renderSkillCard = (skill, index) => {
    const Icon = defaultIcons[skill.name] || <FaTerminal className="text-cyan-400" />;
    return (
      <div
        key={skill._id ? `${skill._id}-${index}` : index}
        className="relative p-[1px] rounded-xl overflow-hidden group hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all duration-300 flex-shrink-0 cursor-pointer"
      >
        {/* Default Border Color */}
        <div className="absolute inset-0 bg-slate-800 transition-opacity duration-300 group-hover:opacity-0"></div>

        {/* Rotating Glow Border (Hover-only) */}
        <div className="absolute inset-[-200%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#06b6d4_30%,transparent_50%,#a855f7_80%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Content Wrapper */}
        <div className="relative flex items-center gap-3 px-5 py-2.5 bg-slate-900/90 rounded-[11px] h-full w-full overflow-hidden">
          <div className="text-xl group-hover:scale-110 transition-transform duration-300 relative z-10 flex items-center justify-center">
            {Icon}
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-300 group-hover:text-white transition-colors relative z-10 whitespace-nowrap">
            {skill.name}
          </p>
        </div>
      </div>
    );
  };

  const halfLength = Math.ceil(skills.length / 2);
  const row1Skills = skills.slice(0, halfLength);
  const row2Skills = skills.slice(halfLength);

  const extendedRow1 = [...row1Skills, ...row1Skills, ...row1Skills, ...row1Skills];
  const extendedRow2 = [...row2Skills, ...row2Skills, ...row2Skills, ...row2Skills];

  return (
    <section id="experience" className="py-20 bg-transparent relative border-t border-slate-800/50 z-10 overflow-hidden">
      <div className="w-full">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 px-6"
        >
          <h2 className="space-grotesk text-3xl md:text-5xl font-bold mb-3 tracking-tight">
            Skills & <span className="text-purple-400">Technologies</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto jetbrains-mono">
            A comprehensive toolkit for building modern web applications
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="relative space-y-6 w-full overflow-hidden">
            
            {/* Left and Right Edge Soft Shadow Blurs */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-20"></div>
            <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-20"></div>

            {/* Row 1: Left Row (Continuous sliding) */}
            <div className="w-full overflow-hidden flex">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  ease: "linear",
                  duration: 35,
                  repeat: Infinity,
                }}
                className="flex gap-4 flex-shrink-0 pr-4"
              >
                {extendedRow1.map((skill, idx) => renderSkillCard(skill, idx))}
              </motion.div>
            </div>

            {/* Row 2: Right Row (Continuous sliding) */}
            <div className="w-full overflow-hidden flex">
              <motion.div
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                  ease: "linear",
                  duration: 35,
                  repeat: Infinity,
                }}
                className="flex gap-4 flex-shrink-0 pr-4"
              >
                {extendedRow2.map((skill, idx) => renderSkillCard(skill, idx))}
              </motion.div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default MySkills;