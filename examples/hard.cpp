#include <iostream>
#include <vector>
#include <algorithm>

int knapsack(const std::vector<int>& weights, const std::vector<int>& values, int capacity) {
    int n = weights.size();
    std::vector<std::vector<int>> dp(n+1, std::vector<int>(capacity+1, 0));
    for (int i = 1; i <= n; ++i) {
        for (int w = 0; w <= capacity; ++w) {
            if (weights[i-1] <= w)
                dp[i][w] = std::max(dp[i-1][w], dp[i-1][w-weights[i-1]] + values[i-1]);
            else
                dp[i][w] = dp[i-1][w];
        }
    }
    return dp[n][capacity];
}

int main() {
    std::vector<int> weights = {2, 3, 4, 5};
    std::vector<int> values = {3, 4, 5, 6};
    int capacity = 5;
    std::cout << "Максимальная ценность: " << knapsack(weights, values, capacity) << std::endl;
    return 0;
} 