import React, { useState, useEffect, useRef } from 'react';
import './sortingVisualizer.css';
import { getMergeSortAnimations } from '../algorithms/mergeSort';
import { getQuickSortAnimations } from '../algorithms/quickSort';
import { getInsertionSortAnimations } from '../algorithms/insertionSort';
import { getBubbleSortAnimations } from '../algorithms/bubbleSort';
import { getHeapSortAnimations } from '../algorithms/heapSort';

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
    const [animationSpeed, setAnimationSpeed] = useState(3);
    // Use ref to store array bars for animating
    const containerRef = useRef(null);

    // Exectued after each render (refresh page | new-array button)
    useEffect(initArray, []);

    function initArray(){
        if(isRunning) return;
        if(isSorted) resetArrayColor();
        updateAlgoDescription("Start");
        setIsSorted(false);
        const arr = [];
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            // Starting from value 5 so bars will be visible
            arr.push(randomIntFromInterval(5, 125));
        }
        setArray(arr);
    }

    function toggleDropdown(){
        if(isRunning) return;
        document.getElementById("myDropdown").classList.toggle("show");
    }

    function toggleSpeed(speed){
        if(isRunning) return;
        toggleDropdown();
        setAnimationSpeed(speed);
        document.getElementById("animation-speed").innerHTML = `Animation Speed: \n${speed}`;
        if(speed === "Slow"){
            setAnimationSpeed(5);
          } else if(speed === "Medium"){
            setAnimationSpeed(3);
          } else{
            setAnimationSpeed(1.5);
          }
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
                () => (arrayBarStyle.backgroundColor = 'LimeGreen'),
                i * animationSpeed,
            );
        }
        setTimeout(() => {
            setIsSorted(true);
            setIsRunning(false);
        }, arrayBars.length * animationSpeed
        );
    }

    function animateBar(index){
        const arrayBars = containerRef.current.children;
        const arrayBarStyle = arrayBars[index].style;
        setTimeout(() => {
            arrayBarStyle.backgroundColor = 'OrangeRed';
        }, animationSpeed);
        setTimeout(() => {
            arrayBarStyle.backgroundColor = '';
        }, 2 * animationSpeed)
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
            },  index * animationSpeed);
        });
        setTimeout(() => {
            animateSortedArray();
        }, animations.length * animationSpeed);
    }

    // From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function updateAlgoDescription(algo){
        if(isRunning) return;
        if(algo === "mergeSort"){
            document.getElementById('algoDescription').innerHTML = `Merge Sort is a <i><b>divide and conquer</b></i> algorithm and <i><b>does guarantee</b></i> stablity!`;
          }
          else if(algo === "quickSort"){
            document.getElementById('algoDescription').innerHTML = `Quick Sort is a <i><b>divide and conquer</b></i> algorithm and is performed <i><b>in place</b></i>!`;
          }
          else if(algo === "bubbleSort"){
            document.getElementById('algoDescription').innerHTML = `Bubble Sort the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order!`;
          }
          else if(algo === "heapSort"){
            document.getElementById('algoDescription').innerHTML = `Heap Sort is a <i><b> comparison-based</b></i> sorting algorithm based on the <i><b> binary heap </b></i> data structure!`;
          } else if(algo === "insertionSort"){
            document.getElementById('algoDescription').innerHTML = `Insertion Sort is an <i><b>in place </b></i> algorithm and <i><b>does guarantee </b></i> stability!`;
          }   else{
            document.getElementById('algoDescription').innerHTML = "Select a sorting algorithm to visualize!";
          }
    }

    // --------------- Sorting Functions -------------------------

    function mergeSort(){
        updateAlgoDescription("mergeSort");
        const animations = getMergeSortAnimations(array);
        animateArray(animations);
    }

    function quickSort(){
        updateAlgoDescription("quickSort");
        const animations = getQuickSortAnimations(array);
        animateArray(animations);
    }

    function bubbleSort(){
        updateAlgoDescription("bubbleSort");
        const animations = getBubbleSortAnimations(array);
        animateArray(animations);  
    }

    function insertionSort(){
        updateAlgoDescription("insertionSort");
        const animations = getInsertionSortAnimations(array);
        animateArray(animations);  
    }

    function heapSort(){
        updateAlgoDescription("heapSort");
        const animations = getHeapSortAnimations(array);
        animateArray(animations);   
    }

    // ----------------------------------------------------------------- //

    return (
        <div className="app-container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <a className="navbar-brand" href="https://jfur1.github.io/sorting-visualizer">
                    <b>Sorting Visualizer</b>
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="http://www.github.com/jfur1/sorting-visualizer">
                                {' '}
                                Sorting Visualizer code{' '}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/jfur1">
                                Check Out Other Cool Projects
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div id="programButtons">
                <button
                    type="button"
                    className="btn btn-danger mr-1"
                    onClick={initArray}>
                    New Array
                </button>
                <button
                    type="button"
                    className="btn btn-primary mr-1"
                    onClick={mergeSort}>
                    Merge Sort
                </button>
                <button
                    type="button"
                    className="btn btn-primary mr-1"
                    onClick={quickSort}>
                    Quick Sort
                </button>
                <button
                    type="button"
                    className="btn btn-primary mr-1"
                    onClick={bubbleSort}>
                    Bubble Sort
                </button>
                <button
                    type="button"
                    className="btn btn-primary mr-1"
                    onClick={heapSort}>
                    Heap Sort
                </button>
                <button
                    type="button"
                    className="btn btn-primary mr-1"
                    onClick={insertionSort}>
                    Insertion Sort
                </button>
                <div class="dropdown">
                    <button id="animation-speed" onClick={() => toggleDropdown()} class="dropbtn">Animation Speed: Medium</button>
                    <div id="myDropdown" class="dropdown-content">
                        <a href="#" id="animate-slow" onClick={() => toggleSpeed("Slow")}>Slow</a>
                        <a href="#" id="animate-medium" onClick={() => toggleSpeed("Medium")}>Medium</a>
                        <a href="#" id="animate-fast" onClick={() => toggleSpeed("Fast")}>Fast</a>
                </div>
            </div>
        </div>
          <div id="algoDescription"></div>
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

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }