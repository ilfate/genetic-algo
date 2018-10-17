import { observable, action, computed } from "mobx";
import Field from "../Player/Field";
import MapStorage from "./MapStorage";
import MapObjectStore from "./MapObjectStore";
import UnitStore from "./UnitStore";
import Behaviour from "../Behaviour";


class PlayerStore {
    @observable units = [];
    @observable food = new MapStorage();
    @observable lastId = 0;
    @observable deadUnits = [];
    @observable generationNumber = 1;

    @observable bestBehaviour = [];
    @observable bestAge = 0;

    @action.bound action() {
        this.units.map(unit => {
            const isAlive = unit.action(this);
            if (!isAlive) {
                this.unitDeath(unit);
            }
        })
    }

    @action.bound generation() {
        this.units = [];
        const sorted = this.deadUnits.slice().sort(function(a, b) {
            return b.age - a.age;
        });
        this.bestBehaviour = sorted[0].behaviour;
        this.bestAge = sorted[0].age;
        this.generationNumber++;

        for(let i = 0; i < 5; i ++) {
            let originalBehaviour = sorted[i].behaviour;

            for (let n = 0; n < 20; n ++) {
                let unit = new UnitStore(Behaviour.mutate(originalBehaviour, n * 2.5));
                this.addUnit(unit);
            }
        }
        this.deadUnits = [];
        if (this.food.array.length < 2500) {
            for (let i = 0; i < 300; i++) {
                this.addFood();
            }
        }
    }

    addUnit(unit) {
        this.units.push(unit);
        unit.id = this.lastId++;
    }

    addFood(x = false, y = false) {
        if (x === false) {
            x = Math.round(Math.random() * Field.WIDTH);
        }
        if (y === false) {
            y = Math.round(Math.random() * Field.HEIGHT);
        }
        const id = x + y + Math.round(Math.random() * 10000);
        const food = new MapObjectStore();
        food.x = x;
        food.y = y;
        food.id = id;
        food.type = MapObjectStore.FOOD;
        this.food.add(food, x, y);
    }

    addStone(x, y) {
        const id = x + y + Math.round(Math.random() * 99999);
        const food = new MapObjectStore();
        food.x = x;
        food.y = y;
        food.id = id;
        food.type = MapObjectStore.STONE;
        this.food.add(food, x, y);
    }

    unitDeath(unit) {
        const index = this.units.indexOf(unit);

        if (index > -1) {
            this.units.splice(index, 1);
        }
        this.deadUnits.push(unit);
    }

    @computed get getAllMapObjects() {
        return this.food.all;
    }
    @computed get getFoodCount() {
        let count = 0;
        this.food.array.map(item => item.type === MapObjectStore.FOOD ? count++ : "");
        return count;
    }
    @computed get getStonesCount() {
        let count = 0;
        this.food.array.map(item => item.type === MapObjectStore.STONE ? count++ : "");
        return count;
    }

}


export default PlayerStore;
