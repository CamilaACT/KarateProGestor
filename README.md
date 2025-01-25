# InterfazWeb

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 18.2.6.

## Tabla de Contenidos

1. [Servidor de desarrollo](#servidor-de-desarrollo)
2. [Generación de componentes](#generación-de-componentes)
3. [Compilación](#compilación)
4. [Pruebas unitarias](#pruebas-unitarias)
5. [Pruebas end-to-end](#pruebas-end-to-end)
6. [Autenticación y JWT](#autenticación-y-jwt)
   - [Guard de autenticación](#guard-de-autenticación)
   - [Interceptor de autenticación](#interceptor-de-autenticación)



## Servidor de desarrollo

Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias cualquiera de los archivos fuente.

## Generación de componentes

Ejecuta `ng generate component nombre-componente` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Compilación

Ejecuta `ng build` para compilar el proyecto. Los artefactos de compilación se almacenarán en el directorio `dist/`.

## Pruebas unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

## Pruebas end-to-end

Ejecuta `ng e2e` para ejecutar las pruebas end-to-end mediante la plataforma de tu elección. Para usar este comando, primero necesitas añadir un paquete que implemente capacidades de pruebas end-to-end.

## Autenticación y JWT

Este proyecto está enfocado en el manejo de autenticación mediante JWT en el componente de inicio de sesión.

### Guard de Autenticación

El guard de autenticación `authGuard` se asegura de que solo los usuarios con un token JWT válido puedan acceder a ciertas rutas. Si el token es inválido o no existe, redirige a la página de inicio de sesión.

### Interceptor de Autenticación
El authInterceptor intercepta las solicitudes HTTP y añade el token JWT en las cabeceras de las peticiones. Si el token no está presente, las solicitudes a las rutas protegidas no se enviarán.
