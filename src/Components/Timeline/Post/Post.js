import React, { useEffect, useState } from "react";
import "./Post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";


const Post = ({ post }) => {
    // const postUser = Users.filter(user => user.id === post.id);
    const [like, setLike] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [])

    const handleLike = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    return <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src={user.profilePicture || `${PUBLIC_FOLDER}/noAvatar.png`} alt="" className="postProfileImg" />
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{post?.date}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post.description}</span>
                <img src={post.img} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={PUBLIC_FOLDER + "/heart.png"} alt="" className="likeIcon" onClick={handleLike} />
                    <span className="postLikeCounter">{post.likes.length}人がいいねしました</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment}</span>
                </div>
            </div>
        </div>
    </div>;
};

export default Post;
