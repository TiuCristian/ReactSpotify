// import React, {useEffect} from 'react';
import React, { useState } from "react";
import "../Styles/MainContainer.css";
import { Banner } from "./Banner";
import { FaUsers } from "react-icons/fa";
import { AudioList } from "./AudioList";

function MainContainer() {
  const [handleItem, setHandleItem] = useState("");
  //   useEffect(() => {
  //     const allLi = document.querySelector(".menuList").querySelectorAll("li");

  //     function changeMenuActive(){
  //         allLi.forEach((n) => n.classList.remove('active') );
  //         this.classList.add('active');
  //     }

  //     allLi.forEach( n => n.addEventListener('click', changeMenuActive))
  // }, []);

  const clickMenu = (item) => {
    setHandleItem(item);
  };

  return (
    <div className="mainContainer">
      <Banner />

      <div className="menuList">
        <ul>
          <li
            className={handleItem == "Popular" ? "active" : ""}
            onClick={(e) => {
              clickMenu("Popular");
            }}
          >
            <a href="#">Popular</a>
          </li>
          <li
            className={handleItem == "Albums" ? "active" : ""}
            onClick={(e) => {
              clickMenu("Albums");
            }}
          >
            <a href="#">Albums</a>
          </li>
          <li
            className={handleItem == "Songs" ? "active" : ""}
            onClick={(e) => {
              clickMenu("Songs");
            }}
          >
            <a href="#">Songs</a>
          </li>
          <li
            className={handleItem == "Fans" ? "active" : ""}
            onClick={(e) => {
              clickMenu("Fans");
            }}
          >
            <a href="#">Fans</a>
          </li>
          <li
            className={handleItem == "About" ? "active" : ""}
            onClick={(e) => {
              clickMenu("About");
            }}
          >
            <a href="#">About</a>
          </li>
        </ul>

        <p>
          <i>
            <FaUsers />
          </i>{" "}
          12.3M <span>Followers</span>
        </p>
      </div>

      <AudioList />
    </div>
  );
}

export { MainContainer };
