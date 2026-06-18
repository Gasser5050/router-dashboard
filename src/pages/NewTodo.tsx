import { Form, NavLink, useActionData, useNavigation } from "react-router-dom";

function NewTodo() {
  const errorMessage = useActionData();
  const { state } = useNavigation();
  const submitting = state === "loading" || state === "submitting";

  return (
    <>
      <h1 className="text-4xl lg:text-5xl mb-6 font-bold text-[hsl(200,100%,10%)] tracking-tight">
        Add New Todo
      </h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <Form method="post">
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className={`md:text-xl ${submitting ? "flex items-center" : ""}`}
          >
            Title{" "}
            {submitting ? (
              <span className="text-xs ml-1 font-bold">- Loading...</span>
            ) : (
              ""
            )}
          </label>
          <input
            type="text"
            name="title"
            id="title"
            autoFocus
            className="border bg-white px-2 py-1 lg:py-1.5 rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-3">
          <NavLink
            to={".."}
            className="text-[hsl(200,100%,30%)] bg-white border px-2 py-1 rounded-sm cursor-pointer hover:scale-105"
          >
            Back
          </NavLink>
          <button
            disabled={submitting}
            className={`bg-[hsl(200,100%,30%)] text-white border px-2 py-1 rounded-sm cursor-pointer hover:scale-105 ${submitting ? "bg-gray-500 text-white" : ""}`}
          >
            Create
          </button>
        </div>
      </Form>
    </>
  );
}

export default NewTodo;
