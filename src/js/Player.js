import React, { Component } from 'react';
import { Provider } from "mobx-react";
import PlayerStore from "./Stores/PlayerStore";
import Field from "./Player/Field";
import UnitStore from "./Stores/UnitStore";
import Controlls from "./Player/Controlls";
import Behaviour from "./Behaviour";
import BehaviourDisplay from "./Player/BehaviourDisplay";


const store = new PlayerStore();
for(let i = 0; i < 100; i++) {
    store.addUnit(new UnitStore());
}

for(let i = 0; i < 300; i++) {
    store.addFood();
}
// for(let i = 0; i < 5; i++) {
//     let unit = new UnitStore();
//     unit.x = 100;
//     unit.y = 100;
//     unit.d = 0;
//     unit.behaviour = [Behaviour.MOVE, Behaviour.CHECK, Behaviour.MOVE, Behaviour.MOVE, Behaviour.ROTATE_RIGHT];
//     store.addUnit(unit);
// }
// store.addFood(100, 98);
// store.addFood(100, 96);
// store.addFood(100, 94);
// store.addFood(100, 92);
//
// const sorted = store.units;
// store.units = [];
//
// for(let i = 0; i < 5; i ++) {
//     let originalBehaviour = sorted[i].behaviour;
//     // console.log('b', originalBehaviour);
//     for (let n = 0; n < 20; n ++) {
//         let unit = new UnitStore(Behaviour.mutate(originalBehaviour, n * 2.5));
//         store.addUnit(unit);
//     }
// }
//
// console.log(store.units);

class Player extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <h1>Genetic algorithm - creature behaviour</h1>
                    <div className="player-container">
                        <Field />
                        <Controlls/>

                    </div>
                    <BehaviourDisplay/>

                </div>
            </Provider>
        );
    }
}

export default Player;
