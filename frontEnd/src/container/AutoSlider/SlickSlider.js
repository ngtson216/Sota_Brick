import React from "react";
import Slider from "react-slick";
import cateMarvel from '../../img/cateMarvel.jpg'
import cateLego from '../../img/cateLego.jpg'
import cateStarWar from '../../img/cateStarWar.jpg'
import cateDoremon from '../../img/cateDoremon.jpg'
import cateHarry from '../../img/cateHarry.jpg'
import cateKimetsu from '../../img/cateKimetsu.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slick/slick.js'
import './slick/slick-theme.css'
import './slick/slick.css'
import './SlickSlider.css'
import { AiOutlineCaretRight } from 'react-icons/ai'
export default function SlickSlider(props) {
    var sendData = (p) => {
        props.parentCallback2(p)
    }
    const settings = {
        className: "center",
        dots: true,
        infinite: true,
        centerMode: true,
        centerPadding: '230px',
        slidesToShow: 1,
        slidesToScroll: 1,
        // arrows: false,
        autoplay: true,
        speed: 500,
        beforeChange: (current, next) => {
            sendData(next)
        }
    };
    return (
        <div>
            <Slider {...settings} className="center slider">
                <div id="div1">
                    <img src={cateLego} alt="Slide 1" style={{ height: "160px", width: '200px', borderRadius: '50px' }} />
                    <div style={{
                        position: 'relative',
                    }}>
                        <button style={{
                            position: 'absolute',
                            color: 'aliceblue',
                            background: '#1E49B6',
                            borderRadius: '9px',
                            width: '110px',
                            padding: '5px',
                            bottom: '-5px',
                            left: '50px',
                        }} disabled>
                            Lego
                        </button>
                    </div>
                </div>
                <div>
                    <img src={cateStarWar} alt="Slide 2" style={{ height: "160px", width: '200px', borderRadius: '50px' }} />
                    <div style={{
                        position: 'relative',
                    }}>
                        <button style={{
                            position: 'absolute',
                            color: 'aliceblue',
                            background: '#1E49B6',
                            borderRadius: '9px',
                            width: '110px',
                            padding: '5px',
                            bottom: '-5px',
                            left: '50px',
                        }} disabled>
                            Star War
                        </button>
                    </div>
                </div>
                <div >
                    <img src={cateDoremon} alt="Slide 1" style={{ height: "160px", width: '200px', borderRadius: '50px' }} />
                    <div style={{
                        position: 'relative',
                    }}>
                        <button style={{
                            position: 'absolute',
                            color: 'aliceblue',
                            background: '#1E49B6',
                            borderRadius: '9px',
                            width: '110px',
                            padding: '5px',
                            bottom: '-5px',
                            left: '50px',
                        }} disabled>
                            Doraemon
                        </button>
                    </div>
                </div>
                <div>
                    <img src={cateKimetsu} alt="Slide 2" style={{ height: "160px", width: '200px', borderRadius: '50px' }} />
                    <div style={{
                        position: 'relative',
                    }}>
                        <button style={{
                            position: 'absolute',
                            color: 'aliceblue',
                            background: '#1E49B6',
                            borderRadius: '9px',
                            width: '110px',
                            padding: '5px',
                            bottom: '-5px',
                            left: '50px',
                        }} disabled>
                            Kimetsu
                        </button>
                    </div>
                </div>
                <div>
                    <img src={cateHarry} alt="Slide 2" style={{ height: "160px", width: '200px', borderRadius: '50px' }} />
                    <div style={{
                        position: 'relative',
                    }}>
                        <button style={{
                            position: 'absolute',
                            color: 'aliceblue',
                            background: '#1E49B6',
                            borderRadius: '9px',
                            width: '110px',
                            padding: '5px',
                            bottom: '-5px',
                            left: '50px',
                        }} disabled>
                            Harry Potter
                        </button>
                    </div>
                </div>
                <div>
                    <img src={cateMarvel} alt="Slide 2" style={{ height: "160px", width: '200px', borderRadius: '50px' }} />
                    <div style={{
                        position: 'relative',
                    }}>
                        <button style={{
                            position: 'absolute',
                            color: 'aliceblue',
                            background: '#1E49B6',
                            borderRadius: '9px',
                            width: '110px',
                            padding: '5px',
                            bottom: '-5px',
                            left: '50px',
                        }} disabled>
                            Marvel
                        </button>
                    </div>
                </div>
            </Slider>
        </div >
    );
}