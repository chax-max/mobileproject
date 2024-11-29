import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/Home";
import LogIn from "./screens/LogIn";
import SignUp from "./screens/SignUp";
import Menu from "./screens/Menu"; 
import WhitePage from "./screens/WhitePage";
import SearchListing from './screens/SearchListing';
import DetailProductNew from './screens/DetailProductNew';
import { LocationProvider } from "./functions/LocationContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false); 

  
  React.useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find((user) => user.email === "user@example.com"); 
    if (currentUser) {
      setIsAuthenticated(true); 
    }
  }, []);

  return (
    <LocationProvider>
    <Router>
      <Routes>
        {/* LogIn Route */}
        isAuthenticated ? <Route path="/Home" element={<Home />}/> : <Route path="/LogIn" element={<LogIn />} />
        

        {/* SignUp Route */}
        <Route path="/SignUp" element={<SignUp />} />

        {/* Home Route */}
        <Route
          path="/Home"
          element={
            isAuthenticated ? (
              <>
                <Home />
               
              </>
            ) : (
              <Navigate to="/LogIn" replace /> 
            )
            
          }
        />
        {/* Menu Route */}
        <Route path="/Menu" element={<Menu />} />

        {/* WhitePage Route */}
        <Route path="/whitepage" element={<WhitePage/>} />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/LogIn" replace />} />

        <Route path="/search-listing" element={<SearchListing />} />

        <Route path="/detail-product" element={<DetailProductNew />} />
        
      </Routes>
    </Router>
    </LocationProvider>
  );
};

export default App;
