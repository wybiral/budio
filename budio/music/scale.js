module.exports = class Scale {

    constructor(root, name) {
        this.root = root.toOctave(0);
        this.intervals = SCALES[name.replace('-', '').replace(' ', '')];
        this.name = name;
    }

    get(index) {
        const intervals = this.intervals;
        let note = this.root;
        for (let i = 0; i < index; i++) {
            note = note.transpose(intervals[i % intervals.length]);
        }
        return note;
    }

    index(note) {
        const intervals = this.intervals;
        let i = 0;
        let x = this.root;
        for (; x.index < note.index; i++) {
            x = x.transpose(intervals[i % intervals.length]);
        }
        if (x.index !== note.index) {
            throw new Error('Note not in scale');
        }
        return i;
    }

    transpose(note, interval) {
        return this.get(this.index(note) + interval);
    }

}


const SCALES = {
  'major': [2, 2, 1, 2, 2, 2, 1],
  'minor': [2, 1, 2, 2, 1, 2, 2],
  'melodicminor': [2, 1, 2, 2, 2, 2, 1],
  'harmonicminor': [2, 1, 2, 2, 1, 3, 1],
  'pentatonicmajor': [2, 2, 3, 2, 3],
  'bluesmajor': [3, 2, 1, 1, 2, 3],
  'pentatonicminor': [3, 2, 2, 3, 2],
  'bluesminor': [3, 2, 1, 1, 3, 2],
  'augmented': [3, 1, 3, 1, 3, 1],
  'diminished': [2, 1, 2, 1, 2, 1, 2, 1],
  'chromatic': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  'wholehalf': [2, 1, 2, 1, 2, 1, 2, 1],
  'halfwhole': [1, 2, 1, 2, 1, 2, 1, 2],
  'wholetone': [2, 2, 2, 2, 2, 2],
  'augmentedfifth': [2, 2, 1, 2, 1, 1, 2, 1],
  'japanese': [1, 4, 2, 1, 4],
  'oriental': [1, 3, 1, 1, 3, 1, 2],
  'ionian': [2, 2, 1, 2, 2, 2, 1],
  'dorian': [2, 1, 2, 2, 2, 1, 2],
  'phrygian': [1, 2, 2, 2, 1, 2, 2],
  'lydian': [2, 2, 2, 1, 2, 2, 1],
  'mixolydian': [2, 2, 1, 2, 2, 1, 2],
  'aeolian': [2, 1, 2, 2, 1, 2, 2],
  'locrian': [1, 2, 2, 1, 2, 2, 2]
}
