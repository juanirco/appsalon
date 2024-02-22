<h1 class="nombre-pagina">Olvidé Password</h1>
<p class="descripcion-pagina">Para restablecer tu password escribiendo tu email a continuación</p>

<?php include_once __DIR__ . '/../templates/alertas.php'; ?>

<form action="/olvide" class="formulario" method="POST">

    <div class="campo">
        <label for="email">E-mail:</label>
        <input type="email" name="email" id="email" placeholder="Tu E-mail">
    </div>

    <input type="submit" value="Enviar instrucciones" class="boton">
</form>

<div class="acciones">
        <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crear una cuenta</a>
        <a href="/">¡Recordé mi password! Volver atrás</a>
</div>