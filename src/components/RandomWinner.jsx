import { useState, useEffect } from 'react';
import nscWinnersData from '../data/winners/nsc_winners';
import '../styles/nscWinners.css'; // Import your CSS for fade effects

const RandomWinner = () => {
  const [currentWinner, setCurrentWinner] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const getRandomWinner = () => {
    const randomIndex = Math.floor(Math.random() * nscWinnersData.length);
    return nscWinnersData[randomIndex];
  };

  useEffect(() => {
    const showNewWinner = () => {
      setIsVisible(false); // Fade out
      setTimeout(() => {
        setCurrentWinner(getRandomWinner());
        setIsVisible(true); // Fade in
      }, 400); // Wait for fade-out to finish
    };

    showNewWinner(); // Show first winner immediately
    const interval = setInterval(showNewWinner, 10000); // Change every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="font-proximanova bg-gradient-to-r from-orange-900/70 to-black-500/70 p-4 rounded-lg shadow-lg text-center">
        ... trip down memory lane with a random NSC winner!
        {currentWinner && (
        <div className={`winner-fade ${isVisible ? 'visible' : ''}`}>
            <p className="flex flex-wrap justify-center gap-1 whitespace-nowrap text-sm">
            <span>
                <span className="font-bold">{currentWinner.edition}</span>
                {" "} {currentWinner.country}
            </span>
            <span className="opacity-50">—</span>
            <span>{currentWinner.artist}</span>
            <span className="opacity-50">—</span>
            <span><em>{currentWinner.song}</em></span>
            <span className="opacity-50">—</span>
            <span>{currentWinner.points} pts</span>
            </p>
        </div>
        )}
    </div>
    );

};

export default RandomWinner;
