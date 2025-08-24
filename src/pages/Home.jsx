import React from 'react';

// Import your components here
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import MainContent from '../components/MainContent';

import Header from '../components/Header';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Carousel from '../components/Carousel';
import WhatsApp from '../sections/WhatsApp';

const Home = () => {
    return (
        <div>
            <Header />
            <Hero />
            <About />
            <Carousel />
            <WhatsApp />
            {/* <MainContent /> */}
            {/* <Footer /> */}
        </div>
    );
};

export default Home;