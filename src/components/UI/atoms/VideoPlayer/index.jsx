import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { FaPlay, FaPause } from "react-icons/fa";
import cls from "./videoPlayer.module.scss";
import { cn } from "@/utils/lib";
import { FullScreenBtn } from "../icons";

const VideoPlayer = ({
    videoUrl,
    className = "",
    // setIsLarge,
    // isLarge=false
}) => {
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const togglePlayPause = () => {
        setPlaying(!playing);
    };

    const handleProgress = (state) => {
        setProgress(state.played);
        setCurrentTime(state.playedSeconds);
    };

    const handleSeek = (e) => {
        const seekTime = parseFloat(e.target.value) * duration;
        playerRef.current.seekTo(seekTime);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className={cn(cls.videoContainer, className)} onClick={togglePlayPause}>
            {!playing &&
                <span className={cls.playLarge}>
                    <FaPlay />
                </span>
            }
            <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                playing={playing}
                controls={false}
                width="100%"
                height="100%"
                onProgress={handleProgress}
                onDuration={setDuration}
            />
            <div className={cls.controls}>
                <button onClick={togglePlayPause} className={cls.playPause}>
                    {playing ? <FaPause /> : <FaPlay />}
                </button>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={progress}
                    onChange={handleSeek}
                    className={cls.progressBar}
                    style={{
                        background: `linear-gradient(to right, #1256db ${progress * 100}%, white ${progress * 100}%)`
                    }}
                />
                <span className={cls.FullScreen}
                //  onClick={() => setIsLarge(!isLarge)}
                >
                    <FullScreenBtn />
                </span>
                <span className={cls.time} style={{ color: "#fff" }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>

            </div>
        </div>
    );
};

export default VideoPlayer;
