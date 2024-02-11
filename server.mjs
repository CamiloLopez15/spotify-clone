import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const supabase = createClient(
    "https://wfdjhacgvbkavklqmxdq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZGpoYWNndmJrYXZrbHFteGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0OTA1OTgsImV4cCI6MjAyMjA2NjU5OH0.his_M-Mc9r2dcpFq7upcB4qqA987OvLBo5SVvw321h4"
);

app.get("/api/albums", async (req, res) => {


  const { data, error } = await supabase.from("Albums").select();
  console.log(data);
  return res.json(data);
});

app.get("/api/albums/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("Albums")
    .select()
    .eq("albumId", id);
  console.log(data);
  return res.json(data);
});

app.get("/api/album/songs/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("Songs")
    .select()
    .eq("albumId", id);
  console.log(data);
  return res.json(data);
});

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Se requieren nombre, email y contraseña." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("Users")
    .insert([{ name: name, email: email, password: hashedPassword }]);

  if (error) {
    if (error.code === "23505") {
      console.error("Error al registrar usuario: el email ya existe", error);
      return res.status(400).json({ error: "El email ya existe." });
    } else if (error) {
      console.error("Error al registrar usuario:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  }

  return res.status(200).json({ message: "Usuario registrado correctamente." });
});

app.post("/api/login", async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Se requieren email y contraseña." });
  }

  try {
    // Buscar usuario por email en la base de datos
    const { data, error } = await supabase
      .from("Users")
      .select()
      .eq("email", email)
      .single();
    if (error) {
      throw error;
    }

    // Verificar si el usuario existe
    if (!data) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    // Verificar la contraseña utilizando bcrypt
    const isValidPassword = await bcrypt.compare(password, data.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    // Si las credenciales son válidas, iniciar sesión
    return res.status(200).json({ message: "Inicio de sesión exitoso." });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
});

app.listen(8080, () => console.log(`Server activo en http://localhost:8080`));
