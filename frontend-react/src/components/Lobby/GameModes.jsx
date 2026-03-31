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

        {/* Armory / Loadout Mode */}
        <div 
          className="mode-card secondary-mode armory-mode premium-glass neo-border group-hover mt-20"
          onClick={() => playClick()}
          onMouseEnter={playHover}
          style={{ height: 'auto', padding: '0', display: 'flex' }}
        >
          <div className="card-bg-image bg-armory" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542644288-06798b368ce4?q=80&w=2070&auto=format&fit=crop")', filter: 'hue-rotate(200deg) brightness(0.5)' }}></div>
          <div className="card-overlay gradient-dark transition-all duration-300"></div>
          
          <div className="card-content relative z-10 w-full flex-row justify-between items-center p-20" style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <div className="flex items-center gap-15">
              <ShieldOff size={40} className="text-secondary" />
              <div className="flex-col gap-5">
                <span className="neo-tag style-purple mb-5 w-fit block" style={{ padding: '2px 8px' }}>GEAR UP</span>
                <h3 className="font-orbitron text-white text-lg m-0">CYBER ARMORY</h3>
                <p className="text-xs text-gray mt-5 m-0 font-montserrat tracking-wide">Customize loadouts, skins & modules.</p>
              </div>
            </div>
            
            <button className="view-btn font-orbitron text-xs border border-secondary text-secondary px-15 py-10 rounded cursor-pointer bg-transparent transition-all hover:bg-secondary hover:text-white"
              style={{ transition: 'all 0.2s', textShadow: '0 0 5px var(--secondary)' }}
              onMouseEnter={(e) => {
                 playHover();
                 e.currentTarget.style.background = 'rgba(162, 56, 255, 0.2)';
                 e.currentTarget.style.boxShadow = '0 0 10px rgba(162, 56, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.boxShadow = 'none';
              }}
            >
               ACCESS RIG
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GameModes;
