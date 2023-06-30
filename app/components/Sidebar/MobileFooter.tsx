"use client";

import useConversation from "@/hooks/useConversations";
import useRoutes from "@/hooks/useRoutes";
import React from "react";
import MobileItem from "./MobileItem";

export default function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }
  return (
    <div
      className="fixed
  justify-center
  w-full
  bottom-0
  z-40
  flex
  items-center
  bg-white
  border-t-[1px]
  lg:hidden
  "
    >
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
}
