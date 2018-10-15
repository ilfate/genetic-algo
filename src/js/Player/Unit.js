import React, { Component } from 'react';
import Field from "./Field";
import {inject, observer} from "mobx-react/index";

@inject("store")
@observer
class Unit extends Component {



    render() {
        const { data } = this.props;
        let style = {
            margin: `${data.y * Field.SIZE}px 0 0 ${data.x * Field.SIZE}px`
        };
        return (
            <div className={"unit"} style={style}>
            </div>
        );
    }


}

export default Unit;
