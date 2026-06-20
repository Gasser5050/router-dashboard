import {
  Form,
  NavLink,
  useRouteLoaderData,
  useSearchParams
} from "react-router-dom";
import type { Post, User } from "../types/Types";
import PostCard from "../components/PostCard";

function PostsList({
  newPosts,
  hideTitle = false
}: {
  newPosts?: Post[];
  hideTitle?: boolean;
}) {
  const loader: { posts: Post[]; users: User[] } | undefined =
    useRouteLoaderData("posts-loader");

  const posts = loader?.posts || newPosts;
  const users = loader?.users;

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const author = searchParams.get("author") || "";

  const localPosts = localStorage.getItem("POSTS");
  if (!newPosts && !localPosts && posts) {
    localStorage.setItem("POSTS", JSON.stringify(posts));
  }
  const storedPosts = newPosts
    ? newPosts
    : JSON.parse(localPosts || JSON.stringify(posts));

  const filteredPosts = storedPosts.filter((post: Post) => {
    return (
      post.title.toLowerCase().includes(query) &&
      (author === "" || post.userId.toString() === author)
    );
  });

  if (!filteredPosts) return;

  return (
    <>
      {!hideTitle && (
        <>
          <div className="flex justify-between mb-5 lg:mb-7">
            <h1 className="text-4xl lg:text-5xl font-bold text-[hsl(200,100%,10%)] tracking-tight">
              Posts
            </h1>

            <NavLink
              to={"new"}
              className={
                "text-xl border p-2 text-[hsl(200,20%,95%)] bg-[hsl(200,100%,20%)] hover:scale-105 rounded-lg h-fit"
              }
            >
              New
            </NavLink>
          </div>
          <Form className="flex flex-col md:flex-row justify-center items-center md:items-end space-y-3 md:space-y-0 md:space-x-2 lg:space-x-4 mb-5">
            <div className="flex flex-col w-full md:grow">
              <label htmlFor="query">Query</label>
              <input
                id="query"
                name="query"
                type="search"
                defaultValue={query}
                key={query}
                autoFocus
                className="border bg-white px-2 py-1 rounded-lg"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/3">
              <label htmlFor="author">Author</label>
              <select
                id="author"
                name="author"
                defaultValue={author}
                key={author}
                className="border bg-white px-2 py-1 rounded-lg"
              >
                <option value="">Any</option>
                {users?.map(user => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="text-lg border px-2 py-1 text-[hsl(200,20%,95%)] bg-[hsl(200,100%,20%)] hover:scale-105 rounded-lg h-fit cursor-pointer">
              Filter
            </button>
          </Form>
        </>
      )}

      <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-7 lg:mb-10">
        {filteredPosts.map((post: Post) => {
          return (
            <li key={post.id} className="h-full flex">
              <PostCard post={post} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default PostsList;
