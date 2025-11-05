import { createBrowserRouter } from "react-router-dom";
import WebsiteLayout from "./layouts/WebsiteLayout";
import Home from "./components/Home/Home";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./components/Admin/Dashboard/DashboardHome/DashboardHome";
import DashboardAddPost from "./components/Admin/Dashboard/DashboardAddPost/DashboardAddPost";
import DashboardForm from "./components/Admin/Dashboard/DashboardAddPost/DashboardForm/DashboardForm";
import DashboardPosts from "./components/Admin/Dashboard/DashboardPosts/DashboardPosts";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <WebsiteLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "admin",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      { path: "post-format", element: <DashboardAddPost /> },
      { path: "add-post", element: <DashboardForm /> },
      {
        path: "posts", element: <DashboardPosts />, children: [{
          path: "all", element: <DashboardPosts />
        }
        ]
      }
    ],
  },
]);
