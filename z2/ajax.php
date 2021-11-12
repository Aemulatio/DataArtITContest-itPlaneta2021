<?php

$file = $_FILES['file'];
$f = fopen($file['tmp_name'], 'r');
while (!feof($f)) {
    $line = fgets($f);
    $lineData = explode(",", $line);
    if (count($lineData) > 1) {
        $data[] = array_map('trim', $lineData);
    }
}

echo json_encode($data);
