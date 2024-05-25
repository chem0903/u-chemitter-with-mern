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

  const [profileCover, setProfileCover] = useState(null);
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    (async () => {
      const reqData = PUBLIC_FOLDER + profileCover;
      console.log(profileCover);
      if (profileCover) {
        await axios.put(`https://u-chemitter-with-mern-in-backend.onrender.com/api/users/${user._id}`, {
          coverPicture: reqData,
        });
      }
    })();
  }, [profileCover]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <label className="profileCover">
              <img src={user.coverPicture ? PUBLIC_FOLDER + user.coverPicture : `${PUBLIC_FOLDER}/grey.jpg`} alt="" className="profileCoverImg" />
              <input
                id="profileCoverImg"
                type="file"
                accept=".png, .jpeg, .jpg"
                style={{ display: "none" }}
                onChange={(e) => {
                  setProfileCover(e.target.files[0].name);
                }}
              />
              <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : `${PUBLIC_FOLDER}/noAvatar.png`} alt="" className="profileUserImg" />
              <input
                id="profileUserImg"
                type="file"
                accept=".png, .jpeg, .jpg"
                style={{ display: "none" }}
                onChange={(e) => {
                  // setProfileUser(e.target.files[0]);
                  // handleNewProfileUser(e);
                }} // ファイルが選択された（onChangeした）ときに発火。選択されたファイルの情報は上記のようにして取り出せる。
              />
            </label>
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
