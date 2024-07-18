import React, { useState } from "react"
import FilterDropDown from "../../component/customer/filterDropDownMenu.jsx";
import FlashSalesCard from "../../component/customer/FlashSales/FlashSalesCard.jsx"
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { useLocation } from 'react-router-dom';

const AllProducts = () => {

  const location = useLocation();
   const items = location.state?.items || [];

  return (
     <main className="min-h-screen w-screen items-center justify-center p-8">
       <Card className="rounded">
        <CardHeader className="flex justify-center">
          <p className="text-extrabold text-center text-2xl text-serif">Today's Flash Sales</p>
        </CardHeader>
        <div className="flex item-center justify-between bg-gray-300">
           <p className="p-2">{items.length} Results</p>
           <div className="flex item-center justify-center">
             <p className="mr-2 p-2 capitalize">Sort by Category: </p>
             <FilterDropDown />
           </div>
        </div>
       </Card>
       <div className="flex flex-wrap justify-around bg-gray-50 p-6">
          <FlashSalesCard items={items}/>
       </div>
      </main>

  );
};

export default AllProducts;
