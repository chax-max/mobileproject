import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
  return (
    <div style={styles.container}>
        <Navbar/>
      <h1 style={styles.title}>About Safe Shelter</h1>
      <p style={styles.subtitle}>
        Providing Refuge, Restoring Hope – Your New Home Awaits.
      </p>

      <div style={styles.content}>
        <div style={styles.textSection}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.paragraph}>
            At Safe Shelter, our mission is simple: To provide a safe, temporary
            home for those who need it most. We believe that everyone deserves a
            place to call home, especially those who have been displaced by war and
            crisis. We connect refugees with welcoming communities, offering a
            haven to heal, rebuild, and thrive.
          </p>
        </div>

        <div style={styles.textSection}>
          <h2 style={styles.sectionTitle}>How We Help</h2>
          <p style={styles.paragraph}>
            Through our platform, we offer easy access to a wide range of affordable
            rental properties specifically available for refugees. Our goal is to
            simplify the process of finding a safe place to live, whether it’s for
            individuals, families, or communities. We collaborate with landlords,
            governments, and local organizations to create a network of homes where
            refugees can start fresh.
          </p>
        </div>

        <div style={styles.textSection}>
          <h2 style={styles.sectionTitle}>Why Choose Safe Shelter?</h2>
          <ul style={styles.list}>
            <li style={styles.listItem}>🌍 Global Reach: Homes available in multiple countries and regions.</li>
            <li style={styles.listItem}>💼 Easy to Use: Our platform is user-friendly and quick to navigate.</li>
            <li style={styles.listItem}>🤝 Community Support: A network of people and resources to help you during your stay.</li>
            <li style={styles.listItem}>❤️ Compassionate: We understand the struggles and are committed to offering a safe, supportive environment.</li>
          </ul>
        </div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          Together, we can make a difference. Join us in creating a world where everyone has a place to call home.
        </p>
      </div>
      <Footer/>
    </div>
  );
};

// Styles for the About Section
const styles = {
  container: {
    backgroundColor: '#f7f7f7',
    padding: '40px 20px',
    fontFamily: '"Arial", sans-serif',
    color: '#333',
    margin: '0 auto',
    marginTop:"45px",
  },
  title: {
    fontSize: '36px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4facfe', 
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '20px',
    textAlign: 'center',
    color: '#555',
    marginBottom: '30px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  textSection: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4facfe', 
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  listItem: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  footer: {
    marginTop: '40px',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '18px',
    color: '#888',
    fontStyle: 'italic',
  },
};

export default About;
