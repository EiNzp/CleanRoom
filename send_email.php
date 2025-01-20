<?php
// Проверяем метод запроса
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Читаем JSON из тела запроса
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        http_response_code(400);
        echo "Invalid JSON.";
        exit;
    }

    // Извлекаем данные
    $name = htmlspecialchars($data['name'] ?? '');
    $phone = htmlspecialchars($data['phone'] ?? '');
    $service = htmlspecialchars($data['service'] ?? 'N/A');

    // Проверка обязательных полей
    if (empty($name) || empty($phone)) {
        http_response_code(400);
        echo "Name and phone are required.";
        exit;
    }

    // Формируем email
    $to = "avocodezp@tutanota.com";
    $subject = "New Form Submission";
    $message = "You received a new form submission:\n\n";
    $message .= "Name: $name\n";
    $message .= "Phone: $phone\n";
    $message .= "Service: $service\n";

    $headers = "From: no-reply@example.com\r\n";

    // Отправляем email
    if (mail($to, $subject, $message, $headers)) {
        echo "Form submitted successfully.";
    } else {
        http_response_code(500);
        echo "Failed to send email.";
    }
} else {
    http_response_code(405);
    echo "Method not allowed.";
}
?>
