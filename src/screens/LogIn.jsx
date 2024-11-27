import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageMapping from "./imageMappings";

const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

  // Validate form inputs
  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    let errors = {};

    if (!email) {
      errors.email = "Email can't be empty.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!password) {
      errors.password = "Password can't be empty.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle the login process
  const handleLogIn = () => {
    if (!validateInputs()) return;

    // Simulate fetching users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email exists
    const user = users.find((user) => user.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      setErrorMessages({ email: "No account found with that email." });
      return;
    }

    // Check if the password is correct
    if (user.password !== password) {
      setErrorMessages({ password: "Incorrect password." });
      return;
    }

    alert("Login successful!");

    // Redirect to Home page after successful login
    navigate("/Home");
  };

  return (
    <div style={{ background: "linear-gradient(#f7f7f7, #e8e8e8)", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          height: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "20px",
            width: "90%",
            maxWidth: "400px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src={imageMapping["../assets/main-logo.png"]}
              alt="Logo"
              style={{ width: "100px", height: "100px" }}
            />
          </div>

          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "95%", padding: "10px", marginBottom: "10px", borderRadius: "10px" }}
          />
          {errorMessages.email && <div style={{ color: "red", fontSize: "12px" }}>{errorMessages.email}</div>}

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "95%", padding: "10px", marginBottom: "10px", borderRadius: "10px" }}
          />
          {errorMessages.password && <div style={{ color: "red", fontSize: "12px" }}>{errorMessages.password}</div>}

          <button
            onClick={handleLogIn}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#d8bfd8",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Log In
          </button>

          <button
            onClick={() => navigate("/SignUp")}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#d8bfd8",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
