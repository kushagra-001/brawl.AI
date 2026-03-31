import React from 'react';
import { Gift, Timer } from 'lucide-react';

const ActiveEvent = ({ playHover, playClick }) => {
  return (
    <div 
      className="active-event-banner premium-glass neo-border group-hover flex items-center justify-between mb-20 cursor-pointer overflow-hidden p-15"
      onMouseEnter={playHover}
      onClick={playClick}
    >
      <div className="event-bg-image absolute inset-0 bg-cover bg-center z-0 transition-transform duration-500"></div>
      <div className="event-overlay absolute inset-0 z-1 gradient-event"></div>
      
      <div className="event-content flex items-center justify-between w-full relative z-10">
        <div className="flex items-center gap-15">
          <div className="event-icon" style={{ background: 'rgba(255, 0, 85, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255, 0, 85, 0.5)' }}>
             <Gift color="var(--neon)" size={24} />
          </div>
          <div className="flex-col">
            <span className="neo-tag style-neon mb-5" style={{ background: 'rgba(255,0,85,0.15)', color: 'var(--neon)', borderColor: 'rgba(255,0,85,0.4)', width: 'max-content' }}>LIVE EVENT</span>
            <h3 className="font-orbitron text-white text-lg m-0 text-shadow-glow">NEON ASCENSION</h3>
            <p className="font-montserrat text-xs text-gray mt-5 m-0">Unlock exclusive skins before the season ends in sector 7.</p>
          </div>
        </div>
        
        <div className="event-timer text-right flex-col items-end gap-10">
           <div className="flex items-center gap-5 justify-end text-sm font-orbitron font-bold" style={{ color: 'var(--neon)', textShadow: '0 0 10px var(--neon)' }}>
             <Timer size={16} /> 04D : 12H : 33M
           </div>
           <button 
             className="view-event-btn font-orbitron text-xs rounded mt-5 cursor-pointer font-bold border-none"
             style={{ background: 'var(--neon)', color: '#fff', padding: '6px 15px', textShadow: '0 2px 5px rgba(0,0,0,0.5)', transition: 'all 0.2s', boxShadow: '0 0 15px rgba(255,0,85,0.4)' }}
           >
             VIEW REWARDS
           </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveEvent;
