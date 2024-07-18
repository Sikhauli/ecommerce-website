import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavItem = ({ label, href, icon }) => {
    if (icon) {
        return (
            <div className="px-4 py-2 text-gray-700 hover:text-blue-500 cursor-pointer">
                <FontAwesomeIcon icon={icon} />
            </div>
        );
    }

    return (
        <a href={href} className="px-4 py-2 text-gray-700 hover:text-blue-500">
            {label}
        </a>
    );
};

export default NavItem;
