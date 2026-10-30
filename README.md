# Hook Vault — landing (knowinhook.com)

Versión 3 (31-10-2026): rediseño con el método modelador-supremo, territorio «Fichero de recetas».

- **Oferta:** `Cerebro productos digitales/Productos/HOOK VAULT/Hook Vault CORE OFFER.txt`
- **Estilo:** `Cerebro productos digitales/Productos/HOOK VAULT/Hook Vault BRANDING.txt`
- **Versión anterior:** `_archivo/2026-10-31-v1/` (no se publica: `.vercelignore`)

## Archivos

- `index.html`: las 15 secciones, en el orden del brandbook. La sección de opiniones queda oculta hasta tener opiniones de compradores con su permiso.
- `styles.css`: estilos de la marca, pensados primero para el celular.
- `scripts.js`: el Selector en vivo (demostración con 4 de los 12 negocios), la baraja de los 10 ganchos gratis (texto exacto del Banco) y la medición del píxel (`InitiateCheckout` al pulsar comprar y `Purchase` cuando Lemon.js avisa `Checkout.Success`).
- `img/`: capturas del Notion para el vistazo.
- `legal/`: Términos y Privacidad.

## Publicar

El proyecto `hookvault` de Vercel está conectado al repositorio `kninfodigital-blip/hookvault`:

- Si se sube a una rama distinta de `main`, Vercel crea una vista previa y la web pública no cambia.
- Si se sube a `main`, se publica en knowinhook.com.

Para verla en local: `python3 -m http.server 8000` dentro de esta carpeta.
