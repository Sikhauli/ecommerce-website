import React, { useState } from 'react';
import { Input, Button, Avatar, AvatarGroup } from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';
import CustomTable from '../../customTable';
import AvatarGroupComponent from "../../AvatarGroupComponent.jsx"

const statusColorMap = {
  Completed: "success",
  Pending: "warning",
  Cancelled: "danger",
};

function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    { "key": "id", "name": "Order No." },
    { "key": "items", "name": "Items" },
    { "key": "quantity", "name": "Quantity" },
    { "key": "address", "name": "Address" },
    { "key": "date", "name": "Date" },
    { "key": "price", "name": "Price" },
    { "key": "status", "name": "Status" },
    { "key": "actions", "name": "Actions" }
  ];


  const customers = [
    {
      id: 1,
      "address": "123 Main St", "date": "2024-04-04", "price": 50.00,
      items: [
        "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        "https://i.pravatar.cc/150?u=a04258a2462d826712d",
        "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "https://i.pravatar.cc/150?u=a04258114e29026302d",
        "https://i.pravatar.cc/150?u=a04258114e29026702d"
      ], quantity: 5, status: "Pending", actions: "Edit"
    },
    {
      id: 2,
      "address": "456 Elm St", "date": "2024-04-05", "price": 30.00,
      items: [
        "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        "https://i.pravatar.cc/150?u=a04258a2462d826712d",
        "https://i.pravatar.cc/150?u=a042581f4e29026704d"
      ], quantity: 3, status: "Cancelled", actions: "Delete"
    },
    {
      id: 3,
      "address": "789 Oak St", "date": "2024-04-06", "price": 20.00,
      items: [
        "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        "https://i.pravatar.cc/150?u=a04258a2462d826712d"
      ],
       quantity: 2, status: "Completed", actions: "View"
    },
    {
      id: 4,
      "address": "202 Maple St", "date": "2024-04-08", "price": 40.00,
      items: [
        "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        "https://i.pravatar.cc/150?u=a04258a2462d826712d",
        "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "https://i.pravatar.cc/150?u=a04258114e29026302d"
      ], quantity: 1, status: "Cancelled", actions: "Edit"
    },
    {
      id: 5,
      "address": "101 Pine St", "date": "2024-04-07", "price": 10.00,
      items: [
        "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        "https://i.pravatar.cc/150?u=a04258a2462d826712d",
        "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "https://i.pravatar.cc/150?u=a04258114e29026302d",
        "https://i.pravatar.cc/150?u=a04258114e29026702d",
        "https://i.pravatar.cc/150?u=a04258114e29026708c"
      ], quantity: 4, status: "Progress", actions: "Delete"
    }
  ];

  // Function to filter data based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <p className='font-serif font-bold text-2xl'>Manage Orders</p>
      <div className="my-6 flex justify-between">
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[20rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<CiSearch size={18} />}
          type="search"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className='mb-4 px-1 flex '>
        <p className='text-bold text-xl font-serif'>Orders</p>
      </div>
      <div className="flex w-full flex-col">
        <div className="">
          <CustomTable
            columns={columns}
            data={customers.filter((customer) =>
              customer.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
              customer.id.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )}
            statusColorMap={statusColorMap}
          />
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
