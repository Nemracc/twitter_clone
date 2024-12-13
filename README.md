# Primera Oportunidad

## Restricciones

- Basarse en el trabajo práctico entregado con NodeJS, Express, Nodemon, PostgreSql, AlpineJs para agregar a dicho trabajo:
- IMPORTANTE: El proyecto debe estar completo según las especificaciones del Trabajo Práctico y se debe construir sobre ese trabajo de cada integrante. Si hay elementos solicitados en el Trabajo Práctico no contemplados correctamente en este proyecto, restaran puntos sobre el total.
- Login real con token, usando localstorage - 7 puntos
- [ ] Modificar la tabla de usuarios para agregar un campo "contraseña"
- [ ] La contraseña debe guardarse encriptada en la base de datos. Utilizar una contraseña genérica igual para todos los usuarios. Agregar cuál es la contraseña en un archivo dentro de la carpeta "docs"
- [ ] Adjuntar el DER actualizado dentro de la carpeta "docs"
- [ ] Adjuntar el cargador actualizado .sql dentro de la carpeta "docs" para todos los datos iniciales
- [ ] Implementar una página de login ***distinta*** donde se ingrese usuario y contraseña. Debe mostrar mensaje de error en caso de login no exitoso.
- [ ] En caso de login exitoso guardar el token en el localstorage y redireccionar a la página correspondiente del listado de tweets.
- Proteger todas las rutas con login y actualizar para obtener el usuario desde el token - 6 puntos
- [ ] Todas las rutas deben protegerse (no poder accederse sin un token válido)
- [ ] Todas las rutas deben eliminar datos relacionado a usuario (el usuario se debe obtener desde el token)
- [ ] Actualizar la colección del Postman con este criterio y adjuntarlo en la carpeta "docs"
- Mostrar correctamente conteo de likes y retweets en la interfaz en forma reactiva usando Alpine.Js
- [ ] Se debe mostrar correctamente el **número** de likes y RTs de cada tweet (cantidad) usando Alpine en forma reactiva al darle like o RT a un tweet debe actualizar el color y el conteo.
- Logout eliminado token en BD y en local storage - 2 puntos
- [ ] El salir debe redireccionar a la página inicial de login
- [ ] Eliminar el token de la base de datos, si existe
- Botón refrescar tweets con spinner que indique carga - 2 puntos
- [ ] Al presionar refrescar, se deben eliminar todos los tweets de la página.
- [ ] Recargar los últimos 10 tweets creados en la base de datos.
- [ ] Debe mostrarse un spinner o indicador de carga 

