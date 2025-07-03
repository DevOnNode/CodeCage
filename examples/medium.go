package main

import (
	"fmt"
)

func quicksort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}
	pivot := arr[len(arr)/2]
	left := []int{}
	middle := []int{}
	right := []int{}
	for _, x := range arr {
		if x < pivot {
			left = append(left, x)
		} else if x == pivot {
			middle = append(middle, x)
		} else {
			right = append(right, x)
		}
	}
	left = quicksort(left)
	right = quicksort(right)
	return append(append(left, middle...), right...)
}

func main() {
	arr := []int{3,6,8,10,1,2,1,5,7,9,4}
	fmt.Println("Исходный массив:", arr)
	fmt.Println("Отсортированный:", quicksort(arr))
} 