import React, { createContext, useState, useContext, useEffect } from 'react';

const LocationContext = createContext();
const googleApiKey = process.env.REACT_APP_GOOGLE_API;

export const LocationProvider = ({children}) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude,  setLongitude] = useState(0);
    const [locationName, setLocationName] = useState(null);
    const [isLocationFetched, setIsLocationFetched] = useState(null);

    const getCurrentLocation = async () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
                console.log(error);
            });
        } else {
            alert("Geolocation is not supported by this browser");
        }
    };

    const getCurrentLocationName = async (lat, lon) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleApiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if(data.status === 'OK') {
                const addressComponents = data.results[0].address_components;
                const cityName = addressComponents.find(component => component.types.includes('locality'));
                setLocationName(cityName ? cityName.long_name : 'City not found');
            } else {
                throw new Error("Error fetching the location name");
            }
        } catch (error) {
            console.log(error);
            setLocationName('Error');
        };
    };

    useEffect(() => {
        if (!isLocationFetched) {
            getCurrentLocation();
            setIsLocationFetched(true);
        }
    }, [isLocationFetched]);

    useEffect(() => {
        if (latitude && longitude) {
            getCurrentLocationName(latitude, longitude);
        };
    }, [latitude, longitude]);

    return (
        <LocationContext.Provider
            value={{
                latitude,
                longitude,
                locationName
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => {
    const context = useContext(LocationContext);
    if(!context) {
        throw new Error("useLocation must be used withing a LocationProvider");
    };
    return context;
};