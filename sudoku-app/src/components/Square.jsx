import React, { Component, useDebugValue } from 'react'

export default class Square extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: props.squares.id,
            value: props.squares.value,
            prefilled: props.squares.prefilled
        }
    }

    doChange = (e) => {
        this.setState({ 
            value: e.target.value
        })
        this.props.handleChange(e.target.value, e.target.id);
    }

    render() {
        let className = this.state.prefilled ? "square square-blue" : "square square-white";
        if (this.props.squares.incorrect) {
            className = "square square-red";
        }
        return (
            <td>
                <div className={className}>
                    <input type="text" pattern="as" inputMode="numeric" maxLength="1"
                        // value={this.state.value ? this.state.value : ''} 
                        value={this.props.squares.value || ''}
                        id={this.state.id} 
                        disabled={this.state.prefilled}
                        onChange={(e) => this.doChange(e)}
                    />   
                </div>
            </td>
        )
    }
}
