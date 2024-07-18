import React from 'react';

const ServicesBoxes = ({ items }) => {
    return (
        <div className="container mx-auto p-8">
            <div className="flex flex-wrap justify-center">
                {items.map((item, index) => (
                  <div key={index} className="box m-4 p-4 border rounded-lg shadow-lg flex flex-col items-center">
                    <div className='bg-gray-400 p-1 rounded-3xl'>
                      <div className='bg-black p-2 rounded-3xl'>
                        <img src={item.icon} alt={item.name} className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="text-sm mt-2 font-bold mb-2">{item.name}</h3>
                    <p className="text-center text-xs text-gray-600">{item.description}</p>
                  </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesBoxes;
