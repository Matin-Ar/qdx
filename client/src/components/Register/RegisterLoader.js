import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import registerLoaderSVG from "../../assets/registerloader.json";
import DoneLoaderSVG from "../../assets/done.json";

function RegisterLoader({ isLoadFinished }) {
  return (
    <div className="register_loader">
      {!isLoadFinished && (
        <Player
          autoplay
          loop
          src={registerLoaderSVG}
          style={{ height: "300px", width: "300px" }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      )}

      {isLoadFinished && (
        <Player
          autoplay
          src={DoneLoaderSVG}
          style={{ height: "300px", width: "300px" }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      )}

      <h1 style={{ color: "white" }}> در حال بررسی پروفایل های کاربری</h1>
    </div>
  );
}

export default RegisterLoader;
