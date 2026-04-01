import React, { useEffect } from 'react';
import { X, Bell, Zap, Trophy, ShieldAlert } from 'lucide-react';

const NotificationToast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'rank': return <Trophy className="text-gold" size={18} />;
      case 'warn': return <ShieldAlert className="text-neon" size={18} />;
      case 'unlock': return <Zap className="text-primary" size={18} />;
      default: return <Bell className="text-secondary" size={18} />;
    }
  };

  return (
    <div className={`notif-toast toast-${type} notif-slide-in`}>
      <div className="notif-progress-bar"></div>
      <div className="notif-content-wrap">
        <div className="notif-icon-circle">{getIcon()}</div>
        <div className="notif-text-area">
          <span className="notif-title font-orbitron">{type?.toUpperCase() || 'UNIT NOTIFICATION'}</span>
          <p className="notif-message font-montserrat">{message}</p>
        </div>
        <button onClick={onClose} className="notif-close-btn">
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
