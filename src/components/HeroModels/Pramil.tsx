import { useRef, useState, useEffect, type MouseEvent } from 'react';
import GlowCard from '../GlowCard';
import OptimizedImage from '../OptimizedImage';

type PramilProps = {
  imgPath?: string;
  alt?: string;
  className?: string;
};

export function Pramil({
  imgPath = '/images/Herosection.png',
  alt = 'Profile image',
  className = ''
}: PramilProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, mouseX: 50, mouseY: 50 });

  useEffect(() => {
    setIsLoaded(true);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    
    // Tilt calculation
    const max = 15;
    pointerRef.current = {
      x: (py - 0.5) * -2 * max,
      y: (px - 0.5) * 2 * max,
      mouseX: px * 100,
      mouseY: py * 100,
    };

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(() => {
        setTilt({ x: pointerRef.current.x, y: pointerRef.current.y });
        setMousePos({ x: pointerRef.current.mouseX, y: pointerRef.current.mouseY });
        frameRef.current = null;
      });
    }
  };

  const handleMouseLeave = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setTilt({ x: 0, y: 0 });
    setHovered(false);
    setMousePos({ x: 50, y: 50 });
  };

  const handleMouseEnter = () => setHovered(true);

  const transform = `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`;

  // Dummy card for GlowCard component (it expects HasReview)
  const dummyCard = {herosection: true, review: ""};

  return (
    <div className={`flex w-3/5 items-center justify-center md:py-8 lg:py-10 ${className}`}>
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute top-1/4 -left-10 h-80 w-80 rounded-full blur-[100px] opacity-30 animate-pulse-glow"
          style={{ background: 'hsl(var(--primary))' }}
        />
        <div 
          className="absolute -bottom-10 -right-10 h-96 w-96 rounded-full blur-[120px] opacity-25 animate-pulse-glow"
          style={{ background: 'hsl(var(--accent))', animationDelay: '1.5s' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full blur-[80px] opacity-20"
          style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }}
        />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 -z-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-float"
            style={{
              background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))`,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* 3D Tilt wrapper with perspective */}
      <div 
        className={`h-full [perspective:1200px] transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          style={{ 
            transform, 
            transition: 'transform 300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)',
            transformStyle: 'preserve-3d'
          }}
          className="relative group mx-auto h-full w-full max-w-[480px] rounded-3xl cursor-pointer"
        >
          {/* Outer glow ring */}
          <div
            className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
            style={{
              background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))`,
            }}
          />

          {/* GlowCard wrapper */}
          <GlowCard card={dummyCard} isHerosection={true} index={0}>
            <div className="relative h-full !p-0 !m-0 rounded-3xl bg-card/90 backdrop-blur-2xl overflow-hidden">
              {/* Dynamic spotlight effect following cursor */}
              <div
                ref={glowRef}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, hsla(var(--primary), 0.25) 0%, transparent 50%)`,
                }}
              />

              {/* Shine sweep effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                <div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                  }}
                />
              </div>

              {/* Image container */}
              <div className="relative overflow-hidden h-full">
                <OptimizedImage
                  src={imgPath}
                  alt={alt}
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  className="block w-full h-full object-cover object-center rounded-3xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Image overlay gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to top, hsla(var(--background), 0.4) 0%, transparent 40%)',
                  }}
                />
              </div>

              {/* Glowing orb accents at corners */}
              <div 
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                style={{ background: 'hsl(var(--primary))' }}
              />
              <div 
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                style={{ background: 'hsl(var(--accent))' }}
              />

              {/* Badges with micro-interactions */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <span 
                  className="rounded-full bg-black/50 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-foreground ring-1 ring-white/10 transform group-hover:translate-y-0 group-hover:opacity-100 translate-y-2 opacity-0 transition-all duration-300 delay-100"
                >
                  Frontend
                </span>
                <span 
                  className="rounded-full bg-black/50 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-foreground ring-1 ring-white/10 transform group-hover:translate-y-0 group-hover:opacity-100 translate-y-2 opacity-0 transition-all duration-300 delay-200"
                >
                  Backend
                </span>
              </div>

              {/* Status badge */}
              <div className="absolute top-4 right-4 z-10">
                <span 
                  className="flex items-center gap-2 rounded-full bg-emerald-500/90 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/30 transform group-hover:scale-105 transition-transform duration-300"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Available for work
                </span>
              </div>

              {/* Bottom info bar - appears on hover */}
              <div 
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Pramil Dhunagan</p>
                    <p className="text-xs text-muted-foreground">Full Stack Developer</p>
                  </div>
                  <div className="flex gap-2">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer ring-1 ring-white/10">
                      <svg className="w-4 h-4 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer ring-1 ring-white/10">
                      <svg className="w-4 h-4 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>

          {/* Reflection effect */}
          <div 
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
            }}
          />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border border-primary/20 rounded-full animate-float-slow opacity-40" />
      <div className="absolute bottom-20 left-10 w-12 h-12 border border-accent/20 rounded-lg rotate-45 animate-float opacity-30" />
    </div>
  );
}

export default Pramil;
