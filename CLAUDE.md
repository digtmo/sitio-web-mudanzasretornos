# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start Next.js dev server
npm run sass         # Watch & compile SCSS → public/css/style.css (run alongside dev)

# Build & Production
npm run build        # Production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

> SCSS changes require either running `npm run sass` or manually compiling. Changes to `.scss` files under `public/scss/` won't appear until compiled.

## Architecture Overview

**Stack:** Next.js 13 (Pages Router) · React 18 · Tailwind CSS + SCSS · Axios

**Styling is hybrid:** Tailwind utility classes + custom SCSS (`public/scss/`) compiled to `public/css/style.css`. Both coexist in components.

### Page Structure

| Page | Route |
|------|-------|
| Home | `/` |
| Quotation (new UI) | `/cotizadornew` |
| Payments | `/pagos` |
| Services, About, Contact | `/servicios`, `/nosotros`, `/contacto` |
| Payment outcomes | `/pago-exitoso`, `/pago-error` |
| Reservation outcomes | `/reserva-exitosa`, `/reserva-error` |
| Quotation sub-routes | `/cotizaciones/...` |

### Component Organization

```
components/
  layout/       # Header, Footer, Layout wrapper, MobileMenu, NavLinks
  sections/     # Page sections (BannerOne, AboutOne, ServiceOne, TestimonialOne, etc.)
  cotizador/    # Quotation system — the core business logic
  elements/     # Small reusable UI (BackToTop, etc.)
  slider/       # Carousel components
```

### Quotation Flow (core feature)

The quotation/reservation system is in `components/cotizador/` and follows this sequence:

1. **`reservationScreen.js`** — captures origin/destination addresses, housing type, and service dates. On submit, calls `POST /v1/reservasc` and returns a `reservaId`.
2. **`cotizador_new.js` / `productGrid.js`** — product/service selection. Fetches `GET /articulos` (categories with items and volumes). Tracks quantities and calculates total volume.
3. **`paymentModal.js`** — WebPay (Transbank) integration via `POST /webpay/transaction`, plus manual transfer option.
4. **`modalExito.js` / `modalError.js`** — feedback dialogs; then redirect to outcome pages.

Parent-child communication uses `useRef` + `useImperativeHandle` extensively (no Redux/Context). State is lifted through callbacks like `onTotalVolumeChange`, `onQuantitiesChange`, `onReservaGuardada`.

### Backend API

Base URL: `https://econotrans-backend-production.up.railway.app`

Key endpoints:
- `GET /articulos` — product categories with items and volumes
- `POST /v1/cotizador` — create quotation
- `POST /v1/reservasc` — create reservation
- `POST /v1/actualizarservicioscotizados/{id}` — update reserved services
- `POST /webpay/transaction` — initiate WebPay payment

### Third-Party Integrations

- **WebPay (Transbank)** — Chilean payment gateway
- **WhatsApp:** `+56996346064`
- **Messenger:** Mudanzas Retorno Facebook page
- **WOW.js** — scroll-triggered animations (initialized on component mount)
- **react-slick + Swiper** — carousels/sliders
