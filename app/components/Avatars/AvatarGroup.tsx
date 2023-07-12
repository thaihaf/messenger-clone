"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import defaultAvt from "public/image/avatar.jpg";

interface AvatarGroupProps {
  users?: User[];
}
export default function AvatarGroup({ users }: AvatarGroupProps) {
  const sliceUsers = users?.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };
  return (
    <div className="relative h-11 w-11">
      {sliceUsers?.map((user, index) => (
        <div
          key={user.id}
          className={`
      absolute
      inline-block
      rounded-full
      overflow-hidden
      h-[21px]
      w-[21px]
      ${positionMap[index as keyof typeof positionMap]}
      `}
        >
          <Image alt="Image" fill src={user?.image || defaultAvt} />
        </div>
      ))}
    </div>
  );
}
