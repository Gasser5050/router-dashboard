import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostsList from "./pages/PostsList";
import PostInfo from "./pages/PostInfo";
import NewPost from "./pages/NewPost";
import UsersList from "./pages/UsersList";
import UserInfo from "./pages/UserInfo";
import Todos from "./pages/Todos";
import NewTodo from "./pages/NewTodo";
import Error from "./pages/Error";
import ErrorPage from "./pages/ErrorPage";
import { postsLoader } from "./loaders/postsLoader";
import { postLoader } from "./loaders/postLoader";
import { postNewPost } from "./actions/postNewPost";
import { editPostAction } from "./actions/editPostAction";
import { usersLoader } from "./loaders/usersLoader";
import { userLoader } from "./loaders/userLoader";
import { todosLoader } from "./loaders/todosLoader";
import { postNewTodo } from "./actions/postNewTodo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "/posts",
            children: [
              {
                index: true,
                element: <PostsList />,
                id: "posts-loader",
                loader: postsLoader,
                shouldRevalidate: ({ currentUrl, nextUrl }) => {
                  return currentUrl.pathname !== nextUrl.pathname;
                }
              },
              {
                path: ":postId",
                id: "post-loader",
                loader: postLoader,
                children: [
                  {
                    index: true,
                    element: <PostInfo />
                  },
                  {
                    path: "edit",
                    element: <NewPost />,
                    id: "edit-post-loader",
                    loader: usersLoader,
                    action: editPostAction
                  }
                ]
              },
              {
                path: "new",
                element: <NewPost />,
                id: "new-post-loader",
                loader: usersLoader,
                action: postNewPost
              }
            ]
          },
          {
            path: "/users",
            children: [
              {
                index: true,
                element: <UsersList />,
                id: "users-loader",
                loader: usersLoader
              },
              {
                path: ":userId",
                element: <UserInfo />,
                id: "user-loader",
                loader: userLoader
              }
            ]
          },
          {
            path: "/Todos",
            children: [
              {
                index: true,
                element: <Todos />,
                id: "todos-loader",
                loader: todosLoader,
                shouldRevalidate: ({ currentUrl, nextUrl }) => {
                  return currentUrl.pathname !== nextUrl.pathname;
                }
              },
              {
                path: "new",
                element: <NewTodo />,
                action: postNewTodo
              }
            ]
          },
          { path: "*", element: <Error /> }
        ]
      }
    ],
    HydrateFallback: () => {
      return (
        <>
          <Navbar />
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/10">
            <div className="w-25 h-25 border-5 border-[hsl(200,100%,10%)] border-t-transparent rounded-full animate-spin" />
          </div>
        </>
      );
    }
  }
]);
