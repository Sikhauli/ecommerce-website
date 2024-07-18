import React, { useState } from 'react';
import {
    API,
    CART_ENDPOINTS,
    getAxiosError,
} from "../../helpers/constants.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBox } from '@fortawesome/free-solid-svg-icons';

import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/slices/loadingSlice";

const CartButton = ({item}) => {

  const currentUser = useSelector((state) => state.user.value);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1500);
    submit()
  };

  const submit = () => {
      dispatch(showLoading());
      const data = { userId: currentUser._id, productId: item._id, quantity: 1 };
      API.post(CART_ENDPOINTS.add, data)
          .then(() => {
                enqueueSnackbar("Added to cart", {
                  variant: "success",
            });
          })
          .catch((error) =>
              enqueueSnackbar(getAxiosError(error), {
                  variant: "error",
              })
          )
          .finally(() => dispatch(hideLoading()));
      };

  return (
    currentUser ? (
      <button className={`cart-button ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
        <span className="add-to-cart text-xs text-semibold">Add to cart</span>
        {clicked ? <span className="added">Added</span> : null}
        <FontAwesomeIcon icon={faShoppingCart} className="fa-shopping-cart" />
        <FontAwesomeIcon icon={faBox} className="fa-box" />
      </button>
    ) : null
  );
};

export default CartButton;
