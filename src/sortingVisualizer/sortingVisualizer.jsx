import React from 'react';
import './sortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

export default class SortingVisualizer extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            array: [],
            animationSpeedMs: 1,
            nBars: NUMBER_OF_ARRAY_BARS,
            isSorted: false,
            isRunning: false,
        };
    }

        componentDidMount(){
            this.resetArray();
        }

        resetArray(){
            const arr = [];
            for(let i = 0; i < this.state.nBars; i++){
                // Starting from value 5 so bars will be visible
                arr.push(randomIntFromInterval(5, 150));
            }
            this.setState({array: arr});
            console.log(arr)
;        }

    render(){
        const {array} = this.state;
        
        return (
            <div className="app-container">
                <div className = "array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                // Value for height is half of the array value
                                height: `${value * 0.5 }vmin`,
                                // Width of one bar is 1% of all the bars' widths 
                                width: `${100 / NUMBER_OF_ARRAY_BARS}vw`,
                            }}></div>
                    ))}
                
                </div>
            </div>
        );
    }  
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}