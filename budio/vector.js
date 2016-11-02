module.exports = class Vector {

    constructor(context, array) {
        this.context = context;
        this.array = array;
    }

    get length() {
        return this.array.length;
    }

    map(fn) {
        const array = this.array;
        const length = array.length;
        for (let i = 0; i < length; i++) {
            array[i] = fn(array[i], i);
        }
        return this;
    }

    map2(that, fn) {
        const a = this.array;
        const b = that.array;
        const length = Math.min(a.length, b.length);
        for (let i = 0; i < length; i++) {
            a[i] = fn(a[i], b[i], i);
        }
        return this;
    }

    add(that) {
        if (typeof that === 'number') {
            return this.map(x => x + that);
        } else {
            return this.map2(that, (x, y) => x + y);
        }
    }

    sub(that) {
        if (typeof that === 'number') {
            return this.map(x => x - that);
        } else {
            return this.map2(that, (x, y) => x - y);
        }
    }

    mul(that) {
        if (typeof that === 'number') {
            return this.map(x => x * that);
        } else {
            return this.map2(that, (x, y) => x * y);
        }
    }

    div(that) {
        if (typeof that === 'number') {
            return this.map(x => x / that);
        } else {
            return this.map2(that, (x, y) => x / y);
        }
    }

    pow(that) {
        if (typeof that === 'number') {
            return this.map(x => Math.pow(x, that));
        } else {
            return this.map2(that, (x, y) => Math.pow(x, y));
        }
    }

    sin() {
        return this.map(Math.sin);
    }

    cos() {
        return this.map(Math.cos);
    }

    sqrt() {
        return this.map(Math.sqrt);
    }

    abs() {
        return this.map(Math.abs);
    }

};
