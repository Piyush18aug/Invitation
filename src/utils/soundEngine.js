// Web Audio Traditional Indian Instrumental Ambient Engine
class IndianAmbientEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.timer = null;
    this.notes = [130.81, 196.0, 261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  start() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 2);

    // Continuous Tanpura Resonance Drone
    this.startTanpuraDrone();

    // Raga Santoor Note Plucking Loop
    this.scheduleNotes();
  }

  startTanpuraDrone() {
    if (!this.ctx) return;
    const droneFreqs = [130.81, 196.0, 261.63]; // Sa, Pa, Sa
    this.droneOscs = droneFreqs.map((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      return osc;
    });
  }

  playSantoorPluck(freq) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(0.15, now + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(noteGain);
    oscHarmonic.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + 2.6);
    oscHarmonic.stop(now + 2.6);
  }

  scheduleNotes() {
    if (!this.isPlaying) return;
    const randomNote = this.notes[Math.floor(Math.random() * this.notes.length)];
    this.playSantoorPluck(randomNote);

    const nextDelay = 1200 + Math.random() * 1800;
    this.timer = setTimeout(() => {
      this.scheduleNotes();
    }, nextDelay);
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
    }
  }
}

export const indianAmbientEngine = new IndianAmbientEngine();
