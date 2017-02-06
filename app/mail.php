<?php

$recepient = "anatoliykirzo@gmail.com";
$sitename  = "navinweb.net";
$subject   = "Новая заявка с сайта \"$sitename\"";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$text = trim($_POST["text"]);

if($name !== '' && $email !== '' && $text !== ''){

	$message = "
	Имя: $name
	Email: $email
	";

	$message .= "Сообщение: $text";

	$headers = 'From: <anatoliykirzo@navinweb.net>' . "\r\n";
	$headers .='Reply-To: <'.$email.'>';

	$result = mail($recepient, $subject, $message, $headers);

}else{
	$result = 0;
}

echo $result;

?>