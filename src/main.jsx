import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
import Signin from "./SignIn";
import SignUpCorp from "./SignUpCorp";
import SignUpIn from "./SignUpIn";
import PreSignUp from "./PreSignUp";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignOut from "./SignOut";

import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <Signin />,
  },
  {
    path: "/sign-up",
    element: <PreSignUp />,
  },
  {
    path: "/sign-up/in",
    element: <SignUpIn />,
  },
  {
    path: "/sign-up/c",
    element: <SignUpCorp />,
  },
  {
    path: "/sign-out",
    element: <SignOut />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
