# plotgame — código exportado

Juego web independiente en HTML, CSS y JavaScript. No necesita instalar paquetes ni compilar.
Esta copia corresponde a la primera versión publicada (12 desafíos y sandbox).

## Ejecutarlo en Windows

1. Extraé este ZIP.
2. Abrí una terminal en la carpeta plotgame.
3. Con Python instalado, ejecutá:

   py -m http.server 8000 --directory dist

4. Abrí http://localhost:8000 en tu navegador.

En macOS/Linux podés usar python3 en lugar de py. No abras index.html con doble clic: los módulos de JavaScript requieren un servidor HTTP.

## Subirlo a un repositorio propio

Creá un repositorio vacío en tu cuenta de GitHub. Desde esta carpeta, con Git instalado:

    git init
    git add .
    git commit -m "Primera versión de plotgame"
    git branch -M main
    git remote add origin URL_DEL_REPOSITORIO
    git push -u origin main

Reemplazá URL_DEL_REPOSITORIO por la URL HTTPS que te muestre GitHub. Git puede pedirte iniciar sesión. No pegues contraseñas ni tokens dentro del código.

## Estructura

- dist/index.html: interfaz.
- dist/style.css: diseño adaptable.
- dist/app.js: interacción, animación y canvas.
- dist/math.js: interpretación de funciones.
- dist/levels.js: mapas y comprobación de trayectorias.

El contenido de dist se puede alojar como sitio estático. Se excluyeron metadatos internos de alojamiento y de Git: el código no depende de ChatGPT para funcionar. Esta copia no sincroniza automáticamente con el sitio publicado.

El progreso actual dura sólo durante la sesión. Puntos, skins, capítulos y editor de mapas aún no están implementados.
