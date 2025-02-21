import React from 'react';
import News from './news'; // Make sure the import path is correct
import NEXDIG_LOGO from 'assets/logo_updated.svg';

export const Home = () => {
  return (
    <div className="flex flex-col space-y-[30px] items-center">
      {/* Team image */}
      <div className="w-full max-w-7xl">
        <img
          src={NEXDIG_LOGO}
          alt="Team"
          // className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Main content container */}
      <div className="flex w-full max-w-7xl space-x-8">
        {/* Lab overview */}
        <div className="flex-1">
          The <b>Nex</b>t-generation <b>D</b>ata-<b>I</b>ntensive Systems{' '}
          <b>G</b>roup (NexDIG) lab, led by{' '}
          <a
            href="http://viterbi-web.usc.edu/~sabek/"
            className="clickable-link"
          >
            Ibrahim Sabek
          </a>
          , is a cutting-edge research lab focused on the next-generation data
          systems. We explore innovative ways to enhance the performance,
          scalability, and interpretability of data systems. Our
          interdisciplinary approach aims to drive breakthroughs in AI and data
          engineering, fostering solutions that power next-generation
          applications across industries.
        </div>

        {/* News section */}
        <News />
      </div>
    </div>
  );
};
