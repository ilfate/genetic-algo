import React, { Component } from 'react';

import { inject, observer } from "mobx-react/index";
import { observable, action } from "mobx";
import Behaviour from "../Behaviour";

@inject("store")
@observer
class BehaviourDisplay extends Component {



    constructor(props) {
        super(props);
        // this.action = this.action.bind(this);
        // this.start = this.start.bind(this);
        // this.stop = this.stop.bind(this);
        // this.showBehaviour = this.showBehaviour.bind(this);
    }






    render() {
        return (
            <div className={"behaviour-display"} >

                {this.props.store.bestBehaviour.map((action, key) => <span key={key}>{Behaviour.toString(action)}</span>
                )}
            </div>
        );
    }

}

export default BehaviourDisplay;
