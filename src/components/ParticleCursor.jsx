import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ParticleCursor = () => {
  const [particles, setParticles] = useState([]);
  const lastCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const distance = Math.hypot(e.clientX - lastCoords.current.x, e.clientY - lastCoords.current.y);
      
      if (distance > 8) {
        const id = Math.random().toString(36).substring(2, 9);
        const newParticle = {
          id,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4,
          color: Math.random() > 0.5 ? 'from-cyan-400 to-emerald-400' : 'from-cyan-400 to-purple-500',
        };

        setParticles((prev) => [...prev.slice(-20), newParticle]); 
        lastCoords.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
      <div 
        className="absolute w-32 h-32 rounded-full bg-cyan-500/10 blur-[50px] transition-all duration-75 -translate-x-1/2 -translate-y-1/2"
        style={{ left: lastCoords.current.x, top: lastCoords.current.y }}
      />

      <AnimatePresence>
        {particles.map((particle, index) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={{ 
              opacity: 0, 
              scale: 0.2,
              y: -15,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className={`absolute rounded-full bg-gradient-to-br ${particle.color} shadow-[0_0_12px_rgba(6,182,212,0.6)]`}
            style={{
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ParticleCursor;