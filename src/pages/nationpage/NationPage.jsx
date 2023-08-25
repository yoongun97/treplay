import React from "react";
import Category from "./components/Category";
import MiddleBanner from "./components/MiddleBanner";
import Preview from "./components/Preview";
import EventBanner from "./components/EventBanner";
import BestPlace from "./components/BestPlace";
import MainCarousel from "../../components/imageslide/MainCarousel";

function NationPage() {
  // category 파라미터를 가져옴

  return (
    <div className="Container">
      <MainCarousel />
      <Category />
      <MiddleBanner />
      <Preview />
      <EventBanner />
      <BestPlace />
    </div>
  );
}

export default NationPage;
