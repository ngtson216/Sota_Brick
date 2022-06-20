import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import img from '../../img/slide1.jpg'
import styleHome from '../../CSS/Home.module.css'
export default function Slideshow() {
    return (
        <div className="slide-container">
            <Slide>
                <div>
                    <img className={styleHome.slider} src={img} alt='slider1' />
                </div>
                <div>
                    <img className={styleHome.slider} src={img} alt='slider2' />
                </div>
                <div>
                    <img className={styleHome.slider} src={img} alt='slider3' />
                </div>
            </Slide>
        </div>
    )
}