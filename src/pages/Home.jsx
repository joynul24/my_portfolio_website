import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import Loader from '../components/Loader';
import MySkills from '../sections/MySkills';
import Services from '../sections/Services';
import Experience from '../sections/Experience';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <MySkills></MySkills> 
        <Services></Services>
        <Experience></Experience>
        <Projects />
        <Contact /> 
      </main>
      <Footer />
    </div>
  );
};

export default Home;
