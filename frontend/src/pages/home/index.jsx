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
    { title: 'Welcome', description: 'Welcome to our website', imageUrl: 'https://cdn.pixabay.com/photo/2021/11/22/20/20/online-6817350_640.jpg' },
    { title: 'Discover', description: 'Discover new features', imageUrl: 'https://blog-frontend.envato.com/cdn-cgi/image/width=2560,quality=75,format=auto/uploads/sites/2/2022/04/E-commerce-App-JPG-File-scaled.jpg' },
    { title: 'Enjoy', description: 'Enjoy your stay', imageUrl: 'https://t4.ftcdn.net/jpg/07/64/55/75/360_F_764557526_HlwV6rYpIxrfhrmlpTzl74INFoMmJs9Z.jpg' },
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
