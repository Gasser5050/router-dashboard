import axios from "axios";
import type { Post } from "../types/Types";
import { redirect } from "react-router-dom";

export async function postNewPost({ request }: { request: Request }) {
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

  const uniqueId = crypto.randomUUID();
  const newPost: Post = {
    id: uniqueId,
    userId: Number(author),
    title,
    body
  };

  try {
    const response = await axios.post("/api/post-post", newPost, {
      signal: request.signal
    });

    const localPosts = JSON.parse(localStorage.getItem("POSTS") || "[]");

    localStorage.setItem(
      "POSTS",
      JSON.stringify([...localPosts, response.data])
    );

    return redirect(`/posts/${uniqueId}`);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Submission safely canceled mid-flight.");
      return;
    }
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error || "Could not connect to server.";
      const errorStatus = error.response?.status || 500;
      console.error(errorMessage);

      return { error: errorMessage, status: errorStatus };
    }
    console.error("An unexpected application error occurred.");
    return { error: "An unexpected application error occurred.", status: 500 };
  }
}
