import express from "express";
import {getUser,getUserFriends,addRemoveFriend, allusers, finduserbyname, signaleuser, deleteuser} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// get all users
router.get("/allusers",  allusers);
router.post("/finduser",  finduserbyname);
/* READ */
router.delete("/delete/:id", verifyToken, deleteuser);
router.get("/:id", verifyToken, getUser);
router.post("/:id/signle", verifyToken, signaleuser);
router.get("/:id/friends", verifyToken, getUserFriends);
/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;