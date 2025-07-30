<?php
	date_default_timezone_set('Asia/Ho_Chi_Minh');
    $Gio = (int)date('H', time());
    $Phut = (int)date('i', time());
    $Giay = (int)date('s', time());
    
    $Gio1 = (int)$Gio<10? '0'.(int)$Gio : $Gio;
    $Phut1 = (int)$Phut<10 ? '0'.(int)$Phut : $Phut;
    $Giay1 = (int)$Giay<10 ? '0'.(int)$Giay : $Giay;
    
    $TimeText = $Gio1 . ':' . $Phut1;
    echo $TimeText;
?>