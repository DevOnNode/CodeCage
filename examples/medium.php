<?php
function quicksort($arr) {
    if(count($arr) <= 1) return $arr;
    $pivot = $arr[floor(count($arr)/2)];
    $left = $middle = $right = array();
    foreach($arr as $x) {
        if($x < $pivot) $left[] = $x;
        elseif($x == $pivot) $middle[] = $x;
        else $right[] = $x;
    }
    return array_merge(quicksort($left), $middle, quicksort($right));
}

$arr = array(3,6,8,10,1,2,1,5,7,9,4);
echo "Исходный массив: ".implode(' ', $arr)."\n";
echo "Отсортированный: ".implode(' ', quicksort($arr))."\n"; 