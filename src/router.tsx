import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import PostsList from "./pages/PostsList";
import Post from "./pages/Post";
import UsersList from "./pages/UsersList";
import User from "./pages/User";
import Todos from "./pages/Todos";
import Error from "./pages/Error";
import { postsLoader } from "./loaders/postsLoader";
import { postLoader } from "./loaders/postLoader";
import { usersLoader } from "./loaders/usersLoader";
import { userLoader } from "./loaders/userLoader";
import { todosLoader } from "./loaders/todosLoader";
import ErrorPage from "./pages/ErrorPage";

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
                loader: postsLoader
              },
              {
                path: ":postId",
                element: <Post />,
                id: "post-loader",
                loader: postLoader
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
                element: <User />,
                id: "user-loader",
                loader: userLoader
              }
            ]
          },
          {
            path: "/Todos",
            element: <Todos />,
            id: "todos-loader",
            loader: todosLoader
          },
          { path: "*", element: <Error /> }
        ]
      }
    ],
    HydrateFallback: () => {
      return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/10">
          <div className="w-25 h-25 border-5 border-[hsl(200,100%,10%)] border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }
  }
]);
