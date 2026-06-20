import axios from "axios";
import type { Comment, Post, User } from "../types/Types";
import type { LoaderFunctionArgs } from "react-router-dom";

export async function postLoader({ request, params }: LoaderFunctionArgs) {
  const { postId } = params;
  if (!postId) throw new Response("Post ID Missing", { status: 400 });

  const localPosts = localStorage.getItem("POSTS");
  const parsedPosts: Post[] = JSON.parse(localPosts || "[]");
  const currentPost: Post | undefined = parsedPosts.find(
    p => p.id.toString() === postId.toString()
  );

  if (currentPost) {
    if (isNaN(Number(currentPost.id))) {
      try {
        const user = await axios.get<User[]>("/api/grab-users/", {
          signal: request.signal,
          params: {
            id: currentPost?.userId
          }
        });

        return {
          comments: [],
          post: currentPost,
          user: user.data[0]
        };
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
    } else {
      try {
        const commentsPromise = axios.get<Comment[]>("/api/grab-comments/", {
          signal: request.signal,
          params: {
            postId: currentPost.id
          }
        });

        const userPromise = axios.get<User[]>("/api/grab-users/", {
          signal: request.signal,
          params: {
            id: currentPost.userId
          }
        });

        const [comments, user] = await Promise.all([
          commentsPromise,
          userPromise
        ]);

        if (!comments.data)
          throw new Response("Comments Not Found", { status: 404 });
        if (!user.data || user.data.length === 0)
          throw new Response("Post Not Found", { status: 404 });

        return {
          comments: comments.data,
          post: currentPost,
          user: user.data[0]
        };
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
  }
}
