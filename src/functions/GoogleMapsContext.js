import React, { createContext, useContext, useState, useEffect } from 'react';

const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children }) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        if (window.google) {
            setScriptLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API}&libraries=places`;
        script.async = true;
        script.onload = () => setScriptLoaded(true);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <GoogleMapsContext.Provider value={{ scriptLoaded }}>
            {children}
        </GoogleMapsContext.Provider>
    );
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);
