import React, { useState, useRef } from "react";
import { useLocationContext } from "../functions/LocationContext";
import { useNavigate } from "react-router-dom";
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "../functions/GoogleMapsContext";
import Navbar from "./Navbar";
import { useUser } from "../functions/UserContext";


const googleApiKey = process.env.REACT_APP_GOOGLE_API;

const AddListing = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { latitude, longitude } = useLocationContext();
    const { scriptLoaded } = useGoogleMaps();

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
        bathroom: "", //Input Fields Done
        bedroom: "", //Input Fields Done
        images: [], //Input Fields //Done// Image Selector
        distances: {},
        description: "", //Input Fields Done
        person: {
            name: user.name,
            image_url: user.avatar,
            phonenumber: user.phoneNo,
            email: user.email,
            position: user.position,
        },
        coordinates: { //Location Selecter //Done// markerPosition
            latitude: 0,
            longitude: 0,
        },
    });

    const [markerPosition, setMarkerPosition] = useState({lat: latitude, lng: longitude});
    const [region, setRegion] = useState({lat: latitude, lng: longitude,});

    const handlePlaceSelected = async (place) => {
        if(place.geometry){
            const { lat, lng } = place.geometry.location;
            const newLocation = { lat: lat(), lng: lng()};
            await getLocationName(newLocation.lat, newLocation.lng);
            setRegion(newLocation);
            setMarkerPosition(newLocation);
            updateNestedField("coordinates","latitude", newLocation.lat);
            updateNestedField("coordinates","longitude", newLocation.lng);
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

    const [listings, setListings] = useState([]);
    const addListing = async () => {
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

        try {
            const response = await fetch('http://localhost:5000/addListing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newListing)    ,
            });

            const result = await response.json();

            if(response.ok){
                alert("Property added succesfully");
            } else {
                throw new Error(result.error);
            }
        } catch (addListingError) {
            console.log("Error adding listing:", addListingError);
            alert("An error occurred while adding your listing.");
        }
    };

    const uploadImages = async (event) => {
        try {
            const files = Array.from(event.target.files);
            const formData = new FormData();
                files.forEach((file) => {
            formData.append('images',file);
            });

            const response = await fetch('http://localhost:5000/uploadImages', {
                method: 'POST',
                body: formData,
            });

            if(!response.ok){
                throw new Error('Failed to upload images');
            }

            const imagesUrls = await response.json();
            updateField("images", imagesUrls);
            updateField("photo_url", imagesUrls[0]);

            console.log(imagesUrls);
        } catch (error) {
            console.log("Error uploading images:", error);
        }
    };

    if(!scriptLoaded){
        return <div>Loading...</div>
    };

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
                        onChange={(type) => updateField("type", type.target.value)}
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