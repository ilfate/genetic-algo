import React, { Component } from 'react';
import Unit from "./Unit";
import {inject, observer} from "mobx-react/index";
import FoodContainer from "./FoodContainer";

@inject("store")
@observer
class Field extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        const { store } = this.props;
        return (
            <div className={"field"} >
                <div className={"units"}>
                {store.units.map(unit =>
                    <Unit data={ unit } key={unit.id} />
                )}
                </div>
                <FoodContainer/>
            </div>
        );
    }

    static get WIDTH() { return 360; }
    static get HEIGHT() { return 200; }
    static get SIZE() { return 3; }
}

export default Field;
