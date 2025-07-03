using System;

class Program {
    static int Knapsack(int[] weights, int[] values, int capacity) {
        int n = weights.Length;
        int[,] dp = new int[n+1, capacity+1];
        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= capacity; w++) {
                if (weights[i-1] <= w)
                    dp[i,w] = Math.Max(dp[i-1,w], dp[i-1,w-weights[i-1]] + values[i-1]);
                else
                    dp[i,w] = dp[i-1,w];
            }
        }
        return dp[n,capacity];
    }
    static void Main() {
        int[] weights = {2, 3, 4, 5};
        int[] values = {3, 4, 5, 6};
        int capacity = 5;
        Console.WriteLine("Максимальная ценность: " + Knapsack(weights, values, capacity));
    }
} 