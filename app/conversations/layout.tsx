import Sidebar from "@/components/Sidebar/Sidebar";
import getConversations from "@/actions/getConversations";
import ConversationList from "./components/ConversationList";
import getUsers from "@/hooks/getUsers";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
