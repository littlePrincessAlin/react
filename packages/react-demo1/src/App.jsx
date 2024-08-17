import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from 'pages/Home/index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}