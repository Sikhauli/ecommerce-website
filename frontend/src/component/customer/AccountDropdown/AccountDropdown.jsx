import React from 'react';
import {
    API,
    AUTH_ENDPOINTS,
    getAxiosError,
} from "../../../helpers/constants.js";

import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/slices/loadingSlice";

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FaUser } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { TbLicense } from "react-icons/tb";
import { PiSignOutFill } from "react-icons/pi";

import { useNavigate } from 'react-router-dom';

const AccountDropdown= ({ isOpen, toggleMenu }) => {

  const currentUser = useSelector((state) => state.user.value);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkDestination = currentUser ? (currentUser.userType === 'ADMIN' ? '/admin' : '/account') : '/login';
  const linkText = currentUser ? currentUser?.name : 'Account';

  const logout = () => {
    API.get(AUTH_ENDPOINTS.logout)
      .then(() => {
        dispatch(clearUser());
        enqueueSnackbar("Successfully logged out!", { variant: "success" });
        navigate('/');
      })
      .catch((error) => {
        enqueueSnackbar(getAxiosError(error), { variant: "error" });
      });
  };

  const handleNavigateToCart = () => {
        navigate('/cart', { state: { currentUser } });
    };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          onClick={toggleMenu}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <p className="capitalize">{linkText}</p>
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none ${
          isOpen ? 'scale-100 transform opacity-100' : 'scale-95 transform opacity-0'
        } ease-out duration-100`}
      >
        <div className="py-1">
          <MenuItem>
            <a
              href={linkDestination}
              className="block flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <FaUser className="mt-1 mr-2"/> <p>User</p>
            </a>
          </MenuItem>
            {currentUser && (
          <MenuItem>
            <div
              className="block flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={handleNavigateToCart}
            >
              <IoMdCart className="mt-1 mr-2"/> <p>Cart</p>
            </div>
          </MenuItem>
           )}
          <MenuItem>
            <a
              href="#"
              className="block flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <IoSettings className="mt-1 mr-2"/> <p>Settings</p>
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <BiSupport className="mt-1 mr-2"/> <p>Support</p>
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <TbLicense className="mt-1 mr-2"/> <p> License </p>
            </a>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                onClick={logout}
                className="block flex w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
              <PiSignOutFill className="mt-1 mr-2" /> <p> Sign out </p>
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default AccountDropdown;
