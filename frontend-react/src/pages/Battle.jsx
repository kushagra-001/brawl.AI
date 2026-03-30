import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Play, RotateCcw, ChevronLeft, Send, Terminal } from 'lucide-react';
import './Battle.css';

const LANGUAGES = {
  python:     { label:'Python 3',     version:'3.10.0', ext:'py',  tmpl: (fn,p)=>`# Write your solution\ndef ${fn}(${p}):\n    # Your code here\n    pass\n\n# Test\nprint(${fn}(${p.split(',')[0].trim() || 'n'}))` },
  javascript: { label:'JavaScript',   version:'18.15.0',ext:'js',  tmpl: (fn,p)=>`// Write your solution\nfunction ${fn}(${p}) {\n    // Your code here\n}\n\n// Test\nconsole.log(${fn}(${p.split(',')[0].trim() || 'n'}));` },
  cpp:        { label:'C++',          version:'10.2.0', ext:'cpp', tmpl: (fn,p)=>`#include <iostream>\n#include <vector>\nusing namespace std;\n\n// Write your solution\nint ${fn}(${p||'int n'}) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    cout << ${fn}(${p.split(',')[0].trim().split(' ').pop()||'n'}) << endl;\n    return 0;\n}` },
};

const CHALLENGES = [
  { id:1, title:'Two Sum',         fn:'twoSum',     params:'nums, target', desc:'Given an array and a target, return the indices of two numbers that add up to target.\nExample: twoSum([2,7,11,15], 9) → [0,1]',      testInput:'[2,7,11,15]\n9', expected:'0 1' },
  { id:2, title:'Reverse String',  fn:'reverseStr', params:'s',            desc:'Reverse a string without using .reverse().\nExample: reverseStr("hello") → "olleh"',                testInput:'hello',     expected:'olleh' },
];

const Battle = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lang, setLang] = useState('python');
  const [code, setCode] = useState('');
  const [challenge] = useState(CHALLENGES[0]);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [hp, setHp] = useState({ player: 100, ai: 100 });
  const [message, setMessage] = useState('Prepare for battle, Pilot.');

  const API_BASE = '/api';

  useEffect(() => {
    // Set initial template
    setCode(LANGUAGES[lang].tmpl(challenge.fn, challenge.params));
  }, [lang, challenge]);

  const runCode = async (submit = false) => {
    setIsExecuting(true);
    setOutput('Initializing execution environment...');
    setMessage(submit ? '⚔ ATTACKING...' : '▶ RUNNING TEST...');

    try {
      const response = await fetch(`${API_BASE}/piston/proxy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: lang,
          version: LANGUAGES[lang].version,
          files: [{ name: `solution.${LANGUAGES[lang].ext}`, content: code }]
        })
      });

      const result = await response.json();
      const stdout = (result.run?.stdout || '').trim();
      const stderr = result.run?.stderr || result.compile?.stderr || '';

      if (stderr && !stdout) {
        setOutput(`❌ ERROR:\n${stderr}`);
        if (submit) {
          setHp(prev => ({ ...prev, player: Math.max(0, prev.player - 25) }));
          setMessage('💥 Compilation Error! AI counterattacks!');
        }
      } else {
        setOutput(`📤 Output:\n${stdout}\n\n🎯 Expected:\n${challenge.expected}`);
        
        if (submit) {
          const normalize = s => s.replace(/\r/g,'').trim().replace(/\s+/g,' ');
          const isCorrect = normalize(stdout).includes(normalize(challenge.expected));

          if (isCorrect) {
            setHp(prev => ({ ...prev, ai: 0 }));
            setMessage('✅ CORRECT! Neural link established — entering arena!');
            localStorage.setItem('brawl_coding_bonus', hp.player);
            setTimeout(() => navigate('/arena'), 1500);
          } else {
            setHp(prev => ({ ...prev, player: Math.max(0, prev.player - 25) }));
            setMessage('❌ Wrong Answer! AI takes advantage!');
          }
        }
      }
    } catch (err) {
      setOutput(`❌ Connection Error:\n${err.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="battle-prep-container">
      <header className="battle-nav">
        <button onClick={() => navigate('/lobby')} className="back-btn">
          <ChevronLeft size={20} /> RETREAT
        </button>
        <div className="battle-title font-orbitron">MISSION: NEURAL LINK</div>
        <div className="user-tag">{user?.username} [BATTLE READY]</div>
      </header>

      <div className="battle-main">
        {/* LEFT: HUD & CHALLENGE */}
        <div className="battle-hud-panel glass-panel">
          <div className="fighter-bars">
            <div className="bar-group">
              <div className="bar-labels">
                <span>PILOT HP</span>
                <span>{hp.player}%</span>
              </div>
              <div className="hp-track"><div className="hp-bar player" style={{ width: `${hp.player}%` }}></div></div>
            </div>
            <div className="vs-tag">VS</div>
            <div className="bar-group">
              <div className="bar-labels">
                <span>AI SHIELD</span>
                <span>{hp.ai}%</span>
              </div>
              <div className="hp-track"><div className="hp-bar ai" style={{ width: `${hp.ai}%` }}></div></div>
            </div>
          </div>

          <div className="challenge-box">
            <h2 className="font-montserrat">{challenge.title}</h2>
            <div className="challenge-desc">{challenge.desc}</div>
          </div>

          <div className={`battle-msg ${hp.player < 50 ? 'danger' : ''}`}>
             {message}
          </div>
        </div>

        {/* RIGHT: CODE EDITOR */}
        <div className="editor-panel glass-panel">
          <div className="editor-header">
            <div className="tab active font-montserrat"><Terminal size={16}/> SOLUTION.PY</div>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="lang-select">
              {Object.entries(LANGUAGES).map(([key, cfg]) => (
                <option key={key} value={key}>{cfg.label}</option>
              ))}
            </select>
          </div>
          
          <div className="editor-container">
            <div className="line-numbers">
              {code.split('\n').map((_, i) => <div key={i}>{i+1}</div>)}
            </div>
            <textarea 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              className="code-textarea"
            />
          </div>

          <div className="editor-footer">
            <button className="run-btn" onClick={() => runCode(false)} disabled={isExecuting}>
              <RotateCcw size={16} /> TEST CODE
            </button>
            <button className="attack-btn font-orbitron" onClick={() => runCode(true)} disabled={isExecuting}>
              <Play size={16} fill="currentColor"/> EXECUTE ATTACK
            </button>
          </div>
        </div>
      </div>

      {/* OUTPUT CONSOLE */}
      <div className="console-panel glass-panel">
        <div className="console-header font-montserrat">TERMINAL OUTPUT</div>
        <pre className="console-content">{output || 'Waiting for execution...'}</pre>
      </div>
    </div>
  );
};

export default Battle;
