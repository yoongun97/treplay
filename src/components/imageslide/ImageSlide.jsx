import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function ImageSlide() {
//   let settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };
//   return (
//     <Slider {...settings}>
//       <div>
//         <h3>1</h3>
//       </div>
//       <div>
//         <h3>2</h3>
//       </div>
//       <div>
//         <h3>3</h3>
//       </div>
//       <div>
//         <h3>4</h3>
//       </div>
//       <div>
//         <h3>5</h3>
//       </div>
//       <div>
//         <h3>6</h3>
//       </div>
//     </Slider>
//   );
// }

// export default ImageSlide;

const ImageSlide = ({ postImgs }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === postImgs.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? postImgs.length - 1 : prevSlide - 1
    );
  };

  if (!postImgs || postImgs.length === 0) {
    return null; // 이미지가 없을 경우 아무것도 렌더링하지 않음
  }

  return (
    <div style={{ position: "relative", maxWidth: "100%" }}>
      <img
        src={postImgs[currentSlide]}
        alt="슬라이드 이미지"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <button onClick={prevSlide}>이전</button>
      <button onClick={nextSlide}>다음</button>
    </div>
  );
};

export default ImageSlide;
