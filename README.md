■ HNG Stage 0 – Me API (NestJS)
A simple **NestJS** API that exposes a `/me` endpoint returning a user profile and a random cat
fact.
Built as part of the **HNG Stage 0 backend task**.

---

■ Features
■ `GET /me` returns a JSON object with:

- `status`: "success"
- `user`: includes `email`, `name`, `stack`
- `timestamp`: current UTC time in ISO format
- `fact`: a cat fact fetched from the [Cat Facts API](https://catfact.ninja/fact)
  ■ Every request fetches a **new cat fact**
  ■ Returns **application/json** response
  ■ Code follows **NestJS best practices** (controller, service, repository, and types)

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
git clone https://github.com//.git
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

---

■ Technologies Used

- **NestJS** (Framework)
- **TypeScript**
- **Axios** (For API requests)
- **PNPM** (Package manager)

---

■ Acceptance Criteria Checklist
■ GET `/me` endpoint accessible and returns 200 OK
■ Follows defined JSON schema
■ Includes `status`, `user`, `timestamp`, and `fact` fields
■ User object contains valid strings for `email`, `name`, and `stack`
■ Timestamp updates dynamically on each request
■ Fetches new cat fact each time
■ Content-Type is `application/json`
■ Code follows NestJS best practices

---

■■■ Author
**Olabode Micheal Ayomikun**
■ olabodemicheal5@gmail.com
■ [https://github.com/](https://github.com/)

---

■ License
This project is licensed under the **MIT License**
