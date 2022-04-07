import React, { Component } from 'react';
import Square from './Square';

class SubGrid extends Component {
    render() { 
        return (
            <table>
                <tbody>
                    <tr>
                        <Square squares={this.props.squares[0]} handleChange={this.props.onChange}/>
                        <Square squares={this.props.squares[1]} handleChange={this.props.onChange}/>
                        <Square squares={this.props.squares[2]} handleChange={this.props.onChange}/>
                    </tr>
                    <tr>
                        <Square squares={this.props.squares[3]} handleChange={this.props.onChange}/>
                        <Square squares={this.props.squares[4]} handleChange={this.props.onChange}/>
                        <Square squares={this.props.squares[5]} handleChange={this.props.onChange}/>
                    </tr>
                    <tr>
                        <Square squares={this.props.squares[6]} handleChange={this.props.onChange}/>
                        <Square squares={this.props.squares[7]} handleChange={this.props.onChange}/>
                        <Square squares={this.props.squares[8]} handleChange={this.props.onChange}/>
                    </tr>
                </tbody>
            </table>
        );
    }
};
 
export default SubGrid;
