<?php include_once __DIR__ . '/../templates/barra.php'; ?>

<div class="barra-servicios">
    <a href="/servicios" class="botonInv">Volver Atrás</a>
</div>

<h1 class="nombre-pagina">Nuevo Servicio</h1>
<p class="descripcion-pagina">Llena el siguiente formulario para crear un servicio</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<form action="/servicios/crear" class="formulario" method="POST">
<?php include_once __DIR__ . "/formulario.php";?>
<input type="submit" class="boton" value="Guardar">

</form>