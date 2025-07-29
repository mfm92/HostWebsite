import React, { useState, useEffect } from "react";
import CongratsBanner from "./CongratsBanner";
import DonationBanner from "./DonationBanner";
import "../styles/IntermittentBanner.css"; // Import your CSS for fade effects

const IntermittentBanner = () => {
  const [showCongrats, setShowCongrats] = useState(true);
  const [fadeProp, setFadeProp] = useState({ fade: 'fade-in' });

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeProp({ fade: 'fade-out' });
      setTimeout(() => {
        setShowCongrats(prev => !prev);
        setFadeProp({ fade: 'fade-in' });
      }, 500); // Match to CSS fade duration
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div font="proximanova">
      <DonationBanner />
    </div>
  );
};

export default IntermittentBanner;
