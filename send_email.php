<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $formType = isset($_POST['service']) ? 'main-form' : 'contact-form';
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $service = isset($_POST['service']) ? htmlspecialchars($_POST['service']) : '';

    // Указываем email получателя
    $to = "avocodezp@tutanota.com";
    $subject = $formType == 'main-form' ? "New Request: Main Form" : "New Request: Contact Form";

    // Составляем тело письма
    $message = "You have received a new form submission:\n\n";
    $message .= "Form Type: " . ($formType == 'main-form' ? "Main Form" : "Contact Form") . "\n";
    $message .= "Name: $name\n";
    $message .= "Phone: $phone\n";
    if ($formType == 'main-form') {
        $message .= "Service: $service\n";
    }
    
    // Заголовки для отправки
    $headers = "From: clean-room.uk\r\n";
    $headers .= "Reply-To: $phone\r\n";

    // Отправляем письмо
    if (mail($to, $subject, $message, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }
} else {
    echo "Invalid request.";
}
?>
