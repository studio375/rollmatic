# The Next.js Starter Kit you've been eager to meet

A production-ready Next.js starter by [Studio375](https://375.studio) — built with GSAP, Locomotive Scroll, Zustand, and clean API helpers.

---

## Stack

| Layer      | Library                                |
| ---------- | -------------------------------------- |
| Framework  | Next.js 16 / React 19                  |
| Animations | GSAP 3                                 |
| Scroll     | Locomotive Scroll 5                    |
| State      | Zustand 5                              |
| Styling    | Tailwind CSS 4 + SASS                  |
| API        | `fetchAPI` helper (WordPress REST API) |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment

Create a `.env` file at the root:

```env
BACKEND_ENDPOINT=https://your-wordpress-backend.com/wp-json/wp/v2
```

---

## API Helper

`src/helpers/api/fetch-api.js` wraps the WordPress REST API with automatic query-string serialization via `qs`:

```js
const page = await fetchAPI("pages", {
  slug: "home",
  acf_format: "standard",
  per_page: 100,
});
```

---

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # production server
npm run lint     # eslint
```

---

**Studio375** — [375.studio](https://375.studio)
