import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from 'axios';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    useDisclosure
} from "@nextui-org/react";
import { capitalize } from "./utils";
import { columns, statusOptions } from "./data";

// icons
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

import { useSnackbar } from "notistack";
import {
    API,
    PRODUCT_ENDPOINTS,
    getAxiosError,
} from "../../../helpers/constants.js"


const statusColorMap = {
    later: "success",
    read: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["brand", "title", "category", "price", "actions"];

export default function ProductTable({ products, isOpen, onOpenModal }) {

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({ column: "price", direction: "ascending" });
  const [page, setPage] = useState(1);

  const [selectedAction, setSelectedAction] = useState(null);

   const handleDropdownSelect = (action) => {
       setSelectedAction(action);
       setIsOpen(true);
     };

  const pages = Math.ceil(products.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredProducts = Array.isArray(products) ? [...products] : Object.values(products);
    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        product.category.toLowerCase().includes(filterValue.toLowerCase()) ||
        product.brand.toLowerCase().includes(filterValue.toLowerCase()) ||
        product.description.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredProducts;
  }, [products, filterValue]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((product, columnKey) => {
    const cellValue = product[columnKey];
    switch (columnKey) {
      case "colors":
        return cellValue.join(", ");
      case "images":
        return cellValue.map((image, index) => <img key={index} src={image} alt={`Product Image ${index}`} width={50} />);
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <IoEllipsisVerticalSharp className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem className="text-black" ><p onClick={() => onOpenModal("view", product)}>View</p></DropdownItem>
                <DropdownItem className="text-black" ><p onClick={() => onOpenModal("edit", product)}>Edit</p></DropdownItem>
                <DropdownItem className="text-white bg-red-900" color="danger"><p onClick={() => onOpenModal("delete", product)}>Delete</p></DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onSearchChange = useCallback((e) => setFilterValue(e.target.value), []);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="w-full sm:w-auto flex items-center gap-2">
            <Input
              isClearable
              classNames={{
                base: "max-w-full sm:max-w-[20rem]",
                input: "text-small",
              }}
              placeholder="Search products"
              startContent={<CiSearch className="text-default-400 pointer-events-none flex-shrink-0" />}
              value={filterValue}
              onChange={onSearchChange}
            />
          </div>
          <div className=" flex justify-center gap-4">
          <Dropdown>
            <DropdownTrigger>
              <Button endContent={<IoIosArrowDown className="text-small" />} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
              className="text-black"
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid}>{column.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button color="primary" startContent={<FaPlus />} onClick={isOpen}>
            Add Product
          </Button>
        </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {products.length} products</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select className="bg-transparent outline-none text-default-400 text-small" onChange={onRowsPerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, visibleColumns, onSearchChange, onRowsPerPageChange, products.length]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No products found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
