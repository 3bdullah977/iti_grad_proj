import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/page";
import MovieDetail from "./pages/movie/page";
import Nav from "./components/nav";
import Search from "./pages/Search/page";
import Register from "./pages/auth/register/page";
import LogIn from "./pages/auth/login/page";
import { Toaster } from "@/components/ui/sonner";
import Favourite from "./pages/favourites/page";
import Logout from "./pages/auth/logout/page";

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Toaster />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/search",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Search />,
      },
    ],
  },
  {
    path: "/:movie",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MovieDetail />,
      },
    ],
  },
  {
    path: "/logIn",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LogIn />,
      },
    ],
  },
  {
    path: "/register",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
  {
    path: "/logout",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Logout />,
      },
    ],
  },
  {
    path: "/favourites",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Favourite />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
