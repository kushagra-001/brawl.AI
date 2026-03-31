import React from 'react';
import { Target, Gift, Zap, CheckCircle } from 'lucide-react';

const DailyMissions = ({ playHover, playClick }) => {
  const missions = [
    { id: 1, title: 'Win 3 battles', reward: '100 XP', icon: <Target className="text-primary"/>, isComplete: false },
    { id: 2, title: 'Play 1 squad match', reward: '250 CR', icon: <Zap className="text-secondary"/>, isComplete: false },
    { id: 3, title: 'Daily Login', reward: '50 CR', icon: <Gift className="text-gold"/>, isComplete: true }
  ];

  return (
    <section className="anime-missions-panel glow-border">
      <div className="anime-panel-header mt-0">
         <h3 className="section-header font-orbitron m-0 cyber-text-shadow">BOUNTY BOARDS</h3>
      </div>

      <div className="anime-mission-list">
        {missions.map(m => (
          <div 
             key={m.id} 
             className={`anime-mission-card flex items-center justify-between p-15 group-hover ${m.isComplete ? 'completed-mission' : ''}`}
             onMouseEnter={playHover}
             onClick={playClick}
          >
            <div className="flex items-center gap-15 flex-1">
               <div className="mission-icon bg-opacity-20 p-10 rounded">
                 {m.isComplete ? <CheckCircle className="text-neon" size={24}/> : m.icon}
               </div>
               <div>
                  <h4 className={`font-orbitron m-0 ${m.isComplete ? 'text-gray line-through' : 'text-white'}`}>{m.title}</h4>
                  <p className="font-montserrat text-xs text-secondary mt-5 m-0 font-bold">Reward: {m.reward}</p>
               </div>
            </div>
            
            <div className="mission-action">
               <button 
                 className={`bounty-btn font-orbitron text-xs font-bold px-15 py-5 rounded border-none ${m.isComplete ? 'bg-gray text-dark-gray' : 'bg-primary text-black cursor-pointer'}`}
                 disabled={m.isComplete}
               >
                 {m.isComplete ? 'DONE' : 'GO'}
               </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyMissions;
