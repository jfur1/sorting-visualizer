export function getBubbleSortAnimations(arr){
    const copy = [...arr];
    const animations = [];
    const n = arr.length;
    var swapped;
    // Traverse the entire array
    for(let i = 0; i < n; i++){
        swapped = false;
        // Last i elements are already in place
        for(let j = 0; j < n-i-1; j++){
            animations.push([[j, j + 1], false]);
            // If an element is found that is greater than the element following, then swap
            if(copy[j] > copy[j+1]){
                animations.push([[j, copy[j+1]], true]);
                animations.push([[j+1, copy[j]], true]);
                swap(copy, j, j+1);
                swapped = true;
            }
        }
        // If no 2 elements were swapped in the inner loop, then break
        if(swapped === false) break;
    }
    return animations;
}

function swap(arr, index1, index2) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}