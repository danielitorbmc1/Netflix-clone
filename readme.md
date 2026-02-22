# 🎬 StreamVerse - Netflix Clone (Vanilla JS)

Una Single Page Application (SPA) de alto rendimiento que replica la experiencia de usuario de Netflix, consumiendo datos en tiempo real de la API de TMDB.

## 🚀 Tecnologías Utilizadas
- **HTML5 Semántico**: Estructura sólida y accesible.
- **CSS3 Moderno**: Grid Layout, Flexbox y animaciones de transformación (escala y transiciones suaves).
- **JavaScript Vanilla (ES6+)**: Manipulación del DOM, programación asíncrona (Async/Await) y Fetch API.
- **TMDB API**: Fuente de datos para películas, series, trailers y reparto.

## 🛠️ Cómo ejecutar el proyecto
1. Clona este repositorio: `git clone https://github.com/tu-usuario/nombre-repo.git`
2. Abre el archivo `index.html` en tu navegador o usa la extensión **Live Server** en VS Code.
3. ¡Listo! No requiere dependencias externas ni compiladores.

## 📡 Uso de la API TMDB
El proyecto utiliza los siguientes endpoints clave:
- `/movie/popular`: Para el Hero section y carruseles iniciales.
- `/search/multi`: Implementación del buscador en tiempo real.
- `/movie/{id}?append_to_response=videos,credits`: Para obtener detalles, trailers de YouTube y el reparto en una sola petición.

## ✍️ Personalización Propia
A diferencia de un clon estándar, este proyecto incluye:
- **Filtro de búsqueda inteligente**: Detecta "Enter" y limpia resultados previos.
- **Sistema de Modal Dinámico**: Ajusta el contenido (Video vs Imagen) según la disponibilidad en la API.
- **Efecto Glassmorphism**: En la barra de navegación al hacer scroll.