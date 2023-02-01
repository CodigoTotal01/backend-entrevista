# backend-entrevista

## Para ejecutar el programa del backend
* En la terminal : ejecutar node index.js o nodemon index.js (no es necesario la extensión .js)

# Nota
* Despues de ejecutarlo, ejecutar luego el programa del frontend → https://github.com/CodigoTotal01/entrevista-front
* Este readme contendrá solo información acorde al backend, para las referentes a angular dirigirse al enlace anterior.
## Decisiones técnicas
* El programa está basado en el stack MEAN (Mongo, Express, Angular y Node);
* La base de datos está en la nube (MongoAtlas) y se empleó mongoose ODM para la comunicación de la base de datos con Node y ejecución de querys mas rapidas y faciles.
* Las imágenes se subieron directamente al servidor, no me dio tiempo para emplear cloudinary (servicio para subir fotos en la nube) ya que esto  haría que fuera más rápida la aplicación.
* Se realizó un sistema de router y controllers por separado para tener mayor facilidad al encontrar algún error y encargados de brindar todas las funciones requeridas
(login, registro, actualizaciones de datos, crear usuarios, personajes, tokens entre otros más).
* Se empleó JWT para generar tokens solo para los usuarios registrados, esto permite emplear por la parte del frontend manejar el tema de las restricciones de las páginas.
* Middlewares pra la intercepción de información en el cuerpo de los requisitos. 
* Métodos helper para facilitar la creación de los jwt y subir las imágenes.
* Modelos acordes a los requerimientos acordados.

# Problemas durante el desarrollo
* El API de breaking bad no funcionaba, por ello me retrase con el inicio del proyecto. Luego se me brindo otra api que si funcionaba e inicie con todo el proyecto.
