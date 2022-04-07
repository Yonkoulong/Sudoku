import React, { Component } from 'react';
import '../sass/components/_features.scss';
import swal from "sweetalert2";
import { isNumber } from '../utils/checkNumber';
import Features from './Features';
import Column from './Column';
import Cell from './Cell';
import {withRouter} from 'react-router-dom';

class Sudoku extends Component {
    constructor(props) {
        super(props);
        this.filledSquares = 81;
        let board = this.generateBoard([]);
        let edgeBoard = JSON.parse(JSON.stringify(board));
        this.state = { 
            incorrectValues: [],
            correctBoard: board,
            history: [
                {
                    squares: this.removeSquares(edgeBoard),
                }
            ],
            stepNumber: 0,
            count: 0,
            filledSquares: this.filledSquares,
            solved: false
        } 
    }

    undo = () => {
        // debugger
        let step = this.state.stepNumber;
        if(step > 0) {
            if(this.state.count < 10) {
                this.state.history.pop();
                this.setState({
                    count: this.state.count + 1,
                    stepNumber: step - 1,
                    filledSquares: this.filledSquares - 1, 
                    history: this.state.history
                })
            }
        }
    }

    handleChange = (value, id) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        let squares = JSON.parse(JSON.stringify(current.squares));
        squares[id].value = Number(value) ? Number(value) : null;
        const backTrackTest = JSON.parse(JSON.stringify(squares));
        let updateFilledSquares = Number(value) ? this.state.filledSquares + 1 : this.state.filledSquares - 1;

        if((value !== "0" && isNumber(value)) || value ===  '') {
            //if it was changed
            if(squares[id].value === null) {
                squares[id].incorrect = false
            }
            
            if(squares[id].value !== null && (!this.validSpace(backTrackTest, id, squares[id].value) 
            || !this.backTracking(backTrackTest))){
                squares[id].incorrect = true
            }
            this.setState({
                history: history.concat([
                    {
                        squares: squares
                    }
                ]),
                stepNumber: history.length,
                filledSquares: updateFilledSquares,
            })
        }

        if(this.state.filledSquares == 80 && squares[id].incorrect === false) {
            console.log("win");
            swal.fire({
                title: 'You are Victory',
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff url(/images/trees.png)',
                backdrop: `
                    rgba(0,0,123,0.4)
                    url("/images/nyan-cat.gif")
                    left top
                    no-repeat
                `
            })
              
            this.setState({
                solved: true
            })
            return true;
        }
        
    }

    // check that a previous input number is valid
    validSpace = (squares, index, random) => {
        if (this.checkValidRow(squares, index, random) || 
            this.checkCol(squares, index, random) ||
            this.checkSquare(squares, index, random)) {
                return false;
        }
        return true;
    }

    // check number previous used in the same row when resolve puzzle
    checkValidRow = (squares, index, target) => {
        let baseIndex = 3 * Math.floor(index / 3) - (27 * Math.floor(index / 7))
        for (let i = 0; i < 9; i++) {
            let adjustedIndex = baseIndex + i%3 + Math.floor(i / 3) * 27;
            if (index != adjustedIndex && squares[adjustedIndex] && squares[adjustedIndex].value === target && target) {
                return true;
            }
        }
        return false;
    }
    
    //render
    render() { 
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        return (
            <div className="main">
                <h1 className="name-player">Player: {this.props.match.params.player}</h1>
                <h1 className="title">Sudoku by Long Yonkou</h1>
                <Column squares={current.squares.slice(0, 27)} handleChange={(value, id) => this.handleChange(value, id)}/>
                <Column squares={current.squares.slice(27, 54)} handleChange={(value, id) => this.handleChange(value, id)}/>
                <Column squares={current.squares.slice(54, 81)} handleChange={(value, id) => this.handleChange(value, id)}/>
                {/*features*/}
                <Features 
                    undo={() => this.undo()}
                    newGame={() => window.location.reload(false)}
                />
            </div>
        );
    };

    //Initialize board to null
    initializeEmptyList(squares) {
        for(let i = 0; i < 81; i++) {
            squares[i] = new Cell(i, null)
        }
    };

    //check to see if a passed in number was previously used in the same column 
    checkCol = (squares, index, target) => {
        let baseIndex = (Math.floor(index / 27) * 27 + index % 3);
        for(let i = baseIndex; (i < baseIndex + 27); i+=3) {
            if(index != i && squares[i] && squares[i].value === target && target && index && i !== index) {
                return true;
            }
        }
        return false;
    }

    //check to see if a passed in number was previously used in the same row when generate board
    checkRow = (squares, index, target) => {
        let baseIndex = 3 * Math.floor(index / 3) - (27 * Math.floor(index / 27));
        for(let i = 0; i < 9; i++) {
            let adjustedIndex = baseIndex + i % 3 + Math.floor(i / 3) * 27;
            if(squares[adjustedIndex] && squares[adjustedIndex].value === target && target) {
                return true;
            }
        }
        return false;
    };

    //check to see if a passed in number was previously used in the same square 
    checkSquare = (squares, index, target) => {
        let baseIndex = (Math.floor(index / 9) * 9)
        for(let i = baseIndex; i < (baseIndex + 9); i++) {
            if(index != i && squares[i] && squares[i].value === target && target && index !== i) {
                return true;
            }
        }
        return false;
    }
 
    //check valid
    isSafeCell = (squares, index, target) => {
        if (this.checkCol(squares, index, target) ||
            this.checkSquare(squares, index, target) || 
            this.checkRow(squares, index, target)) {
            return false;
        }
        return true;
    }

    //backTracking algorithm that solves the board
    //Used both for generating the board and validating number inputs
    backTracking = (squares) => {
        const index = this.findUnassignedLocation(squares);
        if(index < 0) {
            return true;
        }
        for(let i = 1; i < 10; i++) {
            if(this.isSafeCell(squares, index, i)){
                squares[index].value = i;

                if(this.backTracking(squares)) {
                    return true;
                }
                squares[index].value = null;
            }
        }
        return false;
    };

    //Find the next unassigned location for the backtracking algorithm
    findUnassignedLocation = (squares) => {
        for(let i = 0; i < 81; i++) {
            if(squares[i].value == null) {
                return i;
            }
        }
        return -1;
    };

    //Fill a subGrid with numbers, used in backtracking
    fillSquare = (squares, index) => {
        for(let i = 0; i < 9; i++) {
            let random;
            do {
                random = Math.floor(Math.random() * 9 + 1);
            } while(!this.isSafeCell(squares, index, random));
            squares[index + i].value = random;
        }
    }

    //random from 0 -> 8
    getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    //create array with 5 length
    getRandomValue = (randomArr) => {
        if(randomArr.length === 5) return randomArr;
        const randomValue = this.getRandomInt(8);
        if(randomArr.indexOf(randomValue) === -1){
            randomArr.push(randomValue);
        }
        return this.getRandomValue(randomArr);

    }

    // Remove numbers at random from array checked
    removeSquares = (squares) => {
        for(let i = 0; i <=8; i++){
            const hiddenSquare = this.getRandomValue([]);
            for(let j =0; j <= 8; j++){
                if(hiddenSquare.indexOf(j) !== -1){
                    squares[i*9+j].value = null;
                    squares[i*9+j].prefilled = false;
                    this.filledSquares -= 1;
                }
            }
        }
        return squares;
    }

    //Generate board array 
    generateBoard = (squares) => {
        this.initializeEmptyList(squares);
        this.fillSquare(squares, 0);
        this.fillSquare(squares, 36);
        this.fillSquare(squares, 72);
        this.backTracking(squares);
        console.log(squares);
        return squares;
    }
}
 
export default Sudoku;