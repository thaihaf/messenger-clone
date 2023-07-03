import Sidebar from "@/components/Sidebar/Sidebar";
import UserList from "./Components/UserList";
import getUsers from "@/hooks/getUsers";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <Sidebar>
      <UserList items={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
