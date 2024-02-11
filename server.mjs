import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const JWT_KEY = "9E:PfLZqIZ'KlC-5;P£*&.E5t5@6oTVd@X6sD7]Uñ&w";

const supabase = createClient(
  "https://wfdjhacgvbkavklqmxdq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZGpoYWNndmJrYXZrbHFteGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0OTA1OTgsImV4cCI6MjAyMjA2NjU5OH0.his_M-Mc9r2dcpFq7upcB4qqA987OvLBo5SVvw321h4"
);

app.get("/api/albums", async (req, res) => {
  const { data, error } = await supabase.from("Albums").select();
  return res.json(data);
});

app.get("/api/albums/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("Albums")
    .select()
    .eq("albumId", id);
  return res.json(data);
});

app.get("/api/album/songs/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("Songs")
    .select()
    .eq("albumId", id);
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

    // Generar un token JWT con la información del usuario
    const payload = {
      userId: data.id, // El ID del usuario desde la base de datos
      email: data.email, // El email del usuario
    };
    const token = jwt.sign(payload, JWT_KEY, { expiresIn: "7d" }); // Generar el token con una validez de una semana (7 días)

    // Devolver el token en la respuesta
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
});

app.get("/api/validation", async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token de sesión no proporcionado." });
  }

  // Verificar el token
  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      console.error("Error al verificar el token:", err);
      return res.status(403).json({ error: "Token de sesión inválido." });
    }
    console.log("Token de sesión válido:", decoded);
    res.status(200).json({ message: "Token de sesión válido.", decoded }); // Devolver una respuesta de éxito si el token es válido
  });
});

app.listen(8080, () => console.log(`Server activo en http://localhost:8080`));
