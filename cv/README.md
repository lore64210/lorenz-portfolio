# CV

El contenido de los dos CV vive en `cv-data.mjs`. El generador arma un HTML
simple (una columna, texto real, links clickeables) y lo exporta a PDF con
Chrome.

## Editar el contenido

1. Modificá `cv/cv-data.mjs`.
2. Generá los borradores:

   ```bash
   npm run cv:build
   ```

   Salen en `cv/out/`.

3. Cuando estén listos, copialos a `public/static/pdf/` con los nombres que usa
   el sitio:

   ```bash
   copy cv\out\CV_LORENZO_LOPEZ_ES.pdf public\static\pdf\CV_LORENZO_LOPEZ_ES.pdf
   copy cv\out\CV_LORENZO_LOPEZ_EN.pdf public\static\pdf\CV_LORENZO_LOPEZ_EN.pdf
   ```

## Notas

- El PDF se genera con Chrome; si no está en la ruta habitual, pasá la ruta con
  `CHROME_PATH`.
- El diseño es ATS-friendly: una columna, Arial, encabezados estándar, sin
  tablas ni imágenes.
- Los links de LinkedIn, portfolio, GitHub, email y teléfono quedan clickeables.
