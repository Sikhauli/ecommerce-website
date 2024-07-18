import React from 'react';
import CartButton from "../addToCartButton.jsx"
import { useNavigate } from 'react-router-dom';
import {API_URL} from "../../../helpers/constants.js"
import { shuffleAndLimit } from "../../../helpers/utils.js"

const FlashSalesCard = ({ items, limit }) => {

  const navigate = useNavigate();

  const shuffledAndLimitedItems = limit ? shuffleAndLimit(items) : items;

  return (
        <>
          {shuffledAndLimitedItems.map((item, index) => (
              <div key={index} className="flash-sale-item m-4 border rounded-lg">
                <img src={`${API_URL}${item.images[0]}`} alt={item.title} className="w-full h-48 object-cover mb-4 rounded cursor-pointer" onClick={() => navigate('/product-detail', { state: { item } })}/>
                <h2 className="text-md font-medium mb-2">
                  {item.title.length > 18 ? `${item.title.slice(0, 18)}...` : item.title}
                </h2>
                <p className="text-lg text-red-500">R{item.price}</p>
                {item.previousPrice ? <p className="text-sm text-gray-500 line-through">R{item.previousPrice}</p> : ""}
                <CartButton item={item}/>
              </div>
          ))}
        </>
    );
};

export default FlashSalesCard;
