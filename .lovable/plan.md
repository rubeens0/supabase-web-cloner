# Rehacer la web alrededor de negocio y marketing digital

## Resultado

- Convertir la portada en una presentación mínima de Rubén Muñoz enfocada exclusivamente en negocio, marketing digital y Netpro Agency.
- Mantener únicamente las páginas públicas **Inicio**, **Negocio**, **Booking** y **Contacto**.
- Eliminar de la navegación, el pie y la portada toda referencia al proyecto deportivo, trayectoria personal, blog, patrocinio y temporada.
- Hacer que cualquier dirección antigua lleve a la nueva portada en lugar de mostrar su contenido anterior.
- Bloquear la indexación de todo el sitio mediante `noindex, nofollow`, tanto en los metadatos como en `robots.txt`, y vaciar el sitemap público.

## Diseño de la portada

- Mantener el lenguaje visual oscuro y editorial actual, pero con una composición mucho más limpia.
- Primera pantalla centrada en “Rubén Muñoz” y una propuesta clara de negocio y marketing digital.
- Mostrar de forma breve los servicios principales: identidad visual, desarrollo web, redes sociales y marketing.
- Añadir accesos claros a **Negocio**, **Agendar reunión** y **Contacto**.
- Usar recursos visuales de Netpro ya presentes en la web, sin imágenes ni símbolos deportivos.

## Cambios técnicos

- Simplificar el enrutado para conservar `/`, `/business`, `/booking` y `/contacto`, con sus alias de idioma necesarios.
- Simplificar navegación, pie y metadatos para reflejar el nuevo enfoque.
- Actualizar título, descripción, Open Graph y datos estructurados, eliminando referencias a karting, CEK y patrocinio.
- Mantener las landings antiguas inaccesibles desde las rutas públicas solicitadas; cualquier ruta no conservada redirigirá a Inicio.
- Verificar en escritorio y móvil que la portada, navegación y enlaces funcionen correctamente.
