import React from 'react';
import { Target, Gift, Award, CheckCircle } from 'lucide-react';

const DailyMissions = ({ playHover, playClick }) => {
  const missions = [
    { id: 1, title: 'First Blood', desc: 'Secure 1 takedown in any game mode.', reward: '100 XP', icon: <Target className="text-primary"/>, isComplete: true },
    { id: 2, title: 'Neural Mastery', desc: 'Win 2 AI simulation matches.', reward: '250 XP', icon: <Award className="text-secondary"/>, isComplete: false },
    { id: 3, title: 'Daily Login', desc: 'Log in to the arena.', reward: '50 $CORE', icon: <Gift className="#ffb800"/>, isComplete: true }
  ];

  return (
    <section className="bottom-section missions-panel premium-glass neo-border">
      <div className="missions-header flex items-center justify-between mb-15">
        <h3 className="section-header font-orbitron m-0">DAILY MISSIONS</h3>
        <span className="font-montserrat text-xs text-primary bg-primary-10 px-10 py-5 rounded">Resets in 14h 22m</span>
      </div>

      <div className="missions-grid">
        {missions.map(m => (
          <div key={m.id} className={`mission-card premium-glass neo-border flex-row items-center gap-15 ${m.isComplete ? 'completed opacity-70' : ''}`} onMouseEnter={playHover}>
            <div className="mission-icon bg-black-50 p-10 rounded">
              {m.isComplete ? <CheckCircle className="text-neon" size={24}/> : m.icon}
            </div>
            
            <div className="mission-info flex-1">
              <h4 className={`font-orbitron ${m.isComplete ? 'line-through text-gray' : 'text-white'}`}>{m.title}</h4>
              <p className="font-montserrat text-xs text-gray mt-5">{m.desc}</p>
            </div>
            
            <div className="mission-reward bg-black-50 px-15 py-5 rounded border border-gray">
              <span className={`font-orbitron text-sm ${m.isComplete ? 'text-gray' : 'text-primary'}`}>{m.reward}</span>
            </div>
            
            {!m.isComplete && (
              <button className="claim-btn font-orbitron text-xs bg-primary text-black px-15 py-5 rounded" onClick={playClick}>
                GO
              </button>
            )}
            {m.isComplete && (
              <button className="claim-btn font-orbitron text-xs bg-gray text-dark-gray px-15 py-5 rounded cursor-not-allowed">
                DONE
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyMissions;
