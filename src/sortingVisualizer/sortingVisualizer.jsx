import React, { useState, useEffect, useRef } from 'react';
import './sortingVisualizer.css';
import { getMergeSortAnimations } from '../algorithms/mergeSort';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

export default function SortingVisualizer(props){
    // Use hooks to add react-states to function components without creating new classes
    // Prototype:
    //      const [foo, bar] = useState(x)
    //      where foo is the current state and bar is the function that updates it
    //      argument x cooresponds to the initial state
    const [array, setArray] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    // Use ref to store array bars for animating
    const containerRef = useRef(null);

    // Exectued after each render (refresh page | new-array button)
    useEffect(initArray, []);

    function initArray(){
        if(isRunning) return;
        if(isSorted) resetArrayColor();
        setIsSorted(false);
        const arr = [];
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            // Starting from value 5 so bars will be visible
            arr.push(randomIntFromInterval(5, 150));
        }
        setArray(arr);
    }

    // ---------------------------- Animations ------------------------------

    function resetArrayColor(){
        const arrayBars = containerRef.current.children;
        for(let i = 0; i < array.length; i++){
            const arrayBarStyle = arrayBars[i].style;
            arrayBarStyle.backgroundColor = '';
        }
    }

    function animateSortedArray(){
        const arrayBars = containerRef.current.children;
        for(let i = 0; i < arrayBars.length; i++){
            const arrayBarStyle = arrayBars[i].style;
            setTimeout(
                () => (arrayBarStyle.backgroundColor = 'green'),
                i * ANIMATION_SPEED_MS,
            );
        }
        setTimeout(() => {
            setIsSorted(true);
            setIsRunning(false);
        }, arrayBars.length * ANIMATION_SPEED_MS
        );
    }

    function animateBar(index){
        const arrayBars = containerRef.current.children;
        const arrayBarStyle = arrayBars[index].style;
        setTimeout(() => {
            arrayBarStyle.backgroundColor = 'turquoise';
        }, ANIMATION_SPEED_MS);
        setTimeout(() => {
            arrayBarStyle.backgroundColor = '';
        }, 2 * ANIMATION_SPEED_MS)
    }

    function animateArray(animations){
        if(isRunning) return;
        setIsRunning(true);
        animations.forEach(([comparison, swapped], index) => {
            setTimeout(() => {
                if(!swapped){
                    if(comparison.length === 2){
                        const [i, j] = comparison;
                        animateBar(i);
                        animateBar(j);
                    } else{
                        const [i] = comparison;
                        animateBar(i);
                    }
                } else{
                    setArray((prevArr) =>{
                        const [k, newVal] = comparison;
                        const newArr = [...prevArr];
                        newArr[k] = newVal;
                        return newArr;
                    });
                }
            },  index * ANIMATION_SPEED_MS);
        });
        setTimeout(() => {
            animateSortedArray();
        }, animations.length * ANIMATION_SPEED_MS);
    }

    // From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // --------------- Sorting Functions -------------------------

    function mergeSort(){
        const animations = getMergeSortAnimations(array);
        animateArray(animations);
    }

    function quickSort(){

    }

    function bubbleSort(){

    }

    function insertionSort(){

    }

    function heapSort(){
        
    }

    // ----------------------------------------------------------------- //

    return (
        <div className="app-container">
            <div className="navbar">
                <button onClick={initArray}>New Array</button>
                <button onClick={mergeSort}>Merge Sort</button>
            </div>
            <div className = "array-container" ref={containerRef}>
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        style={{
                            // Value for height is half of the array value
                            height: `${value * 0.5 }vmin`,
                            // Width of one bar is 1% of all the bars' widths 
                            width: `${100 / NUMBER_OF_ARRAY_BARS}vw`,
                        }}
                        key={idx}
                    ></div>
                ))}            
            </div>
        </div>
    );
}