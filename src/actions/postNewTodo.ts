import axios from "axios";
import type { Todo } from "../types/Types";
import { redirect } from "react-router-dom";

export async function postNewTodo({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title");

  if (!title || title === "" || typeof title !== "string")
    return "Title must be a string";

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    userId: 1
  };

  try {
    const response = await axios.post("/api/post-todo", newTodo, {
      signal: request.signal
    });

    const localTodos = JSON.parse(localStorage.getItem("TODOS") || "[]");
    localStorage.setItem(
      "TODOS",
      JSON.stringify([...localTodos, { ...response.data, id: newTodo.id }])
    );

    return redirect("/todos");
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
