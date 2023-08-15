import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFoundPage";
import Register from "../pages/Register";
import { AvailableRoutes } from "./AvailableRoutes";
import { RouteVisibility } from "./RouteVisibility";

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
  { path: "*", component: NotFound, visibility: RouteVisibility.Everyone },
];

export default RouteConfiguration;
