import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { routes } from "./config/config.js";

import userRoutes from "./routes/users.routes.js";
import companyRoutes from "./routes/companies.routes.js";
import contactRoutes from "./routes/contacts.routes.js";

const app = express();
const port = process.env.PORT_API || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routes.users, userRoutes);

app.use(routes.companies, companyRoutes);

app.use(routes.contacts, contactRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});