import { observable, action } from "mobx";
import Field from "../Player/Field";
import Behaviour from "../Behaviour";

const MAX_ENERGY = 200;
const ENERGY_LOSS_RATE = 5;

class UnitStore {
    @observable id = '';
    @observable status = '';
    @observable energy = 100;
    @observable age = 0;
    @observable d = Math.round(Math.random() * 3);
    @observable x = Math.round(Math.random() * Field.WIDTH);
    @observable y = Math.round(Math.random() * Field.HEIGHT);

    @observable actionPointer = 0;
    @observable behaviour;

    constructor(behaviour) {
        if (!behaviour) {
            behaviour = Behaviour.getRandomBehaviour();
        }
        this.behaviour = behaviour;
    }

    action(store) {
        if (this.energy <= 0) {
            return this.death();
        }
        const action = this.behaviour[this.actionPointer];
        Behaviour.do(this, action, store);
        this.age++;
        if (this.age % ENERGY_LOSS_RATE === 0) {
            // time to get older
            this.energy--;
        }
        this.actionPointer++;
        if (this.actionPointer >= this.behaviour.length) this.actionPointer = 0;
        return true;
    }

    eat() {
        this.energy += 50;
        if (this.energy >= MAX_ENERGY) this.energy = MAX_ENERGY;
    }

    death() {
        return false;
    }

    static get MAX_ENERGY() { return MAX_ENERGY; }
    static get ENERGY_LOSS_RATE() { return ENERGY_LOSS_RATE; }
}


export default UnitStore;
