# images/ — catálogo de fotografías

Ninguna foto publicada todavía: los huecos se ven como placas de color con su nombre (`data-slot`).
Exporta copias web (WebP calidad ~80 y AVIF, 800 / 1600 px de ancho); nunca subas los originales de cámara (`.gitignore`).

| Página | Hueco (`data-slot`) | Proporción | Archivo sugerido |
|---|---|---|---|
| index | Foto · cabina | 4:5 | `images/grupo/cabina-800.webp` |
| index | Foto · producto | 4:5 | `images/grupo/producto-800.webp` |
| index | Foto · laboratorio / tecnología en cabina / especialista | 4:5 | `images/grupo/*.webp` |
| index | Foto · formación | 4:5 | `images/especialistas/formacion-800.webp` |
| marcas/individuel-geneve | Foto · línea de sérums / cabina CDMX / ritual | 4:5 | `images/marcas/individuel-geneve/*.webp` |
| marcas/wishpro | Foto · tecnología MIT | 4:5 | `images/marcas/wishpro/*.webp` |

Para colocar una foto, sustituye el `<div class="plate …" data-slot="…">` por:

```html
<figure class="plate"><img src="/images/grupo/cabina-800.webp" srcset="/images/grupo/cabina-800.webp 800w, /images/grupo/cabina-1600.webp 1600w"
  sizes="(max-width: 900px) 100vw, 50vw" width="800" height="1000" alt="Descripción de la foto" loading="lazy"></figure>
```
