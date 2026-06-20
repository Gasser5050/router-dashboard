import {
  Form,
  NavLink,
  useActionData,
  useNavigation,
  useRouteLoaderData
} from "react-router-dom";
import type { PostPage, User } from "../types/Types";

function NewPost() {
  const errorMessage = useActionData();
  const { state } = useNavigation();
  const submitting = state === "loading" || state === "submitting";

  const currentPostDetails = useRouteLoaderData<PostPage>("post-loader");
  const post = currentPostDetails?.post;

  const newPostUsers = useRouteLoaderData<User[]>("new-post-loader");
  const editPostUsers = useRouteLoaderData<User[]>("edit-post-loader");
  const users = newPostUsers || editPostUsers;
  if (!users) return;

  return (
    <>
      <h1 className="text-4xl lg:text-5xl mb-4 font-bold text-[hsl(200,100%,10%)] tracking-tight">
        {post ? `Edit Post: ${post.title}` : "Add New Post"}
      </h1>
      <p
        className={`-ml-1 opacity-0 text-red-500 mb-1 ${errorMessage ? "opacity-100" : ""}`}
      >
        &nbsp;{errorMessage}
      </p>
      <Form method="post">
        <fieldset className="grid grid-cols-2 grid-rows-1 gap-2 lg:gap-4">
          <legend className="sr-only">Post Details Form Fields</legend>

          <div className="flex flex-col">
            <label htmlFor="title" className="md:text-xl mb-0.5">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={post && post.title}
              autoFocus
              required
              className="border bg-white px-2 py-1 lg:py-1.5 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="author" className="md:text-xl  mb-0.5">
              Author
            </label>
            <select
              name="author"
              id="author"
              defaultValue={post ? post.userId : ""}
              className="border bg-white px-2 py-1 lg:py-1.5 rounded-md"
            >
              <option value="">Any</option>
              {users?.map(user => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col col-span-2 mb-2">
            <label htmlFor="body" className="md:text-xl mb-0.5">
              Body
            </label>
            <textarea
              name="body"
              id="body"
              rows={5}
              required
              className="border bg-white px-2 py-1 lg:py-1.5 rounded-md scrollbar-none"
              defaultValue={post && post.body}
            />
          </div>
        </fieldset>
        <span
          className={`opacity-0 text-xs ml-1 font-bold ${submitting ? "opacity-100" : ""}`}
        >
          Loading...
        </span>
        <div className="flex justify-end space-x-2 ">
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
            {post ? "Edit" : "Create"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default NewPost;
