<?php 

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email {
    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token) {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion() {
        // Crear el objeto de email
        $email = new PHPMailer();
        $email->isSMTP();
        $email->Host = $_ENV['MAIL_HOST'];
        $email->SMTPAuth = true;
        $email->Port = $_ENV['MAIL_PORT'];
        $email->Username = $_ENV['MAIL_USER'];
        $email->Password = $_ENV['MAIL_PASS'];

        $email->setFrom('cuentas@appsalon.com');
        $email->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $email->Subject = 'Confirma tu cuenta';

        $email->isHTML(TRUE);
        $email->CharSet = 'UTF-8';

        $contenido = '<html>';
        $contenido = "<p><strong>Hola " . $this->nombre . "</strong>, has creado tu cuenta en App Salon, solo debes confirmarla presionando el siguiente enlace</p>";
        $contenido .= "<p>Presiona aquí: <a href='" . $_ENV['APP_URL'] . "/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a> </p>";
        $contenido .= "<p> Si tu no solicitaste esta cuenta, puedes ignorar el mensaje";
        $contenido .= '</html>';
        $email->Body = $contenido;


        // Enviar el mail
        $email->Send();
    }

    public function enviarInstrucciones() {
        // Crear el objeto de email
        $email = new PHPMailer();
        $email->isSMTP();
        $email->Host = $_ENV['MAIL_HOST'];
        $email->SMTPAuth = true;
        $email->Port = $_ENV['MAIL_PORT'];
        $email->Username = $_ENV['MAIL_USER'];
        $email->Password = $_ENV['MAIL_PASS'];

        $email->setFrom('cuentas@appsalon.com');
        $email->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $email->Subject = 'Reestablece tu password';

        $email->isHTML(TRUE);
        $email->CharSet = 'UTF-8';

        $contenido = '<html>';
        $contenido = "<p><strong>Hola " . $this->nombre . "</strong>, has solicitado reestablecer tu password, sigue el siguiente enlace para  hacerlo</p>";
        $contenido .= "<p>Presiona aquí: <a href='" . $_ENV['APP_URL'] . "/recuperar?token=" . $this->token . "'>Reestablecer Password</a> </p>";
        $contenido .= "<p> Si tu no solicitaste esta cuenta, puedes ignorar el mensaje";
        $contenido .= '</html>';
        $email->Body = $contenido;


        // Enviar el mail
        $email->Send();
    }
}
