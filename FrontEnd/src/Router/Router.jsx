import { createBrowserRouter } from "react-router-dom";
// components
import UpdatePost from "../components/Pages/UpdatePost";
import RootLayout from "../components/Pages/RootLayout";
import Index from "../common/Index";
import ErrorPage from "../components/Pages/ErrorPage";
import React, { Suspense } from "react";

const AddPost = React.lazy(() => import("../components/Pages/AddPost"));
const Editpost = React.lazy(() => import("../components/Pages/EditPost"));
const Details = React.lazy(() => import("../components/Pages/Details"));

const paramHandler = ({ params }) => {
  if (isNaN(Number(params.id))) {
    throw new Response("Bad Request", {
      statusText: "Please make sure to insert a correct post ID",
      status: 400,
    });
  }
};

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "add/post",

        element: (
          <Suspense fallback="Loading please wait...">
            <AddPost />
          </Suspense>
        ),
      },
      {
        path: "post/:id",
        element: (
          <Suspense fallback="Loading please wait...">
            <Details />
          </Suspense>
        ),
        loader: paramHandler,
      },
      {
        path: "post/edit/:id",
        element: (
          <Suspense fallback="Loading please wait...">
            <Editpost />
          </Suspense>
        ),
        loader: paramHandler,
      },
      {
        path: "update/post",
        element: <UpdatePost />,
      },
    ],
  },
]);

export default Router;
