<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Убедитесь, что PHPMailer установлен через Composer

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Определяем, какая форма отправлена
    $formType = isset($_POST['service']) ? 'main-form' : 'contact-form';

    // Получаем данные из формы
    $name = htmlspecialchars($_POST['name'] ?? '');
    $phone = htmlspecialchars($_POST['phone'] ?? '');
    $service = htmlspecialchars($_POST['service'] ?? 'N/A'); // Только для main-form

    // Проверяем обязательные поля
    if (empty($name) || empty($phone)) {
        http_response_code(400);
        echo "Name and phone are required.";
        exit;
    }

    // Инициализация PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Настройки SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';            // SMTP сервер
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@gmail.com'; // Ваш email
        $mail->Password = 'your-password';       // Пароль
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
        $mail->Port = 587;

        // От кого письмо
        $mail->setFrom('your-email@gmail.com', 'Website Form');

        // Кому письмо
        $mail->addAddress('avocodezp@tutanota.com', 'Admin');

        // Тема письма
        $mail->Subject = 'New Form Submission';

        // Содержимое письма
        if ($formType === 'contact-form') {
            $mail->Body = "
                <h1>Contact Form Submission</h1>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Phone:</strong> $phone</p>
            ";
        } elseif ($formType === 'main-form') {
            $mail->Body = "
                <h1>Main Form Submission</h1>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Phone:</strong> $phone</p>
                <p><strong>Service:</strong> $service</p>
            ";
        }

        $mail->isHTML(true);

        // Отправляем письмо
        $mail->send();
        echo 'Message has been sent successfully';
    } catch (Exception $e) {
        http_response_code(500);
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
