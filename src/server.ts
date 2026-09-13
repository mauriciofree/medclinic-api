import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express from "express";
import { AppDataSource } from "./database/data-source";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { routes } from "./routes";

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error("Erro ao conectar com o banco de dados:", error);
  });
