import { useRouteLoaderData } from "react-router-dom";
import type { Todo } from "../types/Types";

function Todos({
  newTodos,
  hideTitle = false
}: {
  newTodos?: Todo[];
  hideTitle?: boolean;
}) {
  const todos = useRouteLoaderData<Todo[]>("todos-loader") || newTodos;
  if (!todos) return;

  return (
    <>
      {!hideTitle && (
        <h1 className="text-5xl font-bold mb-10 text-[hsl(200,100%,10%)] tracking-tight">
          Todos
        </h1>
      )}
      
      <ul className="flex flex-col space-y-2">
        {todos.map((todo: Todo) => {
          return (
            <li
              key={todo.id}
              className={`px-5 py-4 bg-white border rounded-xl shadow-xs cursor-default  ${
                todo.completed
                  ? "border-emerald-500 bg-emerald-50/15 line-through decoration-emerald-300"
                  : "font-medium text-gray-700 border-[hsl(200,20%,88%)] hover:border-[hsl(200,20%,80%)] hover:shadow-md"
              }`}
            >
              {todo.title}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Todos;
