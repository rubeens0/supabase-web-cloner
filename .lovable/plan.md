# Plan

## Objetivo
Hacer que al seleccionar una oferta con precio decimal no se agranden los recuadros ni se desplace el layout en móvil.

## Qué voy a cambiar
1. Fijar las dimensiones de cada tarjeta de oferta para que mantengan la misma altura y ancho visual en todos los estados.
2. Reservar un ancho estable para la columna del precio, pensado para el caso más largo (`10,95 €/mes`), para que el texto no empuje el resto del contenido.
3. Ajustar el tamaño y comportamiento del texto del precio en móvil para que quepa sin deformar la tarjeta.
4. Asegurar que el contenido interno recorte correctamente (`truncate` / `overflow-hidden`) y que el contenedor no permita desbordamiento horizontal.
5. Validar en viewport móvil cambiando entre varias ofertas con y sin decimales para confirmar que no hay saltos ni ensanchamiento.

## Resultado esperado
- Los recuadros mantienen tamaño constante.
- Los precios con decimales no ensanchan la tarjeta.
- No aparece desplazamiento horizontal ni deformación visual al cambiar de opción.

## Detalles técnicos
- El ajuste se hará en `src/components/oeste/OesteOffers.tsx`.
- Se reforzará la estructura de layout de cada fila con tracks fijos o mínimos estables para la zona del precio.
- Se mantendrá el estilo actual del degradado y la estética general; solo se corrige la estabilidad del componente.