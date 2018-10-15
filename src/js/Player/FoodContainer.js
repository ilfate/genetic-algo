import React, { Component } from 'react';
import { inject, observer } from "mobx-react/index";
import Food from "./Food";

@inject("store")
@observer
class FoodContainer extends Component {

    render() {
        const { store } = this.props;
        const allFood = store.getAllFood;
        return (
            <div className={"foods"}>
                {allFood.map((food) => {
                    if (!food) return;
                    return <Food x={ food.x} y={ food.y } key={`${food.x} ${food.y}`} />
                }
                )}
                {allFood.length}
            </div>
        );

    }

}

export default FoodContainer;
