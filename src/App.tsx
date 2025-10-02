import { createBrowserRouter } from "react-router";
import { Home } from "././pages/home";
import { Admin } from "././pages/admin";
import { Login } from "././pages/login";
import { Networks } from "././pages/networks";
import { Private } from "./routes/Private";
import { PageError } from "./pages/PageError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },
  {
    path: "/admin/social",
    element: (
      <Private>
        <Networks />
      </Private>
    ),
  },
  {
    path: "*",
    element: <PageError />,
  },
]);

export { router };
