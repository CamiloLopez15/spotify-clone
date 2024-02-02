import express from "express";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const app = express();

app.get("/api/artist/:id", (req, res) => {
  
});

app.listen(8080);
