import { app } from "./index.js";
import dotenv from "dotenv";
dotenv.config();
app.listen(process.env.PORT||4000)