import java.util.Arrays;

public class medium_java {
    public static void quicksort(int[] arr, int left, int right) {
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
        if (left < j) quicksort(arr, left, j);
        if (i < right) quicksort(arr, i, right);
    }
    public static void main(String[] args) {
        int[] arr = {3,6,8,10,1,2,1,5,7,9,4};
        System.out.println("Исходный массив: " + Arrays.toString(arr));
        quicksort(arr, 0, arr.length-1);
        System.out.println("Отсортированный: " + Arrays.toString(arr));
    }
} 