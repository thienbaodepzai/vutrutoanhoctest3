// Procedural Web Audio Ambient Music Engine for MathVerse
// Generates relaxing, study-friendly cosmic ambient and lo-fi melodies without external audio files.

export interface MusicTrack {
  id: string;
  title: string;
  desc: string;
  icon: string;
  bpm: number;
}

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'cosmic-nebula',
    title: 'Vũ trụ Êm dịu',
    desc: 'Âm hưởng ngân vang không gian thư giãn, giúp giải tỏa căng thẳng',
    icon: '🌌',
    bpm: 54,
  },
  {
    id: 'lofi-math',
    title: 'Math Lo-Fi Chill',
    desc: 'Hợp âm Rhodes ấm áp nhẹ nhàng, tăng cường sự tập trung suy nghĩ',
    icon: '🎧',
    bpm: 68,
  },
  {
    id: 'starlight',
    title: 'Bầu trời Sao lung linh',
    desc: 'Giai điệu chuông gió và đàn hạc thanh thoát, êm tai',
    icon: '⭐',
    bpm: 60,
  },
  {
    id: 'deep-focus',
    title: 'Sóng tập trung sâu',
    desc: 'Tần số Alpha cộng hưởng 432Hz giúp não bộ ghi nhớ kiến thức tốt hơn',
    icon: '🧘',
    bpm: 48,
  },
];

// Musical chord tables (frequencies in Hz)
const CHORD_PROGRESSIONS: Record<string, number[][]> = {
  // Cmaj7 -> Am9 -> Fmaj7 -> Gsus4
  'cosmic-nebula': [
    [130.81, 164.81, 196.00, 246.94], // C3, E3, G3, B3
    [110.00, 146.83, 174.61, 220.00], // A2, D3, F3, A3
    [87.31, 130.81, 174.61, 220.00],  // F2, C3, F3, A3
    [98.00, 146.83, 196.00, 246.94],  // G2, D3, G3, B3
  ],
  // Fmaj7 -> Em7 -> Dm7 -> Cmaj7
  'lofi-math': [
    [174.61, 220.00, 261.63, 329.63], // F3, A3, C4, E4
    [164.81, 196.00, 246.94, 293.66], // E3, G3, B3, D4
    [146.83, 174.61, 220.00, 261.63], // D3, F3, A3, C4
    [130.81, 164.81, 196.00, 246.94], // C3, E3, G3, B3
  ],
  // Pentatonic melodies in C major (E4, G4, A4, C5, D5, E5)
  'starlight': [
    [261.63, 329.63, 392.00, 523.25], // C4, E4, G4, C5
    [220.00, 261.63, 329.63, 440.00], // A3, C4, E4, A4
    [174.61, 261.63, 329.63, 392.00], // F3, C4, E4, G4
    [196.00, 246.94, 293.66, 392.00], // G3, B3, D4, G4
  ],
  // Meditative slow fifths and octaves
  'deep-focus': [
    [108.00, 162.00, 216.00, 432.00], // A2(432-based), E3, A3, A4
    [96.00, 144.00, 192.00, 384.00],  // G2, D3, G3, G4
    [86.40, 129.60, 172.80, 345.60],  // F2, C3, F3, F4
    [96.00, 144.00, 216.00, 432.00],  // G2, D3, A3, A4
  ],
};

const ARPEGGIO_NOTES: Record<string, number[]> = {
  'cosmic-nebula': [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99],
  'lofi-math': [329.63, 392.00, 440.00, 523.25, 587.33, 659.25],
  'starlight': [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50],
  'deep-focus': [216.00, 324.00, 432.00, 648.00],
};

class ProceduralMusicPlayer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;

  private isPlaying: boolean = false;
  private currentTrackId: string = 'cosmic-nebula';
  private volume: number = 0.45; // 0 to 1

  private chordTimer: any = null;
  private arpTimer: any = null;
  private chordIndex: number = 0;

  private listeners: ((state: { isPlaying: boolean; trackId: string; volume: number }) => void)[] = [];

  constructor() {
    // Lazy initialized
  }

  private initAudio() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

        // Low-pass filter to give soothing, warm cosmic feel
        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(1400, this.ctx.currentTime);

        this.masterGain.connect(this.filterNode);
        this.filterNode.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (state: { isPlaying: boolean; trackId: string; volume: number }) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify() {
    const state = {
      isPlaying: this.isPlaying,
      trackId: this.currentTrackId,
      volume: this.volume,
    };
    this.listeners.forEach((cb) => cb(state));
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      trackId: this.currentTrackId,
      volume: this.volume,
      currentTrack: MUSIC_TRACKS.find((t) => t.id === this.currentTrackId) || MUSIC_TRACKS[0],
    };
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.05);
    }
    this.notify();
  }

  public setTrack(trackId: string) {
    if (this.currentTrackId === trackId) return;
    this.currentTrackId = trackId;
    if (this.isPlaying) {
      this.stopGenerators();
      this.startGenerators();
    }
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public play() {
    this.initAudio();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.startGenerators();
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    this.stopGenerators();
    this.notify();
  }

  private stopGenerators() {
    if (this.chordTimer) {
      clearInterval(this.chordTimer);
      this.chordTimer = null;
    }
    if (this.arpTimer) {
      clearInterval(this.arpTimer);
      this.arpTimer = null;
    }
  }

  private startGenerators() {
    this.stopGenerators();
    this.chordIndex = 0;

    const track = MUSIC_TRACKS.find((t) => t.id === this.currentTrackId) || MUSIC_TRACKS[0];
    const chords = CHORD_PROGRESSIONS[this.currentTrackId] || CHORD_PROGRESSIONS['cosmic-nebula'];
    const chordDurationMs = (60 / track.bpm) * 4 * 1000; // 4 beats per chord
    const arpIntervalMs = (60 / track.bpm) * 1000 * 0.75; // Arpeggio frequency

    // Play first chord right away
    this.playChord(chords[0], chordDurationMs / 1000);

    // Schedule chord changes
    this.chordTimer = setInterval(() => {
      if (!this.isPlaying) return;
      this.chordIndex = (this.chordIndex + 1) % chords.length;
      this.playChord(chords[this.chordIndex], chordDurationMs / 1000);
    }, chordDurationMs);

    // Schedule gentle melodic notes
    this.arpTimer = setInterval(() => {
      if (!this.isPlaying) return;
      this.playRandomArpNote();
    }, arpIntervalMs);
  }

  // Play a soft atmospheric chord with gentle swell
  private playChord(frequencies: number[], durationSec: number) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    frequencies.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft sine or triangle for cosmic pad
      osc.type = this.currentTrackId === 'lofi-math' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Micro-detune to give lush chorus effect
      osc.detune.setValueAtTime((idx - 1.5) * 6, now);

      // Gentle attack and release envelope
      const attack = Math.min(1.8, durationSec * 0.35);
      const decay = Math.min(1.5, durationSec * 0.35);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05 / frequencies.length, now + attack);
      gain.gain.setValueAtTime(0.05 / frequencies.length, now + durationSec - decay);
      gain.gain.linearRampToValueAtTime(0.0001, now + durationSec);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + durationSec + 0.1);
    });
  }

  // Play random soft melodic droplet / bell / note
  private playRandomArpNote() {
    if (!this.ctx || !this.masterGain) return;

    const notes = ARPEGGIO_NOTES[this.currentTrackId] || ARPEGGIO_NOTES['cosmic-nebula'];
    const randomFreq = notes[Math.floor(Math.random() * notes.length)];
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = this.currentTrackId === 'starlight' ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(randomFreq, now);

    // Soft chime envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.035, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + 1.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.85);
  }
}

export const musicPlayer = new ProceduralMusicPlayer();
