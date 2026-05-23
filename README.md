# REDIBAI Orizaba — PWA Demo

Demo de Progressive Web App del campus digital REDIBAI Orizaba.
Sitio estático listo para desplegar en Vercel.

## Estructura

```
/
├── index.html              # Splash screen
├── welcome.html            # Bienvenida / landing del campus
├── login.html              # Portal de acceso (demo: cualquier credencial entra)
├── dashboard.html          # Dashboard académico
├── offline.html            # Fallback cuando no hay conexión
├── manifest.webmanifest    # Web App Manifest
├── sw.js                   # Service Worker (precache + runtime cache)
├── pwa.js                  # Registro de SW + prompt de instalación
├── icons/                  # Iconos PNG generados (192, 512, maskable, apple-touch, favicon)
├── vercel.json             # Headers y rutas para Vercel
└── MAESTRIAS/              # Mockups originales (Stitch) — referencia
```

## Capacidades PWA

- **Instalable**: manifest con iconos `any` y `maskable`, `display: standalone`, theme color y atajos.
- **Offline-first**: service worker con precache del app shell y fallback `/offline.html`.
- **Estrategias de caché**:
  - Navegación → network-first con fallback a caché.
  - Estáticos same-origin → cache-first.
  - CDN (Tailwind / Google Fonts) → stale-while-revalidate.
- **iOS**: meta tags `apple-mobile-web-app-*` + `apple-touch-icon`.
- **Atajos**: el manifest expone accesos directos al Dashboard y al Login desde el ícono instalado.
- **Indicador de conexión**: badge `#pwa-status` cambia entre "En línea" / "Modo offline".

## Probar localmente

Cualquier servidor estático sirve, por ejemplo:

```bash
npx serve .
# o
python3 -m http.server 8080
```

Abre `http://localhost:8080`. El service worker requiere HTTP/HTTPS (no `file://`).

## Desplegar en Vercel

El repositorio ya está conectado a Vercel. El proyecto es 100% estático, así que Vercel lo sirve directamente desde la raíz — no se necesita build step. `vercel.json` configura los headers para el service worker y el manifest.

## Flujo de la demo

1. `/` — splash REDIBAI con CTA "Ingresar al campus".
2. `/welcome.html` — landing con stats y CTAs hacia login / dashboard.
3. `/login.html` — formulario demo: cualquier email + contraseña abren el dashboard.
4. `/dashboard.html` — panel académico personalizado (saluda con el nombre del email).
