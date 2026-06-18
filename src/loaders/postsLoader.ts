import axios from "axios";

export async function postsLoader({ request }: { request: Request }) {
  try {
    const postsPromise = axios.get("/api/grab-posts", {
      signal: request.signal
    });

    const usersPromise = axios.get("/api/grab-users", {
      signal: request.signal
    });

    const [posts, users] = await Promise.all([postsPromise, usersPromise]);
    
    return { posts: posts.data, users: users.data };
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
