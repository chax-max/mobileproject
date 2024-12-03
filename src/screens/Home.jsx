import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHandsHelping, FaSearch, FaHome} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "swiper/css/autoplay";

import imageMapping from "./imageMappings";

const Home = () => {
  const navigate = useNavigate();

  const handleSearchListingPress = () => navigate("/SearchListing");
  

  // Select specific house images for the slideshow
  const [houseImages, setHouseImages] = useState([]);
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/getImages');
        if(!response.ok){
          throw new Error('Failed to fetch images.');
        };
        const data = await response.json();
        setHouseImages(data.images);
      } catch (fetchingImagesError) {
        console.error('Error fetching images : ' + fetchingImagesError);
      };
    };

    fetchImages();
    console.log(houseImages);
  }, []);

  return (
    <div style={{ backgroundColor: "#f9f9f9", fontFamily: "Arial, sans-serif" }}>
      <Navbar/>
      {/* Welcome Section */}
      <div style={styles.welcomeContainer}>
        <h1 style={styles.title}>Welcome to Safe Shelter</h1>
        <p style={styles.subtitle}>
          A platform for finding refuge and rebuilding lives.
        </p>
      </div>

      {/* Navigation Bar */}
      <div style={styles.navBarContainer}>
        <button style={styles.button} onClick={handleSearchListingPress}>
          <p style={styles.buttonText}>Find Your Next Property 🚪</p>
        </button>
      </div>

      {/* Mission Section */}
      <div style={styles.missionContainer}>
        <FaHandsHelping size={40} color="#ff6b6b" style={styles.missionIcon} />
        <p style={styles.missionText}>
          Our mission is to connect individuals and families with safe, temporary homes during times of crisis.
        </p>
      </div>

      {/* Slideshow Section */}
      <div style={styles.slideshowContainer}>
        <Swiper
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
        >
          {houseImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} style={styles.slideshowImage} alt={`House ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Services Section */}
      <div style={styles.servicesContainer}>
        <h2 style={styles.servicesTitle}>Our Services</h2>
        <div style={styles.servicesList}>
          <div style={styles.serviceItem}>
            <FaSearch size={30} color="#4caf50" />
            <h3 style={styles.serviceText}>Property Search</h3>
            <p style={styles.serviceDescription}>
              Easily browse and filter through properties to find the perfect match for your needs.
            </p>
          </div>
          <div style={styles.serviceItem}>
            <FaHome size={30} color="#ff9800" />
            <h3 style={styles.serviceText}>Emergency Housing</h3>
            <p style={styles.serviceDescription}>
              Access safe and secure housing options during times of crisis.
            </p>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

// Styles with responsiveness
const styles = {
  welcomeContainer: {
    padding: "100px 20px 20px",
    textAlign: "center",
    background: "linear-gradient(45deg, #4facfe, #00f2fe)",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: "18px",
    color: "white",
    marginTop: "10px",
  },
  navBarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  button: {
    backgroundColor: "#4facfe",
    padding: "10px 20px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
  },
  buttonText: {
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
  },
  iconButton: {
    backgroundColor: "transparent",
    border: "none",
  },
  iconImage: {
    width: "50px",
    height: "50px",
  },
  missionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    margin: "20px auto",
    backgroundColor: "white",
    borderRadius: "10px",
    maxWidth: "90%",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  missionIcon: {
    marginBottom: "10px",
  },
  missionText: {
    fontSize: "16px",
    color: "#555",
    textAlign: "center",
  },
  slideshowContainer: {
    margin: "20px auto",
    borderRadius: "15px",
    overflow: "hidden",
    maxWidth: "90%",
    height:'450px',
  },
  slideshowImage: {
    width: "100%",
    borderRadius: "10px",
    height: "450px",
    objectFit: "cover",
  },
  servicesContainer: {
    margin: "20px auto",
    padding: "20px",
    maxWidth: "90%",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  servicesTitle: {
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "10px",
  },
  servicesList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
  },
  serviceItem: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "90%",
  },
  serviceText: {
    fontSize: "18px",
    color: "#333",
    marginTop: "8px",
  },
  serviceDescription: {
    fontSize: "14px",
    color: "#666",
    marginTop: "5px",
  },
};

export default Home;
