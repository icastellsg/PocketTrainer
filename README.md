# PocketTrainer

PocketTrainer es una aplicación web que utiliza PokeApi para permitir a los usuarios explorar la Pokedex, filtrar por generaciones, ver los detalles de un Pokemon específico, capturar y liberar Pokemons, y crear sus propios equipos Pokemon.

## Tecnologías utilizadas:

1. Angular: FrontEnd de la aplicación. Personalizada también con componentes de Angular Material.
2. Spring: BackEnd de la aplicación. Encargado de comunicar el front con la base de datos.
3. PostgreSQL: Base de datos de la aplicación.
4. Docker y Docker Compose: Emmpaquetado y ejecución de la aplicación en contenedores.
5. GitHub pages: Despliegue del Frontend de la aplicación dentro de la nube.
6. Microsoft Azure: Despliegue del Backend de la aplicación dentro de la nube.
7. Swagger: Documentación de endpoints del backend

## Proyecto en la nube

Para acceder a la aplicación en la nube no necesitas realizar ninguna instalación. 

Accede a la web desde la página desplegada en GitHub pages o pulsa en el siguiente enlace: https://icastellsg.github.io/PocketTrainer.
Puedes conocer más sobre los endpoints accediendo a su documentación en https://pockettrainer-back.azurewebsites.net/api/swagger-ui/index.html

## Proyecto en local

Si quieres acceder a la aplicación de forma local necesitarás tener instalado Docker Sigue los siguientes pasos para poder utilizar el proyecto de forma local:

1. Clona este repositorio en tu máquina local.
2. Navega a la carpeta del proyecto en tu terminal.
3. Ejecuta el comando `docker-compose up --build -d`.
4. Para acceder a la página web accede enlace http://localhost:4200/
5. Para acceder a la documentación del backend accede al enlace http://localhost:8081/api/swagger-ui/index.html

## Uso de la aplicación

Dentro de la aplicación podrás:

- Ver la lista de Pokemons en la Pokedex.
- Filtrar Pokemons por generaciones.
- Ver detalles de un Pokemon específico, incluyendo su descripción, tipo(s), peso y altura.
- Capturar y liberar Pokemons y agregarlos a tu equipo.
- Crear tus propios equipos Pokemon y asignar a los Pokemons habilidades y movimientos.

## Modelo de datos

Toda la información sobre los datos utilizados por PokeApi se pueden encontrar en el siguiente enlace: https://pokeapi.co/docs/v2

Las entidades que se almacenan en el backend es el siguiente:

![image](https://github.com/icastellsg/PocketTrainer/assets/72543054/b68a0b8b-e0ab-45be-85bd-8bdae5de6a02)

## Conclusiones

PocketTrainer es un proyecto emocionante que utiliza Angular, Spring y Docker Compose para proporcionar una aplicación web interactiva. Esperamos que disfrutes explorando los Pokemons, capturándolos y creando tus propios equipos. ¡Diviértete!
