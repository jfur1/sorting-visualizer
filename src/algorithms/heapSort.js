var array_length;

export function getHeapSortAnimations(arr){
    const copy = [...arr];
    const animations = [];
    array_length = copy.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
        heap_root(input, i);
      }

    for (i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        array_length--;
      
      
        heap_root(input, 0);
    }
    return animations;
}

function heap_root(arr, root_index){
    var left = 2 * root_index + 1;
    var right = 2 * root_index + 2;
    var max = root_index;
    animations.push([right, copy[left], false]);
    animations.push([left, copy[right], false]);
    if (left < array_length && arr[left] > arr[max]) {
        max = left;
    }

    if (right < array_length && arr[right] > arr[max])     {
        max = right;
    }

    if (max != i) {
        animations.push([i, copy[max], true]);
        animations.push([max, copy[i], true]);
        swap(arr, i, max);
        heap_root(arr, max);
    }
}

function swap(arr, index1, index2) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}