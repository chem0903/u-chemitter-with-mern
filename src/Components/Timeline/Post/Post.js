import React, { useState } from "react";
import "./Post.css";
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../../dummyData";

const Post = ({ post }) => {
    const postUser = Users.filter(user => user.id === post.id);
    const [like, setLike] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    return <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src={postUser[0].profilePicture} alt="" className="postProfileImg" />
                    <span className="postUsername">{postUser[0].username}</span>
                    <span className="postDate">{post.date}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post.description}</span>
                <img src={post.photo} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src="./assets/assets/heart.png" alt="" className="likeIcon" onClick={handleLike} />
                    <span className="postLikeCounter">{like}人がいいねしました</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment}</span>
                </div>
            </div>
        </div>
    </div>;
};

export default Post;
