import express from "express";
import { login, createUser, getAllUsers, getById, updateUser, deleteUser } from "../controllers/user-controller";      // correct name
import { checkJwt } from "../middlware/checkJwt";
import { checkAdmin } from "../middlware/checkAdmin";

const userRouter = express.Router();

// Routes
userRouter.post("/create", createUser);
userRouter.post("/login", login);

userRouter.delete("/delete", checkJwt, checkAdmin, deleteUser);
userRouter.patch("/partial", checkJwt, updateUser);

// Admin routes
userRouter.get(
  "/getAllUsers",
  checkJwt,
  checkAdmin,
  getAllUsers,
  (req, res) => {
    res.json({ message: "welcome to Admin Panel" });
  }
);

userRouter.get(
  "/getById",
  checkJwt,
  checkAdmin,
  getById,
  (req, res) => {
    res.json({ message: "welcome to Admin Panel" });
  }
);

export default userRouter;
