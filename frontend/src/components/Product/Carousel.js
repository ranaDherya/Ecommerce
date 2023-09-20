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
  const images = props.images.map((img) => (
    <div className="wrapper" key={img._id}>
      <img src={img.url} alt="" />
    </div>
  ));
  return (
    <Slider className="carousel" {...settings}>
      {images}
    </Slider>
  );
}

export default Carousel;
