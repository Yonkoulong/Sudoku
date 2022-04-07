import React, { Component } from 'react';
import SubGrid from './SubGrid'

export default class Column extends Component {
    render() {
        return (
            <div className="column">
                <SubGrid squares={this.props.squares.slice(0, 9)} onChange={this.props.handleChange}/>
                <SubGrid squares={this.props.squares.slice(9, 18)} onChange={this.props.handleChange}/>
                <SubGrid squares={this.props.squares.slice(18, 27)} onChange={this.props.handleChange}/>
            </div>
        )
    }
}
