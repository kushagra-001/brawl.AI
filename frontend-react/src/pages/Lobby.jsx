import React, { useState, useEffect, useRef } from 'react';
import './Lobby.css';

// Import newly created sub-components
import TopBar from '../components/Lobby/TopBar';
import PlayerProfile from '../components/Lobby/PlayerProfile';
import StatsDashboard from '../components/Lobby/StatsDashboard';
import GameModes from '../components/Lobby/GameModes';
import RightPanel from '../components/Lobby/RightPanel';
import DailyMissions from '../components/Lobby/DailyMissions';

const Lobby = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [theme, setTheme] = useState('neon'); // 'neon' or 'dark'

  // Refs for audio objects (bonus feature)
  const hoverSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'));
  const clickSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'));

  useEffect(() => {
    // Configure audio volumes
    hoverSound.current.volume = 0.1;
    clickSound.current.volume = 0.3;

    // Simulate loading data and entry animation
    setTimeout(() => {
      setProfile({
        level: 42,
        xp: 3200,
        maxXP: 5000,
        rank: 'PLATINUM',
        stats: {
          totalMatches: 842,
          wins: 512,
          winRate: '60%',
          streak: 5
        }
      });
      setIsLoading(false);
    }, 1500); // 1.5s loading animation
  }, []);

  const playHover = () => {
    if (!soundOn) return;
    hoverSound.current.currentTime = 0;
    hoverSound.current.play().catch(e => console.log('Audio block', e));
  };

  const playClick = () => {
    if (!soundOn) return;
    clickSound.current.currentTime = 0;
    clickSound.current.play().catch(e => console.log('Audio block', e));
  };

  const toggleSound = () => setSoundOn(!soundOn);
  const toggleTheme = () => setTheme(theme === 'neon' ? 'dark' : 'neon');

  if (isLoading) {
    return (
      <div className="lobby-loading-screen">
        <div className="loader-glitch" data-text="INITIALIZING ARENA...">INITIALIZING ARENA...</div>
        <div className="loading-bar"><div className="loading-fill"></div></div>
      </div>
    );
  }

  return (
    <div className={`new-lobby-container theme-${theme}`}>
      {/* Dynamic Backgrounds */}
      <div className="lobby-stars-bg"></div>
      <div className="lobby-vignette"></div>

      {/* Structured Layout Wrapper */}
      <div className="lobby-grid-layout">
        
        {/* TOP BAR */}
        <div className="grid-header">
          <TopBar 
            playHover={playHover} 
            playClick={playClick} 
            soundOn={soundOn} 
            toggleSound={toggleSound}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </div>

        {/* LEFT COLUMN: Profile & Stats */}
        <div className="grid-left-col flex-col gap-20">
          <PlayerProfile 
            profile={profile} 
            playHover={playHover} 
            playClick={playClick} 
          />
          <StatsDashboard stats={profile.stats} />
        </div>

        {/* CENTER COLUMN: Game Modes */}
        <div className="grid-center-col">
          <GameModes playHover={playHover} playClick={playClick} />
        </div>

        {/* RIGHT COLUMN: Social, Chat & Leaderboard */}
        <div className="grid-right-col">
          <RightPanel playHover={playHover} playClick={playClick} />
        </div>

        {/* BOTTOM SECTION: Missions */}
        <div className="grid-bottom-row">
          <DailyMissions playHover={playHover} playClick={playClick} />
        </div>

      </div>
    </div>
  );
};

export default Lobby;
