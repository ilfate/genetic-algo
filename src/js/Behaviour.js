import Field from "./Player/Field";
import Random from "./Helpers/Random";

class Behaviour {


    static get NOTHING() { return 'n' }
    static get MOVE() { return 'm' }
    static get ROTATE_LEFT() { return 'rl' }
    static get ROTATE_RIGHT() { return 'rr' }
    static get CHECK() { return 'c' }
    static get SEARCH_FOOD() { return 'sf' }
    static get ALL() { return [
        this.NOTHING,
        this.MOVE,
        this.ROTATE_LEFT,
        this.ROTATE_RIGHT,
        this.CHECK,
        this.SEARCH_FOOD,
    ]; }


    static do(unit, action, store) {
        switch (action) {
            case this.MOVE: this.move(unit, store); break;
            case this.ROTATE_LEFT: this.rotateLeft(unit); break;
            case this.ROTATE_RIGHT: this.rotateRight(unit); break;
            case this.CHECK: this.check(unit, store); break;
            case this.SEARCH_FOOD: this.searchFood(unit, store); break;
        }
    }

    static toString(action) {
        switch (action) {
            case this.MOVE: return 'Move';
            case this.ROTATE_LEFT: return 'Left';
            case this.ROTATE_RIGHT: return 'Right';
            case this.CHECK: return 'Check';
            case this.SEARCH_FOOD: return 'Search';
            case this.NOTHING: return 'Nothing';
        }
    }

    static move(unit, store) {
        switch (unit.d) {
            case 0: unit.y--; break;
            case 1: unit.x++; break;
            case 2: unit.y++; break;
            case 3: unit.x--; break;
        }
        unit.energy--;
        this.validatePosition(unit);
        this.isUnitAteFood(unit, store);
    }

    static rotateLeft(unit) {
        unit.d--;
        if (unit.d < 0) unit.d = 3;
    }

    static rotateRight(unit) {
        unit.d++;
        if (unit.d > 3) unit.d = 0;
    }

    static check(unit, store) {
        let x = unit.x;
        let y = unit.y;
        switch (unit.d) {
            case 0: y--; break;
            case 1: x++; break;
            case 2: y++; break;
            case 3: x--; break;
        }
        const food = store.food.get(x, y);
        if (food) {
            // do nothing
        } else {
            unit.actionPointer++;
        }
    }

    static searchFood(unit, store) {
        let x = unit.x;
        let y = unit.y;
        let front = {}, left = {}, right = {}, back = {};
        switch (unit.d) {
            case 0: front = {x, y: y - 1}, left = {x: x - 1, y}, right = {x: x + 1, y}, back = {x, y: y + 1}; break;
            case 1: front = {x : x + 1, y}, left = {x, y: y - 1}, right = {x, y: y + 1}, back = {x : x - 1, y}; break;
            case 2: front = {x, y: y + 1}, left = {x: x + 1, y}, right = {x: x - 1, y}, back = {x, y: y - 1}; break;
            case 3: front = {x : x - 1, y}, left = {x, y: y + 1}, right = {x, y: y - 1}, back = {x : x + 1, y}; break;
        }
        const frontFood = store.food.get(front.x, front.y);
        if (frontFood) {
             return;
        }
        const leftFood = store.food.get(left.x, left.y);
        if (leftFood) { unit.actionPointer ++; return; }
        const rightFood = store.food.get(right.x, right.y);
        if (rightFood) { unit.actionPointer += 2; return; }
        const backFood = store.food.get(back.x, back.y);
        if (backFood) { unit.actionPointer += 3; return; }
        unit.actionPointer += 4;
    }

    static validatePosition(unit) {
        if (unit.x < 0) unit.x = Field.WIDTH + unit.x;
        if (unit.y < 0) unit.y = Field.HEIGHT + unit.y;
        if (unit.x >= Field.WIDTH) unit.x = unit.x - Field.WIDTH;
        if (unit.y >= Field.HEIGHT) unit.y = unit.y - Field.HEIGHT;
    }

    static isUnitAteFood(unit, store) {
        const food = store.food.get(unit.x, unit.y);
        if(food) {
            store.food.remove(food.x, food.y);
            unit.eat();
        }
    }

    static getRandomBehaviour() {
        let arr = [];
        for(let i = 0; i < 40; i++) {
            arr.push(Random.array(this.ALL))
        }
        return arr;
    }

    static mutate(behaviour, strength) {
        // strength 1 - 100%
        behaviour = behaviour.slice();
        for (let key in behaviour) {
            if (Random.chance(strength)) {
                behaviour[key] = Random.array(this.ALL);
            }
        }
        return behaviour;
    }
}


export default Behaviour;
