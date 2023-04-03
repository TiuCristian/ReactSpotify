import React, { useState, useRef, useEffect } from "react";
import "../Styles/MusicPlayer.css";
import {
  FaRegHeart,
  FaHeart,
  FaStepBackward,
  FaBackward,
  FaPlay,
  FaPause,
  FaForward,
  FaStepForward,
  FaShareAlt,
} from "react-icons/fa";
import { BsDownload } from "react-icons/bs";

function MusicPLayer({ song }) {
  const [isLove, setLoved] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    let seconds = Math.floor(audioPlayer.current.duration);
    seconds = isNaN(seconds) ? 0 : seconds;
    setDuration(seconds);
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const changePlayPause = () => {
    setPlaying(!isPlaying);
    const prevValue = isPlaying;
    if (!prevValue) {
      animationRef.current = requestAnimationFrame(whilePlaying);
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }

    setPlaying(!prevValue);
  };

  const calculateTime = (sec) => {
    console.log(sec, isNaN(sec));
    sec = isNaN(sec) ? 0 : sec;
    const minutes = Math.floor(sec / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${returnMin}:${returnSec}`;
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changeCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeProgress = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changeCurrentTime();
  };

  const changeCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--player-played",
      `${progressBar.current.value}%`
    );
    console.log(progressBar.current.value, duration);

    setCurrentTime((progressBar.current.value / 100) * duration);
  };

  const changeLoved = () => {
    setLoved(!isLove);
  };

  return (
    <div className="musicPlayer">
      <div className="songImage">
        <img src={song.imgSrc} alt="" />
      </div>
      <div className="songAttributes">
        <audio src={song.song} preload="metadata" ref={audioPlayer} />
        <div className="top">
          <div className="left">
            <div className="loved" onClick={changeLoved}>
              {isLove ? (
                <i>
                  <FaHeart />
                </i>
              ) : (
                <i>
                  <FaRegHeart />
                </i>
              )}
            </div>
            <div className="download">
              <i>
                <BsDownload />
              </i>
            </div>
          </div>
          <div className="middle">
            <div className="back">
              <i>
                <FaStepBackward />
              </i>
              <i>
                <FaBackward />
              </i>
            </div>
            <div className="playPause" onClick={changePlayPause}>
              {isPlaying ? (
                <i>
                  <FaPause />
                </i>
              ) : (
                <i>
                  <FaPlay />
                </i>
              )}
            </div>
            <div className="forward">
              <i>
                <FaForward />
              </i>
              <i>
                <FaStepForward />
              </i>
            </div>
          </div>
          <div className="right">
            <i>
              <FaShareAlt />
            </i>
          </div>
        </div>
        <div className="bottom">
          <div className="currentTime">{calculateTime(currentTime)}</div>
          <input
            type="range"
            className="progressBar"
            ref={progressBar}
            onChange={changeProgress}
          />
          <div className="duration">
            {/* {duration && !isNaN(duration) && calculateTime(duration)
              ? duration && !isNaN(duration) && calculateTime(duration)
              : "00:00"} */}

            {calculateTime(duration)}
          </div>
        </div>
      </div>
    </div>
  );
}

export { MusicPLayer };
