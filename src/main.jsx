import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register";
// import ProductDetail from "./routes/ProductDetail";
// import Todo from "./routes/Todo.jsx";
import TodoPage from "./routes/TodoPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "todo",
        element: <TodoPage />,
      }
      // {
      //   path: "product/:id",
      //   element: <ProductDetail />,
      // },
    ],
    
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
