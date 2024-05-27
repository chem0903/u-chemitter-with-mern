import React, { useContext, useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Profile.css";
import Timeline from "../../Components/Timeline/Timeline";
import Rightbar from "../../Components/Rightbar/Rightbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../State/AuthContext";

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
const SEVER_API = process.env.REACT_APP_SEVER_API;

const Profile = () => {
  // アドレスバーのパラメータを取得できる
  const profileUserName = useParams().username;

  const [profileUser, setProfileUser] = useState({});
  const { user } = useContext(AuthContext);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${SEVER_API}/users?username=${profileUserName}`);
      setProfileUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const [profileCoverPicture, setProfileCoverPicture] = useState(null);
  const [profileUserPicture, setProfileUserPicture] = useState(null);

  const saveFile = async (profilePicture) => {
    if (profilePicture) {
      const fileData = new FormData();
      const fileName = Date.now() + profilePicture.name;
      fileData.append("name", fileName);
      fileData.append("file", profilePicture);
      // fileData = { name: fileName, file: file } となっているイメージ。

      try {
        // 画像をbackendのpublic/imgフォルダに保存するためのリクエスト。
        await axios.post(`${SEVER_API}/upload`, fileData);
      } catch (err) {
        console.log(err);
      }
      return fileName;
    }
  };

  const changeProfileCoverPicture = async (profilePicture) => {
    if (profilePicture) {
      await axios.put(`${SEVER_API}/users/${profileUser._id}`, {
        userId: user._id,
        coverPicture: profilePicture,
      });
      fetchUser();
    }
  };

  const changeProfileUserPicture = async (profilePicture) => {
    if (profilePicture) {
      await axios.put(`${SEVER_API}/users/${profileUser._id}`, {
        userId: user._id,
        profilePicture: profilePicture,
      });
      fetchUser();
    }
  };

  // TODO プロフィールのユーザー画像を変えたときに、ShareとTopbarの画像がログインしなおさないと反映されない。

  useEffect(() => {
    (async function () {
      const pictureName = await saveFile(profileCoverPicture);
      console.log(pictureName);
      await changeProfileCoverPicture(pictureName);
    })();
  }, [profileCoverPicture]);

  useEffect(() => {
    (async function () {
      const pictureName = await saveFile(profileUserPicture);
      await changeProfileUserPicture(pictureName);
    })();
  }, [profileUserPicture]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <label htmlFor="profileCoverImg">
                <img src={profileUser.coverPicture ? PUBLIC_FOLDER + profileUser.coverPicture : `${PUBLIC_FOLDER}/grey.jpg`} alt="" className="profileCoverImg" />
                <input
                  id="profileCoverImg"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setProfileCoverPicture(e.target.files[0]);
                  }}
                />
              </label>
              <label htmlFor="profileUserImg">
                <img src={profileUser.profilePicture ? PUBLIC_FOLDER + profileUser.profilePicture : `${PUBLIC_FOLDER}/noAvatar.png`} alt="" className="profileUserImg" />
                <input
                  id="profileUserImg"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setProfileUserPicture(e.target.files[0]);
                  }} // ファイルが選択された（onChangeした）ときに発火。選択されたファイルの情報は上記のようにして取り出せる。
                />
              </label>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{profileUser.username}</h4>
              <span className="profileInfoDescription">{profileUser.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Timeline username={profileUserName} />
            <Rightbar user={profileUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
