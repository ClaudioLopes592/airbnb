import { Router } from "express";
import { connectDb } from "../../config/db.js";
import User from "./model.js";
import bcrypt from "bcryptjs";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync()

router.get("/", async (request, response) => {
  connectDb();
  try {
    const userDoc = await User.find();
    response.json(userDoc);
  } catch (error) {
    response.status(404).json(error);
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
    response.json(newUserDoc);
  } catch (error) {
    response.status(500).json(error);
  }
});

export default router;
