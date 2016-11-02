class Note {

    constructor(note) {
        if (typeof note === 'string') {
            note = parseNote(note);
        }
        this.index = note;
    }

    toString() {
        return this.note + this.octave;
    }

    get note() {
        return Note.NOTES[this.noteIndex];
    }

    get noteIndex() {
        return this.index % 12;
    }

    get octave() {
        return Math.floor(this.index / 12);
    }

    get frequency() {
        const C0 = 16.35159783128741;
        return C0 * Math.pow(2.0, this.index / 12.0);
    }

    transpose(delta) {
        return new Note(this.index + delta);
    }

    toOctave(octave) {
        return new Note(this.noteIndex + 12 * octave);
    }

};
module.exports = Note;

Note.NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

const parseNote = note => {
    let octave = 4;
    note = note.trim().toUpperCase();
    // Parse octave
    if (!isNaN(parseInt(note[note.length - 1]))) {
        octave = parseInt(note[note.length - 1]);
        note = note.substr(0, note.length - 1);
    }
    let index = Note.NOTES.indexOf(note[0]);
    // Parse accidentals
    for (let i = 1; i < note.length; i++) {
        if (note[i] === '#') {
            index++;
        } else if (note[i] === 'b') {
            index--;
        }
    }
    return (index % 12) + 12 * octave;
};
