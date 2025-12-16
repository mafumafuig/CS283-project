<?php
    include './databaseconnection.php';
    $name = $_POST['name'];
    $email = $_POST['email'];
    $msg = $_POST['message'];
    $sql = $connect->prepare('INSERT INTO contact_us (name, email, message) values (?, ?, ?)');
    $sql->bind_param("sss",$name,$email,$msg);
    $sql->execute();
?>