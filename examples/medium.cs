using System;
using System.Linq;

class Program {
    static void QuickSort(int[] arr, int left, int right) {
        int i = left, j = right;
        int pivot = arr[(left + right) / 2];
        while (i <= j) {
            while (arr[i] < pivot) i++;
            while (arr[j] > pivot) j--;
            if (i <= j) {
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
                i++; j--;
            }
        }
        if (left < j) QuickSort(arr, left, j);
        if (i < right) QuickSort(arr, i, right);
    }
    static void Main() {
        int[] arr = {3,6,8,10,1,2,1,5,7,9,4};
        Console.WriteLine("Исходный массив: " + string.Join(" ", arr));
        QuickSort(arr, 0, arr.Length-1);
        Console.WriteLine("Отсортированный: " + string.Join(" ", arr));
    }
} 