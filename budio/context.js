const Vector = require('./vector');

module.exports = class Context {

    constructor() {
        const audioContext = new AudioContext();
        this.audioContext = audioContext;
        this.node = audioContext.createGain();
        this.node.connect(audioContext.destination);
    }

    get now() {
        return this.audioContext.currentTime;
    }

    get rate() {
        return this.audioContext.sampleRate;
    }

    createNode(vector) {
        const audioContext = this.audioContext;
        const array = vector.array;
        const length = array.length;
        const buffer = audioContext.createBuffer(1, length, this.rate);
        const data = buffer.getChannelData(0);
        data.set(array);
        const node = audioContext.createBufferSource();
        node.buffer = buffer;
        return node;
    }

    play(vector, when) {
        if (typeof when === 'undefined') {
            when = this.now;
        }
        const node = this.createNode(vector);
        node.connect(this.node);
        node.start(when);
    }

    silence(duration) {
        const rate = this.rate;
        const length = (duration * rate) | 0;
        const array = new Float32Array(length);
        return new Vector(this, array);
    }

    range(duration) {
        return this.silence(duration).map((x, i) => i);
    }

    seconds(duration) {
        const rate = this.rate;
        return this.silence(duration).map((x, i) => i / rate);
    }

    sin(frequency, duration) {
        const factor = Math.PI * 2 * frequency;
        return this.seconds(duration).mul(factor).sin();
    }

    saw(frequency, duration) {
        const period = Math.floor(this.rate / frequency);
        const vector = this.silence(duration);
        vector.map((x, i) => {
            return ((i % period) / period) * 2 - 1;
        });
        return vector;
    }

    square(frequency, duration) {
        const period = Math.floor(this.rate / frequency);
        const halfPeriod = (period / 2) | 0;
        const vector = this.silence(duration);
        vector.map((x, i) => {
            return (i % period) < halfPeriod ? -1 : 1;
        });
        return vector;
    }

    triangle(frequency, duration) {
        const period = Math.floor(this.rate / frequency);
        const hp = Math.floor(period / 2);
        const vector = this.silence(duration);
        vector.map((x, i) => {
            return ((hp - Math.abs(i % period - hp)) / hp) * 2 - 1;
        });
        return vector;
    }

};
