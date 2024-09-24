import express from "express";
import { addcomments, allpost, deletePost, getFeedPosts, getUserPosts, likePost, postcomments } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/allpost", verifyToken, allpost);

router.get("/:userId/posts", verifyToken, getUserPosts);
router.delete("/delete/:id", verifyToken, deletePost);
// get postcomments
router.get("/:idpost/getcomments", verifyToken, postcomments);
//add comments
router.post("/:idpost/addcomments", verifyToken, addcomments);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;