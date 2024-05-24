import React from "react";
import "./Home.css";
import Topbar from "../../Components/Topbar/Topbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Timeline from "../../Components/Timeline/Timeline";
import Rightbar from "../../Components/Rightbar/Rightbar";

const Home = () => {
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Timeline />
        {/* Profileコンポーネントようにプロップスを記述していないため、Homeコンポーネントがレンダリングされたときは、Rightbarコンポーネントにundefinedを渡す */}
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;
