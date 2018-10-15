import React, { Component } from 'react';
import Field from "./Field";
import {inject, observer} from "mobx-react/index";

@inject("store")
@observer
class Food extends Component {



    render() {
        const { x, y } = this.props;
        let style = {
            margin: `${y * Field.SIZE}px 0 0 ${x * Field.SIZE}px`
        };
        return (
            <div className={"food"} style={style}>
            </div>
        );
    }


}

export default Food;
