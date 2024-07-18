import React from 'react';
import CategoryCard from './CategoryCard';
import SectionHeadings from "../SectionHeadings"

const BrowseByCategory: React.FC<BrowseByCategoryProps> = ({ categories }) => {

    return (
        <div className="browse-by-category py-8">
            <SectionHeadings heading="Categories" />
            <h2 className="text-2xl font-bold mb-4 text-start">Browse by Category</h2>
            <div className="flex flex-wrap justify-center">
                {categories.map((category, index) => (
                    <CategoryCard key={index} title={category.title} imageUrl={category.imageUrl} />
                ))}
            </div>
        </div>
    );
};

export default BrowseByCategory;
