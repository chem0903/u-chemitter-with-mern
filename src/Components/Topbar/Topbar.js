import React, { useContext } from "react";
import "./Topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../State/AuthContext";

const Topbar = () => {
  const { user } = useContext(AuthContext);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/u-chemitter-with-mern";
  };

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <span className="logo">CHEMITTER</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input type="text" className="searchInput" placeholder="検索" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarItemIcons">
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">2</span>
          </div>
          <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : `${PUBLIC_FOLDER}/noAvatar.png`} alt="" className="topbarImg" onClick={logout} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
