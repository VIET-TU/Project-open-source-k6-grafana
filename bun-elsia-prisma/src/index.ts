import { Elysia } from "elysia";
import postsRoutes  from "./routes/posts";

const app = new Elysia()

app
  .group('/api', (app) => app.use(postsRoutes))
  .listen(process.env.PORT || 3000)

  
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
