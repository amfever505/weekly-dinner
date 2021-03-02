import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './style.css';
import slide01 from './slide01.jpg';
import slide02 from './slide02.jpg';
import slide03 from './slide03.jpg';
import slide04 from './slide04.jpg';
import slide05 from './slide05.jpg';
import slide06 from './slide06.jpg';
import slide07 from './slide07.jpg';
import slide08 from './slide08.jpg';

const Slideshow = () => {
  const slideImages = [slide01, slide02, slide03, slide04, slide05, slide06, slide07, slide08];

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    prevArrow: (
      <div style={{ width: '30px', marginRight: '-30px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <polygon points="256,0 128,0 0,256 128,512 256,512 128,256 " stroke="#fff" fill="#fff" />
        </svg>
      </div>
    ),
    nextArrow: (
      <div style={{ width: '30px', marginLeft: '-30px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <polygon points="384,0 256,0 384,256 256,512 384,512 512,256 " stroke="#fff" fill="#fff" />
        </svg>
      </div>
    ),
  };

  return (
    <div>
      <div>
        <Slide {...properties}>
          {slideImages.map((each, index) => (
            <div key={index} className="each-slide">
              <img src={each} />
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default Slideshow;
