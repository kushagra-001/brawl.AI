import React, { useEffect, useState } from 'react';
import { Crosshair, Target, Zap, Activity } from 'lucide-react';

// Animated counter hook
const useCounter = (end, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
    return () => setCount(0); // Reset if end changes
  }, [end, duration]);

  return count;
};

// Target SVG icon
const TargetIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const StatsDashboard = ({ stats }) => {
  const matchesAnim = useCounter(stats.totalMatches);
  const winsAnim = useCounter(stats.wins);
  const winRateAnim = useCounter(parseInt(stats.winRate));
  const streakAnim = useCounter(stats.streak);

  return (
    <div className="stats-dashboard premium-glass neo-border">
      <h3 className="font-orbitron section-sub">
        <Activity size={18} className="text-primary" /> 
        COMBAT TELEMETRY
      </h3>
      
      <div className="stat-grid-v2">
        <div className="stat-cell">
          <Crosshair className="stat-icon" size={24}/>
          <div className="stat-data">
            <span className="stat-value font-orbitron text-white">{matchesAnim}</span>
            <span className="stat-label font-montserrat text-gray">DROPS</span>
          </div>
        </div>

        <div className="stat-cell">
          <TargetIcon className="stat-icon" />
          <div className="stat-data">
            <span className="stat-value font-orbitron text-primary">{winsAnim}</span>
            <span className="stat-label font-montserrat text-gray">WINS</span>
          </div>
        </div>

        <div className="stat-cell">
          <Zap className="stat-icon" size={24}/>
          <div className="stat-data">
            <span className="stat-value font-orbitron text-secondary">{winRateAnim}%</span>
            <span className="stat-label font-montserrat text-gray">WIN RATE</span>
          </div>
        </div>

        <div className="stat-cell">
          <svg className="stat-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <div className="stat-data">
            <span className="stat-value font-orbitron text-neon">{streakAnim}</span>
            <span className="stat-label font-montserrat text-gray">STREAK</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
