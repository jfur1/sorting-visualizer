export function getBubbleSortAnimations(arr){
    const copy = [...arr];
    const animations = [];
    bubbleSortHelper(copy, animations);
    return animations;
}

function bubbleSortHelper(arr, animations){
    const n = arr.length;
    var swapped;
    // Traverse the entire array
    for(let i = 0; i < n; i++){
        swapped = false;
        // Last i elements are already in place
        for(let j = 0; j < n-i-1; j++){
            // If an element is found that is greater than the element following, then swap
            if(arr[j] > arr[j+1]){
                animations.push([[j, arr[j+1]], true]);
                animations.push([[j+1, arr[j]], true]);
                swap(arr, j, j+1);
                swapped = true;
            }
        }
        // If no 2 elements were swapped in the inner loop, then break
        if(swapped === false) break;
    }
}

function swap(arr, index1, index2) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}