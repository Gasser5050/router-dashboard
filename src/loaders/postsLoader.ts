import axios from "axios";

export async function postsLoader({ request }: { request: Request }) {
  try {
    const response = await axios.get("/api/grab-posts", {
      signal: request.signal
    });
    return response.data;
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
