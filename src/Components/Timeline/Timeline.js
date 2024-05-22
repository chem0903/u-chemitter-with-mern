import React, { useEffect, useState } from "react";
import "./Timeline.css"
import Share from "./Share/Share";
import Post from "./Post/Post";
import axios from "axios";

const Timeline = () => {
    const [posts, setPosts] = useState([]);

    // ! useEffectの第一引数の関数にasyncは直接つけられない！（useEffectのなかで関数を定義する必要がある）
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/posts/timeline/664bfbd9b3f96dac2c3961cb")
            setPosts(res.data);
        }
        fetchPosts();
    }, [])


    return (
        <div className="timeline">
            <div className="timelineWrapper">
                <Share />
                {posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
};

export default Timeline;
