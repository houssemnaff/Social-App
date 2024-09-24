import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// add comments to a post 
export const addcomments = async (req, res) => {
  try {
    const postId = req.params.idpost; // Assurez-vous que le nom de la propriété correspond au paramètre défini dans la route
    const post = await Post.findById(postId);
    const userComment = req.body;

    if (post) {
      await post.updateOne({ $push: { comments: userComment } });
      const updatedPost = await Post.findById(postId); // Récupérer le post mis à jour
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

//get all comments of one post
export const postcomments =async(req,res)=>{
  try{
    const  idpost= req.params.idpost;
const post= await Post.findById(idpost);
if(post){
    res.status(200).json(post.comments);
}
}catch(err){
    res.status(500).json(err);
}
}
// get allpost 
export const allpost =async(req,res)=>{
  try{
   
const post= await Post.find();
if(post){
    res.status(200).json(post);
}
}catch(err){
    res.status(500).json(err);
}
}
//delete
export const deletePost = async (req, res) => {
  try {
    const result = await Post.findByIdAndDelete(req.params.id); // Assurez-vous de passer req.params.id directement
    if (!result) {
      return res.status(404).json("post not found");
    }
    res.status(200).json("post deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

