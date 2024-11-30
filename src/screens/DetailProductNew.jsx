import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import imageMapping from "./imageMappings";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Modal from "react-modal";

const googleApiKey = process.env.REACT_APP_GOOGLE_API;

const DetailProductNew = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    location: propertyLocation,
    propertyName,
    propertyImage,
    price,
    bathrooms,
    bedrooms,
    images,
    description = "",
    ownerName,
    ownerImage,
    phonenumber,
    email,
  } = location.state || {};

  const defaultLocation = { lat: 0, lng: 0};
  const mapCenter = propertyLocation.latitude && propertyLocation.longitude ?  {lat: propertyLocation.latitude, lng :propertyLocation.longitude } : defaultLocation;

  const [modalVisible, setModalVisible] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);


  let slicedDescription;
  if (description.length > 100) {
    slicedDescription = description.slice(0,100)+"...";
  } else {
    slicedDescription = description;
  };

  const handlePressHome = () => navigate("/home");
  const handleBookmarkPress = () => alert("This property has been successfully added to your bookmarks");
  const handlePress = () => alert("You have successfully rented this property");
  const handlePhonePress = () => window.open(`tel:${phonenumber}`, "_self");
  const handleEmailPress = () => window.open(`mailto:${email}`, "_self");

  const renderImage = (src, alt) => {
    return src ? (
      <img
        src={imageMapping[src]}
        alt={alt}
        style={{ width: "100%", borderRadius: "10px", objectFit: "cover", height: "400px" }}
      />
    ) : (
      <img
        src="https://via.placeholder.com/400" // Placeholder image if no image available
        alt={alt}
        style={{ width: "100%", borderRadius: "10px", objectFit: "cover", height: "400px" }}
      />
    );
  };

  const RenderModal = () => {
    return(
      <Modal isOpen={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <div style={styles.modalContainer}>
            {images.map((image, index) => (
              <div key={index}>
                {renderImage(image, index)}
              </div>
            ))}
          <div style={styles.closeModalButtonContainer}>
            <button style={styles.closeModalButton} onClick={() => setModalVisible(false)}>✖ Close</button>
          </div>
        </div>
      </Modal>
    )
  }

  return(
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto", fontFamily: "'Roboto', sans-serif" }}>
      {/* Render Property Main Image */}
      <div style={{ position: "relative", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        {renderImage(propertyImage, propertyName)}

        <div style={{ position: "absolute", top: "20px", left: "20px", display: "flex", gap: "15px" }}>
          <button onClick={handlePressHome} style={styles.iconButton}>
            <img
              src={imageMapping.backIcon}
              alt="Back"
              style={styles.iconImage}
            />
          </button>
          <button onClick={handleBookmarkPress} style={styles.iconButton}>
            <img
              src={imageMapping.bookmarkIcon}
              alt="Bookmark"
              style={styles.iconImage}
            />
          </button>
        </div>

        <div style={{ position: "absolute", bottom: "20px", left: "20px", color: "#fff" }}>
          <h2 style={{ fontSize: "30px", fontWeight: "bold", margin: "0" }}>{propertyName}</h2>
          <p style={{ fontSize: "20px", margin: "5px 0" }}>$ {price} Per month</p>
        </div>
      </div>

      {/* Render Property Details */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", fontSize: "16px" }}>
        <div style={styles.propertyDetailsItem}>
          <img
            src={imageMapping.bedIcon}
            alt="Bedrooms"
            style={styles.iconImage}
          />
          <p>{bedrooms} {bedrooms > 1 ? "Bedrooms" : "Bedroom"}</p>
        </div>
        <div style={styles.propertyDetailsItem}>
          <img
            src={imageMapping.bathIcon}
            alt="Bathrooms"
            style={styles.iconImage}
          />
          <p>{bathrooms} {bathrooms > 1 ? "Bathrooms" : "Bathroom"}</p>
        </div>
      </div>

      {/* Property Description */}
      <div style={{ marginTop: "20px" }}>
        <h3 style={styles.descriptionLabel}>Description</h3>
        <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#555" }}>
          {isDescriptionExpanded ? description : slicedDescription}
        </p>
        {description.length > 100 && (
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            style={styles.expandDescriptionText}
          >
            {isDescriptionExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      {/* Property Owner */}
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <img
          src={imageMapping[ownerImage] || "https://via.placeholder.com/50"} // Fallback for owner image
          alt={ownerName}
          style={styles.ownerImageStyle}
        />
        <div style={{ marginLeft: "15px" }}>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>{ownerName}</p>
          <p style={{ fontSize: "14px", color: "#777" }}>Owner</p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "15px" }}>
          <button onClick={handlePhonePress} style={styles.iconButton}>
            <img
              src={imageMapping.phoneIcon}
              alt="Phone"
              style={styles.iconImage}
            />
          </button>
          <button onClick={handleEmailPress} style={styles.iconButton}>
            <img
              src={imageMapping.messageIcon}
              alt="Message"
              style={styles.iconImage}
            />
          </button>
        </div>
      </div>

      {/* Property Gallery */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={styles.galleryText}>Gallery</h3>
        <div style={styles.galleryList}>
          {images.length > 0 ? (
            images.slice(0, 3).map((image, index) => (
              <img
                key={index}
                src={imageMapping[image] || "https://via.placeholder.com/100"} // Fallback for gallery image
                alt={`Gallery img ${index + 1}`}
                style={styles.galleryImage}
              />
            ))
          ) : (
            <p>No images available</p>
          )}
          {images.length > 3 && (
            <div onClick={() => setModalVisible(true)} style={styles.overlay}>
              <p style={styles.moreImagesText}>+{images.length - 3}</p>
            </div>
          )}
        </div>
      </div>
      <RenderModal />

      {/* Render Map */}
      <div style={{ marginTop: "40px", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <LoadScript googleMapsApiKey={googleApiKey} libraries={["marker"]}>
          <GoogleMap
            mapContainerStyle={styles.mapStyle}
            center={mapCenter}
            zoom={15}
          >
            <Marker position={mapCenter} />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Price and Rent Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px" }}>
        <div>
          <p style={{ fontSize: "20px", fontWeight: "bold", margin: "0" }}>Price</p>
          <p style={{ fontSize: "22px", color: "#007bff", fontWeight: "bold" }}>$ {price} Per month</p>
        </div>
        <button onClick={handlePress} style={styles.rentButton}>Rent Now</button>
      </div>
    </div>
  );
};

const styles = {
  iconButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "50%",
    transition: "background-color 0.3s ease",
  },
  iconImage: {
    width: "20px",
    height: "20px",
    objectFit: "contain",
  },
  propertyDetailsItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "16px",
  },
  descriptionLabel: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  expandDescriptionText: {
    fontSize: "14px",
    color: "#007bff",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
  },
  galleryText: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  galleryList: {
    display: "flex",
    gap: "10px",
  },
  galleryImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
  },
  overlay: {
    width: "100px",
    height: "100px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    cursor: "pointer",
  },
  moreImagesText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  mapStyle: {
    width: "100%",
    height: "400px",
  },
  rentButton: {
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  ownerImageStyle: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
};

export default DetailProductNew;
