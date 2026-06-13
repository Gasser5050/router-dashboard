import axios from "axios";
import type { LoaderFunctionArgs } from "react-router-dom";

export async function userLoader({ request, params }: LoaderFunctionArgs) {
  const { userId } = params;

  try {
    const userPromise = axios.get("/api/grab-users/", {
      signal: request.signal,
      params: {
        id: userId
      }
    });

    const postsPromise = axios.get("/api/grab-posts/", {
      signal: request.signal,
      params: {
        userId: userId
      }
    });

    const todosPromise = axios.get("/api/grab-todos/", {
      signal: request.signal,
      params: {
        userId: userId
      }
    });

    const [user, posts, todos] = await Promise.all([
      userPromise,
      postsPromise,
      todosPromise
    ]);

    if (!user.data || user.data.length === 0)
      throw new Response("User Not Found", { status: 404 });
    if (!posts.data) throw new Response("Posts Not Found", { status: 404 });
    if (!todos.data) throw new Response("Todos Not Found", { status: 404 });

    return { user: user.data[0], posts: posts.data, todos: todos.data };
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
