import React, { useState, useEffect } from 'react';
import {
    API,
    getAxiosError,
    PRODUCT_ENDPOINTS
} from "../../../helpers/constants.js";
import { Input, Button, Table, TableHeader, TableBody, TableRow, TableColumn, TableCell, getKeyValue, Pagination, Spinner, Tabs, Tab, Card, CardBody} from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';
import CustomTable from '../../customTable.jsx';
import AddProduct from "../../../modals/addProduct.jsx"
import RenderTabs from "./tabs.jsx"
import { ViewModal, EditModal, DeleteModal } from "../../../modals/productModal/index.ts"

import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/slices/loadingSlice";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Product() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [product, setProduct] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddProduct = () =>{
    setIsOpen(true)
  }

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

   const onOpenModal = (type, product) => {
     setModalType(type);
     setIsOpenModal(!isOpenModal)
     setProduct(product)
   };

   const onCloseModal = () => {
     setModalType(null);
   };

  const fetchProducts = () => {
    dispatch(showLoading());
    API.get(PRODUCT_ENDPOINTS.get)
      .then((response) => {
        setData(response?.data?.products);
      })
      .catch((error) => {
        enqueueSnackbar(getAxiosError(error), { variant: "error" });
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className='mb-4 px-1 flex '>
        <p className='text-bold text-xl font-serif'>Products</p>
      </div>
      <div className="flex w-full flex-col">
        <RenderTabs products={data} isOpen={handleAddProduct} onOpenModal={onOpenModal}/>
      </div>
      <AddProduct isOpen={isOpen} onClose={toggleModal} />
      {modalType === 'view' && <ViewModal onClose={onCloseModal} product={product}/>}
      {modalType === 'edit' && <EditModal onClose={onCloseModal} product={product} refreshProducts={fetchProducts} />}
      {modalType === 'delete' && <DeleteModal onClose={onCloseModal} product={product} refreshProducts={fetchProducts}/>}
    </>
  );
}

export default Product;
