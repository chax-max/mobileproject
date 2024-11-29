import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import propertiesData from "../info.json";
import imageMapping from "./imageMappings";
import { useLocationContext } from "../functions/LocationContext";


const SearchListing = () => {
    const { latitude, longitude, locationName } = useLocationContext();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const handlePress = () => { navigate('/Menu'); };

    //Function to get the location between the user's current location and each property :
    const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);
    };
    const harvesine = (lat1, lon1, lat2, lon2) => {
        const earthRadius = 6371;

        const lat1Rad = toRadians(lat1);
        const lon1Rad = toRadians(lon1);
        const lat2Rad = toRadians(lat2);
        const lon2Rad = toRadians(lon2);

        const dLat = lat2Rad - lat1Rad;
        const dLon = lon2Rad - lon1Rad;

        const harvesineFormula = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon/2) * Math.sin(dLon/2);

        const c = 2 * Math.atan2(Math.sqrt(harvesineFormula), Math.sqrt(1 - harvesineFormula));

        const distance = earthRadius * c;

        return distance.toFixed(0);
    };
    //End function to get the location between the user's current location and each property

    
    const getFilteredProperties = () => {
        return propertiesData.filter(property => {
            const matchesCategory = selectedCategory ? property.type.toLowerCase() === selectedCategory.toLowerCase() : true;
            const matchesSearchText = property.name.toLowerCase().includes(searchText.toLowerCase().trim()) || property.location.toLowerCase().includes(searchText.toLowerCase().trim());
            return matchesCategory && matchesSearchText;
        });
    };

    const filterPropertiesByDistance = () => {
        return propertiesData.sort((a,b) => {
            const distanceA = harvesine(latitude, longitude, a.coordinates.latitude, a.coordinates.longitude);
            const distanceB = harvesine(latitude, longitude, b.coordinates.latitude, b.coordinates.longitude);
            return distanceA - distanceB;
        });
    };

    const getBestProperty = (location) => {
        const filteredPropertiesByDistance = filterPropertiesByDistance();
        return filteredPropertiesByDistance.sort((a, b) => a.price - b.price)[0];
    };
    const bestProperty = getBestProperty(locationName);

    const renderImagesByLocation = (location) => {
        let sortedProperties = getFilteredProperties();

        if (!selectedCategory && !searchText) {
            sortedProperties = filterPropertiesByDistance(location);
        }

        return (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center", padding: "30px" }}>
                {sortedProperties.map(property => (
                    <div
                        key={property.name}
                        style={{
                            width: "300px",
                            borderRadius: "15px",
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                            overflow: "hidden",
                            backgroundColor: "#fff",
                            cursor: "pointer",
                            transition: "transform 0.3s, box-shadow 0.3s",
                            position: "relative",
                        }}
                        onClick={() => navigateToDetail(property)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 15px 25px rgba(0, 0, 0, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)";
                        }}
                    >
                        <img
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                            }}
                            src={imageMapping[property.photo_url]}
                            alt={property.name}
                        />
                        <div style={{ padding: "15px", textAlign: "center" }}>
                            <h3 style={{
                                margin: "10px 0",
                                fontSize: "20px",
                                color: "#333",
                                fontWeight: "bold",
                            }}>
                                {property.name}
                            </h3>
                            <p style={{
                                margin: "5px 0",
                                fontSize: "14px",
                                color: "#555",
                            }}>
                                {property.location}
                            </p>
                            <p style={{
                                margin: "5px 0",
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#0A8ED9",
                            }}>
                                ${property.price} Per month
                            </p>
                            <p style={{
                                margin: "5px 0",
                                fontSize: "12px",
                                color: "#777",
                            }}>
                                {property.bedroom} Bed | {property.bathroom} Bath
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const navigateToDetail = (property) => {
        navigate('/detail-product', {
            state: {
                location: property.coordinates,
                propertyName: property.name,
                propertyImage: property.photo_url,
                price: property.price,
                bathrooms: property.bathroom,
                bedrooms: property.bedroom,
                images: property.images,
                description: property.description,
                ownerName: property.person.name,
                ownerImage: property.person.image_url,
                phonenumber: property.person.phonenumber,
                email: property.person.email,
            }
        });
    }; 

    return (
        <div style={{ flexGrow: 1, backgroundColor: "#f7f9fc", paddingBottom: "30px", fontFamily: "'Raleway', sans-serif" }}>
            {/* Location and location changer */}
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <span style={{ fontSize: "14px", color: "#555", marginRight: "10px" }}>Location:</span>
                <span
                    style={{
                        fontSize: "20px",
                        color: "#0A8ED9",
                        fontWeight: "bold",
                        cursor: "pointer",
                        textDecoration: "underline",
                    }}
                >
                    {locationName}
                </span>
            </div>

            {/* Search Bar */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
            }}>
                <input
                    style={{
                        width: "60%",
                        padding: "12px 15px",
                        fontSize: "14px",
                        borderRadius: "25px",
                        border: "1px solid #ddd",
                        outline: "none",
                        marginRight: "15px",
                    }}
                    placeholder="Search property name or location"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
                <div
                    style={{
                        padding: "12px 20px",
                        backgroundColor: "#0A8ED9",
                        borderRadius: "50%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={handlePress}
                >
                    <img
                        src={require("../assets/logo4.png")}
                        alt="Menu"
                        style={{ height: "25px", width: "25px", filter: "invert(1)" }}
                    />
                </div>
            </div>

            {/* Category Types Buttons */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginBottom: "30px",
            }}>
                {["Cottage", "Villa", "Apartment", "Hotel"].map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(selectedCategory !== category ? category : "")}
                        style={{
                            padding: "12px 25px",
                            borderRadius: "30px",
                            backgroundColor: selectedCategory === category ? "#0A8ED9" : "#f4f4f4",
                            color: selectedCategory === category ? "#fff" : "#333",
                            fontSize: "14px",
                            border: "none",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0869a5")}
                        onMouseLeave={(e) => {
                            if (selectedCategory !== category) e.target.style.backgroundColor = "#f4f4f4";
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Properties Section */}
            <div>
                <h2 style={{
                    marginBottom: "20px",
                    textAlign: "center",
                    color: "#333",
                    fontWeight: "bold",
                }}>Properties Near You</h2>
                {renderImagesByLocation(locationName)}
            </div>

            {/* Best for You */}
            {bestProperty && (
                <div style={{ marginTop: "40px", textAlign: "center" }}>
                    <h2 style={{ color: "#333", marginBottom: "20px", fontWeight: "bold" }}>Best Property for You</h2>
                    <div
                        style={{
                            display: "inline-block",
                            width: "350px",
                            borderRadius: "15px",
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                            overflow: "hidden",
                            backgroundColor: "#fff",
                            cursor: "pointer",
                            transition: "transform 0.3s, box-shadow 0.3s",
                        }}
                        onClick={() => navigateToDetail(bestProperty)}
                    >
                        <img
                            style={{
                                width: "100%",
                                height: "250px",
                                objectFit: "cover",
                            }}
                            src={imageMapping[bestProperty.photo_url]}
                            alt={bestProperty.name}
                        />
                        <div style={{ padding: "15px", textAlign: "center" }}>
                            <h3 style={{
                                margin: "10px 0",
                                fontSize: "20px",
                                color: "#333",
                                fontWeight: "bold",
                            }}>
                                {bestProperty.name}
                            </h3>
                            <p style={{
                                margin: "5px 0",
                                fontSize: "14px",
                                color: "#555",
                            }}>
                                {bestProperty.location}
                            </p>
                            <p style={{
                                margin: "5px 0",
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#0A8ED9",
                            }}>
                                ${bestProperty.price}
                            </p>
                            <p style={{
                                margin: "5px 0",
                                fontSize: "12px",
                                color: "#777",
                            }}>
                                {bestProperty.bedroom} Bed | {bestProperty.bathroom} Bath
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchListing;
