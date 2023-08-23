import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImageSlide() {
  const settings = {
    dots: true,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      style={{
        border: "1px solid black",
        backgrondColor: "gray",
        padding: "10px",
      }}
    >
      <h1> 슬라이드</h1>
      <Slider {...settings}>
        <div> Slide 1</div>
        <div> Slide 2</div>
        <div> Slide 3</div>
      </Slider>
    </div>
  );
}

export default ImageSlide;

{
  /* <img
            style={{
              width: "400px",
              height: "400px",
            }}
            src="https://cdn.pixabay.com/photo/2023/08/02/14/25/dog-8165447_640.jpg"
            alt="디테일 이미지"
          /> */
}
