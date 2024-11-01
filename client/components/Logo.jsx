import Link from "next/link";
import React from "react";
import { RiKakaoTalkFill } from "react-icons/ri";

const Logo = () => {
  return (
    <Link
      href="/"
      className="text-2xl font-bold text-foreground  transition-all hover:scale-105 flex gap-1 justify-center items-center"
    >
      <RiKakaoTalkFill className="w-7 h-7" />
      Talkrr
    </Link>
  );
};

export default Logo;
