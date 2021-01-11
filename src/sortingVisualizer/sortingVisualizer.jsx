import React from 'react';
import './sortingVisualizer.css';


export default class SortingVisualizer extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            array: [],
            animationSpeedMs: 1,
            nBars: 300,
        };
    }

        componentDidMount(){
            this.resetArray();
        }

        resetArray(){
            const array = [];
            for(let i = 0; i < this.nBars; i++){
                array.push(randomIntFromInterval(5, 700));
            }
            this.setState({array});
        }

    render(){
        const {array} = this.state;
        
        return (
            <div className = "array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            height: `${value}px`,
                        }}></div>
                ))}
            </div>
        );
    }  
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  