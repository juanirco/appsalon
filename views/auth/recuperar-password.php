<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">Escribe tu nuevo passowrd</p>

<?php include_once __DIR__ . "/../templates/alertas.php"; ?>

<?php if($error) return; ?>
<form class="formulario" method="POST">
        <div class="campo">
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" placeholder="Tu Nuevo Password">
        </div>

        <input type="submit" value="Actualizar Password" class="boton">
</form>

<div class="acciones">
        <a href="/">Recordaste tu password? Inicia sesión</a>
        <a href="/crear-cuenta">Crear nueva cuenta</a>
</div>