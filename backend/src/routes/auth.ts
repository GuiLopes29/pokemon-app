import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db";

const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );
    res.status(201).send("User created");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (user.rows.length > 0) {
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (!validPassword) {
        res.status(401).send("Incorrect password");
      } else {
        const token = jwt.sign(
          { id: user.rows[0].id },
          process.env.JWT_SECRET!,
          {
            expiresIn: "1h",
          }
        );
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

export default authRoutes;
