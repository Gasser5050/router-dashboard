import { NavLink, useRouteLoaderData } from "react-router-dom";
import type { PostPage } from "../types/Types";

function PostInfo() {
  const pageData = useRouteLoaderData<PostPage>("post-loader");
  if (!pageData) return;

  const { comments, post, user } = pageData;
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-5">{post.title}</h1>
      <h2 className="text-2xl mb-6">
        By:{" "}
        <NavLink to={`/users/${user.id}`} className={"text-red-500"}>
          {user.name}
        </NavLink>
      </h2>
      <p className="text-xl md:text-2xl lg:text-3xl">{post.body}</p>
      <h3 className="font-bold text-3xl mt-6 mb-4 md:mb-6">Comments</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8">
        {comments.map(comment => {
          return (
            <li
              key={comment.id}
              className="bg-white border px-4 md:px-8 py-6 md:py-8 space-y-3 md:space-y-5 rounded-lg"
            >
              <p className="text-lg underline underline-offset-3">
                {comment.email}
              </p>
              <p className="text-2xl">{comment.body}</p>
            </li>
          );
        })}
      </ul>
      <NavLink
        to={".."}
        className={"bg-white border px-2 py-3 rounded-lg hover:bg-white/10"}
      >
        Back to Posts
      </NavLink>
    </>
  );
}

export default PostInfo;
