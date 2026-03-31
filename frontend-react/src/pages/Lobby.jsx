import React, { useState, useEffect, useRef } from 'react';
import './Lobby.css';

// Anime Theme Components
import TopBar from '../components/Lobby/TopBar';
import PlayerProfile from '../components/Lobby/PlayerProfile';
import GameModes from '../components/Lobby/GameModes';
import FriendsList from '../components/Lobby/FriendsList';
import ChatBox from '../components/Lobby/ChatBox';
import DailyMissions from '../components/Lobby/DailyMissions';

const Lobby = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [soundOn, setSoundOn] = useState(true);

  // Audio elements
  const hoverSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'));
  const clickSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'));

  useEffect(() => {
    hoverSound.current.volume = 0.1;
    clickSound.current.volume = 0.3;

    setTimeout(() => {
      setProfile({
        level: 24,
        xp: 8500,
        maxXP: 10000,
        rank: 'WARRIOR'
      });
      setIsLoading(false);
    }, 1200);
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

  if (isLoading) {
    return (
      <div className="lobby-loading-anime">
        <div className="loader-glitch-anime text-neon">CONNECTING TO ARENA...</div>
        <div className="loading-bar-anime"><div className="loading-fill-anime bg-primary"></div></div>
      </div>
    );
  }

  return (
    <div className="anime-lobby-container">
      {/* Background Anime Assets */}
      <div className="anime-bg-main" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2074&auto=format&fit=crop")' }}></div>
      <div className="anime-bg-overlay"></div>
      <div className="anime-particles"></div>

      {/* Grid Layout */}
      <div className="anime-grid-layout">
        
        {/* Top Header */}
        <div className="grid-header-anime">
          <TopBar 
            playHover={playHover} 
            playClick={playClick} 
            soundOn={soundOn} 
            toggleSound={() => setSoundOn(!soundOn)}
          />
        </div>

        {/* Left Col: Profile & Missions */}
        <div className="grid-left-col-anime flex-col gap-20">
          <PlayerProfile 
            profile={profile} 
            playHover={playHover} 
            playClick={playClick} 
          />
          <DailyMissions playHover={playHover} playClick={playClick} />
        </div>

        {/* Center Col: Game Modes */}
        <div className="grid-center-col-anime">
          <GameModes playHover={playHover} playClick={playClick} />
        </div>

        {/* Right Col: Friends & Chat */}
        <div className="grid-right-col-anime flex-col gap-20">
          <div className="friends-panel flex-1">
            <FriendsList playHover={playHover} playClick={playClick} />
          </div>
          <div className="chat-panel flex-1">
             <ChatBox playHover={playHover} playClick={playClick} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Lobby;
