  import React, {useState, useMemo} from "react";
  import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
  import { RiArrowDownSFill } from "react-icons/ri";

  const FilterDropDown = () => {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

    const selectedValue = useMemo(
      () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
      [selectedKeys]
    );

    return (
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered"  className="capitalize rounded" endContent={<RiArrowDownSFill />}>
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={(keys) => setSelectedKeys(keys)}
        >
          <DropdownItem className="text-black" key="text">Text</DropdownItem>
          <DropdownItem className="text-black" key="number">Number</DropdownItem>
          <DropdownItem className="text-black" key="date">Date</DropdownItem>
          <DropdownItem className="text-black" key="single_date">Single Date</DropdownItem>
          <DropdownItem className="text-black" key="iteration">Iteration</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };

  export default FilterDropDown;
