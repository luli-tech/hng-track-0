■ HNG Stage 0 – Me API (NestJS)
A simpleNestJS API that exposes a `/me` endpoint returning a user profile and a random cat
fact.
Built as part of theHNG Stage 0 backend task.

---

■ Features
■ `GET /me` returns a JSON object with:

- `status`: "success"
- `user`: includes `email`, `name`, `stack`
- `timestamp`: current UTC time in ISO format
- `fact`: a cat fact fetched from the [Cat Facts API](https://catfact.ninja/fact)
  ■ Every request fetches anew cat fact
  ■ Returnsapplication/json response
  ■ Code followsNestJS best practices (controller, service, repository, and types)

---

■ Folder Structure

```
src/
me/
 me.controller.ts
 me.service.ts
 me.repository.ts
me.module.ts
types/
me.types.ts
```

■■■ main.ts
■■■ app.module.ts

````
---
■■ Setup Instructions
1■■ Clone the Repository
```bash
git clone https://github.com/luli-tech/hng-track-0
cd
````

2■■ Install Dependencies

```bash
pnpm install
```

3■■ Run the App

```bash
development mode
pnpm run start:dev
```

## The app will start on [http://localhost:3000](http://localhost:3000)

■ Testing the Endpoint
Use your browser, Postman, or curl to test:

```bash
curl http://localhost:3000/me
```

■ Example Response:

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

■ Build for Production

```bash
pnpm run build
pnpm run start:prod
```

■ Technologies Used

-NestJS (Framework)
-TypeScript
-Axios (For API requests)
-PNPM (Package manager)

■■■ Author
Olabode Micheal Ayomikun
■ olabodemicheal5@gmail.com
■ [https://github.com/](https://github.com/)

---

■ License
This project is licensed under theMIT License
