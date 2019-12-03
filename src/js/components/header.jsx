import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
        
    return (    
        <div className="header-container">
            <Link className="header-item"to="/"><h6 className="header-item">Home</h6></Link>
            <Link className="header-item"to="/success"><h6 className="header-item">Success</h6></Link>
            <Link className="header-item"to="/groups"><h6 className="header-item">Groups</h6></Link>
        </div>
    );
};

export default Header;
