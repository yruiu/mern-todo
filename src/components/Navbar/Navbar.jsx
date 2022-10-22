import React, {useContext} from 'react';
import './Navbar.css';
import {AuthContext} from "../../context/AuthContext.js";
//1.43.48
function Navbar() {
    const {logout, isLogin}=useContext(AuthContext);

    return (
        <nav>
            <div className="nav-wrapper navbar blue">
                <a href="/" className="brand-logo">Mern Todo app</a>
                {
                    isLogin?
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/" onClick={logout}>Log out</a></li>
                        </ul>
                        :<ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/login">Login</a></li>
                        </ul>
                }
            </div>
        </nav>
    );
}

export default Navbar;