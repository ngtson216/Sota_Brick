import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from '../../img/backg.jpg';
import slide2 from '../../img/sota_frame_sale_9_21.jpg'
import slide3 from '../../img/sota_frame_sale_6_21.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AutoSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div>
      <Slider {...settings}>
        <div style={{ textAlign: "center" }}>
          <img className="centerImage" src={slide1} alt="Slide 1" style={{ height: '85vh', width: '90%', paddingLeft: '10%' }} />
        </div>
        <div>
          <img className="centerImage" src={slide2} alt="Slide 2" style={{ height: '85vh', width: '90%', paddingLeft: '10%' }} />
        </div>
        <div>
          <img className="centerImage" src={slide3} alt="Slide 2" style={{ height: '85vh', width: '90%', paddingLeft: '10%' }} />
        </div>
      </Slider>
    </div>
  );
}