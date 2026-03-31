import React, { useState } from 'react';
import { Settings, LogOut, Volume2, VolumeX } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ playHover, playClick, soundOn, toggleSound }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    playClick();
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    playClick();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="anime-topbar glow-border flex justify-between items-center px-25">
      <div className="anime-brand-logo font-orbitron cyber-text-shadow text-white text-xl">
         BRAWL<span className="text-primary">.AI</span>
      </div>

      <div className="anime-topbar-actions flex gap-15 items-center relative">
        <button className="anime-icon-btn glow-btn hover-primary" onClick={toggleSound} onMouseEnter={playHover}>
          {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        <button className="anime-icon-btn glow-btn hover-secondary" onClick={toggleDropdown} onMouseEnter={playHover}>
          <Settings size={20} />
        </button>

        {dropdownOpen && (
          <div className="anime-dropdown-menu glow-border absolute right-0 top-100 mt-10 bg-black-70 w-200 z-50">
             <div className="anime-dropdown-header p-15 border-b border-gray font-orbitron text-primary">SYSTEM</div>
             <div className="anime-dropdown-item p-15 flex justify-between items-center cursor-pointer hover:bg-black-50" onClick={handleLogout}>
               <span className="font-montserrat text-sm text-neon font-bold">DISCONNECT</span>
               <LogOut size={16} className="text-neon" />
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
