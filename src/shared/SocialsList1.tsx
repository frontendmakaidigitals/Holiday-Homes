import { SocialType } from "@/shared/SocialsShare";
import React, { FC } from "react";

export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = [
  { name: "Facebook", icon: "lab la-facebook", href: "#" },
  { name: "Twitter", icon: "lab la-twitter", href: "#" },
  { name: "Youtube", icon: "lab la-youtube", href: "#" },
  { name: "Instagram", icon: "lab la-instagram", href: "#" },
];

const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-2.5" }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        href={item.href}
        className="flex p-1 bg-slate-200 hover:bg-slate-100 rounded-xl items-center text-4xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
        key={index}
      >
        <i className={item.icon}></i>
        
      </a>
    );
  };

  return (
    <div className={`nc-SocialsList1 w-full ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
