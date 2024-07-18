import React, { useState, useEffect, FormEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  AutocompleteItem,
  Autocomplete,
  Input,
  Select,
  SelectItem,
  Textarea
} from "@nextui-org/react";
import {
    API,
    getAxiosError,
    PRODUCT_ENDPOINTS
} from "../helpers/constants.js";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/slices/loadingSlice";
import SelectValueDropDown from "../component/SelectValueDropDown";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ isOpen, onClose }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const getImage = (e) => {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target?.files,
    }));
  };

  const colors = React.useMemo(
      () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
      [selectedKeys]
    );

  const onClear = () => {
    setValues({});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(showLoading());
    API.post(PRODUCT_ENDPOINTS.add, values, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    .then(() => {
        enqueueSnackbar("Product added successfully", { variant: 'success' });
    })
    .catch((error) => {
        enqueueSnackbar(getAxiosError(error), { variant: 'error' });
    })
    .finally(() => {
        dispatch(hideLoading());
        onClear();
    });
  };

  const FIELDS = [
    {
      name: "brand",
      onChange: (e) => setValues({ ...values, brand: e.target.value }),
      label: "Brand",
      componentName: "input",
      isRequired: true,
    },
    {
      name: "category",
      onChange: (value) => setValues({ ...values, category: value.currentKey }),
      label: "Category",
      componentName: "select",
      isRequired: true,
      list: ["Computers", "SmartWatch", "Camera", "Headphones", "Phones", "Gaming"],
    },
    {
      name: "title",
      onChange: (e) => setValues({ ...values, title: e.target.value }),
      label: "Title",
      componentName: "input",
      isRequired: true,
    },
    {
      name: "price",
      onChange: (e) => setValues({ ...values, price: e.target.value }),
      label: "Price",
      componentName: "input",
      isRequired: true,
    },
    {
      name: "color",
      onChange: (e) => setValues({ ...values, color: e.target.value }),
      label: "Color",
      componentName: "selectValues",
      isRequired: true,
    },
    {
      name: "description",
      onChange: (e) => setValues({ ...values, description: e.target.value }),
      label: "Description",
      componentName: "description",
      isRequired: true,
      value: values.description || "",
    },
  ];

  return (
    <Modal
      size='3xl'
      isOpen={isOpen}
      onClose={onClose}
      className=""
      backdrop="blur"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Product</ModalHeader>
            <ModalBody>
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {FIELDS.map((data, i) => {
                    if (data.componentName === "autocomplete") {
                      return (
                        <Autocomplete
                          key={i}
                          label={data.label}
                          className="z-10"
                          radius="sm"
                          isLoading={loading}
                          onInputChange={data.onInputChange}
                          onSelectionChange={data.onSelectionChange}
                          items={data.list || []}
                          inputValue={data.inputValue}
                          description={data.defaultValue}
                        >
                          {(item) => (
                            <AutocompleteItem
                              textValue={item}
                              key={item}
                            >
                              {item}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>
                      );
                    } else if (data.componentName === "select") {
                      return (
                        <Select
                          isRequired={data.isRequired}
                          key={i}
                          label={data.label}
                          className=""
                          radius="sm"
                          onSelectionChange={data.onChange}
                          defaultSelectedKeys={data.defaultValue && [data.defaultValue]}
                        >
                          {data.list?.map((v) => (
                            <SelectItem key={v} value={v} className="text-black rounded">
                              {v}
                            </SelectItem>
                          ))}
                        </Select>
                      );
                    } else if (data.componentName === "description") {
                      return (
                        <Textarea
                          variant="faded"
                          label="Description"
                          placeholder="Enter your description"
                          description="Enter a concise description of your product."
                          className="max-w-sm text-black"
                          value={data.value}
                          onChange={data.onChange}
                        />
                      );
                    } else if (data.componentName === "selectValues") {
                      return (
                        <SelectValueDropDown
                          selectedKeys={selectedKeys}
                          setSelectedKeys={(keys) => {
                            setSelectedKeys(keys);
                            setValues((prev) => ({
                              ...prev,
                              colors: Array.from(keys).join(", ").replaceAll("_", " "),
                            }));
                          }}
                        />
                      );
                    }
                    return (
                      <Input
                        defaultValue={data.defaultValue}
                        className=""
                        key={i}
                        radius="sm"
                        {...data}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between my-6">
                  <div className="">
                    <p className="text-primary text-sm">Upload images</p>
                    <input
                      radius="sm"
                      onChange={getImage}
                      className="text-xs inline-block"
                      name="images"
                      type="file"
                      multiple
                    />
                  </div>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose} onClick={onClear}>
                Close
              </Button>
              <Button color="primary" onPress={onClose} onClick={onSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddProduct;
