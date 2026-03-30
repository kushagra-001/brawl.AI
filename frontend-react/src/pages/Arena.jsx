import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, Trophy, Zap, Shield, Swords } from 'lucide-react';
import './Arena.css';

// Importing image directly in React
import turboBg from '../assets/turbo_bg.png';

// ── CLASSES ──
class Fighter {
    constructor(cfg) {
        Object.assign(this, {
            x:cfg.x, y:0, w:70, h:110,
            velX:0, velY:0, onGround:true,
            hp:cfg.maxHp, maxHp:cfg.maxHp,
            speed:cfg.speed||5, jumpF:cfg.jumpF||-15,
            facingRight:cfg.facingRight,
            color:cfg.color, glowColor:cfg.glowColor,
            eyeColor:cfg.eyeColor||'#fff',
            state:'idle', stateT:0,
            blocking:false, attackCD:0,
            isPlayer:cfg.isPlayer||false,
            name:cfg.name,
            frameColor: cfg.glowColor === '#00ff73' ? '#102e1a' : '#2e1010',
        });
    }

    get cx() { return this.x + this.w/2; }

    reset(x, floor) {
        this.x = x; this.y = floor - this.h;
        this.velX = 0; this.velY = 0;
        this.hp = this.maxHp; this.onGround = true;
        this.state = 'idle'; this.stateT = 0;
        this.blocking = false; this.attackCD = 0;
    }

    takeDamage(dmg) {
        if (this.blocking) dmg = Math.max(2, Math.floor(dmg * 0.12));
        this.hp = Math.max(0, this.hp - dmg);
        this.state = 'hurt'; this.stateT = 14;
        return dmg;
    }

    attackBox() {
        const dir = this.facingRight ? 1 : -1;
        return { x: this.cx + dir*10, y: this.y+20, w:65, h:55 };
    }

    draw(ctx, t, floor) {
        ctx.save();
        const dir = this.facingRight ? 1 : -1;
        const cx = this.cx, cy = this.y;
        const h = this.h;

        if (this.state === 'hurt') ctx.globalAlpha = 0.5 + Math.sin(t*0.6)*0.5;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.45)';
        ctx.beginPath();
        ctx.ellipse(cx, floor+4, 45, 12, 0, 0, Math.PI*2);
        ctx.fill();

        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 10;

        // Simple render for performance in this demo
        ctx.fillStyle = this.color;
        ctx.fillRect(cx - 25, cy, 50, h);
        
        // Eyes
        ctx.fillStyle = this.eyeColor;
        ctx.fillRect(cx + (dir * 10), cy + 20, 15, 5);

        // Arm
        ctx.fillStyle = this.frameColor;
        if (this.state === 'punch') {
            ctx.fillRect(cx + (dir * 20), cy + 40, 40, 15);
        } else {
            ctx.fillRect(cx + (dir * 15), cy + 40, 15, 40);
        }

        ctx.restore();
    }
}

const Arena = () => {
    const canvasRef = useRef(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // Game state
    const [gameState, setGameState] = useState({
        pLvl: 1,
        pHp: 100,
        aiHp: 100,
        timer: 99,
        round: 1,
        pScore: 0,
        aiScore: 0,
        isGameOver: false,
        result: ''
    });

    const gameLoopRef = useRef(null);
    const fightersRef = useRef({ player: null, ai: null });
    const keysRef = useRef({});

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Fighter class has been moved outside the component

        const W = canvas.width = Math.min(window.innerWidth - 80, 960);
        const H = canvas.height = 500;
        const FLOOR = H - 70;
        const GRAVITY = 0.65;

        const player = new Fighter({
            x: 100, maxHp: 100, speed: 5.5, jumpF: -15,
            facingRight: true, isPlayer: true,
            color: '#2a5c2a', glowColor: '#00ff73', eyeColor: '#00ff73',
            name: user?.username || 'Pilot'
        });

        const ai = new Fighter({
            x: W - 170, maxHp: 100, speed: 3.8, jumpF: -14,
            facingRight: false,
            color: '#5c1a1a', glowColor: '#ff3333', eyeColor: '#ff3333',
            name: 'NEURAL AI'
        });

        fightersRef.current = { player, ai };

        const bgImg = new Image();
        bgImg.src = turboBg;

        let time = 0;
        const update = () => {
            time++;
            
            // Physics
            [player, ai].forEach(f => {
                if (!f.onGround) f.velY += GRAVITY;
                f.x += f.velX;
                f.y += f.velY;
                const floorPos = FLOOR - f.h;
                if (f.y >= floorPos) { f.y = floorPos; f.velY = 0; f.onGround = true; if(f.state==='jump') f.state='idle'; }
                f.x = Math.max(0, Math.min(W - f.w, f.x));
                f.attackCD = Math.max(0, f.attackCD - 1);
                if (f.stateT > 0) { f.stateT--; if(f.stateT<=0) f.state='idle'; }
            });

            // Player Ctrl
            const keys = keysRef.current;
            player.velX = 0;
            if (keys['arrowleft'] || keys['a']) { player.velX = -player.speed; player.facingRight=false; }
            if (keys['arrowright'] || keys['d']) { player.velX = player.speed; player.facingRight=true; }
            if ((keys['arrowup'] || keys['w'] || keys[' ']) && player.onGround) { player.velY = player.jumpF; player.onGround=false; player.state='jump'; }
            
            if (keys['z'] && player.attackCD === 0) { 
                player.state = 'punch'; player.stateT = 15; player.attackCD = 30;
                // Collision check
                const ax = ai.x, ay = ai.y, aw = ai.w, ah = ai.h;
                const px = player.cx + (player.facingRight ? 10 : -50);
                if (px < ax + aw && px + 40 > ax && player.y < ay + ah && player.y + 60 > ay) {
                    ai.takeDamage(10);
                }
            }

            // AI (Very simple)
            if (ai.cx > player.cx + 100) { ai.velX = -ai.speed; ai.facingRight=false; }
            else if (ai.cx < player.cx - 100) { ai.velX = ai.speed; ai.facingRight=true; }
            else if (ai.attackCD === 0) { 
                ai.state = 'punch'; ai.stateT = 15; ai.attackCD = 40;
                player.takeDamage(8);
            }

            // Sync React State (Throttled for performance)
            if (time % 10 === 0) {
                setGameState(prev => ({
                    ...prev,
                    pHp: player.hp,
                    aiHp: ai.hp
                }));
            }

            if (player.hp <= 0 || ai.hp <= 0) {
                setGameState(prev => ({
                    ...prev,
                    isGameOver: true,
                    result: player.hp > 0 ? 'VICTORY' : 'DEFEAT'
                }));
                cancelAnimationFrame(gameLoopRef.current);
                return;
            }

            // Render
            ctx.clearRect(0,0,W,H);
            ctx.drawImage(bgImg, 0, 0, W, H);
            
            // Neon floor
            ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 4;
            ctx.beginPath(); ctx.moveTo(0, FLOOR); ctx.lineTo(W, FLOOR); ctx.stroke();

            player.draw(ctx, time, FLOOR);
            ai.draw(ctx, time, FLOOR);

            gameLoopRef.current = requestAnimationFrame(update);
        };

        const handleKeyDown = e => { keysRef.current[e.key.toLowerCase()] = true; };
        const handleKeyUp = e => { keysRef.current[e.key.toLowerCase()] = false; };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        gameLoopRef.current = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(gameLoopRef.current);
        };
    }, [user?.username]);

    return (
        <div className="arena-screen">
            <header className="arena-header">
                <div className="fighter-hud player">
                   <div className="f-name">{user?.username.toUpperCase()}</div>
                   <div className="hp-track"><div className="hp-bar" style={{ width: `${gameState.pHp}%` }}></div></div>
                </div>

                <div className="arena-center">
                    <div className="timer font-orbitron">{gameState.timer}</div>
                    <div className="round-info">ROUND {gameState.round}</div>
                </div>

                <div className="fighter-hud ai">
                   <div className="f-name">NEURAL_NET_V1</div>
                   <div className="hp-track"><div className="hp-bar ai" style={{ width: `${gameState.aiHp}%` }}></div></div>
                </div>
            </header>

            <div className="canvas-wrapper">
                <canvas ref={canvasRef} id="battle-arena"></canvas>
            </div>

            <footer className="arena-footer">
                <div className="controls-hint">
                    <span><kbd>WASD</kbd> MOVE</span>
                    <span><kbd>Z</kbd> PUNCH</span>
                </div>
                <button onClick={() => navigate('/lobby')} className="exit-btn"><ChevronLeft size={16}/> RETREAT</button>
            </footer>

            {gameState.isGameOver && (
                <div className="overlay show">
                    <div className="overlay-box glass-panel animate-fade-in">
                        <div className="result-icon">{gameState.result === 'VICTORY' ? '🏆' : '💀'}</div>
                        <h1 className={`result-big ${gameState.result.toLowerCase()} font-orbitron`}>{gameState.result}</h1>
                        <div className="result-sub">The battle for supremacy has concluded.</div>
                        {gameState.result === 'VICTORY' && <div className="xp-pill win">+250 XP</div>}
                        <button className="ob-btn pri font-orbitron" onClick={() => navigate('/lobby')}>RETURN TO LOBBY</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Arena;
