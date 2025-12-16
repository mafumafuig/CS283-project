<?php

$connect = new mysqli("localhost", "root", "", "bookstore");

if ($connect->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed."]);
    exit;
}
?>