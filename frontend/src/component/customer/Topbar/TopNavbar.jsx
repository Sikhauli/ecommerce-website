import React, {useState} from 'react';
import NavItem from './NavItem';
import AccountDropdown from '../AccountDropdown/AccountDropdown.jsx';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = ({ title, items }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const pagesLinks = items.slice(0, 3);
    const iconsLinks = items.slice(3);

    return (
        <nav className="bg-gray-100 p-4 flex justify-between items-center">
            <div className="text-xl font-bold">{title}</div>
            <div className="flex-grow flex justify-center space-x-4">
                {pagesLinks.map((item, index) => (
                    <NavItem key={index} label={item.label} href={item.href} />
                ))}
            </div>
            <div className="flex space-x-4">
                {iconsLinks.map((item, index) => (
                    <NavItem key={index} label={item.label} icon={item.icon} />
                ))}
            </div>
            <AccountDropdown isOpen={isOpen} toggleMenu={toggleMenu} />
        </nav>
    );
};

export default TopNavbar;
