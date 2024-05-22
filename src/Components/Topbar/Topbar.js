import React from "react";
import "./Topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import { Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Topbar = () => {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none", color: "black" }} >
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
                    <img src="/assets/assets/person/1.jpeg" alt="" className="topbarImg" />
                </div>
            </div>
        </div>
    );
};

export default Topbar;
