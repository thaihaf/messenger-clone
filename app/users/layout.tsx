import Sidebar from "@/components/Sidebar/Sidebar";
import getUsers from "@/hooks/getUsers";
import UserList from "./Components/UserList";

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
