def quicksort(arr)
  return arr if arr.length <= 1
  pivot = arr[arr.length / 2]
  left = arr.select { |x| x < pivot }
  middle = arr.select { |x| x == pivot }
  right = arr.select { |x| x > pivot }
  quicksort(left) + middle + quicksort(right)
end

arr = [3,6,8,10,1,2,1,5,7,9,4]
puts "Исходный массив: #{arr.inspect}"
puts "Отсортированный: #{quicksort(arr).inspect}" 