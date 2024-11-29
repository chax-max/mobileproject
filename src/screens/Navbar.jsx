import React from 'react';
import { Link } from 'react-router-dom';
import imageMapping from './imageMappings';
import { useNavigate } from "react-router-dom";
import { FaHome, FaInfoCircle, FaPhone, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa'; 

const Navbar = () => {
    const navigate = useNavigate();
    const handleHome = () => navigate("/Home");
    const handleAbout = () => navigate("/About");
    const handleContact = () => navigate("/Contact");
    const handleLogOut = () => navigate("/LogIn");
    const handleAddListing = () => navigate("/AddListing");

    return (
        <div style={navbarStyles.container}>
            <Link to="/home" style={navbarStyles.logoLink} onClick={handleHome}>
                <img src={imageMapping["../assets/main-logo.png"]} alt="Logo" style={navbarStyles.logo} />
            </Link>
            <div style={navbarStyles.navItems}>
                <Link to="/home" style={navbarStyles.link} onClick={handleHome}>
                    <FaHome style={navbarStyles.icon} /> Home
                </Link>
                <Link to="/About" style={navbarStyles.link} onClick={handleAbout}>
                    <FaInfoCircle style={navbarStyles.icon} /> About
                </Link>
                <Link to="/contact" style={navbarStyles.link} onClick={handleContact}>
                    <FaPhone style={navbarStyles.icon} /> Contact
                </Link>
                <Link to="/AddListing" style={navbarStyles.link} onClick={handleAddListing}>
                    <FaPlusCircle style={navbarStyles.icon} /> Add Listing
                </Link>
                <Link to="/LogOut" style={navbarStyles.link} onClick={handleLogOut}>
                    <FaSignOutAlt style={navbarStyles.icon} /> LogOut
                </Link>
            </div>
        </div>
    );
};

const navbarStyles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    padding: '15px 30px',
    backgroundColor: '#f0f0f0',  
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',  
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s ease', 
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logo: {
    width: '60px',
    height: 'auto',
    transition: 'transform 0.3s ease', 
  },
  navItems: {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
  },
  link: {
    fontSize: '18px',
    color: '#333',
    textDecoration: 'none',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'color 0.3s, transform 0.3s',  
  },
  icon: {
    fontSize: '20px',
    transition: 'transform 0.3s',  
  },
  '@media (max-width: 768px)': {
    container: {
      flexDirection: 'column',  
      alignItems: 'center',
    },
    navItems: {
      flexDirection: 'column',  
      gap: '15px',
      alignItems: 'center',
    },
    logo: {
      width: '50px',  
    },
    link: {
      fontSize: '16px',  
    },
  },
  '@media (max-width: 480px)': {
    container: {
      padding: '10px 20px',  
    },
    logo: {
      width: '45px',  
    },
    link: {
      fontSize: '14px',  
    },
  },
};


navbarStyles.link[':hover'] = {
    color: '#0A8ED9',  
    transform: 'scale(1.1)', 
};

navbarStyles.logo[':hover'] = {
    transform: 'scale(1.1)', 
};

export default Navbar;
