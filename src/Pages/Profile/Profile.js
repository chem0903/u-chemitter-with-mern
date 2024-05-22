import React from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Profile.css"
import Timeline from "../../Components/Timeline/Timeline";
import Rightbar from "../../Components/Rightbar/Rightbar";

const Profile = () => {
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src="./assets/assets/post/3.jpeg" alt="" className="profileCoverImg" />
                            <img src="./assets/assets/person/1.jpeg" alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Yoimiya</h4>
                            <span className="profileInfoDescription">Neetです</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Timeline />
                        {/* 以下のようにプロップスを記述すると、Profileコンポーネントがレンダリングされたときは、Rightbarコンポーネントにtrueを渡す */}
                        <Rightbar profile />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;