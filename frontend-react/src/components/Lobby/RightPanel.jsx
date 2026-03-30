import React, { useState, useRef, useEffect } from 'react';
import { UserPlus, MessageSquare, Trophy, Send, Users } from 'lucide-react';

const usersDummy = [
  { id: 1, name: 'CyberShark', online: true },
  { id: 2, name: 'NeonSamurai', online: true },
  { id: 3, name: 'GlitchTrap', online: false },
  { id: 4, name: 'VoidWalker', online: false }
];

const initialMessages = [
  { id: 1, sender: 'System', text: 'Welcome to the global comms channel.', isSystem: true },
  { id: 2, sender: 'CyberShark', text: 'Anyone up for 1v1?' },
  { id: 3, sender: 'NeonSamurai', text: 'Just ranked up to Platinum!!' }
];

const leaderboardData = [
  { rank: 1, name: 'FakerAI', score: 9942 },
  { rank: 2, name: 'VoidWalker', score: 8721 },
  { rank: 3, name: 'NeonNinja', score: 8200 },
  { rank: 4, name: 'CyberShark', score: 7520 },
  { rank: 5, name: 'GlitchTrap', score: 7100 }
];

const RightPanel = ({ playHover, playClick }) => {
  const [activeTab, setActiveTab] = useState('social'); // 'social', 'chat', 'leaderboard'
  const [messages, setMessages] = useState(initialMessages);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'chat' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    playClick();
    setMessages([...messages, { id: messages.length + 1, sender: 'You', text: chatInput }]);
    setChatInput('');
  };

  return (
    <div className="right-panel">
      {/* Tab Navigation */}
      <div className="panel-tabs premium-glass neo-border">
        <button 
          className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => { playClick(); setActiveTab('social'); }}
          onMouseEnter={playHover}
        >
          <Users size={16} /> SOCIAL
        </button>
        <button 
          className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => { playClick(); setActiveTab('chat'); }}
          onMouseEnter={playHover}
        >
          <MessageSquare size={16} /> CHAT
        </button>
        <button 
          className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => { playClick(); setActiveTab('leaderboard'); }}
          onMouseEnter={playHover}
        >
          <Trophy size={16} /> L-BOARD
        </button>
      </div>

      {/* Tab Content */}
      <div className="panel-content premium-glass neo-border custom-scrollbar">
        
        {/* Social / Friends List */}
        {activeTab === 'social' && (
          <div className="tab-section social-tab">
            <h3 className="section-header font-orbitron">FRIENDS ONLINE</h3>
            <div className="list-container">
              {usersDummy.map(u => (
                <div key={u.id} className="list-item user-item group-hover" onMouseEnter={playHover}>
                  <div className="user-info">
                    <div className={`status-dot ${u.online ? 'online' : 'offline'}`} />
                    <span className="user-name font-montserrat">{u.name}</span>
                  </div>
                  <button className="invite-btn" onClick={playClick} title={u.online ? "Invite to Group" : "Offline"}>
                    <UserPlus size={16} color={u.online ? "var(--primary)" : "#666"} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Chat */}
        {activeTab === 'chat' && (
          <div className="tab-section chat-tab flex-col h-full">
            <h3 className="section-header font-orbitron">GLOBAL COMMS</h3>
            <div className="chat-messages flex-1 custom-scrollbar">
              {messages.map(m => (
                <div key={m.id} className={`chat-line ${m.isSystem ? 'sys-msg' : ''}`}>
                  {!m.isSystem && <span className={`chat-sender ${m.sender === 'You' ? 'text-primary' : 'text-neon'}`}>[{m.sender}]</span>}
                  <span className="chat-text">{m.text}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="chat-input-area mt-auto">
              <input 
                type="text" 
                placeholder="Transmit message..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="chat-input"
              />
              <button type="submit" className="chat-send-btn" onMouseEnter={playHover}>
                <Send size={16} />
              </button>
            </form>
          </div>
        )}

        {/* Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="tab-section lead-tab">
            <h3 className="section-header font-orbitron">TOP PILOTS</h3>
            <div className="list-container">
              {leaderboardData.map((player, idx) => (
                <div key={idx} className={`list-item lead-item ${idx < 3 ? 'top-tier' : ''}`} onMouseEnter={playHover}>
                  <div className="lead-info">
                    <span className={`lead-rank font-orbitron ${idx === 0 ? 'text-gold' : idx === 1 ? 'text-silver' : idx === 2 ? 'text-bronze' : 'text-gray'}`}>
                      #{player.rank}
                    </span>
                    <span className="lead-name font-montserrat">{player.name}</span>
                  </div>
                  <span className="lead-score font-orbitron text-primary">{player.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RightPanel;
