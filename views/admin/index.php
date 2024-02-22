<?php include_once __DIR__ . '/../templates/barra.php'; ?>

<?php if (isset($_SESSION['admin'])) { ?>
    <div class="barra-servicios">
        <a href="/servicios" class="botonInv">Ver Servicios</a>
    </div>
<?php }?>

<h1 class="nombre-pagina">Panel de administración</h1>
<p class="descripcion-pagina">Buscar Citas</p>

<div class="busqueda">
    <form class="formulario">
        <div class="campo">
            <label for="fecha">Fecha</label>
            <input type="date" id="fecha" name="fecha" value="<?php echo $fecha;?>">
        </div>
    </form>
</div>

<?php 
    if (count($citas) === 0) {
        echo "<br>
        <h4>No hay citas en esta fecha aún</h4>";
    }
?>

<div id="citas-admin">
    <ul class="citas">
        <?php
            $idCita = '';
            foreach ($citas as $key => $cita) {
                if ($idCita !== $cita->id) {
                    $total = 0;
        ?>
        <li>
            <h3>Info Cita:</h3>
            <p>ID Cita: <span><?php echo $cita->id;?></span></p>
            <p>Hora: <span><?php echo $cita->hora;?></span></p>
            <p>Cliente: <span><?php echo $cita->cliente;?></span></p>
            <p>Email: <span><?php echo $cita->email;?></span></p>
            <p>Telefono: <span><?php echo $cita->telefono;?></span></p>
            <h3>Servicios:</h3>
            <?php 
                $idCita = $cita->id;
            } // Fin de If
            
            $total += $cita->precio;
            ?>
            <p class="servicio"><?php echo $cita->servicio;?><span> – $<?php echo $cita->precio;?></span></p>
            <?php
                $actual = $cita->id;
                $proximo = $citas[$key + 1]->id ?? 0;
                
                if (esUltimo($actual, $proximo)) {?>
                    <p class="total"> Total: <span>$<?php echo $total; ?></span></p>

                    <form action="/api/eliminar" method="POST">
                        <input type="hidden" name="id" value="<?php echo $cita->id;?>">
                        <input type="submit" class="boton-eliminar" value="Eliminar">
                    </form>
                <?php }
            } // Fin de Foreach?>
        </li>
    </ul>
</div>

<?php $script = "<script src ='build/js/buscador.js'></script>"?>