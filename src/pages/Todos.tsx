import {
  Form,
  NavLink,
  useRouteLoaderData,
  useSearchParams
} from "react-router-dom";
import type { Todo } from "../types/Types";

function Todos({
  newTodos,
  hideTitle = false
}: {
  newTodos?: Todo[];
  hideTitle?: boolean;
}) {
  const todos = useRouteLoaderData<Todo[]>("todos-loader") || newTodos;

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const localTodos = localStorage.getItem("TODOS");
  if (!newTodos && !localTodos && todos) {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }
  const storedTodos = newTodos
    ? newTodos
    : JSON.parse(localTodos || JSON.stringify(todos));

  const filteredTodos = storedTodos.filter((todo: Todo) => {
    return todo.title.toLowerCase().includes(query);
  });

  return (
    <>
      {!hideTitle && (
        <>
          <div className="flex justify-between mb-5 lg:mb-7">
            <h1 className="text-4xl lg:text-5xl font-bold text-[hsl(200,100%,10%)] tracking-tight">
              Todos
            </h1>
            <NavLink
              to={"new"}
              className={
                "text-xl border p-2 text-[hsl(200,20%,95%)] bg-[hsl(200,100%,20%)] hover:scale-105 rounded-lg h-fit"
              }
            >
              New
            </NavLink>
          </div>

          <Form className="flex justify-center items-end space-x-4 mb-5 ">
            <div className="flex flex-col grow">
              <label htmlFor="query">Search</label>
              <input
                id="query"
                name="query"
                type="search"
                defaultValue={query}
                key={query}
                autoFocus
                className="border bg-white px-2 py-1 rounded-lg"
              />
            </div>
            <button className="text-lg border px-2 py-1 text-[hsl(200,20%,95%)] bg-[hsl(200,100%,20%)] hover:scale-105 rounded-lg h-fit cursor-pointer">
              Search
            </button>
          </Form>
        </>
      )}

      <ul className="flex flex-col space-y-2">
        {filteredTodos.map((todo: Todo) => {
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
