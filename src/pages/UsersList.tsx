import { useRouteLoaderData } from "react-router-dom";
import type { User } from "../types/Types";
import UserCard from "../components/UserCard";

function UsersList() {
  const users = useRouteLoaderData<User[]>("users-loader");
  if (!users) return;

  return (
    <>
      <h1 className="font-bold text-4xl lg:text-5xl mb-10 text-[hsl(200,100%,10%)] tracking-tight">
        Users
      </h1>

      <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((user: User) => {
          return (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default UsersList;
