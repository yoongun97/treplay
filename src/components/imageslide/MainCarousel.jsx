import React from 'react';
import Slider from 'react-slick';
import './slick.css';

function SampleArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'none' }}
      onClick={onClick}
    />
  );
}

function MainCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
    appendDots: (dots) => (
      <div
        style={{
          width: '100%',
          position: 'absolute',
          bottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ul style={{ listStyle: 'none' }}>{dots}</ul>
      </div>
    ),
    dotsClass: 'dots_custom',
  };
  return (
    <div>
      <Slider
        {...settings}
        style={{
          height: '700px',
          width: '100%',
        }}
      >
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2016/03/04/19/36/beach-1236581_640.jpg"
            alt="MainCarousel1"
            style={{ maxWidth: '1920px', width: '100%', height: '700px' }}
          />
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2016/07/30/00/03/winding-road-1556177_640.jpg"
            alt="MainCarousel2"
            style={{ maxWidth: '1920px', width: '100%', height: '700px' }}
          />
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_640.jpg"
            alt="MainCarousel3"
            style={{ maxWidth: '1920px', width: '100%', height: '700px' }}
          />
        </div>
      </Slider>
    </div>
  );
}

export default MainCarousel;
