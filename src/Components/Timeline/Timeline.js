import React, { useContext, useEffect, useState } from "react";
import "./Timeline.css";
import Share from "./Share/Share";
import Post from "./Post/Post";
import axios from "axios";
import { AuthContext } from "../../State/AuthContext";

const Timeline = ({ username }) => {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  // ! useEffectの第一引数の関数にasyncは直接つけられない！（useEffectのなかで関数を定義する必要がある）
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`https://u-chemitter-with-mern-in-backend.onrender.com/api/posts/profile/${username}`) // * プロフィール画面での投稿（その人のみの投稿）。
        : await axios.get(`https://u-chemitter-with-mern-in-backend.onrender.com/api/posts/timeline/${user._id}`); // * ホーム画面での投稿（自分とフォローしている人の投稿）。
      // setPosts(res.data);
      // 投稿を時系列で並び替えるための記述。
      setPosts(
        res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
