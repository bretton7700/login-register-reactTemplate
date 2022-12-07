import React from 'react';
import './Footer.css';
const Footer = () => {
    const today = new Date();
    return (
        <footer className='footer'>
            <p>Copyright: NdovuCloud {today.getFullYear()} - All Rights Reserved</p>
            
        </footer>
    )
}

export default Footer

