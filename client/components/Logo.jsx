import Link from "next/link";
import React from "react";
import { RiKakaoTalkFill } from "react-icons/ri";

const Logo = () => {
  return (
    <Link
      href="/"
      className="text-2xl font-bold text-foreground  transition-all hover:scale-105 flex gap-1 justify-center items-center"
    >
      <svg
        id="logo-38"
        width="50"
        height="25"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
          className="ccustom"
          fill="#8338ec"
        ></path>{" "}
        <path
          d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
          className="ccompli1"
          fill="#975aed"
        ></path>{" "}
        <path
          d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
          className="ccompli2"
          fill="#a16ee8"
        ></path>{" "}
      </svg>
      Talkrr
    </Link>
  );
};

export default Logo;
