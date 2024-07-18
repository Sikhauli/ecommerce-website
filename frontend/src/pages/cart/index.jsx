import React, { useState, useEffect } from 'react';
import {
    API,
    API_URL,
    getAxiosError,
    CART_ENDPOINTS
} from "../../helpers/constants.js";
import { Breadcrumbs, BreadcrumbItem, Card, CardBody, Button, Link, CardHeader, Image, Divider, CardFooter, Input } from "@nextui-org/react";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { IoEnterOutline } from "react-icons/io5";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/slices/loadingSlice";

const CartPage = () => {

    const [counts, setCounts] = useState({});
    const [data, setData] = useState([]);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const navigateToPaymentMethod = () => {
        navigate(`/payment-method`);
    };

    const navigateToHome = () => {
        navigate(`/`);
    };

    const location = useLocation();
    const currentUser = location.state.currentUser || [];

    const incrementCount = (itemId) => {
        setCounts(prevCounts => ({
            ...prevCounts,
            [itemId]: (prevCounts[itemId] || 0) + 1
        }));
    };

    const decrementCount = (itemId) => {
        setCounts(prevCounts => ({
            ...prevCounts,
            [itemId]: Math.max((prevCounts[itemId] || 0) - 1, 0)
        }));
    };

    const subtotal = data.reduce((acc, product) => {
        const count = counts[product._id] || product.quantity;
        return acc + (product.productId.price * count);
    }, 0);

    const tax = subtotal * 0.15;
    const sumtotal = subtotal + tax;
    const deliveryFee = sumtotal > 1000 ? 0 : 150;
    const total = deliveryFee === 0 ? sumtotal : sumtotal + deliveryFee;

    useEffect(() => {
        dispatch(showLoading());
        API.get(`${CART_ENDPOINTS.get}${currentUser._id}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                enqueueSnackbar(getAxiosError(error), { variant: "error" });
            })
            .finally(() => {
                dispatch(hideLoading());
            });
    }, [dispatch, enqueueSnackbar, currentUser]);

const deleteTrip = (product) => {
    confirmAlert({
      title: "DELETE PRODUCT",
      message: "Are you sure you want to do this?",
      buttons: [
        {
          label: "Confirm",
          onClick: () => {
            dispatch(showLoading());
            API.delete(`${CART_ENDPOINTS.delete}${product}`)
              .then(() => {
                enqueueSnackbar("Successfully deleted!", {
                  variant: "success",
                });
                navigate(0);
              })
              .catch((error) => {
                enqueueSnackbar(getAxiosError(error), { variant: "error" });
              })
              .finally(() => {
                dispatch(hideLoading());
              });
          },
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
};

    return (
        <>
            <Card className='px-8 py-4 rounded'>
                <Breadcrumbs>
                    <BreadcrumbItem href="#home">Home</BreadcrumbItem>
                    <BreadcrumbItem href="#cart" current>Shopping Cart</BreadcrumbItem>
                </Breadcrumbs>
            </Card>

            <Card className='rounded'>
                <CardHeader className='w-screen flex align-center justify-center'>
                    <span className='text-3xl bold'>Shopping Cart</span>
                </CardHeader>
                <CardBody className='rounded px-6'>
                    <div className="w-full max-w-screen-xl mx-auto">
                        <div className="w-full my-8 pr-8">
                            <ul className="grid grid-cols-12 gap-4">
                                <li className="col-span-6 font-serif">Product</li>
                                <li className="col-span-2 font-serif">Quantity</li>
                                <li className="col-span-2 font-serif">Remove</li>
                                <li className="col-span-2 font-serif">Total</li>
                            </ul>
                            <Divider className="my-4 mt-4" />
                        </div>
                    </div>

                    {data.map((product) => (
                        <div key={product._id} className='grid grid-cols-12 gap-4 mt-8 flex align-center justify-between border-b w-[98%]'>
                            <div className='col-span-6 flex pr-8'>
                                <Image
                                    width={200}
                                    alt={product.productId.title}
                                    src={`${API_URL}${product.productId.images[0]}`}
                                    className='rounded'
                                />
                                <div className='flex flex-col justify-center align-center ml-6'>
                                    <h3 className='text-xl font-bold font-serif'>{product.productId.title}</h3>
                                    <p className='text-xs font-serif'>Category: <span className='font-bold text-gray-300'>{product.productId.category}</span> </p>
                                    <p className='text-xs font-serif'>Delivery Time: <span className='font-bold text-gray-300'>Within 2 weeks</span> </p>
                                    <p className='text-xs font-serif'>Estimated cost: <span className='font-bold text-gray-300'>R {product.productId.price}</span> </p>
                                </div>
                            </div>
                            <div className='col-span-2 mt-8'>
                                <div className='border flex w-fit'>
                                    <div className='p-2 mt-1 cursor-pointer' onClick={() => decrementCount(product._id)}>
                                        <IoMdArrowDropleft />
                                    </div>
                                    <span className='p-2'>{counts[product._id] || product.quantity}</span>
                                    <div className='p-2 mt-1 cursor-pointer' onClick={() => incrementCount(product._id)}>
                                        <IoMdArrowDropright />
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-2 mt-9'>
                                <span className='text-red-700 font-serif text-xs cursor-pointer'  onClick={() => deleteTrip(product._id)}>Remove</span>
                            </div>
                            <div className='col-span-2 mt-10'>
                                <p className='font-serif'>
                                    R {counts[product._id] ? product.productId.price * counts[product._id] : product.productId.price * product.quantity}
                                </p>
                            </div>
                        </div>
                    ))}

                    <Divider className="my-4 w-[98%]" />
                </CardBody>
                <CardFooter className='pr-10 px-6 flex flex-col'>
                    <div className='flex justify-between w-full'>
                        <div className='flex justify-between border p-2 w-[20%]'>
                            <p className='font-serif'>Discount</p>
                            <p className='font-serif'>00</p>
                        </div>
                        <div className='flex justify-between border p-2 w-[20%]'>
                            <p className='font-serif'>Delivery</p>
                            <p className='font-serif'>{deliveryFee}</p>
                        </div>
                        <div className='flex justify-between border p-2 w-[20%]'>
                            <p className='font-serif'>Subtotal</p>
                            <p className='font-serif'>{subtotal.toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between border p-2 w-[20%]'>
                            <p className='font-serif'>Total</p>
                            <p className='font-serif'>{total.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='flex justify-between w-full mt-8'>
                        <div className='w-full'>
                            <Button className='w-[25%] h-15 rounded' onClick={navigateToPaymentMethod}>
                                <span className='bold text-lg mr-3 font-serif'>Check out</span>  <IoEnterOutline size={30} />
                            </Button>
                        </div>
                        <div className='rounded border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 flex'>
                            <input
                                className="px-4 custom-transparent-input bg-transparent h-full focus:border-transparent focus:outline-none p-3"
                                placeholder="Please enter promo code"
                            />
                            <Button className='rounded h-full font-serif'>Apply Discount</Button>
                        </div>
                    </div>
                    <div className='w-full mt-4 flex mb-12 cursor-pointer' onClick={navigateToHome}>
                        <p className='flex'><HiArrowSmallLeft size={20} /> <span className=' ml-2 font-serif'> Continue Shopping</span></p>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}

export default CartPage;
