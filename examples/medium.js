function quicksort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter((x) => x < pivot);
  const middle = arr.filter((x) => x === pivot);
  const right = arr.filter((x) => x > pivot);
  return [...quicksort(left), ...middle, ...quicksort(right)];
}

const arr = [3, 6, 8, 10, 1, 2, 1, 5, 7, 9, 4];
console.log('Исходный массив:', arr);
console.log('Отсортированный:', quicksort(arr));
