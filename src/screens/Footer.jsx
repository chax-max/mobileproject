import React from 'react';
import {FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";


const Footer = () => {
    return (
 <div style={styles.footerContainer}>
 <h2 style={styles.footerTitle}>Safe Shelter</h2>
 <div style={styles.footerLinks}>
   <p style={styles.footerLink}>About Us</p>
   <p style={styles.footerLink}>Contact</p>
   <p style={styles.footerLink}>Privacy Policy</p>
 </div>
 <div style={styles.footerIcons}>
   <FaFacebook size={24} color="#3b5998" />
   <FaTwitter size={24} color="#1da1f2" />
   <FaInstagram size={24} color="#e1306c" />
 </div>
 <p style={styles.footerCopyright}>
   © 2024 Safe Shelter. All rights reserved.
 </p>
</div>
    );
};

const styles = {
footerContainer: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#4facfe",
    textAlign: "center",
  },
  footerTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "10px",
  },
  footerLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "10px",
  },
  footerLink: {
    fontSize: "14px",
    color: "#ffffff",
    cursor: "pointer",
  },
  footerIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "10px",
  },
  footerCopyright: {
    fontSize: "12px",
    color: "#ffffff",
  },
};

export default Footer;
