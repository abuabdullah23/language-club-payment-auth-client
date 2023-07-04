import React from 'react';
import Slider from '../Slider/Slider';
import PopularClasses from '../PopularClasses/PopularClasses';
import PopularInstructors from '../PopularInstructors/PopularInstructors';
import OurFeatures from '../OurFeatures/OurFeatures';

const Home = () => {
    return (
        <div>
            <Slider/>
            <PopularClasses/>
            <PopularInstructors/>
            <OurFeatures/>
        </div>
    );
};

export default Home;