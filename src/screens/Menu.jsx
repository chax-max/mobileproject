import React from "react";
import { useNavigate } from 'react-router-dom'; 
import imageMapping from './imageMappings'; 

const Menu = () => {
  const navigate = useNavigate();

  const handlePress = () => { navigate('/whitepage'); };
  const handlePressHome = () => { navigate('/home'); };
  const handleLogoutPress = () => { navigate('/LogIn'); };
  const handleHelpPress = () => { navigate('/addlisting'); };

  //all3o chwe ana nese kif

  return (
    <div style={{
      position: "center",
      width: "95%",
      height: "95%",
      padding: "2% 3%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f5f5f5",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      overflowY: "auto",
      fontFamily: "'Raleway', sans-serif",
    }}>
      {/* Home Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "2px solid #ddd",
          height: "60px",
          alignItems: "center",
          marginBottom: "15px",
          padding: "0 20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={handlePressHome}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f0f0"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#ffffff"}
      >
        <img
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={imageMapping.homeLogo}
          alt="Home"
        />
        <p style={{
          fontSize: "18px",
          color: "#333",
          marginLeft: "15px",
          fontWeight: "500",
        }}>Home</p>
      </div>

      {/* Bookmark Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "2px solid #ddd",
          height: "60px",
          alignItems: "center",
          marginBottom: "15px",
          padding: "0 20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={handlePress}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f0f0"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#ffffff"}
      >
        <img
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={require("../assets/logo8.png")}
          alt="Bookmark"
        />
        <p style={{
          fontSize: "18px",
          color: "#333",
          marginLeft: "15px",
          fontWeight: "500",
        }}>Bookmark</p>
      </div>

      {/* Notifications Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "2px solid #ddd",
          height: "60px",
          alignItems: "center",
          marginBottom: "15px",
          padding: "0 20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={handlePress}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f0f0"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#ffffff"}
      >
        <img
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={require("../assets/logo1.png")}
          alt="Notifications"
        />
        <p style={{
          fontSize: "18px",
          color: "#333",
          marginLeft: "15px",
          fontWeight: "500",
        }}>Notifications</p>
      </div>

      {/* Nearby Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "2px solid #ddd",
          height: "60px",
          alignItems: "center",
          marginBottom: "15px",
          padding: "0 20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={handlePress}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f0f0"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#ffffff"}
      >
        <img
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={require("../assets/uuu.png")}
          alt="Nearby"
        />
        <p style={{
          fontSize: "18px",
          color: "#333",
          marginLeft: "15px",
          fontWeight: "500",
        }}>Nearby</p>
      </div>

      {/* Messages Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "2px solid #ddd",
          height: "60px",
          alignItems: "center",
          marginBottom: "15px",
          padding: "0 20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={handlePress}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f0f0"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#ffffff"}
      >
        <img
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={require("../assets/logo10.png")}
          alt="Messages"
        />
        <p style={{
          fontSize: "18px",
          color: "#333",
          marginLeft: "15px",
          fontWeight: "500",
        }}>Messages</p>
      </div>

      {/* Settings Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "2px solid #ddd",
          height: "60px",
          alignItems: "center",
          marginBottom: "15px",
          padding: "0 20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={handlePress}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f0f0"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#ffffff"}
      >
        <img
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={require("../assets/logo13.png")}
          alt="Settings"
        />
        <p style={{
          fontSize: "18px",
          color: "#333",
          marginLeft: "15px",
          fontWeight: "500",
        }}>Settings</p>
      </div>

      {/* Profile Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "2px solid #ddd",
          height: "60px",
          alignItems: "center",
          marginBottom: "15px",
          padding: "0 20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={handlePress}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f0f0"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#ffffff"}
      >
        <img
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={require("../assets/logo16.png")}
          alt="Profile"
        />
        <p style={{
          fontSize: "18px",
          color: "#333",
          marginLeft: "15px",
          fontWeight: "500",
        }}>Profile</p>
      </div>

      {/* Help Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "2px solid #ddd",
          height: "60px",
          alignItems: "center",
          marginBottom: "15px",
          padding: "0 20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={handleHelpPress}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f0f0"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#ffffff"}
      >
        <img
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={require("../assets/logo14.png")}
          alt="Help"
        />
        <p style={{
          fontSize: "18px",
          color: "#333",
          marginLeft: "15px",
          fontWeight: "500",
        }}>Help</p>
      </div>

      {/* Logout Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "2px solid #ddd",
          height: "60px",
          alignItems: "center",
          marginBottom: "15px",
          padding: "0 20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={handleLogoutPress}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f0f0"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#ffffff"}
      >
        <img
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={require("../assets/logo15.png")}
          alt="Logout"
        />
        <p style={{
          fontSize: "18px",
          color: "#333",
          marginLeft: "15px",
          fontWeight: "500",
        }}>Logout</p>
      </div>
    </div>
  );
};

export default Menu;
