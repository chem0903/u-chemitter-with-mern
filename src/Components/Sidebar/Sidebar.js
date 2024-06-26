import React, { useContext } from "react";
import "./Sidebar.css";
import { Bookmark, Home, MessageRounded, Notifications, Person, Search } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Users } from "../../dummyData";
import Friend from "./Friend/Friend";
import { Link } from "react-router-dom";
import { AuthContext } from "../../State/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <li className="sidebarListItem">
              <Home className="sidebarIcon" />

              <span className="sidebarListItemText">ホーム</span>
            </li>
          </Link>
          <li className="sidebarListItem">
            <Search className="sidebarIcon" />
            <span className="sidebarListItemText">検索</span>
          </li>
          <li className="sidebarListItem">
            <Notifications className="sidebarIcon" />
            <span className="sidebarListItemText">通知</span>
          </li>
          <li className="sidebarListItem">
            <MessageRounded className="sidebarIcon" />
            <span className="sidebarListItemText">メッセージ</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">ブックマーク</span>
          </li>
          <Link to={`/profile/${user.username}`} style={{ textDecoration: "none", color: "black" }}>
            <li className="sidebarListItem">
              <Person className="sidebarIcon" />
              <span className="sidebarListItemText">プロフィール</span>
            </li>
          </Link>
          <li className="sidebarListItem">
            <SettingsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">設定</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendsList">
          {Users.map((user) => (
            <Friend user={user} key={user.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
