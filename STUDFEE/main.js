import express, { text } from "express";
import detailroute from "./routes/details.js";
import connectdb from "./lib/db.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectdb();

// Root route
app.get("/", (req, res) => {
  res.json({ msg: "WELCOME ADMIN" });
});

// Route for /mv
app.use("/mv", detailroute);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
