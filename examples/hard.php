<?php
function knapsack($weights, $values, $capacity) {
    $n = count($weights);
    $dp = array_fill(0, $n+1, array_fill(0, $capacity+1, 0));
    for($i=1; $i<=$n; $i++) {
        for($w=0; $w<=$capacity; $w++) {
            if($weights[$i-1] <= $w)
                $dp[$i][$w] = max($dp[$i-1][$w], $dp[$i-1][$w-$weights[$i-1]] + $values[$i-1]);
            else
                $dp[$i][$w] = $dp[$i-1][$w];
        }
    }
    return $dp[$n][$capacity];
}

$weights = array(2, 3, 4, 5);
$values = array(3, 4, 5, 6);
$capacity = 5;
echo "Максимальная ценность: ".knapsack($weights, $values, $capacity)."\n"; 