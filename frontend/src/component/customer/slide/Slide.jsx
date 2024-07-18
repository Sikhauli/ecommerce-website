import React from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const SlideComponent = ({ slide, onNext, onPrev }) => {

    const slideStyle = {
        backgroundImage: `url(${slide.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '400px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
        padding: '20px',
    };

    return (
        <div style={slideStyle} className="slide">
            <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
            <p className="text-lg">{slide.description}</p>
            <div className="absolute bottom-4 right-4 flex space-x-2">
                <MdArrowBackIos onClick={onPrev} className='w-[4em] h-[2em] border rounded text-white rounded'/>
                <MdArrowForwardIos onClick={onNext} className='w-[4em] h-[2em] border rounded text-white rounded'/>
            </div>
        </div>
    );
};


export default SlideComponent;
