
<?php include_once __DIR__ . '/../templates/barra.php'; ?>

<?php if (isset($_SESSION['admin'])) { ?>
    <div class="barra-servicios">
        <a href="/admin" class="botonInv">Ver Citas</a>
    </div>
<?php }?>
<h1 class="nombre-pagina">Administracion De Servicios</h1>
<p class="descripcion-pagina">Crea, edita o elimina los servicios</p>


<a href="/servicios/crear" class="boton">Nuevo Servicio</a>
    
<ul class="servicios">
    <?php foreach($servicios as $servicio) { ?>
        <li>
            <div class="parrafosServ">
                <p>Nombre: <span><?php echo $servicio->nombre; ?></span> </p>
                <p>Precio: <span>$<?php echo $servicio->precio; ?></span> </p>
            </div>
            <div class="acciones">
                <a class="boton-actualizar" href="/servicios/actualizar?id=<?php echo $servicio->id; ?>">Actualizar</a>

                <form action="/servicios/eliminar" method="POST">
                    <input type="hidden" name="id" value="<?php echo $servicio->id; ?>">
                    <input type="submit" value="Borrar" class="boton-eliminar">
                </form>
            </div>
        </li>
    <?php } ?>
</ul>
