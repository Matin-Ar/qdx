import React from "react";
import HoverImage from "react-hover-image";
import whatsappImg from "../assets/social/whatsapp.png";
import whatsappColorImg from "../assets/social/whatsapp-color.png";
import tgImg from "../assets/social/tg.png";
import tgColorImg from "../assets/social/tg-color.png";
import githubImg from "../assets/social/github.png";
import githubColorImg from "../assets/social/github-color.png";
import igImg from "../assets/social/ig.png";
import igColorImg from "../assets/social/ig-color.png";
import twitterImg from "../assets/social/twitter.png";
import twitterColorImg from "../assets/social/twitter-color.png";

export default function Social() {
  return (
    <div className="social-wrapper">
      <p>شبکه های اجتماعی</p>
      <div className="social-icons">
        <HoverImage src={whatsappImg} hoverSrc={whatsappColorImg} />
        <HoverImage src={tgImg} hoverSrc={tgColorImg} />
        <HoverImage src={igImg} hoverSrc={igColorImg} />
        <HoverImage src={twitterImg} hoverSrc={twitterColorImg} />
        <HoverImage src={githubImg} hoverSrc={githubColorImg} />
      </div>
    </div>
  );
}
