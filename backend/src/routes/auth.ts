import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db";

const authRoutes = express.Router();

authRoutes.get("/", (req, res) => {
  res.send("Hello from the auth route");
});

authRoutes.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await db("treinadores")
      .where({ username: username })
      .first();
    if (existingUser) {
      return res.status(409).send("Username already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db("treinadores")
      .insert({
        username: username,
        password: hashedPassword,
      })
      .then((result) => {
        res.status(201).send("User created");
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db("treinadores").where({ username: username });
    if (user.length > 0) {
      const validPassword = await bcrypt.compare(password, user[0].password);
      if (!validPassword) {
        res.status(401).send("Incorrect password");
      } else {
        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });
        res.json({ token });
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

authRoutes.get("/guest", (req, res) => {
  const payload = { guest: true };
  const secret = `${process.env.JWT_SECRET}`;
  const options = { expiresIn: "15m" }; // O token expira após 15 minutos

  const token = jwt.sign(payload, secret, options);

  res.json({ token });
});

export default authRoutes;
