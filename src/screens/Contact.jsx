import React, { useState } from 'react';
import Navbar from './Navbar';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};

        // Validate first name and last name
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address.';
        }

        // Validate phone number with specific prefixes
        const phonePattern = /^(03|70|71|76|79|81|78)\d{6}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required.';
        } else if (!phonePattern.test(formData.phone)) {
            newErrors.phone = 'Enter a valid phone number.';
        }

        // Validate message
        if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error message for the field when the user starts typing again
        if (errors[name]) {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name]; // Remove error for the specific field
                return newErrors;
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setSubmitted(true);
            alert('Thank you for your message! We will get back to you soon.');
            setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
            setErrors({});
        }
    };

    return (
        <div
            style={{
                fontFamily: "'Poppins', sans-serif",
                background: '#f0f0f0',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
            }}
        >
            <Navbar />
            {/* Contact Card */}
            <div
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    padding: '2rem 3rem',
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    width: '80%',
                    maxWidth: '600px',
                    marginTop: '60px',
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                    }}
                >
                    <img
                        src={require('../assets/main-logo.png')}
                        alt="Logo"
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                        }}
                    />
                </div>

                <h1
                    style={{
                        textAlign: 'center',
                        fontSize: '2rem',
                        color: '#444',
                        marginBottom: '1.5rem',
                    }}
                >
                    Get in Touch
                </h1>
                <p
                    style={{
                        textAlign: 'center',
                        fontSize: '1rem',
                        color: '#666',
                        marginBottom: '2rem',
                    }}
                >
                    We'd love to hear from you! Fill out the form below to send us a message.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label
                            htmlFor="firstName"
                            style={{
                                display: 'block',
                                fontWeight: '600',
                                marginBottom: '0.5rem',
                                color: '#333',
                            }}
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Your First Name"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '10px',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: errors.firstName ? '2px solid #e74c3c' : 'none',
                            }}
                        />
                        {errors.firstName && <p style={{ color: '#e74c3c', marginTop: '0.5rem' }}>{errors.firstName}</p>}
                    </div>

                    {/* Last Name */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label
                            htmlFor="lastName"
                            style={{
                                display: 'block',
                                fontWeight: '600',
                                marginBottom: '0.5rem',
                                color: '#333',
                            }}
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Your Last Name"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '10px',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: errors.lastName ? '2px solid #e74c3c' : 'none',
                            }}
                        />
                        {errors.lastName && <p style={{ color: '#e74c3c', marginTop: '0.5rem' }}>{errors.lastName}</p>}
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label
                            htmlFor="email"
                            style={{
                                display: 'block',
                                fontWeight: '600',
                                marginBottom: '0.5rem',
                                color: '#333',
                            }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '10px',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: errors.email ? '2px solid #e74c3c' : 'none',
                            }}
                        />
                        {errors.email && <p style={{ color: '#e74c3c', marginTop: '0.5rem' }}>{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label
                            htmlFor="phone"
                            style={{
                                display: 'block',
                                fontWeight: '600',
                                marginBottom: '0.5rem',
                                color: '#333',
                            }}
                        >
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Your Phone Number"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '10px',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: errors.phone ? '2px solid #e74c3c' : 'none',
                            }}
                        />
                        {errors.phone && <p style={{ color: '#e74c3c', marginTop: '0.5rem' }}>{errors.phone}</p>}
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label
                            htmlFor="message"
                            style={{
                                display: 'block',
                                fontWeight: '600',
                                marginBottom: '0.5rem',
                                color: '#333',
                            }}
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '10px',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: errors.message ? '2px solid #e74c3c' : 'none',
                                resize: 'none',
                            }}
                        />
                        {errors.message && <p style={{ color: '#e74c3c', marginTop: '0.5rem' }}>{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#4facfe',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(106, 17, 203, 0.4)',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#6a11cb')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#4facfe')}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
