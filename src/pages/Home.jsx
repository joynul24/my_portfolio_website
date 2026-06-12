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
import { Helmet } from 'react-helmet-async';

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

      <Helmet>
        <title>
          DevJoynul26 | Joynul Abedin | MERN Stack Developer
        </title>

        <meta
          name="description"
          content="Joynul Abedin (DevJoynul26) is a MERN Stack Developer from Bangladesh. Explore my portfolio, projects, skills and contact information."
        />

        <meta
          name="keywords"
          content="DevJoynul26, Joynul Abedin, MERN Stack Developer, React Developer, Full Stack Developer, Bangladesh"
        />

        <meta name="author" content="Joynul Abedin" />
      </Helmet>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Services></Services>
        <MySkills></MySkills>
        <Experience></Experience>
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
