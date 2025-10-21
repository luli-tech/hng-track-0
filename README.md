# HNG Combined Project - Stage 0 (Me API) + Stage 1 (String Analyzer API)

Author: Olabode Micheal Ayomikun
Email: olabodemicheal5@gmail.com
GitHub: https://github.com/luli-tech

## Overview

This repository currently contains all two stages in a single NestJS project:

- ## Stage 0 — Me API
- `GET /me` returns a user profile and a cat fact (fetched live from Cat Facts API).
- ## Stage 1 — String Analyzer API
- Provides endpoints to analyze strings, persist them server-side, filter them (including natural language f
  iltering), and delete them.

## Requirements

- Node.js 18+
- pnpm or npm

## Setup

1. Install dependencies:

```bash
npm install
# or
pnpm install
```

2. Environment variables (optional):

```
PORT=3000
CAT_API_URL=https://catfact.ninja/fact
```

3. Run in development:

```bash
npm run start:dev
```

## Server will run at `http://localhost:3000`.

## Stage 0 — Me API

### Endpoint

```
GET /me

```

### Response example

```json
{
  "status": "success",
  "user": {
    "email": "olabodemicheal5@gmail.com",
    "name": "Olabode Micheal Ayomikun",
    "stack": "Node.js/NestJS"
  },
  "timestamp": "2025-10-21T12:00:00.000Z",
  "fact": "Cats have five toes on their front paws but only four on the back ones."
}
```

---

## Stage 1 — String Analyzer API

Base URL: `http://localhost:3000/strings`

### 1) Create / Analyze String

```
POST /strings
Content-Type: application/json
Body:
{ "value": "madam" }
```

Response (201):

```json
{
  "id": "<sha256_hash>",
  "value": "madam",
  "properties": {
    "length": 5,
    "is_palindrome": true,
    "unique_characters": 3,
    "word_count": 1,
    "sha256_hash": "<sha256_hash>",
    "character_frequency_map": { "m": 2, "a": 2, "d": 1 }
  },
  "created_at": "2025-10-21T12:00:00.000Z"
}
```

### 2) Get All Strings (filters supported)

```
GET /strings?is_palindrome=true&min_length=1&contains_character=a
```

### 3) Get Specific String

```
GET /strings/{string_value}
```

### 4) Delete String

```
DELETE /strings/{string_value}
```

### 5) Natural Language Filtering

```
GET /strings/filter-by-natural-language?query=all%20single%20word%20palindromic%20strings
```

### Notes

- Persistent storage uses `node-localstorage` and stores data in `./local_storage`.
- To reset stored strings remove the `local_storage` directory.

---

## Example curl commands

Create:

```bash
curl -X POST http://localhost:3000/strings -H "Content-Type: application/json" -d '{"value":"madam"}'
```

Get all:

```bash
curl http://localhost:3000/strings
```

Natural language filter:

````bash
curl "http://localhost:3000/strings/filter-by-natural-language?query=single%20word%20palindromic%20string```
Me endpoint:
```bash
curl http://localhost:3000/me
````

---

## Files included

- src/me/\* (Stage 0)
- src/string-analyser/\* (Stage 1)
- package.json
- README.md

## License

MIT
