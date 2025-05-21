import "dotenv/config";
import { Router } from "express";
import { connectDb } from "../../config/db.js";
import User from "./model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();
const { JWT_SECRET_KEY } = process.env;

router.get("/", async (request, response) => {
  connectDb();
  try {
    const userDoc = await User.find();
    response.json(userDoc);
  } catch (error) {
    response.status(404).json(error);
  }
});

router.get("/profile", async (request, response) => {
  const { token } = request.cookies;
  if (token) {
    try {
      const userInfo = jwt.verify(token, JWT_SECRET_KEY);
      response.json(userInfo);
    } catch (error) {
      response.status(404).json(error);
    }
  } else {
    response.json(null);
  }
});

router.post("/", async (request, response) => {
  connectDb();
  const { name, email, password } = request.body;
  const encryptedPassword = bcrypt.hashSync(password, bcryptSalt);
  try {
    const newUserDoc = await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    const { _id } = newUserDoc;
    const newUserObj = { name, email, _id }
    const token = jwt.sign(newUserObj, JWT_SECRET_KEY);
    response.cookie("token", token).json(newUserObj);
    response.json(newUserObj);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.post("/login", async (request, response) => {
  connectDb();
  const { email, password } = request.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passwordCorrect = bcrypt.compareSync(password, userDoc.password);
      const { name, _id } = userDoc;
      if (passwordCorrect) {
        const newUserObj = { name, email, _id };
        const token = jwt.sign(newUserObj, JWT_SECRET_KEY);
        response.cookie("token", token).json(newUserObj);
      } else {
        response.status(400).json("Senha inválida!");
      }
    } else {
      response.status(400).json("Usuário não localizado!");
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

export default router;
