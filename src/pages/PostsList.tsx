import { useRouteLoaderData } from "react-router-dom";
import type { Post } from "../types/Types";
import PostCard from "../components/PostCard";

function PostsList({
  newPosts,
  hideTitle = false
}: {
  newPosts?: Post[];
  hideTitle?: boolean;
}) {
  const posts = useRouteLoaderData<Post[]>("posts-loader") || newPosts;
  if (!posts) return;

  return (
    <>
      {!hideTitle && (
        <h1 className="text-5xl font-bold mb-12 text-[hsl(200,100%,10%)] tracking-tight">
          Posts
        </h1>
      )}

      <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-7 lg:mb-10">
        {posts.map((post: Post) => {
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
