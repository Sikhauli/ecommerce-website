import React, { useState } from "react"
import FilterDropDown from "../../component/customer/filterDropDownMenu.jsx";
import FlashSalesCard from "../../component/customer/FlashSales/FlashSalesCard.jsx"
import {Card, CardHeader} from "@nextui-org/card";
import { useLocation } from 'react-router-dom';

const ViewItemsByCategory = () => {

    const location = useLocation();
    const { data, title } = location.state || {};

    const categoryItem = data.map(({ originalPrice, ...item }) => item);

  return (

     <main className="min-h-screen w-screen items-center justify-center p-8">
       <Card className="rounded">
        <CardHeader className="flex justify-center">
          <p className="text-extrabold text-center text-2xl text-serif">{title} Category</p>
        </CardHeader>
        <div className="flex item-center justify-between bg-gray-300">
           <p className="p-2">{categoryItem.length} Results</p>
        </div>
       </Card>
       <div className="flex flex-wrap justify-around bg-gray-50 p-6">
       {data && data.length === 0 ? (
           <div className="flex items-center justify-center">
               <p className="text-xl text-gray-500 font-semibold">
                   No item was found to show
               </p>
           </div>
         ) : (
           <FlashSalesCard items={categoryItem}/>
        )}
       </div>
      </main>

  );
};

export default ViewItemsByCategory;
