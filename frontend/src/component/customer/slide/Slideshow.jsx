import React, { useState } from 'react';
import SlideComponent from './Slide';


const Slideshow = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div className="slideshow">
            <SlideComponent slide={slides[currentSlide]} onNext={nextSlide} onPrev={prevSlide} />
        </div>
    );
};


export default Slideshow;
