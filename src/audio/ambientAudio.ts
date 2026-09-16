// Web Audio API Procedural Alpine Atmosphere Generator
// Generates gentle mountain wind breeze, pine rustle, and subtle alpine chimes

class AlpineAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private chimeInterval: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    if (this.isPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    this.isPlaying = true;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 3);
    this.masterGain.connect(this.ctx.destination);

    // Create 5-second pink noise buffer for realistic mountain wind
    const bufferSize = this.ctx.sampleRate * 5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buffer;
    this.noiseNode.loop = true;

    // Low-pass filter modulated slowly to simulate gusting mountain wind at 7,906 ft
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(2.0, this.ctx.currentTime);

    // Modulate filter frequency for breeze dynamics
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime); // 0.15 Hz slow breath
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(this.filterNode.frequency);
    lfo.start();

    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.masterGain);
    this.noiseNode.start();

    // Subtle harmonic alpine chime generator (peaceful zen feel)
    this.startChimes();
  }

  private startChimes() {
    if (this.chimeInterval) return;
    const chimeFreqs = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51]; // Pentatonic Alpine scale C, E, G, B, C, E

    this.chimeInterval = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      if (Math.random() > 0.45) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.03, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.6);
    }, 4000);
  }

  public stop() {
    if (!this.isPlaying) return;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        try {
          this.noiseNode?.stop();
          this.noiseNode?.disconnect();
        } catch {}
      }, 1000);
    }
    if (this.chimeInterval) {
      clearInterval(this.chimeInterval);
      this.chimeInterval = null;
    }
    this.isPlaying = false;
  }
}

export const alpineAudio = new AlpineAudioEngine();
