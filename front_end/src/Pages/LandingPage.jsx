import React from 'react'
import Navbar from '../Components/pageSections/Navbar'
import '../cssFiles/Wrapper.css'

const LandingPage = ({children}) => {
  const backgroundStyle = {
    backgroundImage:'url(/images/hp.png)',
    backgroundSize: 'cover', // Makes the background cover the entire page
    backgroundPosition: 'center', // Centers the image
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    height: '100vh', // Sets the height to the viewport height
    width: '100vw' // Sets the width to the viewport width
  };

  return (
    <>
     <Navbar />
    <div style={backgroundStyle}>
    </div>
    </>
  );
};

export default LandingPage