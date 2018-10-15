

export default class Random {




    static rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static array(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    static chance(percent) {
        const rand = this.rand(0,99);
        return rand < percent;

    }
}