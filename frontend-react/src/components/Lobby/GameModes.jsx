import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Play, Swords, ShieldOff } from 'lucide-react';

const GameModes = ({ playHover, playClick }) => {
  const navigate = useNavigate();

  return (
    <section className="central-hub">
      <div className="section-title font-orbitron">
        <h2>WARZONE SELECTOR</h2>
        <div className="title-line"></div>
      </div>

      <div className="modes-layout flex-col gap-20">
        
        {/* Main Feature: AI BATTLE */}
        <div 
          className="mode-card main-mode premium-glass neo-border group-hover"
          onClick={() => { playClick(); navigate('/battle'); }}
          onMouseEnter={playHover}
        >
          <div className="card-bg-image main-bg"></div>
          <div className="card-overlay gradient-blue"></div>
          
          <div className="card-content flex-col justify-between h-full relative z-10">
            <div className="card-header flex justify-between">
              <span className="neo-tag">MAIN PROTOCOL</span>
              <span className="player-count"><Zap size={14}/> ONLINE</span>
            </div>

            <div className="card-body">
               <h2 className="font-orbitron cyber-glitch" data-text="AI COMBAT SIM">AI COMBAT SIM</h2>
               <p className="font-montserrat">Enter the neural simulation. Train your logic and reflexes against state-of-the-art bots.</p>
            </div>

            <div className="card-footer mt-auto">
              <button className="deploy-btn font-orbitron bg-primary text-black">
                <Play size={18} fill="currentColor"/> INITIATE BATTLE
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Modes Grid */}
        <div className="grid-2col gap-20">
          
          {/* Quick Match */}
          <div 
            className="mode-card secondary-mode premium-glass neo-border group-hover"
            onClick={() => { playClick(); navigate('/arena'); }}
            onMouseEnter={playHover}
          >
            <div className="card-bg-image bg-orange"></div>
            <div className="card-overlay gradient-dark"></div>
            
            <div className="card-content relative z-10 flex-col justify-between">
              <span className="neo-tag style-orange mb-10 w-fit">QUICK</span>
              <div className="card-body">
                <h3 className="font-orbitron">BATTLE ROYALE</h3>
                <p className="text-xs text-gray mt-5">Drop in. Survive against 99.</p>
              </div>
            </div>
          </div>

          {/* Ranked Mode */}
          <div 
            className="mode-card secondary-mode premium-glass neo-border group-hover"
            onClick={() => playClick()}
            onMouseEnter={playHover}
          >
             <div className="card-bg-image bg-purple"></div>
             <div className="card-overlay gradient-purple"></div>
            
             <div className="card-content relative z-10 flex-col justify-between">
               <span className="neo-tag style-purple mb-10 w-fit">RANKED</span>
               <div className="card-body">
                 <h3 className="font-orbitron">1 V 1 ARENA</h3>
                 <p className="text-xs text-gray mt-5">Climb the global ladder.</p>
               </div>
             </div>
          </div>

        </div>

        {/* Disabled Mode */}
        <div 
          className="mode-card disabled-mode premium-glass border-gray"
          onMouseEnter={playHover}
        >
          <div className="card-bg-image bg-gray filter-grayscale"></div>
          <div className="card-overlay bg-black-70"></div>
          
          <div className="card-content relative z-10 flex items-center gap-15">
            <ShieldOff size={40} className="text-gray" />
            <div>
              <h3 className="font-orbitron text-gray">TEAM MULTIPLAYER</h3>
              <p className="text-xs text-dark-gray">Network modules under construction...</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GameModes;
