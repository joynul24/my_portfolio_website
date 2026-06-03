import React from 'react';
import { motion } from "framer-motion";
import { Monitor, Palette, Smartphone, Zap, Layers, Webhook } from 'lucide-react';

const servicesData = [
  {
    icon: <Monitor className="w-8 h-8 text-blue-500" />,
    title: 'Frontend Development',
    description: 'Building responsive, interactive web applications using modern frameworks and libraries.',
  },
  {
    icon: <Palette className="w-8 h-8 text-pink-500" />,
    title: 'UI/UX Design',
    description: 'Creating beautiful, user-centered designs that enhance user experience and engagement.',
  },
  {
    icon: <Smartphone className="w-8 h-8 text-green-500" />,
    title: 'Mobile Development',
    description: 'Developing cross-platform mobile applications with React Native and responsive design.',
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: 'Web Performance',
    description: 'Optimizing web applications for speed, accessibility, and search engine optimization.',
  },
  {
    icon: <Layers className="w-8 h-8 text-purple-500" />,
    title: 'Full-Stack Solutions',
    description: 'Building complete web solutions from database design to deployment and maintenance.',
  },
  {
    icon: <Webhook className="w-8 h-8 text-red-500" />,
    title: 'API Integration',
    description: 'Integrating third-party APIs and services to extend application functionality.',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-4 md:px-8 z-10 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4 inline-block pb-2">
            My Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Providing a wide range of services to help you build and scale your digital products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="bg-gray-800/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;