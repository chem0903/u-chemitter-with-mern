import React from "react";
import "./Timeline.css"
import Share from "./Share/Share";
import Post from "./Post/Post";
import { Posts } from "../../dummyData";

const Timeline = () => {
    return (
        <div className="timeline">
            <div className="timelineWrapper">
                <Share />
                {Posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}

            </div>
        </div>
    );
};

export default Timeline;
