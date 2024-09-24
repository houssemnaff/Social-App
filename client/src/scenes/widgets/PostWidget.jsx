import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, TextField, Button } from "@mui/material";import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost} from "state";
import { fetchPosts} from "state/state";
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });

        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
     
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };










  const addComment = async () => {
    try {
      if (newComment.trim() === "") return;
  
      // Récupération des informations de l'utilisateur qui a ajouté le commentaire
      const userResponse = await fetch(`http://localhost:3001/users/${loggedInUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await userResponse.json();
  
      // Obtention de l'URL de l'image de profil de l'utilisateur depuis userData.picturePath
      const userPicturePath = userData.picturePath;
  
      // Envoi de la requête pour ajouter le commentaire avec les informations de l'utilisateur
      const response = await fetch(`http://localhost:3001/posts/${postId}/addcomments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          desc: newComment,
          userPicturePath: userPicturePath, // Utilisation de l'URL de l'image de profil de l'utilisateur
        }),
      });
  
      if (response.ok) {
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setNewComment(""); // Effacer le champ de commentaire
      } else {
        throw new Error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  
  
  
  
  const showAllPosts = () => {
    dispatch(fetchPosts({ token }));
  };



  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <IconButton>
            <ShareOutlined />
          </IconButton>
          <IconButton onClick={showAllPosts}>
            <VisibilityOutlined />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
         {comments.map((comment, i) => (
  <Box key={`${name}-${i}`}>
    <Divider />
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
   
      <img src= {`http://localhost:3001/assets/${comment.userPicturePath}`} alt="" style={{ width: 30, height: 30, borderRadius: '50%', marginRight: '0.5rem' }} />
      <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
        {comment.desc}
      </Typography>
    </Box>
  </Box>
))}

          <Divider />
          <Box mt="0.5rem" display="flex" alignItems="center">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addComment}
              sx={{ ml: "1rem" }}
            >
              Comment
            </Button>
          </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
