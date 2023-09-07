import HomePage from "../pages/HomePage";
import Login from "../pages/auth/Login";
import NotFound from "../pages/NotFoundPage";
import Register from "../pages/auth/Register";
import { AvailableRoutes } from "./AvailableRoutes";
import { RouteVisibility } from "./RouteVisibility";
import AccountPage from "../pages/AccountPage";
import CreatePostPage from "../pages/CreatePostPage";
import PostPage from "../pages/PostPage";
import EditPostPage from "../pages/EditPostPage";

type RouteInformation = {
  path: string;
  component: () => JSX.Element | null;
  visibility: RouteVisibility;
};

const RouteConfiguration: RouteInformation[] = [
  {
    path: AvailableRoutes.Home,
    component: HomePage,
    visibility: RouteVisibility.Everyone,
  },
  {
    path: AvailableRoutes.Login,
    component: Login,
    visibility: RouteVisibility.Everyone,
  },
  {
    path: AvailableRoutes.Register,
    component: Register,
    visibility: RouteVisibility.Everyone,
  },
  {
    path: AvailableRoutes.Account(),
    component: AccountPage,
    visibility: RouteVisibility.Everyone,
  },
  {
    path: AvailableRoutes.CreatePost,
    component: CreatePostPage,
    visibility: RouteVisibility.LoggedIn,
  },
  {
    path: AvailableRoutes.EditPost(),
    component: EditPostPage,
    visibility: RouteVisibility.LoggedIn,
  },
  {
    path: AvailableRoutes.Post(),
    component: PostPage,
    visibility: RouteVisibility.Everyone,
  },
  { path: "*", component: NotFound, visibility: RouteVisibility.Everyone },
];

export default RouteConfiguration;
