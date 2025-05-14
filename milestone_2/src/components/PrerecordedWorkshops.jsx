"use client";
import { useState } from 'react';
import { 
  FaPlay, FaPause, FaStop, FaStepForward, FaStepBackward,
  FaExpand, FaCompress, FaVolumeMute, FaVolumeUp
} from 'react-icons/fa';
import YouTube from 'react-youtube';

const PrerecordedWorkshops = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);

  // Sample workshop data with YouTube video IDs
  const workshops = [
    {
      id: 1,
      title: "Introduction to React",
      instructor: "John Doe",
      duration: "1:30:00",
      thumbnail: "/images/Workshop2.jpeg",
      videoId: "4eMCzZ03ZdQ"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      instructor: "Jane Smith",
      duration: "2:00:00",
      thumbnail: "/images/Workshop3.jpeg",
      videoId: "sptS-bgg8Ro"
    }
  ];

  // Enhanced YouTube player options
  const opts = {
    height: '500',
    width: '100%',
    playerVars: {
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      mute: isMuted ? 1 : 0,
    },
  };

  // Style objects
  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'IBM Plex Sans, sans-serif',
  };

  const listStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  };

  const workshopCardStyle = {
    background: 'white',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    border: '1px solid #D9F0F4',
  };

  const videoPlayerContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(19, 28, 33, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    zIndex: 1000,
  };

  const playerWrapperStyle = {
    width: '90%',
    maxWidth: '1400px',
    background: '#ffffff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  };

  const videoHeaderStyle = {
    padding: '25px 30px',
    background: 'linear-gradient(to right, #318FA8, #2A5F74)',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '18px',
    backdropFilter: 'blur(5px)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.3)',
      transform: 'scale(1.1)',
    },
  };

  const controlsStyle = {
    padding: '20px 30px',
    background: 'linear-gradient(to right, #D9F0F4, #E8F6F9)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid rgba(49, 143, 168, 0.1)',
    position: 'relative',
  };

  const controlsGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px', // Increased gap for better spacing
    justifyContent: 'center', // Center the buttons horizontally
    flexGrow: 1, // Allow the group to take available space
  };

  const buttonStyle = {
    background: '#318FA8',
    color: 'white',
    border: 'none',
    borderRadius: '50%', // Fully rounded buttons
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '18px',
    boxShadow: '0 2px 8px rgba(49, 143, 168, 0.2)',
    '&:hover': {
      background: '#2A5F74',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(49, 143, 168, 0.3)',
    },
  };

  const volumeControlStyle = {
    position: 'absolute',
    left: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    background: 'rgba(255, 255, 255, 0.5)',
    padding: '8px 15px',
    borderRadius: '20px',
    backdropFilter: 'blur(5px)',
    zIndex: 1,
  };

  const volumeSliderStyle = {
    width: '120px',
    height: '4px',
    borderRadius: '2px',
    background: '#D9F0F4',
    WebkitAppearance: 'none',
    outline: 'none',
    '&::-webkit-slider-thumb': {
      WebkitAppearance: 'none',
      width: '16px',
      height: '16px',
      background: '#318FA8',
      borderRadius: '50%',
      cursor: 'pointer',
      border: '2px solid white',
      boxShadow: '0 2px 6px rgba(49, 143, 168, 0.3)',
    },
  };

  const playerStyle = {
    position: 'relative',
    width: '100%',
    backgroundColor: 'black',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '20px',
  };

  const handleWorkshopSelect = (workshop) => {
    setCurrentVideo(workshop);
    setIsPlaying(false);
    if (player) {
      player.pauseVideo();
      player.seekTo(0);
    }
  };

  const handleClose = () => {
    if (player) {
      player.pauseVideo();
    }
    setCurrentVideo(null);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    if (player) {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (player) {
      player.pauseVideo();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (player) {
      player.pauseVideo();
      player.seekTo(0);
      setIsPlaying(false);
    }
  };

  const handleSeek = (direction) => {
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + (direction * 10), true);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.requestFullscreen) {
        iframe.requestFullscreen(); // Fullscreen only the video
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen(); // Exit fullscreen
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleMuteToggle = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume);
    }
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onStateChange = (event) => {
    setIsPlaying(event.data === YouTube.PlayerState.PLAYING);
  };

  return (
    <div style={containerStyle}>
      <h1 className="text-4xl font-bold text-[#2A5F74] mb-8 underline">Pre-recorded Workshops</h1>
      
      {currentVideo && (
        <div style={videoPlayerContainerStyle}>
          <div style={playerWrapperStyle} id="player-wrapper">
            <div style={videoHeaderStyle}>
              <div>
                <h2 style={{ 
                  color: 'white', 
                  margin: 0, 
                  fontSize: '24px',
                  fontWeight: '600' 
                }}>
                  {currentVideo.title}
                </h2>
                <p style={{ 
                  color: 'rgba(255,255,255,0.8)', 
                  margin: '5px 0 0 0',
                  fontSize: '14px' 
                }}>
                  Instructor: {currentVideo.instructor}
                </p>
              </div>
              <button onClick={handleClose} style={closeButtonStyle}>
                ✕
              </button>
            </div>

            <div style={playerStyle}>
              <YouTube
                videoId={currentVideo.videoId}
                opts={opts}
                onReady={onReady}
                onStateChange={onStateChange}
              />
              
              <div style={controlsStyle}>
                <div style={volumeControlStyle}>
                  <button 
                    style={{...buttonStyle, background: 'transparent', color: '#318FA8'}} 
                    onClick={handleMuteToggle}
                  >
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    onChange={handleVolumeChange} 
                    style={volumeSliderStyle} 
                  />
                </div>

                <div style={controlsGroupStyle}>
                  <button 
                    style={buttonStyle} 
                    onClick={() => handleSeek(-10)}
                    title="Backward 10s"
                  >
                    <FaStepBackward />
                  </button>
                  {!isPlaying ? (
                    <button 
                      style={{...buttonStyle, width: '60px', height: '60px'}} 
                      onClick={handlePlay}
                      title="Play"
                    >
                      <FaPlay style={{fontSize: '24px'}} />
                    </button>
                  ) : (
                    <button 
                      style={{...buttonStyle, width: '60px', height: '60px'}} 
                      onClick={handlePause}
                      title="Pause"
                    >
                      <FaPause style={{fontSize: '24px'}} />
                    </button>
                  )}
                  <button 
                    style={buttonStyle} 
                    onClick={() => handleSeek(10)}
                    title="Forward 10s"
                  >
                    <FaStepForward />
                  </button>
                </div>

                <button 
                  style={{...buttonStyle, marginLeft: 'auto'}} 
                  onClick={toggleFullscreen}
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={listStyle}>
        {workshops.map(workshop => (
          <div
            key={workshop.id}
            style={{
              ...workshopCardStyle,
              transform: currentVideo?.id === workshop.id ? 'scale(1.02)' : 'none',
              border: currentVideo?.id === workshop.id ? '2px solid #318FA8' : '1px solid #D9F0F4',
            }}
            onClick={() => handleWorkshopSelect(workshop)}
          >
            <img
              src={workshop.thumbnail}
              alt={workshop.title}
              style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <h3 style={{ color: '#2A5F74', margin: '10px 0' }}>{workshop.title}</h3>
            <p style={{ color: '#666', margin: '5px 0' }}>Instructor: {workshop.instructor}</p>
            <p style={{ color: '#666', margin: '5px 0' }}>Duration: {workshop.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrerecordedWorkshops;