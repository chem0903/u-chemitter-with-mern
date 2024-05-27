import React from "react";

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

const Oline = ({ user }) => {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img src={PUBLIC_FOLDER + user.profilePicture} alt="" className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
};

export default Oline;
