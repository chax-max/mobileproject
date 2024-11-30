import React, { useState, useCallback, useRef } from "react";
import { useLocationContext } from "../functions/LocationContext";
import { useNavigate } from "react-router-dom";
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import Navbar from "./Navbar";


const googleApiKey = process.env.REACT_APP_GOOGLE_API;
const libraries = ['places'];

const AddListing = () => {
    const navigate = useNavigate();
    const { latitude, longitude, locationName } = useLocationContext();

    const descriptionRef = useRef(null);
    const priceRef = useRef(null);
    const bathroomsRef = useRef(null);
    const bedroomsRef = useRef(null);
    const typeRef = useRef(null);

    const [apartment, setApartment] = useState({
        location: "", //Location Selecter Done
        name: "", //Input Fields Done
        photo_url: "", //Input Fields //Done// Image Selector
        price: "", //Input Fields Done
        type: "", //Input Fields //Done// TypeSelection
        bathroom: 0, //Input Fields Done
        bedroom: 0, //Input Fields Done
        images: [], //Input Fields //Done// Image Selector
        distances: {},
        description: "", //Input Fields Done
        person: {
            name: "",
            image_url: "",
            phonenumber: 0,
            email: "",
            position: "",
        },
        coordinates: { //Location Selecter //Done// markerPosition
            latitude: null,
            longitude: null,
        },
    });

    const [markerPosition, setMarkerPosition] = useState({lat: latitude, lng: longitude});
    const [region, setRegion] = useState({lat: latitude, lng: longitude,});

    const handlePlaceSelected = (place) => {
        if(place.geometry){
            const { lat, lng } = place.geometry.location;
            const newLocation = { lat: lat(), lng: lng()};
            setRegion(newLocation);
            setMarkerPosition(newLocation);
        };
    };

    const updateField = (key, value) => {
        setApartment((prev) => ({...prev, [key]:value}));
    };

    const updateNestedField = (parentKey, childKey, value) => {
        setApartment((prev) => ({
            ...prev,
            [parentKey]: {
                ...prev[parentKey],
                [childKey]: value,
            },
        }));
    };

    const savePosition = () => {
        updateField("location", locationName);
        updateNestedField("coordinates", "longitude", markerPosition.longitude);
        updateNestedField("coordinates", "latitude", markerPosition.latitude);
    };

    const getLocationName = async (lat, lon) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleApiKey}`;

        try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            const addressComponents = data.results[0].address_components;
            let cityName = addressComponents.find(component => component.types.includes('locality'));
            if (!cityName){
                cityName = addressComponents.find(component => component.types.includes('administrative_area_level_1'));
            }
            console.log(cityName.long_name);
            updateField("location", cityName ? cityName.long_name : 'City not found');
        } else {
            throw new Error('Error fetching the location');
        }
        } catch (error) {
            console.log('Error fetching place name : ' + error);
            updateField("location", "Error");
        };
    };

    const lisitings = JSON.parse(localStorage.getItem("listings")) || [];
    const addListing = () => {
        const newListing = {
            location: apartment.location,
            name: apartment.name,
            photo_url: apartment.photo_url,
            price: apartment.price,
            type: apartment.type,
            bathroom: apartment.bathroom,
            bedroom: apartment.bedroom,
            images: apartment.images,
            distances: apartment.distances,
            description: apartment.description,
            person: apartment.person,
            coordinates: apartment.coordinates,
        };
        lisitings.push(newListing);
        localStorage.setItem("listings", JSON.stringify(lisitings));
        alert("Property added succesfully");
        navigate("/Home");
    };

    const uploadImages = async (event) => {
        try {
            const files = event.target.files;
            const images = [];
      
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
      
                // Use FileReader to read the image as a data URL
                const reader = new FileReader();
      
                reader.onload = () => {
                    images.push(reader.result);
      
                    // When all images are read, update the state
                    if (images.length === files.length) {
                    updateField("photo_url", images[0]); // First image as main photo
                    updateField("images", images); // Array of all images
                    }
                };
      
                reader.readAsDataURL(file); // Convert image to base64 URL
            }
        } catch (error) {
            console.log("Error uploading images:", error);
        }
    };

    const LocationSelector = (useCallback(() => {
        return (
            <LoadScript googleMapsApiKey={googleApiKey} libraries={libraries}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <GooglePlacesAutocomplete
                        apiKey={googleApiKey}
                        onPlaceSelected={handlePlaceSelected}
                        style={{ width: '300px', padding: '10px', marginBottom: '20px' }}
                    />

                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '400px', maxWidth: '800px' }}
                        center={region}
                        zoom={12}
                    >
                        {markerPosition && <Marker position={markerPosition} />}
                    </GoogleMap>
                </div>
            </LoadScript>
        );
    }, [markerPosition, region]))

    return (
        <div style={styles.mainContainer}>
            <div style={styles.allContainer}>
                {/*Title*/}
                <div style={styles.titleContainer}>
                    <h1 style={styles.title}>Add your listing</h1>
                </div>

                {/*Inputs*/}
                <div style={styles.inputsContainer}>
                    {/*Name*/}
                    <input
                        style={styles.input}
                        placeholder="Property Name"
                        value={apartment.name}
                        onChange={(name) => updateField("name", name.target.value)}
                        autoCapitalize="words"
                        enterKeyHint="next"
                        onSubmit={() => descriptionRef.current.focus()}
                    />

                    {/*Description*/}
                    <input
                        ref={descriptionRef}
                        style={styles.input}
                        placeholder="Description"
                        value={apartment.description}
                        onChange={(description) => updateField("description", description.target.value)}
                        autoCapitalize="sentences"
                        aria-multiline= {true}
                        enterKeyHint="next"
                        onSubmit={() => priceRef.current.focus()}
                    />

                    {/*Price*/}
                    <input
                        ref={priceRef}
                        style={styles.input}
                        placeholder="Price"
                        value={apartment.price}
                        onChange={(price) => updateField("price", price.target.value)}
                        type="number"
                        enterKeyHint="next"
                        onSubmit={() => bathroomsRef.current.focus()}
                    />

                    {/*Bathrooms*/}
                    <input
                        ref={bathroomsRef}
                        style={styles.input}
                        placeholder="Bathrooms"
                        value={apartment.bathroom}
                        onChange={(bathroom) => updateField("bathroom", bathroom.target.value)}
                        type="number"
                        enterKeyHint="next"
                        onSubmit={() => bedroomsRef.current.focus()}
                    />

                    {/*Bedrooms*/}
                    <input
                        ref={bedroomsRef}
                        style={styles.input}
                        placeholder="Bedrooms"
                        value={apartment.bedroom}
                        onChange={(bedroom) => updateField("bedroom", bedroom.target.value)}
                        type="number"
                        enterKeyHint="next"
                        onSubmit={() => typeRef.current.focus()}
                    />

                    {/*Type*/}
                    <select
                        ref={typeRef}
                        style={styles.typeSelector}
                        value={apartment.type}
                        onSelect={(type) => updateField("type", type.target.value)}
                    >
                        <option label="Property Type" value="" />
                        <option label="Cottage" value="Cottage" />
                        <option label="Villa" value="Villa" />
                        <option label="Apartment" value="Apartment" />
                        <option label="Hotel" value="Hotel" />
                    </select>

                    {/*Images*/}
                    <input
                        style={styles.input}
                        onChange={uploadImages}
                        type="file"
                        accept="image/*"
                        multiple
                    />

                    {/*Location*/}
                    <LocationSelector />

                    {/*Save button*/}
                    <div style={styles.savePropertyContainer}>
                        <button style={styles.savePropertyButton} onClick={addListing}>
                            Add your listing
                        </button>
                    </div>
                </div>
                <Navbar/>
            </div>
        </div>
    );
};

const styles = {
    mainContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      marginTop:"75px",
    },
    allContainer: {
      width: '100%',
      maxWidth: '800px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '20px 40px',
    },
    titleContainer: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#007bff',
    },
    inputsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    typeSelector: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      backgroundColor: '#ffffff',
      fontSize: '16px',
    },
    savePropertyContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
    savePropertyButton: {
      padding: '10px 20px',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
    },

};

export default AddListing;