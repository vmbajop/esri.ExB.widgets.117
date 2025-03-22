//import React from 'react';
import { React, jsx } from 'jimu-core';
import { Button } from 'jimu-ui';

interface SimpleButtonProps {
    label: string;
    mensaje: string;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ label, mensaje }) => {
    const clickHandle = () => {
        console.log(mensaje);
    };
    
    return (
        <Button type="primary" onClick={clickHandle}>
            {label}
        </Button>
    );
};

export default SimpleButton;