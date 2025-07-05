import React, { useState, useEffect } from 'react';
import './StickyNavbar.css';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../redux/feature/authSlice';


const StickyNavbar = () => {
    const [isSticky, setSticky] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { cart } = useSelector((state) => state.allCart);
    const { user } = useSelector((state) => state.auth); // Get user from Redux store
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 100) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleLogout = () => {
        dispatch(logout());
        setMenuOpen(false);
        navigate('/login');
    };

  
    const handleNavClick = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
            <div className="navbar-container">
                <NavLink to="/" className="text-decoration-none mx-2 navbar-logo">
                    Bloomora{" "}
                </NavLink>


                <div className="menu-icon" onClick={handleNavClick}>
                    <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars         '} />
                </div>
                <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
                {isMenuOpen && (
                            <div className="mobile-menu-buttons">
                                {user ? (
                                    <>
                                        <NavLink to="/profile" className="btn" onClick={handleNavClick}>{user.name}</NavLink>
                                        <NavLink to="/cart" className="btn" onClick={handleNavClick}>Cart ({cart.length})</NavLink>
                                        <button className="btn" onClick={handleLogout}>Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/login" className="btn" onClick={handleNavClick}>Login</NavLink>
                                        <NavLink to="/register" className="btn" onClick={handleNavClick}>Register</NavLink>
                                    </>
                                )}
                            </div>
                        )}


<div className="desktop-menu-buttons d-none d-lg-flex align-items-center">
                            <div className="icon-container">
                                <NavLink to="/cart" className="nav-icon">
                                    <i className="fas fa-shopping-cart fa-lg"></i> <span>{cart.length > 0 && `(${cart.length})`}</span>
                                </NavLink>
                                <div className="icon-tooltip">Cart</div>
                            </div>
                            {user ? (
                                <>
                                    <div className="icon-container">
                                        <NavLink to="/profile" className="nav-icon">
                                            <i className="fas fa-user-circle fa-lg"></i>
                                        </NavLink>
                                        <div className="icon-tooltip">{user.name}</div>
                                    </div>
                                    <div className="icon-container">
                                        <button className="nav-icon" onClick={handleLogout}>
                                            <i className="fas fa-sign-out-alt fa-lg"></i>
                                        </button>
                                        <div className="icon-tooltip">Logout</div>
                                    </div>
                                </> 
                            ) : (
                                <>
                                    <div className="icon-container">
                                        <NavLink to="/login" className="nav-icon">
                                            <i className="fas fa-sign-in-alt fa-lg"></i>
                                        </NavLink>
                                        <div className="icon-tooltip">Login</div>
                                    </div>
                                    <div className="icon-container">
                                        <NavLink to="/register" className="nav-icon">
                                            <i className="fas fa-user-plus fa-lg"></i>
                                        </NavLink>
                                        <div className="icon-tooltip">Register</div>
                                    </div>
                                </> 
                            )}
                        </div>
                </ul>
            </div>
        </nav>
    );
};

export default StickyNavbar;
