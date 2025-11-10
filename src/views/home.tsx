import React, { useState, useEffect } from 'react';
import News from './news'; // Ensure correct import path
import NEXDIG_LOGO from 'assets/logo_updated.svg';

const PhotoGallery = () => {
  const images = [
    {
      src: '/team_photos/socal_dbday2025.jpeg',
      caption: 'NEXDIG @ SoCal DB Day 2025',
    },
    {
      src: '/team_photos/sigspatial2025.jpg',
      caption: 'SIGSPATIAL 2025!',
    },
    
    {
      src: '/team_photos/amz_interns.jpg',
      caption: 'NEXDIG Amazon Interns - Summer 2025',
    },
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="w-full max-w-[600px] h-[400px] overflow-hidden relative rounded-lg shadow-lg">
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].caption}
        className="w-full h-full object-cover transition-opacity duration-500 "
      />

      {/* Caption in bottom-left corner */}
      <div className="absolute bottom-3 left-3 text-white text-sm md:text-base font-medium drop-shadow-lg">
        {images[currentIndex].caption}
      </div>

      {/* Left Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white p-2  shadow-md"
        aria-label="Previous Image"
      >
        ◀
      </button>

      {/* Right Button */}
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white p-2  shadow-md"
        aria-label="Next Image"
      >
        ▶
      </button>
    </div>
  );
};

// const TwitterFeed = () => {
//   useEffect(() => {
//     // Load Twitter Widget Script
//     const script = document.createElement('script');
//     script.src = "https://platform.twitter.com/widgets.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div className="w-full max-w-[600px] p-4 border rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold text-center">Latest Updates from X</h2>
//       <a 
//         className="twitter-timeline"
//         data-width="600"
//         data-height="400"
//         data-theme="light"
//         href="https://x.com/ibrahim_sabek"
//       >
//         Tweets by @ibrahim_sabek
//       </a>
//     </div>
//   );
// };

export const Home = () => {
  return (
    <div className="flex flex-col space-y-[30px] items-center">
      <div className="w-full max-w-7xl">
        <img src={NEXDIG_LOGO} alt="NexDIG Logo" />
      </div>

      <div className="homepage-grid">
        <div className="flex flex-col space-y-6">
          <div>
            <p>
              Welcome to the <b>NEX</b>t-generation <b>D</b>ata-<b>I</b>ntensive Systems{' '}
              <b>G</b>roup (NEXDIG) lab! Led by{' '}
              <a
                href="http://viterbi-web.usc.edu/~sabek/"
                className="clickable-link"
              >
                Ibrahim Sabek
              </a>
              , we are a cutting-edge research lab focused on the next-generation
              data systems. The lab explores innovative approaches to enhance the performance,
              scalability, security, and interpretability of data-intensive platforms.
            </p>
            <p> 
              Through an interdisciplinary blend of machine learning, quantum computing, 
              and large language models, NEXDIG drives fundamental advances that bridge AI and data systems, 
              enabling intelligent, trustworthy, and high-performance solutions for next-generation 
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

          {/* <div>
            <TwitterFeed />
          </div> */}
        </div>
      </div>
    </div>
  );
};
