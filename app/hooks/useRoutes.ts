import { usePathname } from "next/navigation";
import useConversation from "./useConversations";
import { Paths } from "@/constants/paths";
import { signOut } from "next-auth/react";
import { HiChat } from "react-icons/hi";
import { HiUser, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useMemo } from "react";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: Paths.CONVERSATIONS,
        icon: HiChat,
        action: pathname === Paths.CONVERSATIONS || !!conversationId,
      },
      {
        label: "User",
        href: Paths.USERS,
        icon: HiUser,
        action: pathname === Paths.USERS,
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [conversationId, pathname]
  );

  return routes;
};

export default useRoutes;
