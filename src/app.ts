import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { handleError } from "./errors";
import { usersRouter } from "./routers/users.router";
import { sessionRouter } from "./routers/session.router";
import { categoriesRouter } from "./routers/categories.router";
import { realEstatesRouter } from "./routers/realEstates.router";
import { schedulesRouter } from "./routers/schedules.router";

const app: Application = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", sessionRouter);
app.use("/categories", categoriesRouter);
app.use("/realEstate", realEstatesRouter);
app.use("/schedules", schedulesRouter);

app.use(handleError);

export default app;
