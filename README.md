# HNG Stage 0 – Me API (NestJS)

A simple NestJS API that exposes a `/me` endpoint returning a user profile and a random cat fact.
Built as part of the HNG Stage 0 backend task.

---

## ■ Features

GET /me returns a JSON object with:

- `status`: "success"
- `user`: includes `email`, `name`, `stack`
- `timestamp`: current UTC time in ISO format
- `fact`: a cat fact fetched from the [Cat Facts API](https://catfact.ninja/fact)
  ■ Every request fetches a new cat fact
  ■ Returns application/json response
  ■ Code follows NestJS best practices (controller, service, repository, and types)

---

## ■ Folder Structure

```
src/
■■■ me/
■ ■■■ me.controller.ts
■ ■■■ me.service.ts
■ ■■■ me.repository.ts
■ ■■■ me.module.ts
■■■ types/
■■■ me.types.ts
main.ts
app.module.ts
```

---

## ■■ Setup Instructions

### 1■■ Clone the Repository

```
git clone https://github.com/luli-tech/hng-track-0
cd hng-track-0
```

### 2■■ Install Dependencies

```
pnpm install
```

### 3■■ environment variables

PORT=3000
CAT_API_URL=https://catfact.ninja/fact
RATE_LIMIT=5
RATE_TTL=60000

### 3■■ Run the App

```
pnpm run start:dev
```

## The app will start on http://localhost:3000

## ■ Testing the Endpoint

You can test the endpoint using your browser, Postman, or curl:

```
curl http://localhost:3000/me
```

### Example Response

```json
{
  "status": "success",
  "user": {
    "email": "olabodemicheal5@gmail.com",
    "name": "Olabode Micheal Ayomikun",
    "stack": "Node.js/NestJS"
  },
  "timestamp": "2025-10-16T12:00:00.000Z",
  "fact": "Cats have five toes on their front paws but only four on the back ones."
}
```

---

## ■■ Build for Production

```
pnpm run build
pnpm run start:prod
```

---

## ■ Technologies Used

- NestJS (Framework)
- TypeScript
- Axios (For API requests)
- PNPM (Package manager)

---

## ■ Author

Olabode Micheal Ayomikun
■ olabodemicheal5@gmail.com
■ [https://github.com/luli-tech](https://github.com/luli-tech)

---

## ■ License

This project is licensed under the MIT License
