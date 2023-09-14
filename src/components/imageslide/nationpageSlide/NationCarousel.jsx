import React from "react";
import Slider from "react-slick";
import "./slick.css";
import { keyframes, styled } from "styled-components";
import { useQuery } from "react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

function SampleArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

function NationCarousel({ nation }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,

    appendDots: (dots) => <ul style={{ listStyle: "none" }}>{dots}</ul>,
    dotsClass: "dots_custom",
  };

  const { data, isLoading, isError, error } = useQuery(
    ["imgs", nation],
    async () => {
      const imgRef = collection(db, "imgs");
      const q = query(imgRef, where("nation", "==", nation));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } else {
        throw new Error("해당 ID의 데이터를 찾을 수 없습니다.");
      }
    }
  );

  if (isLoading) {
    return <SkeletonCarousel />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const carouselImg = data[0].imgUrls;

  console.log(carouselImg);

  return (
    <div className="CarouselContainer">
      <StyledSlider {...settings}>
        {carouselImg.map((img, index) => (
          <ImageContainer key={index}>
            <img src={img} alt="nationCarousel Img" />
          </ImageContainer>
        ))}
      </StyledSlider>
    </div>
  );
}

export default NationCarousel;

const StyledSlider = styled(Slider)`
  position: relative;
  display: flex;
  justify-content: center;
  & > div {
    width: 100%;
    height: 700px;
  }

  & > ul {
    position: absolute;
    bottom: -24px;
    left: 0;
    right: 0;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  & > img {
    object-fit: cover;
  }
`;

const loading = keyframes`
0% {
 background-position: -460px 0;
}
100% {
 background-position: 460px 0;
}
`;

const SkeletonCarousel = styled.div`
  height: 700px;
  width: 100%;
  background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
  animation: ${loading} 2s infinite linear;
`;
