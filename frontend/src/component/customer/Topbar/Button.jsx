
import React from 'react';

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
    <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded">
        {label}
    </button>
);

export default Button;
