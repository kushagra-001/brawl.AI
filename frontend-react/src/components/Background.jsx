import React, { useMemo, useState } from 'react';
import { Maximize, Minimize, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Background.css';

const Background = ({ children }) => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
    const cancelFullScreen = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.webkitFullscreenElement && !doc.mozFullScreenElement && !doc.msFullscreenElement) {
      console.log("INITIALIZING FULLSCREEN PROTOCOL...");
      if (requestFullScreen) {
        requestFullScreen.call(docEl);
      } else {
        console.warn("FULLSCREEN API NOT SUPPORTED ON THIS BROWSER.");
      }
    } else {
      console.log("EXITING FULLSCREEN...");
      if (cancelFullScreen) {
        cancelFullScreen.call(doc);
      }
    }
  };

  React.useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    document.addEventListener('mozfullscreenchange', handleFsChange);
    document.addEventListener('MSFullscreenChange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      document.removeEventListener('mozfullscreenchange', handleFsChange);
      document.removeEventListener('MSFullscreenChange', handleFsChange);
    };
  }, []);



  return (
    <div className="bg-container terminal-mode">
      {/* System Bar removed from here */}

      {/* 📺 BOTTOM NAVIGATION HUD 📺 */}
      <div className="fixed-controls">
        <button className="system-btn return-top" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <ArrowLeft size={18} style={{ transform: 'rotate(90deg)' }} />
          <span>RETURN REBOOT</span>
        </button>

        <div className="hud-right-group">
          {/* 📺 SYSTEM CONTROLS MOVED HERE 📺 */}
          <div className="system-bottom-right">
            <button className="sys-ctrl" onClick={() => setIsFullscreen(false)} title="Minimize Protocol">
              <Minimize size={14} />
            </button>
            <button className="sys-ctrl" onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Link"}>
              {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
            </button>
          </div>

          <button className="system-btn return-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            <span>GRID BACK</span>
          </button>
        </div>
      </div>

      <div className="bg-content">
        {children}
      </div>
    </div>
  );
};

export default Background;
