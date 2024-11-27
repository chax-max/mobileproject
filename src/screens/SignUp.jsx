import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageMapping from "./imageMappings"; 

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [position, setPosition] = useState("Owner");
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    position: "",
  });

  // Validate form inputs
  const validateInputs = () => {
    const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/; // Full name (first + last name)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format
    const phoneNoRegex = /^(03|70|71|79|81)[0-9]{6}$/; // Valid phone number format (starts with 03, 71, 70, 79, 81 and 8 digits)

    let errors = {};

    if (!name) {
      errors.name = "Name can't be empty.";
    } else if (!nameRegex.test(name)) {
      errors.name = "Name must include both first and last name.";
    }

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

    if (!phoneNo) {
      errors.phoneNo = "Mobile number can't be empty.";
    } else if (!phoneNoRegex.test(phoneNo)) {
      errors.phoneNo = "Mobile number is not valid.";
    }

    if (!position) {
      errors.position = "Position must be selected.";
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle the sign-up process
  const handleSignUp = () => {
    if (!validateInputs()) return;

    // Simulate saving to localStorage (or a real database)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email already exists
    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      alert("An account with that email already exists.");
      return;
    }

    const newUser = { name, email, password, phoneNo, position };
    users.push(newUser);

    // Save users to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("User registered successfully!");

    // Navigate to the Login page after successful registration
    navigate("/LogIn");
  };

  // Handle input change and clear error message when valid
  const handleInputChange = (setter, field, validationFn) => (value) => {
    setter(value);
    // Validate field and clear error if valid
    if (validationFn(value)) {
      setErrorMessages((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateName = (name) => /^[A-Za-z]+ [A-Za-z]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const validatePhoneNo = (phoneNo) => /^(03|70|71|76|78|80|81)[0-9]{6}$/.test(phoneNo);

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
            type="text"
            value={name}
            placeholder="Full Name"
            onChange={(e) => handleInputChange(setName, "name", validateName)(e.target.value)}
            style={{ width: "95%", padding: "10px", marginBottom: "10px", borderRadius: "10px" }}
          />
          {errorMessages.name && <div style={{ color: "red", fontSize: "12px" }}>{errorMessages.name}</div>}

          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => handleInputChange(setEmail, "email", validateEmail)(e.target.value)}
            style={{ width: "95%", padding: "10px", marginBottom: "10px", borderRadius: "10px" }}
          />
          {errorMessages.email && <div style={{ color: "red", fontSize: "12px" }}>{errorMessages.email}</div>}

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => handleInputChange(setPassword, "password", validatePassword)(e.target.value)}
            style={{ width: "95%", padding: "10px", marginBottom: "10px", borderRadius: "10px" }}
          />
          {errorMessages.password && <div style={{ color: "red", fontSize: "12px" }}>{errorMessages.password}</div>}

          <input
            type="tel"
            value={phoneNo}
            placeholder="Mobile Number"
            onChange={(e) => handleInputChange(setPhoneNo, "phoneNo", validatePhoneNo)(e.target.value)}
            style={{ width: "95%", padding: "10px", marginBottom: "10px", borderRadius: "10px" }}
          />
          {errorMessages.phoneNo && <div style={{ color: "red", fontSize: "12px" }}>{errorMessages.phoneNo}</div>}

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "14px" }}>
              <input
                type="radio"
                name="position"
                value="Owner"
                checked={position === "Owner"}
                onChange={() => setPosition("Owner")}
              />
              Owner
            </label>
            <label style={{ fontSize: "14px" }}>
              <input
                type="radio"
                name="position"
                value="User"
                checked={position === "User"}
                onChange={() => setPosition("User")}
              />
              User
            </label>
          </div>
          {errorMessages.position && <div style={{ color: "red", fontSize: "12px" }}>{errorMessages.position}</div>}

          <button
            onClick={handleSignUp}
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
            Sign Up
          </button>

          <button
            onClick={() => navigate("/LogIn")}
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
            Already have an account? Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
