import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ImageCarousel({ postImgs }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings} style={{ width: '80%', marginLeft: '30px' }}>
        {postImgs.map((img) => (
          <div>
            <img
              src={img}
              alt="디테일 이미지"
              style={{ width: '100%', height: '400px' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageCarousel;
