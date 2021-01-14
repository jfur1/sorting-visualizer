var array_length;

export function getHeapSortAnimations(arr){
    const copy = [...arr];
    const animations = [];
    array_length = copy.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
        heap_root(copy, i, animations);
      }

    for (i = copy.length - 1; i > 0; i--) {
        animations.push([[0, copy[i]], true]);
        animations.push([[i, copy[0]], true]);
        swap(copy, 0, i);
        array_length--;
      
      
        heap_root(copy, 0, animations);
    }
    return animations;
}

function heap_root(arr, root_index, animations){
    var left = 2 * root_index + 1;
    var right = 2 * root_index + 2;
    var max = root_index;

    if (left < array_length && arr[left] > arr[max]) {
        max = left;
    }

    if (right < array_length && arr[right] > arr[max])     {
        max = right;
    }

    if (max !== root_index) {
        animations.push([[root_index, arr[max]], true]);
        animations.push([[max, arr[root_index]], true]);
        swap(arr, root_index, max);
        heap_root(arr, max, animations);
    }
}

function swap(arr, index1, index2) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}