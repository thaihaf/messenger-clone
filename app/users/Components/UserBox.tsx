import Avatar from "@/components/Avatars/Avatar";
import LoadingModal from "@/components/Modals/LoadingModal";
import { EndPoint } from "@/constants/endpoints";
import { Paths } from "@/constants/paths";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

interface UserBoxProps {
  data: User;
}
export default function UserBox({ data }: UserBoxProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post(EndPoint.CONVERSATIONS, {
        userId: data.id,
      })
      .then((data) => {
        router.push(`${Paths.CONVERSATIONS}/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data.id, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="
    w-full
    relative
    flex
    items-center
    space-x-3
    bg-white
    p-3
    hover:bg-neutral-100
    rounded-lg
    transition
    cursor-pointer
  "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div
              className="
          flex
          justify-between
          items-center
          mb-1
          "
            >
              <p
                className="
            text-sm
            font-medium
            text-gray-900
            "
              >
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
