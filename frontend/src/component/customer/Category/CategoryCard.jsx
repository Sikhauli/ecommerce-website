import React, {useState, useEffect} from 'react';
import {
    API,
    getAxiosError,
    PRODUCT_ENDPOINTS
} from "../../../helpers/constants.js";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { hideLoading, showLoading } from "../../../redux/slices/loadingSlice";
import { useSnackbar } from "notistack";

const CategoryCard = ({ title, imageUrl }) => {

    const [data, setData] = useState([])

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(showLoading());
      API.get(`${PRODUCT_ENDPOINTS.get}?keyword=${title}`)
        .then((response) => {
          setData(response?.data?.products);
        })
        .catch((error) => {
          enqueueSnackbar(getAxiosError(error), { variant: "error" });
        })
        .finally(() => {
          dispatch(hideLoading());
        });
    }, [ dispatch, enqueueSnackbar, title]);


    return (
        <div className="category-card m-4 p-4 border cursor-pointer hover:bg-gray-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow" onClick={() => navigate('/viewItemsByCategory', { state: { data, title } })}>
            <img src={imageUrl} alt={title} className="w-full h-32 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold text-center">{title}</h3>
        </div>
    );
};

export default CategoryCard;
