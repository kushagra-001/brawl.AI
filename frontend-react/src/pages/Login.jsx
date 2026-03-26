import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, User, Lock, Mail } from 'lucide-react';
import loginArt from '../assets/login_art.png';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!formData.username || !formData.password) {
        throw new Error('Please fill all fields');
      }

      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Authentication failed');

      if (isLogin) {
        login(data.user);
        navigate('/lobby');
      } else {
        setIsLogin(true);
        setError('Signup successful! Please login.');
      }
    } catch (err) {
      setError(err.message);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="login-screen">
      {/* Glitch Background Layers */}
      <div className="scanlines"></div>
      <div className="glitch-noise"></div>
      <div className="glitch-rgb"></div>
      <div className="glitch-bar"></div>

      <div className={`login-card ${shake ? 'shake' : ''}`}>
        {/* LEFT: Cinematic Art */}
        <div className="panel-left">
          <img src={loginArt} alt="Gaming Art" className="art" />
          <div className="left-text">
            <h2>Dive into the Ultimate Gaming Experience</h2>
            <p>Join us and Master The Art of Outsmarting Through Gaming</p>
            <div className="dots">
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>

        {/* RIGHT: Forms */}
        <div className="panel-right">
          <div className="logo-mark">⚔ BRAWL.AI</div>

          <form onSubmit={handleSubmit} className="auth-form active">
            <div className="form-title">{isLogin ? 'Log In' : 'Sign Up'}</div>
            <div className="form-sub">{isLogin ? 'Welcome back, Pilot' : 'Sign up with Open account'}</div>

            <div className="social-row">
              <button type="button" className="social-pill">
                <img src="https://www.google.com/favicon.ico" alt="G" /> Google
              </button>
              <button type="button" className="social-pill">
                <img src="https://www.facebook.com/favicon.ico" alt="F" /> Facebook
              </button>
            </div>

            <div className="divider">Or continue with username</div>

            <div className="input-wrap">
              <span className="icon"><User size={18} /></span>
              <input 
                type="text" 
                name="username"
                placeholder="Pilot ID (username)" 
                required 
                value={formData.username}
                onChange={handleInputChange}
                autoComplete="off" 
              />
            </div>
            
            <div className="input-wrap">
              <span className="icon"><Lock size={18} /></span>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="Password" 
                required 
                value={formData.password}
                onChange={handleInputChange}
              />
              <button 
                type="button" 
                className="eye-btn" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <div className="error-message show">{error}</div>}

            <button type="submit" className="submit-btn">
              {isLogin ? 'Log in' : 'Sign up'}
            </button>
            
            <div className="bottom-link">
              {isLogin ? "New Pilot? " : "Already a member? "}
              <a onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Create Account' : 'Log in'}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
