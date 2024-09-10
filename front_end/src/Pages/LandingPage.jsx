import React from 'react'
import Navbar from '../Components/pageSections/Navbar'
import '../cssFiles/Landing.css'

const LandingPage = () => {
  const backgroundStyle = {
    backgroundImage:'url(/images/bg.jpg)',
    backgroundSize: 'cover', // Makes the background cover the entire page
    backgroundPosition: 'center', // Centers the image
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    height: '40vh', // Sets the height to the viewport height
    width: '100vw' // Sets the width to the viewport width
  };

  return (
    <>
     <Navbar />
    <div style={backgroundStyle}>
    </div>
    <div className="landing-page-container">
        <section className="landing-content">
          
          <h1 className="landing-title">Welcome to Bookly</h1>
          <p className="landing-description">
            Join your friends and communities in sharing and discovering books. Let’s bring literature closer to you.
          </p>
          
        </section>
      </div>
    </>
  );
};

export default LandingPage