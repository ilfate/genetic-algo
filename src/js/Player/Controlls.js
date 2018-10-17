import React, { Component } from 'react';

import { inject, observer } from "mobx-react/index";
import { observable, action } from "mobx";

@inject("store")
@observer
class Controlls extends Component {

    @observable interval = 0;

    constructor(props) {
        super(props);
        this.action = this.action.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.showBehaviour = this.showBehaviour.bind(this);
    }


    action() {
        if (this.props.store.units.length > 0) {
            this.props.store.action();
        } else {
            this.props.store.generation();
        }
    }
    showBehaviour() {
        console.log(this.props.store.units.map(unit => unit.behaviour));
    }

    start() {
        if (this.interval === 0) {
            this.interval = setInterval(() => {
                this.action()
            }, 1);
        }
    }

    @action stop() {
        clearInterval(this.interval);
        this.interval = 0;
    }

    render() {
        const { units } = this.props;
        return (
            <div className={"controlls"}>
                <a className={'btn'} onClick={this.start}>Start</a>
                <a className={'btn'} onClick={this.stop}>Stop</a>
                {/*<a className={'btn'} onClick={this.action}>Single Action</a>*/}
            </div>
        );
    }

}

export default Controlls;
