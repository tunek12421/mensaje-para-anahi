import { useState, useEffect, useRef } from 'react';
import gatitoSticker from './assets/gatito.webp';
import huskiSticker from './assets/huski.webp';
import chihuahuaSticker from './assets/chihuahua.webp';

export default function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showFinalQuestion, setShowFinalQuestion] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    type: 'heart' | 'sparkle' | 'dot';
    opacity: number;
  }>>([]);
  const [stars, setStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    twinkleDelay: number;
  }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const loveWords = [
    { lang: "Español", word: "Te quiero", flag: "🇪🇸" },
    { lang: "English", word: "I love you", flag: "🇬🇧" },
    { lang: "Français", word: "Je t'aime", flag: "🇫🇷" },
    { lang: "Italiano", word: "Ti amo", flag: "🇮🇹" },
    { lang: "Português", word: "Eu te amo", flag: "🇧🇷" },
    { lang: "Deutsch", word: "Ich liebe dich", flag: "🇩🇪" },
    { lang: "日本語", word: "愛してる", flag: "🇯🇵" },
    { lang: "한국어", word: "사랑해", flag: "🇰🇷" },
  ];

  const nameLetters = "ANAHI".split('');

  // Detectar si es móvil
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  };

  // Crear partículas románticas y estrellas optimizado para móviles
  useEffect(() => {
    const newParticles = [];
    const newStars = [];
    const mobile = isMobile();
    
    // Reducir partículas en móviles
    const particleCount = mobile ? 15 : 40;
    const starCount = mobile ? 10 : 30;
    
    // Partículas flotantes románticas
    for (let i = 0; i < particleCount; i++) {
      const types: Array<'heart' | 'sparkle' | 'dot'> = ['heart', 'sparkle', 'dot'];
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: mobile ? Math.random() * 15 + 10 : Math.random() * 25 + 15,
        delay: Math.random() * 8,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
    
    // Estrellas titilantes de fondo
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        twinkleDelay: Math.random() * 4,
      });
    }
    
    setParticles(newParticles);
    setStars(newStars);
  }, []);

  // Efecto de mouse suave
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x: x * 0.5, y: y * 0.5 });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cambiar idiomas con timing suave
  useEffect(() => {
    if (showMessage && currentLanguage < loveWords.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLanguage(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showMessage, currentLanguage]);

  return (
    <div ref={containerRef} className="w-screen min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-x-hidden overflow-y-auto relative">
      {/* Estrellas cinematográficas con efectos profesionales */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-white opacity-60"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              animation: `twinkle 3s ${star.twinkleDelay}s infinite ease-in-out, depth-of-field 8s ease-in-out infinite`,
              boxShadow: isMobile() ? '0 0 3px rgba(255, 255, 255, 0.5)' : '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4), 0 0 18px rgba(255, 255, 255, 0.2)',
              filter: isMobile() ? 'none' : 'blur(0.5px)',
              willChange: 'transform, opacity'
            }}
          />
        ))}
        
        {/* Corazones flotantes suaves - reducidos en móviles */}
        {[...Array(isMobile() ? 1 : 3)].map((_, i) => (
          <div
            key={`floating-heart-${i}`}
            className="absolute opacity-10 text-pink-200"
            style={{
              fontSize: `${10 + i * 2}px`,
              left: `${20 + i * 30}%`,
              top: `${25 + i * 20}%`,
              animation: `romantic-drift ${25 + i * 5}s ease-in-out infinite`,
              animationDelay: `${i * 8}s`,
              filter: isMobile() ? 'none' : 'drop-shadow(0 0 4px rgba(255, 182, 193, 0.3))',
              willChange: 'transform'
            }}
          >
            ♥
          </div>
        ))}
        
        {/* Pétalos de rosa suaves - reducidos en móviles */}
        {[...Array(isMobile() ? 2 : 4)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className="absolute opacity-15"
            style={{
              width: '6px',
              height: '10px',
              left: `${25 + i * 20}%`,
              top: `-10px`,
              background: 'linear-gradient(45deg, rgba(255, 182, 193, 0.4), rgba(255, 192, 203, 0.3))',
              borderRadius: '50% 10% 50% 10%',
              animation: `falling-petals ${20 + i * 5}s linear infinite`,
              animationDelay: `${i * 10}s`,
              filter: isMobile() ? 'none' : 'blur(1px)',
              willChange: 'transform'
            }}
          />
        ))}
      </div>
      
      {/* Partículas románticas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute flex items-center justify-center ${
              particle.type === 'heart' ? 'text-white' :
              particle.type === 'sparkle' ? 'text-white' : ''
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${particle.size * 4}px`,
              opacity: particle.opacity,
              animation: `romantic-float ${particle.duration}s ${particle.delay}s infinite ease-in-out, depth-of-field 12s ease-in-out infinite`,
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
            }}
          >
            {particle.type === 'heart' && <span style={{ animation: 'heart-beat 2s ease-in-out infinite' }}>♥</span>}
            {particle.type === 'sparkle' && <span style={{ animation: 'love-shimmer 3s linear infinite', backgroundImage: 'linear-gradient(90deg, transparent, rgba(255, 182, 193, 0.9), transparent)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>✨</span>}
            {particle.type === 'dot' && (
              <div 
                className="rounded-full bg-white opacity-30"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  boxShadow: '0 0 8px rgba(168, 85, 247, 0.3)'
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Iluminación romántica muy sutil */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(255, 182, 193, 0.1) 0%, transparent 60%)`,
          backgroundSize: '150% 150%',
          animation: 'romantic-glow 20s ease infinite',
          transition: 'all 1s ease-out'
        }}
      />
      
      {/* Vignette muy suave */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.2) 100%)'
        }}
      />
      
      {/* Luces muy suaves - deshabilitadas en móviles */}
      {!isMobile() && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(2)].map((_, i) => (
            <div
              key={`candle-light-${i}`}
              className="absolute rounded-full opacity-8"
              style={{
                width: '40px',
                height: '50px',
                left: `${30 + i * 40}%`,
                top: `${40 + i * 20}%`,
                background: 'radial-gradient(ellipse, rgba(255, 228, 181, 0.3) 0%, transparent 70%)',
                animation: `candle-flicker ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 6}s`,
                filter: 'blur(12px)',
                willChange: 'transform, opacity'
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full h-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl z-10 px-4 py-4 flex flex-col justify-center">
        {!showMessage ? (
          <div className="text-center">
            {/* Mi Luna Mi Sol con stickers */}
            <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center relative">
              {/* Gatito (ella) - lado izquierdo */}
              <img 
                src={gatitoSticker} 
                alt="Gatito" 
                className="absolute left-2 xs:left-4 sm:left-8 top-0 w-24 xs:w-28 sm:w-32 md:w-36 opacity-0 animate-letter-appear heart-border"
                style={{
                  animationDelay: '0.2s',
                  animationFillMode: 'forwards',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                }}
              />
              
              {/* Huski (tú) - lado derecho */}
              <img 
                src={huskiSticker} 
                alt="Huski" 
                className="absolute right-2 xs:right-4 sm:right-8 top-0 w-24 xs:w-28 sm:w-32 md:w-36 opacity-0 animate-letter-appear heart-border"
                style={{
                  animationDelay: '0.4s',
                  animationFillMode: 'forwards',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                }}
              />
              
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white opacity-0 animate-letter-appear mb-3 sm:mb-4"
                   style={{
                     animationDelay: '0.8s',
                     animationFillMode: 'forwards',
                     textShadow: '0 0 20px rgba(255, 182, 193, 0.8), 0 4px 8px rgba(0, 0, 0, 0.9)'
                   }}>
                Mi luna 🌙
              </div>
              
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white opacity-0 animate-letter-appear"
                   style={{
                     animationDelay: '1.2s',
                     animationFillMode: 'forwards',
                     textShadow: '0 0 20px rgba(255, 228, 181, 0.8), 0 4px 8px rgba(0, 0, 0, 0.9)'
                   }}>
                Mi sol ☀️
              </div>
            </div>
            
            {/* Nombre Anahi ultra responsivo */}
            <div className="mb-8 xs:mb-10 sm:mb-12 flex justify-center gap-1 xs:gap-2">
              {nameLetters.map((letter, index) => (
                <span
                  key={index}
                  className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white opacity-0 animate-letter-appear drop-shadow-2xl"
                  style={{
                    animationDelay: `${1.5 + index * 0.2}s`,
                    animationFillMode: 'forwards',
                    transform: `translateY(${Math.sin(Date.now() / 1000 + index) * 5}px)`,
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 4px 8px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
            
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium mb-8 xs:mb-10 sm:mb-12 opacity-0 animate-fade-in-soft px-3 xs:px-4 text-center leading-relaxed bg-black/40 backdrop-blur-sm rounded-xl xs:rounded-2xl py-3 xs:py-4 mx-2 xs:mx-4 shadow-2xl border border-white/20"
               style={{ animationDelay: '3s', animationFillMode: 'forwards' }}>
              Hay algo que quiero decirte...
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => setShowMessage(true)}
                className="group relative px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 overflow-hidden rounded-full bg-white text-black font-bold text-sm sm:text-base md:text-lg shadow-2xl transform transition-all duration-700 hover:shadow-2xl hover:scale-105 active:scale-95 border-2 border-white/50"
                style={{
                  transform: isMobile() ? 'none' : `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                  boxShadow: isMobile() ? '0 4px 16px rgba(255, 255, 255, 0.3)' : '0 8px 32px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  willChange: isMobile() ? 'auto' : 'transform'
                }}
              >
                <span className="relative z-10">Para Anahi</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-white rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500"></div>
              </button>
              
              {/* Chihuahua debajo del botón */}
              <img 
                src={chihuahuaSticker} 
                alt="Chihuahua" 
                className="w-20 xs:w-24 sm:w-28 md:w-32 opacity-0 animate-letter-appear heart-border"
                style={{
                  animationDelay: '4s',
                  animationFillMode: 'forwards',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                }}
              />
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Card principal con efecto de cristal suave ultra responsivo */}
            <div className="relative bg-black/85 backdrop-blur-lg rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-2xl p-3 xs:p-4 sm:p-6 md:p-8 lg:p-12 border-2 border-white/40 mx-1 xs:mx-2 sm:mx-0 z-20"
                 style={{
                   transform: isMobile() ? 'none' : `perspective(1200px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
                   transition: isMobile() ? 'none' : 'transform 0.1s ease-out',
                   boxShadow: isMobile() ? '0 8px 25px rgba(0, 0, 0, 0.5)' : '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 100px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                   willChange: isMobile() ? 'auto' : 'transform'
                 }}>
              
              
              {/* Palabras de amor con diseño minimalista responsivo */}
              <div className="mb-4 xs:mb-6 sm:mb-8 md:mb-10">
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:flex sm:flex-wrap justify-center gap-1 xs:gap-2 sm:gap-3 max-w-xs xs:max-w-sm sm:max-w-none mx-auto">
                  {loveWords.slice(0, currentLanguage + 1).map((item, index) => (
                    <div
                      key={index}
                      className="group animate-word-appear opacity-0"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <div className="relative bg-black/40 backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl p-1 xs:p-2 sm:p-3 md:p-4 transform transition-all duration-500 hover:scale-110 hover:shadow-2xl border border-white/20"
                           style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.1)' }}>
                        <div className="text-base xs:text-lg sm:text-xl md:text-2xl text-center mb-1 filter grayscale-0 group-hover:grayscale-0 transition-all duration-300">
                          {item.flag}
                        </div>
                        <div className="text-xs xs:text-sm font-bold text-white text-center opacity-100 transition-opacity duration-300 leading-tight bg-black/50 rounded-md xs:rounded-lg px-1 xs:px-2 py-1 shadow-sm">
                          {item.word}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mensaje principal con tipografía elegante responsiva */}
              <div className="space-y-3 xs:space-y-4 sm:space-y-6 md:space-y-8 text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-1 xs:px-2 sm:px-0 font-medium">
                <p className="opacity-0 animate-text-reveal bg-black/80 backdrop-blur-sm rounded-lg xs:rounded-xl p-2 xs:p-3 sm:p-4 shadow-2xl border border-white/30" style={{ animationDelay: '0.5s' }}>
                  En todos los idiomas que estudias, debe haber miles de formas de decir 'te quiero'... pero en ninguno encuentro las palabras exactas para explicar lo que significas para mí.
                </p>
                
                <div className="relative opacity-0 animate-text-reveal bg-black/80 backdrop-blur-sm rounded-lg xs:rounded-xl p-2 xs:p-3 sm:p-4 shadow-2xl border border-white/30" style={{ animationDelay: '1s' }}>
                  <p>
                    Llevamos casi un año siendo <span className="font-bold text-yellow-300 bg-black/70 px-1 xs:px-2 py-1 rounded border border-yellow-300/30 whitespace-nowrap">'algo sin nombre'</span> - exclusivos, cariñosos, conectados.
                  </p>
                </div>

{!showFinalQuestion ? (
                  <div className="text-center mt-6 xs:mt-8 sm:mt-10 opacity-0 animate-text-reveal" 
                       style={{ animationDelay: '1.5s' }}>
                    <button
                      onClick={() => setShowFinalQuestion(true)}
                      className="relative px-6 xs:px-8 sm:px-10 py-4 xs:py-5 bg-white text-black font-bold text-sm xs:text-base sm:text-lg rounded-full shadow-2xl transform transition-all duration-500 hover:shadow-xl hover:scale-105 border-2 border-white/50 min-h-[52px] min-w-[180px] xs:min-w-[220px]"
                    >
                      <span className="relative z-10">Tengo algo que preguntarte...</span>
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 xs:mt-8 sm:mt-10 opacity-0 animate-message-appear" style={{ animationFillMode: 'forwards' }}>
                    <div className="relative bg-black/60 backdrop-blur-lg rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 md:p-8 border-2 border-white/30 shadow-2xl z-30">
                      {/* Efectos románticos suaves */}
                      <div className="absolute -top-2 -right-2 w-12 h-12 opacity-20"
                           style={{ 
                             background: 'radial-gradient(circle, rgba(255, 182, 193, 0.8) 0%, rgba(255, 182, 193, 0.4) 50%, transparent 100%)',
                             filter: 'blur(4px)',
                             animation: 'romantic-pulse 4s ease-in-out infinite'
                           }}></div>
                      <div className="absolute -bottom-1 -left-1 w-8 h-8 opacity-15"
                           style={{ 
                             background: 'radial-gradient(circle, rgba(255, 228, 225, 0.7) 0%, transparent 70%)',
                             filter: 'blur(3px)',
                             animation: 'romantic-pulse 6s ease-in-out infinite',
                             animationDelay: '2s'
                           }}></div>
                      
                      {/* Brillo romántico suave */}
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0"
                             style={{
                               background: 'linear-gradient(45deg, rgba(255, 182, 193, 0.03) 0%, rgba(255, 228, 225, 0.06) 50%, rgba(255, 182, 193, 0.03) 100%)',
                               animation: 'romantic-shimmer 8s ease-in-out infinite'
                             }}></div>
                      </div>
                      
                      {/* Resplandor cálido interno */}
                      <div className="absolute inset-0 rounded-2xl"
                           style={{
                             background: 'radial-gradient(ellipse at center, rgba(255, 228, 225, 0.04) 0%, rgba(255, 182, 193, 0.06) 40%, transparent 80%)',
                             animation: 'warm-glow 6s ease-in-out infinite'
                           }}></div>
                      
                      <p className="text-lg xs:text-xl sm:text-2xl text-center mb-3 xs:mb-4 sm:mb-6 font-bold text-white relative z-10"
                         style={{ textShadow: '0 0 20px rgba(255,255,255,0.6), 0 4px 8px rgba(0,0,0,0.8)' }}>
                        Y me pregunto...
                      </p>
                      
                      <p className="text-base xs:text-lg sm:text-xl mb-4 xs:mb-6 text-center relative z-10">
                        <span className="text-lg xs:text-xl sm:text-2xl font-bold text-yellow-300 block bg-black/80 rounded-lg xs:rounded-xl px-2 xs:px-3 sm:px-4 py-2 xs:py-3 border border-yellow-300/30"
                              style={{ textShadow: '0 0 15px rgba(253,224,71,0.8), 0 2px 4px rgba(0,0,0,0.9)' }}>
                          ¿Qué cambiaría para ti si finalmente le pusiéramos título a esto?
                        </span>
                      </p>
                      
                      <p className="text-xs xs:text-sm sm:text-base text-white text-center mb-3 xs:mb-4 relative z-10 bg-black/70 rounded-lg px-2 xs:px-3 sm:px-4 py-2 xs:py-3 border border-white/20"
                         style={{ textShadow: '0 0 10px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.8)' }}>
                        Porque para mí ya eres todo, solo falta decirlo.
                      </p>
                      
                      <p className="text-xs xs:text-sm sm:text-base text-white text-center relative z-10 bg-black/70 rounded-lg px-2 xs:px-3 sm:px-4 py-2 xs:py-3 border border-white/20"
                         style={{ textShadow: '0 0 10px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.8)' }}>
                        Si para ti es importante, hablemos de qué significa ser novios para cada uno...
                      </p>
                      
                      <div className="mt-4 xs:mt-6 sm:mt-8 pt-3 xs:pt-4 sm:pt-6 border-t border-white/20 relative z-10">
                        <p className="text-center text-white text-xs xs:text-sm bg-black/60 rounded-lg px-2 xs:px-3 sm:px-4 py-2 xs:py-3 border border-white/20 mb-4"
                           style={{ textShadow: '0 0 8px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.8)' }}>
                          Con amor desde Cochabamba 💕
                        </p>
                        
                        {/* Stickers como firma personal */}
                        <div className="flex justify-center items-center gap-3 xs:gap-4 sm:gap-6 mt-4 opacity-0 animate-text-reveal"
                             style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                          <img 
                            src={gatitoSticker} 
                            alt="Gatito" 
                            className="w-16 xs:w-20 sm:w-24 md:w-28 animate-signature-bounce heart-border"
                            style={{
                              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                              animationDelay: '1s',
                              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                            }}
                          />
                          <span className="text-white/60 text-xs xs:text-sm font-light">💕</span>
                          <div className="flex gap-1 xs:gap-2">
                            <img 
                              src={huskiSticker} 
                              alt="Huski" 
                              className="w-16 xs:w-20 sm:w-24 md:w-28 animate-signature-bounce heart-border"
                              style={{
                                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                                animationDelay: '1.2s',
                                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                              }}
                            />
                            <img 
                              src={chihuahuaSticker} 
                              alt="Chihuahua" 
                              className="w-16 xs:w-20 sm:w-24 md:w-28 animate-signature-bounce heart-border"
                              style={{
                                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                                animationDelay: '1.4s',
                                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes romantic-float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
            filter: brightness(1) blur(0px);
          }
          20% {
            transform: translateY(-40px) translateX(20px) rotate(8deg) scale(1.05);
            filter: brightness(1.2) blur(0.5px);
          }
          40% {
            transform: translateY(-15px) translateX(-25px) rotate(-5deg) scale(0.95);
            filter: brightness(0.9) blur(1px);
          }
          60% {
            transform: translateY(-35px) translateX(15px) rotate(3deg) scale(1.1);
            filter: brightness(1.1) blur(0.3px);
          }
          80% {
            transform: translateY(-20px) translateX(-10px) rotate(-2deg) scale(1.02);
            filter: brightness(1.05) blur(0.7px);
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1);
            opacity: 0.8;
          }
          33% {
            box-shadow: 0 0 50px rgba(255, 255, 255, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.2);
            opacity: 1;
          }
          66% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.4), inset 0 0 25px rgba(255, 255, 255, 0.15);
            opacity: 0.9;
          }
        }
        
        @keyframes love-shimmer {
          0% {
            background-position: -200% 0;
            filter: drop-shadow(0 0 3px rgba(255, 182, 193, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(255, 182, 193, 0.8));
          }
          100% {
            background-position: 200% 0;
            filter: drop-shadow(0 0 3px rgba(255, 182, 193, 0.5));
          }
        }
        
        @keyframes heart-beat {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1) drop-shadow(0 0 5px rgba(255, 182, 193, 0.6));
          }
          50% {
            transform: scale(1.2);
            filter: brightness(1.2) drop-shadow(0 0 12px rgba(255, 182, 193, 0.8));
          }
        }
        
        @keyframes romantic-pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        
        @keyframes romantic-shimmer {
          0% {
            background-position: -100% 0;
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            background-position: 100% 0;
            opacity: 0.3;
          }
        }
        
        @keyframes warm-glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes romantic-drift {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) translateX(-5px) rotate(-3deg);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-15px) translateX(8px) rotate(2deg);
            opacity: 0.5;
          }
        }
        
        @keyframes heart-glow {
          0%, 100% {
            filter: drop-shadow(0 0 5px rgba(255, 182, 193, 0.4));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(255, 182, 193, 0.8));
            transform: scale(1.1);
          }
        }
        
        @keyframes falling-petals {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes petal-sway {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(15px);
          }
        }
        
        @keyframes romantic-glow {
          0%, 100% {
            background-position: 0% 50%;
            opacity: 0.8;
          }
          50% {
            background-position: 100% 50%;
            opacity: 1;
          }
        }
        
        @keyframes candle-flicker {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1) translateY(0);
          }
          25% {
            opacity: 0.8;
            transform: scale(1.05) translateY(-2px);
          }
          50% {
            opacity: 0.9;
            transform: scale(0.98) translateY(1px);
          }
          75% {
            opacity: 0.7;
            transform: scale(1.02) translateY(-1px);
          }
        }
        
        @keyframes gentle-drift {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(10px) translateY(-5px);
          }
        }
        
        @keyframes depth-of-field {
          0%, 100% {
            filter: blur(0px) brightness(1);
          }
          50% {
            filter: blur(1px) brightness(1.1);
          }
        }
        
        @keyframes cinematic-zoom {
          0% {
            transform: scale(1) rotateX(0deg);
          }
          100% {
            transform: scale(1.02) rotateX(1deg);
          }
        }
        
        @keyframes letter-appear {
          0% {
            opacity: 0;
            transform: translateY(-50px) scale(0.3) rotate(-20deg);
            filter: blur(20px) brightness(0);
          }
          30% {
            opacity: 0.3;
            transform: translateY(-20px) scale(0.8) rotate(10deg);
            filter: blur(8px) brightness(0.5);
          }
          70% {
            opacity: 0.8;
            transform: translateY(-5px) scale(1.2) rotate(-5deg);
            filter: blur(2px) brightness(1.2);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
            filter: blur(0px) brightness(1);
          }
        }
        
        @keyframes fade-in-soft {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.8);
            filter: blur(10px);
          }
          50% {
            opacity: 0.7;
            transform: translateY(10px) scale(1.05);
            filter: blur(3px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        
        @keyframes word-appear {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
            filter: blur(5px);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1) rotate(-90deg);
            filter: blur(1px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0px);
          }
        }
        
        @keyframes text-reveal {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
            filter: blur(8px);
          }
          60% {
            opacity: 0.8;
            transform: translateY(5px) scale(1.02);
            filter: blur(1px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        
        @keyframes message-appear {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(50px) rotateX(20deg);
            filter: blur(15px);
          }
          40% {
            opacity: 0.6;
            transform: scale(0.95) translateY(10px) rotateX(5deg);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotateX(0deg);
            filter: blur(0px);
          }
        }
        
        @keyframes float-name {
          0%, 100% {
            transform: translateX(-50%) translateY(0) scale(1);
            filter: brightness(1);
          }
          25% {
            transform: translateX(-50%) translateY(-8px) scale(1.05);
            filter: brightness(1.2);
          }
          50% {
            transform: translateX(-50%) translateY(-5px) scale(1.02);
            filter: brightness(1.1);
          }
          75% {
            transform: translateX(-50%) translateY(-3px) scale(1.01);
            filter: brightness(1.05);
          }
        }
        
        @keyframes signature-bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
            filter: brightness(1);
          }
          25% {
            transform: translateY(-3px) scale(1.05);
            filter: brightness(1.1);
          }
          50% {
            transform: translateY(-1px) scale(1.02);
            filter: brightness(1.05);
          }
          75% {
            transform: translateY(-2px) scale(1.01);
            filter: brightness(1.02);
          }
        }
        
        .animate-letter-appear {
          animation: letter-appear 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-fade-in-soft {
          animation: fade-in-soft 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animate-word-appear {
          animation: word-appear 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-text-reveal {
          animation: text-reveal 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-message-appear {
          animation: message-appear 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), cinematic-zoom 8s ease-in-out infinite;
        }
        
        .animate-float-name {
          animation: float-name 4s ease-in-out infinite, lens-flare 12s ease-in-out infinite;
        }
        
        .animate-signature-bounce {
          animation: signature-bounce 3s ease-in-out infinite;
        }
        
        .heart-border {
          border: 2px solid rgba(255, 182, 193, 0.6);
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 182, 193, 0.05));
          backdrop-filter: blur(2px);
          box-shadow: 0 0 15px rgba(255, 182, 193, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.1);
        }
        
        /* Efectos optimizados para móvil ultra responsivo */
        @media (max-width: 480px) {
          .animate-letter-appear {
            animation: letter-appear 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          
          .animate-fade-in-soft {
            animation: fade-in-soft 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .animate-text-reveal {
            animation: text-reveal 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
        }
        
        @media (min-width: 481px) and (max-width: 768px) {
          .animate-letter-appear {
            animation: letter-appear 2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          
          .animate-fade-in-soft {
            animation: fade-in-soft 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .animate-text-reveal {
            animation: text-reveal 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
        }
        
        /* Breakpoint personalizado para pantallas extra pequeñas */
        @media (max-width: 360px) {
          body {
            font-size: 14px;
          }
        }
        
        /* Optimización para iPhone SE y pantallas pequeñas */
        @media (max-width: 375px) and (max-height: 667px) {
          .min-h-screen {
            min-height: 100vh;
            min-height: 100dvh;
          }
        }
        
        /* Prevenir cortes de contenido en móviles */
        @media (max-width: 480px) {
          body {
            overflow-x: hidden;
          }
          
          .overflow-hidden {
            overflow-x: hidden;
            overflow-y: auto;
          }
        }
        
        /* Asegurar que el contenido no se corte en pantallas muy pequeñas */
        @media (max-width: 320px) {
          * {
            max-width: 100%;
            box-sizing: border-box;
          }
        }
      `}</style>
    </div>
  );
}