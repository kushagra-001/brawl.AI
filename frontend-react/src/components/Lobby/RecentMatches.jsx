import React from 'react';
import { Swords } from 'lucide-react';

const RecentMatches = ({ playHover, playClick }) => {
  const matches = [
    { id: 1, mode: 'AI COMBAT', result: 'VICTORY', score: '+24', time: '10m ago', isWin: true },
    { id: 2, mode: 'BATTLE ROYALE', result: 'TOP 5', score: '+18', time: '1h ago', isWin: true },
    { id: 3, mode: '1V1 ARENA', result: 'DEFEAT', score: '-12', time: '3h ago', isWin: false }
  ];

  return (
    <div className="recent-matches premium-glass neo-border p-20 flex-col gap-15">
      <div 
        className="section-header flex items-center gap-10 font-orbitron m-0 border-b pb-10 border-gray w-full"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <Swords size={18} className="text-primary"/> 
        <h3 className="m-0 text-sm tracking-wide text-gray-200" style={{ letterSpacing: '1px' }}>LAST ENCOUNTERS</h3>
      </div>
      
      <div className="matches-list flex-col gap-10">
        {matches.map(m => (
          <div 
            key={m.id} 
            className="match-item flex items-center justify-between p-10 rounded cursor-pointer transition-all"
            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.03)' }}
            onMouseEnter={(e) => {
               playHover();
               e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
               e.currentTarget.style.borderColor = m.isWin ? 'rgba(0,240,255,0.3)' : 'rgba(255,0,85,0.3)';
            }}
            onMouseLeave={(e) => {
               e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
               e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)';
            }}
            onClick={playClick}
          >
            <div>
              <div 
                className={`font-orbitron text-sm font-bold ${m.isWin ? 'text-primary' : 'text-neon'}`}
                style={{ textShadow: m.isWin ? '0 0 5px rgba(0,240,255,0.5)' : '0 0 5px rgba(255,0,85,0.5)' }}
              >
                {m.result}
              </div>
              <div className="font-montserrat text-xs text-gray mt-5">{m.mode} • {m.time}</div>
            </div>
            <div 
              className={`font-orbitron font-extrabold ${m.isWin ? 'text-primary' : 'text-neon'}`}
              style={{ fontSize: '1.2rem' }}
            >
              {m.score}
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className="view-all-btn font-orbitron text-xs text-gray bg-transparent border border-gray rounded py-8 mt-5 cursor-pointer transition-all w-full" 
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        onMouseEnter={(e) => {
           playHover();
           e.currentTarget.style.color = '#fff';
           e.currentTarget.style.borderColor = 'var(--primary)';
           e.currentTarget.style.background = 'rgba(0,240,255,0.05)';
        }}
        onMouseLeave={(e) => {
           e.currentTarget.style.color = 'var(--text-gray)';
           e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
           e.currentTarget.style.background = 'transparent';
        }}
        onClick={playClick}>
        VIEW FULL INTEL
      </button>
    </div>
  );
};

export default RecentMatches;
