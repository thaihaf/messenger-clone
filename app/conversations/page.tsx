"use client";

import EmptyState from "@/components/EmptyState/EmptyState";
import useConversation from "@/hooks/useConversations";
import clsx from "clsx";
import React from "react";

export default function Home() {
  const { isOpen } = useConversation();
  
  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
}
