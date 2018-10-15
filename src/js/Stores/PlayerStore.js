import { observable, action, computed } from "mobx";
import Field from "../Player/Field";
import MapStorage from "./MapStorage";
import FoodStore from "./FoodStore";
import UnitStore from "./UnitStore";
import Behaviour from "../Behaviour";


class PlayerStore {
    @observable units = [];
    @observable food = new MapStorage();
    @observable lastId = 0;
    @observable deadUnits = [];
    @observable bestBehaviour = [];
    // @observable isTestMode = false;
    // @observable chapter = chapterStore;

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
        console.log(this.bestBehaviour);
        for(let i = 0; i < 5; i ++) {
            let originalBehaviour = sorted[i].behaviour;
            // console.log('b', originalBehaviour);
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
    @action.bound addUnit(unit) {
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
        const food = new FoodStore();
        food.x = x;
        food.y = y;
        food.id = id;
        this.food.add(food, x, y);
    }
    @action.bound removeFood(x, y) {
        this.food.remove({x, y});
    }

    @action.bound unitDeath(unit) {
        const index = this.units.indexOf(unit);
        // console.log(unit, index);
        if (index > -1) {
            this.units.splice(index, 1);
        }
        this.deadUnits.push(unit);
    }

    @computed get getAllFood() {
        return this.food.all;
    }
    //
    // @action.bound setChapter(chapter) {
    //     this.chapter = chapter;
    // }
    //
    // @action.bound sceneStepFinished(nextStep) {
    //     this.chapter.scene.stepFinished(nextStep);
    // }
    //
    // @computed get progress() {
    //     return this.chapter.scene.progress;
    // }
}


export default PlayerStore;
