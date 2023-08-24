import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import NotFound from "../pages/NotFoundPage";
import Register from "../pages/auth/Register";
import { AvailableRoutes } from "./AvailableRoutes";
import { RouteVisibility } from "./RouteVisibility";
import Account from "../pages/Account";
import CreatePost from "../pages/CreatePost";

type RouteInformation = {
  path: string;
  component: () => JSX.Element | null;
  visibility: RouteVisibility;
};

const RouteConfiguration: RouteInformation[] = [
  {
    path: AvailableRoutes.Home,
    component: Home,
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
    component: Account,
    visibility: RouteVisibility.Everyone,
  },
  {
    path: AvailableRoutes.CreatePost,
    component: CreatePost,
    visibility: RouteVisibility.LoggedIn,
  },
  { path: "*", component: NotFound, visibility: RouteVisibility.Everyone },
];

export default RouteConfiguration;
