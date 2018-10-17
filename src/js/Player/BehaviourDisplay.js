import React, { Component } from 'react';
import { inject, observer } from "mobx-react/index";
import Behaviour from "../Behaviour";
import Field from "./Field";

@inject("store")
@observer
class BehaviourDisplay extends Component {

    render() {
        const { store } = this.props;
        return (
            <div className={"behaviour-display"} >
                You see here a field of { Field.WIDTH * Field.HEIGHT } cells. There are <span className={"unit-text"}>{ store.units.length } alive creatures</span>.
                There is also <span className={"food-text"}>{ store.getFoodCount } units of food</span> and <span className={"stone-text"}>{ store.getStonesCount } units of stones</span> in the field.
                Creatures don't have any logic. Every turn they do one of possible random actions. That could be Moving, Rotating, Checking what is in front, Searching for food and Breaking stone.
                With every action creatures loose energy. When they run out of it - they die. After all of them are dead next generation of creatures is born. They inherit the order of action from the longest lived creatures in the previous generation with a little mutations.
                Current generation number is <span className={"generation-text"}> {store.generationNumber}</span>.
                <br />The longest live of a creature from previous generation was: { store.bestAge } turns.
                <br/> The best DNA of actions from previous generation was: <br />
                {this.props.store.bestBehaviour.map((action, key) => <span key={key}>{Behaviour.toString(action)}</span>)}
            </div>
        );
    }

}

export default BehaviourDisplay;
