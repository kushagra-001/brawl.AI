import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal } from 'lucide-react';

const ChatBox = ({ playHover, playClick }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'System', text: 'Welcome to the global comms channel.', isSystem: true },
    { id: 2, sender: 'Akira2049', text: 'Anyone up for 1v1?' },
    { id: 3, sender: 'CyberShark', text: 'Just ranked up to Platinum!!' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    playClick();
    setMessages([...messages, { id: Date.now(), sender: 'You', text: input }]);
    setInput('');
  };

  return (
    <div className="anime-chat-box glow-border h-full flex-col">
      <div className="anime-panel-header">
        <h3 className="font-orbitron cyber-text-shadow"><Terminal size={14} className="inline mr-5" /> GLOBAL COMMS</h3>
      </div>
      
      <div className="chat-msg-area custom-scrollbar flex-1">
        {messages.map((m) => (
          <div key={m.id} className={`chat-line-anime ${m.isSystem ? 'system-msg' : ''}`}>
             {!m.isSystem && <span className={`chat-sender-anime ${m.sender === 'You' ? 'text-primary' : 'text-neon'}`}>[{m.sender}]</span>}
             <span className="chat-text-anime">{m.text}</span>
          </div>
        ))}
         <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="chat-input-form mt-auto">
        <input 
          type="text"
          placeholder="Transmit comms..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input-anime font-montserrat text-sm"
        />
        <button type="submit" className="chat-send-btn-anime" onMouseEnter={playHover}>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
