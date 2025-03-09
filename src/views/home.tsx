import React, { useState, useEffect } from 'react';
import News from './news'; // Ensure correct import path
import NEXDIG_LOGO from 'assets/logo_updated.svg';

const PhotoGallery = () => {
  const images = [
    '/team_photos/2021-1104-Northeast-View_Final-1.jpg',
    '/team_photos/ginsburg-hall-update-with-pics-v0-axcru4xa5pjd1.jpg',
    '/team_photos/HOK0020_8_S04_COMPUTER_USE_WIP04.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full max-w-[600px] h-[400px] overflow-hidden relative rounded-lg shadow-lg">
      <img
        src={images[currentIndex]}
        alt={`Gallery ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-500 rounded-lg"
      />
    </div>
  );
};

const TwitterFeed = () => {
  useEffect(() => {
    // Load Twitter Widget Script
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full max-w-[600px] p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center">Latest Updates from X</h2>
      <a 
        className="twitter-timeline"
        data-width="600"
        data-height="400"
        data-theme="light"
        href="https://x.com/ibrahim_sabek"
      >
        Tweets by @ibrahim_sabek
      </a>
    </div>
  );
};

export const Home = () => {
  return (
    <div className="flex flex-col space-y-[30px] items-center">
      {/* Logo */}
      <div className="w-full max-w-7xl">
        <img src={NEXDIG_LOGO} alt="NexDIG Logo" />
      </div>

      {/* Grid Layout */}
      <div className="homepage-grid">
        {/* Left Column */}
        <div className="flex flex-col space-y-6">
          <div>
            <p>
              The <b>Nex</b>t-generation <b>D</b>ata-<b>I</b>ntensive Systems{' '}
              <b>G</b>roup (NexDIG) lab, led by{' '}
              <a
                href="http://viterbi-web.usc.edu/~sabek/"
                className="clickable-link"
              >
                Ibrahim Sabek
              </a>
              , is a cutting-edge research lab focused on the next-generation
              data systems. We explore innovative ways to enhance performance,
              scalability, and interpretability of data systems. Our
              interdisciplinary approach aims to drive breakthroughs in AI and
              data engineering, fostering solutions that power next-generation
              applications across industries.
            </p>
          </div>

          <div>
            <News />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col space-y-6">
          <div>
            <PhotoGallery />
          </div>

          <div>
            <TwitterFeed />
          </div>
        </div>
      </div>
    </div>
  );
};
