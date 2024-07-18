import React, { useState } from 'react';
import { Card } from "@nextui-org/react";
import Layout from "../../component/admin/layout/index.jsx";
import Overview from "../../component/admin/overview/index";

function Admin() {

    const [selectedCategory, setSelectedCategory] = useState('Overview');
    const [selectedComponent, setSelectedComponent] = useState(<Overview />);

    const onSelectCategory = (name, component) => {
        setSelectedCategory(name);
        setSelectedComponent(component)
    };

    return (
        <div className='flex p-8 w-screen h-screen'>
            <Card className='flex-2 rounded bg-transparent cursor-pointer'>
                <Layout selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />
            </Card>
            <Card className='flex-1 p-4 ml-1 rounded'>
                {selectedComponent}
            </Card>
        </div>
    );
}

export default Admin;
