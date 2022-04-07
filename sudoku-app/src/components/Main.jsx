import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
}  from "react-router-dom";
import Sudoku from './Sudoku';
import Home from './Home';

class Main extends Component {
    state = {  } 
    render() { 
        return (
            <Router>
                <Switch>
                    <Route exact path="/sudoku/:player" component={Sudoku}/> 
                    <Route exact path="/" component={Home}/> 
                </Switch>
            </Router>

        );
    }
}
 
export default Main;