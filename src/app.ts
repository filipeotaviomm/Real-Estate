import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { handleError } from "./errors";
import { usersRouter } from "./routers/users.router";
import { sessionRouter } from "./routers/session.router";
import { categoriesRouter } from "./routers/categories.router";
import { realEstatesRouter } from "./routers/realEstates.router";
import { schedulesRouter } from "./routers/schedules.router";
import cors from "cors";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const app: Application = express();

app.use(cors());
//se quizer restringir o uso da api por domínio, ou métodos, ou cabeçalhos, é só colocar essa variável dentro do parâmetro da função cors()
// const corsOptions = {
//   origin: 'https://www.exemplo.com',
//   methods: 'GET,POST',
//   allowedHeaders: 'Content-Type,Authorization',
// };

app.use(express.json());

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);
app.use("/users", usersRouter);
app.use("/login", sessionRouter);
app.use("/categories", categoriesRouter);
app.use("/realEstate", realEstatesRouter);
app.use("/schedules", schedulesRouter);

app.use(handleError);

export default app;
