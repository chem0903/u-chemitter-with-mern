import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../State/AuthContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [postUser, setPostUser] = useState({});

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://u-chemitter-with-mern-in-backend.onrender.com/api/users?userId=${post.userId}`);
      setPostUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const handleLike = async () => {
    try {
      await axios.put(`https://u-chemitter-with-mern-in-backend.onrender.com/api/posts/${post._id}/like`, { userId: user._id });
      const res = await axios.get(`https://u-chemitter-with-mern-in-backend.onrender.com/api/posts/${post._id}`);
      setLike(res.data.likes.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${postUser.username}`} style={{ textDecoration: "none", color: "black" }}>
              <img src={postUser.profilePicture ? PUBLIC_FOLDER + postUser.profilePicture : `${PUBLIC_FOLDER}/noAvatar.png`} alt="" className="postProfileImg" />
            </Link>
            <span className="postUsername">{postUser.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          <img src={PUBLIC_FOLDER + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src={PUBLIC_FOLDER + "/heart.png"} alt="" className="likeIcon" onClick={handleLike} />
            <span className="postLikeCounter">{like}人がいいねしました</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
