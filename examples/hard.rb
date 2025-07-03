def knapsack(weights, values, capacity)
  n = weights.length
  dp = Array.new(n+1) { Array.new(capacity+1, 0) }
  (1..n).each do |i|
    (0..capacity).each do |w|
      if weights[i-1] <= w
        dp[i][w] = [dp[i-1][w], dp[i-1][w-weights[i-1]] + values[i-1]].max
      else
        dp[i][w] = dp[i-1][w]
      end
    end
  end
  dp[n][capacity]
end

weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 5
puts "Максимальная ценность: #{knapsack(weights, values, capacity)}" 