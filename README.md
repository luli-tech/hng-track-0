# HNG Combined Project - Stage 0 (Me API) + Stage 1 (String Analyzer API) + Stage 3 (Rest Countries
API)
Author: Olabode Micheal Ayomikun
Email: olabodemicheal5@gmail.com
GitHub: https://github.com/luli-tech
## Overview
This repository contains multiple stages in a single NestJS project:
- ## Stage 0 — Me API
- `GET /me` returns a user profile and a cat fact (fetched live from Cat Facts API).
- ## Stage 1 — String Analyzer API
- Provides endpoints to analyze strings, persist them server-side, filter them (including natural language
filtering), and delete them.
- ## Stage 3 — Rest Countries API
- Fetches country data, calculates estimated GDP, stores in DB, and serves a summary SVG image.
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
---
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
## Stage 2 — Rest Countries API
Base URL: `http://localhost:3000/restCountries`
### 1) Refresh all countries
```
POST /restCountries/countries/refresh
```
### 2) Get all countries
```
GET /restCountries/countries
```
### 3) Get country by name
```
GET /restCountries/countries/{name}
```
### 4) Delete country
```
DELETE /restCountries/countries/{name}
```
### 5) Get summary SVG image
```
GET /restCountries/countries/image
```
### Notes
- Stores country info and summary SVG in SQLite database.
- Calculates estimated GDP using population and currency exchange rates.
---
### environment variables
- COUNTRIES_URL = https://restcountries.com/v2/all?fields=name,capital region,population,flag,currencies
- RATES_URL = https://open.er-api.com/v6/latest/USD
## Example curl commands
Create string:
```bash
curl -X POST http://localhost:3000/strings -H "Content-Type: application/json" -d '{"value":"madam"}'
```
Get all strings:
```bash
curl http://localhost:3000/strings
```
Get Me endpoint:
```bash
curl http://localhost:3000/me
```
---
## Files included
- src/me/* (Stage 0)
- src/string-analyser/* (Stage 1)
- src/02-rest-countries/* (Stage 3)
- package.json
- README.md
## License
MIT
