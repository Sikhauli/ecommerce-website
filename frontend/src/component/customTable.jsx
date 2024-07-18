import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Button } from "@nextui-org/react";
import { SlEye } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import AvatarGroupComponent from "./AvatarGroupComponent.jsx"

export default function CustomTable({ columns, data, statusColorMap }) {

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: item.avatar }}
                        description={item.email}
                        name={cellValue}
                    >
                        {item.email}
                    </User>
                );
            case "product":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: item.avatar }}
                        name={cellValue}
                    >
                        {item.email}
                    </User>
                );

            case "items":
                return(
                    <AvatarGroupComponent avatars={item.items} />
                );
            case "status":
                return (
                    <Chip className="capitalize p-2" color={statusColorMap[item.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "button":
                return (
                    <Button variant="bordered" className="rounded">
                        Respond
                    </Button>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg cursor-pointer active:opacity-50">
                                <SlEye />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg cursor-pointer active:opacity-50">
                                <CiEdit />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <MdOutlineDelete />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
            return cellValue;
        }
    }, []);

    return (
        <div className="max-h-[500px] overflow-y-auto">
            <Table aria-label="Custom table with dynamic columns and data">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} align={column.align || "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No rows to display."} items={data}>
                    {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
