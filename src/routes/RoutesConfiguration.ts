import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
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
    component: HomePage,
    visibility: RouteVisibility.Everyone,
  },
  {
    path: AvailableRoutes.Login,
    component: LoginPage,
    visibility: RouteVisibility.Everyone,
  },
  {
    path: AvailableRoutes.Register,
    component: RegisterPage,
    visibility: RouteVisibility.Everyone,
  },
  { path: "*", component: NotFoundPage, visibility: RouteVisibility.Everyone },
];

export default RouteConfiguration;
