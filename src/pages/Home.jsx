import React from 'react';

import Header from '../components/Header';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Carousel from '../components/Carousel';
import WhatsApp from '../sections/WhatsApp';
import Testimonials from '../sections/Testimonials';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Header />
            <Hero />
            <About />
            <Carousel />
            <WhatsApp />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default Home;