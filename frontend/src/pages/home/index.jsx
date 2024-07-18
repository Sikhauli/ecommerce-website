import React, { useState, useEffect} from 'react'
import {
    API,
    getAxiosError,
    PRODUCT_ENDPOINTS
} from "../../helpers/constants.js";
import { serviceItem } from '../../helpers/const_data.js';
import Slideshow from '../../component/customer/slide/Slideshow';
import FlashSales from '../../component/customer/FlashSales/FlashSales';
import BrowseByCategory from '../../component/customer/Category/BrowseByCategory';
import ServicesBoxes from "../../component/customer/Serviice/ServicesBoxes"

import { useDispatch, useSelector } from "react-redux"
import { hideLoading, showLoading } from "../../redux/slices/loadingSlice";
import { useSnackbar } from "notistack";

const slides = [
    { title: 'Welcome', description: 'Welcome to our website', imageUrl: 'src/assets/sale-shopping-cart.jpg' },
    { title: 'Discover', description: 'Discover new features', imageUrl: 'src/assets/woman-with-shopping-bag.jpg' },
    { title: 'Enjoy', description: 'Enjoy your stay', imageUrl: 'src/assets/hamed-taha-YmBgW57IPtk-unsplash.jpg' },
];

const categories = [
    { title: 'Computers', imageUrl: 'https://img.icons8.com/?size=100&id=20308&format=png&color=000000' },
    { title: 'SmartWatch', imageUrl: 'https://img.icons8.com/?size=100&id=22194&format=png&color=000000' },
    { title: 'Camera', imageUrl: 'https://img.icons8.com/?size=100&id=dlNRF98qYou3&format=png&color=000000' },
    { title: 'Headphones', imageUrl: 'https://img.icons8.com/?size=100&id=9394&format=png&color=000000' },
    { title: 'Phones', imageUrl: 'https://img.icons8.com/?size=100&id=T341pJaJNAEl&format=png&color=000000' },
    { title: 'Gaming', imageUrl: 'https://img.icons8.com/?size=100&id=7314&format=png&color=000000' },
];


function Home() {

  const [data, setData] = useState([]);

   const currentUser = useSelector((state) => state.user.value);
   const { enqueueSnackbar } = useSnackbar();
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(false);
   const [flashSaleItems, setFlashSaleItems] = useState([]);

   useEffect(() => {
     dispatch(showLoading());
     API.get(PRODUCT_ENDPOINTS.get)
       .then((response) => {
         setData(response?.data?.products);
         const flashSaleItems = response?.data?.products.filter((product) => product.onSale);
         setFlashSaleItems(flashSaleItems)
       })
       .catch((error) => {
         enqueueSnackbar(getAxiosError(error), { variant: "error" });
       })
       .finally(() => {
         dispatch(hideLoading());
       });
     }, [dispatch, enqueueSnackbar]);


    return (
        <main className="min-h-screen w-screen items-center justify-center ">
            <div className="p-2">
                <Slideshow slides={slides} />
            </div>
            <div className="p-4">
                <FlashSales items={flashSaleItems}/>
            </div>
            <div className="p-4">
                <BrowseByCategory categories={categories} />
            </div>
            <div className="p-4">
                <ServicesBoxes items={serviceItem} />
            </div>
        </main>
    )
}

export default Home
