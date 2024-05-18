import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./styles/slider.css"
import Img0 from "../assets/img0.jpg";
import Img1 from "../assets/img1.jpg";
import Img2 from "../assets/img2.jpg";
import Img3 from "../assets/img3.jpg";
import Img4 from "../assets/img4.jpg";
import Img5 from "../assets/img5.jpg";
import Img6 from "../assets/img6.jpg";
import Img7 from "../assets/img7.jpg";
import Img8 from "../assets/img8.jpg";
import Img9 from "../assets/img9.jpg";
import Img10 from "../assets/img10.jpg";


function SliderImg() {
  const iamgeSlider = [
    {
      img: Img0,
    },
    {
      img: Img1,
    },
    {
      img: Img2,
    },
    {
      img: Img3,
    },
    {
      img: Img4,
    },
    {
      img: Img5,
    },
    {
      img: Img6,
    },
    {
      img: Img7,
    },
    {
      img: Img8,
    },
    {
      img: Img9,
    },
    {
      img: Img10,
    },
  ]
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };
  return (
    <>
    <div className='slidercontainer' style={{width:"70%",margin:"auto", padding:"120px 0px 0px 0px"}}>
      <Slider {...settings}>
      {iamgeSlider.map((slide)=><div key={slide}>
      <img src={slide.img} alt="" height={"500px"} width={"100%"} style={{objectFit:"cover"}}/>
      </div>)}
    </Slider>
    </div>
    </>
  )
}

export default SliderImg