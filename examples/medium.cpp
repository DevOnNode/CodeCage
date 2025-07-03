#include <iostream>
#include <vector>
#include <algorithm>

void quicksort(std::vector<int>& arr, int left, int right) {
    int i = left, j = right;
    int pivot = arr[(left + right) / 2];
    while (i <= j) {
        while (arr[i] < pivot) i++;
        while (arr[j] > pivot) j--;
        if (i <= j) {
            std::swap(arr[i], arr[j]);
            i++; j--;
        }
    }
    if (left < j) quicksort(arr, left, j);
    if (i < right) quicksort(arr, i, right);
}

int main() {
    std::vector<int> arr = {3,6,8,10,1,2,1,5,7,9,4};
    std::cout << "Исходный массив: ";
    for (int x : arr) std::cout << x << ' ';
    std::cout << std::endl;
    quicksort(arr, 0, arr.size()-1);
    std::cout << "Отсортированный: ";
    for (int x : arr) std::cout << x << ' ';
    std::cout << std::endl;
    return 0;
} 