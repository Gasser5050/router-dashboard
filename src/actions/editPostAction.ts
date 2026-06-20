import { redirect, type ActionFunctionArgs } from "react-router-dom";
import type { Post } from "../types/Types";

export async function editPostAction({ request, params }: ActionFunctionArgs) {
  const { postId } = params;
  if (!postId) throw new Response("Post ID Missing", { status: 400 });

  const formData = await request.formData();

  const title = formData.get("title");
  if (!title || title === "" || typeof title !== "string")
    return "A Title is required";

  const author = formData.get("author");
  if (!author || author === "" || typeof author !== "string")
    return "A specific author is required";

  const body = formData.get("body");
  if (!body || body === "" || typeof body !== "string")
    return "A body is required";

  const localPosts: Post[] = JSON.parse(localStorage.getItem("POSTS") || "[]");

  localStorage.setItem(
    "POSTS",
    JSON.stringify(
      localPosts.map(post => {
        if (post.id.toString() === postId.toString()) {
          return {
            ...post,
            userId: Number(author),
            title,
            body
          };
        }
        return post;
      })
    )
  );

  return redirect(`/posts/${postId}`);
}
