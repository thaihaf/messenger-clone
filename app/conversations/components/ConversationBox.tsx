import Avatar from "@/components/Avatar/Avatar";
import { Paths } from "@/constants/paths";
import { FullConversationType } from "@/constants/types";
import useOtherUser from "@/hooks/useOtherUser";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import React, { useCallback, useMemo } from "react";

interface ConversationBoxProps {
  data: FullConversationType;
  selected: boolean;
}
export default function ConversationBox({
  data,
  selected,
}: ConversationBoxProps) {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`${Paths.CONVERSATIONS}/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) return false;

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Seen an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started an conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
  w-full
  mb-3
  relative
  flex
  items-center
  space-x-3
  hover:bg-neutral-100
  rounded-lg
  transition
  cursor-pointer
  `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar user={otherUser} />

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="flex
          justify-between
          items-center
          mb-1
          "
          >
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser?.name}
            </p>

            {lastMessage?.createdAt && (
              <p
                className="
              text-sm
              text-gray-400
              font-light
              "
              >
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `
          truncate
          text-sm
          `,
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
}
