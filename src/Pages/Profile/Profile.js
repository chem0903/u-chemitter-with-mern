import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Profile.css";
import Timeline from "../../Components/Timeline/Timeline";
import Rightbar from "../../Components/Rightbar/Rightbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  // アドレスバーのパラメータを取得できる
  const username = useParams().username;

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://u-chemitter-with-mern-in-backend.onrender.com/api/users?username=${username}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user.coverPicture ? PUBLIC_FOLDER + user.coverPicture : `${PUBLIC_FOLDER}/grey.jpg`} alt="" className="profileCoverImg" />
              <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : `${PUBLIC_FOLDER}/noAvatar.png`} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDescription">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Timeline username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
