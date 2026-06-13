import axios from "axios";
import type { Post } from "../types/Types";
import type { LoaderFunctionArgs } from "react-router-dom";

export async function postLoader({ request, params }: LoaderFunctionArgs) {
  const { postId } = params;

  try {
    const commentsPromise = axios.get("/api/grab-comments/", {
      signal: request.signal,
      params: {
        postId: postId
      }
    });

    const postPromise = axios.get("/api/grab-posts/", {
      signal: request.signal,
      params: {
        id: postId
      }
    });

    const [comments, post] = await Promise.all([commentsPromise, postPromise]);
    if (!comments.data)
      throw new Response("Comments Not Found", { status: 404 });
    if (!post.data || post.data.length === 0)
      throw new Response("Post Not Found", { status: 404 });

    const userId: Post["userId"] = post.data[0].userId;
    const user = await axios.get("/api/grab-users/", {
      signal: request.signal,
      params: {
        id: userId
      }
    });
    if (!user.data || user.data.length === 0)
      throw new Response("User Not Found", { status: 404 });

    return { comments: comments.data, post: post.data[0], user: user.data[0] };
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Fetch safely canceled mid-flight.");
      return;
    }
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error || "Could not connect to server.";
      const errorStatus = error.response?.status || 500;
      console.error(errorMessage);

      throw new Response(errorMessage, { status: errorStatus });
    } else {
      console.error("An unexpected application error occurred.");
      throw error;
    }
  }
}
