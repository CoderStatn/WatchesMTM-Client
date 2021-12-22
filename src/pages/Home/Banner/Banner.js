import React from "react";
import "./Banner.css";
import { Carousel } from "react-bootstrap";

const Banner = () => {
  return (
    <section className="banner">
      <Carousel className="carousel" fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://wpbingosite.com/wordpress/wrish/wp-content/uploads/2021/10/slider1.jpg"
            alt=""
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://wpbingosite.com/wordpress/wrish/wp-content/uploads/2021/10/slider2.jpg"
            alt=""
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://wpbingosite.com/wordpress/wrish/wp-content/uploads/2021/08/slider-3-3.jpg"
            alt=""
          />
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default Banner;
