import { NavLink, useRouteLoaderData } from "react-router-dom";
import type { UserPage } from "../types/Types";
import Todos from "./Todos";
import PostsList from "./PostsList";

function UserInfo() {
  const userPage = useRouteLoaderData<UserPage>("user-loader");
  if (!userPage) return;

  const { user, posts, todos } = userPage;

  return (
    <>
      <h2 className="text-3xl lg:text-5xl font-bold mb-2 lg:mb-3">
        {user.name}
      </h2>
      <p className="text-lg lg:text-3xl mb-5">{user.email}</p>
      <>
        <p className="lg:text-2xl font-bold">
          Company:
          <span className="lg:text-xl ml-1 lg:ml-2 font-normal">
            {user.company.name}
          </span>
        </p>
        <p className="lg:text-2xl font-bold">
          Website:
          <span className="lg:text-xl ml-1 lg:ml-2 font-normal">
            {user.website}
          </span>
        </p>
        <p className="lg:text-2xl font-bold mb-5 md:mb-8">
          Address:
          <span className="lg:text-xl ml-1 lg:ml-2 font-normal">
            {user.address.street} {user.address.suite} {user.address.city}{" "}
            {user.address.zipcode}
          </span>
        </p>

        <h3 className="text-3xl font-bold mb-5">Posts</h3>
        <PostsList newPosts={posts} hideTitle />

        <h4 className="text-3xl font-bold mb-5">Todos</h4>
        <Todos newTodos={todos} hideTitle />

        <p className="mb-8"></p>
        <NavLink
          to={".."}
          className={"bg-white border px-2 py-3 rounded-lg hover:bg-white/10"}
        >
          Back to Users
        </NavLink>
      </>
    </>
  );
}

export default UserInfo;
