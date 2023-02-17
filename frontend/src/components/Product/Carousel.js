import React from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Carousel.css";

function Carousel(props) {
  let settings = {
    dots: true,
    Infinite: true,
    speed: 500,
    sliderPerRow: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    pauseOnHover: true,
    swipeToSlide: true,
  };
  const imgs = props.images.map((img) => (
    <div className="wrapper" key={img._id}>
      <img src={img.url} />
    </div>
  ));
  return (
    <Slider className="carousel" {...settings}>
      {imgs}
    </Slider>
  );
}

export default Carousel;
