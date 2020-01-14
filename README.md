Cartografía histórica
===================

Visualizador de la cartografía histórica del Instituto Geográfico Nacional

Esta aplicación te permite publicar **Mapas Historicos** o cualquier imagen digitalizada como si fuera un mapa, agiliza la visualización descargando pequeñas partes de la imagen en lugar de descargar una sola demasiado pesada. Solamente necesitás escanear la imagen y generar la estructura de teselas con el programa QGIS.

Preparar la imagen
-------------
Estos son los pasos para preparar la imagen a convertir en mapa.

>  **Note:**
> - QGIS y sus complementos solo se deben descargar una vez.

#### Descarga **QGIS**
https://www.qgis.org/es/site/forusers/download.html

#### Instalar el complemento para georeferenciar imágenes
Dentro de QGIS, instalar el complemento "Freehand raster georeferencer" ingresando al menú "Complementos" y luego en la opción "Administrar e instalar complementos".
https://plugins.qgis.org/plugins/FreehandRasterGeoreferencer/

#### Instalar el complemento para crear teselas
Si bien las últimas versiones de QGIS cuentan con una herramienta propia para generar teselas a partir de una imagen (dividirla en partes menores para cada nivel de zoom/escala), existe el complement QTiles que de forma sencilla permite definir el conjunto de teselas y generarlas.
https://plugins.qgis.org/plugins/qtiles/

#### Escanear la imagen
Usar la herramienta de escaneo preferida

#### Georeferenciar la imagen
En QGIS agregar la imagen desde el complemento y ajustarla con la ayuda de un mapa base de referencia si es que no se cuenta con la ubicación precisa que corresponde a la imagen.  

#### Crear las teselas
Generar las teselas desde el menú de QGIS, normalmente alcanza con generar teselas hasta 5 niveles de zoom, dependiendo de la resolución de la imagen escaneada

----------

Usar el visualizador
-------------------

 1. Clonar este repositorio o descargarlo como comprimido
 2. Ubicar el repositorio mapasHistoricos dentro del directorio raíz del servidor web y el de las teselas generadas, en el mismo lugar con el nombre "teselas".
 3. Copiar el archivo dentro del directorio sample-data a data (si no existe ese directorio debe ser creado) y editar el archivo con la información correspondiente a las imágenes escaneadas y teseladas.
