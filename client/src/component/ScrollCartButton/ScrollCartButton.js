import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ScrollCartButton = ({ onClick }) => {
    const { cart } = useSelector((state) => state.allCart);
    console.log(cart);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      aria-label="Open Cart"
      style={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        width:40,
        height:40,
        backgroundColor: '#af89a5',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(1, 1, 1, 0.12)',
        color: 'white',
        zIndex: 1000,
        transition: 'transform 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center'

        // size: 10
        
      }}
    >
     <NavLink to="/cart" className="text-decoration-none text-dark mx-2">
                  <div id="ex4">
                    <spam
                      className="p1 fa-stack fa-2x has-badge"
                      data-count={cart.length}
                    >
                      <i class="fa-solid fa-cart-shopping"></i>
                    </spam>
                  </div>
                </NavLink>
    
    </button>
  );
};

export default ScrollCartButton;
