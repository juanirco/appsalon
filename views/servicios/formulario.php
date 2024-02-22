<div class="campo">
        <label for="nombreServicio">Nombre del servicio:</label>
        <input 
            type="text" 
            name="nombre" 
            id="nombreServicio" 
            placeholder="Nombre Servicio" 
            value="<?php echo $servicio->nombre; ?>"
            />
    </div>

    <div class="campo">
        <label for="precioServicio">Precio:</label>
        <input type="number" name="precio" id="precioServicio" placeholder="Precio Servicio" value="<?php echo $servicio->precio; ?>">
    </div>