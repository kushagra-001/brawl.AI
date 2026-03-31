import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Swords, Users, Trophy } from 'lucide-react';

const GameModes = ({ playHover, playClick }) => {
  const navigate = useNavigate();

  const modes = [
    {
      id: 'ai',
      title: 'AI Showdown',
      icon: <Bot size={28} />,
      desc: 'Train your reflexes against neural bots.',
      tag: 'TRAINING',
      color: 'cyan',
      bgImg: 'url("https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2070&auto=format&fit=crop")'
    },
    {
      id: 'duel',
      title: 'Duel',
      icon: <Swords size={28} />,
      desc: '1v1 Combat. Prove your dominance.',
      tag: 'RANKED',
      color: 'pink',
      bgImg: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop")'
    },
    {
      id: 'squad',
      title: 'Squad Battle',
      icon: <Users size={28} />,
      desc: 'Team up. Destroy the enemy core.',
      tag: 'MULTIPLAYER',
      color: 'purple',
      bgImg: 'url("https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop")'
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard',
      icon: <Trophy size={28} />,
      desc: 'See who reigns supreme in the arena.',
      tag: 'GLOBAL',
      color: 'gold',
      bgImg: 'url("https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop")'
    }
  ];

  const handleModeClick = (id) => {
    playClick();
    if (id === 'ai') navigate('/battle');
    if (id === 'duel') navigate('/arena');
    // others can be stubs
  };

  return (
    <section className="anime-modes-section">
      <div className="section-title-anime">
        <h2 className="font-orbitron cyber-text-glow">SELECT ARENA</h2>
      </div>

      <div className="anime-modes-grid">
         {modes.map((mode) => (
           <div 
             key={mode.id}
             className={`anime-card color-theme-${mode.color}`}
             onClick={() => handleModeClick(mode.id)}
             onMouseEnter={playHover}
           >
             <div className="anime-card-bg" style={{ backgroundImage: mode.bgImg }}></div>
             <div className="anime-card-overlay"></div>
             <div className="anime-card-content">
               <div className="anime-tag-bar">
                 <span className="anime-tag">{mode.tag}</span>
               </div>
               
               <div className="anime-card-center">
                 <div className="anime-icon-wrapper">{mode.icon}</div>
                 <h2 className="font-orbitron anime-title">{mode.title}</h2>
                 <p className="font-montserrat anime-desc">{mode.desc}</p>
               </div>
               
               <div className="anime-card-action">
                 <button className="anime-btn font-orbitron">ENTER</button>
               </div>
             </div>
           </div>
         ))}
      </div>
    </section>
  );
};

export default GameModes;
