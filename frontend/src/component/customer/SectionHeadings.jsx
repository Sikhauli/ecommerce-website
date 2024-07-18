import React from 'react';

const SectionHeadings = ({ heading }) => {
    return (
        <div className='flex item-center pb-6'>
            <span className='bg-red-500 h-6 w-4 rounded'></span>
            <h2 className='font-bold ml-1 '>{heading}</h2>
        </div>
    );
};

export default SectionHeadings;
