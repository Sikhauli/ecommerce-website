import React from 'react';
import SectionHeadings  from "../SectionHeadings"
import FlashSalesCard from "./FlashSalesCard.jsx"
import { useNavigate } from 'react-router-dom';

const FlashSales= ({ items }) => {
  const navigate = useNavigate();

    return (
        <main className="flash-sales">
            <SectionHeadings heading="Today's" />
            <h2 className="text-2xl font-bold mb-4">Today's Flash Sales</h2>
            <div className="flex flex-wrap justify-around">
              <FlashSalesCard items={items} limit={5}/>
            </div>
            <div className="flex justify-center mt-4"
                 onClick={() => navigate('/allProducts', { state: { items } })}
                 >
                <button className="px-4 py-2 bg-gray-400 text-white rounded">View all products</button>
            </div>
        </main>
    );
};

export default FlashSales;
