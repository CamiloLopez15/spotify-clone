import express from "express";
// import { handler as ssrHandler } from "./dist/server/entry.mjs";
import { createClient } from "@supabase/supabase-js";

const app = express();


app.get("/api/albums", async (req, res) => {
  const supabase = createClient(
    "https://wfdjhacgvbkavklqmxdq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZGpoYWNndmJrYXZrbHFteGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0OTA1OTgsImV4cCI6MjAyMjA2NjU5OH0.his_M-Mc9r2dcpFq7upcB4qqA987OvLBo5SVvw321h4"
  );

  const { data, error } = await supabase.from("Albums").select();
  console.log(data);
  return res.json(data);
});


app.get("/api/albums/:id", async (req, res) => {
  const { id } = req.params;
  const supabase = createClient(
    "https://wfdjhacgvbkavklqmxdq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZGpoYWNndmJrYXZrbHFteGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0OTA1OTgsImV4cCI6MjAyMjA2NjU5OH0.his_M-Mc9r2dcpFq7upcB4qqA987OvLBo5SVvw321h4"
  );

  const { data, error } = await supabase.from("Albums").select().eq("albumId", id);
  console.log(data);
  return res.json(data);
});

app.get("/api/album/songs/:id", async (req, res) => {
  const {id} = req.params;
  const supabase = createClient(
    "https://wfdjhacgvbkavklqmxdq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZGpoYWNndmJrYXZrbHFteGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0OTA1OTgsImV4cCI6MjAyMjA2NjU5OH0.his_M-Mc9r2dcpFq7upcB4qqA987OvLBo5SVvw321h4"
  );

  const { data, error } = await supabase.from("Songs").select().eq("albumId", id);
  console.log(data);
  return res.json(data);
});

app.listen(8080, () =>
  console.log(`Server activo en http://localhost:8080`)
);
