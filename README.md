# Zara Web Challenge - Marvel

Este proyecto es una aplicación web desarrollada para la vacante de Inditex, centrada en el universo Marvel.

## Cómo ejecutar la aplicación

Para ejecutar esta aplicación, sigue estos pasos:

1. Clona el repositorio en tu pc.
2. Navega hasta el directorio del proyecto.
3. Ejecuta `npm install` para instalar todas las dependencias/librerias necesarias.
4. Una vez que todas las dependencias estén instaladas, ejecuta `npm start` para iniciar la aplicación.
5. Abre tu navegador y visita `http://localhost:3000` para ver la aplicación en acción.

## Arquitectura y estructura

La aplicación sigue una arquitectura de diseño modular, con cada componente de la aplicación encapsulado en su propio módulo. Esto permite una mayor flexibilidad y escalabilidad, ya que cada módulo puede ser desarrollado, probado y actualizado de forma independiente.

La estructura del proyecto es la siguiente:

- `src/`: Este directorio contiene todo el código fuente de la aplicación.
  - `components/`: Este directorio contiene todos los componentes de React utilizados en la aplicación.
  - `services/`: Este directorio contiene todos los servicios utilizados para interactuar con las APIs externas.
  - `styles/`: Este directorio contiene todos los archivos de estilos SCSS de todos los componentes.
  - `test/`: Este directorio contiene todos los archivos de pruebas de los componentes.
  - `App.js`: Este es el componente principal de la aplicación.

## Información relevante

**Nota:**
El buscador de personajes de Marvel se filtra sin API, ya que no he encontrado una forma de filtrar los resultados de la API de Marvel. Por lo tanto, los resultados se filtran en el lado del cliente. (https://developer.marvel.com/docs#!/public)

Esta aplicación utiliza la API de Marvel para obtener y mostrar información sobre los personajes de Marvel. Para utilizar esta API, necesitarás obtener una clave API de Marvel.

La aplicación está actualmente alojada en https://zara-challenge-marvel.aleburgos.es/.
