# bellezapro.com.mx

Belleza Pro MX: el grupo que opera las marcas **Individuel Genève** y **WishPro**, las tecnologías de cabina
(Ballancer Gold, tecnología MIT, Sonnext), el programa de especialistas, los partners en Europa y la bolsa de trabajo.

**Variante B** de `../ARQUITECTURA-WEB-ETAPAS.md`: sitio editorial estático, HTML + CSS + JavaScript sin frameworks,
CSS en tres capas y una carpeta por marca. Elegida porque es un sitio **corporativo y multimarca**: prioriza imagen,
velocidad y SEO, y no necesita carrito ni cuentas (esas viven en cada marca).

**Estado: 1.0.0 · Etapa 1.** Descripciones de tecnologías, certificaciones, cifras, partners y vacantes son
`[marcadores]`. No publicar certificaciones (FDA, ISO) sin la documentación del fabricante.

## Probar en local

```
py -m http.server 8127        # desde esta carpeta → http://localhost:8127
```

## Correcciones aplicadas respecto a synode.space (pendientes de la Variante B en la guía)

| Problema en la guía | Aquí |
|---|---|
| `.htaccess` no funciona en GitHub Pages | No hay `.htaccess`. Cabeceras de seguridad y de derechos en `_headers` (Cloudflare Pages / Netlify) y documentadas abajo para una Transform Rule de Cloudflare mientras siga en GitHub Pages |
| `docs/` privado dentro del repositorio público | Documentación sensible en `_interno/`, fuera de Git (`.gitignore`) |
| Despliegue con Jekyll (oculta carpetas con `_`, reescribe) | `.github/workflows/pages.yml` publica la carpeta tal cual, sin build |
| Sin CSP | CSP estricta en `_headers`: sin scripts ni estilos en línea (todo en `css/` y `js/`) |
| Precios duplicados HTML / PDF | No hay precios en este sitio; viven en cada marca |
| Imágenes pesadas | Huecos `.plate` preparados para `<img>` WebP/AVIF con `srcset`; ver `images/README.md` |

## Identidad

| Token | Color | Uso |
|---|---|---|
| `--ivory` | `#f6f3ee` | fondo (60 %) |
| `--ink` | `#151515` | texto, secciones oscuras, botones (30 %) |
| `--champagne` | `#b8996a` | filetes, numerales, énfasis en cursiva (10 %) |
| `--stone` | `#6b655d` | texto secundario |
| `--individuel` / `--wishpro` | `#f4dfe2` / `#e7efed` | acento de cada marca (`body.brand--<marca>`) |

Tipografías: **Bodoni Moda** (títulos) · **Manrope** (texto) · **Pinyon Script** (solo el nombre Individuel Genève).

## Estructura de carpetas

```
bellezapro.com.mx/
├── CNAME · .nojekyll · .gitignore
├── _headers                      cabeceras de seguridad y derechos (Cloudflare Pages / Netlify; GitHub Pages lo ignora)
├── robots.txt · sitemap.xml
├── .well-known/tdmrep.json       reserva de derechos frente a minería de datos / IA
├── .github/workflows/pages.yml   despliegue estático a GitHub Pages
├── README.md                     este archivo
├── index.html                    portada: héroe, quiénes somos, #marcas, #tecnologia, especialistas, #partners, #contacto
├── terminos.html · privacidad.html · 404.html
│
├── css/
│   ├── site.css                  capa 1: tokens, tipografía, botones, campos
│   ├── layout.css                capa 2: cabecera, secciones, rejillas, split sticky, placas, pie, reveal
│   └── brand.css                 capa 3: tarjetas de marca, tecnologías, vacantes, formularios, tema por marca
├── js/
│   ├── main.js                   menú móvil, cabecera al hacer scroll, reveal, año (en <head>, sin defer)
│   ├── parallax.js               [data-speed]; desactivado con prefers-reduced-motion y en móvil
│   └── forms.js                  formularios data-mailto → correo prellenado; preselección de vacante
│
├── marcas/                       una carpeta por marca (modelo multimarca de synode: brands/<marca>/)
│   ├── individuel-geneve/index.html
│   └── wishpro/index.html
├── especialistas/index.html      programa de formación + postulación
├── bolsa-de-trabajo/index.html   vacantes (<details>) + postulación
│
├── images/                       catálogo de fotos por sección (README.md con los huecos a llenar)
├── img/favicon.svg
└── _interno/                     LOCAL, NO SE PUBLICA
```

## Cambios habituales

- **Menú y pie**: están repetidos en cada HTML (es la desventaja conocida de la Variante B). Busca `nav-links` /
  `site-footer` y cambia todos los archivos a la vez.
- **Nueva marca**: copia `marcas/wishpro/` a `marcas/<marca>/`, añade un bloque `.brand--<marca>` al final de
  `css/brand.css`, una tarjeta `.house` en `index.html#marcas`, la URL en `sitemap.xml` y el enlace en el pie.
- **Nueva vacante**: copia un `<li><details class="job">` en `bolsa-de-trabajo/index.html` y añade su `<option>` al
  formulario (mismo texto en `data-job`).
- **Fotos**: sustituye un `<div class="plate …" data-slot="…">` por `<figure class="plate"><img …></figure>`.
- **Correos de los formularios**: atributo `data-mailto` de cada `<form>`.

## Seguridad (mientras siga en GitHub Pages)

GitHub Pages no aplica `_headers`. En Cloudflare (DNS con proxy activado) → Rules → **Transform Rules → Modify
Response Header**, para `http.host eq "bellezapro.com.mx"`, añade las mismas cabeceras de `_headers`. Con la Etapa 4,
WAF y límite de tasa en el mismo panel.

## Hoja de ruta

| Etapa | Belleza Pro |
|---|---|
| 1 | Este sitio. Pendiente: fotos, textos técnicos y certificaciones de los equipos, partners, vacantes reales |
| 2 | Formularios → Cloudflare Worker (validación, límite de tasa, Supabase); postulaciones con CV adjunto en almacenamiento privado |
| 4 | Cabeceras vía Cloudflare, WAF |
| 5 | Zendesk / Zoho CRM para leads B2B; Monday para el programa de especialistas |

## Versiones

### 1.0.0 — 2026-10-07 · Primera versión (Etapa 1, Variante B)
- Portada editorial con secciones sticky y parallax, dos páginas de marca con tema propio, especialistas y bolsa de trabajo.
- Correcciones de la Variante B: `_headers` + CSP, `_interno/` fuera de Git, despliegue estático sin Jekyll.
