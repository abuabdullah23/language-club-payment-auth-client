import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../../assets/images/Banner/Banner-01.jpg';
import banner2 from '../../../assets/images/Banner/Banner-02.jpg';
import banner3 from '../../../assets/images/Banner/Banner-03.jpg';
import banner4 from '../../../assets/images/Banner/Banner-04.jpg';
import banner5 from '../../../assets/images/Banner/Banner-05.jpg';
import banner6 from '../../../assets/images/Banner/Banner-06.jpg';

const Slider = () => {
    return (
        <div>
            <Carousel>
                <div>
                    <img src={banner1} />
                </div>
                <div>
                    <img src={banner2} />
                </div>
                <div>
                    <img src={banner3} />
                </div>
                <div>
                    <img src={banner4} />
                </div>
                <div>
                    <img src={banner5} />
                </div>
                <div>
                    <img src={banner6} />
                </div>
            </Carousel>
        </div>
    );
};

export default Slider;