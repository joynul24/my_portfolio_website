import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setLoading(true);
    
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      _captcha: "false"
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/joynula919@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && (result.success === "true" || result.success === true)) {
        toast.success('Message sent successfully!');
        form.reset();
      } else {
        if (result.message && result.message.includes('Activation')) {
          toast.success("Please check your email (joynula919@gmail.com) and click 'Activate Form' to receive messages.", { duration: 8000 });
          form.reset();
        } else {
          toast.error(result.message || 'Failed to send message.');
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-transparent border-t border-slate-800/50 relative overflow-hidden z-10">
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="space-grotesk text-3xl md:text-5xl font-bold mb-4">Get In <span className="text-purple-400">Touch</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
             <div>
              <h3 className="space-grotesk text-3xl font-bold text-white mb-4">Let's Talk About Your Project</h3>
              <p className="text-slate-400 text-lg">
                Feel free to reach out to me for any inquiries, collaborations, or just to say hi! I'm always open to discussing new projects and creative ideas.
              </p>
             </div>

             <div className="jetbrains-mono space-y-6">
               <div className="flex items-center gap-4 group">
                 <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-all">
                   <FiMail size={20} />
                 </div>
                 <div>
                   <p className="text-sm tracking-wider text-slate-500 uppercase font-medium">Email</p>
                   <a href="mailto:joynula919@gmail.com" className="text-white text-lg hover:text-cyan-400 transition-colors">joynul.dev@gmail.com</a>
                 </div>
               </div>
               <div className="flex items-center gap-4 group">
                 <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400 group-hover:border-purple-500 group-hover:bg-purple-500 group-hover:text-slate-900 transition-all">
                   <FiPhone size={20} />
                 </div>
                 <div>
                   <p className="text-sm tracking-wider text-slate-500 uppercase font-medium">Phone</p>
                   <p className="text-white text-lg">+8801328814843</p>
                 </div>
               </div>
               <div className="flex items-center gap-4 group">
                 <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-slate-900 transition-all">
                   <FiMapPin size={20} />
                 </div>
                 <div>
                   <p className="text-sm tracking-wider text-slate-500 uppercase font-medium">Location</p>
                   <p className="text-white text-lg">Sylhet, Bangladesh</p>
                 </div>
               </div>
             </div>

             <div className="pt-4">
               <p className="text-sm tracking-wider text-slate-500 uppercase font-medium mb-4">Follow Me</p>
               <div className="flex gap-4">
                 {[
                   { icon: <FaLinkedin size={20} />, href: 'https://www.linkedin.com/in/devjoynul/' },
                   { icon: <FaGithub size={20} />, href: 'https://github.com/joynul24' },
                   { icon: <FaFacebook size={20} />, href: 'https://web.facebook.com/devjoynul' },
                   { icon: <FaInstagram size={20} />, href: 'https://www.instagram.com/devjoynul/' },
                 ].map((social, i) => (
                   <a 
                     key={i} 
                     href={social.href} 
                     target="_blank" 
                     className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500 hover:bg-cyan-500/10 transition-all transform hover:-translate-y-1"
                   >
                     {social.icon}
                   </a>
                 ))}
               </div>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-[1px] rounded-2xl overflow-hidden group hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-slate-800 transition-opacity duration-300 group-hover:opacity-0"></div>
            <div className="absolute inset-[-200%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#06b6d4_30%,transparent_50%,#a855f7_80%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <form onSubmit={handleSubmit} className="relative bg-slate-900 p-8 rounded-[15px] space-y-6 h-full w-full">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder-slate-600"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Your Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder-slate-600"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                <textarea 
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder-slate-600 resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold tracking-wide flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-70 jetbrains-mono"
              >
                {loading ? 'Sending...' : (
                  <>
                    Send Message <FiSend size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
