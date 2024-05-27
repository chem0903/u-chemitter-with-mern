import React from "react";

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

const Friend = ({ user }) => {
  return (
    <li className="sidebarFriend">
      <img src={PUBLIC_FOLDER + user.profilePicture} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default Friend;
