import React, { useState, useEffect } from 'react';
import { musicPlayer, MUSIC_TRACKS, MusicTrack } from '../utils/musicPlayer';
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Sparkles,
  X,
  Headphones,
  Sliders,
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const MusicPlayerWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState('cosmic-nebula');
  const [volume, setVolume] = useState(0.45);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Subscribe to music player state
    const unsubscribe = musicPlayer.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setCurrentTrackId(state.trackId);
      setVolume(state.volume);
    });

    const initial = musicPlayer.getState();
    setIsPlaying(initial.isPlaying);
    setCurrentTrackId(initial.trackId);
    setVolume(initial.volume);

    return () => {
      unsubscribe();
    };
  }, []);

  const currentTrack = MUSIC_TRACKS.find((t) => t.id === currentTrackId) || MUSIC_TRACKS[0];

  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.playClickSound();
    musicPlayer.togglePlay();
  };

  const handleTrackChange = (track: MusicTrack) => {
    soundManager.playClickSound();
    musicPlayer.setTrack(track.id);
    if (!isPlaying) {
      musicPlayer.play();
    }
  };

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClickSound();
    const currentIndex = MUSIC_TRACKS.findIndex((t) => t.id === currentTrackId);
    const nextIndex = (currentIndex + 1) % MUSIC_TRACKS.length;
    musicPlayer.setTrack(MUSIC_TRACKS[nextIndex].id);
    if (!isPlaying) {
      musicPlayer.play();
    }
  };

  const handlePrevTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClickSound();
    const currentIndex = MUSIC_TRACKS.findIndex((t) => t.id === currentTrackId);
    const prevIndex = (currentIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    musicPlayer.setTrack(MUSIC_TRACKS[prevIndex].id);
    if (!isPlaying) {
      musicPlayer.play();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    musicPlayer.setVolume(val);
  };

  return (
    <>
      {/* Floating Mini Player Widget (Bottom-Left or Clickable) */}
      <div className="fixed bottom-20 sm:bottom-6 left-4 z-40">
        <div
          onClick={() => {
            setIsOpen(!isOpen);
            soundManager.playClickSound();
          }}
          className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border backdrop-blur-xl shadow-xl transition-all cursor-pointer group ${
            isPlaying
              ? 'border-cyan-500/50 shadow-cyan-500/20'
              : 'border-slate-700/80 hover:border-slate-600'
          }`}
        >
          {/* Animated Waveform / Icon */}
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
            {isPlaying ? (
              <div className="flex items-end justify-center gap-0.5 h-4 w-4">
                <span className="w-1 bg-white rounded-full animate-bounce [animation-duration:0.6s]" />
                <span className="w-1 bg-white rounded-full animate-bounce [animation-duration:0.9s]" />
                <span className="w-1 bg-white rounded-full animate-bounce [animation-duration:0.7s]" />
              </div>
            ) : (
              <Headphones className="w-4 h-4 text-white" />
            )}
          </div>

          {/* Track Name */}
          <div className="text-left hidden xs:block sm:block max-w-[140px] truncate">
            <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
              <span>Nhạc tập trung</span>
              {isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
            </div>
            <div className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
              {currentTrack.icon} {currentTrack.title}
            </div>
          </div>

          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            title={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc tập trung'}
            className="p-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Music Player Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl p-5 sm:p-6 space-y-5 animate-in zoom-in-95"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-500/30 text-indigo-300">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
                    <span>Nhạc nền Không gian Tập trung</span>
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Âm thanh sóng não và Lo-fi êm dịu giúp học Toán hiệu quả
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Currently Playing Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-950 to-purple-950/70 border border-indigo-500/30 text-center space-y-3">
              <div className="text-4xl animate-pulse">{currentTrack.icon}</div>
              <div>
                <div className="text-sm font-bold text-white">{currentTrack.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{currentTrack.desc}</div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4 pt-1">
                <button
                  onClick={handlePrevTrack}
                  title="Bài trước"
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleTogglePlay()}
                  className="p-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/30 transition-transform active:scale-95 cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 translate-x-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNextTrack}
                  title="Bài tiếp theo"
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-3 px-3 pt-2">
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-slate-500 shrink-0" />
                ) : (
                  <Volume2 className="w-4 h-4 text-cyan-400 shrink-0" />
                )}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <span className="text-[11px] font-mono text-slate-400 w-8 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>

            {/* Track Playlist Picker */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Chọn danh sách bản nhạc:
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {MUSIC_TRACKS.map((track) => {
                  const isCurrent = track.id === currentTrackId;
                  return (
                    <button
                      key={track.id}
                      onClick={() => handleTrackChange(track)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-950/60 border-cyan-400/80 text-white ring-1 ring-cyan-400/40'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-xl">{track.icon}</span>
                        <div className="truncate">
                          <div className="text-xs font-bold truncate">{track.title}</div>
                          <div className="text-[10px] text-slate-400 truncate">{track.desc}</div>
                        </div>
                      </div>
                      {isCurrent && isPlaying && (
                        <div className="flex items-end gap-0.5 h-3 shrink-0 ml-2">
                          <span className="w-1 bg-cyan-400 rounded-full animate-bounce [animation-duration:0.6s]" />
                          <span className="w-1 bg-cyan-400 rounded-full animate-bounce [animation-duration:0.9s]" />
                          <span className="w-1 bg-cyan-400 rounded-full animate-bounce [animation-duration:0.7s]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Đóng bảng điều khiển
            </button>
          </div>
        </div>
      )}
    </>
  );
};
