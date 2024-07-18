  import React from "react";
  import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input, Card, CardHeader, CardBody } from "@nextui-org/react";

  const options = [
    { key: "black", label: "Black" },
    { key: "white", label: "White" },
    { key: "red", label: "Red" },
    { key: "yellow", label: "Yellow" },
    { key: "gray", label: "Gray" },
  ];

  const SelectValueDropDown = ({ selectedKeys, setSelectedKeys }) => {

    const selectedValue = React.useMemo(
      () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
      [selectedKeys]
    );

    return (
      <Card>
        <CardHeader>
          <p>Add colors</p>
        </CardHeader>
         <CardBody>
          <Dropdown>
            <DropdownTrigger>
              <Button
              variant="bordered"
              className="capitalize bg-gray-100"
              >
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Multiple selection example"
              variant="flat"
              closeOnSelect={false}
              disallowEmptySelection
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={(keys) => setSelectedKeys(new Set(keys))}
              className="text-black"
            >
              {options.map(({ key, label }) => (
                  <DropdownItem key={key}>{label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </CardBody>
      </Card>
    );
  };

  export default SelectValueDropDown;
