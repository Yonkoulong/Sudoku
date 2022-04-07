import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
        id: 1,
        player: "Unkown"
    };
  }

  handleChange = (e) => {
    this.setState({
        player: e.target.value
    })
  }

  render() {
    return (  
        <div>
            <img src="../../sudoku.png" alt="Loading!" className="game-img" />
            <div className="enter">
                <input type="text" onChange={(e) => this.handleChange(e)} className="name-ipt" placeholder="Username..."/>
                <Link to={`/Sudoku/${this.state.player}`} className="link-btn"
                  
                >
                    <button className="play-btn">Play</button>
                </Link>
            </div>
        </div>
    );
  }
}

export default Home;
